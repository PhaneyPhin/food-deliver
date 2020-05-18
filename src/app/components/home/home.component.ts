import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material";

import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ServiceControllerService } from "../../service-controller.service";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Http } from "../../../../node_modules/@angular/http";
import { Router } from '../../../../node_modules/@angular/router';
export interface DialogData {
  type:string;
  food_id:string;
  food_name: string;
  price: string;
  type_id: string;
  description: string;
  favorite: string;
}
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  url: any;
  count=0;
  displayedColumns: string[] = ["food_id","food_name","price","favorite","edit","delete"];
  dataSource: MatTableDataSource<any>;
  foods: any;
  user: any;
  responseData: any;
  textFilter:any="";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  constructor(private router:Router,private bottomSheet: MatBottomSheet,private myservice: ServiceControllerService,public dialog: MatDialog) {
    let user=JSON.parse(sessionStorage.getItem('user'));
    if(user==null||user==undefined){
      this.router.navigate(['/']);
    }else{
      this.getFood();
    }
  }
  getFood(){
    this.url = this.myservice.url;
    this.user = sessionStorage.getItem("user");
    // Assign the data to the data source for the table to render
    let users = [];

    this.user = JSON.parse(this.user);
    this.myservice.postData({ store_id: this.user.store_id }, "getFood").subscribe(result => {
        console.log(result);
        this.responseData = result;
        users = this.responseData;

        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.applyFilter(this.textFilter);
      });
  }
  ngOnInit() {}
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "400px",
      data: {
        food_id:"",
        type: "Add Food",
        food_name: "",
        price: "",
        type_id: "",
        description: "",
        favorite: 0
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      this.getFood();
    });
  }
  delete(item){
    var r=confirm("do you want to delete this food");
    if(r){
      this.myservice.postData({food_id:item.food_id},"deleteFood").subscribe((result)=>{
        let res:any;
        res=result;
        if(res.status){
          alert("item deleted");
          this.getFood();
        }else{
          alert("failed to delete");
        }
      })
    }
    
  }
  edit(item) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "400px",
      data: {
        food_id:item.food_id,
        type: "Edit Food",
        food_name: item.food_name,
        price: item.price,
        type_id: item.type_id,
        description: item.description,
        favorite: item.favorite
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      this.getFood();

      this.count++;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // openBottomSheet(): void {
  //   this.bottomSheet.open(BottomSheetOverviewExampleSheet);
  // }
}


@Component({
  selector: "dialog-overview-example",
  templateUrl: "dialog-overview-example.html",
  styleUrls: ["./dialog.scss"]
})
export class DialogOverviewExampleDialog {
  selectedFile: File;
  food_type:any;
  favorite=[{value:0,show:"False"},{value:1,show:"True"}];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private myservice: ServiceControllerService,
    private http: Http
  ) {
    console.log(this.data.favorite);
    this.myservice.postData({},"getFoodType").subscribe((result)=>{
      this.food_type=result;
    })
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }
  submit() {
    const uploadData = new FormData();
    var user: any;
    user = JSON.parse(sessionStorage.getItem("user"));
    if(this.data.food_name==""){
      alert("Please input the food name");
    }else if(this.data.price==""){
      alert("Please input the price");
    }else if(this.data.type_id==""){
      alert("Please select food type");
    }else if (this.data.type == "Add Food") {
      this.myservice.postData(
          {
            food_name: this.data.food_name,
            price: this.data.price,
            type_id: this.data.type_id,
            description: this.data.description,
            favorite: this.data.favorite,
            store_id: user.store_id
          }
          , "addFood").subscribe(result => {
            let res: any;
            res = result;
            if (res.status == 1) {
              if (this.selectedFile != null) {
                uploadData.append("myFile", this.selectedFile, res.id + ".jpg");
                this.http
                  .post(this.myservice.url + "api/upload", uploadData)
                  .subscribe(result => {
                    alert("success");
                    this.dialogRef.close(this.data);
                  });
              } else {
                alert("success");
                this.dialogRef.close(this.data);
              }
            } else {
              alert("error");
            }
        });
    }else{
      this.myservice
        .postData(
          {
            food_id:this.data.food_id,
            food_name: this.data.food_name,
            price: this.data.price,
            type_id: this.data.type_id,
            description: this.data.description,
            favorite: this.data.favorite,
            store_id: user.store_id
          }
          ,"updateFood").subscribe(result => {
          console.log(result);
          let res: any;
          res = result;
          if (res.status == 1) {
            if (this.selectedFile != null) {
              uploadData.append("myFile", this.selectedFile, this.data.food_id + ".jpg");
              this.http
                .post(this.myservice.url + "api/upload", uploadData)
                .subscribe(result => {
                  console.log(result);
                  alert("success");
                  this.dialogRef.close(this.data);
                });
            } else {
              alert("success");
              this.dialogRef.close(this.data);
            }
          } else {
            alert("error");
          }
        });
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
}