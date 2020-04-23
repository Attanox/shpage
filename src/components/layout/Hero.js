import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { Title, Emoji } from "../styled/main";

const API_KEY = "25a856b1d0de2e2809f9f5115b3cf004";

function useAsyncHook(setLoading, heroIndex) {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    let cancel = false;

    const effect = async () => {
      try {
        setLoading(true);
        const character = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters/${heroIndex}?apikey=${API_KEY}`
        );
        if (cancel) return;
        console.log(character.data.data.results[0]);
        setCharacter(character.data.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(null);
      }
    };

    effect();

    return () => {
      cancel = true;
    };
  }, [setCharacter, setLoading, heroIndex]);

  return character;
}

export default function Hero(props) {
  const { heroIndex } = props.match.params;

  const [loading, setLoading] = useState(false);
  const character = useAsyncHook(setLoading, heroIndex);

  return (
    <React.Fragment>
      {loading === true ? (
        <Loader />
      ) : loading === null ? (
        <h1>
          No More Heroes <Emoji label="crying emoji">😢</Emoji>
        </h1>
      ) : (
        <React.Fragment>
          {character && <Title>{character.name}</Title>}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
