const filterInput = document.querySelector('.filter');
const textsWrap = document.querySelector('.texts');
const loading = document.querySelector('.loader');

let limit = 5;
let page = 1;

// Call Texts
async function getTexts(){
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    const data = await res.json();
    return data;
}

// Get Texts
async function showTexts(){
    const texts = await getTexts();

    texts.forEach(text => {
        const main_div = document.createElement('div');
        main_div.classList.add('text');
        main_div.innerHTML = `
        <div class="text-number">${text.id}</div>
        <div class="text-main">
          <div class="text-main-title">${text.title}</div>
          <div class="text-main-text">${text.body}</div>
        </div>`
        textsWrap.append(main_div);
    });
}

// Filter Function
function filterTexts(e){
    const term = e.target.value.toUpperCase();
    const texts = document.querySelectorAll('.text');

    texts.forEach(text => {
        const title = text.querySelector('.text-main-title').innerText.toUpperCase();
        const body = text.querySelector('.text-main-text').innerText.toUpperCase();
        
        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            text.style.display = 'flex';
        } else{
            text.style.display = 'none';
        }
    });
}

// Show Loader
function showLoading(){
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showTexts();
        }, 300);
    }, 1000);
}

// Initial Setting
showTexts();

// Input Setting
filterInput.addEventListener('input', filterTexts);

// Loading
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    console.log(scrollTop, scrollHeight, clientHeight)
    if(scrollTop + clientHeight == scrollHeight){
        showLoading();
    }
});