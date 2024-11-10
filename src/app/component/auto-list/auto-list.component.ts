import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auto } from '../../models /Auto';
import { Subscription } from 'rxjs';
import { AutoService } from '../../service/auto.service';
import { AutenticazioneService } from '../../service/autenticazione.service';

@Component({
  selector: 'app-auto-list',
  templateUrl: './auto-list.component.html',
  styleUrls: ['./auto-list.component.css']
})
export class AutoListComponent implements OnInit, OnDestroy {
  auto: Auto[] = [];
  filteredAuto: Auto[] = [];
  automobiliSub: Subscription;
  automobiliChangedSub: Subscription;
  isLoggedIn = null;

  constructor(private automobileService: AutoService, private autenticazioneService: AutenticazioneService) {}

  ngOnInit() {
    this.automobileService.getAutomobili().subscribe(success => {
      if (success) {
        this.filteredAuto = this.auto = this.automobileService.auto;
        console.log('Automobili caricate con successo');
      } else {
        console.log('Errore nel caricamento delle automobili');
      }
    });
    this.isLoggedIn = this.autenticazioneService.token;
    this.auto = this.automobileService.auto;
    this.automobiliChangedSub = this.automobileService.automobiliChanged.subscribe({
      next: (esito) => {
        this.filteredAuto = this.auto = this.automobileService.auto;
      }
    });
  }

  ngOnDestroy() {
    this.automobiliSub?.unsubscribe();
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.filteredAuto = this.auto.filter(a =>
      a.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.modello.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.prezzo.toString().includes(searchTerm)
    );
  }
}
