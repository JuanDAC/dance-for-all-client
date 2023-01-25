import {Dance} from './dance';

declare global {
  interface HTMLElementTagNameMap {
    'dance-for-everyone-route-dance': Dance;
  }
}

export type Percentages = {
  upperTrunk: number;
  lowerTrunk: number;
  arms: number;
  legs: number;
  all: number;
};
