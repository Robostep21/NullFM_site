// MOUSE LIGHT
const light = document.querySelector('.cursor-light');

document.addEventListener('mousemove', (e)=>{
    light.style.left = e.clientX + 'px';
    light.style.top = e.clientY + 'px';
});


// GALLERY FULLSCREEN
const viewer = document.getElementById('viewer');
const viewerImg = document.getElementById('viewerImg');
const closeBtn = document.getElementById('closeViewer');

document.querySelectorAll('.gallery-img').forEach(img=>{
    img.addEventListener('click', ()=>{
        viewer.style.display = 'flex';
        viewerImg.src = img.src;
    });
});

closeBtn.onclick = () => {
    viewer.style.display = 'none';
};

viewer.onclick = (e)=>{
    if(e.target === viewer){
        viewer.style.display = 'none';
    }
};

// ESC CLOSE
document.addEventListener('keydown', (e)=>{
    if(e.key === "Escape"){
        viewer.style.display = 'none';
    }
});


// TICKER CENTER PAUSE LOGIC
const ticker = document.getElementById('tickerText');

function restartTicker(){
    ticker.style.animation = 'none';

    setTimeout(()=>{
        ticker.style.animation = 'move 12s linear infinite';
    }, 3000); // pause in "center feeling"
}

setInterval(restartTicker, 12000);


// RANDOM BACKGROUND GLOW CIRCLES
function spawnGlow(){
    const c = document.createElement('div');
    c.style.position = 'fixed';
    c.style.width = '10px';
    c.style.height = '10px';
    c.style.borderRadius = '50%';
    c.style.background = 'rgba(0,255,120,0.15)';
    c.style.left = Math.random()*window.innerWidth + 'px';
    c.style.top = Math.random()*window.innerHeight + 'px';
    c.style.pointerEvents = 'none';
    c.style.transition = '2s';
    document.body.appendChild(c);

    setTimeout(()=>{
        c.style.opacity = 0;
        c.style.transform = 'scale(20)';
    }, 50);

    setTimeout(()=>{
        c.remove();
    }, 2000);
}

setInterval(spawnGlow, 800);
