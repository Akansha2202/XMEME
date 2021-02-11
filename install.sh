#!/bin/sh
sudo apt-get update  # To get the latest package lists

activate(){
    . ./myprojectenv/bin/activate
}

sudo apt-get install python3-pip apache2 libapache2-mod-wsgi-py3
pip3 install virtualenv
virtualenv myprojectenv
activate

pip3 install django
pip3 install -U -r requirements.txt

#pip install pandas
#conda create -n djangoenv
#conda activate django
#etc.