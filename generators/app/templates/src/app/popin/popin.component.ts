import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'popin',
  templateUrl: './popin.component.html',
  styleUrls: ['./popin.component.css']
})
export class PopinComponent {

  isVisible:boolean = false;

  open(){
    this.isVisible=true;
  }

  close(){
    this.isVisible=false;
  }

}
