import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Losange } from '../models/losange';

@Injectable({
  providedIn: 'root',
})
export class LosangeService {
  private apiUrl = 'http://localhost:8080/api/losanges';

  constructor(private http: HttpClient) {}

  getLosanges(): Observable<Array<Losange>> {
    return this.http
      .get<Array<Losange>>(this.apiUrl)
      .pipe(
        tap((losanges) => console.log('losanges reçus du serveur', losanges))
      );
  }

  getLosange(id: number): Observable<Losange> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Losange>(url);
  }

  addLosange(losange: Losange): Observable<Losange> {
    return this.http.post<Losange>(this.apiUrl, losange);
  }

  updateLosange(losange: Losange): Observable<Losange> {
    const url = `${this.apiUrl}/${losange.id}`;
    return this.http.put<Losange>(url, losange);
  }

  deleteLosange(id: number): Observable<Losange> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Losange>(url);
  }


  //Méthodes propres au Losange

  perimetre(cote: number): Observable<number> {
    const url = `${this.apiUrl}/perimetre`;
    return this.http.post<number>(url, { cote: cote });
  }

  surface(cote: number, petiteDiag: number, grandeDiag: number): Observable<number> {
    const url = `${this.apiUrl}/surface`;
    return this.http.post<number>(url, { cote: cote, petiteDiag: petiteDiag, grandeDiag: grandeDiag });
  }
}
