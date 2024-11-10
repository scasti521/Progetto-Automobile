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

  logout():void{
    this.authService.logout();
  }

}
