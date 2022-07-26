import Joi from 'joi'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { RequestHandler } from 'next/dist/server/next'
import { PrismaClient, Prisma } from '@prisma/client'

import logger from '../utils/log'
import response from '../utils/response'
import { MapStatus } from '../utils/constants'
import MapModel from '../../shared/models/map.model'
import { requestMap, RequestMapParams } from '../services/powerautomate'
import { geocodeAddress, buildParameters } from '../services/map'
import { verifyRecaptcha } from '../services/recaptcha'
import { pushQueue } from '../services/queues/queues'

dayjs.extend(utc)

const schema = Joi.object({
  token: Joi.string().required(),

  layout: Joi.string(),
  address: Joi.string(),
  zoom: Joi.string(),
})

const prisma = new PrismaClient()
class MapGenerationController {
  handler: RequestHandler
  render: Function
  constructor(_handler: RequestHandler, _render: Function) {
    this.handler = _handler
  }

  public doGenerateMap = async (req, res) => {
    logger.info('Pages::home page - render, ', req.body)

    const params = req.body

    try {
      await schema.validateAsync(params)
      // Verify recaptcha
      const recaptchaResult = await verifyRecaptcha(params.token)
      if (!recaptchaResult) {
        throw new Error('Error - failed to verify recaptcha')
      }
      const data = await geocodeAddress(params.address)

      const mapParams = await buildParameters(data, params.layout)
      console.log(mapParams)

      pushQueue(mapParams.payload)
      const currentDate = dayjs.utc().toDate()
      const output = await prisma.generation.create({
        data: {
          createdAt: currentDate,
          updatedAt: currentDate,
          title: params.address,
          outputPath: `${mapParams.payload.az_blob_url}/${mapParams.payload.output_filename}`,
          zoomLevel: 'default',
          command: JSON.stringify(mapParams.payload),
          layout: params.layout,
          lat: '',
          lng: '',
          sessionId: mapParams.uniqueId.toString(),
          submitted: true,
          status: 'pending',
        },
      })
      return response.success(res, output)
    } catch (e) {
      console.log(e)
      return response.error(res, 'Cannot Generate Map')
    }
  }
  public getGeneratedMap = async (req, res) => {
    logger.info('API::map - get generated map')
    const output = await prisma.generation.findFirst({
      where: {
        id: req.params.id * 1,
      },
    })
    return response.success(res, output)
  }
  public getGeneratedMapGallery = async (req, res) => {
    logger.info('API::map - get generated map gallery')

    const limit = req.query.limit * 1 || 12
    const lastDay = dayjs().utc().add(-30, 'days').toDate()

    const listing = await prisma.generation.findMany({
      where: {
        status: 'success',
        createdAt: {
          gte: lastDay,
        },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return response.success(res, listing)
  }

  public getMapTypes = async (req, res) => {
    const mapTypes = await prisma.mapType.findMany()
    console.log('Created map type with id:', mapTypes)
    return response.success(res, mapTypes)
  }
}

export default MapGenerationController
