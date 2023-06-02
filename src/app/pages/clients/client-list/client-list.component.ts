import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/core/Services/general.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  dataAll: any[] = []
  selectedRow:any
  public routerPath='clients'
  constructor(
    private generalService: GeneralService,
    public router: Router,
  ) { }

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
