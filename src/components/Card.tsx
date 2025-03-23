import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Card({
    venueName,
    imgSrc,
    onRate, 
    rating
}: {
        venueName:string; 
        imgSrc:string; 
        onRate?:(venueName:string, rating:number)=>void; 
        rating?:number
}){

    console.log('Image Source:', imgSrc);
  
    return(
        <InteractiveCard contentName={venueName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image 
                src={imgSrc}
                alt={'Venue Picture'}
                fill={true}
                className='object-cover rounded-t-lg'
                
                />
            </div>
            <div className='w-full h-[15%] p-[10px] font-mono'>{venueName}</div>

            {rating !== undefined && (
                <Rating 
                    id={`${venueName} Rating`} 
                    name={`${venueName} Rating`} 
                    data-testid={`${venueName} Rating`} 
                    value={rating}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(event, newValue) => {
                        event.stopPropagation(); 
                        if (onRate) {
                            onRate(venueName, newValue ?? 0);
                        }
                    }}
                    className='h-[10%] px-[10px]'
                />
                )}
        </InteractiveCard>
    );
}