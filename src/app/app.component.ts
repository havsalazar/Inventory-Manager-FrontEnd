import { NbAuthService } from '@nebular/auth';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'inventory-front';
  event$;
  private currUrl = ''
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: NbAuthService
  ) {
    this.event$= this.router.events
        .subscribe(
          (event: NavigationEvent) => {
            if (event instanceof NavigationStart) {
              console.log(event.url)
              this.currUrl=event.url;
              localStorage.setItem('lastUrl', this.currUrl);
            }
          });

  }
  ngOnInit() { 
    let lastUrl=localStorage.getItem('lastUrl');
    
    this.authService.isAuthenticated().subscribe(data => {
      if(!lastUrl){
        lastUrl='/main'
      }
      this.router.navigate([localStorage.getItem('lastUrl')]);
    });
  }

}
