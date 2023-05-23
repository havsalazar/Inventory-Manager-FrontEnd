import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupplierService } from '../supplier.service';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbPopoverDirective, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {
  
  positions = NbGlobalPhysicalPosition;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private toastrService: NbToastrService,
    private supplierService: SupplierService, 

  ) { }
  supplierForm = this.fb.group({
    code: [''],
    name: ['', Validators.required],
    phone: [''],
    email: [''],
    address: ['']
  })
  ngOnInit(): void {
 
  }
  onSubmit() {
    this.supplierForm.markAllAsTouched();
    if (this.supplierForm.valid) {
      this.supplierService.createSupplier(this.supplierForm.value).subscribe((data: {}) => {
        this.toastrService.show('','Created',{position:this.positions.TOP_RIGHT, status:'success'});
        this.router.navigate(['/main/suppliers/']);
      });
    }
  }
}
