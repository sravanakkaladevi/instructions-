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
    <div class="command-block group rounded-2xl border border-slate-800 bg-slate-950 p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-glow" data-original-command="${escapeHtml(command)}">
      <div class="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-start">
        <code class="command-code min-w-0 flex-1 whitespace-pre-wrap break-words px-1 py-1 font-mono text-sm leading-6 text-cyan-50">${escapeHtml(command)}</code>
        <textarea class="command-editor hidden min-h-16 flex-1 resize-y rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-sm leading-6 text-cyan-50 outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10" spellcheck="false">${escapeHtml(command)}</textarea>
        <div class="flex shrink-0 flex-wrap justify-start gap-2 sm:justify-end">
          <button class="command-action edit-command rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-black text-slate-200 hover:border-cyan-300 hover:text-white">
            Edit
          </button>
          <button class="command-action save-command hidden rounded-lg border border-cyan-400 bg-cyan-500 px-2.5 py-1.5 text-xs font-black text-slate-950 hover:bg-cyan-300">
            Save
          </button>
          <button class="command-action cancel-edit hidden rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-black text-slate-200 hover:border-white">
            Cancel
          </button>
          <button class="command-action copy-command rounded-lg border border-blue-400/50 bg-blue-500/15 px-2.5 py-1.5 text-xs font-black text-blue-100 hover:border-blue-300 hover:bg-blue-500/30" data-command="${escapeHtml(command)}">
            Copy
          </button>
        </div>
      </div>
    </div>
  `;
}

function customPanel(guide) {
  if (guide.id === "venv") {
    return `
      <section class="mb-7 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 shadow-sm">
        <h3 class="text-lg font-black text-ink">Custom Python Version Command</h3>
        <p class="mt-1 text-sm leading-6 text-muted">Enter your Python version and environment name, then copy the generated command.</p>
        <div class="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <label class="block">
            <span class="mb-1 block text-xs font-black uppercase text-muted">Python version</span>
            <input id="pythonVersionInput" class="w-full rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-brand focus:ring-4 focus:ring-brandSoft" value="3.11" placeholder="3.11" />
          </label>
          <label class="block">
            <span class="mb-1 block text-xs font-black uppercase text-muted">Venv name</span>
            <input id="venvNameInput" class="w-full rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-brand focus:ring-4 focus:ring-brandSoft" value="venv" placeholder="venv" />
          </label>
          <div class="flex items-end">
            <button id="copyPythonCommand" class="uiverse-button w-full bg-gradient-to-r from-brand to-teal-500 px-4 py-2.5 text-sm font-black text-white shadow-glow">Copy</button>
          </div>
        </div>
        <div class="mt-4" id="pythonCommandPreview"></div>
      </section>
    `;
  }

  if (guide.id === "github") {
    return `
      <section class="mb-7 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 shadow-sm">
        <h3 class="text-lg font-black text-ink">Custom GitHub URL Setup</h3>
        <p class="mt-1 text-sm leading-6 text-muted">Paste your GitHub repository URL and copy the ready command flow.</p>
        <div class="mt-4 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label class="block">
            <span class="mb-1 block text-xs font-black uppercase text-muted">GitHub repository URL</span>
            <input id="githubUrlInput" class="w-full rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-brand focus:ring-4 focus:ring-brandSoft" value="https://github.com/username/repository-name.git" />
          </label>
          <div class="flex items-end">
            <button id="pasteGithubUrl" class="uiverse-button w-full border border-blue-200 bg-white px-4 py-2.5 text-sm font-black text-brand">Paste</button>
          </div>
          <div class="flex items-end">
            <button id="copyGithubCommands" class="uiverse-button w-full bg-gradient-to-r from-brand to-teal-500 px-4 py-2.5 text-sm font-black text-white shadow-glow">Copy All</button>
          </div>
        </div>
        <div class="mt-4 space-y-3" id="githubCommandPreview"></div>
      </section>
    `;
  }

  return "";
}

function renderGuideList(items = guides) {
  guideList.innerHTML = items
    .map((guide) => {
      const active = guide.id === activeGuideId;
      return `
        <button
          class="guide-button w-full rounded-2xl border px-3 py-3 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-glow ${
            active ? "border-blue-300 bg-gradient-to-br from-blue-100 to-cyan-50 text-ink" : "border-white/80 bg-white/75 text-ink hover:border-blue-300"
          }"
          data-id="${guide.id}"
        >
          <span class="block text-sm font-black">${guide.title}</span>
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
    <span class="rounded-full bg-brandSoft px-3 py-1 text-xs font-black text-brand">${guide.level}</span>
    <span class="rounded-full border border-blue-100 bg-white/85 px-3 py-1 text-xs font-black text-muted">${guide.sections.length} sections</span>
  `;

  guideContent.innerHTML = `
    <header class="mb-6 border-b border-blue-100 pb-5">
      <h2 class="text-2xl font-black text-ink sm:text-3xl">${guide.title}</h2>
      <p class="mt-2 max-w-3xl text-base leading-7 text-muted">${guide.summary}</p>
    </header>
    ${customPanel(guide)}
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
              <h3 class="text-lg font-black text-ink">${section.heading}</h3>
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
  setupCustomPanel(guide);
}

function getPythonCommand() {
  const version = document.querySelector("#pythonVersionInput")?.value.trim() || "3.11";
  const venvName = document.querySelector("#venvNameInput")?.value.trim() || "venv";
  return `py -${version} -m venv ${venvName}`;
}

function renderPythonCommand() {
  const preview = document.querySelector("#pythonCommandPreview");
  if (!preview) {
    return;
  }
  preview.innerHTML = commandBlock(getPythonCommand());
}

function getGithubCommands() {
  const url = document.querySelector("#githubUrlInput")?.value.trim() || "https://github.com/username/repository-name.git";
  return [
    "git status",
    "git add .",
    "git commit -m \"Update project\"",
    `git remote add origin ${url}`,
    "git branch -M main",
    "git push -u origin main"
  ];
}

function renderGithubCommands() {
  const preview = document.querySelector("#githubCommandPreview");
  if (!preview) {
    return;
  }
  preview.innerHTML = getGithubCommands().map(commandBlock).join("");
}

function setupCustomPanel(guide) {
  if (guide.id === "venv") {
    renderPythonCommand();
    document.querySelector("#pythonVersionInput")?.addEventListener("input", renderPythonCommand);
    document.querySelector("#venvNameInput")?.addEventListener("input", renderPythonCommand);
    document.querySelector("#copyPythonCommand")?.addEventListener("click", async () => {
      await copyText(getPythonCommand());
      showToast("Python command copied");
    });
  }

  if (guide.id === "github") {
    renderGithubCommands();
    document.querySelector("#githubUrlInput")?.addEventListener("input", renderGithubCommands);
    document.querySelector("#copyGithubCommands")?.addEventListener("click", async () => {
      await copyText(getGithubCommands().join("\n"));
      showToast("GitHub commands copied");
    });
    document.querySelector("#pasteGithubUrl")?.addEventListener("click", async () => {
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        showToast("Paste manually");
        return;
      }
      try {
        const text = await navigator.clipboard.readText();
        const input = document.querySelector("#githubUrlInput");
        input.value = text.trim();
        renderGithubCommands();
        showToast("URL pasted");
      } catch {
        showToast("Paste manually");
      }
    });
  }
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
  const editButton = event.target.closest(".edit-command");
  if (editButton) {
    const block = editButton.closest(".command-block");
    const code = block.querySelector(".command-code");
    const editor = block.querySelector(".command-editor");
    const saveButton = block.querySelector(".save-command");
    const cancelButton = block.querySelector(".cancel-edit");

    editor.value = code.textContent;
    code.classList.add("hidden");
    editor.classList.remove("hidden");
    editButton.classList.add("hidden");
    saveButton.classList.remove("hidden");
    cancelButton.classList.remove("hidden");
    editor.focus();
    editor.select();
    return;
  }

  const saveButton = event.target.closest(".save-command");
  if (saveButton) {
    const block = saveButton.closest(".command-block");
    const code = block.querySelector(".command-code");
    const editor = block.querySelector(".command-editor");
    const editButton = block.querySelector(".edit-command");
    const cancelButton = block.querySelector(".cancel-edit");
    const copyButton = block.querySelector(".copy-command");

    const editedCommand = editor.value.trim();
    code.textContent = editedCommand;
    copyButton.dataset.command = editedCommand;
    block.dataset.originalCommand = editedCommand;
    editor.classList.add("hidden");
    code.classList.remove("hidden");
    saveButton.classList.add("hidden");
    cancelButton.classList.add("hidden");
    editButton.classList.remove("hidden");
    showToast("Command updated");
    return;
  }

  const cancelButton = event.target.closest(".cancel-edit");
  if (cancelButton) {
    const block = cancelButton.closest(".command-block");
    const code = block.querySelector(".command-code");
    const editor = block.querySelector(".command-editor");
    const editButton = block.querySelector(".edit-command");
    const saveButton = block.querySelector(".save-command");

    editor.value = code.textContent;
    editor.classList.add("hidden");
    code.classList.remove("hidden");
    cancelButton.classList.add("hidden");
    saveButton.classList.add("hidden");
    editButton.classList.remove("hidden");
    return;
  }

  const copyButton = event.target.closest(".copy-command");
  if (copyButton) {
    await copyText(copyButton.dataset.command);
    showToast("Command copied");
  }
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
