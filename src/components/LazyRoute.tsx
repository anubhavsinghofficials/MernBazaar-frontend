

import MernBazaarLoaderStatic from '@/Pages/Shared/components/Loading-Ui/Loader-MernBazaar-Static';
import { Suspense, ReactNode, FC } from 'react';

const LazyRoute:FC<{children:ReactNode}> = ({children}) => {
    return (
        <Suspense fallback={<MernBazaarLoaderStatic/>}>
            {children}
        </Suspense>
  )
}

export default LazyRoute;



// although Component: JSX.Element is more specific as it only
// includes only jsx and not other valid things like strings etc
// unlike the ReactNode