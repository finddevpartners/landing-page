import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CloudCanvasIconComponent } from '../../shared/cloud-canvas/cloud-canvas.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cloud-service',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FooterComponent,
    CloudCanvasIconComponent,
    TranslateModule
  ],
  templateUrl: './cloud-service.component.html',
  styleUrls: ['./cloud-service.component.css'],
})
export class CloudServiceComponent {}
