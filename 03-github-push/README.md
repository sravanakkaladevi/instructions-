# GitHub Push Guide

## Why We Use GitHub

GitHub stores your Git project online.

It helps you keep backup, share project code, and submit academic project work.

## 1. Create GitHub Repository

Open GitHub and create a new repository.

Do not select:

- Add README
- Add `.gitignore`
- Add license

This avoids conflicts when pushing an existing local project.

## 2. Check Remote

```cmd
git remote -v
```

## 3. Add Remote

Replace the URL with your repository URL:

```cmd
git remote add origin https://github.com/username/repository-name.git
```

## 4. Change Remote URL If Wrong

```cmd
git remote set-url origin https://github.com/username/repository-name.git
```

## 5. Set Branch Name

```cmd
git branch -M main
```

## 6. Push First Time

```cmd
git push -u origin main
```

## 7. Push Next Time

After the first push, use:

```cmd
git push
```

## Full GitHub Push Flow

```cmd
git status
git add .
git commit -m "Update project"
git remote add origin https://github.com/username/repository-name.git
git branch -M main
git push -u origin main
```

## If Push Is Rejected

First fetch remote changes:

```cmd
git fetch origin
```

Then pull or merge carefully:

```cmd
git pull origin main
```

Then push again:

```cmd
git push
```

## Common Mistakes

- Do not force push unless you understand it.
- Check remote URL before pushing.
- Commit files before push.
