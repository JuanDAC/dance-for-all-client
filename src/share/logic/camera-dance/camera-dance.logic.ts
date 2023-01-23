import p5, {Element} from 'p5';
import type {Dance} from 'routes/dance/dance';
import {EventOn, PoseNet} from '../pose-net/pose-net.logic';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/* import * as ml5 from 'ml5'; */

export class CameraDance extends PoseNet {
  constructor(dance: Dance, poseNet: Ml5) {
    super(dance, poseNet);
  }

  public conection(p: p5) {
    this.p = p;
    this.p.setup = () => this.setup();
    this.p.draw = () => this.draw();
  }

  override on({poses, estimatesPoses}: EventOn): void {
    if (poses) {
      this.dance.posesCamera = poses;
    }
    if (estimatesPoses) {
      this.dance.estimatesPosesCamera = estimatesPoses;
    }
  }

  private setup() {
    const {VIDEO} = this.p;
    const width = window.innerWidth - 100,
      height = window.innerHeight - 100;

    this.image = this.p.createCapture(VIDEO) as Element;
    this.image.size(width, height);
    this.image.hide();
  }

  private draw() {
    this.load();
    const currentPoses = this.dance?.posesCamera ?? [];
    if (
      currentPoses.length === 0 &&
      (this.estimatesPoses.length > 12 || this.gotoRemove)
    ) {
      this.estimatesPoses.shift();
      this.on.call(this, {estimatesPoses: [...this.estimatesPoses]});
    }
    if (this.estimatesPoses.length === 0) {
      this.gotoRemove = false;
    }
    currentPoses.forEach(this.storageEstimates.bind(this));
  }
}
