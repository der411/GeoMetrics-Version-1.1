import { Forme2D } from './forme2d';
export class Rectangle extends Forme2D {
  //Attribut
  longueur: number;
  largeur: number;

  //Constructeur
  constructor(nom: string, couleur: string, longueur: number, largeur: number) {
    super(nom, couleur);
    this.longueur = longueur;
    this.largeur = largeur;
  }
}
