# Portfolio Website — CLAUDE.md

## Project Overview
Personal portfolio website for Vivian Jacob Varghese, a Software Engineer specializing in Cloud, DevOps, and Machine Learning. Hosted via GitHub Pages at `engineerviv.github.io`.

## File Structure
```
engineerviv.github.io/
├── index.html                  # Main single-page portfolio
├── 404.html                    # Custom error page
├── skills.json                 # Skills data (24 skills)
│
├── experience/
│   ├── index.html              # Full experience timeline page
│   ├── style.css
│   └── script.js
│
├── projects/
│   ├── index.html              # Full projects page with Isotope filtering
│   ├── projects.json           # Project data (3 projects)
│   ├── style.css
│   └── script.js
│
└── assets/
    ├── css/style.css           # Main stylesheet (1226 lines)
    ├── js/
    │   ├── script.js           # Main JS (241 lines)
    │   ├── app.js              # Particles.js config
    │   └── particles.min.js
    └── images/                 # All image assets
```

## Design System
- **Primary Font:** Poppins (headings), Nunito (body)
- **Colors:**
  - Primary Blue: `#2506ad`
  - Accent Orange: `#ff7b00` / `#fc8c05`
  - Dark Navy: `#0e2431` / `#020133`
  - Purple Gradient: `#57059e → #4a00e0` (skills section)
  - Background Light: `#f7f7f7` / `#e5ecfb`
- **Base Font Size:** 62.5% (1rem = 10px)
- **Breakpoints:** 768px, 600px, 450px

## Tech Stack (Libraries)
- **jQuery 3.6.0** — DOM manipulation
- **Typed.js 2.0.5** — Hero typing animation
- **Vanilla-Tilt 1.7.0** — 3D hover effect on project cards
- **Particles.js** — Hero background animation
- **ScrollReveal** — Scroll-triggered animations
- **Isotope 3.0.6** — Projects page filtering
- **EmailJS 3** — Contact form email delivery
- **Tawk.to** — Live chat widget
- **Font Awesome 5.15.3** — Icons

## Sections (index.html)
1. **Hero** — Particle background, typed animation, profile image with tilt
2. **About** — Bio, contact info card, resume download
3. **Skills** — Loaded from `skills.json`, 6-col grid
4. **Education** — 2 degrees (IIT + VTU)
5. **Work/Projects** — First 10 from `projects.json`, hover reveal cards
6. **Experience** — 3 roles in alternating timeline (Capgemini, Mindtree x2)
7. **Contact** — EmailJS form with icon inputs
8. **Footer** — Links, social icons, contact info

## Content Data
- Skills: `skills.json` (24 items: AWS, Azure, Python, Docker, Kubernetes, Terraform, etc.)
- Projects: `projects/projects.json` (3 items: EEG Detection, FAQ Chatbot, Cloud Monitoring App)
- Experience roles: Hard-coded in `index.html` and `experience/index.html`

## Key Behaviors
- Nav scroll-spy highlights the active section
- Mobile hamburger menu at ≤768px
- ScrollReveal animates elements from top (80px, 1000ms)
- Tilt effect: max 15° on profile and project cards
- Tab hidden → title changes to "Come Back To Portfolio" + favicon swap
- Right-click and F12/DevTools keys disabled (developer protection)
- Scroll-to-top button appears after 60px scroll

## Improvement Goals
See task list for the full roadmap. High-level themes:
1. Add dark/light mode toggle
2. Enhance animations (cursor, scroll progress, section transitions)
3. Add GitHub stats and activity graph
4. Improve Skills section (progress bars or radar chart)
5. Rework hero layout and typography
6. Add certifications / awards section
7. SEO and Open Graph meta tags
8. Performance: lazy-load images, optimize assets
9. Remove DevTools blocking (bad UX practice)
10. Add project detail modals (instead of navigating away)

## Development Notes
- No build system — pure HTML/CSS/JS, edit files directly
- Deploy by pushing to `main` branch of the GitHub repo
- All CDN links are in `<head>` of each HTML file
- `projects.json` category field drives Isotope filter: `"Machine Learning"`, `"DevOps"`
- EmailJS service ID: `contact_service`, template: `template_contact`
