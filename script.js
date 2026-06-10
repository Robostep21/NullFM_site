```js
const glow = document.getElementById("cursorGlow");

let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;

let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove",e=>{

    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow(){

    currentX += (mouseX-currentX)*0.08;
    currentY += (mouseY-currentY)*0.08;

    glow.style.left=currentX+"px";
    glow.style.top=currentY+"px";

    requestAnimationFrame(animateGlow);
}

animateGlow();

setInterval(()=>{

    const wave=document.createElement("div");

    wave.className="wave-bg";

    wave.style.left=Math.random()*window.innerWidth+"px";
    wave.style.top=Math.random()*window.innerHeight+"px";

    document
    .getElementById("backgroundEffects")
    .appendChild(wave);

    setTimeout(()=>{
        wave.remove();
    },6000);

},1500);

const messages=[

"UNKNOWN TRANSMISSION",
"88.7 FM SIGNAL FOUND",
"VOICE DETECTED",
"STATIC DETECTED",
"NULL FM ACTIVE"
];

const ticker=document.getElementById("ticker");

let index=0;

function cycleTicker(){

    ticker.style.transition="none";
    ticker.style.transform="translateX(100vw)";

    setTimeout(()=>{

        ticker.innerText=
        messages[index];

        ticker.style.transition=
        "transform 2s ease";

        ticker.style.transform=
        "translateX(0)";

        index=
        (index+1)%messages.length;

        setTimeout(()=>{

            ticker.style.transition=
            "transform 2s ease";

            ticker.style.transform=
            "translateX(-100vw)";

        },3500);

    },50);
}

cycleTicker();
setInterval(cycleTicker,7500);

document.querySelectorAll(".card")
.forEach(card=>{

    card.addEventListener("mousemove",e=>{

        const rect=
        card.getBoundingClientRect();

        card.style.setProperty(
            "--x",
            `${e.clientX-rect.left}px`
        );

        card.style.setProperty(
            "--y",
            `${e.clientY-rect.top}px`
        );
    });
});

const viewer =
document.getElementById("viewer");

const viewerImage =
document.getElementById("viewerImage");

document
.querySelectorAll(".gallery-img")
.forEach(img=>{

    img.addEventListener("click",()=>{

        viewerImage.src=img.src;

        viewer.classList.add("active");
    });
});

document
.getElementById("viewerClose")
.onclick=()=>{

    viewer.classList.remove("active");
};

viewer.onclick=(e)=>{

    if(e.target===viewer){

        viewer.classList.remove("active");
    }
};

document.addEventListener(
"keydown",
e=>{

    if(e.key==="Escape"){

        viewer.classList.remove("active");
    }
});
```
