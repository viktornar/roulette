import * as React from 'react';

import './InfoBox.scss';

interface IInfoBoxProps {
  countDownTime: string
}

const InfoBox: React.FunctionComponent<IInfoBoxProps> = ({ countDownTime }) => {
  return (
    <div className="InfoBox">
      <div className="InfoBox__container">
        Time left to the next game: { countDownTime }
      </div>
    </div>
  );
};

export default InfoBox;
