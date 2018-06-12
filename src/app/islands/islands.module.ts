import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ForestComponent } from 'app/views/islands/forest/forest.component';
import { ExitButtonComponent } from 'app/components';
import { SeaView, IslandView } from 'app/views';

const routes: Routes = [
  {
    path: 'islands',
    children: [
      { path: '', component: SeaView, pathMatch: 'full' },
      { path: ':island', component: IslandView },
      { path: ':island/:gameId', component: IslandView }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class IslandsModule { }
