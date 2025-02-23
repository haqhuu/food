#!/bin/bash

# Khai báo biến
REBUILD=false
SERVICE=""

# Xử lý các tùy chọn
while getopts "rs:" opt; do
  case $opt in
    r|R)
      REBUILD=true
      ;;
    s|S)
      SERVICE=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# Thực hiện các lệnh docker-compose
if [[ -z "$SERVICE" ]]; then
  docker-compose down
  if [[ "$REBUILD" = "true" ]]; then
    docker ps -q | xargs -r docker stop
    docker ps -a -q | xargs -r docker rm
    docker-compose build
  fi
  docker-compose up -d --remove-orphans
else
  docker-compose ps -q $SERVICE | xargs -r docker-compose stop
  docker-compose ps -q $SERVICE | xargs -r docker-compose rm -f
  if [[ "$REBUILD" = "true" ]]; then
    docker-compose build $SERVICE
  fi
  docker-compose up -d $SERVICE
fi
