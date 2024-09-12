import { Forme2D } from './forme2d';
export class Triangle extends Forme2D {
  //Attribut
  coteAdjacent: number;
  coteOppose: number;

  //Constructeur

  constructor(
    nom: string,
    couleur: string,
    coteAdjacent: number,
    coteOppose: number
  ) {
    super(nom, couleur);
    this.coteAdjacent = coteAdjacent;
    this.coteOppose = coteOppose;
  }
}
