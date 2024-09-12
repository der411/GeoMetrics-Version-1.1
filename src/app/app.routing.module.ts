import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CarreComponent } from './components/carre/carre.component';
import { CercleComponent } from './components/cercle/cercle.component';
import { ConeComponent } from './components/cone/cone.component';
import { CubeComponent } from './components/cube/cube.component';
import { CylindreComponent } from './components/cylindre/cylindre.component';
import { Forme2DComponent } from './components/forme2d/forme2d.component';
import { Forme3DComponent } from './components/forme3d/forme3d.component';
import { LosangeComponent } from './components/losange/losange.component';
import { RectangleComponent } from './components/rectangle/rectangle.component';
import { SphereComponent } from './components/sphere/sphere.component';
import { TriangleComponent } from './components/triangle/triangle.component';

const appRoute: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'forme2d', component: Forme2DComponent },
  { path: 'forme3d', component: Forme3DComponent },
  { path: 'carre', component: CarreComponent },
  { path: 'rectangle', component: RectangleComponent },
  { path: 'triangle', component: TriangleComponent },
  { path: 'losange', component: LosangeComponent },
  { path: 'cercle', component: CercleComponent },
  { path: 'sphere', component: SphereComponent },
  { path: 'cube', component: CubeComponent },
  { path: 'cone', component: ConeComponent },
  { path: 'cylindre', component: CylindreComponent },
];

@NgModule({
  declarations: [],

  imports: [RouterModule.forRoot(appRoute)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
