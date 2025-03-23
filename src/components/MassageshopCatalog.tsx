import Card from "./Card"
import Link from "next/link"
import { MassageshopJson, MassageshopItem } from '../../interface';

export default async function MassageshopCatalog({massageshopsJson}:{massageshopsJson:Promise<MassageshopJson>}){
    const massageshopsJsonReady = await massageshopsJson;
    return(
        <>    
        Explore {massageshopsJsonReady.count} models of in our catalog
        <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
                   {
                    massageshopsJsonReady.data.map((massageshopsItem: MassageshopItem)=>(
                        <Link key={massageshopsItem.id} href={`/massageshop/${massageshopsItem.id}`} className="w-1/5">
                            <Card massageshopName={massageshopsItem.name} imgSrc={massageshopsItem.picture} />
                        </Link>
                    ))
                   }       
        </div>
        </>   
    )
}