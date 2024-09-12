import { Forme3D } from './forme3d';
export class Cube extends Forme3D {
  //Attribut
  cote: number;

  //Constructeur
  constructor(nom: string, couleur: string, cote: number) {
    super(nom, couleur);
    this.cote = cote;
  }

}
