import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DTOProduct } from '../dtos/DTOProduct';
import { DTOUser } from '../dtos/DTOUser';
import { DTOCart } from '../dtos/DTOCart';

@Injectable({
  providedIn: 'root',
})
export class ShopApiService {
  constructor(private http: HttpClient) {}

  //#region product
  // API lấy tất cả các sản phẩm
  getListProduct(page?: number, pageSize?: number, sort?: string) {
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
  getProduct(id: string) {
    let a = {
      id: id,
    };
    return new Observable<DTOProduct>((obs) => {
      this.http
        .post<DTOProduct>(`http://localhost:3000/api/GetProduct/${id}`, a)
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

  // Lấy danh sách sản phẩm theo phân trang
  getListProductLimit(limit: number) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .get<DTOProduct>(`https://fakestoreapi.com/products?limit=${limit}`)
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

  // Lấy danh sách được sắp xếp theo chiều tăng/giảm dần 'desc'(giảm) or 'asc'(tăng)
  getListProductSort(value: string) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .get<DTOProduct>(`https://fakestoreapi.com/products?sort=${value}`)
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
  AddNewProduct(dto: any) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .post<any>(`http://localhost:3000/api/CreateProduct`, dto)
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
  UpdateAProduct(id: string, dataObject: any) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .put<DTOProduct>(
          `https://fakestoreapi.com/products/${id}`,
          JSON.stringify(dataObject)
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

  DeleteProduct(dataObject: any) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .post<DTOProduct>(`http://localhost:3000/api/DeleteProduct`, dataObject)
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
  getAllCategories() {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .get<any>(`https://fakestoreapi.com/products/categories`)
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
  GetProductsInASpecificCategory(category: string) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .get<DTOProduct>(
          `https://fakestoreapi.com/products/category/${category}`
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
  GetAllUsers() {
    return new Observable<DTOUser>((obs) => {
      this.http.get<DTOUser>('https://fakestoreapi.com/users').subscribe(
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
  GetASingleUser(id: string) {
    return new Observable<DTOUser>((obs) => {
      this.http.get<DTOUser>(`https://fakestoreapi.com/users/${id}`).subscribe(
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

  // Api lấy số lượng user mong muốn, cần truyền số lượng muốn lấy
  LimitResultsUser(limit: number) {
    return new Observable<DTOUser>((obs) => {
      this.http
        .get<DTOUser>(`https://fakestoreapi.com/users?limit=${limit}`)
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

  // API lấy sắp xếp user theo truyền tăng dần và giảm dần, cần truyền cho api này giá trị 'desc' hoặc 'asc'
  SortResultsUser(sort: number) {
    return new Observable<DTOUser>((obs) => {
      this.http
        .get<DTOUser>(`https://fakestoreapi.com/users?sort=desc`)
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

  UpdateAUsers(id: string, dataObject: DTOUser) {
    return new Observable<DTOUser>((obs) => {
      this.http
        .put<DTOUser>(
          `https://fakestoreapi.com/users/${id}`,
          JSON.stringify(dataObject)
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

  DeleteAUser(id: string) {
    return new Observable<DTOUser>((obs) => {
      this.http
        .delete<DTOUser>(`https://fakestoreapi.com/users/${id}`)
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
    return new Observable<any>((obs) => {
      this.http
        .post<any>(
          `http://localhost:3000/api/Login`,
          account // Đưa đối tượng account vào JSON.stringify
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

  //#region Cart

  // API lấy tất cả giỏ hàng
  GetAllCarts() {
    return new Observable<DTOCart>((obs) => {
      this.http.get<DTOCart>(`https://fakestoreapi.com/carts`).subscribe(
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
  GetASingleCart(id: string) {
    return new Observable<DTOCart>((obs) => {
      this.http.get<DTOCart>(`https://fakestoreapi.com/carts/${id}`).subscribe(
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
  LimitResultsCart(limit: number) {
    return new Observable<DTOCart>((obs) => {
      this.http
        .get<DTOCart>(`https://fakestoreapi.com/carts?limit=${limit}`)
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

  // API sắp xếp giỏ hàng theo chiều giảm dần/tăng dần sort(asc|desc)
  SortResultsCart(sort: string) {
    return new Observable<DTOCart>((obs) => {
      this.http
        .get<DTOCart>(`'https://fakestoreapi.com/carts?sort=${sort}`)
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

  // API lấy giỏ hảng từ ngày nào ddeesne ngày nào, có thể chuyền thêm limit(number) và  và sort(asc|desc)
  GetCartsInADateRange(
    startdate: string,
    enddate: string,
    limit?: number,
    sort?: string
  ) {
    return new Observable<DTOCart>((obs) => {
      this.http
        .get<DTOCart>(
          `https://fakestoreapi.com/carts?startdate=${startdate}&enddate=${enddate}&limit=${limit}&sort=${sort}`
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

  //API lấy giỏ hảng theo một user nào đó
  GetUserCarts(id: string) {
    return new Observable<DTOCart>((obs) => {
      this.http
        .get<DTOCart>(`https://fakestoreapi.com/carts/user/${id}`)
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

  // API thêm một giỏ hàng mới cho 1 user
  AddANewCart(dtoCart: DTOCart) {
    return new Observable<DTOCart>((obs) => {
      this.http
        .post<DTOCart>(
          `https://fakestoreapi.com/carts`,
          JSON.stringify(dtoCart)
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

  // API cập nhật một sản phẩm trong giỏ hàng theo id, truyền id của giỏ hàng và sản phẩm của của giỏ hàng đó
  UpdateAProductCart(idCart: number, data: DTOCart) {
    return new Observable((obs) => {
      this.http
        .put(`https://fakestoreapi.com/carts/${idCart}`, JSON.stringify(data))
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

  DeleteACart(idCart: number) {
    return new Observable((obs) => {
      this.http.delete(`https://fakestoreapi.com/carts/${idCart}`).subscribe(
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
