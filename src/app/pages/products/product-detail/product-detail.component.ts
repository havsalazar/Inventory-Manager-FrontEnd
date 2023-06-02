import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { FileUpload } from 'primeng/fileupload';
import { take } from 'rxjs';
import { GeneralService } from 'src/app/core/Services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  private apiURL = environment.serverURL
  public fileuploadUrl = this.apiURL + '/product/upload'
  positions = NbGlobalPhysicalPosition;
  private routerPath = 'products'
  uploadedFiles: any[] = [];
  detailForm = this.fb.group({
    id: [],
    code: [],
    name: ['', Validators.required],
    reference: [],
    price: [0, Validators.required],
    vat: [false],
    stockeable: [false],
    isService: [false],
    picture: [''],
    stock: this.fb.array([]),
  })
   constructor(
    public router: Router,
    public fb: FormBuilder,
    private toastrService: NbToastrService,
    private generalService: GeneralService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.generalService.getById(params['id']).subscribe(data => {
          const {stocks,...product}=data
          this.detailForm.patchValue({...product})
          this.onLoadData(stocks)
        })
        
      }
    })
  }

  onSubmit() {
    // console.log(this.fileUpload.files)
    if (this.fileUpload.files.length > 0) {
      this.fileUpload.upload()
    } else {
      this.submitForm()
    }
  }
  onFileUpload(event: any) {
    console.log(event.originalEvent.body)
    const fileName = event.originalEvent.body.filename
    this.detailForm.patchValue({ picture: fileName })
    this.submitForm()
  }
  submitForm() {
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
  getImage() {
    if (this.detailForm.controls.id.value && this.detailForm.controls.picture.value!=="" ) {
      
      return `${this.apiURL}/images/${this.detailForm.controls.picture.value}`
    } else {
      return `/assets/images/no_image_available.png`
    }
  }
  newStock() {
    this.getStocks.push(this.fb.group({
      label:[''],
      quantity:[0],
      id:[]
    }))  
  }
  removeSkill(i:number) {
    this.getStocks.removeAt(i);
  }
  onLoadData(stocks:any[]){
    for (let index = 0; index < stocks.length; index++) {
      const element = stocks[index];
      const label =element.label?element.label:''
      const quantity =element.quantity?element.quantity:0
      this.getStocks.push(this.fb.group({
        quantity:quantity,
        label:label,
        id:element.id
      }))  
    }
  }
  get getStocks() {
    return this.detailForm.controls["stock"] as FormArray;
  }
}
