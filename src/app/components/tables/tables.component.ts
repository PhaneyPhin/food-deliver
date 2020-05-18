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

export interface DialogData {
  type:string;
  table_id:string;
  table_num: string;
  num_seate: string;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  url: any;
  displayedColumns: string[] = [
    "table_id",
    "table_num",
    "num_seate",
    "edit",
    "delete"
  ];
  dataSource: MatTableDataSource<any>;
  user: any;
  responseData: any;
  textFilter:any="";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bottomSheet: MatBottomSheet,private myservice: ServiceControllerService,
    public dialog: MatDialog,private router:Router) {
   
      let user=JSON.parse(sessionStorage.getItem('user'));
      if(user==null||user==undefined){
        this.router.navigate(['/']);
      }else{
        this.getTable();
      }
    }
  
  ngOnInit() {
   
    
   
  }
  addTable(){
    const dialogRef = this.dialog.open(TableDialog, {
      width: "400px",
      data: {table_id:"",type: "Add Table",table_num: "",num_seate: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      this.getTable();
    });

  }
  edit(item){
    const dialogRef = this.dialog.open(TableDialog, {
      width: "400px",
      data: {table_id:item.table_id,type: "Edit Table",table_num: item.table_num,num_seate: item.seate_num}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      this.getTable();
    });

  }
  delete(item){
    var r=confirm('Do you want to delete this table');
    if(r){
      this.myservice.postData({table_id:item.table_id},'deleteTable').subscribe((result)=>{
        var res:any;
        res=result;
        if(res.status){
          alert('Data was deleted');
          this.getTable();
        }else{
          alert("this data can't delete");
        }
      })
    }
  }
  getTable(){
    this.url = this.myservice.url;
    this.user = sessionStorage.getItem("user");
    // Assign the data to the data source for the table to render
    let users = [];

    this.user = JSON.parse(this.user);
    this.myservice.postData({ store_id: this.user.store_id }, "getTable").subscribe(result => {
        console.log(result);
        this.responseData = result;
        users = this.responseData;

        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.applyFilter(this.textFilter);
      //  alert(this.textFilter);
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


@Component({
  selector: "table-dialog",
  templateUrl: "table-dialog.html",
  styleUrls: ["./table-dialog.scss"]
})
export class TableDialog {
  constructor(
    public dialogRef: MatDialogRef<TableDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private myservice: ServiceControllerService,
    private http: Http
  ) {
   
  }
  submit(){
    if(this.data.table_num==""){
      alert("Please input the table number");
    }else if(this.data.num_seate==""){
      alert("please input the number of seate");
    }else{
      let user=JSON.parse(sessionStorage.getItem('user'));
      if(this.data.type=="Add Table"){
        
        this.myservice.postData({table_num:this.data.table_num,seate_num:this.data.num_seate,store_id:user.store_id},'addTable').subscribe((result)=>{
          let res:any;
          res=result;
          if(res.status){
            this.dialogRef.close();
          }else{
            alert('This table is already exist in database');
          }
        })
      }else{
        this.myservice.postData({table_num:this.data.table_num,seate_num:this.data.num_seate,store_id:user.store_id,table_id:this.data.table_id},'editTable').subscribe((result)=>{
          let res:any;
          res=result;
          if(res.status){
            this.dialogRef.close();
          }else{
            alert('This table is already exist in database');
          }
        })

      }
    }
  }
  
}

