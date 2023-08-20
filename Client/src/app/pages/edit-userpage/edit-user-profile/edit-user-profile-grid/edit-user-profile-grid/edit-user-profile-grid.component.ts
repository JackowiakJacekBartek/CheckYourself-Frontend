import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user-profile-grid',
  templateUrl: './edit-user-profile-grid.component.html',
  styleUrls: ['./edit-user-profile-grid.component.scss']
})
export class EditUserProfileGridComponent implements OnInit {

@Input() data: any;

gridData: any;
selectedAdress = 'two';
selectedMoney = 'one';
selectedWork = 'one';
date = new Date('03-10-1999');

constructor() { }

  ngOnInit(): void {
    this.gridData = this.data;
  }

}
