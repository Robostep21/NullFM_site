const light = document.querySelector('.cursor-light');

document.addEventListener('mousemove', (e)=>{
    light.style.left = e.clientX + 'px';
    light.style.top = e.clientY + 'px';
});


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
