import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AutoService} from "../../service/auto.service";
import {Router} from "@angular/router";
import {Auto} from "../../models /Auto";
import {Observable, Subscription} from "rxjs";
import {AutenticazioneService} from "../../service/autenticazione.service";

@Component({
  selector: 'app-add-auto',
  templateUrl: './add-auto.component.html',
  styleUrls: ['./add-auto.component.css']
})
export class AddAutoComponent implements OnInit {
  FormAuto: FormGroup;
  autoDaModificare: Auto;
x
  salvaSub: Subscription;

  constructor(
    private automobileService: AutoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.autoDaModificare = this.automobileService.automobileSelected;
    this.FormAuto = new FormGroup({
      marca: new FormControl('', [Validators.required]),
      modello: new FormControl('', [Validators.required]),
      targa: new FormControl('', [Validators.required]),
      prezzo: new FormControl('', [Validators.required]),
    });
  }


  mergeAutomobile(): void {
    const nuovoProdotto: Omit<Auto, 'id'> = this.FormAuto.value;
    let call: Observable<boolean>;
    if(this.autoDaModificare){
      call = this.automobileService.modificaAutomobile({...nuovoProdotto, id: this.autoDaModificare.id})
    } else {
      call = this.automobileService.creaAutomobile(nuovoProdotto)
    }
    this.salvaSub = call.subscribe({
      next: (esito) => {
        if(esito){
          this.router.navigateByUrl('/auto-list')
        }
      }
    });
  }

  ngOnDestroy() {
    this.salvaSub?.unsubscribe();
    this.automobileService.automobileSelected = null;
  }

}
