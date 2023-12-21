import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { cv } from '../cv.interface';
import { ManagerCvServiceService } from '../manager-cv-service.service';
import { ListCvComponent } from '../list-cv/list-cv.component';


@Component({
  selector: 'app-edit-cv',
  templateUrl: './edit-cv.component.html',
  styleUrls: ['./edit-cv.component.css']
})
export class EditCvComponent implements OnInit {
  CvForm!: FormGroup;
  PersonalInfo!: FormGroup;
  PersonalEducation!: FormGroup;
  PersonalProject!: FormGroup;
  @Input() cvId!:number;
  updateCV: cv |undefined

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _NgbActiveModal: NgbActiveModal,
    private cvService: ManagerCvServiceService,

  ) {
    this.CvForm = this.fb.group({
      DataCv : this.fb.group({
        full_name: [''],
      job_id: [''],
      }),
      DataInfo:this.fb.group({
        email: ['', [Validators.email]],
        phone: ['', [Validators.maxLength(11)]],
        address: [''],
      }),
      DataEducation: this.fb.group({
        university: [''],
        language: [''],
        grade: ['']
      }),
      DataProject: this.fb.group({
        skill: [''],
        source: [''],
      })
    })
  }
  
  ngOnInit(): void {

      if(!isNaN(this.cvId)) {
        this.cvService.getCVById(this.cvId).subscribe((cv:any)=> {
          // console.log(cv.data);
          // console.log(this.CvForm);
          this.updateCV = cv.data;
          this.CvForm.controls["DataCv"].patchValue(this.updateCV);
          this.CvForm.controls["DataEducation"].patchValue(this.updateCV?.PersonalEducation);
          this.CvForm.controls["DataInfo"].patchValue(this.updateCV?.PersonalInfo);
          this.CvForm.controls['DataProject'].patchValue(this.updateCV?.PersonalProject);
        })
      }

  }

  get activeModal() {
    return this._NgbActiveModal;
  }
  
  onSubmit():void {
    if(this.CvForm.invalid) {
      return;
    }
    const updateCvData = this.CvForm.value;
    // console.log(updateCvData)
    this.cvService.updateCV(this.cvId,updateCvData).subscribe(response => {
      // console.log(response)
      this.toastr.success('update successfully','Notice');
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
  }
}
