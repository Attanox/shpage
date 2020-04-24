import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { GlobalContext } from "../../context/GlobalState";

import Loader from "../loader/Loader";

import { Title, VerticalSpace, Emoji, StyledLink } from "../styled/main";

const API_KEY = "25a856b1d0de2e2809f9f5115b3cf004";

function useAsyncHook(setLoading, setCharacters) {
  const NO_IMAGE =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
  const MAX_CHARACTERS_ON_PAGE = 20;
  const limitOfCharacters = 50;

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
        const characters = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters?modifiedSince=${getYear}&orderBy=-modified&limit=${limitOfCharacters}&apikey=${API_KEY}`
        );
        if (cancel) return;
        console.log(characters.data.data.results);
        // get rid of characters that have no image
        const charactersWithImages = characters.data.data.results.filter(
          (character) => character.thumbnail.path !== NO_IMAGE
        );

        // Shuffle array
        const shuffled = charactersWithImages.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        const charactersToReturn = shuffled.slice(0, MAX_CHARACTERS_ON_PAGE);
        setCharacters(charactersToReturn);
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
  }, [setLoading, setCharacters]);
}

function getImgUrl(extension, path, mode) {
  return `${path}/${mode}.${extension}`;
}

export default function Dashboard() {
  const { characters, setCharacters, loading, setLoading } = useContext(
    GlobalContext
  );
  useAsyncHook(setLoading, setCharacters);

  return (
    <React.Fragment>
      {loading === true ? (
        <Loader />
      ) : loading === null ? (
        <Title>
          No More Heroes <Emoji label="crying emoji">😢</Emoji>
        </Title>
      ) : (
        <React.Fragment>
          <Title>Heroes Of The Day</Title>
          <VerticalSpace />
          <VerticalSpace />
          <VerticalSpace />
          {console.log(characters)}
          {characters && (
            <div className="d-grid">
              {characters.map((character) => (
                <StyledLink to={`hero/${character.id}`} key={character.id}>
                  <div className="grid-item">
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
                </StyledLink>
              ))}
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
