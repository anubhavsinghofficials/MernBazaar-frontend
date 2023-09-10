import { FaSearch } from "react-icons/fa";
import { useForm, SubmitErrorHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const searchSchema = z.object({
    search: z.string().trim().nonempty()
})

type searchValues = z.infer<typeof searchSchema>;
export type SearchFunction = (data: searchValues) => void
type SearchBarProps = {
    onSearch: SearchFunction;
    placeHolder:string;
}


function SearchBar({ onSearch,placeHolder }:SearchBarProps) {

    const { register, handleSubmit } = useForm<searchValues>({
        resolver: zodResolver(searchSchema)
    })

    const onSubmit = (data: searchValues) => onSearch(data)
    const onError:SubmitErrorHandler<searchValues> = (error) => console.log(error)

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}
              className='flex bg-gray-500 p-2 text-lg w-full'>
            <input className={`px-3 py-1 grow bg-white text-black outline-none`}
                type="text"
                id="search"
                {...register("search")}
                placeholder={placeHolder}
                autoComplete="off" />
            <button className={`bg-white text-black flex items-center px-2 active:bg-gray-500`}>
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchBar
