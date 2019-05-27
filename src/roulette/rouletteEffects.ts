import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../core/settings';
import { startTimer } from '../core/utils';

interface INextGame {
  id: number | null,
  startDelta: number | null,
  startTime: string
}

interface IGameResult {
  result: number | null
}

interface ICountDown {
  minutes: number,
  seconds: number
}

export interface IGameLogs {
  id: number,
  result: number
}

export function useRouletteApi() : {
  nextGame: INextGame,
  gameResult: IGameResult,
  countDown: ICountDown,
  gameLogs: IGameLogs[],
  apiError: boolean
}{
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

  const [logs, setLogs] = useState({ data: []});

  const [apiError, setApiError] = useState(false);

  // Fetch next game, calculate when to fire next request
  const fetchGame = (): void => {
    axios.get(`${API_URL}/1/nextGame`)
      .then((nextGameResponse: AxiosResponse): void => {
        const { id, startTime, startDelta } = nextGameResponse.data;

        setNextGame({
          id,
          startDelta,
          startTime
        });

        startTimer(startDelta, (min: number, sec: number): void => timerCallback(min, sec, id));
      })
      .catch(() => {
        setApiError(true);
      });
  };

  const timerCallback = (min: number, sec: number, id: number): void => {
    setCountDown({
      minutes: min,
      seconds: sec
    });

    if (min === 0 && sec === 0) {
      axios.get(`${API_URL}/1/game/${id}`)
        .then((gameResponse: AxiosResponse): void => {
          const { result } = gameResponse.data;
          setGameResult({
            result
          });

          // @ts-ignore
          setLogs(prevLogs => {
            return { data: [...prevLogs.data, gameResponse.data] };
          });

          fetchGame();
        })
        .catch((): void => {
          setApiError(true);
        });
    }
  };

  // Will be executed only once.
  useEffect(() => {
    fetchGame();
  }, []);

  return {
    apiError,
    countDown,
    gameLogs: logs.data,
    gameResult,
    nextGame
  };
}
