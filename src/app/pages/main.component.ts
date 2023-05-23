import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    public menu = [
        // {
        //     title: 'Calendario',
        //     icon: 'calendar-outline',
        //     link: '/main/scheduler',
        //     home: true,
        // },
        {
            title:'Clients',
            icon:'people-outline',
            link:'/main/clients',
            home:false
        },
        {
            title:'Suppliers',
            icon:'people-outline',
            link:'/main/suppliers',
            home:false
        }
    ]
    constructor() { }

    ngOnInit(): void {
    }

}
