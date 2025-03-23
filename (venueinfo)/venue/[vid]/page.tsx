import Image from "next/image";
import getVenue from "@/libs/getVenue";

export default async function CardDetailPage({ params }: { params: { vid: string } }) {
    const cardDetail = await getVenue(params.vid);

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{cardDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image
                    src={cardDetail.data.picture}
                    alt="Card Image"
                    width={800} // กำหนดขนาดที่เหมาะสมกับภาพ
                    height={600} // กำหนดขนาดที่เหมาะสมกับภาพ
                    className="rounded-lg w-[30%]"
                />
                <div className="text-md mx-5 text-left">
                    <div className="text-md mx-5">Massage Shop Name: {cardDetail.data.name}</div>
                    <div className="text-md mx-5">Address: {cardDetail.data.address}</div>
                    <div className="text-md mx-5">Telephone Number: {cardDetail.data.tel}</div>

                    {/* แก้ไขตรงนี้: แยก open และ close */}
                    <div className="text-md mx-5">
                        Open-Close Time: {cardDetail.data.openclosetime.open} - {cardDetail.data.openclosetime.close}
                    </div>
                </div>
            </div>
        </main>
    );
}
