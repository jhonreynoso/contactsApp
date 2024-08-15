import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutContainerComponent } from './features/layout/layout-container.component';
import { ADMIN_ROUTE_SEGMENT } from './features/admin/admin-routing.constants';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutContainerComponent,
    children: [{
      path: ADMIN_ROUTE_SEGMENT,
      loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminModule)
    }]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
