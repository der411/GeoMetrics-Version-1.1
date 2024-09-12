import { Forme2D } from './forme2d';
export class Losange extends Forme2D {
  //Attribut
  cote: number;
  petiteDiag: number;
  grandeDiag: number;

  //Constructeur
  constructor(
    nom: string,
    couleur: string,
    cote: number,
    petiteDiag: number,
    grandeDiag: number
  ) {
    super(nom, couleur);
    this.cote = cote;
    this.petiteDiag = petiteDiag;
    this.grandeDiag = grandeDiag;
  }
}
