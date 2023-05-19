import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    public menu = [
        {
            title: 'Calendario',
            icon: 'calendar-outline',
            link: '/main/scheduler',
            home: true,
        },
    ]
    constructor() { }

    ngOnInit(): void {
    }

}
