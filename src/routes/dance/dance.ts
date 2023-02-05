import {LitElement} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
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
import {Task} from '@lit-labs/task';
import * as tf from '@tensorflow/tfjs';

@customElement('dance-for-everyone-route-dance')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Dance extends LitElement {
  static override styles = [...styles];

  public posesVideo!: EventPose;
  public posesCamera!: EventPose;

  public estimatesPosesVideo: EstimatesPoses = [];
  public estimatesPosesCamera: EstimatesPoses = [];
  public inputTensorCamera!: tf.Tensor2D;
  public inputTensorVideo!: tf.Tensor2D;

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

  @state()
  videoId!: string;

  searchParams = new URLSearchParams(location.search);

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
    this.render = template.bind(this);
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
    setInterval(this.playerValidation.bind(this), 2000);
  }

  startDance() {
    this.$video.play().then(() => {
      this.startRecodingDance();
    });
    this.$video.volume = 1;
  }

  createModel(inputShape: [number]): tf.Sequential {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 2,
        inputShape,
      })
    );
    model.add(
      tf.layers.dense({
        units: 2,
        activation: 'relu',
      })
    );
    model.add(
      tf.layers.dense({
        units: 1,
        activation: 'sigmoid',
      })
    );
    return model;
  }

  async playerValidation() {
    const max = 10;
    if (
      !this.inputTensorVideo ||
      !this.inputTensorCamera ||
      this.inputTensorCamera.shape[0] < max ||
      this.inputTensorVideo.shape[0] < max
    )
      return;

    const inputTensorA = (this.inputTensorVideo = this.inputTensorVideo.slice(
      [this.inputTensorVideo.shape[0] - max, 0],
      [max, this.inputTensorVideo.shape[1]]
    ));
    const inputTensorB = (this.inputTensorCamera = this.inputTensorCamera.slice(
      [this.inputTensorCamera.shape[0] - max, 0],
      [max, this.inputTensorCamera.shape[1]]
    ));
    this.cameraDanceHandler.estimatesClear();
    this.canvasDanceHandler.estimatesClear();
    const xs = tf
      .concat([inputTensorA, inputTensorB], 0)
      .reshape([-1, inputTensorB.shape[1]]);
    const ys = tf.tensor1d(Array(xs.shape[0]).fill(0));
    const model = this.createModel([xs.shape[1] ?? 2]);

    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
      metrics: ['mse'],
    });
    await model.fit(xs, ys, {
      epochs: 10,
      callbacks: {
        onTrainEnd: (logs) => {
          // As each frame is analyzed, use the model to compare the poses and update the model with the new information
          // This will improve the accuracy of the model over time
          console.log(`Epoch: `, logs);

          // Use the local storage in JavaScript to save the knowledge of the model after each update
          localStorage.setItem(
            'dance-for-everyone:model',
            model.toJSON() as string
          );
        },
      },
    });
    const result = model.predict(inputTensorA) as tf.Tensor;
    const prediction = [...(await result.data())];
    /*     const isEquivalent = prediction[0] > 0.5; */
    this.requestUpdate();
    this.setMessageML(prediction);
  }

  setMessageML(prediction: number[]) {
    const percentage = prediction.sort((A, B) => B - A).pop() ?? 0;

    setTimeout(() => {
      if (['good', 'perfect', 'bad'].includes(this.danceKind)) {
        this.danceKind = '';
      }
    }, 1000);

    if (percentage < 0.6) {
      return this.danceKind = 'bad';
    }

    if (percentage < 0.8) {
      return this.danceKind = 'good';
    }

    return this.danceKind = 'perfect';
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
