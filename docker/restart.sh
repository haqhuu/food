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
      echo "❌ Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# Kiểm tra thay đổi trong source code
check_changes() {
  local service_path=$1
  if [[ -d "$service_path" ]]; then
    git -C "$service_path" diff --quiet || return 0
  else
    git diff --quiet || return 0
  fi
  return 1
}

# Hàm rebuild toàn bộ
rebuild_all() {
  echo "🛠️ Rebuilding toàn bộ services..."
  docker-compose down
  
  # Xóa containers, images cũ
  docker ps -q | xargs -r docker stop
  docker ps -a -q | xargs -r docker rm
  docker images -q | xargs -r docker rmi -f
  
  docker-compose build --no-cache
  docker-compose up -d --remove-orphans
}

# Hàm rebuild một service
rebuild_service() {
  local service=$1
  local service_path="./$service"
  
  echo "🔄 Restarting service: $service..."
  
  docker-compose stop "$service"
  docker-compose rm -f "$service"
  
  if [[ "$REBUILD" = "true" ]] || check_changes "$service_path"; then
    echo "🛠️ Rebuilding $service..."
    docker-compose build --no-cache "$service"
  fi
  
  docker-compose up -d "$service"
}

# Thực hiện với toàn bộ services nếu không chỉ định
if [[ -z "$SERVICE" ]]; then
  rebuild_all
else
  rebuild_service "$SERVICE" 
fi
