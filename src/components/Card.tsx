import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Card({
    massageshopName,
    imgSrc,
    onRate, 
    rating
}: {
        massageshopName:string; 
        imgSrc:string; 
        onRate?:(venueName:string, rating:number)=>void; 
        rating?:number
}){

    console.log('Image Source:', imgSrc);
    console.log(massageshopName)
  
    return(
        <InteractiveCard contentName={massageshopName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image 
                src={imgSrc}
                alt={'Venue Picture'}
                fill={true}
                className='object-cover rounded-t-lg'
                
                />
            </div>
            <div className='w-full h-[15%] p-[10px] font-mono text-black'>{massageshopName}</div>

            {rating !== undefined && (
                <Rating 
                    id={`${massageshopName} Rating`} 
                    name={`${massageshopName} Rating`} 
                    data-testid={`${massageshopName} Rating`} 
                    value={rating}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(event, newValue) => {
                        event.stopPropagation(); 
                        if (onRate) {
                            onRate(massageshopName, newValue ?? 0);
                        }
                    }}
                    className='h-[10%] px-[10px]'
                />
                )}
        </InteractiveCard>
    );
}