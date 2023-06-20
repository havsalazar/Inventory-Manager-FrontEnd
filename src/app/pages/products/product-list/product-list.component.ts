import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/core/Services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProductListComponent implements OnInit {
  dataAll: any[] = []
  selectedRow: any
  public routerPath = 'products'
  constructor(
    private generalService: GeneralService,
    public router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getData()
  }
  getData() {
    setTimeout(() => {
      return this.generalService.getPagginated().subscribe((data) => {
        this.dataAll = data
      })
    }, 100)

  }
  createNew() {
    this.router.navigate([`/main/${this.routerPath}/detail`]);
  }
  loadDetail(event: any) {
    this.router.navigate([`/main/${this.routerPath}/detail/${event.data.id}`]);
  }
  searchGlobal(toSearch: any) {
    if (toSearch) {
      if (toSearch.length < 3) return;
      return this.generalService.searchGlobal(toSearch).subscribe((data) => {
        this.dataAll = data
      })
    } else {
      return this.getData()
    }
  }
  requestDelete(event: Event, id: string) { 
    this.confirmationService.close()
    this.confirmationService.confirm({      
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        return this.generalService.delete(id).subscribe((data) => {
          this.getData()
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'The item has been deleted' })
        })
      },

    })
    // return this.generalService.delete(id).subscribe((data) => {
    //   this.getData()
    // })
  }
  sumStocks(stocks: any[]) { 
    return (stocks.reduce((x,y)=>x+y.quantity,0)) 
  }

}
