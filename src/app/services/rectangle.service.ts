// rectangle.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Rectangle } from '../models/rectangle';

@Injectable({
  providedIn: 'root',
})
export class RectangleService {
  private apiUrl = 'http://localhost:8080/api/rectangles';

  constructor(private http: HttpClient) {}

  getRectangles(): Observable<Array<Rectangle>> {
    return this.http
      .get<Array<Rectangle>>(this.apiUrl)
      .pipe(
        tap((rectangles) =>
          console.log('rectangles reçus du serveur', rectangles)
        )
      );
  }

  getRectangle(id: number): Observable<Rectangle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Rectangle>(url);
  }

  addRectangle(rectangle: Rectangle): Observable<Rectangle> {
    return this.http.post<Rectangle>(this.apiUrl, rectangle);
  }

  updateRectangle(rectangle: Rectangle): Observable<Rectangle> {
    const url = `${this.apiUrl}/${rectangle.id}`;
    return this.http.put<Rectangle>(url, rectangle);
  }

  deleteRectangle(id: number): Observable<Rectangle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Rectangle>(url);
  }

  //Méthodes propres au Rectangle

  surface(longueur: number, largeur: number): Observable<number> {
    const url = `${this.apiUrl}/surface`;
    return this.http.post<number>(url, {
      longueur: longueur,
      largeur: largeur,
    });
  }

  perimetre(longueur: number, largeur: number): Observable<number> {
    const url = `${this.apiUrl}/perimetre`;
    return this.http.post<number>(url, {
      longueur: longueur,
      largeur: largeur,
    });
  }
}
