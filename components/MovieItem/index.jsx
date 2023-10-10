import { memo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const MovieItem = ({ data }) => {
   const router = useRouter()
   return (
      <div onClick={() => router.push(`/movie/${data.id}`)} className="movie-item">
         <div className="movie-img">
            <Image src={data?.poster} layout={'fill'} priority />
            <div className="addition-info">
               {data.rates?.imdb && <p className="imdb">IMDb {data.rates?.imdb}</p>}
               <p className="country">{data?.year},{data.countries[0]?.title}</p>
            </div>
         </div>
         <p className="movie-name">{data?.title}</p>
      </div>
   )
}

export default memo(MovieItem)
