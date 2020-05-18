import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatCheckboxModule,
  MatBottomSheet,
  MatBottomSheetRef,
  MatBottomSheetModule,
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS
} from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import {
  HomeComponent, DialogOverviewExampleDialog
} from "./components/home/home.component";
import {
  FormsModule,
  ReactiveFormsModule
} from "../../node_modules/@angular/forms";
import { HeaderComponent } from "./include/header/header.component";
import { FooterComponent } from "./include/footer/footer.component";
import { LoginComponent } from "./components/login/login.component";
import { CheckbillComponent } from "./components/checkbill/checkbill.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { OrderComponent } from "./components/order/order.component";
import { TablesComponent, TableDialog } from "./components/tables/tables.component";
import { AddFoodComponent } from "./components/add-food/add-food.component";
import { HttpModule } from "@angular/http"; //add this for using http protocal
import { HttpClient, HttpClientModule } from "../../node_modules/@angular/common/http";
import { CheckbillDetailComponent } from './components/checkbill-detail/checkbill-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   // BottomSheetOverviewExampleSheet,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CheckbillComponent,
    LogoutComponent,
    OrderComponent,
    TablesComponent,
    AddFoodComponent,
    DialogOverviewExampleDialog,
    TableDialog,
    CheckbillDetailComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  entryComponents: [DialogOverviewExampleDialog,TableDialog],
  providers: [
    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
