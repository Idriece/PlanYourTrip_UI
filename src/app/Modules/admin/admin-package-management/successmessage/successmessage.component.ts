import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatIcon,
  MatButton,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'app-successmessage',
  templateUrl: './successmessage.component.html',
  styleUrls: ['./successmessage.component.scss']
})
export class SuccessmessageComponent implements OnInit {
  list = [];
  constructor(
    public thisDialogRef: MatDialogRef<SuccessmessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.list = this.data;
  }
  closeDialog() {
    this.thisDialogRef.close();
  }
}
