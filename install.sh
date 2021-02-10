#!/bin/sh
#sudo apt-get update  # To get the latest package lists
pip install -U -r requirements.txt
#pip install pandas
#conda create -n djangoenv
#conda activate djangoenv
cd /home/akansha/crio/mini-akansha007-me_buildout_xmeme/Backend/XMEME
python manage.py makemigrations
python manage.py migrate
python manage.py makemigrations
#etc.
