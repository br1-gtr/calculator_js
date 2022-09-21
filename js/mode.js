const mode = document.querySelector('#modeSwitch');
const container = document.querySelector('#container');

mode.addEventListener('click',()=>{
    if (container.classList == 'dark-mode'){
        addLightMode();
    } else {
        addDarkMode();
    }
});

const addDarkMode = () => {
    container.classList.remove('light-mode');
    container.classList.add('dark-mode');
    mode.textContent = 'Light Mode';
    localStorage.setItem('mode', 'dark');   
};

const addLightMode = () => {
    container.classList.remove('dark-mode');
    container.classList.add('light-mode');
    mode.textContent = 'Dark Mode';
    localStorage.setItem('mode', 'light');
};

const localStorageMode = () => {
    if(localStorage.getItem('mode') === 'dark'){
        addDarkMode();
    } else {
        addLightMode();
    }
};

localStorageMode();