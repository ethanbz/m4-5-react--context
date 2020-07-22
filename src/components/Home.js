import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GameContext } from './GameContext'

const Home = () => {
  const {numCookies} = useContext(GameContext)
  const reset = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <Wrapper>
      <Title>Cookie game</Title>
      <Link to="/game">Go to game ({numCookies} cookies)</Link>
      <Link style={{marginTop: 20, color: 'red'}} to="/" onClick={reset}>(reset progress)</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 32px;
`;

export default Home;
