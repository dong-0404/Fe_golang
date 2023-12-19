import { Component } from '@angular/core';
import { cv } from '../cv.interface';
import { ActivatedRoute } from '@angular/router';
import { ManagerCvServiceService } from '../manager-cv-service.service';


@Component({
  selector: 'app-cv-detail',
  templateUrl: './cv-detail.component.html',
  styleUrls: ['./cv-detail.component.css']
})
export class CvDetailComponent {
  CV: cv | undefined;

  constructor(
    private route: ActivatedRoute,
    private cvService: ManagerCvServiceService
    ) {}

    ngOnInit() :void {
      this.route.paramMap.subscribe(params => {
        const cvId = parseInt(params.get('id') || '', 10);
        if(!isNaN(cvId)) {
          this.cvService.getCVById(cvId).subscribe((Cv:any) =>{
            this.CV = Cv.data;
            console.log(this.CV)
          })
        }
      })
    }
}
