import Image from "next/image"
import getMassageshop from "@/libs/getMassageshop"

export default async function CardDetailPage({params}:{params:{mid:string}}){
    
    const cardDetail = await getMassageshop(params.mid)
    console.log("Image URL2:", cardDetail.data.picture);
    console.log("Card Detail:", cardDetail);

    // if (!cardDetail || !cardDetail.data.picture) {
    //     return <div>Loading...</div>; // แสดงข้อความ "Loading..." ระหว่างที่ข้อมูลยังโหลด
    // }

   
    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{cardDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image 
                    src={cardDetail.data.picture} 
                    alt='Card Image' 
                    width={500} 
                    height={300} 
                    sizes="100vw" 
                    className="rounded-lg w-[30%]"
                />
                <div className="text-md mx-5 text-left">
                <div className="text-md mx-5">Name: {cardDetail.data.name}</div>
                <div className="text-md mx-5">Address: {cardDetail.data.address}</div>
                <div className="text-md mx-5">Tel: {cardDetail.data.tel}</div>
                </div>
            </div>
        </main>
    )
}
 
// export async function generateStaticParams(){
//     return [{vid:'001'},{vid:'002'},{vid:'003'} ]
// }