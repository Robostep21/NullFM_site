const light = document.querySelector('.cursor-light');

document.addEventListener('mousemove', (e)=>{
    light.style.left = e.clientX + 'px';
    light.style.top = e.clientY + 'px';
});

function forceTop(){
    window.scrollTo(0, 0);
}

window.addEventListener("load", forceTop);
window.addEventListener("pageshow", forceTop);
window.addEventListener("beforeunload", forceTop);

// FULLSCREEN VIEWER FIX
const viewer = document.getElementById('viewer');
const viewerImg = document.getElementById('viewerImg');
const closeBtn = document.getElementById('closeViewer');

function openViewer(src){
    viewer.style.display = 'flex';
    viewerImg.src = src;
}

document.querySelectorAll('.gallery-img').forEach(img=>{
    img.addEventListener('click', ()=>{
        openViewer(img.src);
    });
});

closeBtn.addEventListener('click', ()=>{
    viewer.style.display = 'none';
});

viewer.addEventListener('click', (e)=>{
    if(e.target === viewer){
        viewer.style.display = 'none';
    }
});

document.addEventListener('keydown', (e)=>{
    if(e.key === "Escape"){
        viewer.style.display = 'none';
    }
});


const slides = document.querySelectorAll(".slide");

let currentSlide = 0;
let locked = false;

function goToSlide(i){
    if(i < 0 || i >= slides.length) return;

    locked = true;
    currentSlide = i;

    slides[i].scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        locked = false;
    }, 800);
}

window.addEventListener("wheel", (e) => {
    if(locked) return;

    if(e.deltaY > 0){
        goToSlide(currentSlide + 1);
    } else {
        goToSlide(currentSlide - 1);
    }
});
