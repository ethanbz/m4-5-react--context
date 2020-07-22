import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import { GameContext } from './GameContext'
import { useInterval, useDocumentTitle } from '../hooks/use-interval.hook'

const timeArr = localStorage.getItem('timeArr') !== null ? localStorage.getItem('timeArr').split(',') : [];
function App(props) {
  const { numCookies, setNumCookies, cookiesPerSecond } = useContext(GameContext)
  


  useInterval(() => {
    if (timeArr.length < 2) {
      timeArr.unshift(Date.now())
    } else {
      timeArr.unshift(Date.now())
      timeArr.pop()
    }
    localStorage.setItem('timeArr', timeArr)
    timeArr.length > 1 && timeArr[0]-timeArr[1] > 2000 
      ? setNumCookies(numCookies + cookiesPerSecond*Math.round((timeArr[0]-timeArr[1])/1000))
      : setNumCookies(numCookies + cookiesPerSecond);

      if (localStorage.getItem('start') === null && numCookies !== 100) localStorage.setItem('start', Date.now())
  }, 1000)
  

  useDocumentTitle(`${numCookies} cookies - Cooker Clicker Workshop`, `${numCookies} cookies (baking while you're away)`)





  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
