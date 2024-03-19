import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlRestrictionService {
  private restrictedUrls: string[] = ['https://www.google.com'];

  constructor() { }


  addRestrictedUrl(url: string) {
    this.restrictedUrls.push(url);
  }

  removeRestrictedUrl(url: string) {
    this.restrictedUrls = this.restrictedUrls.filter(u => u !== url);
  }

  isUrlRestricted(url: string): boolean {
    return this.restrictedUrls.includes(url);
  }

  getRestrictedUrls(): string[] {
    return this.restrictedUrls;
  }
}
