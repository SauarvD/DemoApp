import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor( 	private router:Router,
  				private route:ActivatedRoute) { }

  public linkToRoute: any = [];

  ngOnInit() {
    let element = <HTMLElement>document.getElementsByClassName('features-container')[0];
    element.style.height = '25em';
  	this.linkToRoute = [
      {
        linkName:'FoodPoll',
        url:'foodPoll'
      },
      {
        linkName:'Search People',
        url:'searchPeople'
      }
    ]
  }

  navigateTo(data){
  	this.router.navigate(['../'+data],{relativeTo:this.route})
  }

}
