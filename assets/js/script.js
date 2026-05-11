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

    // Dark is default; light-mode class activates light theme
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    toggle.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
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

    /* ===== GSAP PROJECT CARDS ===== */
    setTimeout(function () {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.from('#work .box', {
                scrollTrigger: { trigger: '#work', start: 'top 85%' },
                opacity: 0, y: 50, duration: 0.7, stagger: 0.15, ease: 'power3.out'
            });
        }
    }, 80);

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


/* ===== SCROLL REVEAL (IntersectionObserver — no GSAP dependency) ===== */
(function () {
    var SELECTORS = [
        '.about .image img',
        '.about .content h3', '.about .content .tag', '.about .content p',
        '.about .content .box-container', '.about .content .github-card',
        '.about .content .resumebtn',
        '.impact .impact-item',
        '.skills-radar-wrap', '.skills .container',
        '.education .box',
        '.experience .timeline .container.right .content',
        '.experience .timeline .container.left .content',
        '.contact .container'
    ];

    var items = [];
    SELECTORS.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
            items.push({ el: el, dir: sel.includes('.right') ? 'right' : sel.includes('.left') ? 'left' : 'up' });
        });
    });

    // mark each element — CSS transitions take it from hidden → visible
    items.forEach(function (item, i) {
        item.el.classList.add('sr-item', 'sr-' + item.dir);
        item.el.style.transitionDelay = (i % 4) * 0.07 + 's';
    });

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('sr-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    items.forEach(function (item) { io.observe(item.el); });
})();

/* ===== CHART.JS SKILL RADAR ===== */
(function () {
    const ctx = document.getElementById('skillRadar');
    if (!ctx || typeof Chart === 'undefined') return;

    const labels = ['Generative AI', 'Cloud', 'Programming', 'Infrastructure',
                    'Data Engineering', 'Observability', 'DevOps & CI/CD', 'Databases'];
    const scores = [95, 85, 85, 88, 78, 75, 80, 72];

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels,
            datasets: [{
                label: 'Proficiency',
                data: scores,
                backgroundColor: 'rgba(0,217,255,0.08)',
                borderColor: '#00d9ff',
                borderWidth: 2,
                pointBackgroundColor: scores.map((_, i) => i % 2 === 0 ? '#00d9ff' : '#a855f7'),
                pointBorderColor: '#06080f',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#a855f7',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: { duration: 1800, easing: 'easeInOutQuart' },
            scales: {
                r: {
                    min: 0, max: 100,
                    ticks: {
                        stepSize: 25,
                        backdropColor: 'transparent',
                        color: 'rgba(148,163,184,0.5)',
                        font: { size: 10, family: 'Fira Code' }
                    },
                    grid:       { color: 'rgba(0,217,255,0.08)' },
                    angleLines: { color: 'rgba(0,217,255,0.12)' },
                    pointLabels: {
                        color: '#94a3b8',
                        font: { size: 12, family: 'Space Grotesk', weight: '600' }
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(11,14,26,0.95)',
                    titleColor: '#00d9ff',
                    bodyColor: '#e2e8f0',
                    borderColor: 'rgba(0,217,255,0.3)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: ctx => ` ${ctx.raw}% proficiency`
                    }
                }
            }
        }
    });
})();

/* ===== IMPACT COUNTERS ===== */
(function () {
    const counters = document.querySelectorAll('.impact-num');
    if (!counters.length) return;
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = '1';
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 1600;
                const frameRate = 1000 / 60;
                const totalFrames = Math.round(duration / frameRate);
                let frame = 0;
                const counter = setInterval(function () {
                    frame++;
                    const progress = frame / totalFrames;
                    const eased = 1 - Math.pow(1 - progress, 3);
                    entry.target.textContent = Math.floor(eased * target);
                    if (frame === totalFrames) {
                        entry.target.textContent = target;
                        clearInterval(counter);
                    }
                }, frameRate);
            }
        });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { observer.observe(c); });
})();

/* ===== COPY EMAIL ===== */
(function () {
    const btn = document.querySelector('.copy-email-btn');
    if (!btn) return;
    const tooltip = document.createElement('span');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = 'Copied!';
    btn.appendChild(tooltip);
    btn.addEventListener('click', function () {
        navigator.clipboard.writeText('vivianjacobvarghese135@gmail.com').then(function () {
            btn.classList.add('copied');
            btn.querySelector('i').className = 'fas fa-check';
            setTimeout(function () {
                btn.classList.remove('copied');
                btn.querySelector('i').className = 'fas fa-copy';
            }, 2000);
        });
    });
})();

/* ===== TERMINAL EASTER EGG ===== */
(function () {
    const overlay  = document.getElementById('terminal-overlay');
    const input    = document.getElementById('terminal-input');
    const body     = document.getElementById('terminal-body');
    const trigger  = document.getElementById('terminal-trigger');
    const closeBtn = document.getElementById('t-close');
    if (!overlay || !input || !body) return;

    const CMDS = {
        help: function () {
            return [
                '<span class="t-green">Available commands:</span>',
                '  <span class="t-cmd">whoami</span>      — who is Vivian',
                '  <span class="t-cmd">skills</span>      — technical skill set',
                '  <span class="t-cmd">experience</span>  — work history',
                '  <span class="t-cmd">projects</span>    — notable projects',
                '  <span class="t-cmd">contact</span>     — get in touch',
                '  <span class="t-cmd">clear</span>       — clear terminal',
                '  <span class="t-cmd">exit</span>        — close terminal',
            ];
        },
        whoami: function () {
            return [
                '<span class="t-green">Vivian Jacob Varghese</span>',
                'Senior AI Engineer — Generative AI & LLM Systems',
                'Currently @ EPAM Systems, Bengaluru',
                '',
                'Specializes in RAG pipelines, multi-agent orchestration,',
                'LangGraph, AWS Bedrock (Claude), and AIOps at scale.',
                '',
                '<span class="t-orange">Impact:</span> 100K+ events/day · 65% MTTR reduction · 350+ eng hours saved/day',
            ];
        },
        skills: function () {
            return [
                '<span class="t-green">Core Skills:</span>',
                '  <span class="t-orange">GenAI</span>    → LangGraph, LangChain, AWS Bedrock, RAG Pipelines',
                '  <span class="t-orange">Cloud</span>    → AWS, GCP, Azure',
                '  <span class="t-orange">Infra</span>    → Kubernetes (EKS), Docker, Terraform, Ansible',
                '  <span class="t-orange">Data</span>     → Apache Spark, Kafka, Airflow, SageMaker',
                '  <span class="t-orange">Observe</span>  → Prometheus, Datadog, ELK Stack',
                '  <span class="t-orange">Code</span>     → Python, FastAPI, Java, Scala, Bash',
                '  <span class="t-orange">Databases</span>→ PostgreSQL, MongoDB, MySQL, OpenSearch',
            ];
        },
        experience: function () {
            return [
                '<span class="t-green">Work History:</span>',
                '  <span class="t-orange">2025–Present</span>  Senior AI Engineer, EPAM Systems',
                '  <span class="t-orange">2024–2025</span>     Software Engineer (MLOps), Tekcog Inc.',
                '  <span class="t-orange">2021–2022</span>     Consultant, Capgemini',
                '  <span class="t-orange">2018–2021</span>     Software Engineer, Mindtree Ltd.',
            ];
        },
        projects: function () {
            return [
                '<span class="t-green">Notable Projects:</span>',
                '  → <span class="t-cmd">EEG Seizure Detection</span>',
                '    ML/Python/MATLAB · SVM + ANN classifiers',
                '',
                '  → <span class="t-cmd">FAQ Chatbot for Faculty Support</span>',
                '    LLMs · NLP · Google Workspace APIs',
                '',
                '  → <span class="t-cmd">Cloud Monitoring App</span>',
                '    AWS · Docker · Kubernetes · CloudWatch',
            ];
        },
        contact: function () {
            return [
                '<span class="t-green">Contact:</span>',
                '  Email    vivianjacobvarghese135@gmail.com',
                '  GitHub   github.com/engineerviv',
                '  LinkedIn linkedin.com/in/vivian-jacob-varghese',
                '  Location Bengaluru, India',
            ];
        },
        clear: function () { body.innerHTML = ''; return []; },
        exit:  function () { closeTerminal(); return []; },
        quit:  function () { closeTerminal(); return []; },
    };

    function addLine(html) {
        var div = document.createElement('div');
        div.className = 't-line';
        div.innerHTML = html;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    function openTerminal() {
        overlay.classList.add('open');
        setTimeout(function () { input.focus(); }, 80);
    }

    function closeTerminal() {
        overlay.classList.remove('open');
        input.value = '';
    }

    if (trigger) trigger.addEventListener('click', openTerminal);
    if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeTerminal(); });

    document.addEventListener('keydown', function (e) {
        if ((e.key === '`' || e.key === '~') && !overlay.classList.contains('open')) {
            e.preventDefault();
            openTerminal();
        } else if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeTerminal();
        }
    });

    var history = [];
    var histIdx = -1;

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            var raw = input.value;
            var cmd = raw.trim().toLowerCase();
            addLine('<span class="t-prompt-inline">vivian@portfolio:~$</span> ' + raw);
            input.value = '';
            histIdx = -1;
            if (!cmd) return;
            history.unshift(cmd);
            if (CMDS[cmd]) {
                CMDS[cmd]().forEach(addLine);
            } else if (cmd.startsWith('echo ')) {
                addLine(raw.slice(5));
            } else {
                addLine('<span class="t-red">command not found: ' + cmd + '</span> — type <span class="t-cmd">help</span>');
            }
            addLine('&nbsp;');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (histIdx > 0) { histIdx--; input.value = history[histIdx]; }
            else { histIdx = -1; input.value = ''; }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            var partial = input.value.toLowerCase();
            var match = Object.keys(CMDS).find(function (k) { return k.startsWith(partial) && k !== partial; });
            if (match) input.value = match;
        }
    });
})();