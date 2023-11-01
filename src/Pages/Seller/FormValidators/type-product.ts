
import {z} from 'zod'
import { zodEditProductImageSchema, zodProductImageSchema } from './type-product_Image'
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
                  .refine((value:string) => categoryBadges.values.includes(value as any),
                  { message:'Unrecognized Category' }), 
   stock       : z.number()
                  .min(1,'Stock must be greater than 0'),
   price       : z.object({
                  actual:z.number().lt(1000000),
                  discount:z.number().lte(100),
                  net:z.number()
               }),
   thumbnail   : zodProductImageSchema,
   additional  : zodProductImageSchema
})




export const zodEditProductSchema = z.object({
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
                  .refine((value:string) => categoryBadges.values.includes(value as any),
                  { message:'Unrecognized Category' }), 
   stock       : z.number()
                  .min(1,'Stock must be greater than 0'),
   price       : z.object({
                  actual:z.number().lt(1000000),
                  discount:z.number().lte(100),
                  net:z.number()
               }),
   thumbnail   : zodEditProductImageSchema,
   additional  : zodEditProductImageSchema
})




export type productSchemaType = z.infer<typeof zodProductSchema>
export type editProductSchemaType = z.infer<typeof zodEditProductSchema>




// we have done (values as any) because we have written 'as const' in the
// categoryBadges.values array, so typescript is warning if 'as any' not used