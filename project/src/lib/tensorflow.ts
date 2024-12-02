import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

let modelInstance: mobilenet.MobileNet | null = null;

export async function initializeModel(): Promise<mobilenet.MobileNet> {
  try {
    await tf.ready();
    if (!modelInstance) {
      modelInstance = await mobilenet.load({
        version: 2,
        alpha: 1.0
      });
    }
    return modelInstance;
  } catch (error) {
    throw new Error('Failed to initialize TensorFlow model: ' + (error as Error).message);
  }
}