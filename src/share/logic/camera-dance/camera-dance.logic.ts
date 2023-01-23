import p5 from 'p5';
import type {Dance, Skeleton, Skeletones} from 'routes/dance/dance';
import {EventPose, Pose} from 'routes/dance/dance.types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ml5 from 'ml5';

export class CameraDance {
  private dance: Dance;
  private p!: p5;
  private camera!: p5.Renderer;
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
    const {VIDEO} = this.p;
    const width = window.innerWidth - 100,
      height = window.innerHeight - 100;

    this.camera = this.p.createCapture(VIDEO);
    this.camera.size(width, height);
    this.camera.hide();
  }

  private draw() {}
}
