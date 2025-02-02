import { memo, FC, useRef } from 'react';

import MoviesSlides from './MoviesSlides';

import { useGetMoviesQuery } from '../../services/omdbApi';
import { cn } from '../../utils/helper';

interface SectionProps {
  title: string;
  search: string;
  className?: string;
}

const Section: FC<SectionProps> = ({ title, search, className }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const sanitizedSearch = search
  .normalize("NFD")
  .replace(/[^a-zA-Z0-9 ]/g, "")
  .slice(0, 8);


  const { data } = useGetMoviesQuery(
    {
      search: sanitizedSearch,
    }
  );

  const movies = data?.Search ?? [];

  const sectionStyle = cn(
    `sm:py-[20px] xs:py-[18.75px] py-[16.75px] font-nunito`,
    className
  );

  return (
    <section className={sectionStyle} ref={ref}>
      <div className="flex flex-row justify-between items-center mb-[22.75px]">
        <div className="relative">
          <h3 className="sm:text-[22.25px] xs:text-[20px] text-[18.75px] sm:font-bold font-semibold">
            {title}
          </h3>
          <div className="line" />
        </div>
      </div>
      <div className="sm:h-[312px] xs:h-[309px] h-[266px]">
        <MoviesSlides movies={movies.slice(0, 5)} />
      </div>
    </section>
  );
};

export default memo(Section);
