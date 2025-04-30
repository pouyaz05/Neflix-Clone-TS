import React, { useEffect, useState } from 'react';  
import movieTrailer from 'movie-trailer';  
import YouTube from "react-youtube";  
// import "./App.css";  
import { Movie } from './Row/Row'; // فرض کنید نوع‌های فیلم در این فایل هستند  


interface TrailerProps {  
  movie: Movie; // استفاده از نوع Movie  
}  

const Trailer: React.FC<TrailerProps> = ({ movie }) => {  
  const [trailerURL, setTrailerURL] = useState<string>('');  
  const [enable, setEnable] = useState<string>("Trailer");  
//   const [showSpinner, setShowSpinner] = useState<boolean>(true); // برای نمایش اسکرینر  

  const opts = {  
    height: '390',  
    width: '100%',  
    playerVars: {  
      autoplay: 1,  
      rel: 0,  
      modestbranding: 1,  
      controls: 1,  
      disablekb: 1,  
      fs: 1,  
      iv_load_policy: 3,  
      playsinline: 1,  
    }  
  };  

//   useEffect(() => {  
//     const timer = setTimeout(() => {  
//       setShowSpinner(false);  
//     }, 10000); // 10 ثانیه  

//     return () => clearTimeout(timer); // پاکسازی تایمر هنگام آنمونت  
//   }, []);  

  const handleTrailer = () => {  
    if (trailerURL) {  
      setTrailerURL('');  
      setEnable("Trailer");  
    } else {  
      movieTrailer(movie.title || movie.name  || "")  
        .then((url : string | URL) => {  
          const urlParams = new URLSearchParams(new URL(url).search);  
          setTrailerURL(urlParams.get('v') || '');  
          setEnable("Back");  
        })  
        .catch((error : string) => {  
          console.error("Error fetching trailer:", error);  
          alert(`Trailer not found for: ${movie.title}`);  
        });  
    }  
  };  

  return (  
    <div className="">  
      <div className="">  
        <button onClick={handleTrailer} className='p-0.5 px-3 rounded-lg font-bold m' style={{ backgroundColor: "#e50914" }}>  
          {enable}  
        </button>  
      </div>  
      {trailerURL && (  
        <div className="z-50 absolute h-100 left-0 position mt-8 mx-auto w-[100%] max-w-[1000px] rounded-lg overflow-hidden">  
          <YouTube  
            videoId={trailerURL}  
            opts={opts}  
            // containerClassName="relative pb-[56.25%] bg-black"  
            className='relative pb-[56.25%] bg-black'  
          />  
        </div>  
      )}  
    </div>  
  );  
}  

export default Trailer;