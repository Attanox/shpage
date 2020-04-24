import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import SearchBar from "./SearchBar";
import { Emoji, StyledLink } from "../styled/main";

const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  @media (max-width: 600px) {
    height: 15vh;
  }
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--red);
  color: var(--light);
  & .nav-bar {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: start;
    }
    & span {
      font-size: 28px;
    }
  }
`;

export default function Navbar() {
  const NavBar = useRef(null);
  const [navWidth, setNavWidth] = useState(0);

  useEffect(() => {
    setNavWidth(NavBar.current.offsetWidth);
  }, []);

  return (
    <Nav>
      <div className="nav-bar" ref={NavBar}>
        <div className="logo">
          <StyledLink to={"/"}>
            <Emoji label="logo">🤖</Emoji>
          </StyledLink>
        </div>
        <SearchBar navWidth={navWidth} />
      </div>
    </Nav>
  );
}
