import { Injectable } from '@angular/core';
//importo HttpClient per effettuare richieste http
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
//importo Router per effettuare il redirect
import {Router} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {
  constructor(private http : HttpClient, private router : Router) { }

  //dichiaro il token come stringa per poterlo utilizzare in seguito
  token: string;
  //dichiaro la variabile decodetoken per poter accedere ai dati del token
   decodetoken: any;

  //metodo per effettuare il login
  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:8080/auth/login', {username, password}, {observe: 'response'}).pipe(
      map(res => {
        this.token = res.headers.get('Authorization');
        localStorage.setItem('chiave', this.token);

        return true;
      }),
      catchError((err: HttpErrorResponse): Observable<boolean> => {
        console.log(err);
        return of(false);
      })
    )
  }

  //metodo per effettuare il logout
  logout() {
    this.token = null;
    localStorage.removeItem('chiave');
    this.router.navigateByUrl('/login');
  }

  //autoLogin, se il token è presente allora l'utente è già loggato
  autoLogin() {
    this.token = localStorage.getItem('chiave');
  }

  decodeToken() {
    this.decodetoken = jwtDecode(this.token);
    this.decodetoken= JSON.parse(this.decodetoken.sub)
  }

}
