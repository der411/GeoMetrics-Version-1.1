import { Component, OnInit } from '@angular/core';
import { ConeService } from '../../services/cone.service';
import { Cone } from '../../models/cone';
import { Forme3DComponent } from '../forme3d/forme3d.component';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cone',
  templateUrl: './cone.component.html',
  styleUrls: ['./cone.component.css'],
})
export class ConeComponent extends Forme3DComponent implements OnInit {
  cones: Cone[] = [];
  cone: Cone | null = null;
  rayon: number = 0;
  hauteur: number = 0;
  readonly RC = Math.sqrt;
  readonly PI = Math.PI;
  selectedConeId: number = 0;
  showCones: boolean = false;

  constructor(private coneService: ConeService, private route: ActivatedRoute) {
    super();
  }

  override ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getConeById(+id); // Convertir l'ID en nombre avec "+"
    } else {
      this.getCones();
    }
  }

  getCones(): void {
    this.coneService.getCones().subscribe((cones) => {
      this.cones = cones;
    });
  }

  getConeById(id: number): void {
    this.coneService.getCone(id).subscribe((cone) => {
      this.cone = cone;
    });
  }

  // Méthode pour gérer l'affichage de la liste des cones  Montrer/Cacher
  toggleCones(): void {
    this.showCones = !this.showCones;
    if (this.showCones) {
      this.getCones();
    }
  }

  addCone(nom: string, couleur: string, rayon: number, hauteur: number): void {
    const cone: Cone = new Cone(nom, couleur, rayon, hauteur);
    this.coneService.addCone(cone).subscribe((cone) => {
      this.cones.push(cone);
    });
  }

  updateCone(): void {
    const selectedId = Number(this.selectedConeId);
    const coneToUpdate = this.cones.find((cone) => cone.id === selectedId);

    if (coneToUpdate) {
      coneToUpdate.nom = this.nom;
      coneToUpdate.couleur = this.couleur;
      coneToUpdate.rayon = this.rayon;
      coneToUpdate.hauteur = this.hauteur;

      this.coneService.updateCone(coneToUpdate).subscribe((updatedCone) => {
        const index = this.cones.findIndex((c) => c.id === updatedCone.id);
        if (index !== -1) {
          this.cones[index] = updatedCone;
        }
      });
    } else {
      console.error('Cône non trouvé');
    }
  }

  deleteCone(cone: Cone): void {
    this.cones = this.cones.filter((c) => c !== cone);
    this.coneService.deleteCone(cone.id).subscribe();
  }

  calculer(): void {
    forkJoin([
      this.coneService.surface(this.rayon, this.hauteur),
      this.coneService.volume(this.rayon, this.hauteur),
    ]).subscribe(([surface, volume]) => {
      this.surface = surface;
      this.volume = volume;
    });
  }

  // Méthode pour préremplir les champs de l'id selectionné, pour la modification
  onIdChange(): void {
    const selectedId = Number(this.selectedConeId);
    const selectedCone = this.cones.find((cone) => cone.id === selectedId);

    if (selectedCone) {
      this.nom = selectedCone.nom;
      this.couleur = selectedCone.couleur;
      this.rayon = selectedCone.rayon;
      this.hauteur = selectedCone.hauteur;
    } else {
      console.error('Cone non trouvé');
    }
  }
}
