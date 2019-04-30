import { Component, OnInit } from '@angular/core';
import { PackageService } from 'src/app/Modules/admin/admin-package-management/service/package.service';
import { UpdateChangeRole } from 'src/app/Models/update-change-role';
// tslint:disable-next-line:max-line-length
import {
  MatDialog,
  MatProgressSpinner,
  MatTooltipModule,
  MatSnackBar,
  MatDialogRef,
  MatProgressBarModule,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material';
import { EditRoleComponent } from 'src/app/Modules/admin/admin-user-management/edit-role/edit-role.component';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {
  RoleNames = [];
  role: string;
  dialogResult: any;
  wait: boolean;
  public Array = [];
  changeRole = [];
  // tslint:disable-next-line:max-line-length
  constructor(
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private httpservices: PackageService,
    private rolechange: UpdateChangeRole
  ) {}
// In ngOnInit get list of user details
  ngOnInit() {
    this.wait = true;
    this.httpservices.makeGetRequest().subscribe(
      (data: any) => {
        this.wait = false;
        this.Array = data;
      },
      error => {}
    );
  }
  // Function to open the Dialog Box to change the role
  openDialog(i) {
    this.rolechange.Id = this.Array[i].Id;
    const name = this.Array[i].FirstName + this.Array[i].LastName;
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.autoFocus = true;

    const viewDailogBox = this.dialog.open(EditRoleComponent, addDialogConfig);
    viewDailogBox.afterClosed().subscribe(
      result => {
        this.rolechange.NewRole = `${result}`;
        if (this.rolechange.NewRole !== 'undefined') {
          this.httpservices.makePutRequest(this.rolechange).subscribe(data => {
            this.ngOnInit();
            this.snackBar.open(name, 'Role is updated', { duration: 4000 });
          });
        }
      },
      error => {
        console.log('error');
      }
    );
  }
}
