#!/bin/sh
#sudo apt-get update  # To get the latest package lists

activate(){
    . ./myprojectenv/bin/activate
}

sudo apt-get install python3-pip apache2 libapache2-mod-wsgi-py3
pip3 install virtualenv
virtualenv myprojectenv
activate

pip install -U -r requirements.txt

#pip install pandas
#conda create -n djangoenv
#conda activate djangoenv

cd ~/crio/mini-akansha007-me_buildout_xmeme/Backend/XMEME
#echo $(pwd)
python manage.py makemigrations
python manage.py migrate
python manage.py makemigrations
#etc.
