import { memo } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

const MovieItem = ({ data }) => {
   const router = useRouter()
   const truncateTitle = (title, maxLength) => {
      if (title.length > maxLength) {
         return title.substring(0, maxLength) + '...';
      }
      return title;
   }
   return (
      <div onClick={() => router.push(`/movie/${data.id}`)} className="movie-card">
         <div className="movie-card-head">
            <div className="movie-card-head-content">
               <Image
                  src={data?.poster}
                  fill
                  sizes='(max-width: 768px) 100vw, 768px'
                  priority
                  alt='poster image'
               />
            </div>
            <div className="bg_box"></div>
         </div>
         <div className="movie-card-body">
            <p>{truncateTitle(data.title, 16)}</p>
            <span>{data.year}</span>
         </div>
      </div>
   )
}

export default memo(MovieItem)
