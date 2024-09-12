import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Cube } from '../models/cube';

@Injectable({
  providedIn: 'root',
})
export class CubeService {
  private apiUrl = 'http://localhost:8080/api/cubes';

  constructor(private http: HttpClient) {}

  getCubes(): Observable<Array<Cube>> {
    return this.http
      .get<Array<Cube>>(this.apiUrl)
      .pipe(tap((cubes) => console.log('cubes reçus du serveur', cubes)));
  }

  getCube(id: number): Observable<Cube> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cube>(url);
  }

  addCube(cube: Cube): Observable<Cube> {
    return this.http.post<Cube>(this.apiUrl, cube);
  }

  updateCube(cube: Cube): Observable<Cube> {
    const url = `${this.apiUrl}/${cube.id}`;
    return this.http.put<Cube>(url, cube);
  }

  deleteCube(id: number): Observable<Cube> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Cube>(url);
  }
  
  //Méthodes propres au Cube

  surface(cote: number): Observable<number> {
    const url = `${this.apiUrl}/surface`;
    return this.http.post<number>(url, { cote: cote });
  }

  volume(cote: number): Observable<number> {
    const url = `${this.apiUrl}/volume`;
    return this.http.post<number>(url, { cote: cote });
  }
}
