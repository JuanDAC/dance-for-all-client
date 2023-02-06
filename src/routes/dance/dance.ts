import {LitElement, TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import '../../share/components/title/title';
import {styles} from './dance.styles';
import {Template, template} from './dance.template';
import p5 from 'p5';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ml5 from 'ml5';
import {CanvasEffects} from 'share/logic/canvas-effects/canvas-effects.logic';
import {CanvasDance} from 'share/logic/canvas-dance/canvas-dance.logic';
import {CameraDance} from 'share/logic/camera-dance/camera-dance.logic';
import {Task} from '@lit-labs/task';
import * as tf from '@tensorflow/tfjs';
import {DanceReplicator} from 'share/logic/dance-replicator/dance-replicator.logic';

@customElement('dance-for-everyone-route-dance')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Dance extends LitElement implements Template {
  static override styles = [...styles];

  public startVideo = false;

  public posesVideo!: EventPose;
  public posesCamera!: EventPose;

  public estimatesPosesVideo: EstimatesPoses = [];
  public estimatesPosesCamera: EstimatesPoses = [];
  public inputTensorCamera!: tf.Tensor2D;
  public inputTensorVideo!: tf.Tensor2D;

  public canvasEffectsHandler!: CanvasEffects;
  public canvasDanceHandler!: CanvasDance;
  public cameraDanceHandler!: CameraDance;

  public danceReplicator!: DanceReplicator;

  public playerValidationInterval!: NodeJS.Timer;

  private poseNet = ml5.poseNet();

  @query('#dance__video')
  public $video!: HTMLVideoElement;

  @query('#dance__game')
  public canvasDance!: HTMLCanvasElement;

  @property({type: Number})
  public videoHeight: number = window.innerHeight;

  @property({type: Number})
  public videoWidth: number = window.innerWidth;

  @property()
  danceColor = [];

  @property()
  danceVelocity = [];

  @property()
  danceKind!: 'good' | 'perfect' | 'bad' | '';

  @state()
  videoId!: string;

  searchParams = new URLSearchParams(location.search);

  initial = template.initial.bind(this);

  pending = template.pending.bind(this);

  complete = template.error.bind(this);

  error = template.error.bind(this);

  override render = template.render.bind(this);

  apiTask = new Task(
    this,
    async ([userId]) => {
      const data = await fetch(`http://localhost:3000/media/video/${userId}`, {
        method: 'GET',
        headers: {
          Accept: '*/*',
        },
      });
      const blob = await data.blob();
      return URL.createObjectURL(blob);
    },
    () => [this.videoId]
  );

  constructor() {
    super();
    this.videoId = this.searchParams.get('v') ?? '';
    this.danceReplicator = new DanceReplicator();
    this.danceReplicator.init();
  }


  override connectedCallback() {
    super.connectedCallback();
  }

  startRecodingDance() {
    new p5(this.cameraDanceSketch, this.$video.parentElement!);
    new p5(this.canvasDanceSketch, this.$video.parentElement!);
    setTimeout(() => {
      new p5(this.canvasEfectsSketch, this.$video.parentElement!);
      this.canvasDanceHandler.activation = true;
    }, 100);
  }

  async playerValidation() {
    const [tensorA, TensorB] = await this.danceReplicator.getSliceValue(
      this.inputTensorVideo,
      this.inputTensorCamera
    );

    if (!tensorA || !TensorB) {
      return;
    }

    this.cameraDanceHandler.estimatesClear();
    this.canvasDanceHandler.estimatesClear();

    const {min} = await this.danceReplicator.danceValidation(tensorA, TensorB);

    this.setMessage(min);
  }

  playDance() {
    this.playerValidationInterval = setInterval(
      this.playerValidation.bind(this),
      2000
    );
  }

  pauseDance() {
    clearInterval(this.playerValidationInterval);
  }

  endDance() {
    clearInterval(this.playerValidationInterval);
  }

  async playVideo() {
    await this.$video.play();
    this.cameraDanceHandler.estimatesClear();
    this.canvasDanceHandler.estimatesClear();
  }

  async startDance() {
    this.$video.volume = 1;
    await this.$video.play();
    this.startRecodingDance();
    this.startVideo = true;
  }

  setMessage(percentage: number) {
    setTimeout(() => {
      if (['good', 'perfect', 'bad'].includes(this.danceKind)) {
        this.danceKind = '';
      }
    }, 1000);

    if (percentage < 0.6) {
      return (this.danceKind = 'bad');
    }

    if (percentage < 0.8) {
      return (this.danceKind = 'good');
    }

    return (this.danceKind = 'perfect');
  }

  get canvasEfectsSketch() {
    this.canvasEffectsHandler = new CanvasEffects(this);
    return this.canvasEffectsHandler.conection.bind(this.canvasEffectsHandler);
  }

  get canvasDanceSketch() {
    this.canvasDanceHandler = new CanvasDance(this, this.poseNet);
    return this.canvasDanceHandler.conection.bind(this.canvasDanceHandler);
  }

  get cameraDanceSketch() {
    this.cameraDanceHandler = new CameraDance(this, this.poseNet);
    return this.cameraDanceHandler.conection.bind(this.cameraDanceHandler);
  }
}
