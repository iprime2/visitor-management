import { diskStorage } from 'multer';
import { extname } from 'path';

//@ts-ignore
export const excelFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(xls|xlsx)$/)) {
    return callback(new Error('Only Excel files are allowed!'), false);
  }
  callback(null, true);
};

export const storage = diskStorage({
  destination: './uploads', // Make sure the uploads directory exists
  filename: (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${randomName}${fileExtName}`);
  },
});
