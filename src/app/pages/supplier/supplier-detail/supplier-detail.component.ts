import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { take } from 'rxjs';
import { GeneralService } from 'src/app/core/Services/general.service';


@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;
  private routerPath='suppliers' 
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private toastrService: NbToastrService,
    private generalService: GeneralService,
    private route: ActivatedRoute
  ) { }
  detailForm = this.fb.group({
    code: [''],
    id: [],
    name: ['', Validators.required],
    phone: [''],
    email: [''],
    address: ['']
  })
  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      if (params['id']) {
        this.generalService.getById(params['id']).subscribe(data => {
          this.detailForm.patchValue(data)
        })
      }
    })
  }
  onSubmit() {
    this.detailForm.markAllAsTouched();
    if (this.detailForm.valid) {
      const { id, ...values } = this.detailForm.value
      if (!id) {
        this.generalService.create(values).pipe(take(1)).subscribe((data: {}) => {
          this.toastrService.show('', 'Created', { position: this.positions.TOP_RIGHT, status: 'success' });
        });
      } else {
        this.generalService.update(id, values).pipe(take(1)).subscribe((data: {}) => {
          this.toastrService.show('', 'Updated', { position: this.positions.TOP_RIGHT, status: 'success' });
        });
      }
      this.router.navigate([`/main/${this.routerPath}/`]);
    }
  }
}
