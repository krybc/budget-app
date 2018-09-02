import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private toastrServive: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.toastrServive.success('You have been succesfuly logout');
    this.router.navigate(['auth/login']);
  }

}
