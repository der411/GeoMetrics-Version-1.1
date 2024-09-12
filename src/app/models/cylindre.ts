import { Forme3D } from './forme3d';
export class Cylindre extends Forme3D {
  //Attribut
  rayon: number;
  hauteur: number;

  //Constructeur
  constructor(nom: string, couleur: string, rayon: number, hauteur: number) {
    super(nom, couleur);
    this.rayon = rayon;
    this.hauteur = hauteur;
  }
  
}
