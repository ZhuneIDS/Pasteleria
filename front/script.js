// script.js

// Mensaje de depuración para verificar que el script se ha cargado
console.log("Script cargado correctamente");

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada correctamente");

    // Obtener referencias a las secciones principales de la página
    const mainPage = document.getElementById("main-section"); // Sección principal
    const loginPage = document.getElementById("login-section"); // Sección de inicio de sesión
    const registerPage = document.getElementById("register-section"); // Sección de registro
    const authLinks = document.querySelector(".auth-links"); // Enlaces de autenticación en la barra superior

    // Manejar el clic en el enlace "Registrar"
    document.getElementById("register-link").addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        loginPage.style.display = "none"; // Oculta la sección de inicio de sesión
        registerPage.style.display = "flex"; // Muestra la sección de registro
        mainPage.style.display = "none"; // Oculta la sección principal
        authLinks.style.display = "none"; // Oculta los enlaces de autenticación
    });

    // Manejar el clic en el enlace "Iniciar sesión"
    document.getElementById("login-link").addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        registerPage.style.display = "none"; // Oculta la sección de registro
        loginPage.style.display = "flex"; // Muestra la sección de inicio de sesión
        mainPage.style.display = "none"; // Oculta la sección principal
        authLinks.style.display = "none"; // Oculta los enlaces de autenticación
    });

    // Manejar el clic en el enlace "Lunelle" (logo) para volver a la página principal
    document.getElementById("home-link").addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        loginPage.style.display = "none"; // Oculta la sección de inicio de sesión
        registerPage.style.display = "none"; // Oculta la sección de registro
        mainPage.style.display = "block"; // Muestra la sección principal
        authLinks.style.display = "flex"; // Muestra los enlaces de autenticación
        mainPage.scrollIntoView({ behavior: "smooth" }); // Desplaza suavemente a la sección principal
    });

    // Manejar el clic en el enlace "Inicio" en la barra de navegación
    document.getElementById("home-nav").addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        mainPage.style.display = "block"; // Muestra la sección principal
        loginPage.style.display = "none"; // Oculta la sección de inicio de sesión
        registerPage.style.display = "none"; // Oculta la sección de registro
        authLinks.style.display = "flex"; // Muestra los enlaces de autenticación
        mainPage.scrollIntoView({ behavior: "smooth" }); // Desplaza suavemente a la sección principal
    });
});