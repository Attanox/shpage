import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";

import { GlobalContext } from "../../context/GlobalState";

import Mag from "../../images/icons/mag.svg";

const API_KEY = "25a856b1d0de2e2809f9f5115b3cf004";

const SearchNav = styled.div`
  --search-light: 255, 255, 255;
  cursor: pointer;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.25s ease-in-out;
  border-left: 1px solid var(--light);
  border-right: 1px solid var(--light);
  background-color: rgba(var(--search-light), 0);
  @media (max-width: 600px) {
    margin-top: 0.5rem;
    margin-left: auto;
  }
  &:hover {
    background-color: rgba(var(--search-light), 0.5);
  }
  & > #search {
    caret-color: var(--light);
    color: var(--light);
    font-size: 1.3rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    border: none;
    outline: none;
    height: 2rem;
    display: inline-block;
    background-color: transparent;
    transform-origin: 100% 50%;
    padding: ${({ visible }) => (visible ? "0.5rem 1.2rem" : "0.5rem 0")};
    width: ${({ visible }) => (visible ? "330px" : "0")};
    @media (max-width: 768px) {
      width: ${({ visible }) => (visible ? "230px" : "0")};
    }
    @media (max-width: 600px) {
      width: ${({ visible, navWidth }) =>
        visible ? `calc(${navWidth}px - 6rem - 2px)` : "0"};
    }
    transition-timing-function: ease-in-out;
    transition-duration: 0.5s;
    transition-property: padding, width;
  }
  & > button {
    background-color: transparent;
    border: none;
    outline: none;
    margin: 0 1rem;
    height: 2rem;
    width: 2rem;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    & > img {
      display: inline-block;
      object-fit: cover;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
`;

export default function SearchBar({ navWidth }) {
  const [visible, setVisible] = useState(false);
  const [searchFor, setSearchFor] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);

  const { characters, setCharacters, loading, setLoading } = useContext(
    GlobalContext
  );

  const InputRef = useRef(null);

  const effect = async (searchFor) => {
    const limitOfCharacters = 20;
    try {
      setLoading(true);
      const characters = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchFor}&orderBy=name&limit=${limitOfCharacters}&apikey=${API_KEY}`
      );
      setCharacters(characters.data.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(null);
    }
  };

  function onChange(value) {
    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        effect(value);
      }, 1000)
    );
  }

  return (
    <SearchNav visible={visible} navWidth={navWidth}>
      <input
        type="search"
        name="search"
        id="search"
        ref={InputRef}
        value={searchFor}
        onChange={(e) => {
          setSearchFor(e.target.value);
          onChange(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setVisible(!visible);
          if (InputRef.current)
            !visible ? InputRef.current.focus() : InputRef.current.blur();
        }}
      >
        <img src={Mag} alt="search icon" />
      </button>
    </SearchNav>
  );
}
