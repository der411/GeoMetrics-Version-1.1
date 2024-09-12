import { Component, OnInit } from '@angular/core';
import { TriangleService } from '../../services/triangle.service';
import { Triangle } from '../../models/triangle';
import { Forme2DComponent } from '../forme2d/forme2d.component';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.css'],
})
export class TriangleComponent extends Forme2DComponent implements OnInit {
  triangles: Triangle[] = [];
  triangle: Triangle | null = null;
  coteAdjacent: number = 0;
  coteOppose: number = 0;
  selectedTriangleId: number = 0;
  showTriangles: boolean = false;
  readonly RC = Math.sqrt;

  constructor(
    private triangleService: TriangleService,
    private route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getTriangleById(+id); // Convertir l'ID en nombre avec "+"
    } else {
      this.getTriangles();
    }
  }

  getTriangles(): void {
    this.triangleService.getTriangles().subscribe((triangles) => {
      this.triangles = triangles;
    });
  }

  getTriangleById(id: number): void {
    this.triangleService.getTriangle(id).subscribe((triangle) => {
      this.triangle = triangle;
    });
  }

  // Méthode pour gérer l'affichage de la liste des triangles  Montrer/Cacher
  toggleTriangles(): void {
    this.showTriangles = !this.showTriangles;
    if (this.showTriangles) {
      this.getTriangles();
    }
  }

  addTriangle(
    nom: string,
    couleur: string,
    coteAdjacent: number,
    coteOppose: number
  ): void {
    const triangle: Triangle = new Triangle(
      nom,
      couleur,
      coteAdjacent,
      coteOppose
    );
    this.triangleService.addTriangle(triangle).subscribe((triangle) => {
      this.triangles.push(triangle);
    });
  }

  updateTriangle(): void {
    const selectedId = Number(this.selectedTriangleId);
    const triangleToUpdate = this.triangles.find(
      (triangle) => triangle.id === selectedId
    );

    if (triangleToUpdate) {
      triangleToUpdate.nom = this.nom;
      triangleToUpdate.couleur = this.couleur;
      triangleToUpdate.coteAdjacent = this.coteAdjacent;
      triangleToUpdate.coteOppose = this.coteOppose;

      this.triangleService
        .updateTriangle(triangleToUpdate)
        .subscribe((updatedTriangle) => {
          const index = this.triangles.findIndex(
            (t) => t.id === updatedTriangle.id
          );
          if (index !== -1) {
            this.triangles[index] = updatedTriangle;
          }
        });
    } else {
      console.error('Triangle non trouvé');
    }
  }

  deleteTriangle(triangle: Triangle): void {
    this.triangles = this.triangles.filter((t) => t !== triangle);
    this.triangleService.deleteTriangle(triangle.id).subscribe();
  }

  calculer(): void {
    forkJoin([
      this.triangleService.perimetre(this.coteAdjacent, this.coteOppose),
      this.triangleService.surface(this.coteAdjacent, this.coteOppose),
    ]).subscribe(([perimetre, surface]) => {
      this.perimetre = perimetre;
      this.surface = surface;
    });
  }

  // Méthode pour préremplir les champs de l'id selectionné, pour la modification
  onIdChange(): void {
    const selectedId = Number(this.selectedTriangleId);
    const selectedTriangle = this.triangles.find(
      (triangle) => triangle.id === selectedId
    );

    if (selectedTriangle) {
      this.nom = selectedTriangle.nom;
      this.couleur = selectedTriangle.couleur;
      this.coteAdjacent = selectedTriangle.coteAdjacent;
      this.coteOppose = selectedTriangle.coteOppose;
    } else {
      console.error('Triangle non trouvé');
    }
  }
}
