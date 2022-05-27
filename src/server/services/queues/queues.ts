
import fastq from "fastq";
import type { queue, done } from "fastq";
import { PrismaClient } from "@prisma/client";

import { MapQGISParamsType } from "../../utils/constants";
import { requestMap } from "../powerautomate";
import { resizeImage } from "../image-processing";

const {PA_QGIS_OUTPUT_EXT, PA_AZ_BLOB_URL, } = process.env;

const prisma = new PrismaClient();


const worker = (arg: MapQGISParamsType, cb: done) => {

  const sessionId = arg.output_filename.replace(`${PA_AZ_BLOB_URL}/`, '').replace(`.${PA_QGIS_OUTPUT_EXT}`, '');
  console.log(`Adding queue to generate map by: Payload: ${JSON.stringify(arg)}}`);
  requestMap(arg).then(async (result) => {
    // Update status of the map data
    console.log('Queue generate map success', result);
    const existing = await prisma.generation.findFirst({
      where: {
        sessionId: sessionId
      }
    });
    if (!existing) {
      console.log(`There is no existing record finding by: {sessionId: ${sessionId}}`);
    } else {
      await resizeImage(sessionId);
      console.log(`Found record finding by: {sessionId: ${sessionId}}`);
      console.log(`Update record finding by: {sessionId: ${sessionId}}`);
      existing.status = 'success';
      await prisma.generation.update({
        where: {
          id: existing.id,
        },
        data: existing
      });
      console.log(`Successfully save record finding by: {sessionId: ${sessionId}}`);
    }
    cb(null);
  }).catch(async (e) => {
    // Print error
    console.log('Queue generate map error');
    const existing = await prisma.generation.findFirst({
      where: {
        sessionId: sessionId
      }
    }); existing.status = 'failed';
    await prisma.generation.update({
      where: {
        id: existing.id,
      },
      data: existing
    });
    cb(null);
  });
}

const q: queue<MapQGISParamsType> = fastq(worker, 1)

export const pushQueue = (task: MapQGISParamsType) => {
  q.push(task);
};