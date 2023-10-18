import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  isSuccess: boolean;
  transactionAmt: number;
  transactionId: any;
  paymentResponse: string;


  constructor(
    private route : ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      console.log('param', param)
      if (param['resp'] === 'success') {
        this.isSuccess = true;
        this.transactionAmt = param['transaction_amount'];
        this.transactionId = param['transaction_id']
        this.paymentResponse = param['resp']
       }
      })
  }
  navigateToHome(){
    this.router.navigate(['/fee-management/manage-fee']);
  }
  
}
