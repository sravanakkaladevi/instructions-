# Python Virtual Environment Setup Steps

## 1. Check Installed Python Versions

Open CMD and run:

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

## 2. Install Another Python Version

Download Python from the official website:

```text
https://www.python.org/downloads/
```

During installation, enable:

- Add Python to PATH
- Install launcher for all users

## 3. Create Virtual Environment

Create a Python 3.11 virtual environment:

```cmd
py -3.11 -m venv venv311
```

Create a Python 3.8 virtual environment:

```cmd
py -3.8 -m venv venv38
```

## 4. Activate Virtual Environment

Activate Python 3.11 environment:

```cmd
venv311\Scripts\activate
```

Activate Python 3.8 environment:

```cmd
venv38\Scripts\activate
```

After activation, CMD will show the environment name:

```cmd
(venv38) C:\project>
```

## 5. Check Active Python Version

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
Python 3.8.10
```

## 6. Install Project Dependencies

Run:

```cmd
pip install -r requirements.txt
```

## 7. Deactivate Virtual Environment

Run:

```cmd
deactivate
```

## Recommended Project Structure

```text
project/
|-- venv38/
|-- venv311/
|-- requirements.txt
|-- manage.py
|-- README.md
```

## Useful Commands Cheat Sheet

Check installed Python versions:

```cmd
py --list
```

Create environment using Python 3.8:

```cmd
py -3.8 -m venv venv
```

Create environment using Python 3.11:

```cmd
py -3.11 -m venv venv
```

Activate environment:

```cmd
venv\Scripts\activate
```

Install dependencies:

```cmd
pip install -r requirements.txt
```

Exit environment:

```cmd
deactivate
```
