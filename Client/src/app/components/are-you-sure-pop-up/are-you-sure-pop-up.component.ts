import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-are-you-sure-pop-up',
  templateUrl: './are-you-sure-pop-up.component.html',
  styleUrls: ['./are-you-sure-pop-up.component.scss']
})
export class AreYouSurePopUpComponent {

  constructor(
    public dialogRef: MatDialogRef<AreYouSurePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}
