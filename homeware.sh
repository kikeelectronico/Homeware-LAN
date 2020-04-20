#!/bin/bash

gunicorn -w 1 -b 0.0.0.0:5001 homeware:app
