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

const models = document.querySelectorAll(".drag-rotate");

models.forEach(model => {
    let isDown = false;
    let startX = 0;
    let yaw = 0;

    model.style.cursor = "grab";

    model.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.clientX;
        model.style.cursor = "grabbing";
    });

    window.addEventListener("mouseup", () => {
        isDown = false;
        model.style.cursor = "grab";
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        const deltaX = e.clientX - startX;
        startX = e.clientX;

        yaw += deltaX * 0.5;

        model.setAttribute(
            "camera-orbit",
            `${yaw}deg 75deg 105%`
        );
    });
});

const btn = document.querySelector(".download-btn");

fetch("https://raw.githubusercontent.com/Robostep21/NullFM_site/main/Installs/latest.json")
  .then(r => r.json())
  .then(data => {

      const url = `https://raw.githubusercontent.com/Robostep21/NullFM_site/main/Installs/${data.file}`;

      btn.href = url;
      btn.innerText = `DOWNLOAD INSTALLER v${data.version}`;

      console.log("Updated download link:", url);
  })
  .catch(err => console.error("Update fetch failed:", err));
