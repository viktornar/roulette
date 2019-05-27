import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../core/settings';
import { startTimer } from '../core/utils';

export function useRouletteApi() {
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

const [logs, setLogs] = useState([]);

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

                  // @ts-ignore
                  setLogs([
                    ...logs, gameResultData
                  ]);
                  fetchGame();
                });
            }
          });
        });
    };

    fetchGame();
  }, []);

  return {
    nextGame,
    gameResult,
    countDown,
    logs
  };
}
