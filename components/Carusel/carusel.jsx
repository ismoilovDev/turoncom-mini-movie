import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
   0: {
      items: 1
   },
   420: {
      items: 2
   },
   556: {
      items: 3
   },
   992: {
      items: 4
   },
   1024: {
      items: 5,
      itemsFit: 'contain'
   },
   1200: {
      items: 6,
      itemsFit: 'contain'
   }
};

const Carusel = ({ contents }) => {
   const [items, setItems] = useState([]);

   useEffect(() => {
      const loadImagesAsync = async () => {
         if (contents) {
            const loadedItems = await Promise.all(
               contents.map(async (content, index) => {
                  return (
                     <div key={index} className="actors-card">
                        <div className="actors_card_head">
                           <Image
                              src={content?.photo ? content?.photo : '/assets/images/not_found_img.jpg'}
                              fill
                              sizes='(max-width: 768px) 100vw, 768px'
                              priority
                              alt='actor image'
                           />
                        </div>
                        <div className="actors_card_body">
                           <span>{content?.fullName}</span>
                        </div>
                     </div>
                  );
               })
            );
            setItems(loadedItems);
         }
      }
      loadImagesAsync();
   }, [contents]);

   return (
      <>
         {items.length > 0 && (
            <AliceCarousel
               mouseTracking
               responsive={responsive}
               autoPlay
               autoPlayInterval={1000}
               disableButtonsControls
               disableDotsControls
               infinite
               items={items}
            />
         )}
      </>
   );
};

export default memo(Carusel);
