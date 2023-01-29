import {concat, tensor2d, Tensor2D} from '@tensorflow/tfjs';
import p5, {Element, Image} from 'p5';
import {Dance} from 'routes/dance/dance';

export type EventOn = {
  poses?: EventPose;
  estimatesPoses?: EstimatesPoses;
  inputTensor?: Tensor2D;
};

export type Scales = {
  x: number;
  y: number;
  boundX: [number, number, number, number];
  boundY: [number, number, number, number];
};

export class PoseNet {
  public dance: Dance;
  public poseNet!: Ml5;
  public p!: p5;
  public image!: Image | HTMLVideoElement | ImageData | Element;
  public estimatesPoses: EstimatesPoses = [];
  public active = false;
  public inputTensor = tensor2d([], [0, 0]);

  constructor(dance: Dance, poseNet: Ml5) {
    this.dance = dance;
    this.poseNet = poseNet;
  }

  load() {
    if (!this.poseNet || !this.image || !this.active) return;

    const multiPose = this.poseNet.multiPose(this.image);

    if (!multiPose || !(multiPose instanceof Promise)) return;

    multiPose.then((poses) => this.on.call(this, {poses}));
  }

  on(_: EventOn) {
    throw new Error('Implements');
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

  normalizePoseData({keypoints, rightAnkle, leftAnkle, nose}: Pose) {
    if (!nose || !keypoints || !rightAnkle || keypoints.length === 0) return;

    const minX = Math.min(rightAnkle.x, leftAnkle.x);
    const maxX = Math.max(rightAnkle.x, leftAnkle.x);

    const scales: Scales = {
      x: minX,
      y: nose.y,
      boundX: [0, leftAnkle.y - nose.y, 0, 1],
      boundY: [0, maxX - minX, 0, 1],
    };

    const currentInputTensor = tensor2d(
      keypoints.map(({position}) => [
        this.p.map(position.x - scales.x, ...scales.boundX),
        this.p.map(position.y - scales.y, ...scales.boundY),
      ])
    );

    this.inputTensor = concat([this.inputTensor, currentInputTensor], 0);
  }

  storageEstimates({pose}: EventPose[0]) {
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

    this.normalizePoseData(pose);

    const skeletonEstimations: EstimatesPose = [
      {x: nose.x, y: nose.y},
      /*       this.estimate({
        scale:
          (this.p.dist(leftShoulder.x, leftShoulder.y, rightHip.x, rightHip.y) +
            this.p.dist(
              rightShoulder.x,
              rightShoulder.y,
              leftHip.x,
              leftHip.y
            )) /
          2,
        ...pose,
      }), */
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

    this.estimatesPoses.push(skeletonEstimations);
  }

  public estimatesClear() {
    this.estimatesPoses = [];
  }
}
