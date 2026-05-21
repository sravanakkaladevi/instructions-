# Python Virtual Environment and GitHub Push Guide

This guide explains how to create a Python virtual environment, install project dependencies, save them in `requirements.txt`, and push the project to GitHub.

## 1. Open Project Folder

Open CMD and go to your project folder:

```cmd
cd C:\path\to\your\project
```

Example:

```cmd
cd C:\Users\srava\Desktop\my_project
```

## 2. Check Installed Python Versions

Run:

```cmd
py --list
```

Or:

```cmd
py -0
```

Example output:

```text
Installed Pythons:
 -3.11-64
 -3.8-64
```

## 3. Install Python If Needed

Download Python from:

```text
https://www.python.org/downloads/
```

During installation, enable:

- Add Python to PATH
- Install launcher for all users

## 4. Create Virtual Environment

For normal projects, create one virtual environment named `venv`:

```cmd
py -3.11 -m venv venv
```

If your project needs Python 3.8:

```cmd
py -3.8 -m venv venv
```

If your project needs Python 3.11:

```cmd
py -3.11 -m venv venv
```

## 5. Activate Virtual Environment

Run:

```cmd
venv\Scripts\activate
```

After activation, CMD will show:

```cmd
(venv) C:\path\to\your\project>
```

## 6. Check Active Python Version

Run:

```cmd
python --version
```

Or:

```cmd
python -V
```

Example:

```text
Python 3.11.8
```

## 7. Upgrade Pip

Run:

```cmd
python -m pip install --upgrade pip
```

## 8. Install Packages

Install packages one by one:

```cmd
pip install django
```

Example for a Django project:

```cmd
pip install django mysqlclient pillow python-dotenv web3
```

If your project already has `requirements.txt`, install all packages using:

```cmd
pip install -r requirements.txt
```

## 9. Save Installed Packages

After installing packages, create or update `requirements.txt`:

```cmd
pip freeze > requirements.txt
```

Check installed packages:

```cmd
pip list
```

## 10. Create `.gitignore`

Create a `.gitignore` file in your project root.

Add this content:

```text
venv/
.env
__pycache__/
*.pyc
.vscode/
```

Important: Do not push the `venv` folder to GitHub. Only push `requirements.txt`.

## 11. Run Project Check

For a Django project, run:

```cmd
python manage.py check
```

If you have migrations:

```cmd
python manage.py makemigrations
python manage.py migrate
```

Run the server:

```cmd
python manage.py runserver
```

## 12. Initialize Git

If Git is not already initialized, run:

```cmd
git init
```

Check status:

```cmd
git status
```

## 13. Add Files to Git

Add all files:

```cmd
git add .
```

Check status again:

```cmd
git status
```

## 14. Commit Changes

Create a commit:

```cmd
git commit -m "Add project setup guide"
```

## 15. Create GitHub Repository

Go to GitHub and create a new repository.

Do not initialize it with:

- README
- `.gitignore`
- License

This avoids conflicts when pushing an existing local project.

## 16. Connect Local Project to GitHub

Copy your GitHub repository URL.

Example:

```text
https://github.com/username/repository-name.git
```

Add remote:

```cmd
git remote add origin https://github.com/username/repository-name.git
```

If remote already exists, check it:

```cmd
git remote -v
```

If the remote URL is wrong, update it:

```cmd
git remote set-url origin https://github.com/username/repository-name.git
```

## 17. Push to GitHub

Set branch name:

```cmd
git branch -M main
```

Push:

```cmd
git push -u origin main
```

After the first push, you can use:

```cmd
git push
```

## 18. Deactivate Virtual Environment

When work is finished, run:

```cmd
deactivate
```

## Recommended Project Structure

```text
project/
|-- venv/
|-- requirements.txt
|-- manage.py
|-- README.md
|-- .gitignore
|-- app_name/
|-- templates/
|-- static/
```

## Full Command Cheat Sheet

```cmd
cd C:\path\to\your\project
py --list
py -3.11 -m venv venv
venv\Scripts\activate
python --version
python -m pip install --upgrade pip
pip install django
pip freeze > requirements.txt
git init
git status
git add .
git commit -m "Add project setup guide"
git remote add origin https://github.com/username/repository-name.git
git branch -M main
git push -u origin main
deactivate
```

## Common Mistakes

Do not push this:

```text
venv/
```

Push this instead:

```text
requirements.txt
```

Do not run `pip install` before activating the virtual environment.

Do not hardcode passwords or secret keys in project files. Use a `.env` file and keep `.env` inside `.gitignore`.
