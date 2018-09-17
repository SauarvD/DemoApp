import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private auth:AuthService) { 
  }

  public profile: any;
  public foodItems: any = [];

  ngOnInit() {
  	if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }

    this.foodItems = [
      {
        name:"Pani Puri",
        image:"/assets/images/pani-puri.png"
      },
      {
        name:"Chaat",
        image:"/assets/images/chaat.png"
      },
      {
        name:"Chole Bhature",
        image:"/assets/images/chole-bhature.png"
      },
      {
        name:"Momo",
        image:"/assets/images/momo.png"
      }
    ]
  }

}
