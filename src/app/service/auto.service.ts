import { Injectable } from '@angular/core';
import { Auto } from '../models /Auto';
import {catchError, map, Observable, of, Subject, switchMap} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AutenticazioneService} from "./autenticazione.service";

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  auto: Auto[] = [];

  automobileSelected: Auto;

  automobiliChanged = new Subject<void>();

  constructor(private http: HttpClient, private autenticazioneService : AutenticazioneService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.autenticazioneService.token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  creaAutomobile(nuovaAutomobile: Omit<Auto, 'id'>): Observable<boolean> {
    const headers = this.getAuthHeaders();
    return this.http.post<Auto>('http://localhost:8080/automobile/nuova', nuovaAutomobile, {headers}).pipe(
      map(automobile  => true),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    )
  }


  getAutomobili(): Observable<boolean> {
    return this.http.get<Auto[]>('http://localhost:8080/automobile/all').pipe(
      //delay(5000),
      map(automobili => {
        this.auto = automobili;
        this.automobiliChanged.next();
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    )
  }

  modificaAutomobile(automobile: Auto): Observable<boolean> {
    const headers = this.getAuthHeaders();
    return this.http.put<Auto>('http://localhost:8080/automobile/modifica', automobile, {headers}).pipe(
      map(automobile => true),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    )
  }

  eliminaAutomobile(id: number): Observable<boolean> {
    const headers = this.getAuthHeaders();
    return this.http.delete('http://localhost:8080/automobile/elimina/' + id,{headers, responseType:'text'}).pipe(
      switchMap(res => this.getAutomobili()),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    );
  }

}


