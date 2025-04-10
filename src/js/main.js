// Menu Mobile
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');

    mobileMenuBtn.addEventListener('click', function () {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Ativar link ativo na navegação
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Atualizar ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Animações ao scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.fade-in');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Tema dark/light
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Verificar tema salvo ou preferência do sistema
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleIcon('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateToggleIcon('light');
    }

    // Alternar tema
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateToggleIcon('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateToggleIcon('light');
        }
    });

    // Atualizar ícone e texto do toggle
    function updateToggleIcon(theme) {
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('.toggle-text');

        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            text.textContent = 'Light';
            themeToggle.style.color = 'white'; // Garante que o ícone seja visível
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            text.textContent = 'Dark';
            themeToggle.style.color = ''; // Volta ao padrão
        }
    }

    // Observar mudanças na preferência do sistema
    prefersDarkScheme.addListener(e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                updateToggleIcon('dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                updateToggleIcon('light');
            }
        }
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez ao carregar a página
});