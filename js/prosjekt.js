
const main = document.querySelector("main");

var url_string = window.location.href; 
var url = new URL(url_string);
let pid = url.searchParams.get("pid");

const db = firebase.database(); 
const admin = db.ref("portfolio/prosjekter/" + pid);
const prosjekter = db.ref("portfolio/prosjekter");

let sider = [];


function visProsjekt(snap) {
    const innhold = snap.val(); 

    let indeks = sider.indexOf(snap.key);

    if(indeks === sider.length - 1) {
        indeks = -1;
    }

    let pid_neste = sider[indeks + 1];

    main.innerHTML = `
        <h1>${innhold.overskrift}</h1>
        <h2>${innhold.tittel}</h2>
        <h3>${innhold.tema}</h3>
        <p>${innhold.sammendrag}</p>

        <div class="images skisse">
            <img src="${innhold.skissebilde.url} alt="skisser"> 
        </div>
        <p style="margin-top: 100px;">${innhold.målgruppe}</p>
        <div class="images mockups">
            <img src="${innhold.macbilde.url} alt="mac"> 
        </div>
        <p style="margin-top: 100px;">${innhold.prosjekt}</p>
        <div class="images mockups">
            <img src="${innhold.iphonebilde.url} alt="iphone"> 
        </div>
        <footer>
            <a href="${innhold.link}" target="_blank">Se prosjektet her</a>
            <div class="link-border nettside"></div>
            <a style="font-weight:700" href="prosjekt.html?pid=${pid_neste}">Neste arbeid</a>
            <div class="link-border"></div>
        </footer>
    `;
}

function visProsjekter(snap) {
    sider.push(snap.key);
}

prosjekter.on("child_added", visProsjekter);

setTimeout(function() {
    overlay.style.display = "none"; 
    admin.on("value", visProsjekt);
}, 1000);



