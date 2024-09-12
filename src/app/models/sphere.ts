import { Forme3D } from './forme3d';
export class Sphere extends Forme3D {
  //Attribut
  rayon: number;

  //Constructeur
  constructor(nom: string, couleur: string, rayon: number) {
    super(nom, couleur);
    this.rayon = rayon;
  }
}
