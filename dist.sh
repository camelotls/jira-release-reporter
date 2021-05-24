#!/bin/bash

CONF=./jrrConfig.yaml

if [ ! -f "$CONF" ]; then
    echo "The mandatory config file: $CONF does not exist"
    exit 1
fi

npm install
ncc build index.js -o dist

DIST=./dist/index.js
if [ ! -f "$DIST" ]; then
    echo "The dist file: $DIST does not exist"
    exit 1
fi

TAG=docker.artifactory.camelot.global/jira-release-reporter:0.1.0
push_to_registry=false

while getopts "t:p" opt; do
    case $opt in
      t)
        TAG=$OPTARG
        ;;
      p)
        push_to_registry=true
        ;;
      \?)
        echo "Invalid option: -$OPTARG" >&2
        exit 1
        ;;    
    esac
done

docker build . -t "$TAG"

if $push_to_registry; then
    docker push "$TAG"
fi

exit 0