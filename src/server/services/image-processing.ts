import sharp from "sharp";
import path from "path";

const { PA_QGIS_OUTPUT_EXT } = process.env;

const config = {
  jpeg: { quality: 80 },
};

const outputPath = path.join(__dirname, "../public/maps");

const resizeImage = async (imageId: string) => {
  const inputPath = path.join(
    __dirname,
    `../public/${imageId}.${PA_QGIS_OUTPUT_EXT}`
  );
  const image = sharp(inputPath).jpeg(config.jpeg);

  await image.toFile(
    path.join(
      outputPath,
      `${imageId}/sizes/preview/${imageId}.${PA_QGIS_OUTPUT_EXT}`
    )
  );
  await image
    .resize(400)
    .toFile(
      path.join(
        outputPath,
        `${imageId}/sizes/small/${imageId}.${PA_QGIS_OUTPUT_EXT}`
      )
    );
};

export { resizeImage };
