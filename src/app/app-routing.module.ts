import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TablesComponent } from './components/tables/tables.component';
import { OrderComponent } from './components/order/order.component';
import { CheckbillComponent } from './components/checkbill/checkbill.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { CheckbillDetailComponent } from './components/checkbill-detail/checkbill-detail.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"foods",component:HomeComponent},
  {path:"foods/add",component:AddFoodComponent},
  {path:"tables",component:TablesComponent},
  {path:"orders",component:OrderComponent},
  {path:"checkbills",component:CheckbillComponent},
  {path:"checkbills/:table_id",component:CheckbillDetailComponent},
  {path:"logout",component:LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
