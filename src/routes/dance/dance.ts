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

@customElement('dance-for-everyone-route-dance')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Dance extends LitElement {
  static override styles = [...styles];

  public posesVideo!: EventPose;
  public posesCamera!: EventPose;

  public estimatesPosesVideo: EstimatesPoses = [];
  public estimatesPosesCamera: EstimatesPoses = [];

  private poseNet = ml5.poseNet();

  @query('#dance__video')
  public $video!: HTMLVideoElement;

  @query('#dance__game')
  public canvasDance!: HTMLCanvasElement;

  @property({type: Number})
  public videoHeight: number = window.innerHeight;

  @property({type: Number})
  public videoWidth: number = window.innerWidth;

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

    new p5(this.canvasDanceSketch, this.$video.parentElement!);
    new p5(this.cameraDanceSketch, this.$video.parentElement!);
    setTimeout(() => {
      new p5(this.canvasEfectsSketch, this.$video.parentElement!);
    }, 100);
    setInterval(this.playerValidation.bind(this), 1000);
  }

  private playerValidation() {
    console.log('EstimatesPosesVideo');
    console.log(this.estimatesPosesVideo);
    console.log('EstimatesPosesCamera');
    console.log(this.estimatesPosesCamera);
  }

  private get canvasEfectsSketch() {
    const canvasEffects = new CanvasEffects(this);
    return canvasEffects.conection.bind(canvasEffects);
  }

  private get canvasDanceSketch() {
    const canvasDance = new CanvasDance(this, this.poseNet);
    return canvasDance.conection.bind(canvasDance);
  }

  private get cameraDanceSketch() {
    const cameraDance = new CameraDance(this, this.poseNet);
    return cameraDance.conection.bind(cameraDance);
  }
}
