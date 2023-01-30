import p5, {Element} from 'p5';
import type {Dance} from 'routes/dance/dance';
import {EventOn, PoseNet} from '../pose-net/pose-net.logic';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/* import * as ml5 from 'ml5'; */

export class CameraDance extends PoseNet {
  time = 0;
  constructor(dance: Dance, poseNet: Ml5) {
    super(dance, poseNet);
  }

  public conection(p: p5) {
    this.p = p;
    this.p.setup = () => this.setup();
    this.p.draw = () => this.draw();
  }

  override on({poses, estimatesPoses, inputTensor}: EventOn): void {
    if (poses) {
      this.dance.posesCamera = poses;
    }
    if (estimatesPoses) {
      this.dance.estimatesPosesCamera = estimatesPoses;
    }
    if (inputTensor) {
      this.dance.inputTensorCamera = inputTensor;
    }
  }

  private setup() {
    const {VIDEO} = this.p;
    const width = window.innerWidth - 100,
      height = window.innerHeight - 100;

    this.image = this.p.createCapture(VIDEO, ({active}) => {
      this.active = active;
    }) as Element;

    this.image.size(width, height);
    this.image.hide();
  }

  private draw() {
    if (!this.active) return;
    this.time += this.p.deltaTime;

    if (this.time >= 300) {
      this.time = 0;
    }

    if (this.time >= 150) return;
    if (this.time % 2) return;
    this.load();

    const currentPoses = this.dance?.posesCamera ?? [];
    currentPoses.forEach(this.storageEstimates.bind(this));
    if (!this.inputTensor) return;
    this.on.call(this, {
      estimatesPoses: [...this.estimatesPoses],
      inputTensor: this.inputTensor.clone(),
    });
  }
}
