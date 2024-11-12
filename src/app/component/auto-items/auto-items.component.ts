import {Component, Input} from '@angular/core';
import {Auto} from "../../models /Auto";
import {AutenticazioneService} from "../../service/autenticazione.service";
import {AutoService} from "../../service/auto.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auto-items',
  templateUrl: './auto-items.component.html',
  styleUrls: ['./auto-items.component.css']
})
export class AutoItemsComponent {

  @Input() automobile: Auto;

  constructor(
    private automobileService: AutoService,
    private router: Router,
    private authService: AutenticazioneService
  ) { }

  eliminaSub: Subscription;

  navigateToEdit(): void {
    this.automobileService.automobileSelected = this.automobile;
    this.router.navigateByUrl('/add-auto');
  }

  elimina(): void {
    const esito = confirm('Sei sicuro di eliminare l\' automobile?');
    if(esito){
      this.eliminaSub = this.automobileService.eliminaAutomobile(this.automobile.id).subscribe();
    }
  }

  get isLoggedIn(): boolean {
    return !!this.authService.token;
  }

  get ruolo(): boolean {
    // Logica per determinare il ruolo dell'utente
    return this.authService.decodetoken && this.authService.decodetoken.ruolo === 0;
  }


  ngOnDestroy() {
    this.eliminaSub?.unsubscribe();
  }

}
