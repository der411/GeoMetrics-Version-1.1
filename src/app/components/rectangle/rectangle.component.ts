import { Component, OnInit } from '@angular/core';
import { RectangleService } from '../../services/rectangle.service';
import { Rectangle } from '../../models/rectangle';
import { Forme2DComponent } from '../forme2d/forme2d.component';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css'],
})
export class RectangleComponent extends Forme2DComponent implements OnInit {
  rectangles: Rectangle[] = [];
  rectangle: Rectangle | null = null;
  longueur: number = 0;
  largeur: number = 0;
  selectedRectangleId: number = 0;
  showRectangles: boolean = false;

  constructor(
    private rectangleService: RectangleService,
    private route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRectangleById(+id); // Convertir l'ID en nombre avec "+"
    } else {
      this.getRectangles();
    }
  }

  getRectangles(): void {
    this.rectangleService.getRectangles().subscribe((rectangles) => {
      this.rectangles = rectangles;
    });
  }

  getRectangleById(id: number): void {
    this.rectangleService.getRectangle(id).subscribe((rectangle) => {
      this.rectangle = rectangle;
    });
  }

  // Méthode pour gérer l'affichage de la liste des rectangles Montrer/Cacher
  toggleRectangles(): void {
    this.showRectangles = !this.showRectangles;
    if (this.showRectangles) {
      this.getRectangles();
    }
  }

  addRectangle(
    nom: string,
    couleur: string,
    longueur: number,
    largeur: number
  ): void {
    const rectangle: Rectangle = new Rectangle(nom, couleur, longueur, largeur);
    this.rectangleService.addRectangle(rectangle).subscribe((rectangle) => {
      this.rectangles.push(rectangle);
    });
  }

  updateRectangle(): void {
    const selectedId = Number(this.selectedRectangleId);
    const rectangleToUpdate = this.rectangles.find(
      (rectangle) => rectangle.id === selectedId
    );

    if (rectangleToUpdate) {
      rectangleToUpdate.nom = this.nom;
      rectangleToUpdate.couleur = this.couleur;
      rectangleToUpdate.longueur = this.longueur;
      rectangleToUpdate.largeur = this.largeur;

      this.rectangleService
        .updateRectangle(rectangleToUpdate)
        .subscribe((updatedRectangle) => {
          const index = this.rectangles.findIndex(
            (r) => r.id === updatedRectangle.id
          );
          if (index !== -1) {
            this.rectangles[index] = updatedRectangle;
          }
        });
    } else {
      console.error('Rectangle non trouvé');
    }
  }

  deleteRectangle(rectangle: Rectangle): void {
    this.rectangles = this.rectangles.filter((r) => r !== rectangle);
    this.rectangleService.deleteRectangle(rectangle.id).subscribe();
  }

  calculer(): void {
    forkJoin([
      this.rectangleService.perimetre(this.longueur, this.largeur),
      this.rectangleService.surface(this.longueur, this.largeur),
    ]).subscribe(([perimetre, surface]) => {
      this.perimetre = perimetre;
      this.surface = surface;
    });
  }

  // Méthode pour préremplir les champs de l'id selectionné, pour la modification
  onIdChange(): void {
    const selectedId = Number(this.selectedRectangleId);
    const selectedRectangle = this.rectangles.find(
      (rectangle) => rectangle.id === selectedId
    );

    if (selectedRectangle) {
      this.nom = selectedRectangle.nom;
      this.couleur = selectedRectangle.couleur;
      this.longueur = selectedRectangle.longueur;
      this.largeur = selectedRectangle.largeur;
    } else {
      console.error('Rectangle non trouvé');
    }
  }
}
