import * as React from 'react';
import { ROULETTE_OPTIONS } from '../core/settings';
import { arcToDegree, easeOut } from '../core/utils';
import './Roulette.scss';

interface IRouletteField {
 color: string,
 value: string
}

interface IRouletteProps {
  rouletteSize: number,
  rouletteWidth: number,
  textSize: number,
  spinToIndex: number | null,
}

export default class Roulette extends React.PureComponent<IRouletteProps> {
  private canvas: HTMLCanvasElement | null;
  private startAngle: number = 0;
  private arc: number = Math.PI / (ROULETTE_OPTIONS.length / 2);
  private readonly outsideRadius: number;
  private readonly insideRadius: number;
  private readonly textRadius: number;
  private spinAngleStart: number = Math.random() * 10 + 10;
  private animationRef: any = null;
  private spinAngleTotal: number = 0;

  constructor(props: IRouletteProps) {
    super(props);
    const { rouletteSize, rouletteWidth } = this.props;
    this.outsideRadius = rouletteSize / 2 - rouletteWidth;
    this.insideRadius = this.outsideRadius - rouletteWidth;
    this.textRadius = (this.outsideRadius - this.insideRadius) / 2 + this.insideRadius;
  }

  public render() {
    const { rouletteSize } = this.props;

    return (
      <canvas
        className="Roulette"
        ref={el => (this.canvas = el)}
        width={rouletteSize}
        height={rouletteSize}
      />
    )
  }

  public componentDidMount() {
    this.paint();
  }

  public componentDidUpdate() {
    this.paint();
    const { spinToIndex } = this.props;

    if (spinToIndex) {
      this.initializeRotation();
      this.rotateWheel();
    }
  }

  private getCanvasContext(): CanvasRenderingContext2D | null {
    if (this.canvas === null) {
      return null;
    }

    return this.canvas.getContext('2d');
  }

  private paint() {
    const ctx = this.getCanvasContext();

    if (ctx === null) {
      return;
    }

    const { rouletteSize, textSize } = this.props;

    ctx.clearRect(0, 0, rouletteSize, rouletteSize);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = `bold ${textSize}px Helvetica, Arial`;

    this.paintRoulette(ctx);

    this.paintArrow(ctx);
  }

  private paintRoulette(ctx: CanvasRenderingContext2D) {
    const { rouletteSize } = this.props;

    ROULETTE_OPTIONS.forEach((option: IRouletteField, i: number) => {
      const angle = this.startAngle + i * this.arc;
      ctx.fillStyle = option.color;

      ctx.beginPath();
      ctx.arc(
        rouletteSize / 2,
        rouletteSize / 2,
        this.outsideRadius,
        angle,
        angle + this.arc,
        false
      );
      ctx.arc(
        rouletteSize / 2,
        rouletteSize / 2,
        this.insideRadius,
        angle + this.arc,
        angle,
        true
      );
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.fillStyle = 'white';
      ctx.translate(
        rouletteSize / 2 + Math.cos(angle + this.arc / 2) * this.textRadius,
        rouletteSize / 2 + Math.sin(angle + this.arc / 2) * this.textRadius
      );
      const { value } = option;
      ctx.fillText(value, -ctx.measureText(value).width / 2, 0);
      ctx.restore();
    });
  }

  private paintArrow(ctx: CanvasRenderingContext2D) {
    const { rouletteSize } = this.props;
    const rouletteRadius = rouletteSize / 2;

    ctx.fillStyle = '#BDC3C7';

    ctx.beginPath();
    ctx.moveTo(rouletteRadius - 4, rouletteRadius - (this.outsideRadius + 5));
    ctx.lineTo(rouletteRadius + 4, rouletteRadius - (this.outsideRadius + 5));
    ctx.lineTo(rouletteRadius + 4, rouletteRadius - (this.outsideRadius - 5));
    ctx.lineTo(rouletteRadius + 9, rouletteRadius - (this.outsideRadius - 5));
    ctx.lineTo(rouletteRadius, rouletteRadius - (this.outsideRadius - 13));
    ctx.lineTo(rouletteRadius - 9, rouletteRadius - (this.outsideRadius - 5));
    ctx.lineTo(rouletteRadius - 4, rouletteRadius - (this.outsideRadius - 5));
    ctx.lineTo(rouletteRadius - 4, rouletteRadius - (this.outsideRadius + 5));
    ctx.fill();
  }

  private initializeRotation() {
    const { spinToIndex } = this.props;

    if (spinToIndex) {
      const currentWheelFieldIndex = this.getWheelFieldIndex();
      const randomWheelRotationTimes = Math.floor(Math.random() * 2) + 1;
      const multipleWheelRotationAngle =
        ROULETTE_OPTIONS.length *
        randomWheelRotationTimes *
        arcToDegree(this.arc);

      const diffBetweenFieldIndex = (currentWheelFieldIndex - spinToIndex) + ROULETTE_OPTIONS.length;
      const spinToAngle = diffBetweenFieldIndex * arcToDegree(this.arc) + multipleWheelRotationAngle;
      this.spinAngleTotal = spinToAngle  * Math.PI / 180;
    }
  }

  private rotateWheel() {
    this.startAngle += (0.5 * Math.PI / 180);

    if (this.startAngle >= this.spinAngleTotal) {
      cancelAnimationFrame(this.animationRef);
      this.startAngle = 0;
      return;
    }

    const spinAngle =
      this.spinAngleStart - easeOut(this.startAngle, 0, this.spinAngleStart, this.spinAngleTotal);
    this.startAngle += (spinAngle * Math.PI / 180);

    this.paint();
    this.animationRef = requestAnimationFrame(() => { this.rotateWheel() });
  }

  private getWheelFieldIndex(): number {
    const degrees = this.startAngle * 180 / Math.PI + 90;
    return Math.floor((360 - degrees % 360) / arcToDegree(this.arc));
  }
}
