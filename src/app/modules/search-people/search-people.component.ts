import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.css']
})
export class SearchPeopleComponent implements OnInit {

  constructor(	private router: Router,
  				private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goback(){
  	this.router.navigate(['../'],{relativeTo: this.route})
  }

}
