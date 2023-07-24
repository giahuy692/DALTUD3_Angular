import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOUser } from '../../share/dtos/DTOUser';
import { layoutService } from '../../share/services/layout.service';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.scss'],
})
export class ManagerUserComponent implements OnInit {
  @ViewChild('drawer') drawerRef: DrawerComponent;
  public loading = false;
  public pageSize = 5;
  public buttonCount = 3;
  public sizes = [10, 20, 50];
  public form: FormGroup;
  OptionList = [
    {
      text: 'EDIT',
      iconClass: 'k-icon k-i-edit',
      type: 1,
    },
    {
      text: 'DELETE',
      iconClass: 'k-icon k-i-delete',
      type: 2,
    },
  ];
  UserList: DTOUser[] = []; // Biến chưa userlist cho grid
  currentUser = new DTOUser();
  constructor(private api: ShopApiService, private layout: layoutService) {
    this.form = new FormGroup({
      _id: new FormControl(this.currentUser._id, [Validators.required]),
      UserName: new FormControl(this.currentUser.UserName, [
        Validators.required,
      ]),
      Email: new FormControl(this.currentUser.Email, [
        Validators.required,
        Validators.email,
      ]),
      Password: new FormControl(this.currentUser.Password, [
        Validators.required,
      ]),
      Address: new FormControl(this.currentUser.Address),
      Phone: new FormControl(this.currentUser.Phone),
      isAdmin: new FormControl(this.currentUser.isAdmin),
    });
  }

  ngOnInit(): void {
    this.GetListUser();
  }

  // Function xử lý logic chức năng search
  keyword: string = '';
  handleSearch() {
    this.FindUser(this.keyword);
  }

  onUpdateUser() {
    this.UpdateUser(this.form.value);
  }

  onItemClickTools(itemClick: any, dtoUser: DTOUser) {
    this.currentUser = dtoUser;
    switch (itemClick.type) {
      case 1:
        this.form.patchValue(this.currentUser);
        this.drawerRef.toggle();
        break;
      case 2:
        this.openedDialog = true;
        break;
    }
  }

  //#region dialog
  openedDialog = false;
  handleActionDialog(status: number) {
    if (status == 1) {
      this.DeleteUser(this.currentUser);
      this.openedDialog = false;
    } else {
      this.openedDialog = false;
    }
  }
  //#endregion

  //#region function call api

  GetListUser() {
    this.loading = true;
    this.api.GetAllUser().subscribe(
      (v: any) => {
        this.UserList = v.user;
        this.loading = false;
      },
      (error) => {
        this.layout.showError(error);
        this.loading = false;
      }
    );
  }

  UpdateUser(dto: DTOUser) {
    this.loading = true;
    this.api.UpdateUser(dto).subscribe(
      (v: any) => {
        // Duyệt qua mảng UserList
        for (let i = 0; i < this.UserList.length; i++) {
          // Tìm kiếm User có cùng _id với DTOUser vừa cập nhật
          if (this.UserList[i]._id === v._id) {
            // Thay thế User cũ bằng DTOUser mới
            this.UserList[i] = v;
            break; // Dừng vòng lặp sau khi tìm thấy User cần cập nhật
          }
        }
        this.layout.showSuccess('Update user successful!');
        this.drawerRef.toggle();
        this.loading = false; // Kết thúc quá trình cập nhật, ẩn loading nếu có
      },
      (error) => {
        this.layout.showError(error.error.message);
        this.loading = false;
      }
    );
  }

  FindUser(keyword: string) {
    this.loading = true;
    this.api.FindUser(keyword).subscribe(
      (v: any) => {
        this.UserList = v;
        this.loading = false;
      },
      (error) => {
        this.layout.showError('Error while searching for user!'); // Xử lý lỗi nếu có
        this.loading = false;
      }
    );
  }

  GetUser(dto: DTOUser) {
    this.api.GetUser(dto).subscribe(
      (v: DTOUser) => {
        this.currentUser = v;
      },
      (error) => {
        this.layout.showError(error); // Xử lý lỗi nếu có
        this.loading = false;
      }
    );
  }

  DeleteUser(dto: DTOUser) {
    this.api.DeleteUser(dto).subscribe(
      (v) => {
        this.GetListUser();
        this.layout.showSuccess(v.message);
      },
      (error) => {
        this.layout.showError(error); // Xử lý lỗi nếu có
        this.loading = false;
      }
    );
  }

  //#endregion
}
