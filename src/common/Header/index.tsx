import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import throttle from 'lodash.throttle';
import { Logo } from '..';
import { maxWidth } from '../../styles';
import { THROTTLE_DELAY } from '../../utils/config';
import { cn } from '../../utils/helper';
const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    const handleBackgroundChange = () => {
      const body = document.body;
      if (
        window.scrollY > 0 ||
        (body.classList.contains('no-scroll') &&
          parseFloat(body.style.top) * -1 > 0)
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };
    const throttledHandleBackgroundChange = throttle(
      handleBackgroundChange,
      THROTTLE_DELAY
    );
    window.addEventListener('scroll', throttledHandleBackgroundChange);
    return () => {
      window.removeEventListener('scroll', throttledHandleBackgroundChange);
    };
  }, []);
  useEffect(() => {
    if (location.pathname.split('/').length > 3) {
      setIsNotFoundPage(true);
    } else {
      setIsNotFoundPage(false);
    }
  }, [location.pathname]);
  return (
    <header
      className={cn(
        `md:py-[16px] py-[14.5px]  fixed top-0 left-0 w-full z-10 transition-all duration-50`
      )}
    >
      <nav
        className={cn(maxWidth, `flex justify-between flex-row items-center`)}
      >
        <Logo
          logoColor={cn(
            isNotFoundPage
              ? 'text-black'
              : !isNotFoundPage && isActive
              ? 'text-black'
              : 'text-primary'
          )}
        />
      </nav>
    </header>
  );
};
export default Header;