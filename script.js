// Internationalization
const translations = {
    ko: {
        'title': 'Jupiter - 중요한 가치를 전달하는 앱 개발 회사',
        'hero-subtitle': '중요한 가치를 사용자들에게 전달하는 앱을 만듭니다',
        'hero-description': 'Jupiter는 사용자들에게 의미 있는 경험과 가치를 제공하는 모바일 앱을 개발합니다.<br>우리의 앱들은 단순한 기능을 넘어서 사용자의 일상에 긍정적인 영향을 미치도록 설계되었습니다.',
        'section-title': '대표 앱',
        'app-capybara': '카피바라 찾기',
        'app-sudoku': '캐릭터 스도쿠',
        'app-choicely': '초이슬리',
        'app-tarot': '나의 타로 일기',
        'footer-established': '2025년 설립',
        'footer-location': '서울 지점',
        'footer-rights': 'All rights reserved.'
    },
    en: {
        'title': 'Jupiter - App Development Company Delivering Important Values',
        'hero-subtitle': 'We create apps that deliver important values to users',
        'hero-description': 'Jupiter develops mobile apps that provide meaningful experiences and value to users.<br>Our apps are designed to have a positive impact on users\' daily lives beyond simple functionality.',
        'section-title': 'Featured Apps',
        'app-capybara': 'Find Capybara',
        'app-sudoku': 'Character Sudoku',
        'app-choicely': 'Choicely',
        'app-tarot': 'My Tarot Diary',
        'footer-established': 'Established in 2025',
        'footer-location': 'Seoul Branch',
        'footer-rights': 'All rights reserved.'
    }
};

let currentLang = localStorage.getItem('language') || 'ko';

// Update page content based on current language
function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'TITLE') {
                element.textContent = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    // Update alt attributes for images
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        if (translations[lang] && translations[lang][key]) {
            element.alt = translations[lang][key];
        }
    });

    // Update language button text
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.querySelector('.lang-text').textContent = lang === 'ko' ? 'EN' : '한';
    }
}

// Toggle language
function toggleLanguage() {
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    updateLanguage(newLang);
}

// Smooth scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    updateLanguage(currentLang);

    // Language toggle button
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }

    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe app cards
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

