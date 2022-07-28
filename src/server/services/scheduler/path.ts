import { join } from 'path';

const absPath = (fileName: string) => {
  return join(__dirname, '../../../../', fileName);
};

export default absPath;
