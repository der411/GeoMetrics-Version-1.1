export abstract class Forme {

    //Attributs
    id!: number;
    nom: string;
    couleur: string;
    
    //Constructeur
    constructor(nom: string, couleur: string) {
      this.nom = nom;
      this.couleur = couleur;
    }
    
  }
  