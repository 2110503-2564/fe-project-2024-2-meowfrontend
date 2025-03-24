'use client'
import Card from "./Card";
import { useReducer } from "react";
import Link from "next/link"

type VenueState = {
    venues: Map<string, number>;
    selectedVenues: Set<string>;
};

const initialState: VenueState = {
    venues: new Map<string, number>([
        ["Japanese Massage", 0],
        ["Salt Spa and Massage", 0],
        ["Massage Therapy", 0],
        ["Grotta Thermal Spa", 0],
        ["Bandwidth", 0],
        ["Himalayan Salt Massage", 0],
        ["Relaxing", 0],
        ["Portals", 0],
        ["Solutions", 0],
        ["Communities", 0]
    ]),
    selectedVenues: new Set([
        "Japanese Massage", 
        "Salt Spa and Massage", 
        "Massage Therapy",
        "Grotta Thermal Spa",
        "Bandwidth",
        "Himalayan Salt Massage",
        "Relaxing",
        "Portals",
        "Solutions",
        "Communities"
    ]),
};

const mockCardRepo = [
    {vid: "001", name: "Japanese Massage", image: "/img/japaneseMassage.jpg"},
    {vid: "002", name: "Salt Spa and Massage", image: "/img/saltSpaAndMassage.jpg"},
    {vid: "003", name: "Massage Therapy", image: "/img/massageTherapy.jpg"},
    {vid: "004", name: "Grotta Thermal Spa", image: "/img/GrottaThermalSpa.jpg"},
    {vid: "005", name: "Bandwidth", image: "/img/bandwidth.jpg"},
    {vid: "006", name: "Himalayan Salt Massage", image: "/img/HimalayanSaltMassage.jpg"},
    {vid: "007", name: "Relaxing", image: "/img/Relaxing.jpg"},
    {vid: "008", name: "Portals", image: "/img/portals.jpg"},
    {vid: "009", name: "Solutions", image: "/img/solutions.jpg"},
    {vid: "010", name: "Communities", image: "/img/communities.jpg"}
]

const venueReducer = (state: VenueState, action: { type: string; venueName: string; rating?: number }) => {
    switch (action.type) {
        case 'rate': {
            const newVenues = new Map(state.venues);
            newVenues.set(action.venueName, action.rating ?? 0);

            const newSelectedVenues = new Set(state.selectedVenues);
            newSelectedVenues.add(action.venueName);

            return { venues: newVenues, selectedVenues: newSelectedVenues };
        }

        case 'remove': {
            const newSelectedVenues = new Set(state.selectedVenues);
            newSelectedVenues.delete(action.venueName);
            return { ...state, selectedVenues: newSelectedVenues };
        }

        default:
            return state;
    }
};

export default function CardPanel() {
    const [state, dispatch] = useReducer(venueReducer, initialState);

    return (
        <div>
          <div className="flex flex-wrap justify-around items-start mt-5">
            {mockCardRepo.map((venue) => (
              <Link href={`/venue/${venue.vid}`} key={venue.vid} className="w-1/5">
                <Card
                  venueName={venue.name}
                  imgSrc={venue.image} 
                  rating={state.venues.get(venue.name) ?? 0}
                  onRate={(venueName, rating) => dispatch({ type: "rate", venueName, rating })}
                />
              </Link>
            ))}
          </div>
    
          <div className="w-full text-lg font-medium mt-4 ml-5">Massage Shop List with Ratings:</div>
    
          {Array.from(state.selectedVenues).map((venueName) => (
            <div
              key={venueName}
              data-testid={venueName}
              className="cursor-pointer ml-5"
              onClick={() => dispatch({ type: "remove", venueName })}
            >
              {venueName} : {state.venues.get(venueName)}
            </div>
          ))}
        </div>
    );
}