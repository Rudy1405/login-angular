import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from '../_models/index'
import {UserService} from '../_services/index'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

/**
 * The componeen gets the current user from local storage and all users from the user service.
 */

export class HomeComponent implements OnInit {
  currentUser: User /// this goes to dosplay in home.html 
  users: User[]= [] /// this to ther are all the users

  constructor(private userService: UserService) {  // we pass an UserService obj to make the reqs
    this.currentUser= JSON.parse(localStorage.getItem('currentUser')) // we put in currentUser the user that the browser has at local Storege
  }

  ngOnInit() {
    this.loadAllUsers()  /// when componenet get loads lets call the loadAllusers function 
  }

  deleteUser(id: number){  /// on template html we have an delete option 
    this.userService.delete(id).subscribe(()=> {this.loadAllUsers()}) 
    /// this makes a call to our routes in userservices to "call" our fake backend api
    //and make an observable that return the funciton load all users to delete that user form the array
   }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
    /// this funciton only makes a get req to our userServices routes to conect to the fake API and return
    /// all the registeres users creating an observable that recieve all the useres and then we put it in our usres ARRAY line 17
  }
}
