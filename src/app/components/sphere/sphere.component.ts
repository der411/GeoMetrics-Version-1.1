import { Component, OnInit } from '@angular/core';
import { SphereService } from '../../services/sphere.service';
import { Sphere } from '../../models/sphere';
import { Forme3DComponent } from '../forme3d/forme3d.component';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sphere',
  templateUrl: './sphere.component.html',
  styleUrls: ['./sphere.component.css'],
})
export class SphereComponent extends Forme3DComponent implements OnInit {
  spheres: Sphere[] = [];
  sphere: Sphere | null = null;
  rayon: number = 0;
  readonly PI = Math.PI;
  showSpheres: boolean = false;
  selectedSphereId: number = 0;

  constructor(
    private sphereService: SphereService,
    private route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getSphereById(+id); // Convertir l'ID en nombre avec "+"
    } else {
      this.getSpheres();
    }
  }

  getSpheres(): void {
    this.sphereService.getSpheres().subscribe((spheres) => {
      this.spheres = spheres;
    });
  }

  getSphereById(id: number): void {
    this.sphereService.getSphere(id).subscribe((sphere) => {
      this.sphere = sphere;
    });
  }

  // Méthode pour gérer l'affichage de la liste des sphères  Montrer/Cacher
  toggleSpheres(): void {
    this.showSpheres = !this.showSpheres;
    if (this.showSpheres) {
      this.getSpheres();
    }
  }

  addSphere(nom: string, couleur: string, rayon: number): void {
    this.sphereService
      .addSphere({ nom, couleur, rayon } as Sphere)
      .subscribe((sphere) => {
        this.spheres.push(sphere);
      });
  }

  updateSphere(): void {
    const selectedId = Number(this.selectedSphereId);
    const sphereToUpdate = this.spheres.find(
      (sphere) => sphere.id === selectedId
    );

    if (sphereToUpdate) {
      sphereToUpdate.nom = this.nom;
      sphereToUpdate.couleur = this.couleur;
      sphereToUpdate.rayon = this.rayon;

      this.sphereService
        .updateSphere(sphereToUpdate)
        .subscribe((updatedSphere) => {
          const index = this.spheres.findIndex(
            (s) => s.id === updatedSphere.id
          );
          if (index !== -1) {
            this.spheres[index] = updatedSphere;
          }
        });
    } else {
      console.error('Sphère non trouvé');
    }
  }

  deleteSphere(sphere: Sphere): void {
    this.spheres = this.spheres.filter((s) => s !== sphere);
    this.sphereService.deleteSphere(sphere.id).subscribe();
  }

  calculer(): void {
    forkJoin([
      this.sphereService.surface(this.rayon),
      this.sphereService.volume(this.rayon),
    ]).subscribe(([surface, volume]) => {
      this.surface = surface;
      this.volume = volume;
    });
  }

  // Méthode pour préremplir les champs de l'id selectionné, pour la modification
  onIdChange(): void {
    const selectedId = Number(this.selectedSphereId);
    const selectedSphere = this.spheres.find(
      (sphere) => sphere.id === selectedId
    );

    if (selectedSphere) {
      this.nom = selectedSphere.nom;
      this.couleur = selectedSphere.couleur;
      this.rayon = selectedSphere.rayon;
    } else {
      console.error('Sphere non trouvé');
    }
  }
}
