'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { BASE_URl, SECRET_TOKEN } from '../../config/index'
import Player from '../../components/CustomPlayer/player'
import Carusel from '../../components/Carusel/carusel'
import NotFound from '../../components/NotFound'

const MovieInfo = ({ data }) => {
   const scrollRef = useRef()
   const router = useRouter()
   const [play, setPlay] = useState(false)

   useEffect(() => {
      console.log(data)
      router.events.on('routeChangeStart', () => setPlay(false))

      return () => {
         router.events.off('routeChangeStart', () => setPlay(false))
      }
   }, [router.asPath])

   if (!data?.status || data?.code === 404) {
      return <NotFound />
   }
   
   const movie = data?.data

   const playMovie = () => {
      setPlay(true)
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
   }
   return (
      <div className="movie-details">
         <div className="movie-poster">
            <div className="movie-img">
               <Image
                  src={movie?.poster}
                  fill
                  sizes='(max-width: 768px) 100vw, 768px'
                  priority
                  alt='poster image'
               />
            </div>
            <div className="movie-description">
               <h4 className="movie-title">{movie?.title}</h4>
               <h5 className="movie-title-en">{movie?.titleEn}</h5>
               <p className="movie-desc-content">{movie?.description}</p>

               <div className="ratings">
                  <div className="ratings_item">
                     <span className="ratings_item-name">IMDb</span>
                     <span className="ratings_item-grade">{movie?.rating.imdb?.rating || '0.0'}</span>
                  </div>
                  <div className="ratings_item">
                     <span className="ratings_item-name">Кинопоиска</span>
                     <span className="ratings_item-grade">{movie?.rating?.kp?.rating || '0.0'}</span>
                  </div>
               </div>
               <button onClick={playMovie} className="play-btn">Смотреть</button>
               <div className="movie-about">
                  <h2>О фильме</h2>
                  {movie?.year && <div className="movie-about-item">
                     <span>Год:</span>
                     <span>{movie?.year}</span>
                  </div>}
                  {movie?.countries && <div className="movie-about-item">
                     <span>Страна:</span>
                     {movie?.countries.map((item, index) => (
                        <span key={index}>{item?.title}</span>
                     ))}
                  </div>}
                  {movie?.genres && <div className="movie-about-item">
                     <span>Жанр:</span>
                     {movie?.genres.map((item, index) => (
                        <span key={index}>{item?.title}, </span>
                     ))}
                  </div>}
               </div>
            </div>
         </div>
         <div ref={scrollRef} className="movie-player">
            <Player
               key={router.asPath}
               src={'/assets/videos/video_example.mp4'}
               isPlaying={play}
               setIsPlaying={setPlay}
            />
         </div>
         {movie?.actors && <>
            <h5 className="section-title">Актеры</h5>
            <div className="actors">
               <Carusel contents={movie?.actors} />
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