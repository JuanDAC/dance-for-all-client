import {LitElement, PropertyValueMap} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import '../../share/components/title/title';
import {styles} from './dance.styles';
import {template} from './dance.template';
import p5 from 'p5';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ml5 from 'ml5';
import {CanvasEffects} from 'share/logic/canvas-effects/canvas-effects.logic';
import {CanvasDance} from 'share/logic/canvas-dance/canvas-dance.logic';
import {CameraDance} from 'share/logic/camera-dance/camera-dance.logic';
import {Percentages} from './dance.types';

@customElement('dance-for-everyone-route-dance')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Dance extends LitElement {
  static override styles = [...styles];

  public posesVideo!: EventPose;
  public posesCamera!: EventPose;

  public estimatesPosesVideo: EstimatesPoses = [];
  public estimatesPosesCamera: EstimatesPoses = [];

  public canvasEffectsHandler!: CanvasEffects;
  public canvasDanceHandler!: CanvasDance;
  public cameraDanceHandler!: CameraDance;

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

  constructor() {
    super();
    this.render = template.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
  }

  override firstUpdated(
    changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>
  ) {
    super.firstUpdated(changedProperties);

    new p5(this.cameraDanceSketch, this.$video.parentElement!);
  }

  startRecodingDance() {
    new p5(this.canvasDanceSketch, this.$video.parentElement!);
    setTimeout(() => {
      new p5(this.canvasEfectsSketch, this.$video.parentElement!);
    }, 100);
    setInterval(this.playerValidation.bind(this), 1000);
  }

  startDance() {
    this.$video.play().then(() => this.startRecodingDance());
    this.$video.volume = 1;
    console.log(this.$video)
  }

  private playerValidation() {
    const estimatesPosesVideo = [...this.estimatesPosesVideo];
    const estimatesPosesCamera = [...this.estimatesPosesCamera];

    const percentagesVideo: {[T in keyof Percentages]: number[]} = {
      upperTrunk: [],
      lowerTrunk: [],
      arms: [],
      legs: [],
      all: [],
    };
    const percentagesCamera: Percentages = {
      upperTrunk: 0,
      lowerTrunk: 0,
      arms: 0,
      legs: 0,
      all: 0,
    };
    estimatesPosesVideo.forEach(
      ([_, /*upperTrunk,*/ lowerTrunk, legs, arms]) => {
        /*       percentagesVideo.upperTrunk.push(upperTrunk ?? 0); */
        percentagesVideo.lowerTrunk.push(lowerTrunk ?? 0);
        percentagesVideo.legs.push(legs ?? 0);
        percentagesVideo.arms.push(arms ?? 0);
        percentagesVideo.all.push(
          /*         upperTrunk ?? 0, */
          lowerTrunk ?? 0,
          legs ?? 0,
          arms ?? 0
        );
      }
    );
    estimatesPosesCamera.forEach(
      ([_, /* upperTrunk, */ lowerTrunk, legs, arms]) => {
        /*       percentagesCamera.upperTrunk += Number(
        percentagesVideo.upperTrunk.includes(upperTrunk ?? 0)
      ); */
        percentagesCamera.lowerTrunk += Number(
          percentagesVideo.lowerTrunk.includes(lowerTrunk ?? 0)
        );
        percentagesCamera.legs += Number(
          percentagesVideo.legs.includes(legs ?? 0)
        );
        percentagesCamera.arms += Number(
          percentagesVideo.arms.includes(arms ?? 0)
        );
        percentagesCamera.all +=
          /*           Number(percentagesVideo.all.includes(upperTrunk ?? 0)) + */
          Number(percentagesVideo.all.includes(lowerTrunk ?? 0)) +
          Number(percentagesVideo.all.includes(legs ?? 0)) +
          Number(percentagesVideo.all.includes(arms ?? 0));
      }
    );

    const {length} = estimatesPosesCamera;
    /*     percentagesCamera.upperTrunk /= length; */
    percentagesCamera.lowerTrunk /= length;
    percentagesCamera.legs /= length;
    percentagesCamera.arms /= length;
    percentagesCamera.all /= length * 4;

    const values = Object.values(percentagesCamera);
    const fails = values.filter((v) => v === 0);

    if (fails.length > 0)
      this.setMessage(estimatesPosesCamera, estimatesPosesVideo, 0);

    const percentages = percentagesCamera.all;

    if (fails.length === 0)
      this.setMessage(estimatesPosesCamera, estimatesPosesVideo, percentages);

    this.cameraDanceHandler.estimatesClear();
    this.canvasDanceHandler.estimatesClear();
    this.requestUpdate();
  }

  private setMessage(
    estimatesPosesCamera: EstimatesPose[],
    estimatesPosesVideo: EstimatesPose[],
    percentage: number
  ) {
    if (['good', 'perfect', 'bad'].includes(this.danceKind)) {
      this.danceKind = '';
      return 1;
    }

    if (estimatesPosesVideo.length < 6) {
      this.danceKind = '';
      return 0;
    }

    if (estimatesPosesCamera.length < 6) {
      this.danceKind = 'bad';
      return 0;
    }

    if (percentage < 0.5) {
      this.danceKind = 'bad';
      return 1;
    }

    if (percentage < 0.8) {
      this.danceKind = 'good';
      return 1;
    }

    this.danceKind = 'perfect';
    return 1;
  }

  private get canvasEfectsSketch() {
    this.canvasEffectsHandler = new CanvasEffects(this);
    return this.canvasEffectsHandler.conection.bind(this.canvasEffectsHandler);
  }

  private get canvasDanceSketch() {
    this.canvasDanceHandler = new CanvasDance(this, this.poseNet);
    return this.canvasDanceHandler.conection.bind(this.canvasDanceHandler);
  }

  private get cameraDanceSketch() {
    this.cameraDanceHandler = new CameraDance(this, this.poseNet);
    return this.cameraDanceHandler.conection.bind(this.cameraDanceHandler);
  }
}
