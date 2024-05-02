import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from '../base-service.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService {
  private subscriptionSubject = new BehaviorSubject<Subscription | null>(null);
  currentSubscription$: Observable<Subscription | null> = this.subscriptionSubject.asObservable();

  constructor(private http: HttpClient) {
    super('subscription')
   }

   subscribeToService(subscription: Subscription) {
    return this.http.post<any>(this.baseUrl + `/subscribe`, JSON.stringify(subscription), { headers: this.header, withCredentials: true })
   }

   subscriptionCallBack(trxref: string){
    return this.http.post<any>(this.baseUrl + `/subscription-callback`, {trxref}, { headers: this.header, withCredentials: true })
   }
}
