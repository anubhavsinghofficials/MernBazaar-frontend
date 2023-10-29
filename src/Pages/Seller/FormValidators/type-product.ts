
import {z} from 'zod'
import { zodProductImageSchema } from './type-product_Image'
import { categoryBadges } from '@/Store/ClientStore/store-Constants'


export const zodProductSchema = z.object({
   title       : z.string()
               .trim()
               .nonempty("Title Required")
               .min(3,"Title should be atleast length 3"),
   description : z.array(z.object({
                  point:z.string()
                        .trim()
                        .nonempty("Point can not be empty")
                        .min(3,"A point should atleast be of length 3")
                  })),
   category    : z.string()
                  .refine(value => categoryBadges.values.includes(value),
                  { message:'Unrecognized Category' }), 
   stock       : z.number(),
   price       : z.object({
                  actual:z.number().lt(1000000),
                  discount:z.number().lte(100),
                  net:z.number()
               }),
   thumbnail   : zodProductImageSchema,
   additional  : zodProductImageSchema
})


export type productSchemaType = z.infer<typeof zodProductSchema>

