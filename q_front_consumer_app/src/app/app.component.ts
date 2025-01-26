import { Component } from '@angular/core';
import { AuthService } from './api/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( private LogCtrl : AuthService) {}
  _self: any = sessionStorage.getItem("user");

  logout(){
      console.log("logout");
      this.LogCtrl.userLogout(sessionStorage.getItem("token"));
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      window.location.reload();
  }

  public appPages = [
    { title: 'Main', url: '/main', icon: 'home' },
    { title: 'Login/Register', url: '/login-register', icon: 'log-in' },
    // { title: 'My Profile', url: '/provider/'+sessionStorage.getItem("user"), icon: 'construct' },
    // { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Logout', url: '/main', icon: 'warning'  },
  ];
 // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
}
