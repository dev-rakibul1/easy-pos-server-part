import { v2 as cloudinary } from 'cloudinary'
import * as fs from 'fs'
import multer from 'multer'
import { ICloudinaryResponse, IUploadFile } from '../app/interfaces/file'
import config from '../config/config'

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
})

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads_/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

// Upload an image
const uploadToCloudinary = async (
  file: IUploadFile,
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file?.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path)
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      },
    )
  })
}

const uploads = multer({ storage: storage })

export const FileUploads = {
  uploads,
  uploadToCloudinary,
}
