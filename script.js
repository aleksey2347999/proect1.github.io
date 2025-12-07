// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    initMobileMenu();
    
    // Плавная прокрутка
    initSmoothScroll();
    
    // Загрузка ресурсов
    initResources();
    
    // Анимация элементов при скролле
    initScrollAnimations();
    
    // Обновление активной навигации
    initActiveNav();
});

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Активная навигация при скролле
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (scrollY >= (sectionTop - headerHeight - 100)) {
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
}

// Анимация элементов при скролле
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    // Наблюдаем за элементами
    document.querySelectorAll('.step, .language-card, .tutorial-card, .tool-card, .resource-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Загрузка ресурсов
function initResources() {
    window.downloadResource = function(type) {
        let content = '';
        let filename = '';
        
        switch(type) {
            case 'html-template':
                content = generateHTMLTemplate();
                filename = 'html-template.zip';
                break;
            case 'colors':
                content = generateColorPalettes();
                filename = 'цветовые-палитры.txt';
                break;
            case 'checklist':
                content = generateChecklist();
                filename = 'чек-лист-разработки.txt';
                break;
            case 'all':
                content = generateAllResources();
                filename = 'все-материалы.zip';
                break;
        }
        
        downloadFile(content, filename);
        showNotification(`Файл "${filename}" скачан`);
    };
}

// Генерация HTML шаблона
function generateHTMLTemplate() {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой сайт</title>
    <style>
        /* Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        /* Variables */
        :root {
            --primary: #3b82f6;
            --dark: #0f172a;
            --light: #f8fafc;
            --gray: #64748b;
        }
        
        /* Base */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--light);
            background: var(--dark);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Header */
        header {
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
        }
        
        /* Hero */
        .hero {
            padding: 8rem 0 4rem;
            text-align: center;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .container {
                padding: 0 0.5rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <a href="/" class="logo">Мой сайт</a>
            </nav>
        </div>
    </header>
    
    <main>
        <section class="hero">
            <div class="container">
                <h1>Добро пожаловать</h1>
                <p>Создано с помощью VS Code</p>
            </div>
        </section>
    </main>
</body>
</html>`;
}

// Генерация цветовых палитр
function generateColorPalettes() {
    return `СОВРЕМЕННЫЕ ЦВЕТОВЫЕ ПАЛИТРЫ ДЛЯ ВЕБ-САЙТОВ
===============================================

1. СИНЯЯ ТЕМА:
   Основной: #3b82f6
   Второстепенный: #1d4ed8
   Акцент: #60a5fa
   Фон: #0f172a
   Текст: #f8fafc

2. ТЕМНАЯ ТЕМА:
   Основной: #8b5cf6
   Второстепенный: #6d28d9
   Акцент: #a78bfa
   Фон: #020617
   Текст: #e2e8f0

3. ЗЕЛЕНАЯ ТЕМА:
   Основной: #10b981
   Второстепенный: #047857
   Акцент: #34d399
   Фон: #064e3b
   Текст: #d1fae5

4. НЕЙТРАЛЬНАЯ:
   Основной: #6b7280
   Второстепенный: #4b5563
   Акцент: #9ca3af
   Фон: #111827
   Текст: #f9fafb

ИСТОЧНИКИ ЦВЕТОВ:
- Tailwind CSS Colors
- Material Design Colors
- Coolors.co
- Color Hunt`;
}

// Генерация чек-листа
function generateChecklist() {
    return `ЧЕК-ЛИСТ РАЗРАБОТКИ САЙТА
==========================

✅ ПОДГОТОВКА
   [ ] Определить цель сайта
   [ ] Создать структуру контента
   [ ] Подготовить текст и изображения
   [ ] Выбрать цветовую палитру

✅ РАЗРАБОТКА
   [ ] Создать базовую HTML структуру
   [ ] Добавить CSS стили
   [ ] Сделать адаптивную верстку
   [ ] Добавить JavaScript функционал

✅ ТЕСТИРОВАНИЕ
   [ ] Проверить на разных браузерах
   [ ] Протестировать на мобильных
   [ ] Проверить скорость загрузки
   [ ] Исправить ошибки

✅ ПУБЛИКАЦИЯ
   [ ] Зарегистрировать домен
   [ ] Выбрать хостинг
   [ ] Загрузить файлы на сервер
   [ ] Настроить SSL сертификат

✅ ОПТИМИЗАЦИЯ
   [ ] Оптимизировать изображения
   [ ] Настроить мета-теги для SEO
   [ ] Добавить аналитику
   [ ] Создать файл robots.txt

СОВЕТЫ:
• Используйте семантические теги HTML5
• Минимизируйте CSS и JavaScript
• Оптимизируйте изображения перед загрузкой
• Регулярно делайте резервные копии`;
}

// Генерация всех ресурсов
function generateAllResources() {
    return `ВСЕ МАТЕРИАЛЫ ДЛЯ РАЗРАБОТКИ САЙТОВ
=======================================

${generateHTMLTemplate()}

\n\n${generateColorPalettes()}

\n\n${generateChecklist()}`;
}

// Утилита для скачивания файлов
function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Добавление стилей для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
