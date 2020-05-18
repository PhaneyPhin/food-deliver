import { Component, OnInit } from '@angular/core';
import { ServiceControllerService } from '../../service-controller.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:any;
  password:any;
  responseData:any;
  constructor(private myservice:ServiceControllerService,private router:Router) { }

  ngOnInit() {
  }
  login(){
    this.myservice.postData({username:this.username,password:this.password},'login').subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully 
      console.log(result);
      this.responseData=result;
      if(this.responseData.length>0){
        sessionStorage.setItem('user',JSON.stringify(this.responseData[0]));
        this.router.navigate(['/foods']);
      }else{
        alert("invalid user");
      }
    },err=>{
      alert('connection error');
    });
   // console.log(data);
  }

}
