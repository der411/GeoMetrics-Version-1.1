import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Cone } from '../models/cone';

@Injectable({
  providedIn: 'root',
})
export class ConeService {
  private apiUrl = 'http://localhost:8080/api/cones';

  constructor(private http: HttpClient) {}

  getCones(): Observable<Array<Cone>> {
    return this.http
      .get<Array<Cone>>(this.apiUrl)
      .pipe(tap((cones) => console.log('cones reçus du serveur', cones)));
  }

  getCone(id: number): Observable<Cone> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cone>(url);
  }

  addCone(cone: Cone): Observable<Cone> {
    return this.http.post<Cone>(this.apiUrl, cone);
  }

  updateCone(cone: Cone): Observable<Cone> {
    const url = `${this.apiUrl}/${cone.id}`;
    return this.http.put<Cone>(url, cone);
  }

  deleteCone(id: number): Observable<Cone> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Cone>(url);
  }

    //Méthodes propres au Cone

    surface(rayon: number, hauteur: number): Observable<number> {
      const url = `${this.apiUrl}/surface`;
      return this.http.post<number>(url, { rayon: rayon, hauteur: hauteur});
    }
  
    volume(rayon: number, hauteur: number): Observable<number> {
      const url = `${this.apiUrl}/volume`;
      return this.http.post<number>(url, { rayon: rayon, hauteur: hauteur });
    }
}
