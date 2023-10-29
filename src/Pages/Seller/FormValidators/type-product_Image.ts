
import { z } from 'zod'

export const zodProductImageSchema = z
    .any()

    // min number of file check ______________________
    .refine(value => value.length > 0, {
      message: "select atleast 1 image",
    })


    // format of file check __________________________
    .refine(value => value instanceof FileList, {
      message: "Error: Unknown format",
    })


    // type of images check __________________________
    .refine((value: FileList) => {
        const allowedExtensions = ["image/jpeg","image/jpg","image/png","image/webp"]
        const fileArray = Array.from(value)
        let isValidType = true
        fileArray.forEach(item => {
          if (!allowedExtensions.includes(item.type)) {
            isValidType = false
          }
        })
        return isValidType
      },{
        message: "Only jpg/jpeg, png & webp are allowed",
      }
    )


    // max number of images check ____________________
    .refine(value => (value.length > 5 ? false : true), {
      message: "can not select more than 5 images",
    })

    
    // size of images check __________________________
    .refine((value: FileList) => {
        const maxSizeInBytes = 1 * 1024 * 1024
        const fileArray = Array.from(value)
        let isValidSize = true
        fileArray.forEach(item => {
          if (item.size > maxSizeInBytes) {
            isValidSize = false
          }
        })
        return isValidSize
      },{
        message: "Images are too large should be under 1mb",
      }
    )