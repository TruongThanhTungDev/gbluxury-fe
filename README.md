# kyungmin-webapp

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

# Cấu trúc thư mục
### Layout nằm trong Thư mục Layout. Ở đây có 02 Layout chính, Layout trang chủ và Layout các trang con. Nếu các trang con thì dùng 
``` LayoutChidrentPage.vue ``` 

### Router đặt ở 
``` router/index.js ```

Sau này sẽ Refactor lại, ở mỗi Page sẽ có router riêng rồi import vào file 
``` router/index.js ```

### Khai báo Page mới sẽ được đặt trong thư mục Page theo quy tắc
``` pages/<tên page>/<tên file page.vue> ```

### Các Component phải được đặt trong 
``` components ``` 
theo quy tắc 
``` components/<tên component>/<file name component.vue> ```


### Truy cập trang admin
url /admin
username: admin
password: kyungmin1234

Updating...
