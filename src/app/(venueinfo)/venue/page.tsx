import CardPanel from '@/components/CardPanel'
import MassageshopCatalog from '@/components/MassageshopCatalog'
import { Suspense } from "react"
import { LinearProgress } from '@mui/material'
import getMassageshops from '@/libs/getMassageshops'

export default function Card() {
    const massageshops = getMassageshops()
    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select your massage shop</h1>
            <Suspense fallback={ <p>Loading ... <LinearProgress/></p>}>
            <MassageshopCatalog massageshopsJson={massageshops}/>
            </Suspense>
        </main>
    )
}