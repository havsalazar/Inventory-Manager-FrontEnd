import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { L10N_LOCALE } from 'angular-l10n';
import { GeneralService } from 'src/app/core/Services/general.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  dataAll: any[] = []
  selectedRow:any
  locale = inject(L10N_LOCALE);
  public routerPath='suppliers'
  constructor(
    private generalService: GeneralService,
    public router: Router,
  ) {  
  }

  ngOnInit() {
    this.getData()
  }
  getData(){
    return this.generalService.getPagginated().subscribe((data) => {
      this.dataAll = data
    })
  }
  createNew() {
    this.router.navigate([`/main/${this.routerPath}/detail`]);
  }
  loadDetail(event:any){
    this.router.navigate([`/main/${this.routerPath}/detail/${event.data.id}` ]);
  }
  searchGlobal(toSearch:any){
    if (toSearch){
      if(toSearch.length<3) return ;
      return this.generalService.searchGlobal(toSearch).subscribe((data) => {
        this.dataAll = data
      })
    }else{
      return this.getData()
    }    
  }
}
