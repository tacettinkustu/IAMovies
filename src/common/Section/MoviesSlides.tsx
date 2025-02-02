import { FC } from 'react';
import MovieCard from '../MovieCard';
import { IMovie } from '../../types';

interface MoviesSlidesProps {
  movies: IMovie[];
}

const MoviesSlides: FC<MoviesSlidesProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4">
      {movies.slice(0, 5).map((movie) => (
        <div key={movie.imdbID} className="flex flex-col">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MoviesSlides;
