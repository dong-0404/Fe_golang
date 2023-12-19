import { Component, OnInit } from '@angular/core';
import { ManagerCvServiceService } from '../manager-cv-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cv } from '../cv.interface';
import { CreateCvComponent } from '../create-cv/create-cv.component';
import { EditCvComponent } from '../edit-cv/edit-cv.component';

@Component({
  selector: 'app-list-cv',
  templateUrl: './list-cv.component.html',
  styleUrls: ['./list-cv.component.css']
})
export class ListCvComponent implements OnInit {

  CVs : cv[] = []

  constructor(
    private cvService: ManagerCvServiceService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cvService.getCVs()
    .subscribe((CVs: any) => {
      this.CVs = CVs
      console.log(CVs)
    })
  }
  deleteCV(id:number): void {
    this.cvService.deleteCV(id)
    .subscribe(() => {
      this.CVs = this.CVs.filter(CVs => CVs.ID !== id);
      this.toastr.success('deleted successfully', 'Notice');
      // console.log(this.toastr)
    });
  }
  openCreatePopup() :void{
        const modalRef = this.modalService.open(CreateCvComponent);
  }
  openEditPopup(id: number): void {
    const modalRef = this.modalService.open(EditCvComponent);
    modalRef.componentInstance.cvId = id;
  }
  
}
