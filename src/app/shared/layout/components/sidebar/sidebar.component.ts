import {Component, Input, OnInit} from '@angular/core';
import {LoggedInUserModel} from '@auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() user: LoggedInUserModel;

  constructor() { }

  ngOnInit() {
  }

}
