import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AutenticazioneService} from "../../service/autenticazione.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin: FormGroup;
  showError: boolean = false;

  constructor(
    private authService: AutenticazioneService,
    private router: Router,
  ) {}

  //creo una variabile di tipo Subscription per gestire il risultato della chiamata al servizio login dell'AuthService
  loginSub: Subscription;

  ngOnInit() {
    //inizializzo il form di login
    this.formLogin = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  //creo la mia funzione di login
  login(){
    //prendo i valori dal form
    const username = this.formLogin.get('username').value;
    const password = this.formLogin.get('password').value;

    //chiamo il servizio di login
    this.loginSub = this.authService.login(username, password).subscribe({
      next: esito => {
        //se l'esito è positivo vado alla pagina di inserimento
        if(esito){
          this.router.navigateByUrl('/auto-list');
        } else {
          //altrimenti mostro un errore
          this.showError = true;
        }
      }
    })

  }
  //quando il componente viene distrutto disiscrivo la subscription
  ngOnDestroy() {
    this.loginSub?.unsubscribe();
  }

}
