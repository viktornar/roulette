import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { API_URL } from '../core/settings';
import {getWheelFieldIndexFromResult, startTimer} from "../core/utils";
import InfoBox from './InfoBox';
import Roulette from './Roulette';
import './RoulettePage.scss';

const RoulettePage: React.FunctionComponent = () => {
  const [nextGame, setNextGame] = useState({
    id: null,
    startDelta: null,
    startTime: ''
  });

  const [gameResult, setGameResult] = useState({
    result: null
  });

  const [countDown, setCountDown] = useState({
    minutes: 0,
    seconds: 0
  });

  // Will be executed only once.
  useEffect(() => {
    // Fetch next game, calculate when to fire next request
    const fetchGame = () => {
      axios.get(`${API_URL}/1/nextGame`)
        .then(({ data: nextGameData }) => {
          const { id, startTime, startDelta } = nextGameData;

          setNextGame({
            id,
            startDelta,
            startTime
          });

          startTimer(startDelta, (min, sec) => {
            setCountDown({
              minutes: min,
              seconds: sec
            });

            if (min === 0 && sec === 0) {
              axios.get(`${API_URL}/1/game/${id}`)
                .then(({ data: gameResultData }) => {
                  setGameResult({
                    result: gameResultData.result
                  });
                  fetchGame();
                })
                .catch((error) => {
                  console.log(error)
                });
            }
          });
        })
        .catch((error) => {
          console.log(error)
        });
    };

    fetchGame();
  }, []);

  console.log(nextGame);

  const { result } = gameResult;
  const { minutes, seconds } = countDown;

  const countDownTime = `${minutes} min and ${seconds} sec`;

  return (
    <div className="RoulettePage">
      <div className="RoulettePage__left-side">
        <Roulette
          rouletteSize={380}
          rouletteWidth={35}
          textSize={10}
          spinToIndex={getWheelFieldIndexFromResult(result)}
        />
      </div>
      <div className="RoulettePage__right-side">
        <InfoBox
          countDownTime={countDownTime}
        />
      </div>
    </div>
  );
};

export default RoulettePage;
