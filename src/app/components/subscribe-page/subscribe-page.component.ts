import { Component } from '@angular/core';
import { SubscriptionService } from 'src/app/core/services/subscription-service/subscription.service';
import { Subscription } from 'src/app/models';

@Component({
  selector: 'app-subscribe-page',
  templateUrl: './subscribe-page.component.html',
  styleUrls: ['./subscribe-page.component.scss']
})
export class SubscribePageComponent {
  
  newSubscription: Subscription = {
    plan: 'basic',
    billingFrequency: 'monthly',
    price: 3000,
    startDate: new Date(),
    paymentMethod: 'card',
  }

  constructor(private subscriptionService: SubscriptionService){

  }

  subscribe(){
    this.newSubscription  = {
      plan: 'basic',
      billingFrequency: 'monthly',
      price: 3000,
      startDate: new Date(),
      paymentMethod: 'card',
    }
    this.subscriptionService.subscribeToService(this.newSubscription).subscribe(paymentLink => {
      const link = paymentLink;
      console.log(link);
    })
  }
}
