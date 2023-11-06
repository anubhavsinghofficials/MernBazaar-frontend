import { useEffect, useRef, useState } from "react"
import { useForm, useFieldArray } from 'react-hook-form'
import { editProductSchemaType, zodEditProductSchema } from "./FormValidators/type-product"
import { zodResolver } from "@hookform/resolvers/zod"
import { MdAdd, MdAddPhotoAlternate, MdEdit } from "react-icons/md"
import { ImCancelCircle } from "react-icons/im"
import { categoryBadges } from "@/Store/ClientStore/store-Constants"
import { syncDeleteProduct, syncFetchSellerProductDetails, syncUpdateProduct } from "@/Store/ServerStore/sync-Products"
import { VscGitPullRequestCreate } from "react-icons/vsc"
import { useNavigate, useParams } from "react-router-dom"
import { AiOutlineCloudUpload } from "react-icons/ai"



function EditProductsPage() {
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])

   const Navigate = useNavigate()
   const { id } = useParams()
   if (!id) {
      Navigate('/seller/products')       
   }

   const [disableDeleteButton, setDisableDeleteButton] = useState(false)
   const thumbnailButtonParentRef = useRef<HTMLDivElement | null>(null)
   const additionalButtonParentRef = useRef<HTMLDivElement | null>(null)
   const [thumbnailPreviews, setThumbnailPreviews] = useState<FileList | null>()
   const [additionalPreviews, setAdditionalPreviews] = useState<FileList | null>()
   const [disableSubmit, setDisableSubmit] = useState(false)
   const [Editable, setEditable] = useState(false)
   const focusDivRef = useRef<HTMLDivElement|null>(null)
   const isThumbnailRef = useRef(false)
   const isAdditionalRef = useRef(false)
   const { data, isLoading, isRefetching } = syncFetchSellerProductDetails(id?id:'')
   const { mutate:deleteProduct } = syncDeleteProduct(setDisableDeleteButton)
   const { mutate:updateProduct } = syncUpdateProduct(id?id:'',setDisableSubmit,setEditable)


   const { register, handleSubmit, formState, watch, control, setValue } = useForm<editProductSchemaType>({
      defaultValues:{
         description:[{point:''}]
      },
      resolver:zodResolver(zodEditProductSchema)
   })
   const { errors } = formState
   const { fields, append, remove } = useFieldArray({
      name: 'description',
      control: control
   })
   
   const thumbnailFile = watch("thumbnail")
   const additionalFiles = watch("additional")
   const costPrice = watch("price.actual")
   const discount = watch("price.discount")

   useEffect(()=>{
      if (Editable && focusDivRef.current) {
         const focusDiv = focusDivRef.current.children
         const focusInput = Array.from(focusDiv)[1] as HTMLInputElement
         focusInput.focus()
      }
      if (data) {
         setValue('title',data.title)
         setValue('price.actual',data.price.actual)
         setValue('price.discount',data.price.discount)
         setValue('category',data.category)
         setValue('stock',data.stock)

         let formDescription = data.description.map((point:string) => {
            return {point}
         })
         setValue(`description`,formDescription)
      }
   },[Editable,data])


   useEffect(() => {
     if (thumbnailFile && thumbnailFile.length>0) {
       setThumbnailPreviews(thumbnailFile)
       isThumbnailRef.current = true
     }
   }, [thumbnailFile])
   
   useEffect(() => {
      if (additionalFiles && additionalFiles.length>0) {
         setAdditionalPreviews(additionalFiles)
         isAdditionalRef.current = true
      }
   }, [additionalFiles])

   useEffect(() => {
      if (!isNaN(costPrice) && !isNaN(discount) && discount>=0 && discount<=100) {
         const netPrice = Math.floor(costPrice*(1-discount/100))
         setValue("price.net",netPrice)
      }
   }, [costPrice, discount])
   

   const chooseThumbnail = () => {
      if (thumbnailButtonParentRef.current) {
        const inputParent = thumbnailButtonParentRef.current.children
        const inputElement = Array.from(inputParent)[1] as HTMLInputElement
        inputElement.click()
      }
    }

    
   const chooseAdditional = () => {
      if (additionalButtonParentRef.current) {
         const inputParent = additionalButtonParentRef.current.children
         const inputElement = Array.from(inputParent)[0] as HTMLInputElement
         inputElement.click()
      }
   }


   const handleDelete = () => {
      if (data) {
         setDisableDeleteButton(true)
         deleteProduct(data._id)
      }
   }

   const onSubmit = (data:editProductSchemaType) => {
      const description = data.description.map(element => element.point)
      const formData = new FormData();
      formData.append("title", data.title)
      formData.append("description", JSON.stringify(description))
      formData.append("category", data.category)
      formData.append("price", JSON.stringify(data.price))
      formData.append("stock", JSON.stringify(data.stock))
      formData.append("isThumbnail", JSON.stringify(isThumbnailRef.current))
      formData.append("isAdditional", JSON.stringify(isAdditionalRef.current))
      Array.from(data.thumbnail).forEach((file, index) => {
         formData.append(`thumbnail[${index}]`, file as Blob);
      })
      Array.from(data.additional).forEach((file, index) => {
         formData.append(`additional[${index}]`, file as Blob);
      })

      setDisableSubmit(true)
      updateProduct(formData)
   }

   return (
      <div className={`mx-auto w-[96vw] md:w-[60vw] lg:w-[46rem] xl:w-[54rem] bg-white shadow-md rounded-lg`}>
         <div className={`px-4 xs:px-6 py-5 flex items-center justify-between rounded-t-lg bg-slate-700`}>
            <p className={`text-lg xs:text-xl text-slate-100 font-semibold flex items-center gap-x-3 whitespace-nowrap`}>
               {
                  (isLoading || isRefetching)
                  ? <span className={`w-4 h-4 rounded-full border-b-slate-300 border-l-white border-[0.24rem] border-slate-700 animate-spin ml-1`}/>
                  : <VscGitPullRequestCreate/>
               }
               Product Details
            </p>
            <div className={``}>
               <button
                  className={`text-slate-100 px-2 xs:px-3 rounded-md hover:bg-slate-600 active:bg-slate-700 text-sm xs:text-base ${Editable && 'hidden'}`}
                  onClick={handleDelete}
                  >
                     {
                        disableDeleteButton
                        ? <span className={`w-4 h-4 rounded-full border-b-slate-300 border-l-white border-[0.24rem] border-slate-700 animate-spin inline-block mr-3`}/>
                        : 'Delete'
                     }                     
               </button>
               <button
                  className={`text-slate-100 px-2 xs:px-3 rounded-md hover:bg-slate-600 active:bg-slate-700 text-sm xs:text-base`}
                  onClick={()=> setEditable(prev => !prev)}
                  >
                  { Editable ? 'Cancel' : 'Edit' }
               </button>
            </div>
         </div>

         <form onSubmit={handleSubmit(onSubmit)}
               className="px-4 md:px-6 lg:px-4 py-6 flex flex-col gap-y-6"
               noValidate
               >
            <div className={`flex flex-col gap-y-1`}
            ref={focusDivRef}>
               <label htmlFor="title"
                     className={`lg:text-lg font-semibold`}>
                  Product Title
               </label>
               <textarea
                  {...register('title')}
                  id="title"
                  rows={2}
                  disabled={!Editable}
                  autoFocus
                  placeholder="Enter the name of your product"
                  className={`w-full h-16 leading-5 outline-none p-3 resize-none text-slate-700 formScrollbar rounded-lg bg-slate-200 ${ errors.title ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"} accordianScrollbar styledPlaceholder`}
                  spellCheck={false}>
               </textarea>
               <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-1 relative leading-4">
                        {errors.title?.message}
                </p>
            </div>

            <div className={`flex flex-col xs:flex-row gap-4`}>
               <div className={`flex flex-col grow gap-y-1 min-w-0`}>
                  <label htmlFor="price.actual"
                        className={`lg:text-lg font-semibold`}>
                     Cost Price
                  </label>
                  <div className={`flex gap-x-4 items-end ${errors.price?.actual ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"} rounded-md overflow-hidde px-4 py-1 bg-slate-200`}>
                     <span className="text-lg font-semibold leading-8 self-stretch">
                        ₹
                     </span>
                     <input
                        type="text"
                        id="price.actual"
                        placeholder="XXX"
                        disabled={!Editable}
                        {...register('price.actual', {valueAsNumber:true})}
                        className={`bg-slate-200 outline-none appearance-none py-1 min-w-0 styledPlaceholder`}
                        />
                  </div>
                  <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-1 relative leading-4">
                        {errors.price?.actual?.message}
                  </p>
               </div>
               <div className={`flex flex-col grow gap-y-1 min-w-0`}>
                  <label htmlFor="price.discount"
                        className={`lg:text-lg font-semibold`}>
                     Discount
                  </label>
                  <div className={`flex justify-between gap-x-2 items-end ${errors.price?.discount ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"} rounded-md overflow-hidde px-4 py-1 bg-slate-200`}>
                     <input
                        type="text"
                        id="price.discount"
                        placeholder="XX"
                        disabled={!Editable}
                        {...register('price.discount', {valueAsNumber:true})}
                        className={`bg-slate-200 outline-none appearance-none py-1 min-w-0 styledPlaceholder`}
                        />
                     <span className="font-semibold leading-8 self-stretch">
                        %
                     </span>
                  </div>
                  <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-1 relative leading-4">
                        {errors.price?.discount?.message}
                  </p>
               </div>
               <div className={`flex flex-col grow gap-y-1 min-w-0`}>
                  <label htmlFor="price.net"
                        className={`lg:text-lg font-semibold`}>
                     Net Price
                  </label>
                  <div className={`flex gap-x-4 items-end ${errors.price?.net ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"} rounded-md overflow-hidde px-4 py-1 bg-slate-200`}>
                     <span className="text-lg font-semibold leading-8 self-stretch">
                        ₹
                     </span>
                     <input
                        type="text"
                        id="price.net"
                        placeholder="XXX"
                        {...register('price.net', {valueAsNumber:true})}
                        className={`bg-slate-200 outline-none appearance-none py-1 min-w-0 styledPlaceholder`}
                        disabled
                        />
                  </div>
                  <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-1 relative leading-4">
                        {errors.price?.net?.message}
                  </p>
               </div>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-6 lg:gap-x-10`}>
               <div className={`flex flex-col gap-y-1 w-fit`}
                     ref={thumbnailButtonParentRef}>
                  <label htmlFor="thumbnail"
                        className={`lg:text-lg font-semibold`}>
                     Thumbnail
                  </label>
                  <input
                     type="file"
                     id="thumbnail"
                     {...register('thumbnail')}
                     className={`hidden`}
                     />
                  <button className={`flex items-center gap-x-2 bg-slate-200 rounded-md ${Editable && 'shadow-md'} duration-100 shadow-[#10162534] active:shadow-transparent ${thumbnailPreviews||data ? 'p-0' : 'px-4 py-2 lg:p-4 lg:pr-5'} relative w-fit group ${ errors.thumbnail && "ring-1 ring-red-500"}`}
                           type="button"
                           onClick={chooseThumbnail}
                           disabled={!Editable}>
                  {
                     !thumbnailPreviews
                     ?
                        isLoading || !data
                        ? 
                           <>
                              <MdAddPhotoAlternate className={`text-3xl lg:mr-1 text-slate-600`}/>
                              <span className={`md:text-left md:pl-4 lg:pl-0 text-center leading-5`}>
                                 Choose a Thumbnail
                              </span>
                           </>
                        :
                           <div className={`flex items-center relative rounded-sm p-1`}>
                              <MdEdit className={`absolute -bottom-2 -right-2 bg-slate-200 rounded-lg p-1 text-3xl ${!Editable && 'hidden'} shadow-[#10162534] group-active:shadow-transparent`}/>
                              {
                                 <img
                                    src={data.images.thumbnail.url}
                                    alt="thumbnail"
                                    className="w-[3.8rem] lg:w-20 aspect-square object-cover object-center rounded-md"
                                 />
                              }
                           </div>
                     :
                     <div className={`flex items-center relative rounded-sm p-1`}>
                        <MdEdit className={`absolute -bottom-2 -right-2 bg-slate-200 rounded-lg p-1 text-3xl ${Editable && 'shadow-md'} shadow-[#10162534] group-active:shadow-transparent`}/>
                        {
                           Array.from(thumbnailPreviews).map((file,index) => (
                              <img
                                 key={index}
                                 src={URL.createObjectURL(file)}
                                 alt="thumbnail"
                                 className="w-[3.8rem] lg:w-20 aspect-square object-cover object-center rounded-md"
                              />
                           ))
                        }
                     </div>
                  }
                  </button>
                  <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-1 relative leading-4">
                        {errors.thumbnail?.message as string}
                  </p>
               </div>
               <div className={`flex flex-col gap-y-1 w-fit`}
                     ref={additionalButtonParentRef}>
                  <label htmlFor="additional"
                        className={`lg:text-lg font-semibold`}>
                     More Images (max 5)
                  </label>
                  <input
                     type="file"
                     id="additional"
                     {...register('additional')}
                     className={`hidden`}
                     multiple
                     />
                  <button className={`flex items-center gap-x-2 bg-slate-200 rounded-md ${Editable && 'shadow-md'} duration-100 shadow-[#10162534] active:shadow-transparent ${additionalPreviews||data ? 'p-0' : 'px-4 py-2 lg:p-4 lg:pr-5'} relative w-fit group ${ errors.additional && "ring-1 ring-red-500"}`}
                           type="button"
                           onClick={chooseAdditional}
                           disabled={!Editable}>
                  {
                     !additionalPreviews
                     ?
                        isLoading || !data
                        ? 
                           <>
                              <MdAddPhotoAlternate className={`text-3xl lg:mr-1 text-slate-600`}/>
                              <span className={`md:text-left md:pl-4 lg:pl-0 text-center leading-5`}>
                                 Choose Additional Images
                              </span>
                           </>
                        :
                           <div className={`flex items-center relative rounded-sm p-1 gap-1 flex-wrap`}>
                              <MdEdit className={`absolute -bottom-2 -right-2 bg-slate-200 rounded-lg p-1 text-3xl ${!Editable && 'hidden'} shadow-[#10162534] group-active:shadow-transparent`}/>
                              {

                                 data.images.additional.map((img:any) => (
                                    <img
                                       key={img.url}
                                       src={img.url}
                                       alt="Additional images"
                                       className="w-[3.8rem] lg:w-20 aspect-square object-cover object-center rounded-md"
                                    />
                                 ))
                              }
                           </div>
                     :
                     <div className={`flex items-center gap-2 relative rounded-sm p-1 grow flex-wrap`}>
                        <MdEdit className={`absolute -bottom-2 -right-2 bg-slate-200 rounded-lg p-1 text-3xl shadow-md shadow-[#10162534] group-active:shadow-transparent`}/>
                        {
                           Array.from(additionalPreviews).map((file, index) => (
                              <img
                                 key={index}
                                 src={URL.createObjectURL(file)}
                                 alt="Additional images"
                                 className="w-[3.8rem] lg:w-20 aspect-square object-cover object-center rounded-md"
                              />
                           ))
                        }
                     </div>
                  }
                  </button>
               <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-1 relative leading-4">
                        {errors.additional?.message as string}
               </p>
               </div>
            </div>

            <div className={`flex flex-col gap-y-1`}>
               <label htmlFor="description"
                     className={`lg:text-lg font-semibold`}>
                  Description
               </label>
               <div className={`flex flex-col gap-y-2 items-start`}>
                  {
                     fields.map((field,index)=>(
                        <div
                           className={`w-full relative`}
                           key={field.id}
                           >
                           <textarea
                              {...register(`description.${index}.point`)}
                              id="description"
                              rows={2}
                              placeholder={`Point ${index+1}`}
                              disabled={!Editable}
                              className={`w-full h-16 leading-5 outline-none p-3 resize-none text-slate-700 formScrollbar rounded-lg bg-slate-200 ${ errors.description ? "ring-1 ring-red-500":"focus-within:ring-1 ring-slate-700"} accordianScrollbar styledPlaceholder`}
                              spellCheck={false}>
                           </textarea>
                           {
                              index > 0 &&
                              <ImCancelCircle className={`absolute -top-2 -right-1 bg-slate-200 rounded-full text-lg shadow-md shadow-[#10162534] active:shadow-transparent active:bg-slate-300 text-slate-800 ${!Editable && 'hidden'}`}
                              onClick={()=>remove(index)}/>
                           }
                        </div>
                     ))
                  }
                  <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-1 relative leading-4">
                     {
                        (()=>{
                           let errorMessage = null
                           if (errors.description && Array.isArray(errors.description)) {
                              errors.description.forEach((desc, index) => {
                                 if (desc && desc.point) {
                                    errorMessage = `Error (point ${index + 1}): ${desc.point.message}`
                                 }
                              })
                              }
                              return errorMessage
                        })()
                     }
                  </p>
                  <button
                     type="button"
                     className={`px-4 py-2 bg-slate-700 rounded-md text-slate-50 flex items-center gap-x-2 ${Editable && 'hover:shadow-md active:bg-slate-800 active:shadow-transparent duration-75'}`}
                     onClick={()=> append({point:''})}
                     disabled={!Editable}>
                        <MdAdd className={`text-xl`}/>
                        Add another Point
                  </button>
               </div>
            </div>

            <div className={`flex flex-col xs:flex-row gap-4 lg:gap-x-8`}>
               <div className={`flex flex-col gap-y-1`}>
                  <label htmlFor="category"
                        className={`lg:text-lg font-semibold`}>
                     Category
                  </label>
                  <select
                     id="category" 
                     {...register("category")}
                     disabled={!Editable}
                     className={`p-2 rounded-md bg-slate-200 w-56 lg:w-fit`}>
                     {
                        categoryBadges.values.map((value,index) => (
                           <option
                           key={value} 
                           value={value}>
                           {categoryBadges.strings[index]}
                           </option>
                        ))
                     }
                  </select>
                  <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-1 relative leading-4">
                        {errors.category?.message}
                  </p>
               </div>
               <div className={`flex flex-col gap-y-1`}>
                  <label htmlFor="stock"
                        className={`lg:text-lg font-semibold`}>
                     Stock
                  </label>
                  <div className={`flex gap-x-4 items-end ${errors.stock ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"} rounded-md overflow-hidde px-4 py-1 bg-slate-200 w-fit`}>
                     <input
                        type="text"
                        id="stock"
                        placeholder="XXX"
                        disabled={!Editable}
                        {...register('stock', {valueAsNumber:true})}
                        className={`bg-slate-200 outline-none appearance-none py-1 min-w-0 styledPlaceholder w-50 xs:w-32 lg:w-fit`}
                        />
                  </div>
                  <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-1 relative leading-4">
                        {errors.stock?.message}
                  </p>
               </div>
            </div>
            {
               Editable &&
               <button className={`bg-slate-800 text-white py-2 px-6 text-xl font-semibold rounded-lg flex items-center gap-x-4 hover:shadow-md hover:bg-slate-700 active:shadow-none active:bg-slate-800 duration-75 self-end mt-4 sm:mt-0`}
               disabled={disableSubmit}
               >
                  {
                     disableSubmit
                     ? <span className={`w-4 h-4 rounded-full border-b-slate-200 border-l-white border-[0.24rem] border-slate-800 animate-spin mr-1`}/>
                     : <AiOutlineCloudUpload className={`text-xl`}/>
                  }
                  Update Product
               </button>
            }
         </form>
      </div>
   )
}
 
export default EditProductsPage