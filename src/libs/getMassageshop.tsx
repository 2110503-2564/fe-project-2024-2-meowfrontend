
export default async function getMassageshop(id:string){
    const response = await fetch(`http://localhost:5003/api/v1/massageshops/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch venue")
    }
    return await response.json()
}

