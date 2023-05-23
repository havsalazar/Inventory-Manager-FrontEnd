import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  suppliers: any[] = []
  constructor(
    private supplierService: SupplierService,
    public router: Router,
  ) { }

  ngOnInit() {
    return this.supplierService.getSupplierPagginated().subscribe((data) => {
      this.suppliers = data
    })
  }
  createNewSupplier() {
    this.router.navigate(['/main/suppliers/supplier-detail/new']);
  }
}
