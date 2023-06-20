import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from 'src/app/core/Services/general.service';
import { ClientDetailComponent } from '../client-detail/client-detail.component';
import { Client } from '../client.class';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  providers: [DialogService]
})
export class ClientListComponent implements OnInit {

  dataAll: any[] = []
  selectedRow:any
  ref: DynamicDialogRef;
  public routerPath='clients'
  constructor(
    private generalService: GeneralService,
    public dialogService: DialogService,
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
    // this.router.navigate([`/main/${this.routerPath}/detail`]);
    this.openDialog()
  }
  loadDetail(event:any){
    // this.router.navigate([`/main/${this.routerPath}/detail/${event.data.id}` ]);
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
  openDialog(id:string='') {
    this.ref = this.dialogService.open(ClientDetailComponent, {
      data: {
        id ,
        open_as: 'window',
        urlPath: 'client'
      },
    });
    this.ref.onClose.subscribe((client: Client) => {
      this.getData()
    });
  }
}
