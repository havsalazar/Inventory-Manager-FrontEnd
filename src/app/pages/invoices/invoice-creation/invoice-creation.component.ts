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
    this.selectedClient = new Client()
  }
  createNewClient() {
    this.ref = this.dialogService.open(ClientDetailComponent, {
      data: {
        open_as: 'window',
        urlPath:'client'
      },
    });
    this.ref.onClose.subscribe((client:Client) => {
      if (client) {
           this.selectedClient = client
      }
  });
  }
}
