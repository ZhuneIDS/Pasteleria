// script.js
console.log("i");

document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada correctamente");

    const mainPage = document.getElementById("main-section");
    const loginPage = document.getElementById("login-section");
    const registerPage = document.getElementById("register-section");
    const authLinks = document.querySelector(".auth-links");

    document.getElementById("register-link").addEventListener("click", (e) => {
        e.preventDefault();
        loginPage.style.display = "none";
        registerPage.style.display = "flex";
        mainPage.style.display = "none";
        authLinks.style.display = "none";
    });

    document.getElementById("login-link").addEventListener("click", (e) => {
        e.preventDefault();
        registerPage.style.display = "none";
        loginPage.style.display = "flex";
        mainPage.style.display = "none";
        authLinks.style.display = "none";
    });

    document.getElementById("home-link").addEventListener("click", (e) => {
        e.preventDefault();
        loginPage.style.display = "none";
        registerPage.style.display = "none";
        mainPage.style.display = "block";
        authLinks.style.display = "flex";
        mainPage.scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("home-nav").addEventListener("click", (e) => {
        e.preventDefault();
        mainPage.style.display = "block";
        loginPage.style.display = "none";
        registerPage.style.display = "none";
        authLinks.style.display = "flex";
        mainPage.scrollIntoView({ behavior: "smooth" });
    });
});
