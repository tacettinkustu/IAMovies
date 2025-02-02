import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

import Image from '../Image';
import { IMovie } from '../../types';
import { useMediaQuery } from 'usehooks-ts';

const MovieCard = ({ movie }: { movie: IMovie }) => {
  const { Poster, Title, imdbID, Year } = movie;
  const isMobile = useMediaQuery('(max-width: 380px)');

  return (
    <>
      <Link
        to={`/${imdbID}`}
        className="bg-[#f5f5f5] rounded-lg relative group w-[170px] select-none xs:h-[250px] h-[216px] overflow-hidden"
      >
        <Image
          height={!isMobile ? 250 : 216}
          width={170}
          src={Poster}
          alt={Title}
          className="h-full object-cover rounded-lg drop-shadow-md shadow-md group-hover:shadow-none group-hover:drop-shadow-none transition-all duration-300 ease-in-out"
          effect="zoomIn"
        />

        <div className="absolute top-0 left-0 w-[170px] h-full group-hover:opacity-100 opacity-0 bg-[rgba(0,0,0,0.6)] transition-all duration-300 rounded-lg flex items-center justify-center">
          <div className="xs:text-[48px] text-[42px] text-[#ff0000] scale-[0.4] group-hover:scale-100 transition-all duration-300 ">
            <FaEye />
          </div>
        </div>
      </Link>

      <h4 className="text-center cursor-default sm:text-base xs:text-[14.75px] text-[14px] font-medium ">
        {Title?.length > 50 ? Title.split(':')[0] : Title}
        <p className="text-center cursor-default sm:text-sm xs:text-[12px] text-[11px] font-medium">
          ({Year})
        </p>
        <p className="text-center cursor-default sm:text-xs xs:text-[5px] text-[4px] font-extralight">
          {imdbID}
        </p>
      </h4>
    </>
  );
};

export default MovieCard;
