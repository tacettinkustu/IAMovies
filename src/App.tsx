import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Footer, ScrollToTop, Loader } from './common';

import 'react-loading-skeleton/dist/skeleton.css';

const Catalog = lazy(() => import('./pages/Catalog'));
const Detail = lazy(() => import('./pages/Detail'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <>
      <main className=" lg:pb-14 md:pb-4 sm:pb-2 xs:pb-1 pb-0">
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/:id" element={<Detail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </main>
      <Footer />
    </>
  );
};

export default App;
