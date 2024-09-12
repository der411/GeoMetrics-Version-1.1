import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Sphere } from '../models/sphere';

@Injectable({
  providedIn: 'root',
})
export class SphereService {
  private apiUrl = 'http://localhost:8080/api/spheres';

  constructor(private http: HttpClient) {}

  getSpheres(): Observable<Array<Sphere>> {
    return this.http
      .get<Array<Sphere>>(this.apiUrl)
      .pipe(
        tap((spheres) => console.log('spheres reçues du serveur', spheres))
      );
  }

  getSphere(id: number): Observable<Sphere> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Sphere>(url);
  }

  addSphere(sphere: Sphere): Observable<Sphere> {
    return this.http.post<Sphere>(this.apiUrl, sphere);
  }

  updateSphere(sphere: Sphere): Observable<Sphere> {
    const url = `${this.apiUrl}/${sphere.id}`;
    return this.http.put<Sphere>(url, sphere);
  }

  deleteSphere(id: number): Observable<Sphere> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Sphere>(url);
  }

  //Méthodes propres à la Sphère

  surface(rayon: number): Observable<number> {
    const url = `${this.apiUrl}/surface`;
    return this.http.post<number>(url, { rayon: rayon });
  }

  volume(rayon: number): Observable<number> {
    const url = `${this.apiUrl}/volume`;
    return this.http.post<number>(url, { rayon: rayon });
  }
}
