import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Triangle } from '../models/triangle';

@Injectable({
  providedIn: 'root',
})
export class TriangleService {
  private apiUrl = 'http://localhost:8080/api/triangles';

  constructor(private http: HttpClient) {}

  getTriangles(): Observable<Array<Triangle>> {
    return this.http
      .get<Array<Triangle>>(this.apiUrl)
      .pipe(
        tap((triangles) => console.log('triangles reçus du serveur', triangles))
      );
  }

  getTriangle(id: number): Observable<Triangle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Triangle>(url);
  }

  addTriangle(triangle: Triangle): Observable<Triangle> {
    return this.http.post<Triangle>(this.apiUrl, triangle);
  }

  updateTriangle(triangle: Triangle): Observable<Triangle> {
    const url = `${this.apiUrl}/${triangle.id}`;
    return this.http.put<Triangle>(url, triangle);
  }

  deleteTriangle(id: number): Observable<Triangle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Triangle>(url);
  }

  private getHypotenuse(coteAdjacent: number, coteOppose: number): number {
    return Math.sqrt(coteAdjacent * coteAdjacent + coteOppose * coteOppose);
  }

  //Méthodes propres au Triangle

  perimetre(coteAdjacent: number, coteOppose: number): Observable<number> {
    const url = `${this.apiUrl}/perimetre`;
    return this.http.post<number>(url, { coteAdjacent: coteAdjacent, coteOppose: coteOppose });
  }

  surface(coteAdjacent: number, coteOppose: number): Observable<number> {
    const url = `${this.apiUrl}/surface`;
    return this.http.post<number>(url, { coteAdjacent: coteAdjacent, coteOppose: coteOppose });
  }

}
