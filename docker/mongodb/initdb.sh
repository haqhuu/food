#!/bin/bash
# Các thông tin kết nối
MONGO_ROOT_USER="admin"
MONGO_ROOT_PASSWORD="admin"
DB_NAME="food"
DB_USER="food"
DB_PASSWORD="food"
# Kiểm tra cơ sở dữ liệu có tồn tại không
DB_EXISTS=$(mongosh -u $MONGO_ROOT_USER -p $MONGO_ROOT_PASSWORD --authenticationDatabase "admin" --eval "db.getMongo().getDBNames().indexOf('$DB_NAME') >= 0" --quiet)
if [ "$DB_EXISTS" == "true" ]; then
  echo "Database $DB_NAME already exists."
else
  echo "Database $DB_NAME does not exist. Creating database and user."
  mongosh --host $MONGO_HOST --port $MONGO_PORT -u $MONGO_ROOT_USER -p $MONGO_ROOT_PASSWORD --authenticationDatabase "admin" --eval "
    db = db.getSiblingDB('$DB_NAME');
    db.createUser({
      user: '$DB_USER',
      pwd: '$DB_PASSWORD',
      roles: [{ role: 'readWrite', db: '$DB_NAME' }]
    });
  "
  echo "Database $DB_NAME and user $DB_USER created."
fi



