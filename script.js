```js
const light=document.getElementById("light");
const light2=document.getElementById("light2");

document.addEventListener("mousemove",(e)=>{

    light.style.left=e.clientX+"px";
    light.style.top=e.clientY+"px";

    light2.style.left=(e.clientX*0.8)+"px";
    light2.style.top=(e.clientY*0.8)+"px";
});
```
