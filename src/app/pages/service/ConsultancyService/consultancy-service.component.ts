import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { SoftwareServiceSettingsIconsComponent } from '../../shared/software-service-canvas/software-service.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-consultancy-service',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    SoftwareServiceSettingsIconsComponent,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './consultancy-service.component.html',
  styleUrls: ['./consultancy-service.component.css'],
})
export class ConsultancyServiceComponent {}
