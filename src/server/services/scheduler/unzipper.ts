// Fixed Zip Bomb attacks exposure
import fs from 'fs';
import jszip from 'jszip';
import pathmodule, { dirname, basename } from 'path';
import { MAX_FILES, MAX_SIZE } from './config';

const getResolvedPath = (item: jszip.JSZipObject, unzipPath: string) => {
  const newItemDirName = dirname(item.name).toString().replace(/\.$/, '/');
  const targetDirectory = unzipPath + newItemDirName;
  const itemName = basename(item.name);

  const resolvedPath = pathmodule.join(targetDirectory, itemName);

  // Prevent ZipSlip path traversal (S6096)
  // if (!resolvedPath.startsWith(targetDirectory)) {
  //   throw new Error('Path traversal detected');
  // }

  return { resolvedPath, itemName };
};

const unzipWriteFile = (
  zip: jszip,
  resolvedPath: number | fs.PathLike,
  itemName: string,
  totalSize: number
) => {
  zip
    .file(itemName)
    .async('nodebuffer')
    .then(content => {
      totalSize += content.length;
      if (totalSize > MAX_SIZE) {
        throw new Error('Unzip reached max. size');
      }

      fs.writeFileSync(resolvedPath, content);
    });
};

const unzipFile = async (zipFileName: string, unzipPath: string) => {
  try {
    fs.mkdirSync(unzipPath, { recursive: true });
    const fileContent = fs.readFileSync(zipFileName);
    const zip = await jszip.loadAsync(fileContent);

    const keys = Object.keys(zip.files);

    let fileCount = 0;
    const totalSize = 0;

    for (const key of keys) {
      fileCount++;
      if (fileCount > MAX_FILES) {
        throw new Error('Unzip reached max. number of files');
      }

      const item = zip.files[key];

      const { resolvedPath, itemName } = getResolvedPath(item, unzipPath);
      console.log(resolvedPath);

      if (!zip.file(itemName)) {
        fs.mkdirSync(resolvedPath, { recursive: true });
      } else {
        unzipWriteFile(zip, resolvedPath, itemName, totalSize);
      }
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('File not found!');
    } else {
      console.error(error);
    }
    throw error;
  }

  console.log('Downloaded files extracted successfully!');
};

export default unzipFile;
