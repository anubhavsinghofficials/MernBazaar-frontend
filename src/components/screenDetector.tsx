


function TailwindScreenDetector() {

    return (
        <div className={`z-50 text-black w-40 h-14 fixed flex justify-center items-center top-6`}>

            <p className="xxs:block xxs:bg-red-300 xs:hidden text-3xl font-bold rounded-full px-4 top">
                {'>'}320
            </p>

            <p className="xs:block xs:bg-blue-300 xxs:hidden sm:hidden text-3xl font-bold rounded-full px-4">
                {'>'}470
            </p>

            <p className="hidden sm:block sm:bg-red-300 md:hidden text-3xl font-bold rounded-full px-4">
                 {'>'}640px
            </p>

            <p className="md:block md:bg-green-300 hidden lg:hidden text-3xl font-bold rounded-full px-4">
                 {'>'}768px
            </p>

            <p className="lg:block lg:bg-yellow-300 hidden xl:hidden text-3xl font-bold rounded-full px-4">
                 {'>'}1024px
            </p>

            <p className="xl:block xl:bg-orange-300 hidden 2xl:hidden text-3xl font-bold rounded-full px-4">
                 {'>'}1280px
            </p>

            <p className="2xl:block 2xl:bg-emerald-400 hidden text-3xl font-bold rounded-full px-4">
                 {'>'}1536px
            </p>
        </div>
    )
}
 
export default TailwindScreenDetector