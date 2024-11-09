import { Component, HostBinding } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatrixRainComponent } from '../shared/matrix-canvas/matrix-canvas.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    MatrixRainComponent,
    RouterModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @HostBinding('attr.ngSkipHydration') shouldSkipHydration = true;

  constructor() {
  }
}
