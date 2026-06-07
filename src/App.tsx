import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import request from "./Components/Requests.ts";
import Row from "./Components/Row/Row.tsx";
import Banner from "./Components/Banner/Banner.tsx";
import Nav from "./Components/Nav/Nav.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Login from "./Components/Login/Login.tsx";
import Register from "./Components/Login/Register.tsx";
import ProfilePage from "./Components/Profile/Profile.tsx";


const App: FC = () => {
  return (
    <div className="App">
      <Router>
        {/* مسیرهای صفحه های مختلف */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage/>} />

          <Route
            path="/"
            element={
              <>
                <Nav />
                <Banner />
                <Row title="Trending Now" fetchUrl={request.fetchTrending} />
                <Row
                  title="Netflix Originals"
                  fetchUrl={request.fetchOriginals}
                />
                <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
                <Row
                  title="Action Movies"
                  fetchUrl={request.fetchActionMovies}
                />
                <Row
                  title="Comedy Movies"
                  fetchUrl={request.fetchComedyMovies}
                />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
