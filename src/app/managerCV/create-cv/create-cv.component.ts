import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private toarst: ToastrService,
    private fb: FormBuilder,
    private cvService: ManagerCvServiceService
  ) {
    this.CvForm = this.fb.group({
      full_name: ['', Validators.required],
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
        // setTimeout(()=> {
        //   location.reload();
        // }, 1000);
      },
      (error) => {
        this.toarst.error('Can not create new cv', 'Error');
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
  }

}
