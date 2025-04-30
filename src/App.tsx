import React from 'react';  
import { FC } from 'react';  
import "./App.css"
import request from './Components/Requests.ts';
import Row from './Components/Row/Row.tsx';
import Banner from './Components/Banner/Banner.tsx';
import Nav from './Components/Nav/Nav.tsx';
import Footer from './Components/Footer/Footer.tsx'


// Main App Component  
const App: FC = () => {  
  return (  
    <div className="App" >
      <Nav/>
      <Banner/>
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
      <Row title="Netflix Originals" fetchUrl={request.fetchOriginals} />
      <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
      <Footer/>
    </div>
  );  
};  

export default App;