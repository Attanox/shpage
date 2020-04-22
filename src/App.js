import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "./components/loader/Loader";
import Navbar from "./components/navbar/Navbar";

import { VerticalSpace, Emoji } from "./components/styled/main";

import "./App.css";
import styled from "styled-components";

const API_KEY = "25a856b1d0de2e2809f9f5115b3cf004";

function useAsyncHook(setLoading) {
  const NO_IMAGE =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
  const MAX_CHARACTERS_ON_PAGE = 20;
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    let cancel = false;

    const getCharacters = async () => {
      try {
        setLoading(true);
        const getYear = (() => {
          const max = 2000;
          const min = 1977;
          const x = Math.floor(Math.random() * (max - min + 1)) + min;
          return x;
        })();
        const limitOfCharacters = 70;
        const characters = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters?modifiedSince=${getYear}&orderBy=-modified&limit=${limitOfCharacters}&apikey=${API_KEY}`
        );
        if (cancel) return;
        console.log(characters.data.data.results);
        setCharacters(characters.data.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(null);
      }
    };

    getCharacters();

    return () => {
      cancel = true;
    };
  }, [setCharacters, setLoading]);

  // get rid of characters that have no image
  const charactersWithImages = characters.filter(
    (character) => character.thumbnail.path !== NO_IMAGE
  );

  // Shuffle array
  const shuffled = charactersWithImages.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  const charactersToReturn = shuffled.slice(0, MAX_CHARACTERS_ON_PAGE);

  return [charactersToReturn];
}

function getImgUrl(extension, path, mode) {
  return `${path}/${mode}.${extension}`;
}

const Title = styled.h1`
  text-align: center;
  color: var(--dark);
  font-size: 2rem;
  letter-spacing: 2px;
  font-weight: 200;
`;

const NavbarSpace = styled.div`
  width: 100%;
  height: 10vh;
  @media (max-width: 600px) {
    height: 15vh;
  }
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [characters] = useAsyncHook(setLoading);
  return (
    <React.Fragment>
      {loading === true ? (
        <Loader />
      ) : loading === null ? (
        <h1>
          No Characters Found <Emoji label="crying emoji">😢</Emoji>
        </h1>
      ) : (
        <React.Fragment>
          <Navbar />
          <NavbarSpace />
          <VerticalSpace />
          <Title>Heroes Of The Day</Title>
          <VerticalSpace />
          <VerticalSpace />
          <VerticalSpace />
          {characters && (
            <div className="d-grid">
              {characters.map((character) => (
                <div key={character.id} className="grid-item">
                  {character.name}
                  <img
                    src={getImgUrl(
                      character.thumbnail.extension,
                      character.thumbnail.path,
                      "portrait_uncanny"
                    )}
                    alt="character thumbnail"
                  />
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;
