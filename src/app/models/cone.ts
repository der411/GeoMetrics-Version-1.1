import { Forme3D } from './forme3d';
export class Cone extends Forme3D {
  //Attribut
  hauteur: number;
  rayon: number;

  //Constructeur
  constructor(nom: string, couleur: string, hauteur: number, rayon: number) {
    super(nom, couleur);
    this.hauteur = hauteur;
    this.rayon = rayon;
  }
}
