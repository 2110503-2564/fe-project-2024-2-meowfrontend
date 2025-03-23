import CardPanel from '@/components/CardPanel'
import VenueCatalog from '@/components/VenueCatalog'
import { Suspense } from "react"
import { LinearProgress } from '@mui/material'
import getVenues from '@/libs/getVenues'

export default function Card() {
    const venues = getVenues()

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select your venue</h1>
            <Suspense fallback={ <p>Loading ... <LinearProgress/></p>}>
            <VenueCatalog venuesJson={venues}/>
            </Suspense>
        </main>
    )
}