const API_KEY: string = "fff96e65043c429ab9acd560b3f8baba"; // Replace with your actual TMDB API key  
const baseURL: string = "https://api.themoviedb.org/3";  

interface Requests {  
  fetchTrending: string;  
  fetchOriginals: string;  
  fetchTopRated: string;  
  fetchActionMovies: string;  
  fetchComedyMovies: string;  
}  

const request: Requests = {  
  fetchTrending: `${baseURL}/trending/all/week?api_key=${API_KEY}&language=en-US`,  
  fetchOriginals: `${baseURL}/discover/tv?api_key=${API_KEY}&with_networks=213`,  
  fetchTopRated: `${baseURL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,  
  fetchActionMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=28`,  
  fetchComedyMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=35`,  
};  

export default request;  