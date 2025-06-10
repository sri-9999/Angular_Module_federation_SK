import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthResponse } from '../../models/auth-response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements AfterViewInit {

  constructor(private builder: FormBuilder, private service: AuthService, private dialog: MatDialog, private toastr: ToastrService) {
    this.LoadUser();
  }

  dataSource: MatTableDataSource<AuthResponse> = new MatTableDataSource<AuthResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['username', 'email', 'status', 'role', 'action'];

  ngAfterViewInit(): void {

  }
  LoadUser() {
    let userList;
    console.log('Loading user data...');
    // Api call to get user data from REST endpoint
    this.service.getAllUsers().subscribe(res => {
      const usersWithUIProps = res.map((user: any) => ({
        ...user,
        roleChanged: false,
        newRole: ''
      }));
      this.dataSource = new MatTableDataSource<AuthResponse>(usersWithUIProps);
      console.log('User data loaded:', res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onRoleChange(element: any, newRole: string) {
    if (element.role !== newRole) {
      element.roleChanged = true;
      element.newRole = newRole; // Store the pending role
    } else {
      // User selected the original role again
      element.roleChanged = false;
      element.newRole = '';
      // Optionally, if you want to reset the popup state as well:
      this.showDialog = false;
      this.dialogElement = null;
    }
  }

  showDialog = false;
  dialogElement: any = null;

  updateuser(element: any) {
    this.dialogElement = element;
    this.showDialog = true;
  }


  confirmYes() {
    if (this.dialogElement) {
      this.dialogElement.role = this.dialogElement.newRole; // Apply the change
      this.dialogElement.roleChanged = false;
      this.dialogElement.newRole = '';
      this.dialogElement.active = true;
      // Optionally, call your backend update here
      this.service.updateUser(this.dialogElement).subscribe(res => {
        if (res) {
          this.toastr.success('User updated successfully');
          this.LoadUser(); // Reload the user list
        } else {
          this.toastr.error('Failed to update user');
        }
      });
    }
    this.closeDialog();
  }

  closeDialog() {
    this.showDialog = false;
    this.dialogElement = null;
  }

}
