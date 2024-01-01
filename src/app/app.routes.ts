import { Routes } from '@angular/router';
import { LandmarksComponent } from './components/landmarks/landmarks.component';
import { ShowComponent } from './pages/show/show.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {path: '', component: LandmarksComponent},
    {path: 'show' , component: ShowComponent},
    {path: '**' , component: ErrorComponent}
];
