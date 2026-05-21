# Django Project Setup Guide

## Why This Setup Is Needed

Django needs a virtual environment, installed packages, database migrations, and a runserver command.

This guide gives the basic command flow.

## 1. Create Virtual Environment

```cmd
py -m venv venv
```

## 2. Activate Virtual Environment

```cmd
venv\Scripts\activate
```

## 3. Install Django

```cmd
pip install django
```

## 4. Create Django Project

```cmd
django-admin startproject project_name
```

Go inside the project:

```cmd
cd project_name
```

## 5. Create Django App

```cmd
python manage.py startapp app_name
```

## 6. Run Migrations

```cmd
python manage.py makemigrations
python manage.py migrate
```

## 7. Create Admin User

```cmd
python manage.py createsuperuser
```

## 8. Run Server

```cmd
python manage.py runserver
```

Open browser:

```text
http://127.0.0.1:8000/
```

## 9. Save Requirements

```cmd
pip freeze > requirements.txt
```

## Common Django Commands

```cmd
python manage.py check
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Common Mistakes

- Activate `venv` before running Django commands.
- Add app name in `INSTALLED_APPS`.
- Run migrations after changing models.
- Do not commit database passwords.
