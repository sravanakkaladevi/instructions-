# Git Basics Guide

## Why We Use Git

Git tracks project changes.

If you make a mistake, Git helps you see what changed and go back to previous code.

## 1. Check Git Version

```cmd
git --version
```

## 2. First Time Git Setup

Set your name:

```cmd
git config --global user.name "Your Name"
```

Set your email:

```cmd
git config --global user.email "your-email@example.com"
```

Check config:

```cmd
git config --global --list
```

## 3. Initialize Git

Run this inside your project folder:

```cmd
git init
```

## 4. Check Project Status

```cmd
git status
```

Git shows:

- New files
- Modified files
- Deleted files

## 5. Add Files

Add all files:

```cmd
git add .
```

Add one file:

```cmd
git add README.md
```

## 6. Commit Files

```cmd
git commit -m "Initial commit"
```

Use a clear commit message.

Example:

```cmd
git commit -m "Add login page"
```

## 7. Set Main Branch

```cmd
git branch -M main
```

## 8. View Commit History

```cmd
git log --oneline
```

## Branch Commands

Create and switch to a new branch:

```cmd
git switch -c feature-name
```

Switch back to main:

```cmd
git switch main
```

Merge a branch:

```cmd
git merge feature-name
```

## Common Git Commands

```cmd
git --version
git config --global --list
git status
git diff
git add .
git commit -m "message"
git branch -M main
git log --oneline
git remote -v
```

## Common Mistakes

- Do not commit `venv`.
- Do not commit `.env`.
- Always run `git status` before commit.
