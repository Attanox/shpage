import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const API_KEY = "25a856b1d0de2e2809f9f5115b3cf004";

function useAsyncHook() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancel = false;

    const getCharacters = async () => {
      try {
        setLoading(true);
        const characters = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters?apikey=${API_KEY}`
        );
        if (cancel) return;
        console.log(characters.data.data.results);
        setCharacters(characters.data.data.results);
      } catch (error) {
        console.error(error);
        setLoading(null);
      }
    };

    getCharacters();

    return () => {
      cancel = true;
    };
  }, [setCharacters]);

  return [characters, loading];
}

function getImgUrl(extension, path, mode) {
  return `${path}/${mode}.${extension}`;
}

function App() {
  const [characters, loading] = useAsyncHook();

  return (
    <React.Fragment>
      {loading === false ? (
        <></>
      ) : loading === null ? (
        <h1>No Characters Found 😢</h1>
      ) : (
        <React.Fragment>
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
