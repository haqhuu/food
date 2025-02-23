#!/bin/bash
REBUILD=false
REPLACE_FILE=false
while getopts "rf" opt; do
  case $opt in
    r|R)
      REBUILD=true
      ;;
    f|F)
      REPLACE_FILE=true
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done
if [ -f .env ]; then
    source .env
else
    echo ".env file not found. Please create the configuration .env file."
    exit 1
fi
git config --global credential.helper store

echo "Pulling app..."
if [ ! -d "${PROJECT_DIR}" ]; then
  mkdir "${PROJECT_DIR}"
fi
if [ -d "${PROJECT_DIR}" ]; then
  if [ -d "${PROJECT_DIR}/.git" ]; then
    git -C "${PROJECT_DIR}" reset --hard
    git -C "${PROJECT_DIR}" checkout dev
    git -C "${PROJECT_DIR}" pull
  else
    git clone "https://${GITLAB_USERNAME}@gitlab.com/anhthu.cnttk11/ets-intern-2024.git" "${PROJECT_DIR}"
    git -C "${PROJECT_DIR}" checkout dev
  fi
fi

if [ "$REBUILD" == "true" ]; then
  ./restart.sh -r
else
  ./restart.sh
fi