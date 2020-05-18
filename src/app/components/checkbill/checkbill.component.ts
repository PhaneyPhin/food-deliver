import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ServiceControllerService } from "../../service-controller.service";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Http } from "../../../../node_modules/@angular/http";
import { Route, Router } from '../../../../node_modules/@angular/router';
import { compilePipeFromMetadata } from '../../../../node_modules/@angular/compiler';
import {interval} from "rxjs/internal/observable/interval";
import { switchMap} from "rxjs/operators";

@Component({
  selector: 'app-checkbill',
  templateUrl: './checkbill.component.html',
  styleUrls: ['./checkbill.component.scss']
})
export class CheckbillComponent implements OnInit {

  url: any;
  displayedColumns: string[] = [
    "table_num",
    "total",
    "checkbill"
  ];
  dataSource: MatTableDataSource<any>;
  user: any;
  responseData: any;
  textFilter:any="";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private bottomSheet: MatBottomSheet,private myservice: ServiceControllerService,
    public dialog: MatDialog,private router:Router) {
      this.url = this.myservice.url;
  }

  ngOnInit() {
    let user=JSON.parse(sessionStorage.getItem('user'));
      if(user==null||user==undefined){
        this.router.navigate(['/']);
      }else{
        var time=0;
        this.user = sessionStorage.getItem("user");
        // Assign the data to the data source for the table to render
        let users = [];

        this.user = JSON.parse(this.user);
        interval(5000)
        .pipe(
          startWith(0),
          switchMap(() => this.myservice.postData({ store_id: this.user.store_id }, "checkbill"))
        )
        .subscribe(result=>{
          console.log(result);
          this.responseData = result;
          users = this.responseData;

          this.dataSource = new MatTableDataSource(users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.applyFilter(this.textFilter);
        })
      ;
      }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
