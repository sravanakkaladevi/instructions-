# Python Virtual Environment Guide

## Why We Use Virtual Environment

A virtual environment keeps project packages separate.

Example:

One Django project may need Django 4.2, and another project may need Django 5.0. A virtual environment prevents package conflicts.

## 1. Open Project Folder

```cmd
cd C:\path\to\your\project
```

Example:

```cmd
cd C:\Users\srava\Desktop\my_project
```

## 2. Check Python Version

```cmd
python --version
```

Or:

```cmd
py --list
```

## 3. Create Virtual Environment

```cmd
py -m venv venv
```

If you want a specific Python version:

```cmd
py -3.11 -m venv venv
```

## 4. Activate Virtual Environment

```cmd
venv\Scripts\activate
```

After activation, CMD shows:

```cmd
(venv) C:\path\to\your\project>
```

## 5. Upgrade Pip

```cmd
python -m pip install --upgrade pip
```

## 6. Install Packages

Example:

```cmd
pip install django
```

Install from `requirements.txt`:

```cmd
pip install -r requirements.txt
```

## 7. Save Packages

```cmd
pip freeze > requirements.txt
```

## 8. Deactivate Environment

```cmd
deactivate
```

## Common Mistakes

- Do not push the `venv` folder to GitHub.
- Do not install packages before activating `venv`.
- Always keep `requirements.txt` updated.
