import { memo, FC } from "react";
import { m } from "framer-motion";

import { useMotion } from "../../../hooks/useMotion";

interface CastsProps {
  actors: string;
}

const Casts: FC<CastsProps> = ({ actors }) => {
  const { fadeDown, staggerContainer } = useMotion();

  const topCasts = actors ? actors.split(", ").slice(0, 4) : [];

  if (topCasts.length === 0) return null;

  return (
    <>
      <m.h3
        variants={fadeDown}
        className="text-secColor font-bold md:text-[18px] sm:text-[16.75px] xs:text-[15.75px] text-[14.75px]"
      >
        Top Casts
      </m.h3>
      <m.div
        variants={staggerContainer(0.2, 1)}
        initial="hidden"
        animate="show"
        className="flex flex-wrap md:gap-4 sm:gap-[14px] gap-2 sm:-mt-2 xs:-mt-[6px] -mt-1"
      >
        {topCasts.map((name, index) => (
          <m.figure
            variants={fadeDown}
            key={index}
            className="flex flex-col justify-start gap-2"
          >
            <h4 className="text-gray-300 md:text-[12px] sm:text-[10.75px] text-[10px] text-center font-semibold sm:-mt-0 leading-snug">
              {name}
            </h4>
          </m.figure>
        ))}
      </m.div>
    </>
  );
};

export default memo(Casts, (prevProps, newProps) => {
  return prevProps.actors === newProps.actors;
});
