import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const { PA_QGIS_OUTPUT_EXT } = process.env;

const config = {
  jpeg: { quality: 80 }
};

const outputPath = path.join(__dirname, '../public/maps');

const resizeImage = async (imageId: string) => {
  try {
    const inputPath = path.join(__dirname, `../public/${imageId}.${PA_QGIS_OUTPUT_EXT}`);
    console.log('Start resize image');
    const image = sharp(inputPath).jpeg(config.jpeg);

    const previewPath = path.join(outputPath, `sizes/preview/${imageId}.${PA_QGIS_OUTPUT_EXT}`);
    fs.mkdirSync(path.dirname(previewPath), { recursive: true });
    await image.toFile(previewPath);
    console.log('Start resize image', previewPath);
    const smallPath = path.join(outputPath, `sizes/small/${imageId}.${PA_QGIS_OUTPUT_EXT}`);
    fs.mkdirSync(path.dirname(smallPath), { recursive: true });
    await image.resize(400).toFile(smallPath);
  } catch (e) {
    console.log(e);
  }
};

export { resizeImage };
