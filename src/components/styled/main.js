import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const HorizontalSpace = styled.div`
  width: 1rem;
`;
export const VerticalSpace = styled.div`
  height: 1rem;
`;

export const Title = styled.h1`
  text-align: center;
  color: var(--dark);
  font-size: 2rem;
  letter-spacing: 2px;
  font-weight: 200;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Emoji = (props) => {
  return (
    <span role="img" aria-label={props.label}>
      {props.children}
    </span>
  );
};
