import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { Forme2DComponent } from './components/forme2d/forme2d.component';
import { Forme3DComponent } from './components/forme3d/forme3d.component';
import { CarreComponent } from './components/carre/carre.component';
import { RectangleComponent } from './components/rectangle/rectangle.component';
import { TriangleComponent } from './components/triangle/triangle.component';
import { CercleComponent } from './components/cercle/cercle.component';
import { LosangeComponent } from './components/losange/losange.component';
import { SphereComponent } from './components/sphere/sphere.component';
import { CubeComponent } from './components/cube/cube.component';
import { ConeComponent } from './components/cone/cone.component';
import { CylindreComponent } from './components/cylindre/cylindre.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    Forme2DComponent,
    Forme3DComponent,
    RectangleComponent,
    CarreComponent,
    TriangleComponent,
    LosangeComponent,
    SphereComponent,
    ConeComponent,
    CercleComponent,
    CubeComponent,
    CylindreComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
