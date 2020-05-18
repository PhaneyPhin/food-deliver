import { Component, OnInit } from '@angular/core';
import { ServiceControllerService } from '../../service-controller.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  constructor(private myservice:ServiceControllerService) { }
  food_type:any;
  food_name:any;
  price:any;
  type_id:any;
  description:any;
  favorite:any=0;
  ngOnInit() {
    this.myservice.postData({},"getFoodType").subscribe((result)=>{
      this.food_type=result;
    });
  }
  addFood(){
    if(this.food_name==null||this.food_name==""){
      alert("Please input the food name");
    }else if(this.price==null||this.price==""){
      alert("Please input the price");
    }else if(this.type_id==null||this.type_id==""){
      alert("Please select the food type");
    }else{
      if(this.description==null){
        this.description="";
      }
      let user:any;
      user=JSON.parse(sessionStorage.getItem('user'));
      this.myservice.postData({food_name:this.food_name,price:this.price,type_id:this.type_id,description:this.description,favorite:this.favorite,store_id:user.store_id},"addFood").subscribe((result)=>{
        console.log(result)
      })
    }
  }

}
