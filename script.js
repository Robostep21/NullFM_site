const light = document.querySelector('.cursor-light');

document.addEventListener('mousemove', (e)=>{
    light.style.left = e.clientX + 'px';
    light.style.top = e.clientY + 'px';
});

function forceTop(){
    window.scrollTo(0, 0);
}
window.addEventListener("load", () => {
    forceTop();
    loadLatestRelease();
});
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

document.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    } else {
        window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
    }
}, { passive: true });

async function loadLatestRelease() {
    try {
        const response = await fetch(
            "https://api.github.com/repos/Robostep21/NullFM_site/releases"
        );

        const releases = await response.json();

        if (!Array.isArray(releases) || releases.length === 0) {
            throw new Error("Релизы не найдены");
        }

        const release = releases[0];

        document.getElementById("version").textContent = release.tag_name;

        const downloadBtn = document.getElementById("downloadBtn");

        if (release.assets.length > 0) {
            downloadBtn.href = release.assets[0].browser_download_url;
            downloadBtn.textContent = "DOWNLOAD INSTALLER";
        } else {
            downloadBtn.textContent = "NO FILE";
        }
    } catch (error) {
        console.error(error);

        document.getElementById("version").textContent = "OFFLINE";
        document.getElementById("downloadBtn").textContent = "DOWNLOAD ERROR";
    }
}

loadLatestRelease();

let allReleases = [];

async function loadAllReleases() {
    try {
        const response = await fetch(
            "https://api.github.com/repos/Robostep21/NullFM_site/releases"
        );
        const releases = await response.json();
        if (!Array.isArray(releases)) return;
        allReleases = releases;
        renderVersionsList();
    } catch (error) {
        console.error("Не удалось загрузить список версий:", error);
    }
}

function renderVersionsList() {
    const list = document.getElementById("versionsList");
    list.innerHTML = "";

    allReleases.forEach(release => {
        if (!release.assets || release.assets.length === 0) return;

        const date = new Date(release.published_at).toLocaleDateString("ru-RU");
        const item = document.createElement("a");
        item.className = "version-item";
        item.href = release.assets[0].browser_download_url;

        item.innerHTML = `
            <span class="v-tag">${release.tag_name}</span>
            <span class="v-date">${date}</span>
        `;

        list.appendChild(item);
    });

    if (allReleases.length === 0) {
        list.innerHTML = `<div class="version-item">Версии не найдены</div>`;
    }
}

const versionsToggleBtn = document.getElementById("versionsToggleBtn");
const versionsList = document.getElementById("versionsList");

versionsToggleBtn.addEventListener("click", () => {
    versionsList.classList.toggle("open");
});

loadAllReleases();
