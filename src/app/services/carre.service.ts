import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Carre } from '../models/carre';

@Injectable({
  providedIn: 'root',
})
export class CarreService {
  private apiUrl = 'http://localhost:8080/api/carres';

  constructor(private http: HttpClient) {}

  //CRUD

  getCarres(): Observable<Array<Carre>> {
    return this.http
      .get<Array<Carre>>(this.apiUrl)
      .pipe(tap((carres) => console.log('carres reçus du serveur', carres)));
  }

  getCarre(id: number): Observable<Carre> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Carre>(url);
  }

  addCarre(carre: Carre): Observable<Carre> {
    return this.http.post<Carre>(this.apiUrl, carre);
  }

  updateCarre(carre: Carre): Observable<Carre> {
    const url = `${this.apiUrl}/${carre.id}`;
    return this.http.put<Carre>(url, carre);
  }

  deleteCarre(id: number): Observable<Carre> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Carre>(url);
  }

  //Méthodes propres au Carré

  surface(cote: number): Observable<number> {
    const url = `${this.apiUrl}/surface`;
    return this.http.post<number>(url, { cote: cote });
  }

  perimetre(cote: number): Observable<number> {
    const url = `${this.apiUrl}/perimetre`;
    return this.http.post<number>(url, { cote: cote });
  }
}
