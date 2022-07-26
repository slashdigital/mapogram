import express, { Router } from 'express'
import MapGenerationController from '../controllers/maps-generation.controller'
import { handler, render } from '../config/next.server'

const router = Router()
const mapController = new MapGenerationController(handler, render)

router.post('/maps/generate', mapController.doGenerateMap)
router.get('/maps/list', mapController.getGeneratedMapGallery)
router.get('/maps/:id', mapController.getGeneratedMap)
router.get('/map-types', mapController.getMapTypes)

export default router
