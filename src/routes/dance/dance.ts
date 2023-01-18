import {LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import '../../share/title/title';
import {
  actionsStyles,
  animationStyles,
  hostStyles,
  menuStyles,
  messageStyles,
  scoreStyles,
  startsStyles,
  videoStyles,
} from './dance.styles';
import {template} from './dance.template';

@customElement('dance-for-everyone-route-dance')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Dance extends LitElement {
  static override styles = [
    hostStyles,
    videoStyles,
    actionsStyles,
    scoreStyles,
    startsStyles,
    messageStyles,
    menuStyles,
    animationStyles,
  ];

  @query('#dance__video')
  $video!: HTMLVideoElement;

  @property({type: Number})
  videoHeight: number = window.innerHeight;

  @property({type: Number})
  videoWidth: number = window.innerWidth;

  constructor() {
    super();
    window.addEventListener('resize', () => {
      this.videoHeight = window.innerHeight;
      this.videoWidth = window.innerWidth;
    });
    this.render = template.bind(this);
  }
}
