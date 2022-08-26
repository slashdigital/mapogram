import fs from 'fs';
import jszip from 'jszip';
import { dirname, basename, normalize } from 'path';

const unzipFile = async (zipFileName: string, unzipPath: string) => {
  fs.mkdirSync(dirname(unzipPath), { recursive: true });

  const fileContent = fs.readFileSync(zipFileName);
  const result = await jszip.loadAsync(fileContent);
  const keys = Object.keys(result.files);

  for (const key of keys) {
    const item = result.files[key];

    const newItemDirName = dirname(item.name).toString().replace(/\.$/, '/');
    const unzipDeployPath = normalize(unzipPath + newItemDirName + basename(item.name));
    console.log(unzipDeployPath);

    fs.mkdirSync(dirname(unzipDeployPath), { recursive: true });
    fs.writeFileSync(unzipDeployPath, Buffer.from(await item.async('arraybuffer')));
  }

  console.log('Downloaded files extracted successfully!');
};

export default unzipFile;
