import axios from 'axios';  
import React, { useEffect, useState, useRef } from 'react';  
import request from '../Requests';  
import { Movie } from '../Row/Row';
import './Banner.css';

const Banner: React.FC = () => {  
    const [movies, setMovies] = useState<Movie[]>([]);  
    const [currentIndex, setCurrentIndex] = useState<number>(0);  
    const bannerRef = useRef<HTMLDivElement | null>(null);  
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);  

    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const res = await axios.get(request.fetchOriginals);  
                if (res.data?.results) {  
                    setMovies(res.data.results);  
                } else {  
                    throw new Error('Invalid API response structure');  
                }  
            } catch (error) {  
                console.error("Error fetching data:", error);  
            }  
        };  
        fetchData();  
    }, []);  

    useEffect(() => {  
        if (movies.length > 0) {  
            if (autoScrollRef.current) {  
                clearInterval(autoScrollRef.current);  
            }  

            autoScrollRef.current = setInterval(() => {  
                const nextIndex = (currentIndex + 1) % movies.length;  
                scrollToBanner(nextIndex);  
            }, 4000);  

            return () => {  
                if (autoScrollRef.current) {  
                    clearInterval(autoScrollRef.current);  
                }  
            };  
        }  
    }, [movies, currentIndex]);  

    const scrollToBanner = (index: number) => {  
        if (bannerRef.current && movies.length > 0) {  
            const bannerWidth = bannerRef.current.offsetWidth;  
            bannerRef.current.scrollTo({  
                left: index * bannerWidth,  
                behavior: 'smooth',  
            });  
            setCurrentIndex(index);  
        }  
    };  

    const nextBanner = () => {  
        const nextIndex = (currentIndex + 1) % movies.length;  
        scrollToBanner(nextIndex);  
        resetAutoScroll();  
    };  

    const prevBanner = () => {  
        const prevIndex = (currentIndex - 1 + movies.length) % movies.length;  
        scrollToBanner(prevIndex);  
        resetAutoScroll();  
    };  

    const resetAutoScroll = () => {  
        if (autoScrollRef.current) {  
            clearInterval(autoScrollRef.current);  
        }  
        autoScrollRef.current = setInterval(() => {  
            const nextIndex = (currentIndex + 1) % movies.length;  
            scrollToBanner(nextIndex);  
        }, 4000);  
    };  

    if (movies.length === 0) return <div className="loading">Loading...</div>;  

    return (  
        <div className="relative mb-5 w-full">  
            <div ref={bannerRef} className="bannerdiv">  
                {movies.map((movie) => (  
                    <header   
                        key={movie.id}  
                        className="banner "   
                        style={{  
                            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,  
                        }}  
                    >   
                        <div className="ml-8 pt-36 h-48 nevesh">  
                            <h1 className="text-4xl font-extrabold pb-1 titl">{movie.name}</h1>  
                            <div className="flex mt-2">  
                                <button className="banner-btn ">Play</button>  
                                <button className="banner-btn ">My List</button>  
                            </div>  
                            <p className="banner-description text-sm md:text-base lg:text-lg xl:text-xl">  
                                {movie.overview}  
                            </p>  
                        </div>  
                        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black to-transparent"></div>  
                    </header>  
                ))}  
            </div>  

            <button className="nav-button prev pe-1" onClick={prevBanner}>  
                <img src="../public/right (1).png" alt="Previous" />  
            </button>  
            <button className="nav-button next ps-1" onClick={nextBanner}>  
                <img src="../public/right.png" alt="Next" />  
            </button>  

            {/* Indicators */}  
            <div className="indicators">  
                {movies.map((_, index) => (  
                    <div   
                        key={index}  
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}  
                        onClick={() => {  
                            scrollToBanner(index);  
                            resetAutoScroll();  
                        }}  
                    />  
                ))}  
            </div>  
        </div>  
    );  
};  

export default Banner;