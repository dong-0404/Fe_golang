import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-response-message',
  templateUrl: './response-message.component.html',
  styleUrls: ['./response-message.component.css']
})
export class ResponseMessageComponent {

    constructor(private _NgbActiveModal: NgbActiveModal) {}

  get activeModal() {
    return this._NgbActiveModal;
  }
  closeModal(result: string) {
    this.activeModal.close(result);
  }

}
