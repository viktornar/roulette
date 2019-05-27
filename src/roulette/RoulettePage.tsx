import * as React from 'react';

import { getWheelFieldIndexFromResult } from '../core/utils';
import InfoBox from './InfoBox';
import Roulette from './Roulette';
import { useRouletteApi } from './rouletteEffects';
import './RoulettePage.scss';

const RoulettePage: React.FunctionComponent = () => {
  const {
    gameResult,
    countDown,
    logs,
    nextGame
  } = useRouletteApi();

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
          gameLogs={logs}
        />
      </div>
    </div>
  );
};

export default RoulettePage;
