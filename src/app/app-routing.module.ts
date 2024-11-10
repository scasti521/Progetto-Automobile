import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoListComponent } from './component/auto-list/auto-list.component';
import { LoginComponent } from './component/login/login.component';
import { AddAutoComponent } from './component/add-auto/add-auto.component';

const routes: Routes = [
  { path: '', redirectTo: '/auto-list', pathMatch: 'full' },
  { path: 'auto-list', component: AutoListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-auto', component: AddAutoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
