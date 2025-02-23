## Set up

## 1. Chạy dự án
- cd docker
- ./restart.sh - Run dự án
- ./restart.sh - r Rebuild dự án


## 2. Để vào một container
- docker exec -it <container_id> bash : De vao mot container


## 3. Setup DB mongo
- docker exec -it food-mongodb bash
root/mongodb/initdb.sh


## 4. Sửa file hosts:
- Mở file ở đường dẫn: C:\Windows\System32\drivers\etc
- Sử dụng notepadd mở ở chế độ Administrator
- Vào thêm dòng: 127.0.0.1 food.local => Lưu lại
#
Chạy web mở trình duyệt: food.local
Chạy kiểm tra api: food.local/api