import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UserModel} from '../../model/user.model';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  public user: UserModel;

  constructor(
    public authService: AuthService,
    private toastrServive: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.toastrServive.success('You have been succesfuly logout');
    this.router.navigate(['auth/login']);
  }

}
