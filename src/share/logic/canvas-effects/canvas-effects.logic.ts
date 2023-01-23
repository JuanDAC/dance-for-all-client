import p5 from 'p5';
import type {Dance} from 'routes/dance/dance';
import type {Point} from 'routes/dance/dance.types';
import {P5Polar, polar} from 'share/services/p5/polar';

type BorderGradientArguments = {
  color: string;
  width: number;
};

type SetGradientArguments = {
  ctx: CanvasRenderingContext2D;
  steps: [string, number][];
  rect: [number, number, number, number];
  orientation: 'VERTICAL' | 'HORIZONTAL';
};

export class CanvasEffects {
  private p!: p5 & P5Polar;
  private canvasEffects!: p5.Renderer;
  private dance: Dance;
  private colors = ['#4af7ff', '#165bfb', '#c736f9', '#e94aa1'];
  private colorIndex = 0;
  private time = 0;
  private activeAnimation = -1;
  private memorized = false;
  private poseMemorized: Point['position'][] = [];
  private shapeEffects = [
    () =>
      this.p.polarLines(
        this.p.random([8, 9, 10, 11]),
        this.p.random([2, 5, 10, 15]),
        this.p.random([10, 15, 20])
      ),
    () =>
      this.p.polarEllipses(
        this.p.random([4, 5, 6, 7]),
        this.p.random([3, 9, 12]),
        this.p.random([3, 9, 12]),
        this.p.random([10, 15, 20])
      ),
    () =>
      this.p.polarPolygons(
        this.p.random([3, 6, 9]),
        this.p.random([3, 6, 8]),
        this.p.random([3, 8, 11, 18]),
        this.p.random([10, 15, 20])
      ),
  ];

  constructor(dance: Dance) {
    this.dance = dance;
  }

  public conection(p: p5) {
    this.p = polar(p);
    this.p.setup = () => this.setup();
    this.p.draw = () => this.draw();
  }

  private setup() {
    const {width, height, x, y} =
      this.dance.canvasDance.getBoundingClientRect();
    this.canvasEffects = this.p.createCanvas(width, height, 'p2d');
    this.canvasEffects.style(`
      top: ${y}px;
      left: ${x}px;
      visibility: visible;
      background: transparent;
      filter: opacity(0.5);
    `);

    this.canvasEffects.show();
  }

  private draw() {
    this.p.clear(255 / 2, 255 / 2, 255 / 2, 255);
    this.p.noStroke();
    this.p.rect(0, 0, this.p.width, this.p.height);
    this.time += this.p.deltaTime;
    if (this.time >= 1250) {
      this.time = 0;
      this.activeAnimation = 0;
      if (this.activeAnimation === 0)
        this.memorized = this.p.random([false, true]);
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    }

    this.borderGradient({
      color: this.colors[this.colorIndex],
      width: 30,
    });

    (this.dance.poses ?? []).forEach(({skeleton}) => {
      if (this.activeAnimation !== -1) {
        if (this.activeAnimation === 0 || !this.memorized)
          this.poseMemorized = skeleton.flat().map(({position}) => position);
        this.poseMemorized
          .filter(() => this.p.random([false, false, true, false, false]))
          .forEach(({x, y}) => {
            this.p.stroke(
              this.colors[this.activeAnimation % this.colors.length]
            );
            this.p.strokeWeight(this.p.random([1, 2]));
            if (x < 50 || y < 50) return;
            this.p.setCenter(x, y);

            const efectsIndexes = Array.from(this.shapeEffects).map(
              (_, index) => index
            );

            const efectsIndex = this.p.random(efectsIndexes);

            this.shapeEffects[efectsIndex]();
          });

        const time = this.memorized ? 45 : 60;

        this.activeAnimation =
          this.activeAnimation <= time ? this.activeAnimation + 1 : -1;
      }
    });
  }

  private setGradient({ctx, steps, rect, orientation}: SetGradientArguments) {
    const [x1, y1, x2, y2] = rect;
    const grd = orientation.includes('HORIZONTAL')
      ? ctx.createLinearGradient(x1, y1, x2, y1)
      : ctx.createLinearGradient(x1, y1, x1, y2);
    steps.forEach(([color, persentage]) =>
      grd.addColorStop(persentage / 100, color)
    );
    ctx.fillStyle = grd;
    ctx.fillRect(...rect);
  }

  private borderGradient({color, width}: BorderGradientArguments) {
    this.setGradient({
      ctx: this.p.drawingContext,
      steps: [
        [color, 0],
        ['transparent', 100],
      ],
      rect: [0, 0, width, this.p.height],
      orientation: 'HORIZONTAL',
    });

    this.setGradient({
      ctx: this.p.drawingContext,
      steps: [
        ['transparent', 0],
        [color, 100],
      ],
      rect: [this.p.width - width, 0, this.p.width, this.p.height],
      orientation: 'HORIZONTAL',
    });

    this.setGradient({
      ctx: this.p.drawingContext,
      steps: [
        [color, 0],
        ['transparent', 100],
      ],
      rect: [0, 0, this.p.width, width],
      orientation: 'VERTICAL',
    });

    this.setGradient({
      ctx: this.p.drawingContext,
      steps: [
        ['transparent', 0],
        [color, 100],
      ],
      rect: [0, this.p.height - width, this.p.width, this.p.height],
      orientation: 'VERTICAL',
    });
  }
}
