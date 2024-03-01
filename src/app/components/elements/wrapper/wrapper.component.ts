import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
  isLoggedIn: boolean = true;
  notifications: Array<any> = [];
  name: string = 'Test User'
  profilePicture: string = ''

  userList: Array<string> = ['Lucy', 'U', 'Tom', 'Edward'];
  colorList: Array<string> = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];


  constructor(private router: Router){

  }


  showNotification(){

  }

  handleDropdownVisibility(isVisible: boolean) {
    // Perform actions when dropdown opens/closes (optional)
  }

  closeNotifications(){

  }

  goToSettings(){
    this.router.navigate(['/settings'])
  }
}
