import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import Massageshop from "@/db/models/Massageshop";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const addMassageshop = async(addMassageshopForm:FormData) => {
        "use server"
        const name = addMassageshopForm.get("name")
        const address = addMassageshopForm.get("address")
        const tel = addMassageshopForm.get("tel")
        const openclosetime = addMassageshopForm.get("openclosetime")
    try {
        await dbConnect()
        const massageshop = await Massageshop.create({
            "name": name,
            "address":address,
            "tel": tel,
            "openclosetime": openclosetime,
        })
    } catch(error) {
        console.log(error)
    }
    revalidateTag("massageshops")
    redirect("/massageshop")
}

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null
    const profile = await getUserProfile(session.user.token)
    console.log(profile)

    var createdAt = new Date(profile.data.createdAt)
    return (
        <main className="bg-yellow-50 m-5 p-5 text-black">
            <div className="text-2xl font-bold text-yellow-950">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2 font-bold text-yellow-950">
                <tbody>
                    <tr><td>Email:</td><td>{profile.data.email}</td></tr>
                </tbody></table>

                {
                (profile.data.role == "admin") ? 
                    <form action={addMassageshop}>
                    <div className="text-xl text-yellow-950 font-bold">Create Massage Shop</div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Name</label>
                        <input type="text" required id="name" name="name" placeholder="Massage shop name"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-yellow-400" />
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="desc">Description</label>
                        <input type="text" required id="desc" name="desc" placeholder="Massage shop description"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-yellow-400" />
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="address">Address</label>
                        <input type="text" required id="address" name="address" placeholder="Location / Address"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-yellow-400" />
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">Picture</label>
                        <input type="text" required id="picture" name="picture" placeholder="Image URL"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-yellow-400" />
                    </div>

                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="price">Tel</label>
                        <input type="text" required id="tel" name="tel" placeholder="Telephone Number"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-yellow-400" />
                    </div>

                    {/* <div className="flex items-center w-1/2 my-2">
                        <input className="ml-2 mr-2" id="appointment" name="appointment" type="checkbox" />
                        <span>Automatic</span>
                    </div> */}

                    <button type="submit" className="bg-yellow-900 hover:bg-yellow-700 text-white p-2 rounded">
                        Add Massage Shop
                    </button>
                    </form>
                 : null
                }

        </main>
    );
}