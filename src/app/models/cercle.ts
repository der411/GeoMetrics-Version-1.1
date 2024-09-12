import { Forme2D } from './forme2d';
export class Cercle extends Forme2D {
  //Attribut
  rayon: number;

  //Constructeur
  constructor(nom: string, couleur: string, rayon: number) {
    super(nom, couleur);
    this.rayon = rayon;
  }

}
