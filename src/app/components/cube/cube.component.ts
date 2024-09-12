import { Component, OnInit } from '@angular/core';
import { CubeService } from '../../services/cube.service';
import { Cube } from '../../models/cube';
import { Forme3DComponent } from '../forme3d/forme3d.component';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css'],
})
export class CubeComponent extends Forme3DComponent implements OnInit {
  cubes: Cube[] = [];
  cube: Cube | null = null;
  cote: number = 0;
  selectedCubeId: number = 0;
  showCubes: boolean = false;

  constructor(private cubeService: CubeService, private route: ActivatedRoute) {
    super();
  }

  override ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCubeById(+id); // Convertir l'ID en nombre avec "+"
    } else {
      this.getCubes();
    }
  }

  getCubes(): void {
    this.cubeService.getCubes().subscribe((cubes) => {
      this.cubes = cubes;
    });
  }

  getCubeById(id: number): void {
    this.cubeService.getCube(id).subscribe((cube) => {
      this.cube = cube;
    });
  }

  // Méthode pour gérer l'affichage de la liste des cercles  Montrer/Cacher
  toggleCubes(): void {
    this.showCubes = !this.showCubes;
    if (this.showCubes) {
      this.getCubes();
    }
  }

  addCube(nom: string, couleur: string, cote: number): void {
    this.cubeService
      .addCube({ nom, couleur, cote } as Cube)
      .subscribe((cube) => {
        this.cubes.push(cube);
      });
  }

  updateCube(): void {
    const selectedId = Number(this.selectedCubeId);
    const cubeToUpdate = this.cubes.find((cube) => cube.id === selectedId);

    if (cubeToUpdate) {
      cubeToUpdate.nom = this.nom;
      cubeToUpdate.couleur = this.couleur;
      cubeToUpdate.cote = this.cote;

      this.cubeService.updateCube(cubeToUpdate).subscribe((updatedCube) => {
        const index = this.cubes.findIndex((c) => c.id === updatedCube.id);
        if (index !== -1) {
          this.cubes[index] = updatedCube;
        }
      });
    } else {
      console.error('Cube non trouvé');
    }
  }

  deleteCube(cube: Cube): void {
    this.cubes = this.cubes.filter((c) => c !== cube);
    this.cubeService.deleteCube(cube.id).subscribe();
  }

  calculer(): void {
    forkJoin([
      this.cubeService.surface(this.cote),
      this.cubeService.volume(this.cote),
    ]).subscribe(([surface, volume]) => {
      this.surface = surface;
      this.volume = volume;
    });
  }

  // Méthode pour préremplir les champs de l'id selectionné, pour la modification
  onIdChange(): void {
    const selectedId = Number(this.selectedCubeId);
    const selectedCube = this.cubes.find((cube) => cube.id === selectedId);

    if (selectedCube) {
      this.nom = selectedCube.nom;
      this.couleur = selectedCube.couleur;
      this.cote = selectedCube.cote;
    } else {
      console.error('Cube non trouvé');
    }
  }
}
