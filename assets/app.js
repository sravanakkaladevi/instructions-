const guides = [
  {
    id: "venv",
    title: "Python Virtual Environment",
    summary: "Create venv, activate it, install packages, and save requirements.",
    level: "Beginner",
    sections: [
      {
        heading: "Why we use virtual environment",
        text: "A virtual environment keeps one project's Python packages separate from another project. This avoids version conflicts."
      },
      {
        heading: "Commands",
        commands: [
          "cd C:\\path\\to\\your\\project",
          "py --list",
          "py -m venv venv",
          "venv\\Scripts\\activate",
          "python --version",
          "python -m pip install --upgrade pip",
          "pip install django",
          "pip freeze > requirements.txt",
          "deactivate"
        ]
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Do not push the venv folder to GitHub.",
          "Activate venv before installing packages.",
          "Update requirements.txt after installing new packages."
        ]
      }
    ]
  },
  {
    id: "git",
    title: "Git Basics",
    summary: "Track project changes using Git commands.",
    level: "Beginner",
    sections: [
      {
        heading: "Why we use Git",
        text: "Git records project changes. If code breaks, you can inspect what changed and recover previous work."
      },
      {
        heading: "Commands",
        commands: [
          "git --version",
          "git init",
          "git status",
          "git add .",
          "git commit -m \"Initial commit\"",
          "git log --oneline"
        ]
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Run git status before every commit.",
          "Do not commit venv.",
          "Do not commit .env or passwords."
        ]
      }
    ]
  },
  {
    id: "github",
    title: "GitHub Push",
    summary: "Connect local Git project to GitHub and push code online.",
    level: "Beginner",
    sections: [
      {
        heading: "Why we use GitHub",
        text: "GitHub stores your project online. It works as backup and makes sharing project code easier."
      },
      {
        heading: "First time push",
        commands: [
          "git status",
          "git add .",
          "git commit -m \"Update project\"",
          "git remote add origin https://github.com/username/repository-name.git",
          "git branch -M main",
          "git push -u origin main"
        ]
      },
      {
        heading: "Next time push",
        commands: [
          "git status",
          "git add .",
          "git commit -m \"Update project\"",
          "git push"
        ]
      },
      {
        heading: "If push is rejected",
        commands: [
          "git fetch origin",
          "git pull origin main",
          "git push"
        ]
      }
    ]
  },
  {
    id: "django",
    title: "Django Project Setup",
    summary: "Create Django project, app, migrations, admin user, and runserver.",
    level: "Beginner",
    sections: [
      {
        heading: "Why this setup is needed",
        text: "Django needs project files, app files, migrations, and a development server to run correctly."
      },
      {
        heading: "Commands",
        commands: [
          "py -m venv venv",
          "venv\\Scripts\\activate",
          "pip install django",
          "django-admin startproject project_name",
          "cd project_name",
          "python manage.py startapp app_name",
          "python manage.py makemigrations",
          "python manage.py migrate",
          "python manage.py createsuperuser",
          "python manage.py runserver",
          "pip freeze > requirements.txt"
        ]
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Add app_name inside INSTALLED_APPS.",
          "Run migrations after changing models.",
          "Do not commit database passwords."
        ]
      }
    ]
  }
];

const guideList = document.querySelector("#guideList");
const guideContent = document.querySelector("#guideContent");
const guideMeta = document.querySelector("#guideMeta");
const searchInput = document.querySelector("#searchInput");
const menuToggle = document.querySelector("#menuToggle");
const sidebarBody = document.querySelector("#sidebarBody");
const toast = document.querySelector("#toast");
const printButton = document.querySelector("#printButton");
const copyAllButton = document.querySelector("#copyAllButton");

let activeGuideId = guides[0].id;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.setTimeout(() => toast.classList.add("hidden"), 1400);
}

async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function commandBlock(command) {
  return `
    <div class="group flex items-start justify-between gap-3 rounded border border-line bg-slate-950 p-3">
      <code class="min-w-0 flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-100">${escapeHtml(command)}</code>
      <button class="copy-command shrink-0 rounded border border-slate-700 px-2 py-1 text-xs font-bold text-slate-200 hover:border-white" data-command="${escapeHtml(command)}">
        Copy
      </button>
    </div>
  `;
}

function renderGuideList(items = guides) {
  guideList.innerHTML = items
    .map((guide) => {
      const active = guide.id === activeGuideId;
      return `
        <button
          class="guide-button w-full rounded border px-3 py-3 text-left transition ${
            active ? "border-brand bg-brandSoft text-ink" : "border-line bg-white text-ink hover:border-brand"
          }"
          data-id="${guide.id}"
        >
          <span class="block text-sm font-bold">${guide.title}</span>
          <span class="mt-1 block text-xs leading-5 text-muted">${guide.summary}</span>
        </button>
      `;
    })
    .join("");
}

function renderGuide(id) {
  const guide = guides.find((item) => item.id === id) || guides[0];
  activeGuideId = guide.id;

  guideMeta.innerHTML = `
    <span class="rounded bg-brandSoft px-3 py-1 text-xs font-bold text-brand">${guide.level}</span>
    <span class="rounded border border-line bg-white px-3 py-1 text-xs font-bold text-muted">${guide.sections.length} sections</span>
  `;

  guideContent.innerHTML = `
    <header class="mb-6 border-b border-line pb-5">
      <h2 class="text-2xl font-bold text-ink sm:text-3xl">${guide.title}</h2>
      <p class="mt-2 max-w-3xl text-base leading-7 text-muted">${guide.summary}</p>
    </header>
    <div class="space-y-7">
      ${guide.sections
        .map((section) => {
          const text = section.text ? `<p class="mt-2 text-base leading-7 text-muted">${section.text}</p>` : "";
          const commands = section.commands
            ? `<div class="mt-4 space-y-3">${section.commands.map(commandBlock).join("")}</div>`
            : "";
          const bullets = section.bullets
            ? `<ul class="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-muted">${section.bullets
                .map((bullet) => `<li>${bullet}</li>`)
                .join("")}</ul>`
            : "";

          return `
            <section>
              <h3 class="text-lg font-bold text-ink">${section.heading}</h3>
              ${text}
              ${commands}
              ${bullets}
            </section>
          `;
        })
        .join("")}
    </div>
  `;

  renderGuideList(filterGuides(searchInput.value));
}

function filterGuides(query) {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    return guides;
  }

  return guides.filter((guide) => {
    const haystack = [
      guide.title,
      guide.summary,
      ...guide.sections.flatMap((section) => [
        section.heading,
        section.text || "",
        ...(section.commands || []),
        ...(section.bullets || [])
      ])
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(cleanQuery);
  });
}

function guideToText(guide) {
  return [
    guide.title,
    guide.summary,
    "",
    ...guide.sections.flatMap((section) => [
      section.heading,
      section.text || "",
      ...(section.commands || []),
      ...(section.bullets || []),
      ""
    ])
  ].join("\n");
}

guideList.addEventListener("click", (event) => {
  const button = event.target.closest(".guide-button");
  if (!button) {
    return;
  }
  renderGuide(button.dataset.id);
  sidebarBody.classList.add("hidden");
  sidebarBody.classList.add("lg:block");
});

guideContent.addEventListener("click", async (event) => {
  const button = event.target.closest(".copy-command");
  if (!button) {
    return;
  }

  await copyText(button.dataset.command);
  showToast("Command copied");
});

searchInput.addEventListener("input", () => {
  renderGuideList(filterGuides(searchInput.value));
});

menuToggle.addEventListener("click", () => {
  sidebarBody.classList.toggle("hidden");
});

printButton.addEventListener("click", () => {
  window.print();
});

copyAllButton.addEventListener("click", async () => {
  const guide = guides.find((item) => item.id === activeGuideId) || guides[0];
  await copyText(guideToText(guide));
  showToast("Guide copied");
});

renderGuide(activeGuideId);
