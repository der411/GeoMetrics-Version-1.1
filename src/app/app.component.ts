import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GéoMétrics';
  pageTitle: string = "Et la Géométrie devient un jeu d'enfant !"; // Titre par défaut

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setPageTitle();
      });
  }

  /*Méthode pour ne pas afficher le lien accueil sur la page d'accueil*/
  public get isOnHomePage(): boolean {
    return this.router.url === '/';
  }

  //Méthodes pour gérer l'affichage logo 2D et 3D
  public get isOn2DPage(): boolean {
    return (
      this.router.url.includes('/carre') ||
      this.router.url.includes('/triangle') ||
      this.router.url.includes('/rectangle') ||
      this.router.url.includes('/losange') ||
      this.router.url.includes('/cercle')
    );
  }

  public get isOn3DPage(): boolean {
    return (
      this.router.url.includes('/cone') ||
      this.router.url.includes('/sphere') ||
      this.router.url.includes('/cylindre') ||
      this.router.url.includes('/cube')
    );
  }

  public get imageSource(): string {
    if (this.isOn2DPage) {
      return 'assets/images/2d.png';
    } else if (this.isOn3DPage) {
      return 'assets/images/3d.png';
    }
    return '';
  }

  // Définir le titre de la page en fonction de la route
  private setPageTitle(): void {
    switch (true) {
      case this.router.url === '/forme2d' || this.router.url === '/forme3d':
        this.pageTitle = 'Faites votre choix'; // Titre pour les pages forme2D et forme3D
        break;
      case this.router.url.includes('/carre'):
        this.pageTitle = 'Le Carré';
        break;
      case this.router.url.includes('/triangle'):
        this.pageTitle = 'Le Triangle';
        break;
      case this.router.url.includes('/rectangle'):
        this.pageTitle = 'Le Rectangle';
        break;
      case this.router.url.includes('/losange'):
        this.pageTitle = 'Le Losange';
        break;
      case this.router.url.includes('/cercle'):
        this.pageTitle = 'Le Cercle';
        break;
      case this.router.url.includes('/cone'):
        this.pageTitle = 'Le Cône';
        break;
      case this.router.url.includes('/sphere'):
        this.pageTitle = 'La Sphère';
        break;
      case this.router.url.includes('/cylindre'):
        this.pageTitle = 'Le Cylindre';
        break;
      case this.router.url.includes('/cube'):
        this.pageTitle = 'Le Cube';
        break;
      default:
        this.pageTitle = "Et la Géométrie devient un jeu d'enfant !"; // Titre par défaut si aucune page spécifique n'est trouvée
        break;
    }
  }
}
