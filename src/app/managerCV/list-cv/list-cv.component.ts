import { Component, OnInit } from '@angular/core';
import { ManagerCvServiceService } from '../manager-cv-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cv } from '../cv.interface';
import { CreateCvComponent } from '../create-cv/create-cv.component';
import { EditCvComponent } from '../edit-cv/edit-cv.component';
import { ResponseMessageComponent } from 'src/app/Message/response-message/response-message.component';


@Component({
  selector: 'app-list-cv',
  templateUrl: './list-cv.component.html',
  styleUrls: ['./list-cv.component.css']
})
export class ListCvComponent implements OnInit {

  CVs: cv[] = []

  constructor(
    private cvService: ManagerCvServiceService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getDataCv();
  }

  getDataCv() {
    this.cvService.getCVs()
      .subscribe((CVs: any) => {
        this.CVs = CVs
        console.log(CVs)
      })
  }

  deleteCV(id: number): void {
    this.cvService.deleteCV(id)
      .subscribe(() => {
        this.CVs = this.CVs.filter(CVs => CVs.ID !== id);
        this.toastr.success('deleted successfully', 'Notice');
        // console.log(this.toastr)
      });
  }
  openCreatePopup(): void {
    const modalRef = this.modalService.open(CreateCvComponent,{size: 'lg'} );
    
  }
  openEditPopup(id: number): void {
    const modalRef = this.modalService.open(EditCvComponent, {size: 'lg'});
    modalRef.componentInstance.cvId = id;
    
  }
  openMessagePopup(): void {
   const modalRef = this.modalService.open(ResponseMessageComponent);
   modalRef.closed
  }

  onchangeCheckBox(i: number): void {
    // console.log(i);
    // console.log(even);
   const modalRef = this.modalService.open(ResponseMessageComponent)
   modalRef.closed.subscribe((result) => {
    if(result === 'true') {
      console.log(result)
      if (this.statusCV(this.CVs[i].status) == false) {
        this.cvService.approveCV(this.CVs[i].ID).subscribe((response) => {
          // console.log(response);
          this.toastr.success('Approve Successfully', 'Notice');
          this.getDataCv();
        },(error) => {
          this.toastr.error('False Request','Warning');
          this.getDataCv();
        })
      } else {
        this.cvService.setStatusCV(this.CVs[i].ID).subscribe(response => {
          this.toastr.success('Cancel Successfully', 'Notice');
          this.getDataCv();
        },(error) => {
          this.toastr.error('False Request','Warning');
          this.getDataCv();
        })
      }
    } else {
      this.getDataCv()
    }
   })
  }

  statusCV(status: string): boolean {
    if (status == "Access") {
      return true;
    }
    return false;
  }
}
