document.addEventListener('DOMContentLoaded', () => {

    const clockElement = document.getElementById('clock');
    const updateClock = () => {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        clockElement.textContent = now.toLocaleDateString('en-US', options).replace(',', '');
    };
    setInterval(updateClock, 1000);
    updateClock();

    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const icon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    const terminalOutput = document.getElementById('terminal-output');
    const introText = [
        "neofetch",
        "OS: CachyOS Linux x86_64",
        "Kernel: 6.8.9-cachyos",
        "Uptime: 42 days, 13 hours",
        "Packages: 1337 (pacman)",
        "Shell: fish",
        "-----------------------------",
        "Initializing Developer Profile...",
        "> Target: Muhammed Yusuf Yıldız",
        "> Location: Erzurum, Çorum, Türkiye",
        "> Stack: C#, .NET, Unity",
        "> Status: Education & Projects",
        "System Ready."
    ];

    async function typeTerminal() {
        for (let i = 0; i < introText.length; i++) {
            const line = document.createElement('div');

            await new Promise(r => setTimeout(r, i === 0 ? 500 : 300));

            if (introText[i] === "neofetch") {
                line.innerHTML = `<span class="prompt-user">yuper@cachyos</span> <span class="prompt-dir">~</span> <span class="prompt-char">❯</span> ${introText[i]}`;
            } else {
                line.textContent = introText[i];
            }

            terminalOutput.appendChild(line);
        }
    }
    typeTerminal();

    const repoContainer = document.getElementById('repo-container');
    const username = 'YuperTR';

    async function fetchGitHubRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
            if (!response.ok) throw new Error('Network response was not ok');

            const repos = await response.json();
            repoContainer.innerHTML = '';

            repos.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'repo-card';
                card.innerHTML = `
                    <a href="${repo.html_url}" target="_blank" class="repo-title">${repo.name}</a>
                    <p class="repo-desc">${repo.description || 'No description provided.'}</p>
                    ${repo.language ? `<span class="repo-lang">${repo.language}</span>` : ''}
                `;
                repoContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching repos:', error);
            repoContainer.innerHTML = `<p style="color: #e01b24;">Failed to load repositories. Please try again later.</p>`;
        }
    }
    fetchGitHubRepos();

    const windows = document.querySelectorAll('.window');
    const dockItems = document.querySelectorAll('.dock-item[data-target]');
    let topZIndex = 10;

    dockItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetWindow = document.getElementById(targetId);

            targetWindow.style.display = 'flex';
            bringToFront(targetWindow);
        });
    });

    windows.forEach(win => {
        const header = win.querySelector('.window-header');
        const closeBtn = win.querySelector('.close');
        const minBtn = win.querySelector('.minimize');
        const maxBtn = win.querySelector('.maximize');

        win.addEventListener('mousedown', () => bringToFront(win));

        closeBtn.addEventListener('click', () => win.style.display = 'none');
        minBtn.addEventListener('click', () => win.style.display = 'none');
        maxBtn.addEventListener('click', () => {
            win.classList.toggle('maximized');
        });

        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        header.addEventListener('mousedown', (e) => {
            if(win.classList.contains('maximized')) return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = win.offsetLeft;
            initialTop = win.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            win.style.left = `${initialLeft + dx}px`;
            win.style.top = `${initialTop + dy}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });

    function bringToFront(winElement) {
        topZIndex++;
        winElement.style.zIndex = topZIndex;
    }

    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.lightbox-close');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});