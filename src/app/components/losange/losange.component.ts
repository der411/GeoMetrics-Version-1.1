import { Component, OnInit } from '@angular/core';
import { LosangeService } from '../../services/losange.service';
import { Losange } from '../../models/losange';
import { Forme2DComponent } from '../forme2d/forme2d.component';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-losange',
  templateUrl: './losange.component.html',
  styleUrls: ['./losange.component.css'],
})
export class LosangeComponent extends Forme2DComponent implements OnInit {
  losanges: Losange[] = [];
  losange: Losange | null = null;
  cote: number = 0;
  petiteDiag: number = 0;
  grandeDiag: number = 0;
  selectedLosangeId: number = 0;
  showLosanges: boolean = false;

  constructor(
    private losangeService: LosangeService,
    private route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getLosangeById(+id); // Convertir l'ID en nombre avec "+"
    } else {
      this.getLosanges();
    }
  }

  getLosanges(): void {
    this.losangeService.getLosanges().subscribe((losanges) => {
      this.losanges = losanges;
    });
  }

  getLosangeById(id: number): void {
    this.losangeService.getLosange(id).subscribe((losange) => {
      this.losange = losange;
    });
  }

  // Méthode pour gérer l'affichage de la liste des losanges  Montrer/Cacher
  toggleLosanges(): void {
    this.showLosanges = !this.showLosanges;
    if (this.showLosanges) {
      this.getLosanges();
    }
  }

  addLosange(
    nom: string,
    couleur: string,
    cote: number,
    petiteDiag: number,
    grandeDiag: number
  ): void {
    this.losangeService
      .addLosange({ nom, couleur, cote, petiteDiag, grandeDiag } as Losange)
      .subscribe((cube) => {
        this.losanges.push(cube);
      });
  }

  updateLosange(): void {
    const selectedId = Number(this.selectedLosangeId);
    const losangeToUpdate = this.losanges.find(
      (losange) => losange.id === selectedId
    );

    if (losangeToUpdate) {
      losangeToUpdate.nom = this.nom;
      losangeToUpdate.couleur = this.couleur;
      losangeToUpdate.cote = this.cote;
      losangeToUpdate.petiteDiag = this.petiteDiag;
      losangeToUpdate.grandeDiag = this.grandeDiag;

      this.losangeService
        .updateLosange(losangeToUpdate)
        .subscribe((updatedLosange) => {
          const index = this.losanges.findIndex(
            (l) => l.id === updatedLosange.id
          );
          if (index !== -1) {
            this.losanges[index] = updatedLosange;
          }
        });
    } else {
      console.error('Losange non trouvé');
    }
  }

  deleteLosange(losange: Losange): void {
    this.losanges = this.losanges.filter((l) => l !== losange);
    this.losangeService.deleteLosange(losange.id).subscribe();
  }

  calculer(): void {
    forkJoin([
      this.losangeService.perimetre(this.cote),
      this.losangeService.surface(this.cote, this.petiteDiag, this.grandeDiag),
    ]).subscribe(([perimetre, surface]) => {
      this.perimetre = perimetre;
      this.surface = surface;
    });
  }

  // Méthode pour préremplir les champs de l'id selectionné, pour la modification
  onIdChange(): void {
    const selectedId = Number(this.selectedLosangeId);
    const selectedLosange = this.losanges.find(
      (losange) => losange.id === selectedId
    );

    if (selectedLosange) {
      this.nom = selectedLosange.nom;
      this.couleur = selectedLosange.couleur;
      this.cote = selectedLosange.cote;
      this.petiteDiag = selectedLosange.petiteDiag;
      this.grandeDiag = selectedLosange.grandeDiag;
    } else {
      console.error('Losange non trouvé');
    }
  }
}
