import { isEmpty } from 'lodash';
import * as React from 'react';

import './InfoBox.scss';
import { IGameLogs } from './rouletteEffects';

interface IInfoBoxProps {
  countDownTime: string,
  gameLogs: IGameLogs[],
  apiError: boolean
}

const InfoBox: React.FunctionComponent<IInfoBoxProps> =
  ({ countDownTime, gameLogs, apiError }) => {
    return (
      <div className="InfoBox">
        <div className="InfoBox__container container">
          {
            apiError && <pre className="container__error">Unexpected error occurred</pre>
          }
          <h2 className="container__heading">
            Next game after: { countDownTime }
          </h2>
          <h3>Game logs:</h3>
          {
            !isEmpty(gameLogs) ? (
              <pre className="container__events-log">
                {
                  gameLogs.map(({id, result})=> (
                    <p key={id}>{`Game ${id} ended with ${result} as result...`}</p>
                  ))
                }
              </pre>
              ) : (
                <pre className="container__events-log">
                  <p>Waiting for new game :)</p>
                </pre>
              )
          }
        </div>
      </div>
    );
  };

export default InfoBox;
