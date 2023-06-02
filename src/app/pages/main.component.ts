import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    public menu = [ 
        {
            title:'Clients',
            icon:'people-outline',
            link:'clients',
            home:false
        },
        {
            title:'Suppliers',
            icon:'book-outline',
            link:'suppliers',
            home:false
        },
        {
            title:'Products',
            icon:'archive-outline',
            link:'products',
            home:false
        },
        {
            title:'Invoices',
            icon:'file-text-outline',
            // link:'/main/invoices',
            home:false,
            expanded:true,
            children:[
                {
                    title:'Create Invoice',
                    icon:'plus-square-outline',
                    link : 'invoices/create-new',
                },
                {
                    title:'Invoices',
                    link:'invoices',
                    icon:'list-outline'
                }
            ]
        }
    ]
    constructor() { }

    ngOnInit(): void {
    }

}
