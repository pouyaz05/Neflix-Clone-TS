export interface Movie {  
    id: number;  
    title?: string;  
    name?: string;  
    poster_path?: string;  
    backdrop_path?: string;  
    first_air_date?: string;  
    vote_average?: number;  
    overview?: string;  
    origin_country?: string[];  
  }  
  
  // تعریف نوع پروپس Row  
 export interface RowProps {  
    title: string;  
    fetchUrl: string;  
  }  