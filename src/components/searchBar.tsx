import { FaSearch } from "react-icons/fa"
import { useForm, SubmitErrorHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from "react"

const searchSchema = z.object({
  search: z.string().trim().nonempty(),
})

export type searchValues = z.infer<typeof searchSchema>
export type SearchFunction = (data: searchValues) => void
type SearchBarProps = {
  onSearch: SearchFunction
  placeHolder: string
}

function SearchBar({ onSearch, placeHolder }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const { register, handleSubmit } = useForm<searchValues>({
    resolver: zodResolver(searchSchema),
  })

  const onSubmit = (data: searchValues) => {
    const input = formRef.current?.children[0] as HTMLInputElement
    input.blur()
    onSearch(data)
  }
  const onError: SubmitErrorHandler<searchValues> = error => {
    console.log(error)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex bg-gray-500 w-full rounded-md overflow-hidden"
      ref={formRef}>
      <input
        className={`px-3 xs:py-1 grow bg-slate-100 text-slate-800 outline-none min-w-0`}
        type="text"
        id="search"
        {...register("search")}
        placeholder={placeHolder}
        autoComplete="off"
      />
      <button
        className={`bg-slate-600 text-slate-100 flex items-center px-2 active:bg-slate-700`}>
        <FaSearch />
      </button>
    </form>
  )
}

export default SearchBar
