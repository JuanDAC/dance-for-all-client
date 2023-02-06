import * as tf from '@tensorflow/tfjs';

export class DanceReplicator {
  model!: tf.Sequential;
  keyToStorage = 'dance-for-everyone:model:dance-replicator' as const;
  max = 10;

  async init() {
    const modelData = localStorage.getItem(this.keyToStorage);
    if (modelData) {
      const layersModel = await tf.loadLayersModel(JSON.parse(modelData));
      this.model = tf.sequential({
        layers: layersModel.layers.map((layer) => layer),
      });
    } else {
      this.model = this.createModel([2]);
    }
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

  getSliceValue(inputTensorVideo: tf.Tensor2D, inputTensorCamera: tf.Tensor2D) {
    if (
      !inputTensorVideo ||
      !inputTensorCamera ||
      inputTensorCamera.shape[0] < this.max ||
      inputTensorVideo.shape[0] < this.max
    )
      return [null, null];

    const inputTensorA = (inputTensorVideo = inputTensorVideo.slice(
      [inputTensorVideo.shape[0] - this.max, 0],
      [this.max, inputTensorVideo.shape[1]]
    ));

    const inputTensorB = (inputTensorCamera = inputTensorCamera.slice(
      [inputTensorCamera.shape[0] - this.max, 0],
      [this.max, inputTensorCamera.shape[1]]
    ));

    return [inputTensorA, inputTensorB];
  }

  async danceValidation(inputTensorA: tf.Tensor2D, inputTensorB: tf.Tensor2D) {
    const xs = tf
      .concat([inputTensorA, inputTensorB], 0)
      .reshape([-1, inputTensorB.shape[1]]);
    const ys = tf.tensor1d(Array(xs.shape[0]).fill(0));

    this.model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
      metrics: ['mse'],
    });

    await this.model.fit(xs, ys, {
      epochs: 10,
      callbacks: {
        onTrainEnd: () => {
          localStorage.setItem(
            this.keyToStorage,
            this.model.toJSON() as string
          );
        },
      },
    });

    const result = this.model.predict(inputTensorA) as tf.Tensor;

    const prediction = [...(await result.data())].sort((A, B) => B - A);
    const min = prediction.at(0) ?? 0;
    const max = prediction.at(-1) ?? 0;
    const percentage =
      prediction.reduce((acum, value) => acum + value, 0) / prediction.length;
    return {
      percentage,
      prediction,
      min,
      max,
    };
  }
}
