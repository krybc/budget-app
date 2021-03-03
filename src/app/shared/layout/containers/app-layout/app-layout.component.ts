import { Component, OnInit } from '@angular/core';
import {AuthService, UserModel} from '@auth';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  public user: UserModel;

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.snackBar.open('You have been succesfuly logout', 'Close');
    this.router.navigate(['auth/login']);
  }

}
