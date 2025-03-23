export default async function getMassageshops() {

    await new Promise( (resolve)=>setTimeout(resolve, 300) )

    const response = await fetch("http://localhost:5003/api/v1/massageshops" , {next: {tags:['massageshops']}})
    if(!response.ok){
        throw new Error("Failed to fetch venues")
    }
    return await response.json()
}