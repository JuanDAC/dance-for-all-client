import {Element, Image} from 'p5';

declare global {
  type Point = {
    part: string;
    position: {x: number; y: number};
    score: number;
  };

  type PointPart = {
    x: number;
    y: number;
    confidence: number;
  };

  type Pose = {
    score: number;
    keypoints: Point[];
    leftAnkle: PointPart;
    leftEar: PointPart;
    leftElbow: PointPart;
    leftEye: PointPart;
    leftHip: PointPart;
    leftKnee: PointPart;
    leftShoulder: PointPart;
    leftWrist: PointPart;
    nose: PointPart;
    rightAnkle: PointPart;
    rightEar: PointPart;
    rightElbow: PointPart;
    rightEye: PointPart;
    rightHip: PointPart;
    rightKnee: PointPart;
    rightShoulder: PointPart;
    rightWrist: PointPart;
  };

  type Skeleton = [Point, Point][];

  type EventPose = {pose: Pose; skeleton: Skeleton}[];

  type EstimatesPose = [{x: number; y: number}, number, number, number, number];

  type EstimatesPoses = EstimatesPose[];

  class Ml5 {
    static poseNet(): Ml5;
    getInput(t: unknown): Image | HTMLVideoElement;
    load(): void;
    mapParts(t: unknown): void;
    multiPose(
      input: Image | HTMLVideoElement | ImageData | Element
    ): Promise<EventPose>;
    singlePose(
      input: Image | HTMLVideoElement | ImageData | Element
    ): Promise<EventPose>;
    skeleton(t: unknown): void;
  }
}
