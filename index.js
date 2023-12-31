 const menuItems = document.querySelectorAll('.navbar__item');
    const hamburgerBtn = document.querySelector('#hamburgerBtn');
    const menuContainer = document.querySelector('.menu-container');
    const navbar = document.querySelector('.navbar');
    const about = document.querySelector('.about');
    const projects = document.querySelector('#projects');
    const landing = document.querySelector('.landing');
    const scrollFilling = document.querySelector('.scroll-filling');
    const copyBtns = document.querySelectorAll('.copy');
    const topAnchor = document.querySelector('#topAnchor');
    const navbar__item = document.querySelectorAll(".navbar__item");

    const scrollPositions = {
        about: document.querySelector("#about").offsetTop,
        projects: document.querySelector("#projects").offsetTop,
        contact: document.querySelector("#contact").offsetTop,
    };

    const scrollContainer = () => {
        return document.documentElement || document.body;
    };

    function setSectionHeight(section) {
        section.style.height = window.innerHeight * 1.2 - navbar.offsetHeight + "px";
    }

    function setAboutOutline() {
        let navbarHeight = navbar.offsetHeight;
        about.style.borderTop = `solid ${navbarHeight}px transparent`;
        about.style.borderBottom = `solid ${navbarHeight}px transparent`;
    }
  
    function landingScrollChange() {
        if (window.scrollY > 20) {
            let rgb1 = 255 - window.scrollY / 20 < 234 ? 227 : 255 - window.scrollY / 20; //color change
            let rgb2 = 254 - window.scrollY / 20 < 233 ? 226 : 254 - window.scrollY / 20; //color change
            let rgb3 = 235 - window.scrollY / 20 < 214 ? 207 : 235 - window.scrollY / 20; //color change
            document.querySelector(".scroll-filling").style.backgroundColor = `rgb(${rgb1}, ${rgb2}, ${rgb3})`;
            let percent = window.scrollY > 810 ? 100 : window.scrollY / 810 * 100;
            document.querySelector(".landing__col1").style.opacity = `${100 - percent}%`; //opacity change
            document.querySelector(".landing__col2").style.opacity = `${100 - percent}%`; //opacity change
 
        } else { //reset
           document.querySelector(".landing__img").style.filter = "none";
           document.querySelector(".scroll-filling").style.backgroundColor = "rgb(255, 254, 235)";
        }
    }

    function aboutScrollChange() {
        let aboutOffset = about.offsetTop - navbar.offsetHeight/2;
        let scrollOffset = window.scrollY;
        let projectsOffset = projects.offsetTop - navbar.offsetHeight/2;
        const col1 = about.querySelector(".about__col.col-1");
        const col3 = about.querySelector(".about__col.col-3");
        const ilustration = about.querySelector(".about__image.col-2");

        if (scrollOffset - aboutOffset > 100) {
            col1.style.position = "relative";
            col1.style.right = `${scrollOffset - aboutOffset -100}px`;
            col1.style.top = `${(scrollOffset - aboutOffset - 100)*0.8}px`;
            col3.style.position = "relative";
            col3.style.left = `${scrollOffset - aboutOffset - 100}px`;
            col3.style.top = `${(scrollOffset - aboutOffset - 100)*0.8}px`;
            ilustration.style.position = "relative";
            ilustration.style.opacity = `${30 - (scrollOffset - aboutOffset)*0.1}%`;
            
        }  else {
            col1.style.position = "static";
            col3.style.position = "static";
            ilustration.style.opacity = "100%";
        }
    }

    function underlineMenuItem(item) {
        if (window.innerWidth > 800) {
            item.addEventListener('click', (e) => {
                menuItems.forEach(item => item.classList.remove('active'));
                e.target.classList.add('active');
            });
        } else {
            item.addEventListener('click', () => {
                hamburgerBtn.classList.remove('close');
                menuContainer.classList.remove('show');
            });
        }
    }

    function animateHamburgerButton() {
        hamburgerBtn.classList.toggle('close');
        menuContainer.classList.toggle('show');
        if (document.querySelector("#hamburgerBtn").classList.contains("close")) {
            hamburgerBtn.style.transform = "rotate(0deg)";
            hamburgerBtn.style.transition = "transform 0s";
        } else {
            hamburgerBtn.style.transform = "rotate(180deg)";
            hamburgerBtn.style.transition = "transform 200ms ease-in-out";
        }
    }

    function showUnderlineOnScroll() {
        const scrollTop = scrollContainer().scrollTop;
        const windowHeight = window.innerHeight;

        navbar__item.forEach((li) => {
            li.classList.remove("active");
        });
        if (scrollTop < scrollPositions.about - windowHeight / 2) {
            // You're at the top of the page
        } else if (scrollTop < (scrollPositions.projects)) {
            navbar__item[0].classList.add("active"); // About
        } else if (scrollTop < (scrollPositions.contact - 200)) {
            navbar__item[1].classList.add("active"); // Projects
        } else {
            navbar__item[2].classList.add("active"); // Contact
        }
    }

    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    function navbarStickyOnSroll() {
        if (window.scrollY > 1) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ADDING EVENT LISTENERS

    // underline menu items on scroll
    menuItems.forEach(item => {
        underlineMenuItem(item);
    });

    // animate hamburger button on click
    hamburgerBtn.addEventListener('click', animateHamburgerButton);

    // scroll to top on click
    topAnchor.addEventListener('click', topFunction);

    // sticky navbar on scroll, animations on scroll, underline menu items on scroll
    document.addEventListener('scroll', () => {
        navbarStickyOnSroll();
        if ((window.innerWidth > 920) && (window.innerHeight > 520)) { // dont run on mobile
            landingScrollChange();
            aboutScrollChange();
        }
        setAboutOutline();
        if (window.screen.width > 800) { // dont run on mobile
            showUnderlineOnScroll();
        }
    });

    // set section height on load, resize and orientation change
    document.addEventListener("DOMContentLoaded", () => {
        if ((window.innerWidth > 920) && (window.innerHeight > 520)) { // dont run on mobile
            setSectionHeight(about);
        }
    });

    document.addEventListener("resize", () => {
        if ((window.innerWidth > 920) && (window.innerHeight > 520)) { // dont run on mobile
            setSectionHeight(about);
        }
    });

    window.addEventListener('orientationchange', () => {
        if (window.innerWidth > 920 && window.innerHeight > 520) {
            setSectionHeight(about);
        }
    });