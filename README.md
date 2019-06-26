# Refuge Law Clinic - Application (rlc_app)

Application for record and association management of refugee law clinics in germany.
Contact Dominik Walser (jehob) for more information (dominik.walser@rlcm.de).

rlcapp - record and organization management software for refugee law clinics
Copyright (C) 2019  Dominik Walser

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>

## Installation instructions for development

To develop and run the server locally you have to do the following things:

### Prerequisites

Python in version 3.6.5 and node.js (8.12) have to be installed. Virtualenv is recommended.

> pip install virtualenv

### Installation

Download the repository and open the directory.

### **Frontend**

> npm install

keep compiling if changes are made

> ng build --watch --deploy-url /static/dist/

### **Backend**

The first command creates a virtual environment. The name after is the name of the environment and can be replaced with anything, but you have to change the other commands correspondigly.

> virtualenv venv

Activate the virtual environment, which is from os to os different.

Windows:

> venv/Scripts/activate

Unix:

> source venv/bin/activate

Install packages:

> pip install -r requirements_dev.txt

> python manage.py makemigrations

> python manage.py migrate

> python manage.py createsuperuser


Follow the steps to create a superuser

Fill in the databse with test values:

> python manage.py populate_deploy_db

Start the server:

> python manage.py runserver

Test under:

> localhost:8000 or 127.0.0.1:8000

with your browser.

or the backend directly with:

> localhost:8000/api/
