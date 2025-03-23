import Card from "./Card";
import Link from "next/link";
import { VenueJson, VenueItem } from "../../interface";

export default async function VenueCatalog({ venuesJson }: { venuesJson: Promise<VenueJson> }) {
  const venuesJsonReady = await venuesJson;
  return (
    <>
      Explore {venuesJsonReady.count} models in our catalog
      <div className="my-5 flex flex-wrap justify-around items-start">
        {venuesJsonReady.data.map((venueItem: VenueItem) => (
          <Link key={venueItem._id} href={`/venue/${venueItem._id}`} className="w-1/5">
            <Card venueName={venueItem.name} imgSrc={venueItem.picture} />
          </Link>
        ))}
      </div>
    </>
  );
}
