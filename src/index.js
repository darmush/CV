import "@babel/polyfill";
import "./style.css";
import dictionary from "./js/translate.json";

const rootElement = document.documentElement;
const appContainer = document.querySelector('.app-container');
const themeBtn = document.querySelector('.theme-btn');
const themeBtnEl = document.querySelector('.theme-btn-element');
const themeBtnEl1 = document.querySelector('.theme-btn-element-1');
const themeBtnEl2 = document.querySelector('.theme-btn-element-2');
const languageBtns = document.querySelectorAll('.language-btn');
const languageBtnEn = document.querySelector('.language-btn-en');
const languageBtnRu = document.querySelector('.language-btn-ru');
const sections = document.querySelectorAll('section');
const navbarItems = document.querySelectorAll('.navbar-item');
const burgerIcon = document.querySelector('.burger-icon');
const burgerIconRects = document.querySelectorAll('.burger-icon-rect');
const navbarContainer = document.querySelector('.navbar-container');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const controlPanel = document.querySelector('.control-panel');
const downloadBtn = document.querySelector('.download-btn');

const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

window.onload = function() {
    appContainer.removeAttribute('style')
    appContainer.classList.add('animate-opacity')
}

appContainer.addEventListener('animationend', () => {
    appContainer.classList.remove('opacity-0', 'animate-opacity')
})

appContainer.addEventListener('click', element => {
    switch(element.target) {
        case themeBtn:
        case themeBtnEl:
        case themeBtnEl1:
        case themeBtnEl2:
            changeColorTheme()
            break
        case languageBtnEn:
            changeLanguage('en')
            break
        case languageBtnRu:
            changeLanguage('ru')
            break
        case burgerIcon:
        case element.target.closest('.burger-icon-rect'):
        case element.target.closest('.navbar-item'):
            toggleBurgerMenu()
            break
        default:
    }
})

localStorage.language ? changeLanguage(localStorage.language) : setLanguage()

function setLanguage() {
    let userLanguage = (window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage).substr(0, 2)
    userLanguage == 'ru' || userLanguage == 'en' ? changeLanguage(userLanguage) : changeLanguage('en')
}

function changeLanguage(lang) {
    let activeLangBtn = document.querySelector(`[data-language="${lang}"]`)
    languageBtns.forEach(element => element.classList.remove('bg-accent', 'text-black'))
    activeLangBtn.classList.add('bg-accent', 'text-black')
    localStorage.language = lang
    for (let key in dictionary) {
        let elements = document.querySelectorAll(`[data-translate="${key}"]`);
        if (elements) {
            elements.forEach(element => element.innerHTML = dictionary[key][lang])
        }
    }
    downloadBtn.setAttribute('href', `./Podskrebalina_Darya_Frontend_Developer_${lang}.pdf`)
}

function changeColorTheme() {
    rootElement.classList.toggle('dark')
    setColorTheme()
}

function setColorTheme() {
    rootElement.classList.contains('dark') ? changeColorSVG('#181818', '#FFFFFF') : changeColorSVG('#FFFFFF', '#181818')
    rootElement.classList.contains('dark') ? localStorage.theme = 'dark' : localStorage.theme = 'light'
}

function changeColorSVG(getColor, setColor) {
    document.querySelectorAll(`[fill="${getColor}"]`).forEach(el => el.setAttribute('fill', setColor))
    document.querySelectorAll(`[stroke="${getColor}"]`).forEach(el => el.setAttribute('stroke', setColor))
}

// Открытие меню при клике по иконке меню
function toggleBurgerMenu() {
    if(burgerIcon.classList.contains('burger-icon_close') || window.matchMedia('(min-width: 870px)').matches) {
        closeBurgerMenu();
    } else {
        openBurgerMenu();
    }
}

function closeBurgerMenu() {
    header.classList.replace('h-full', 'h-16')
    header.classList.add('border-b-[2px]')
    navbarContainer.classList.remove()
    navbar.classList.remove('gap-8')
    navbar.classList.add('max-md:hidden')
    controlPanel.classList.remove('max-md:w-full', 'justify-between', 'order-last')
    burgerIcon.classList.remove('burger-icon_close', 'mb-auto')
    themeBtn.classList.add('max-md:hidden')
    burgerIconRects[0].classList.remove('rotate-45')
    burgerIconRects[0].setAttribute('x', '0')
    burgerIconRects[0].setAttribute('y', '0')
    burgerIconRects[1].classList.remove('w-0')
    burgerIconRects[2].classList.remove('-rotate-45')
    burgerIconRects[2].setAttribute('x', '0')
}

function openBurgerMenu() {
    header.classList.replace('h-16', 'h-full')
    navbarContainer.classList.add()
    navbar.classList.add('gap-8')
    navbar.classList.remove('max-md:hidden')
    controlPanel.classList.add('max-md:w-full', 'justify-between', 'order-last')
    burgerIcon.classList.add('burger-icon_close', 'mb-auto')
    themeBtn.classList.remove('max-md:hidden')
    burgerIconRects[0].classList.add('rotate-45')
    burgerIconRects[0].setAttribute('x', '3')
    burgerIconRects[0].setAttribute('y', '-3')
    burgerIconRects[1].classList.add('w-0')
    burgerIconRects[2].classList.add('-rotate-45')
    burgerIconRects[2].setAttribute('x', '-8')
}

// При загрузке страницы определить какая тема выбрана у пользователя по умолчанию или выбрать сохраненную в Local Storage, если такая есть
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && themeMediaQuery.matches)) {
    rootElement.classList.add('dark')
    setColorTheme()
} else {
    rootElement.classList.remove('dark')
    setColorTheme()
}

const options = {
    rootMargin: '0px',
    threshold: [0, 0.2, 1],
}

const callback = (entries) => {
    entries.forEach(({ isIntersecting, intersectionRatio, target}) => {
        let targetSection = target.dataset.section;

        if (isIntersecting) {
            // Раскрытие раздела в меню, который соответствует просматриваемой секции
            if (intersectionRatio >= 0.15) {
                switch(targetSection) {
                    case '':
                        break
                    default: {
                        setNavbarClass(targetSection)
                    }
                }
            }
        }
    })
}

function setNavbarClass(nameSection) {
    if (!document.querySelector(`.${nameSection}`).classList.contains('active')){
        navbarItems.forEach((item) => {
            item.classList.remove('active')
        });
        // Находим пункт меню по классу с названием секции
        document.querySelector(`.${nameSection}`).classList.add('flex-1', 'active')
        navbarItems.forEach((item) => {
            if (!item.classList.contains('active')) {
                item.classList.remove('flex-1')
            }
        });
    }
}

const observer = new IntersectionObserver(callback, options)

sections.forEach(section => observer.observe(section))
