import { Key, useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { useParams } from 'react-router-dom';

import { Poster, Loader, Error, Section } from '../../common';
import { Casts, Genre } from './components';

import { useGetMovieDetailsQuery } from '../../services/omdbApi';
import { useMotion } from '../../hooks/useMotion';
import { mainHeading, maxWidth, paragraph } from '../../styles';
import { cn } from '../../utils/helper';

const Detail = () => {
  const { id } = useParams();
  const [show, setShow] = useState<boolean>(false);
  const { fadeDown, staggerContainer } = useMotion();

  const {
    data: movie,
    isLoading,
    isFetching,
    isError,
  } = useGetMovieDetailsQuery(id || '');

  useEffect(() => {
    document.title = movie?.Title && !isLoading ? movie.Title : 'iaMovies';
    return () => {
      document.title = 'iaMovies';
    };
  }, [movie?.Title, isLoading]);

  const toggleShow = () => setShow((prev) => !prev);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError || !movie) {
    return <Error error="Something went wrong!" />;
  }

  const {
    Title,
    Poster: posterPath,
    Plot,
    Genre: genres,
    Actors,
    imdbRating,
    Runtime,
    Director,
  } = movie;

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0, 0.95), rgba(0,0,0,0.90),rgba(0,0,0,0.8),rgba(0,0,0,0.6))`,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
  };

  return (
    <>
      <section className="w-full" style={backgroundStyle}>
        <div
          className={`${maxWidth} lg:py-36 sm:py-[136px] sm:pb-28 xs:py-28 xs:pb-12 pt-24 pb-8 flex flex-row lg:gap-12 md:gap-10 gap-8 justify-center`}
        >
          <Poster
            title={Title}
            posterPath={
              posterPath !== 'N/A' ? posterPath : '/fallback-image.jpg'
            }
          />
          <m.div
            variants={staggerContainer(0.2, 0.4)}
            initial="hidden"
            animate="show"
            className="text-gray-300 sm:max-w-[80vw] max-w-[90vw] md:max-w-[520px] font-nunito flex flex-col lg:gap-5 sm:gap-4 xs:gap-[14px] gap-3 mb-8 flex-1"
          >
            <m.h2
              variants={fadeDown}
              className={cn(mainHeading, 'md:max-w-[420px]')}
            >
              {Title}
            </m.h2>

            <m.ul
              variants={fadeDown}
              className="flex flex-row items-center sm:gap-[14px] xs:gap-3 gap-[6px] flex-wrap"
            >
              {genres
                ?.split(', ')
                .map((genre: string, index: Key | null | undefined) => (
                  <Genre key={index} name={genre} />
                ))}
            </m.ul>

            <m.p variants={fadeDown} className={paragraph}>
              <span>
                {Plot.length > 280
                  ? `${show ? Plot : `${Plot.slice(0, 280)}...`}`
                  : Plot}
              </span>
              <button
                type="button"
                className={cn(
                  `font-bold ml-1 hover:underline transition-all duration-300`,
                  Plot.length > 280 ? 'inline-block' : 'hidden'
                )}
                onClick={toggleShow}
              >
                {!show ? 'show more' : 'show less'}
              </button>
            </m.p>

            <m.div
              variants={fadeDown}
              className="flex flex-row items-center gap-2 mt-4"
            >
              <span className="text-gray-300 font-semibold">IMDb Rating:</span>
              <span className="text-secColor font-bold">{imdbRating}</span>
            </m.div>
            <m.div
              variants={fadeDown}
              className="flex flex-row items-center gap-2 mt-1"
            >
              <span className="text-gray-300 font-semibold">Duration:</span>
              <span className="text-secColor font-bold">{Runtime}</span>
            </m.div>

            <>
              <m.h3
                variants={fadeDown}
                className="text-secColor font-bold md:text-[18px] sm:text-[16.75px] xs:text-[15.75px] text-[14.75px]"
              >
                Director
              </m.h3>
              <m.div
                variants={staggerContainer(0.2, 1)}
                initial="hidden"
                animate="show"
                className="flex flex-wrap md:gap-4 sm:gap-[14px] gap-2 sm:-mt-2 xs:-mt-[6px] -mt-1"
              >
                <h4 className="text-gray-300 md:text-[12px] sm:text-[10.75px] text-[10px] text-center font-semibold sm:-mt-0 leading-snug">
                  {Director}
                </h4>
              </m.div>
            </>
            <Casts actors={Actors || ''} />
          </m.div>
        </div>
      </section>

      <Section
        title="Similar Movies"
        search={Title}
        className={`${maxWidth}`}
      />
    </>
  );
};

export default Detail;
