#!/bin/bash

SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd $SCRIPTPATH
gunicorn -w 1 -b 0.0.0.0:5001 homeware:app
