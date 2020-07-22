import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from './Item'
import { useKeydown } from '../hooks/use-interval.hook'
import items from '../data'
import { GameContext } from './GameContext'

const Game = () => {
  const ref = useRef(null);
  const { numCookies, setNumCookies, counter, setCounter, cookiesPerSecond } = useContext(GameContext)
  const handleClick = (item) => {
    if (item === null || item.code === 'Space') {
      if (item !== null && item.repeat) {return}
      counter[3] === 0 ? setNumCookies(numCookies+1) : setNumCookies(numCookies + counter[3]*items[3].value)
    } else if (numCookies >= item.cost) {
      setCounter(counter.map((count, index) => index === items.indexOf(item) ? count+1 : count))
      setNumCookies(numCookies-item.cost)
      item.cost = Math.round(item.cost*1.2);
    }
  }

  useKeydown(handleClick)

  const timer = localStorage.getItem('start') !== null ? Math.floor((Date.now() - localStorage.getItem('start'))/1000) : 0

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{cookiesPerSecond}</strong> cookies per second ||
          <strong> {counter[3]*items[3].value || 1}</strong> cookies per click
  <div>Timer: {timer} seconds</div>
        </Indicator>
        <Button id='cookie'ref={ref} onClick={() => handleClick(null)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => <Item item={item} counter={counter[items.indexOf(item)]} 
          handleClick={() => handleClick(item)} index={index} key={item.id} />)}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;

  &:active {
    transform: scale(1.2)
  }
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 450px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
