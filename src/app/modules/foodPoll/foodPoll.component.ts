import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var gapi: any;
@Component({
  selector: 'app-foodPoll',
  templateUrl: './foodPoll.component.html',
  styleUrls: ['./foodPoll.component.css']
})
export class foodPollComponent implements OnInit {

  constructor(private router: Router,
  			      private route: ActivatedRoute,
              private ngZone: NgZone) { 
  }
  public items:any=[];

  ngOnInit() {
    let element = <HTMLElement>document.getElementsByClassName('features-container')[0];
    let elementChild = <HTMLElement>document.getElementsByClassName('features-container-content')[0];
    element.style.height = '50em';
    elementChild.style.padding = '0em';
    this.items=[
      {
        'image':'../../../assets/images/burger.png',
        'name':'Burgers'
      },
      {
        'image':'../../../assets/images/chaat.png',
        'name':'Chaats'
      },
      {
        'image':'../../../assets/images/chole-bhature.png',
        'name':'Chole Bhature'
      },
      {
        'image':'../../../assets/images/momo.png',
        'name': 'Momos'
      },
      {
        'image':'../../../assets/images/pani-puri.png',
        'name':'Pani Puri'
      }
    ]
    
  }

  goback(){
  	this.router.navigate(['../'],{relativeTo: this.route})
  }

}
