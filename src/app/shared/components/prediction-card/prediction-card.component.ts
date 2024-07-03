import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PredictionInterface } from '../../../features/interfaces/predictions.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-prediction-card',
  standalone: true,
  imports: [MatCardModule, DatePipe],
  templateUrl: './prediction-card.component.html',
  styleUrl: './prediction-card.component.scss',
})
export class PredictionCardComponent {
  @Input() predict: PredictionInterface = {
    image_id: 0,
    input_image_path: '',
    created_at: '',
    predicted_image_path: '',
    tag_name: '',
  };
}
