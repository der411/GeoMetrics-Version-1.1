import { Component, OnInit } from '@angular/core';
import { CercleService } from '../../services/cercle.service';
import { Cercle } from '../../models/cercle';
import { Forme2DComponent } from '../forme2d/forme2d.component';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cercle',
  templateUrl: './cercle.component.html',
  styleUrls: ['./cercle.component.css'],
})
export class CercleComponent extends Forme2DComponent implements OnInit {
  cercles: Cercle[] = [];
  cercle: Cercle | null = null;
  rayon: number = 0;
  override surface: number = 0;
  circonference: number = 0;
  selectedCercleId: number = 0;
  readonly PI = Math.PI;
  showCercles: boolean = false;

  constructor(
    private cercleService: CercleService,
    private route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCercleById(+id); // Convertir l'ID en nombre avec "+"
    } else {
      this.getCercles();
    }
  }

  getCercles(): void {
    this.cercleService.getCercles().subscribe((cercles) => {
      this.cercles = cercles;
    });
  }

  getCercleById(id: number): void {
    this.cercleService.getCercle(id).subscribe((cercle) => {
      this.cercle = cercle;
    });
  }

  // Méthode pour gérer l'affichage de la liste des cercles  Montrer/Cacher
  toggleCercles(): void {
    this.showCercles = !this.showCercles;
    if (this.showCercles) {
      this.getCercles();
    }
  }

  addCercle(nom: string, couleur: string, rayon: number): void {
    const cercle: Cercle = new Cercle(nom, couleur, rayon);
    this.cercleService.addCercle(cercle).subscribe((cercle) => {
      this.cercles.push(cercle);
    });
  }

  updateCercle(): void {
    const selectedId = Number(this.selectedCercleId);
    const cercleToUpdate = this.cercles.find(
      (cercle) => cercle.id === selectedId
    );

    if (cercleToUpdate) {
      cercleToUpdate.nom = this.nom;
      cercleToUpdate.couleur = this.couleur;
      cercleToUpdate.rayon = this.rayon;

      this.cercleService
        .updateCercle(cercleToUpdate)
        .subscribe((updatedCercle) => {
          const index = this.cercles.findIndex(
            (c) => c.id === updatedCercle.id
          );
          if (index !== -1) {
            this.cercles[index] = updatedCercle;
          }
        });
    } else {
      console.error('Cercle non trouvé');
    }
  }

  deleteCercle(cercle: Cercle): void {
    this.cercles = this.cercles.filter((c) => c !== cercle);
    this.cercleService.deleteCercle(cercle.id).subscribe();
  }

  calculer(): void {
    forkJoin([
      this.cercleService.circonference(this.rayon),
      this.cercleService.surface(this.rayon),
    ]).subscribe(([circonference, surface]) => {
      this.circonference = circonference;
      this.surface = surface;
    });
  }

  // Méthode pour préremplir les champs de l'id selectionné, pour la modification
  onIdChange(): void {
    const selectedId = Number(this.selectedCercleId);
    const selectedCercle = this.cercles.find(
      (cercle) => cercle.id === selectedId
    );

    if (selectedCercle) {
      this.nom = selectedCercle.nom;
      this.couleur = selectedCercle.couleur;
      this.rayon = selectedCercle.rayon;
    } else {
      console.error('Cercle non trouvé');
    }
  }
}
