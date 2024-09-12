import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Cylindre } from '../models/cylindre';

@Injectable({
  providedIn: 'root',
})
export class CylindreService {
  private apiUrl = 'http://localhost:8080/api/cylindres';

  constructor(private http: HttpClient) {}

  getCylindres(): Observable<Array<Cylindre>> {
    return this.http
      .get<Array<Cylindre>>(this.apiUrl)
      .pipe(
        tap((cylindres) => console.log('cylindres reçus du serveur', cylindres))
      );
  }

  getCylindre(id: number): Observable<Cylindre> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cylindre>(url);
  }

  addCylindre(cylindre: Cylindre): Observable<Cylindre> {
    return this.http.post<Cylindre>(this.apiUrl, cylindre);
  }

  updateCylindre(cylindre: Cylindre): Observable<Cylindre> {
    const url = `${this.apiUrl}/${cylindre.id}`;
    return this.http.put<Cylindre>(url, cylindre);
  }

  deleteCylindre(id: number): Observable<Cylindre> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Cylindre>(url);
  }

  calculerVolume(rayon: number, hauteur: number): number {
    return Math.PI * Math.pow(rayon, 2) * hauteur;
  }

  calculerSurface(rayon: number, hauteur: number): number {
    const base = Math.PI * Math.pow(rayon, 2);
    const laterale = 2 * Math.PI * rayon * hauteur;
    return 2 * base + laterale;
  }

    //Méthodes propres au Cylindre

    surface(rayon: number, hauteur: number): Observable<number> {
      const url = `${this.apiUrl}/surface`;
      return this.http.post<number>(url, { rayon: rayon, hauteur: hauteur});
    }
  
    volume(rayon: number, hauteur: number): Observable<number> {
      const url = `${this.apiUrl}/volume`;
      return this.http.post<number>(url, { rayon: rayon, hauteur: hauteur });
    }
}
