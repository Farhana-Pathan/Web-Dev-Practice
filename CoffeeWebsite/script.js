HEAD
const menuOpenButton = document.querySelector("#menu-open-btn");

menuOpenButton.addEventListener("click", ()=>{
    document.body.classList.toggle("show-mobile-menu");
});

