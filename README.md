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


## 4. Change file hosts:
Windows:
- open: C:\Windows\System32\drivers\etc
- use notepad as Administrator
- add content: 127.0.0.1 food.local => save
##
Linux:
- open: /etc
- use nano as sudo mod
- add content: 127.0.0.1 food.local => save

# 5. Check init:
- check api: food.local
- check web: food.local/api
- check mongodb at MongoDB Compass
