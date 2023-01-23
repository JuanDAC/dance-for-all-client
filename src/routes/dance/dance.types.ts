import {Dance} from './dance';

declare global {
  interface HTMLElementTagNameMap {
    'dance-for-everyone-route-dance': Dance;
  }
}

export type Point = {
  part: string;
  position: {x: number; y: number};
  score: number;
};

export type PointPart = {
  x: number;
  y: number;
  confidence: number;
};

export type Pose = {
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

export type Skeleton = [Point, Point][];

export type EventPose = {pose: Pose, skeleton: Skeleton}[]