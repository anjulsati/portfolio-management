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

    /* =====================================================
       QUEUE MANAGEMENT + ALGORITHM: PRIORITIZE PROJECTS BY CATEGORY
       - design analysis: ensures highest-value categories render first
       - algorithm: weighted sort with stable ordering
    ====================================================== */
    const prioritizeProjectsByCategory = (projects, categoryPriority = ["Web", "Mobile", "Data", "AI"]) => {
        const weight = new Map(categoryPriority.map((cat, idx) => [cat.toLowerCase(), idx]));

        return [...projects].sort((a, b) => {
            const wa = weight.has(a.category.toLowerCase()) ? weight.get(a.category.toLowerCase()) : categoryPriority.length;
            const wb = weight.has(b.category.toLowerCase()) ? weight.get(b.category.toLowerCase()) : categoryPriority.length;

            if (wa !== wb) return wa - wb;
            if (a.title !== b.title) return a.title.localeCompare(b.title);
            return 0;
        });
    };

    const getCategoryPriority = () => {
        const select = document.getElementById("categoryPriority");
        if (!select || !select.value) return ["Web", "Mobile", "Data", "AI"];
        return select.value.split(",").map(item => item.trim()).filter(Boolean);
    };

    const setupCategoryPriorityListener = () => {
        const select = document.getElementById("categoryPriority");
        if (!select) return;
        select.addEventListener("change", () => {
            fetchProjects();
        });
    };

    /* =====================================================
       FETCH DYNAMIC PROJECTS FROM CMS (UPDATED STYLE)
    ====================================================== */
    const fetchProjects = async () => {
        const projectsContainer = document.getElementById("dynamic-projects");
        if (!projectsContainer) return;

        try {
            const response = await fetch("http://localhost:5000/api/projects");
            const projects = await response.json();

            projectsContainer.innerHTML = ""; // Clear loading state

            if (projects.length === 0) {
                projectsContainer.innerHTML = "<p style='color: var(--text-muted);'>No projects found. Add some from the Admin panel.</p>";
                return;
            }

            // design analysis: pick a prioritized order for featured categories before rendering
            const categoryPriority = getCategoryPriority();
            const sortedProjects = prioritizeProjectsByCategory(projects, categoryPriority);

            sortedProjects.forEach((proj, index) => {
                // UPDATE: The tech stack items now have 'span' tags applied for pill boxes
                const techSpans = proj.techStack.map(tech => `<span>${tech.trim()}</span>`).join('');
                
                // Add staggered animation delay
                const delayClass = index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : '';

                const projectHTML = `
                    <div class="project-card hidden show ${delayClass}">
                        <div class="card-content">
                            <div class="card-header">
                                <i class="fas fa-folder-open folder-icon"></i>
                                <span style="font-size: 0.8rem; color: var(--text-muted);">${proj.category}</span>
                            </div>
                            <h3>${proj.title}</h3>
                            <p>${proj.description}</p>
                            <div class="tech-stack-mini tags">
                                ${techSpans}
                            </div>
                        </div>
                    </div>
                `;
                projectsContainer.innerHTML += projectHTML;
            });
        } catch (error) {
            console.error("Error fetching projects:", error);
            projectsContainer.innerHTML = "<p style='color: #ff4d4d;'>Failed to load projects. Is the backend server running?</p>";
        }
    };

    // set up prioritization control listener and load projects
    setupCategoryPriorityListener();
    fetchProjects();

    /* =====================================================
       CONTACT FORM SUBMISSION (Formspree Integration)
    ====================================================== */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = {
                email: contactForm.querySelector('input[name="email"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value,
            };

            const submitBtn = document.getElementById("submitBtn");
            const formMessage = document.getElementById("formMessage");
            const originalBtnHTML = submitBtn.innerHTML;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            formMessage.style.display = "none";

            try {
                const response = await fetch("https://formspree.io/f/mpqozkqj", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    // Success
                    formMessage.className = "form-message success";
                    formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
                    formMessage.style.display = "block";
                    contactForm.reset();

                    // Clear message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = "none";
                    }, 5000);
                } else {
                    throw new Error("Form submission failed");
                }
            } catch (error) {
                console.error("Form submission error:", error);
                formMessage.className = "form-message error";
                formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
                formMessage.style.display = "block";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        });
    }
});