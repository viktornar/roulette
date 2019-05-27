import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';

import { API_URL } from '../core/settings';
import InfoBox from './InfoBox';
import Roulette from './Roulette';
import './RoulettePage.scss';

const RoulettePage: React.FunctionComponent = () => {
  // const [spinToIndex, setSpinToIndex] = useState(0);
  // const [gameId, setGameId] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Fetch next game, calculate when to fire next request
    axios.get(`${API_URL}/1/nextGame`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })
  });

  return (
    <div className="RoulettePage">
      <div className="RoulettePage__left-side">
        <Roulette
          rouletteSize={380}
          rouletteWidth={35}
          textSize={10}
          spinToIndex={5}
        />
      </div>
      <div className="RoulettePage__right-side">
        <InfoBox />
      </div>
    </div>
  );
};

export default RoulettePage;
