import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';

import { MovieCard, SkelatonLoader } from '../../common';
import { Search } from './components';
import { useGetMoviesQuery } from '../../services/omdbApi';
import { smallMaxWidth } from '../../styles';
import { IMovie } from '../../types';
import bgImg from '../../assets/images/footer-bg.webp';

const Catalog = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useSearchParams();

  const searchQuery = query.get('search')?.trim() || 'Pokemon';
  const year = query.get('year') || '';
  const type = query.get('type') || '';

  const { data, isLoading, isFetching } = useGetMoviesQuery({
    search: searchQuery,
    page,
    year,
    type,
  });

  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [searchQuery, year, type]);

  useEffect(() => {
    if (isLoading || isFetching) return;

    if (data?.Search) {
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults, 10) || 0);
    }
  }, [data, isFetching, isLoading, page]);

  const totalPages = Math.ceil(totalResults / 10);
  const maxVisiblePages = 10;
  const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.075), rgba(0,0,0,0.075)), url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="lg:h-[140px] md:h-[132px] sm:h-[114px] h-[96px] relative"
      />
      <section className={`${smallMaxWidth}`}>
        <Search setQuery={setQuery} />

        <div className="flex justify-between items-center p-4">
          <select
            className="border p-2 px-4 rounded"
            value={year}
            onChange={(e) =>
              setQuery((prev) => {
                prev.set('year', e.target.value);
                return prev;
              })
            }
          >
            <option value="">All Years</option>
            {Array.from({ length: 25 }, (_, i) => {
              const yearValue = new Date().getFullYear() - i;
              return (
                <option key={yearValue} value={yearValue}>
                  {yearValue}
                </option>
              );
            })}
          </select>

          <select
            className="border p-2 px-4 rounded"
            value={type}
            onChange={(e) =>
              setQuery((prev) => {
                prev.set('type', e.target.value);
                return prev;
              })
            }
          >
            <option value="">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
            <option value="episode">Episodes</option>
          </select>
        </div>

        {isLoading ? (
          <SkelatonLoader isMoviesSliderLoader={false} />
        ) : (
          <>
            {/* Grid Layout: 5 columns on desktop, responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div
                    key={movie.imdbID}
                    className="flex flex-col gap-2 rounded-lg"
                  >
                    <MovieCard movie={movie} />
                  </div>
                ))
              ) : (
                <p className="text-gray-300 text-center mt-4 col-span-full">
                  No movies found.
                </p>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination flex justify-center items-center gap-2 mt-6">
                {page > 1 && (
                  <button
                    type="button"
                    onClick={() => setPage(1)}
                    className="px-3 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
                  >
                    First
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
                >
                  Prev
                </button>

                {[...Array(endPage - startPage + 1)].map((_, index) => (
                  <button
                    key={startPage + index}
                    onClick={() => setPage(startPage + index)}
                    className={`px-3 py-2 rounded-md ${
                      page === startPage + index
                        ? 'bg-[#ff0000] text-white font-bold'
                        : 'bg-gray-300 text-black'
                    } hover:bg-gray-400 transition`}
                  >
                    {startPage + index}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className="px-3 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
                >
                  Next
                </button>

                {page < totalPages && (
                  <button
                    type="button"
                    onClick={() => setPage(totalPages)}
                    className="px-3 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
                  >
                    Last
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {isFetching && (
          <div className="my-4">
            <FiLoader className="mx-auto w-5 h-5 animate-spin" />
          </div>
        )}
      </section>
    </>
  );
};

export default Catalog;
