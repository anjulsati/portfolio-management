"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       DOM SELECTORS (Single Source of Truth)
    ====================================================== */
    const navbar = document.querySelector(".navbar");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");
    const hiddenElements = document.querySelectorAll(".hidden");

    if (!navbar || !navLinks || !navItems.length) return;

    /* =====================================================
       UTILITY: THROTTLE (Performance Optimized)
    ====================================================== */
    const throttle = (fn, delay = 100) => {
        let lastCall = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall < delay) return;
            lastCall = now;
            fn(...args);
        };
    };

    /* =====================================================
       MOBILE NAV TOGGLE (Accessible)
    ====================================================== */
    if (hamburger) {
        hamburger.setAttribute("aria-label", "Toggle navigation");
        hamburger.setAttribute("aria-expanded", "false");

        hamburger.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            hamburger.setAttribute("aria-expanded", String(isOpen));
        });
    }

    navItems.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger?.setAttribute("aria-expanded", "false");
        });
    });

    /* =====================================================
       SMOOTH SCROLL (Safe Fallback)
    ====================================================== */
    navItems.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            if (!targetId || !targetId.startsWith("#")) return;

            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            event.preventDefault();
            targetEl.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    /* =====================================================
       ACTIVE NAV LINK ON SCROLL
    ====================================================== */
    const activateNavOnScroll = () => {
        let currentSection = "";

        sections.forEach(section => {
            const offsetTop = section.offsetTop - 120;
            if (window.scrollY >= offsetTop) {
                currentSection = section.id;
            }
        });

        navItems.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentSection}`
            );
        });
    };

    /* =====================================================
       NAVBAR SHADOW ON SCROLL
    ====================================================== */
    const handleNavbarScroll = () => {
        navbar.style.boxShadow =
            window.scrollY > 20
                ? "0 10px 30px rgba(0,0,0,0.4)"
                : "none";
    };

    /* =====================================================
       SCROLL REVEAL (Intersection Observer)
    ====================================================== */
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        hiddenElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for very old browsers
        hiddenElements.forEach(el => el.classList.add("show"));
    }

    /* =====================================================
       SCROLL EVENT LISTENER (Throttled)
    ====================================================== */
    const onScroll = throttle(() => {
        activateNavOnScroll();
        handleNavbarScroll();
    }, 100);

    window.addEventListener("scroll", onScroll, { passive: true });
});