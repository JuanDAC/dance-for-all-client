import p5, {Element, Image} from 'p5';
import {Dance} from 'routes/dance/dance';

export type EventOn = {poses?: EventPose; estimatesPoses?: EstimatesPoses};

export class PoseNet {
  protected dance: Dance;
  protected poseNet!: Ml5;
  protected p!: p5;
  protected image!: Image | HTMLVideoElement | ImageData | Element;
  protected estimatesPoses: EstimatesPoses = [];

  constructor(dance: Dance, poseNet: Ml5) {
    this.dance = dance;
    this.poseNet = poseNet;
  }

  load() {
    if (!this.poseNet || !this.image) return;

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
