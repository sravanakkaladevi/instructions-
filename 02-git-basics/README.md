# Git Basics Guide

## Why We Use Git

Git tracks project changes.

If you make a mistake, Git helps you see what changed and go back to previous code.

## 1. Check Git Version

```cmd
git --version
```

## 2. Initialize Git

Run this inside your project folder:

```cmd
git init
```

## 3. Check Project Status

```cmd
git status
```

Git shows:

- New files
- Modified files
- Deleted files

## 4. Add Files

Add all files:

```cmd
git add .
```

Add one file:

```cmd
git add README.md
```

## 5. Commit Files

```cmd
git commit -m "Initial commit"
```

Use a clear commit message.

Example:

```cmd
git commit -m "Add login page"
```

## 6. View Commit History

```cmd
git log --oneline
```

## Common Git Commands

```cmd
git status
git add .
git commit -m "message"
git log --oneline
```

## Common Mistakes

- Do not commit `venv`.
- Do not commit `.env`.
- Always run `git status` before commit.
