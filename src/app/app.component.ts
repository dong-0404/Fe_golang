import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fe_angular';

  constructor(private toastr:ToastrService) {}

  showanimation() {
    console.log(1);
    this.toastr.success('deleted successfully', 'Notice');

  }
}
