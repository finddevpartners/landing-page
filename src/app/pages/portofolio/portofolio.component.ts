import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-portofolio',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './portofolio.component.html',
  styleUrl: './portofolio.component.css',
})
export class PortofolioComponent {}
