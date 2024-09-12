import { Component, OnInit } from '@angular/core';
import { CarreService } from 'src/app/services/carre.service';
import { Carre } from 'src/app/models/carre';
import { Forme2DComponent } from '../forme2d/forme2d.component';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carre',
  templateUrl: './carre.component.html',
  styleUrls: ['./carre.component.css'],
})
export class CarreComponent extends Forme2DComponent implements OnInit {
  cote: number = 0;
  carres: Carre[] = [];
  carre: Carre | null = null;
  selectedCarreId: number = 0;
  showCarres: boolean = false;

  constructor(
    private carreService: CarreService,
    private route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCarreById(+id); // Convertir l'ID en nombre avec "+"
    } else {
      this.getCarres();
    }
  }

  getCarres(): void {
    this.carreService.getCarres().subscribe((carres) => {
      this.carres = carres;
    });
  }

  getCarreById(id: number): void {
    this.carreService.getCarre(id).subscribe((carre) => {
      this.carre = carre;
    });
  }

  // Méthodes pour gérer l'affichage de la liste des carrés Montrer/Cacher
  toggleCarres(): void {
    this.showCarres = !this.showCarres;
    if (this.showCarres) {
      this.getCarres();
    }
  }

  addCarre(nom: string, couleur: string, cote: number): void {
    this.carreService
      .addCarre({ nom, couleur, cote } as Carre)
      .subscribe((carre) => {
        this.carres.push(carre);
      });
  }

  updateCarre(): void {
    const selectedId = Number(this.selectedCarreId);
    const carreToUpdate = this.carres.find((carre) => carre.id === selectedId);

    if (carreToUpdate) {
      carreToUpdate.nom = this.nom;
      carreToUpdate.couleur = this.couleur;
      carreToUpdate.cote = this.cote;

      this.carreService.updateCarre(carreToUpdate).subscribe((updatedCarre) => {
        const index = this.carres.findIndex((c) => c.id === updatedCarre.id);
        if (index !== -1) {
          this.carres[index] = updatedCarre;
        }
      });
    } else {
      console.error('Carré non trouvé');
    }
  }

  deleteCarre(carre: Carre): void {
    this.carres = this.carres.filter((c) => c !== carre);
    this.carreService.deleteCarre(carre.id).subscribe();
  }

  calculer(): void {
    forkJoin([
      this.carreService.perimetre(this.cote),
      this.carreService.surface(this.cote),
    ]).subscribe(([perimetre, surface]) => {
      this.perimetre = perimetre;
      this.surface = surface;
    });
  }

  // Méthode pour préremplir les champs de l'id selectionné, pour la modification
  onIdChange(): void {
    const selectedId = Number(this.selectedCarreId);
    const selectedCarre = this.carres.find((carre) => carre.id === selectedId);

    if (selectedCarre) {
      this.nom = selectedCarre.nom;
      this.couleur = selectedCarre.couleur;
      this.cote = selectedCarre.cote;
    } else {
      console.error('Carre non trouvé');
    }
  }
}
