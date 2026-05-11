$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href === '#' || !$(href).length) return;
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(href).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Vivian Jacob Varghese";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Generative AI", "LLM Orchestration", "RAG Pipelines", "Multi-Agent Systems", "AIOps", "Cloud Infrastructure"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

/* ===== SCROLL PROGRESS BAR ===== */
window.addEventListener('scroll', function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
});

/* ===== CUSTOM CURSOR ===== */
(function () {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .btn, .tilt, .bar').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
})();

/* ===== DARK MODE TOGGLE ===== */
(function () {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.body.classList.add('dark');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    toggle.addEventListener('click', function () {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
})();

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    const container = document.getElementById("skillsContainer");
    const groups = {};
    skills.forEach(skill => {
        const cat = skill.category || "Other";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(skill);
    });

    let html = "";
    Object.keys(groups).forEach(cat => {
        html += `<div class="skill-group">
          <h3 class="skill-category">${cat}</h3>
          <div class="skill-items">`;
        groups[cat].forEach(skill => {
            html += `<div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
                <span>${skill.name}</span>
              </div>
            </div>`;
        });
        html += `</div></div>`;
    });
    container.innerHTML = html;
}

let allProjects = [];

function openModal(project) {
    document.getElementById('modal-img').src = `/assets/images/projects/${project.image}.png`;
    document.getElementById('modal-title').textContent = project.name;
    document.getElementById('modal-desc').textContent = project.desc;
    document.getElementById('modal-github').href = project.links.code;

    const demoEl = document.getElementById('modal-demo');
    if (project.links.demo) {
        demoEl.href = project.links.demo;
        demoEl.style.display = 'flex';
    } else {
        demoEl.style.display = 'none';
    }

    const tagsEl = document.getElementById('modal-tags');
    tagsEl.innerHTML = (project.techStack || []).map(t => `<span>${t}</span>`).join('');

    const featuresEl = document.getElementById('modal-features');
    featuresEl.innerHTML = (project.features || []).map(f => `<li>${f}</li>`).join('');

    document.getElementById('project-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('modal-close').addEventListener('click', function () {
    document.getElementById('project-modal').classList.remove('open');
    document.body.style.overflow = '';
});
document.getElementById('project-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('open');
        document.body.style.overflow = '';
    }
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.getElementById('project-modal').classList.remove('open');
        document.body.style.overflow = '';
    }
});

function showProjects(projects) {
    allProjects = projects;
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach((project, idx) => {
        projectHTML += `
        <div class="box tilt" data-project-idx="${idx}" style="cursor:pointer">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="${project.name}" loading="lazy" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank" onclick="event.stopPropagation()"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank" onclick="event.stopPropagation()">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    document.querySelectorAll('#work .box[data-project-idx]').forEach(card => {
        card.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-project-idx'));
            openModal(allProjects[idx]);
        });
    });

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL CERTIFICATIONS */
srtop.reveal('.certifications .cert-card', { interval: 150 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });