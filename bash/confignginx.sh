#!/bin/bash
runSed="sed -i 's/domain/$1/g' /etc/nginx/sites-enabled/default"
file="/etc/nginx/sites-enabled"
echo "$invalue"
if [ -e "$file" ]
then
	echo "Nginx found."
	#1
	if sudo cp ../configuration_templates/initial_nginx_config /etc/nginx/sites-enabled/default
	then
		echo "Copy: Ok"
		#2
		if eval $runSed
		then
			echo "Sed: Ok"
			#3
			if sudo service nginx restart
			then
				echo "Restart: Ok"
				echo "Done"
			else
				echo "Restart: Fail"
			fi
		else
			echo "Sed: Fail"
		fi
	else
		echo "Copy: Fail"
	fi


else
	echo "Nginx not found."
fi
