import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/specify/homepage/homepage.component';
import { SessionResultComponent } from './components/specify/session-result/session-result.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path:'dashboard', component: HomepageComponent},
  { path:'dashboard/raceResult', component: SessionResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
