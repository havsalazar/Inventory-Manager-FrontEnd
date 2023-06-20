import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/core/Services/general.service';
import { Client, identification_types as tp } from '../../clients/client.class';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientDetailComponent } from '../../clients/client-detail/client-detail.component';


@Component({
  selector: 'app-invoice-creation',
  templateUrl: './invoice-creation.component.html',
  styleUrls: ['./invoice-creation.component.scss'],
  providers: [DialogService]
})
export class InvoiceCreationComponent implements OnInit {

  ref: DynamicDialogRef;

  constructor(
    private generalService: GeneralService,
    public dialogService: DialogService,
    public router: Router,) {
  }
  public selectedClient: Client
  public clientList: Client[] = []
  public identificationTypes = tp
  public isSelectedClient=false
  public productSuggestions: any[] = []
  public selectedProduct: any;
  public products: any[] = []



  ngOnInit(): void {
  }
  searchClients(toSearch: any) {
    if (toSearch) {
      if (toSearch.length < 3) return;
      return this.generalService.searchGlobal(toSearch, 'client').subscribe((data) => {
        this.clientList = data
      })
    } else {
      return
    }
  }
  clearSearch() {
    this.isSelectedClient=false
    this.selectedClient = new Client()
  }
  createNewClient() {
    this.ref = this.dialogService.open(ClientDetailComponent, {
      data: {
        open_as: 'window',
        urlPath: 'client'
      },
    });
    this.ref.onClose.subscribe((client: Client) => {
      if (client) {
        this.selectedClient = client
      }
    });
  }
  searchItem(toSearch: any) {
    if (toSearch) {
      if (toSearch.length < 3) return;
      return this.generalService.searchGlobal(toSearch, 'product').subscribe((data) => {
        this.productSuggestions = data
      })
    } else {
      return
    }
  }
  addItem(item: any) {
    const sumQTY = (arr: any[]):number => arr.reduce((x, y) => x.quantity + y.quantity)
    this.products.push({ ...item ,qty:1,max: sumQTY(item.stocks) })
    this.selectedProduct = {}
  }
  getTotalProducts():number{
    let total=0
    for (let index = 0; index < this.products.length; index++) {
      const element = this.products[index];
      total+=element.price*element.qty      
    }
    return total
  }
  alterQuantity( $event:any,product:any){
    console.log($event.value)

  }
  getSubtotalProducts():number{
    let subtotal=0
    for (let index = 0; index < this.products.length; index++) {
      const element = this.products[index];
      subtotal+=element.price*element.qty      
    }
    return subtotal
  }
}
