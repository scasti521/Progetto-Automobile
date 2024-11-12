import { Component } from '@angular/core';
import {AutenticazioneService} from "../../service/autenticazione.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AutenticazioneService) {
  }


  get isLoggedIn(): boolean {
    return !!this.authService.token;
  }

  get ruolo(): boolean {
    // Logica per determinare il ruolo dell'utente
    return this.authService.decodetoken && this.authService.decodetoken.ruolo === 0;
  }

  logout():void{
    this.authService.logout();
  }

}
