import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {AlertService, UserService} from '../_services/index'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

//// Here we just call to the route and fake api method of create new user

export class RegisterComponent implements OnInit {
  model: any = {}
  loading = false

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { } /// just decleare our vars

  register(){
    this.loading = true
    this.userService.create(this.model)
        .subscribe(
          data => {
            /// set succes msh and pass true param to persist the msg after redirecting to login page
            this.alertService.success('Registro Exitoso', true) /// we put thos vals cause are the ones that the method require
            this.router.navigate(['/login'])
          },
          error => {
            this.alertService.error(error)
            this.loading= false
          }
        )
  }  


  ngOnInit() {
  }

}
