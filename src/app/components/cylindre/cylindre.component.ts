import { Component, OnInit } from '@angular/core';
import { CylindreService } from '../../services/cylindre.service';
import { Cylindre } from '../../models/cylindre';
import { Forme3DComponent } from '../forme3d/forme3d.component';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cylindre',
  templateUrl: './cylindre.component.html',
  styleUrls: ['./cylindre.component.css'],
})
export class CylindreComponent extends Forme3DComponent implements OnInit {
  cylindres: Cylindre[] = [];
  cylindre: Cylindre | null = null;
  rayon: number = 0;
  hauteur: number = 0;
  showCylindres: boolean = false;
  selectedCylindreId: number = 0;
  readonly PI = Math.PI;

  constructor(
    private cylindreService: CylindreService,
    private route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCylindreById(+id); // Convertir l'ID en nombre avec "+"
    } else {
      this.getCylindres();
    }
  }

  getCylindres(): void {
    this.cylindreService.getCylindres().subscribe((cylindres) => {
      this.cylindres = cylindres;
      console.log('cylindres dans le composant', this.cylindres);
    });
  }

  getCylindreById(id: number): void {
    this.cylindreService.getCylindre(id).subscribe((cylindre) => {
      this.cylindre = cylindre;
    });
  }

  // Méthode pour gérer l'affichage de la liste des cylindres  Montrer/Cacher
  toggleCylindres(): void {
    this.showCylindres = !this.showCylindres;
    if (this.showCylindres) {
      this.getCylindres();
    }
  }

  addCylindre(
    nom: string,
    couleur: string,
    rayon: number,
    hauteur: number
  ): void {
    this.cylindreService
      .addCylindre({ nom, couleur, rayon, hauteur } as Cylindre)
      .subscribe((cylindre) => {
        this.cylindres.push(cylindre);
      });
  }

  updateCylindre(): void {
    const selectedId = Number(this.selectedCylindreId);
    const cylindreToUpdate = this.cylindres.find(
      (cylindre) => cylindre.id === selectedId
    );

    if (cylindreToUpdate) {
      cylindreToUpdate.nom = this.nom;
      cylindreToUpdate.couleur = this.couleur;
      cylindreToUpdate.rayon = this.rayon;
      cylindreToUpdate.hauteur = this.hauteur;

      this.cylindreService
        .updateCylindre(cylindreToUpdate)
        .subscribe((updatedCylindre) => {
          const index = this.cylindres.findIndex(
            (c) => c.id === updatedCylindre.id
          );
          if (index !== -1) {
            this.cylindres[index] = updatedCylindre;
          }
        });
    } else {
      console.error('Cylindre non trouvé');
    }
  }

  deleteCylindre(cylindre: Cylindre): void {
    this.cylindres = this.cylindres.filter((c) => c !== cylindre);
    this.cylindreService.deleteCylindre(cylindre.id).subscribe();
  }

  calculer(): void {
    forkJoin([
      this.cylindreService.surface(this.rayon, this.hauteur),
      this.cylindreService.volume(this.rayon, this.hauteur),
    ]).subscribe(([surface, volume]) => {
      this.surface = surface;
      this.volume = volume;
    });
  }

  // Méthode pour préremplir les champs de l'id selectionné, pour la modification
  onIdChange(): void {
    const selectedId = Number(this.selectedCylindreId);
    const selectedCylindre = this.cylindres.find(
      (cylindre) => cylindre.id === selectedId
    );

    if (selectedCylindre) {
      this.nom = selectedCylindre.nom;
      this.couleur = selectedCylindre.couleur;
      this.rayon = selectedCylindre.rayon;
      this.hauteur = selectedCylindre.hauteur;
    } else {
      console.error('Cylindre non trouvé');
    }
  }
}
