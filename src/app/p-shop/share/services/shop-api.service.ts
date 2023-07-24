import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DTOProduct } from '../dtos/DTOProduct';
import { DTOUser } from '../dtos/DTOUser';
import { DTOOrder } from '../dtos/DTOOrder';
import { AuthService } from './auth.service';
import { DTOCategory } from '../dtos/DTOCategory';
import { DTOTransaction } from '../dtos/DTOTransaction';

@Injectable({
  providedIn: 'root',
})
export class ShopApiService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  //#region product
  // API lấy tất cả các sản phẩm
  GetListProduct(page?: number, pageSize?: number, sort?: string) {
    let a = {
      page: page,
      pageSize: pageSize,
      sort: sort,
    };

    return new Observable<any>((obs) => {
      this.http.post('http://localhost:3000/api/GetListProduct', a).subscribe(
        (res) => {
          obs.next(res);
          obs.complete();
        },
        (error) => {
          obs.error(error);
          obs.complete();
        }
      );
    });
  }

  //API lấy chi tiết một sản phẩm
  GetProduct(id: string) {
    let a = {
      _id: id,
    };
    return new Observable<DTOProduct>((obs) => {
      this.http
        .post<DTOProduct>(`http://localhost:3000/api/GetProduct`, a)
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Thêm sản phẩm mới - chỉ là thêm giả sản phẩm và sẽ không có sản phẩm náo thực sự được tạo mới trong database
  // Cần truyền 1 dự liệu dưới dạng object - api trả về một đối tượng được thêm mới
  CreateProduct(dto: DTOProduct) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });

    return new Observable<DTOProduct>((obs) => {
      this.http
        .post<any>(`http://localhost:3000/api/CreateProduct`, dto, { headers })
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Cập nhật sản phẩm lưu ý cũng là api giả cập nhật nên cũng sẽ không có data nào thực sự được cập nhật trong data base
  // api trả về đối tượng được cập nhật
  UpdateProduct(dataObject: DTOProduct) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });

    return new Observable<DTOProduct>((obs) => {
      this.http
        .put<DTOProduct>(
          `http://localhost:3000/api/UpdateProduct`,
          dataObject,
          { headers }
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  DeleteProduct(dataObject: DTOProduct) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOProduct>((obs) => {
      this.http
        .post<DTOProduct>(
          `http://localhost:3000/api/DeleteProduct`,
          dataObject,
          { headers }
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  GetProductByCategoryID(CatalogId: string) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .post<DTOProduct>(`http://localhost:3000/api/DeleteProduct`, CatalogId)
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  FindProduct(ProductName: string) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOProduct>((obs) => {
      this.http
        .post<DTOProduct>(
          `http://localhost:3000/api/FindProduct`,
          ProductName,
          { headers }
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  //#endregion

  //#region category
  // Lấy tất cả categories của sản phẩm
  GetListCategory() {
    return new Observable<DTOCategory>((obs) => {
      this.http
        .post<DTOCategory>(`http://localhost:3000/api/GetListCategory`, {})
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Lấy tất cả các sản phẩm cùng loại
  GetCategory(dto: DTOCategory) {
    return new Observable<DTOCategory>((obs) => {
      this.http
        .post<DTOCategory>(`http://localhost:3000/api/GetCategory`, dto)
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  CreateCategory(dataObject: DTOCategory) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOCategory>((obs) => {
      this.http
        .post<DTOCategory>(
          `http://localhost:3000/api/CreateCategory`,
          dataObject,
          {
            headers,
          }
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  UpdateCategory(dataObject: DTOCategory) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOCategory>((obs) => {
      this.http
        .post<DTOCategory>(
          `http://localhost:3000/api/UpdateCategory`,
          dataObject,
          {
            headers,
          }
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  DeleteCategory(dataObject: DTOCategory) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOCategory>((obs) => {
      this.http
        .post<DTOCategory>(
          `http://localhost:3000/api/DeleteCategory`,
          dataObject,
          {
            headers,
          }
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  //#endregion

  //#region Users
  // API lấy tất cả user của hệ thống
  GetAllUser() {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOUser>((obs) => {
      this.http
        .post<DTOUser>(
          `http://localhost:3000/api/GetAllUser`,
          {},
          {
            headers,
          }
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Lấy chi tiết về user nào đó theo id, cần truyền id cho api này.
  GetUser(dto: DTOUser) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOUser>((obs) => {
      this.http
        .post<DTOUser>(`http://localhost:3000/api/GetAllUser`, dto, {
          headers,
        })
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  UpdateUser(dto: DTOUser) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOUser>((obs) => {
      this.http
        .post<DTOUser>(`http://localhost:3000/api/UpdateUser`, dto, {
          headers,
        })
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  DeleteUser(dto: DTOUser) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<any>((obs) => {
      this.http
        .post<DTOUser>(`http://localhost:3000/api/DeleteUser`, dto, { headers })
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  FindUser(UserName: string) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    let keyword = {
      UserName: UserName,
    };
    return new Observable<DTOUser>((obs) => {
      this.http
        .post<DTOUser>(`http://localhost:3000/api/FindUser`, keyword, {
          headers,
        })
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }
  //#endregion

  //#region login
  UserLogin(email: string, password: string) {
    var account = {
      Email: email,
      Password: password,
    };
    return new Observable<DTOUser>((obs) => {
      this.http
        .post<any>(
          `http://localhost:3000/api/Login`,
          account // Đưa đối tượng account vào JSON.stringify
        )
        .subscribe(
          (res) => {
            this.authService.setAccessToken(res.accessToken);
            localStorage.setItem('token', res.accessToken);
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  Register(dto: DTOUser) {
    return new Observable<DTOUser>((obs) => {
      this.http
        .post<DTOUser>(
          `http://localhost:3000/api/Register`,
          dto // Đưa đối tượng account vào JSON.stringify
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  Logout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    localStorage.removeItem('token');
    return new Observable<any>((obs) => {
      this.http
        .post<any>(`http://localhost:3000/api/Logout`, {}, { headers })
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  //#endregion

  //#region Cart

  // API lấy tất cả giỏ hàng
  GetListOrder() {
    return new Observable<DTOOrder>((obs) => {
      this.http
        .post<DTOOrder>(`http://localhost:3000/api/GetListOrder`, {})
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Lấy chi tiết của một giỏ hàng
  GetOrder(dto: DTOOrder) {
    return new Observable<DTOOrder>((obs) => {
      this.http
        .post<DTOOrder>(`http://localhost:3000/api/GetOrder`, dto)
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Lấy số lượng giỏ hảng theo số lượng mong muốn
  CreateOrder(dto: DTOOrder) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOOrder>((obs) => {
      this.http
        .post<DTOOrder>(`http://localhost:3000/api/CreateOrder`, dto, {
          headers,
        })
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  UpdateOrder(dto: DTOOrder) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOOrder>((obs) => {
      this.http
        .post<DTOOrder>(`http://localhost:3000/api/UpdateOrder`, dto, {
          headers,
        })
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  DeleteOrder(dto: DTOOrder) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOOrder>((obs) => {
      this.http
        .post<DTOOrder>(`http://localhost:3000/api/DeleteOrder`, dto, {
          headers,
        })
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  CreateTransaction(dto: DTOTransaction) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOTransaction>((obs) => {
      this.http
        .post<DTOTransaction>(
          `http://localhost:3000/api/CreateTransaction`,
          dto,
          {
            headers,
          }
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  DeleteTransaction(dto: DTOTransaction) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOTransaction>((obs) => {
      this.http
        .post<DTOTransaction>(
          `http://localhost:3000/api/DeleteTransaction`,
          dto,
          {
            headers,
          }
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  UpdateStatusTransaction(dto: DTOTransaction) {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOTransaction>((obs) => {
      this.http
        .post<DTOTransaction>(
          `http://localhost:3000/api/UpdateStatusTransaction`,
          dto,
          {
            headers,
          }
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  GetListTransaction() {
    let token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: 'Bearer ' + token,
    });
    return new Observable<DTOTransaction>((obs) => {
      this.http
        .post<DTOTransaction>(
          `http://localhost:3000/api/GetListTransaction`,
          {}
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  GetTransaction(dto: DTOTransaction) {
    return new Observable<DTOTransaction>((obs) => {
      this.http
        .post<DTOTransaction>(`http://localhost:3000/api/GetTransaction`, dto)
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }
  //#endregion
}
