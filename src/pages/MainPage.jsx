import React, { useEffect, useState, useRef } from "react";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import styled from "styled-components";
import { Loader } from "../components/Loader";
import buttonLoader from "../assets/buttonLoader.svg";
import arrowBack from "../assets/arrowBack.svg";
import arrowForward from "../assets/arrowForward.svg";

export const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [moreMoviesLoading, setMoreMoviesLoading] = useState(false);
  const [trendingScrollPosition, setTrendingScrollPosition] = useState(0);
  const [trendingMoviesPage, setTrendingMoviesPage] = useState(1);
  const moviesListRef = useRef(null);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    axios
      .get(`${apiURL}/movies/trending/day/${trendingMoviesPage}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
        setMoviesLoading(false);
        setMoreMoviesLoading(false);
      });
  }, [apiURL]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setMoreMoviesLoading(true);
    axios
      .get(`${apiURL}/movies/trending/day/${trendingMoviesPage}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        const newMovies = response.data;
        const allMovies = [...movies, ...newMovies];

        const uniqueMovies = allMovies.reduce((acc, current) => {
          if (!acc.some((movie) => movie.id === current.id)) {
            acc.push(current);
          }
          return acc;
        }, []);

        setMovies(uniqueMovies);
        setMoreMoviesLoading(false);
      });
  }, [trendingMoviesPage]);

  const handleScrollRight = () => {
    if (moviesListRef.current) {
      const newTrendingScrollPosition = trendingScrollPosition + 350;
      const maxScrollLeft =
        moviesListRef.current.scrollWidth - moviesListRef.current.clientWidth;

      if (newTrendingScrollPosition >= maxScrollLeft) {
        setMoreMoviesLoading(true);
        setTrendingMoviesPage(trendingMoviesPage + 1);
      } else {
        moviesListRef.current.scrollTo({
          left: newTrendingScrollPosition,
          behavior: "smooth",
        });
        setTrendingScrollPosition(newTrendingScrollPosition);
      }
    }
  };

  const handleScrollLeft = () => {
    if (moviesListRef.current) {
      const newtrendingScrollPosition = trendingScrollPosition - 350;
      moviesListRef.current.scrollTo({
        left: newtrendingScrollPosition,
        behavior: "smooth",
      });
      setTrendingScrollPosition(newtrendingScrollPosition);
    }
  };

  return (
    <Wrapper>
      <FirstMovieContainer>
        {!moviesLoading && movies.length > 0 ? (
          <>
            <FirstMoviePoster
              src={`https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`}
            />
            <FirstMovieDetails>
              <FirstMovieTitle>{movies[0].title}</FirstMovieTitle>
              <FirstMovieDescription>
                {movies[0].overview}
              </FirstMovieDescription>
              <FirstMovieButton>Find out more</FirstMovieButton>
            </FirstMovieDetails>
          </>
        ) : (
          <Loader />
        )}
      </FirstMovieContainer>

      <CategoryTitle>Trending today</CategoryTitle>

      <MoviesContainer>
        {moviesLoading ? (
          <Loader />
        ) : movies.length > 0 ? (
          <>
            {trendingScrollPosition > 0 && (
              <ArrowBackContainer onClick={handleScrollLeft}>
                <ArrowIcon src={arrowBack} />
              </ArrowBackContainer>
            )}
            <MoviesList ref={moviesListRef}>
              {movies.slice(1).map((movie) => (
                <MovieContainer key={movie.id}>
                  <MovieImage
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <MovieTitle>{movie.title}</MovieTitle>
                </MovieContainer>
              ))}
            </MoviesList>
            <ArrowForwardContainer onClick={handleScrollRight}>
              {moreMoviesLoading ? (
                <ArrowIcon src={buttonLoader} />
              ) : (
                <ArrowIcon src={arrowForward} />
              )}
            </ArrowForwardContainer>
          </>
        ) : (
          <EmptyMessage>
            No trending movies available at the moment.
          </EmptyMessage>
        )}
      </MoviesContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #080016;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 80px);
`;

const FirstMovieContainer = styled.div`
  height: 400px;
  width: 100%;
  padding: 30px;
  background-color: #222;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 1390px) {
    flex-direction: column;
    height: auto;
    min-height: 300px;
    align-items: center;
  }
`;

const FirstMoviePoster = styled.img`
  max-height: 340px;
  border-radius: 20px;

  @media (max-width: 1390px) {
    width: 100%;
    max-height: none;
    height: auto;
  }
`;

const FirstMovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 20px;

  @media (max-width: 1390px) {
    width: 100%;
  }
`;

const FirstMovieTitle = styled.h1`
  color: #fff;
`;

const FirstMovieDescription = styled.h4`
  color: #fff;
`;

const FirstMovieButton = styled.button`
  background-color: #080016;
  color: #fff;
  border: none;
  padding: 15px 30px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  font-size: 20px;
  width: 200px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const CategoryTitle = styled.h1`
  font-size: 22px;
  color: #fff;
  padding: 20px 60px;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
`;

const LoadingMessage = styled.p`
  color: #fff;
  font-size: 18px;
`;

const EmptyMessage = styled.p`
  color: #fff;
  font-size: 18px;
`;

const ArrowBackContainer = styled.div`
  height: 50px;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;

  @media (max-width: 770px) {
    display: none;
  }
`;

const ArrowForwardContainer = styled.div`
  height: 50px;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;

  @media (max-width: 770px) {
    display: none;
  }
`;

const ArrowIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const MoviesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 360px;
  width: calc(100% - 60px);
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const MoviesList = styled.div`
  height: 100%;
  display: flex;
  gap: 20px;
  overflow: hidden;
  scroll-behavior: smooth;
  padding: 0px 30px;
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 770px) {
    overflow-x: scroll;
  }
`;

const MovieContainer = styled.div`
  height: 320px;
  width: 200px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const MovieImage = styled.img`
  height: 280px;
  width: 200px;
  border-radius: 10px;
  object-fit: cover;
`;

const MovieTitle = styled.p`
  font-size: 18px;
  color: #fff;
  text-align: center;
`;
