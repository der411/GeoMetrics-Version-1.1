import { Forme2D } from './forme2d';
export class Carre extends Forme2D {

   //Attribut
   cote : number;

   //Constructeur
   constructor(nom: string, couleur: string, cote: number){
     super(nom, couleur);
     this.cote = cote;
   }
}