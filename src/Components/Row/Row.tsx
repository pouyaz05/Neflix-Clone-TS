import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Trailer from "../Trailer";
import Skeleton from 'react-loading-skeleton';
import { Movie,RowProps } from '../Row/Row';
import "./Row.css"

const Row: React.FC<RowProps> = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl);
        if (response.data?.results) {
          setMovies(response.data.results);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    const handleScroll = () => {
      if (rowRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - (clientWidth * 1.03));
      }
    };

    const currentRef = rowRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.8;
      const newPosition = direction === 'left'
        ? Math.max(0, scrollLeft - scrollAmount)
        : scrollLeft + scrollAmount;

      rowRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return (
    <div className="p-8 text-lg text-center bg-gray-800 rounded-lg mx-auto my-5 max-w-xs">
      Loading {title}...
    </div>
  );

  if (error) return (
    <div className="p-8 text-lg text-center bg-gray-800 rounded-lg mx-auto my-5 max-w-xs text-red-500 border-l-4 border-red-600">
      Error loading {title}: {error}
    </div>
  );

  return (
    <div className="text-white mx-[3%] mb-10 relative">
      <h2 className="text-2xl font-bold mb-4 pl-8 relative inline-block row-title">
        {title}
      </h2>
      
      <div className="flex justify-around items-center text-gray-400 mx-auto w-full max-w-[1800px] relative">
      <button 
          className={`scroll-btn left ${showLeftArrow ? 'visible' : ''}`}
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <img src="../public/right (1).png" alt="" />
        </button> 
        
        <div 
          className="row-posters"
          ref={rowRef}
        >
          {movies.map(movie => (
            <img
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title || movie.name}
              className={`row-poster ${selectedMovie?.id === movie.id ?'border-2 border-[#e50914] scale-[1.05]' : ''}`} loading="lazy"/>
          ))}
          <Skeleton height={200} />
        </div>
        
        <button 
            className={`scroll-btn right ${showRightArrow ? '' : 'hidden'}`}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <img src="../public/rights.png" alt="" />
          </button>
      </div>

      {/* Modal برای نمایش جزئیات فیلم */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/50" 
              onClick={() => setSelectedMovie(null)}
            ></div>
            
            {/* Modal Content */}
            <div className="relative rounded-lg max-w-[60%]  mx-auto z-10 text-white border border-zinc-600 modal1">
              <div className="h-98 bg-cover bg-center rounded-lg content-end modal" 
                               style={{
                             backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`
                        }} >
                {/* Close Button */}
                <button
                  className="absolute top-2 right-4 text-gray-300 hover:text-white"
                  onClick={() => setSelectedMovie(null)}
                >
                  <span className="text-5xl">&times;</span>
                </button>

                {/* Movie Title */}
                <div className="  bgimg   bg-no-repeat content-end bg-cover bg-bottom ">
                <div className='flex flex-row ps-4 mb-10 '><img className=' w-15' src="../public/Netflix-N-Symbol-logo.png" alt="" />
                 <h2 className='text-gray-400 mt-4 font-bold text-sm md:text-base lg:text-lg xl:text-xl font-mono  tracking-[0.5rem]'>FILM</h2>
                </div>
                <h1 className="text-4xl font-extrabold ps-8 pb-6 font-serif tracking-wider">
                {selectedMovie.title || selectedMovie.name }
              </h1></div>
              </div>
              
              {/* Movie Content */}
              <div className="bg-gradient-to-t from-[#181818] from-[98%] via-[#121212] via-[200%] to-transparent 
                              rounded-b-lg pt-0.5 px-8 pb-8">
                {/* Movie Details */}
                <div className="flex-1 mt-1">
                  <div className="flex flex-row justify-between tracking-wide grids">
                    <div className='flex flex-row text-center items-center'>
                      <p className="font-semibold me-2 m">Date: </p>
                      <p className='m'>{selectedMovie.first_air_date?(parseInt(selectedMovie.first_air_date)).toFixed():'Coming Soon'}</p>
                    </div>
                    <div className='flex flex-row items-center'>
                      <p className="font-semibold me-2 m">Rating: </p>
                      <p className='m'>{selectedMovie.vote_average?parseFloat((selectedMovie.vote_average).toFixed(1)):'0.0'}/10</p>
                    </div>
                    {selectedMovie.origin_country?.[0] && (
                      <div className='flex flex-row items-center '>
                        <p className="font-semibold me-2 m">Country: </p>
                        <p>{selectedMovie.origin_country[0]}</p>
                      </div>
                    )}
                    <Trailer movie={selectedMovie}/>
                  </div>
                  <p className="my-4 text-gray-300 m">{selectedMovie.overview}</p>
                  <div>
                    <button className='py-1 px-5 rounded-lg font-bold m bg-[#e50914]'>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;