// navbar.js
function loadNavigation() {
    // Создаем HTML для навигации
    const navHTML = `
        <nav class="top-nav-panel">
            <div class="top-nav-content">
                <div class="nav-link" id="homeLink">ГЛАВНАЯ СТРАНИЦА</div>
                <div class="nav-link strikethrough">ОБО МНЕ</div>
                <div class="settings-dropdown">
                    <div class="nav-link" id="settingsToggle">НАСТРОЙКИ</div>
                    <div class="settings-menu">
                        <div class="settings-section">
                            <div class="settings-section-title">Тема</div>
                            <div class="settings-buttons-row">
                                <div class="settings-button theme-button active" data-theme="auto">Авто</div>
                                <div class="settings-button theme-button" data-theme="light">Белая</div>
                                <div class="settings-button theme-button" data-theme="dark">Тёмная</div>
                            </div>
                        </div>
                        <div class="settings-section">
                            <div class="settings-section-title">Текст</div>
                            <div class="settings-buttons-row">
                                <div class="settings-button" data-font-size="small">Мелкий</div>
                                <div class="settings-button active" data-font-size="standard">Стандартный</div>
                                <div class="settings-button" data-font-size="large">Крупный</div>
                            </div>
                        </div>
                        <div class="settings-section">
                            <div class="settings-section-title">Ширина</div>
                            <div class="settings-buttons-row">
                                <div class="settings-button active" data-container-width="standard">Стандартный</div>
                                <div class="settings-button" data-container-width="wide">Широкий</div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="https://github.com/DMIX76" class="github-link" target="_blank">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
            </div>
        </nav>

        <nav class="mobile-nav-panel">
            <div class="mobile-nav-content">
                <div class="mobile-nav-left">
                    <div class="mobile-nav-item" title="Настройки">
                        <div class="mobile-nav-icon no-select">⚙️</div>
                    </div>
                </div>
                <div class="mobile-nav-right">
                    <div class="mobile-nav-item" title="Вернуться на заглавную страницу">
                        <div class="mobile-nav-icon no-select">🏠</div>
                    </div>
                </div>
            </div>
        </nav>
    `;

    // Вставляем навигацию в начало body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Инициализируем функциональность навигации
    initNavigation();
}

function initNavigation() {
    const body = document.body;
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsDropdown = document.querySelector('.settings-dropdown');
    const homeLink = document.getElementById('homeLink');
    const mobileHomeButton = document.querySelector('.mobile-nav-item[title="Вернуться на заглавную страницу"]');
    
    // Функция для применения темы "Авто"
    function applyAutoTheme() {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        body.setAttribute('data-theme', systemTheme);
    }
    
    // Функция для определения пути к главной странице
    function getHomePath() {
        const currentPath = window.location.pathname;
        const currentPage = window.location.href;
        
        console.log('Current path:', currentPath);
        console.log('Current page:', currentPage);
        
        // Если находимся в корне, используем index.html
        if (currentPath === '/' || currentPath.endsWith('/index.html') || !currentPath.includes('/')) {
            return 'index.html';
        }
        
        // Определяем уровень вложенности по количеству слэшей в пути
        const pathParts = currentPath.split('/').filter(part => part.length > 0);
        console.log('Path parts:', pathParts);
        
        // Если находимся в папке задания (например: /Computer Science Test/)
        if (pathParts.length >= 2) {
            return '../index.html';
        }
        
        // Если находимся в подпапке задания (например: /Raphael/)
        if (pathParts.length >= 1) {
            return '../index.html';
        }
        
        // По умолчанию
        return 'index.html';
    }
    
    // Функция для перехода на главную страницу
    function goToHomePage() {
        const homePath = getHomePath();
        console.log('Navigating to:', homePath);
        window.location.href = homePath;
    }
    
    // Установка начальных настроек
    function setInitialSettings() {
        const savedTheme = localStorage.getItem('theme') || 'auto';
        const savedFontSize = localStorage.getItem('fontSize') || 'standard';
        const savedContainerWidth = localStorage.getItem('containerWidth') || 'standard';
        
        // Применяем тему
        if (savedTheme === 'auto') {
            applyAutoTheme();
        } else {
            body.setAttribute('data-theme', savedTheme);
        }
        
        body.setAttribute('data-font-size', savedFontSize);
        body.setAttribute('data-container-width', savedContainerWidth);
        
        // Активируем соответствующие кнопки
        document.querySelectorAll('.settings-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeThemeBtn = document.querySelector(`.theme-button[data-theme="${savedTheme}"]`);
        const activeFontBtn = document.querySelector(`.settings-button[data-font-size="${savedFontSize}"]`);
        const activeWidthBtn = document.querySelector(`.settings-button[data-container-width="${savedContainerWidth}"]`);
        
        if (activeThemeBtn) activeThemeBtn.classList.add('active');
        if (activeFontBtn) activeFontBtn.classList.add('active');
        if (activeWidthBtn) activeWidthBtn.classList.add('active');
    }
    
    // Устанавливаем начальные настройки
    setInitialSettings();
    
    // Обработчик для кнопки "ГЛАВНАЯ СТРАНИЦА"
    if (homeLink) {
        homeLink.addEventListener('click', goToHomePage);
    }
    
    // Обработчик для мобильной кнопки "Домой"
    if (mobileHomeButton) {
        mobileHomeButton.addEventListener('click', goToHomePage);
    }
    
    // Обработчик открытия/закрытия меню настроек
    if (settingsToggle) {
        settingsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsDropdown.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (settingsDropdown && !settingsDropdown.contains(e.target)) {
            settingsDropdown.classList.remove('active');
        }
    });

    // Обработчики для всех кнопок настроек
    document.querySelectorAll('.settings-button').forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            const fontSize = button.getAttribute('data-font-size');
            const containerWidth = button.getAttribute('data-container-width');
            
            if (theme) {
                // Обработка темы
                document.querySelectorAll('.theme-button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                if (theme === 'auto') {
                    applyAutoTheme();
                } else {
                    body.setAttribute('data-theme', theme);
                }
                localStorage.setItem('theme', theme);
            }
            
            if (fontSize) {
                // Обработка размера текста
                document.querySelectorAll('.settings-button[data-font-size]').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                body.setAttribute('data-font-size', fontSize);
                localStorage.setItem('fontSize', fontSize);
            }
            
            if (containerWidth) {
                // Обработка ширины
                document.querySelectorAll('.settings-button[data-container-width]').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                body.setAttribute('data-container-width', containerWidth);
                localStorage.setItem('containerWidth', containerWidth);
            }
        });
    });

    // Слушатель изменений системной темы (для режима "Авто")
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === 'auto') {
            applyAutoTheme();
        }
    });
}

// Загружаем навигацию когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavigation);
} else {
    loadNavigation();
}