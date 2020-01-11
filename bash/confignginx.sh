#!/bin/bash
file="/etc/nginx/sites-enabled"
if [ -e "$file" ]
then
	echo "$file found."
else
	echo "$file not found."
fi
