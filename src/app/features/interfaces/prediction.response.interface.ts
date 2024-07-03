import { PredictionInterface } from './predictions.interface';

export interface PredictionResponseInterface {
  message: string;
  predictions: PredictionInterface[];
}
