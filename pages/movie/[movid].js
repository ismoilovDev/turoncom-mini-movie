import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { BASE_URl, SECRET_TOKEN } from '@/config'
import MovieItem from '@/components/MovieItem'
import Player from '@/components/Player'

const MovieInfo = ({ data }) => {
   const scrollRef = useRef()
   const router = useRouter()

   const [hasWindow, setHasWindow] = useState(false)
   const [play, setPlay] = useState(false)

   useEffect(() => {
      if (typeof window !== 'undefined') {
         setHasWindow(true)
      }
   }, [])

   useEffect(() => {
      router.events.on('routeChangeStart', () => setPlay(false))

      return () => {
         router.events.off('routeChangeStart', () => setPlay(false))
      }
   }, [router.asPath])

   if (data?.code === undefined || data?.code === 404) {
      return <p className="data-not-found">Movie not found</p>
   }
   const { movie } = data?.data

   const playMovie = () => {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => { setPlay(true) }, 100)
   }

   return (
      <div className="movie-info">
         <div className="movie-poster">
            <div className="movie-img">
               <Image src={movie?.files.poster_url} layout="fill" priority alt='' />
            </div>
            <div className="movie-desc-wrapper">
               <div className="left">
                  <h5 className="movie-name">{movie?.title}</h5>
                  <p className="movie-desc">{movie?.description}</p>
                  <div className="ratings">
                     <div className="rating">
                        Рейтинг кинопоиска
                        <span className="rating-grade">{movie?.rates.kinopoisk || '0.0'}</span>
                     </div>
                     <div className="rating">
                        Рейтинг IMDb
                        <span className="rating-grade">{movie?.rates.imdb || '0.0'}</span>
                     </div>
                  </div>
                  <button onClick={playMovie} className="play-btn">Смотреть</button>
               </div>
               <div className="right">
                  {movie?.countries_str && <div className="category">
                     <b className="category-name">Страна:</b>
                     <span>{movie?.countries_str}</span>
                  </div>}
                  {movie?.year && <div className="category">
                     <b className="category-name">Год:</b>
                     <span>{movie?.year}</span>
                  </div>}
                  {movie?.genres_str && <div className="category">
                     <b className="category-name">Жанр:</b>
                     <span>{movie?.genres_str}</span>
                  </div>}
                  {movie?.label && <div className="category">
                     <b className="category-name">Провайдер:</b>
                     <span>{movie?.label}</span>
                  </div>}
               </div>
            </div>
         </div>
         <div ref={scrollRef} className="movie-player">
            {hasWindow && <Player key={router.asPath} videoUrl={'/assets/videos/mov_bbb.mp4'} playing={play} setPlaying={setPlay} />}
         </div>
         {movie?.movies?.length > 0 && <>
            <h5 className="title">Похожие</h5>
            <div className="similar-movies">
               {
                  movie?.movies.map(item => (
                     <MovieItem key={item.id} data={item} />
                  ))
               }
            </div>
         </>}
      </div>
   )
}

export default MovieInfo;

export const getServerSideProps = async ({ params }) => {
   let data = [];
   let error = ""

   try {
      const response = await fetch(`${BASE_URl}/movie-detail?id=${params.movid}`, {
         headers: {
            'secret-token': SECRET_TOKEN,
            'Content-Type': 'application/json'
         }
      })
      if (response.status !== 200)
         throw String(`Invalid server response: ${response.status} ${response.statusText}`);

      data = await response.json();

      if (Object.keys(data).length === 0 && data.constructor === Object) throw String("No data was found!");

      data = JSON.parse(JSON.stringify(data));
   } catch (e) {
      error = 'Movie not found';
   }

   return {
      props: {
         data,
         error,
      },
   };
}