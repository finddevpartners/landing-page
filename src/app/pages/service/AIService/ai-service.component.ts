import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AICanvasComponent } from '../../shared/ai-canvas/ai-canvas.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ai-service',
  standalone: true,
  imports: [
    CommonModule,
    AICanvasComponent,
    MatCardModule,
    MatIconModule,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './ai-service.component.html',
  styleUrls: ['./ai-service.component.css'],
})
export class AIServiceComponent {}
