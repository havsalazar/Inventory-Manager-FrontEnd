import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbSelectComponent, NbToastrService } from '@nebular/theme';
import { take } from 'rxjs';
import { GeneralService } from 'src/app/core/Services/general.service';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  providers: []
})
export class ClientDetailComponent implements OnInit {
  positions = NbGlobalPhysicalPosition;
  private routerPath = 'clients'
  identificationTypes = [
    { id: 3, name: 'Cédula de ciudadanía' },
    { id: 1, name: 'Registro civil de nacimiento' },
    { id: 2, name: 'Tarjeta de identidad' },
    { id: 4, name: 'Tarjeta de extranjería' },
    { id: 5, name: 'Cédula de extranjería' },
    { id: 6, name: 'NIT' },
    { id: 7, name: 'Pasaporte' },
    { id: 8, name: 'Tipo de documento extranjero' },
  ]

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private toastrService: NbToastrService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    public ref: DynamicDialogRef,
    private dialogConf: DynamicDialogConfig
  ) {

  }
  detailForm = this.fb.group({
    id: [],
    fullName: ['', Validators.required],
    plate: [''],
    identification_type: [3],
    identification_number: [''],
    email: [''],
    phone: ['']
  })
  public detailId:string=''
  ngOnInit(): void {
    console.log(this.dialogConf.data)
    this.detailId = this.dialogConf.data.id ? this.dialogConf.data.id : null
    if (this.detailId) {
      this.generalService.getById(this.detailId).subscribe(data => {
        this.detailForm.patchValue(data)
      })
    }
    // this.route.params.subscribe(params => {
    //   if (params['id']) {
    //     this.generalService.getById(params['id']).subscribe(data => {
    //       this.detailForm.patchValue(data)

    //     })
    //   } else {
    //     setTimeout(() => this.detailForm.controls.identification_type.setValue(3), 1000);
    //   }
    // })
  }
  onSubmit() {
    this.detailForm.markAllAsTouched();
    if (this.detailForm.valid) {
      const { id, ...values } = this.detailForm.value
      if (!id) {
        this.generalService.create(values, 'client').pipe(take(1)).subscribe((data: {}) => {
          // this.toastrService.show('', 'Created', { position: this.positions.TOP_RIGHT, status: 'success' });
          this.showToast('Created')
          this.returnData(data)
        });
      } else {
        this.generalService.update(id, values).pipe(take(1)).subscribe((data: {}) => {
          // this.toastrService.show('', 'Updated', { position: this.positions.TOP_RIGHT, status: 'success' });
          this.showToast('Updated')
          this.returnData()
        });
      }

    }
  }
  showToast(text: string) {
    this.toastrService.show('', text, { position: this.positions.TOP_RIGHT, status: 'success' });
  }
  returnData(data: any = null) {
    if (this.dialogConf.data) {
      this.ref.close(data)
    } else {
      this.router.navigate([`/main/${this.routerPath}/`]);
    }
  }
}
