import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA, MatList } from '@angular/material';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  Roles: string[] = ['NormalUser', 'TransportationProvider', 'HotelOwner'];
  constructor(
    public thisDialogRef: MatDialogRef<EditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  RoleSelected: any;
  ngOnInit() {}
  // Function to close the dialog window with accept changes
  onCloseConfirm() {
    this.thisDialogRef.close(this.RoleSelected);
  }
  // Function to close the dialog window with discard changes
  onCloseCancel() {
    this.thisDialogRef.close('undefined');
  }
}
