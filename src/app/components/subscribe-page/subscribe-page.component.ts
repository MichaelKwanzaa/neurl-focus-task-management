import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from 'src/app/core/services/subscription-service/subscription.service';
import { Subscription } from 'src/app/models';

@Component({
  selector: 'app-subscribe-page',
  templateUrl: './subscribe-page.component.html',
  styleUrls: ['./subscribe-page.component.scss']
})
export class SubscribePageComponent implements OnInit {
  
  newSubscription: Subscription = {
    plan: 'basic',
    billingFrequency: 'monthly',
  }

  constructor(private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
  ){
    this.route.queryParams.subscribe(segments => {
      console.log(segments)
      if(Object.keys(segments).length > 0){
        const trxref = segments['trxref']

        if(trxref){
          console.log(trxref)
          this.subscriptionService.subscriptionCallBack(trxref).subscribe((data) => {
            console.log(data);
          })
        }
 
      }
    })

  }

  ngOnInit(){

  }

  subscribe(plan: string){
    if(plan ==='monthly'){
      this.newSubscription  = {
        plan: 'basic',
        billingFrequency: 'monthly',
      }
    } else {
      this.newSubscription  = {
        plan: 'basic',
        billingFrequency: 'yearly',
      }
    }

    this.subscriptionService.subscribeToService(this.newSubscription).subscribe(paymentLink => {
      const link = paymentLink.data.data;
      window.open(link, "_self");
    })
  }

  cancelSubscription(){

  }
}
