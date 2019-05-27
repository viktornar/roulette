import { isEmpty } from 'lodash';
import * as React from 'react';

import './InfoBox.scss';

interface IGameLogs {
  id: number,
  result: number
}

interface IInfoBoxProps {
  countDownTime: string,
  gameLogs: IGameLogs[]
}

const InfoBox: React.FunctionComponent<IInfoBoxProps> = ({ countDownTime, gameLogs }) => {
  console.log(gameLogs);
  return (
    <div className="InfoBox">
      <div className="InfoBox__container container">
        <h2 className="container__heading">
          Next game after: { countDownTime }
        </h2>
        <h3>Game logs:</h3>
        {
          !isEmpty(gameLogs) ? (
            <pre className="container__events-log">
              {
                 gameLogs.map(({id, result})=> (
                  `Game ${id} ended with ${result} as result...`
                ))
              }
            </pre>
            ) : (
              <pre className="container__events-log">
                Waiting for new game :)
              </pre>
            )
        }
      </div>
    </div>
  );
};

export default InfoBox;
