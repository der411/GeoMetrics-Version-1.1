import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Cercle } from '../models/cercle';

@Injectable({
  providedIn: 'root',
})
export class CercleService {
  private apiUrl = 'http://localhost:8080/api/cercles';

  constructor(private http: HttpClient) {}

  getCercles(): Observable<Array<Cercle>> {
    return this.http
      .get<Array<Cercle>>(this.apiUrl)
      .pipe(tap((cercles) => console.log('cercles reçus du serveur', cercles)));
  }

  getCercle(id: number): Observable<Cercle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cercle>(url);
  }

  addCercle(cercle: Cercle): Observable<Cercle> {
    return this.http.post<Cercle>(this.apiUrl, cercle);
  }

  updateCercle(cercle: Cercle): Observable<Cercle> {
    const url = `${this.apiUrl}/${cercle.id}`;
    return this.http.put<Cercle>(url, cercle);
  }

  deleteCercle(id: number): Observable<Cercle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Cercle>(url);
  }

    //Méthodes propres au Cercle

    surface(rayon: number): Observable<number> {
      const url = `${this.apiUrl}/surface`;
      return this.http.post<number>(url, { rayon: rayon });
    }
  
    circonference(rayon: number): Observable<number> {
      const url = `${this.apiUrl}/circonference`;
      return this.http.post<number>(url, { rayon: rayon });
    }
}
