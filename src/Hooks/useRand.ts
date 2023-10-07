


export const useRand = (min:number, max:number, skip:number) => {
    let generatedNumber = skip
    while ( generatedNumber === skip ) {
        generatedNumber = Math.ceil(Math.random()*(max - min)) + min
    }
    return generatedNumber
}