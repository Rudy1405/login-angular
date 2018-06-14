import { Component, OnInit } from '@angular/core';
 
import { AlertService } from '../_services/index';
 
@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})
 
export class AlertComponent {
    message: any;
 
    constructor(private alertService: AlertService) { }
 
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; }); 
    }
    /// getMessage returns an Observable that allows us to pass alert MSG tothe template  whenever a msg is received from the alert service
}