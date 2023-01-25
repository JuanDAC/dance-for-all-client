import p5 from 'p5';
import type {Dance} from 'routes/dance/dance';
import {EventOn, PoseNet} from '../pose-net/pose-net.logic';
import '../../services/ml5/ml5.types';

export class CanvasDance extends PoseNet {
  private canvas!: p5.Renderer;
  private time = 0;

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
      this.dance.posesVideo = poses;
    }
    if (estimatesPoses) {
      this.dance.estimatesPosesVideo = estimatesPoses;
    }
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

    this.image = (
      this.p.drawingContext as CanvasRenderingContext2D
    ).getImageData(0, 0, this.p.width, this.p.height);

    this.load();

    const currentPoses = this.dance?.posesVideo ?? [];
    currentPoses.forEach(this.storageEstimates.bind(this));
    this.on.call(this, {estimatesPoses: [...this.estimatesPoses]});
  }
}
