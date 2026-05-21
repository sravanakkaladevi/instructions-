# GitHub Pages Guide

## Why We Use GitHub Pages

GitHub Pages hosts static websites directly from a GitHub repository.

It is useful for:

- HTML websites
- Tailwind CSS websites
- JavaScript projects
- Documentation pages
- Academic project demo pages

Important: GitHub Pages does not run Python or Django backend code.

## 1. Prepare Website Files

Make sure your project has:

```text
index.html
assets/
README.md
```

For a simple static website, keep `index.html` in the repository root.

## 2. Commit Website Files

```cmd
git status
git add index.html assets/app.js README.md
git commit -m "Update website"
git push
```

## 3. Enable GitHub Pages

Open your GitHub repository in browser.

Go to:

```text
Settings > Pages
```

Under Build and deployment:

- Source: Deploy from a branch
- Branch: main
- Folder: /root

Click Save.

## 4. Open Website URL

GitHub Pages URL format:

```text
https://username.github.io/repository-name/
```

Example:

```text
https://sravanakkaladevi.github.io/instructions-/
```

## 5. Update GitHub Pages Website Later

After editing `index.html` or JavaScript:

```cmd
git status
git add .
git commit -m "Update GitHub Pages site"
git push
```

Wait one or two minutes, then refresh the website URL.

## Common Mistakes

- Do not put `index.html` inside a wrong folder unless Pages is configured for that folder.
- Do not expect Django backend to run on GitHub Pages.
- Wait after pushing because GitHub Pages deployment can take time.
- Check repository Settings > Pages if the website URL is not working.
