import p5 from 'p5';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {newAnimS} from 'p5.anims';

export interface P5Polar {
  center: {x: number; y: number};
  animationId: number;
  duration: number;
  setCenter: (this: p5 & P5Polar, x: number, y: number) => void;
  polarTriangle: (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) => void;
  polarEllipse: (
    this: p5 & P5Polar,
    _angle: number,
    _radiusW: number,
    _radiusH: number,
    _distance: number
  ) => void;
  polarEllipses: (
    this: p5 & P5Polar,
    _num: number,
    _radiusW: number,
    _radiusH: number,
    _distance: number,
    callback?:
      | ((
          index: number,
          angle: number,
          radiusW: number,
          radiusH: number,
          distance: number
        ) => [number, number, number, number, number])
      | undefined
  ) => void;
  polarLine: (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) => void;
  polarLines: (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?:
      | ((
          index: number,
          angle: number,
          radius: number,
          distance: number
        ) => [number, number, number, number])
      | undefined
  ) => void;
  polarSquare: (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) => void;
  polarSquares: (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?:
      | ((
          index: number,
          angle: number,
          radius: number,
          distance: number
        ) => [number, number, number, number])
      | undefined
  ) => void;
  polarPentagon: (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) => void;
  polarPentagons: (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?:
      | ((
          index: number,
          angle: number,
          radius: number,
          distance: number
        ) => [number, number, number, number])
      | undefined
  ) => void;
  polarHexagon: (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) => void;
  polarHexagons: (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?:
      | ((
          index: number,
          angle: number,
          radius: number,
          distance: number
        ) => [number, number, number, number])
      | undefined
  ) => void;

  polarHeptagon: (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) => void;
  polarHeptagons: (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?:
      | ((
          index: number,
          angle: number,
          radius: number,
          distance: number
        ) => [number, number, number, number])
      | undefined
  ) => void;
  polarOctagon: (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) => void;
  polarOctagons: (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?:
      | ((
          index: number,
          angle: number,
          radius: number,
          distance: number
        ) => [number, number, number, number])
      | undefined
  ) => void;

  polarPolygon: (
    this: p5 & P5Polar,
    _edge: number,
    _angle: number,
    _radius: number,
    _distance: number
  ) => void;

  polarPolygons: (
    this: p5 & P5Polar,
    _num: number,
    _edge: number,
    _radius: number,
    _distance: number,
    callback?:
      | ((
          index: number,
          angle: number,
          edge: number,
          radius: number,
          distance: number
        ) => [number, number, number, number, number])
      | undefined
  ) => void;
  /**
   * Removes all the cached shape animation instances so that new shape
   *     creations result in new animations.
   */
  animationReset: () => void;

  /**
   * Draws an arc while playing its creation animation. The arc mode is always
   *     OPEN. The elipse mode is always CENTER.
   * @param {!string} id A unique string ID to identify the shape animation.
   * @param {!number} duration The duration of the creation animation, in
   *     number of frames.
   * @param {!Number} x The x-coordinate of the arc's ellipse.
   * @param {!Number} y The y-coordinate of the arc's ellipse.
   * @param {!Number} w The width of the arc's ellipse by default.
   * @param {!Number} h The height of the arc's ellipse by default.
   * @param {!Number} start The angle to start the arc, in radians.
   * @param {!Number} stop The angle to stop the arc, in radians.
   */
  animationArc: (
    id: string,
    duration: number,
    x: number,
    y: number,
    w: number,
    h: number,
    start: number,
    stop: number
  ) => void;

  /**
   * Draws an elipse (oval) while playing its creation animation. The elipse
   *     mode is always CENTER.
   * @param {!string} id A unique string ID to identify the shape animation.
   * @param {!number} duration The duration of the creation animation, in
   *     number of frames.
   * @param {!number} x The x-coordinate of the center of ellipse.
   * @param {!number} y The y-coordinate of the center of ellipse.
   * @param {!number} w The width of the ellipse.
   * @param {!number} h The height of the ellipse.
   */
  animationEllipse: (
    id: string,
    duration: number,
    x: number,
    y: number,
    w: number,
    h: number
  ) => void;

  /**
   * Draws a circle while playing its creation animation.
   * @param {!string} id A unique string ID to identify the shape animation.
   * @param {!number} duration The duration of the creation animation, in
   *     number of frames.
   * @param {!number} x The x-coordinate of the centre of the circle.
   * @param {!number} y The y-coordinate of the centre of the circle.
   * @param {!number} d The diameter of the circle.
   */
  animationCircle: (
    id: string,
    duration: number,
    x: number,
    y: number,
    d: number
  ) => void;

  /**
   * Draws a line while playing its creation animation.
   * @param {!string} id A unique string ID to identify the shape animation.
   * @param {!number} duration The duration of the creation animation, in
   *     number of frames.
   * @param {!number} x1 The x-coordinate of the first point.
   * @param {!number} y1 The y-coordinate of the first point.
   * @param {!number} x2 The x-coordinate of the second point.
   * @param {!number} y2 The y-coordinate of the second point.
   */
  animationLine: (
    id: string,
    duration: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => void;

  /**
   * Draws a quad while playing its creation animation.
   * @param {!string} id A unique string ID to identify the shape animation.
   * @param {!number} duration The duration of the creation animation, in
   *     number of frames.
   * @param {!number} x1 The x-coordinate of the first point.
   * @param {!number} y1 The y-coordinate of the first point.
   * @param {!number} x2 The x-coordinate of the second point.
   * @param {!number} y2 The y-coordinate of the second point.
   * @param {!number} x3 The x-coordinate of the third point.
   * @param {!number} y3 The y-coordinate of the third point.
   * @param {!number} x4 The x-coordinate of the fourth point.
   * @param {!number} y4 The y-coordinate of the fourth point.
   */
  animationQuad: (
    id: string,
    duration: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) => void;

  /**
   * Draws a rectangle while playing its creation animation.
   * @param {!string} id A unique string ID to identify the shape animation.
   * @param {!number} duration The duration of the creation animation, in
   *     number of frames.
   * @param {!number} x The x-coordinate of the rectangle.
   * @param {!number} y The y-coordinate of the rectangle.
   * @param {!number} w The width of the rectangle.
   * @param {!number} h The height of the rectangle.
   */
  animationRect: (
    id: string,
    duration: number,
    x: number,
    y: number,
    w: number,
    h: number
  ) => void;

  /**
   * Draws a square while playing its creation animation.
   * @param {!string} id A unique string ID to identify the shape animation.
   * @param {!number} duration The duration of the creation animation, in
   *     number of frames.
   * @param {!number} x The x-coordinate of the square.
   * @param {!number} y The y-coordinate of the square.
   * @param {!number} s The side size of the square.
   */
  animationSquare: (
    id: string,
    duration: number,
    x: number,
    y: number,
    s: number
  ) => void;

  /**
   * Draws a triangle while playing its creation animation.
   * @param {!string} id A unique string ID to identify the shape animation.
   * @param {!number} duration The duration of the creation animation, in
   *     number of frames.
   * @param {!number} x1 The x-coordinate of the first point.
   * @param {!number} y1 The y-coordinate of the first point.
   * @param {!number} x2 The x-coordinate of the second point.
   * @param {!number} y2 The y-coordinate of the second point.
   * @param {!number} x3 The x-coordinate of the third point.
   * @param {!number} y3 The y-coordinate of the third point.
   */
  animationTriangle: (
    id: string,
    duration: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ) => void;

  /**
   * Draws a shape while playing its creation animation. The shape is always
   *     OPEN unless the first vertex and the last vertex are equal.
   * @param {!string} id A unique string ID to identify the shape animation.
   * @param {!number} duration The duration of the creation animation, in
   *     number of frames.
   * @param {!Array<Array<number>>} vertices The vertices that define the
   *     shape. Each element of the array may contain eithr two coordinate
   *     numbers (for simple vertices) or six coordinate numbers (for Bezier
   *     vertices).
   */
  animationShape: (id: string, duration: number, vertices: number) => void;
  setDuration: (this: p5 & P5Polar, duration: number) => void;
}

const p5Polar = {
  setDuration: function (this: p5 & P5Polar, duration: number) {
    this.duration = duration;
  },
  setCenter: function (this: p5 & P5Polar, x: number, y: number) {
    if (typeof this.center === 'undefined') {
      this.center = {x, y};
    } else {
      this.center = {x, y};
    }
  },

  polarTriangle: function (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) {
    this.push();
    const _radians = this.radians(_angle);
    const {x, y} = this.center;
    this.translate(x, y);
    this.translate(
      this.sin(_radians) * _distance,
      this.cos(_radians) * -_distance
    );
    this.rotate(this.radians(_angle));
    this.triangle(
      this.sin(0),
      this.cos(0) * -_radius,
      this.sin((this.TWO_PI * 1) / 3) * _radius,
      this.cos((this.TWO_PI * 1) / 3) * -_radius,
      this.sin((this.TWO_PI * 2) / 3) * _radius,
      this.cos((this.TWO_PI * 2) / 3) * -_radius
    );
    this.pop();
  },

  polarTriangles: function (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?: (
      index: number,
      angle: number,
      radius: number,
      distance: number
    ) => [number, number, number, number]
  ) {
    const _angle = 360 / _num;
    for (let i = 1; i <= _num; i++) {
      if (callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarTriangle(_result[0] * _result[1], _result[2], _result[3]);
      } else {
        this.polarTriangle(i * _angle, _radius, _distance);
      }
    }
  },

  polarEllipse: function (
    this: p5 & P5Polar,
    _angle: number,
    _radiusW: number,
    _radiusH: number,
    _distance: number
  ) {
    this.push();
    const _radians = this.radians(_angle);
    const {x, y} = this.center;
    this.translate(x, y);
    this.translate(
      this.sin(_radians) * _distance,
      this.cos(_radians) * -_distance
    );
    this.drawingContext.shadowBlur = 2;
    this.drawingContext.shadowColor = 'white';
    this.rotate(this.radians(_angle));
    this.ellipse(0, 0, _radiusW * 2, _radiusH * 2);
    this.pop();
  },

  polarEllipses: function (
    this: p5 & P5Polar,
    _num: number,
    _radiusW: number,
    _radiusH: number,
    _distance: number,
    callback?: (
      index: number,
      angle: number,
      radiusW: number,
      radiusH: number,
      distance: number
    ) => [number, number, number, number, number]
  ) {
    const _angle = 360 / _num;
    for (let i = 1; i <= _num; i++) {
      if (callback) {
        const _result = callback(i, _angle, _radiusW, _radiusH, _distance);
        this.polarEllipse(
          _result[0] * _result[1],
          _result[2],
          _result[3],
          _result[4]
        );
      } else this.polarEllipse(i * _angle, _radiusW, _radiusH, _distance);
    }
  },

  // Line
  polarLine: function (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) {
    this.push();
    const _radians = this.radians(_angle);
    const {x, y} = this.center;
    this.translate(x, y);
    this.translate(
      this.sin(_radians) * _distance,
      this.cos(_radians) * -_distance
    );
    this.drawingContext.shadowBlur = 2;
    this.drawingContext.shadowColor = 'white';
    this.rotate(this.radians(_angle));
    this.line(0, _radius, 0, -_radius);
    this.pop();
  },

  polarLines: function (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?: (
      index: number,
      angle: number,
      radius: number,
      distance: number
    ) => [number, number, number, number]
  ) {
    const _angle = 360 / _num;
    for (let i = 1; i <= _num; i++) {
      if (callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarLine(_result[0] * _result[1], _result[2], _result[3]);
      } else {
        this.polarLine(i * _angle, _radius, _distance);
      }
    }
  },

  // Square
  polarSquare: function (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) {
    this.push();
    const _radians = this.radians(_angle);
    const {x, y} = this.center;
    this.translate(x, y);
    this.translate(
      this.sin(_radians) * _distance,
      this.cos(_radians) * -_distance
    );
    this.rotate(this.radians(_angle));
    this.square(-_radius, -_radius, _radius * 2);
    this.pop();
  },

  polarSquares: function (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?: (
      index: number,
      angle: number,
      radius: number,
      distance: number
    ) => [number, number, number, number]
  ) {
    const _angle = 360 / _num;
    for (let i = 1; i <= _num; i++) {
      if (callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarSquare(_result[0] * _result[1], _result[2], _result[3]);
      } else this.polarSquare(i * _angle, _radius, _distance);
    }
  },

  // Pentagon
  polarPentagon: function (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) {
    this.push();
    const _radians = this.radians(_angle);
    const {x, y} = this.center;
    this.translate(x, y);
    this.translate(
      this.sin(_radians) * _distance,
      this.cos(_radians) * -_distance
    );
    this.rotate(this.radians(_angle) + 60);
    this.beginShape();
    for (let i = 1; i <= 5; i++) {
      this.vertex(
        this.cos((this.TWO_PI * i) / 5) * _radius,
        this.sin((this.TWO_PI * i) / 5) * _radius
      );
    }
    this.endShape(this.CLOSE);
    this.pop();
  },

  polarPentagons: function (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?: (
      index: number,
      angle: number,
      radius: number,
      distance: number
    ) => [number, number, number, number]
  ) {
    const _angle = 360 / _num;
    for (let i = 1; i <= _num; i++) {
      if (callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarPentagon(_result[0] * _result[1], _result[2], _result[3]);
      } else this.polarPentagon(i * _angle, _radius, _distance);
    }
  },

  // Hexagon
  polarHexagon: function (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) {
    this.push();
    const _radians = this.radians(_angle);
    const {x, y} = this.center;
    this.translate(x, y);
    this.translate(
      this.sin(_radians) * _distance,
      this.cos(_radians) * -_distance
    );
    this.rotate(this.radians(_angle));
    this.beginShape();
    for (let i = 0; i < 6; i++) {
      this.vertex(
        this.cos((this.TWO_PI * i) / 6) * _radius,
        this.sin((this.TWO_PI * i) / 6) * _radius
      );
    }
    this.endShape(this.CLOSE);
    this.pop();
  },

  polarHexagons: function (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?: (
      index: number,
      angle: number,
      radius: number,
      distance: number
    ) => [number, number, number, number]
  ) {
    const _angle = 360 / _num;
    for (let i = 1; i <= _num; i++) {
      if (callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarHexagon(_result[0] * _result[1], _result[2], _result[3]);
      } else this.polarHexagon(i * _angle, _radius, _distance);
    }
  },

  // Heptagon
  polarHeptagon: function (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) {
    this.push();
    const _radians = this.radians(_angle);
    const {x, y} = this.center;
    this.translate(x, y);
    this.translate(
      this.sin(_radians) * _distance,
      this.cos(_radians) * -_distance
    );
    this.rotate(this.radians(_angle) + 11);
    this.beginShape();
    for (let i = 1; i <= 7; i++) {
      this.vertex(
        this.cos((this.TWO_PI * i) / 7) * _radius,
        this.sin((this.TWO_PI * i) / 7) * _radius
      );
    }
    this.endShape(this.CLOSE);
    this.pop();
  },

  polarHeptagons: function (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?: (
      index: number,
      angle: number,
      radius: number,
      distance: number
    ) => [number, number, number, number]
  ) {
    const _angle = 360 / _num;
    for (let i = 1; i <= _num; i++) {
      if (callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarHeptagon(_result[0] * _result[1], _result[2], _result[3]);
      } else this.polarHeptagon(i * _angle, _radius, _distance);
    }
  },

  // Octagon
  polarOctagon: function (
    this: p5 & P5Polar,
    _angle: number,
    _radius: number,
    _distance: number
  ) {
    this.push();
    const _radians = this.radians(_angle);
    const {x, y} = this.center;
    this.translate(x, y);
    this.translate(
      this.sin(_radians) * _distance,
      this.cos(_radians) * -_distance
    );
    this.rotate(this.radians(_angle));
    this.beginShape();
    for (let i = 1; i <= 8; i++) {
      this.vertex(
        this.cos((this.TWO_PI * i) / 8) * _radius,
        this.sin((this.TWO_PI * i) / 8) * _radius
      );
    }
    this.endShape(this.CLOSE);
    this.pop();
  },

  polarOctagons: function (
    this: p5 & P5Polar,
    _num: number,
    _radius: number,
    _distance: number,
    callback?: (
      index: number,
      angle: number,
      radius: number,
      distance: number
    ) => [number, number, number, number]
  ) {
    const _angle = 360 / _num;
    for (let i = 1; i <= _num; i++) {
      if (callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarOctagon(_result[0] * _result[1], _result[2], _result[3]);
      } else this.polarOctagon(i * _angle, _radius, _distance);
    }
  },

  // Polygon
  polarPolygon: function (
    this: p5 & P5Polar,
    _edge: number,
    _angle: number,
    _radius: number,
    _distance: number
  ) {
    this.push();
    const _radians = this.radians(_angle);
    const {x, y} = this.center;
    this.translate(x, y);
    this.translate(
      this.sin(_radians) * _distance,
      this.cos(_radians) * -_distance
    );
    this.drawingContext.shadowBlur = 2;
    this.drawingContext.shadowColor = 'white';
    this.rotate(this.radians(_angle));
    this.beginShape();
    for (let i = 1; i <= _edge; i++) {
      this.vertex(
        this.cos((this.TWO_PI * i) / _edge) * _radius,
        this.sin((this.TWO_PI * i) / _edge) * _radius
      );
    }
    this.endShape(this.CLOSE);
    this.pop();
  },

  polarPolygons: function (
    this: p5 & P5Polar,
    _num: number,
    _edge: number,
    _radius: number,
    _distance: number,
    callback?: (
      index: number,
      angle: number,
      edge: number,
      radius: number,
      distance: number
    ) => [number, number, number, number, number]
  ) {
    const _angle = 360 / _num;
    for (let i = 1; i <= _num; i++) {
      if (callback) {
        const _result = callback(i, _angle, _edge, _radius, _distance);
        this.polarPolygon(
          _result[2],
          _result[0] * _result[1],
          _result[3],
          _result[4]
        );
      } else this.polarPolygon(_edge, i * _angle, _radius, _distance);
    }
  },
};

export const polar = (p: p5): p5 & P5Polar => {
  const anim = newAnimS(p);
  const p5polar = new Proxy(p, {
    get(target, propertyKey, receiver) {
      if (typeof propertyKey === 'string' && propertyKey in p5Polar) {
        const value = p5Polar[propertyKey as keyof typeof p5Polar];
        return typeof value === 'function' ? value.bind(p5polar) : value;
      }

      const animationKey: string =
        typeof propertyKey === 'string'
          ? propertyKey.replace('animation', '').toLowerCase()
          : '_';

      if (
        typeof propertyKey === 'string' &&
        (propertyKey.startsWith('animation') || propertyKey.endsWith('_')) &&
        animationKey in anim
      ) {
        const value = anim[animationKey as keyof typeof anim];
        return typeof value === 'function' ? value.bind(anim) : value;
      }

      return Reflect.get(target, propertyKey, receiver);
    },
  }) as p5 & P5Polar;
  return p5polar;
};

/*



// Ellipse
*/
