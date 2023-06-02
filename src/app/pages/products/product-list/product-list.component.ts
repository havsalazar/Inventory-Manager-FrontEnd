import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/core/Services/general.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  dataAll: any[] = []
  selectedRow: any
  public routerPath = 'products'
  constructor(
    private generalService: GeneralService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getData()
  }
  getData() {
    setTimeout(()=>{
      return this.generalService.getPagginated().subscribe((data) => {
      this.dataAll = data
    })
    },100)
    
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
  requestDelete(id: string) {
    return this.generalService.delete(id).subscribe((data) => {
      this.getData()
    })
  }
  sumStocks(stocks: any[]) { 
    let sum = 0
    stocks.map(o=>sum+=o.quantity) 

    return sum
  }

}
