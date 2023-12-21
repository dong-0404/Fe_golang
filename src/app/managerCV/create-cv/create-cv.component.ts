import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerCvServiceService } from '../manager-cv-service.service';


@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCvComponent {
  CvForm!: FormGroup;
  PersonalInfo!: FormGroup;
  PersonalEducation!: FormGroup;
  PersonalProject!: FormGroup;

  formErrors : {[key:string]:any}= {
    'full_name': '',
    'email': '',
    'phone': '',
    'address': '',  
    'job_id': '',
    'university': '',
    'language': '',
    'grade': '',
    'skill': '',
    'source': '',
  };
  validationMessages : {[key:string]:any} = {
    'full_name': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email should be gmail.com'
    },
    'phone': {
      'required': 'phone is required.',
    },
    'address': {
      'required': 'address is required.',
    },
    'job_id': {
      'required': 'job_id is required.',
    },
    'university': {
      'required': 'university is required.',
    },
    'language': {
      'required': 'language is required.',
    },
    'grade': {
      'required': 'bank_account_info is required.',
    },
    'skill': {
      'required': 'joining_date is required.',
    },
    'source': {
      'required': 'source is required.',
    },
  };


  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private toarst: ToastrService,
    private fb: FormBuilder,
    private cvService: ManagerCvServiceService
  ) {
    this.CvForm = this.fb.group({
      full_name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      job_id: ['', Validators.required],
      PersonalInfo:this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.maxLength(11)]],
        address: ['', [Validators.required]],
      }),
      PersonalEducation: this.fb.group({
        university: ['', Validators.required],
        language: [''],
        grade: ['', Validators.required]
      }),
      PersonalProject: this.fb.group({
        skill: ['', Validators.required],
        source: ['', Validators.required],
      })
    })
  }



  get activeModal() {
    return this._NgbActiveModal;
  }

  onSubmit(): void{
    if(this.CvForm.invalid) {
      return;
    }
    const CvData = this.CvForm.value;
      console.log(CvData);
      this.cvService.createCV(CvData).
      subscribe((response) => {
        console.log(response);
        this.toarst.success('Created Successfully', 'Notice!');
        setTimeout(()=> {
          location.reload();
        }, 1000);
      },
      (error) => {
        this.toarst.error('Can not create new cv', 'Error');
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
  }
  logValidationError(group: FormGroup = this.CvForm):void {
    Object.keys(group.controls).forEach((key : string) => {
      const abstractControl = group.get(key);
// kiem tra abstractControl co phai la 1 the hien cua group khong
      if(abstractControl instanceof FormGroup) {
        this.logValidationError(abstractControl);
      } else {
        this.formErrors[key] = '';
        if(abstractControl && !abstractControl.valid && 
          (abstractControl.touched || abstractControl.dirty)) {
          const message = this.validationMessages[key];

          for(const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += message[errorKey] + ' ';
            }
          }
        }
      }
    }) 
  }
 



}
