import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PortofolioComponent } from './pages/portofolio/portofolio.component';
import { SoftwareServiceComponent } from './pages/service/SoftwareService/software-service.component';
import { ConsultancyServiceComponent } from './pages/service/ConsultancyService/consultancy-service.component';
import { AIServiceComponent } from './pages/service/AIService/ai-service.component';
import { CloudServiceComponent } from './pages/service/CloudService/cloud-service.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'portofolio', component: PortofolioComponent },
  { path: 'consultancy-service', component: ConsultancyServiceComponent },
  { path: 'software-service', component: SoftwareServiceComponent },
  { path: 'ai-service', component: AIServiceComponent },
  { path: 'cloud-service', component: CloudServiceComponent },
  { path: '**', redirectTo: 'home' },
];
