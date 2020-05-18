import { Component, OnInit } from '@angular/core';
import { ServiceControllerService } from '../../service-controller.service';
import { Route } from '../../../../node_modules/@angular/compiler/src/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 

export interface Transaction {
  food_name: string;
  price: string;
  num:string;
  total:number;
}

@Component({
  selector: 'app-checkbill-detail',
  templateUrl: './checkbill-detail.component.html',
  styleUrls: ['./checkbill-detail.component.scss']
})
export class CheckbillDetailComponent implements OnInit {
  displayedColumns: string[] = ['food_name', 'price','num','total'];
  constructor(private myservice:ServiceControllerService, private route: ActivatedRoute,
    private router: Router) { }
  transactions:Transaction[]=[];
  responseData:any;
  ngOnInit() {
    this.myservice.postData({table_id:this.route.snapshot.paramMap.get('table_id')},'transaction').subscribe((result)=>{
      this.responseData=result;
      this.transactions=this.responseData;
    })
  }
  print(){
    window.print();
  }
  pdfGenerate(){
    var data = document.getElementById('mypdf'); 
    html2canvas(data).then(canvas => { 
    // Few necessary setting options 
    var imgWidth = 208; 
    var pageHeight = 295; 
    var imgHeight = canvas.height * imgWidth / canvas.width; 
    var heightLeft = imgHeight; 
    
    const contentDataURL = canvas.toDataURL('image/png') 
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
    var position = 0; 
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) 
    pdf.save('MYPdf.pdf'); // Generated PDF  
    }); 
  }
  checkAll(){
    var r=confirm('this transaction is finished?');
    if(r){
      this.myservice.postData({table_id:this.route.snapshot.paramMap.get('table_id')},'checkAll').subscribe((result)=>{
       var res:any;
       res=result;
       if(res.status){
        this.router.navigate(['/checkbills']);
       }else{
         alert('connection error');
       }
        
      })
    }
  }
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    
    if(this.transactions.length>0){
      return this.transactions.map(t => t.total).reduce((acc, value) => acc + value, 0);
    }else return 0;
  }

}
