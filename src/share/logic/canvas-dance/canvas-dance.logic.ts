import p5 from 'p5';
import type {Dance, Skeleton, Skeletones} from 'routes/dance/dance';
import {EventPose, Pose} from 'routes/dance/dance.types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ml5 from 'ml5';

export class CanvasDance {
  private dance: Dance;
  private p!: p5;
  private canvas!: p5.Renderer;
  private time = 0;
  private poseNet = ml5.poseNet();

  constructor(dance: Dance) {
    this.dance = dance;
  }
  public conection(p: p5) {
    this.p = p;
    this.p.setup = () => this.setup();
    this.p.draw = () => this.draw();
  }

  private setup() {
    const width = window.innerWidth - 100,
      height = window.innerHeight - 100;
    this.canvas = this.p.createCanvas(width, height, 'p2d');
    this.canvas.show();
    this.canvas.addClass('dance__game');
    this.canvas.id('dance__game');
  }

  private draw() {
    this.p.drawingContext.drawImage(
      this.dance.$video,
      0,
      0,
      this.p.width,
      this.p.height
    );
    this.time += this.p.deltaTime;
    if (this.time >= 300) {
      this.time = 0;
    }

    if (this.time >= 150) return;

    const image = this.p.drawingContext.getImageData(
      0,
      0,
      this.p.width,
      this.p.height
    );

    if (!this.poseNet || !image) return;

    const multiPose = this.poseNet.multiPose(image);

    if (!multiPose || !(multiPose instanceof Promise)) return;

    multiPose.then((poses: EventPose) => {
      if (!poses) return;
      this.dance.poses = poses;
    });

    const skeletones: Skeletones = [];

    (this.dance.poses ?? []).forEach(({pose}) => {
      const {
        rightShoulder,
        leftShoulder,
        leftHip,
        rightHip,
        leftAnkle,
        rightAnkle,
        leftWrist,
        rightWrist,
        nose,
      } = pose;

      const valid = [
        rightShoulder,
        leftShoulder,
        leftHip,
        rightHip,
        leftAnkle,
        rightAnkle,
        leftWrist,
        rightWrist,
        nose,
      ];

      if (valid.some((pose) => !pose)) {
        return;
      }

      const skeletonEstimations: Skeleton = [
        {x: nose.x, y: nose.y},
        this.estimate({
          scale:
            (this.p.dist(
              leftShoulder.x,
              leftShoulder.y,
              rightHip.x,
              rightHip.y
            ) +
              this.p.dist(
                rightShoulder.x,
                rightShoulder.y,
                leftHip.x,
                leftHip.y
              )) /
            2,
          ...pose,
        }),
        this.estimate({
          scale:
            (this.p.dist(leftAnkle.x, leftAnkle.y, rightHip.x, rightHip.y) +
              this.p.dist(rightAnkle.x, rightAnkle.y, leftHip.x, leftHip.y)) /
            2,
          ...pose,
        }),
        this.estimate({
          scale: this.p.dist(
            leftAnkle.x,
            leftAnkle.y,
            rightAnkle.x,
            rightAnkle.y
          ),
          ...pose,
        }),
        this.estimate({
          scale: this.p.dist(
            leftWrist.x,
            leftWrist.y,
            rightWrist.x,
            rightWrist.y
          ),
          ...pose,
        }),
      ];

      skeletones.push(skeletonEstimations);
    });

    console.log(skeletones);
  }

  estimate({
    scale,
    leftShoulder,
    rightShoulder,
    leftHip,
  }: {scale: number} & Pose): number {
    return Math.round(
      this.p.map(
        scale,
        0,
        this.p.dist(
          leftShoulder.x,
          leftShoulder.y,
          rightShoulder.x,
          rightShoulder.y
        ) + this.p.dist(leftHip.x, leftHip.y, leftShoulder.x, leftShoulder.y),
        0,
        10
      )
    );
  }
}
