import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'

import {AlertService, AuthenticationService} from '../_services/index'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/*
  Her we uses the AUTHENTICATION SERVICE TO login AND logout OF THE APP AND AUTOMATICALLY
  LOGS THE USER OUT WHEN IT INITIALIZES THE NGoNiNIT SO THE LOGIN PAGE CAN ALSO BE USED TO LOGOUT
*/
export class LoginComponent implements OnInit {
  model: any = {}
  loading = false /// our bool to disable or able the button to login
  returnUrl: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { } // here in the contructir just declare our variables the router ones and the onces for AUTH and alert in case we need it

  ngOnInit() {
    //resert login status
    this.authenticationService.logout()

    /// get return url from route parameters or default '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  login(){
    this.loading = true // set the button available
    this.authenticationService.login(this.model.username, this.model.password) // makes anobservable of the function login in our authentication service
        .subscribe(
          data => { /// goes to the route that we catch in out ngOnInit
            this.router.navigate([this.returnUrl])
          },
          error => { /// if something goes wrong thisplay the alert
            this.alertService.error(error)
            this.loading = false
          }
        )
  }

}
