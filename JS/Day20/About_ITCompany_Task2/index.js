/* ==========================================================================
   IT AFTER 3 YEARS: RESEARCH DOSSIER & CHENNAI PERSPECTIVE
   Interactive DOM Manipulation Script
   
   Coding Standards Applied:
   - Zero arrow functions (standard 'function' syntax throughout)
   - Zero 'var' keyword (strictly 'const' and 'let')
   - Pure Vanilla JavaScript DOM manipulation
   - Beginner-friendly comments for trainer demonstration
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
  
  // 1. Initialize Sticky Navigation & Mobile Menu Drawer
  initNavigation();

  // 2. Initialize Scroll-Spy for Active Navigation Link Highlighting
  initScrollSpy();

  // 3. Initialize "Explore the Future" Hero Action Button
  initExploreButton();

  // 4. Initialize Animated Stat Counters
  initAnimatedCounters();

  // 5. Initialize Interactive 3-Stage Timeline (About Section)
  initTimelineStages();

  // 6. Initialize Connected Chennai Challenge Impact Matrix (Section 4)
  initChallengeMatrix();

  // 7. Initialize 5-Stage Future Roadmap (Solutions Section)
  initRoadmapTabs();

  // 8. Initialize Floating Back-to-Top Button
  initBackToTop();
});


/* ==========================================================================
   1. NAVIGATION & MOBILE DRAWER FUNCTIONALITY
   ========================================================================== */
function initNavigation() {
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  // Toggle mobile navigation menu open/close
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", function() {
      const isOpen = mobileMenu.classList.contains("open");

      if (isOpen) {
        mobileMenu.classList.remove("open");
        mobileMenu.classList.add("closed");
        hamburgerIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      } else {
        mobileMenu.classList.remove("closed");
        mobileMenu.classList.add("open");
        hamburgerIcon.classList.add("hidden");
        closeIcon.classList.remove("hidden");
      }
    });
  }

  // Smooth scroll handler for all internal navigation anchor links
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function(event) {
      const targetId = this.getAttribute("href");

      // Only handle internal hash links
      if (targetId && targetId.startsWith("#")) {
        event.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Smooth scroll to destination section
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

          // If mobile menu was open, close it
          if (mobileMenu && mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            mobileMenu.classList.add("closed");
            if (hamburgerIcon && closeIcon) {
              hamburgerIcon.classList.remove("hidden");
              closeIcon.classList.add("hidden");
            }
          }
        }
      }
    });
  }
}


/* ==========================================================================
   2. SCROLL-SPY ACTIVE LINK HIGHLIGHTER
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const desktopLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function() {
    const scrollPosition = window.scrollY + 180;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Update active class on desktop navigation links
        for (let j = 0; j < desktopLinks.length; j++) {
          const link = desktopLinks[j];
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        }
      }
    }
  });
}


/* ==========================================================================
   3. HERO CTA BUTTON SMOOTH SCROLL
   ========================================================================== */
function initExploreButton() {
  const exploreBtn = document.getElementById("exploreBtn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function() {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }
}


/* ==========================================================================
   4. DYNAMIC ANIMATED STAT COUNTERS
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll(".stat-counter");
  let hasAnimated = false;

  function runCounterAnimation() {
    for (let i = 0; i < counters.length; i++) {
      const counterElement = counters[i];
      const targetValue = parseInt(counterElement.getAttribute("data-target"), 10);
      let currentValue = 0;
      const stepTime = 25; // milliseconds
      const totalSteps = 60;
      const increment = Math.ceil(targetValue / totalSteps);

      const timer = setInterval(function() {
        currentValue = currentValue + increment;
        if (currentValue >= targetValue) {
          counterElement.textContent = targetValue;
          clearInterval(timer);
        } else {
          counterElement.textContent = currentValue;
        }
      }, stepTime);
    }
  }

  // Check visibility on scroll to trigger animation once
  window.addEventListener("scroll", function() {
    const heroStatsArea = document.querySelector("#home .stat-counter");
    if (heroStatsArea && !hasAnimated) {
      const rect = heroStatsArea.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        hasAnimated = true;
        runCounterAnimation();
      }
    }
  });

  // Initial trigger check if user refreshes page at the top
  const heroStatsArea = document.querySelector("#home .stat-counter");
  if (heroStatsArea) {
    const rect = heroStatsArea.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0 && !hasAnimated) {
      hasAnimated = true;
      runCounterAnimation();
    }
  }
}


/* ==========================================================================
   5. INTERACTIVE 3-STAGE TIMELINE (ABOUT SECTION)
   ========================================================================= */
const timelineData = {
  "today": {
    badge: "STAGE 01 // CURRENT PARADIGM (2026)",
    title: "Manual Syntax Writing & Code Copilots",
    description: "In the present stage, developers still write code line by line using languages like JavaScript, Python, and Java. AI assistants act mainly as auto-complete tools.",
    process: [
      { label: "Primary Human Task", text: "Writing syntactic logic, functions, debugging runtime errors, and manual unit testing." },
      { label: "Role of AI", text: "Code autocomplete, snippet suggestions, and syntax explanation." },
      { label: "Development Cycle", text: "2 to 3 week agile sprints with manual pull request reviews." },
      { label: "Output Format", text: "Human-authored source files committed to version control repositories." }
    ],
    statusColor: "text-copper-400"
  },
  "three-years": {
    badge: "STAGE 02 // TRANSITION HORIZON (NEXT 3 YEARS)",
    title: "Autonomous Agent Synthesis & Architecture Review",
    description: "Over the next 3 years, traditional junior coding tasks will be synthesized by autonomous AI swarms. The human developer transitions into a System Architect and Logic Reviewer.",
    process: [
      { label: "Primary Human Task", text: "Defining system specifications, business constraints, edge cases, and architectural diagrams." },
      { label: "Role of AI", text: "Generating complete database schemas, REST/GraphQL APIs, UI components, and self-writing test suites." },
      { label: "Development Cycle", text: "Continuous conversational iteration — full features built and deployed in hours instead of weeks." },
      { label: "Output Format", text: "Verified production pipelines compiled directly from declarative human requirements." }
    ],
    statusColor: "text-copper-400"
  },
  "future": {
    badge: "STAGE 03 // MATURE HORIZON (POST-2029)",
    title: "Intent-Driven IT Ecosystems & Self-Healing Cloud",
    description: "Manual coding disappears entirely from standard enterprise workflows. Software systems are generated dynamically on demand, monitored by neural security auditors and self-repairing infrastructure.",
    process: [
      { label: "Primary Human Task", text: "Ethical governance, creative problem formulation, domain-specific logic, and high-level strategy." },
      { label: "Role of AI", text: "End-to-end self-evolving software creation, real-time autonomous bug patching, and zero-day threat defense." },
      { label: "Development Cycle", text: "Real-time on-demand software synthesis triggered by business events." },
      { label: "Output Format", text: "Ephemeral, self-optimizing micro-architectures that adapt live to user behavior." }
    ],
    statusColor: "text-sage-400"
  }
};

function renderTimelineStage(stageKey) {
  const container = document.getElementById("stageDetailsContainer");
  const data = timelineData[stageKey];

  if (!container || !data) return;

  let processHtml = "";
  for (let i = 0; i < data.process.length; i++) {
    const item = data.process[i];
    processHtml += '<div class="p-4 bg-charcoal-900 border border-charcoal-800 rounded-sm">' +
      '<div class="text-[11px] font-tech text-copper-400 uppercase tracking-wider mb-1">' + item.label + '</div>' +
      '<div class="text-xs sm:text-sm text-ivory-200">' + item.text + '</div>' +
    '</div>';
  }

  container.innerHTML = 
    '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-charcoal-800">' +
      '<span class="text-xs font-tech font-bold uppercase ' + data.statusColor + '">' + data.badge + '</span>' +
      '<span class="text-xs font-tech text-ivory-400">Process Inspection</span>' +
    '</div>' +
    '<h4 class="text-xl sm:text-2xl font-editorial font-bold text-ivory-50 mt-4 mb-2">' + data.title + '</h4>' +
    '<p class="text-sm text-ivory-300 leading-relaxed mb-6">' + data.description + '</p>' +
    '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
      processHtml +
    '</div>';
}

function initTimelineStages() {
  const buttons = document.querySelectorAll(".timeline-btn");

  // Initial render with 'today'
  renderTimelineStage("today");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      const stageKey = this.getAttribute("data-stage");

      // Update button active styles
      for (let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("active-stage");
        const badge = buttons[j].querySelector(".stage-badge");
        if (badge) {
          badge.classList.remove("bg-copper-500", "text-white");
          badge.classList.add("bg-charcoal-700", "text-ivory-300");
        }
      }

      this.classList.add("active-stage");
      const currentBadge = this.querySelector(".stage-badge");
      if (currentBadge) {
        currentBadge.classList.remove("bg-charcoal-700", "text-ivory-300");
        currentBadge.classList.add("bg-copper-500", "text-white");
      }

      // Render details
      renderTimelineStage(stageKey);
    });
  }
}


/* ==========================================================================
   6. CHENNAI IMPACT & CHALLENGE MATRIX INSPECTOR (SECTION 4)
   ========================================================================== */
const challengeData = {
  "legacy-code": {
    num: "01",
    title: "Legacy Codebase Maintenance Debt",
    severity: "CRITICAL VULNERABILITY",
    severityClass: "text-copper-400 bg-copper-500/20 border-copper-500/40",
    rootCause: "Over 25 years of custom enterprise code (Java, .NET, COBOL) running in Chennai-managed global banking, insurance, and automotive systems.",
    chennaiImpact: "Chennai IT giants (TCS, Infosys, Cognizant, Wipro along OMR) maintain mission-critical infrastructure for Western clients. If human coders who understand historical edge-cases disappear, sudden production outages cannot be quickly diagnosed.",
    mitigation: "Immediate deployment of specialized AI reverse-engineering tools alongside deep architectural documentation drives before manual developers exit."
  },
  "cyber-risks": {
    num: "02",
    title: "Automated Cybersecurity Vulnerabilities",
    severity: "HIGH THREAT",
    severityClass: "text-copper-400 bg-copper-500/20 border-copper-500/40",
    rootCause: "AI models generate syntactically correct code that often contains subtle logic flaws, insecure deserialization, and authentication bypasses.",
    chennaiImpact: "Chennai's growing SaaS and FinTech hubs handle millions of citizen transactions and global payment flows. Automated vulnerabilities could expose customer data to autonomous hacking bots without detection.",
    mitigation: "Mandatory human-in-the-loop penetration audits, continuous neural threat modeling, and zero-trust sandbox deployments."
  },
  "service-disruption": {
    num: "03",
    title: "Digital Public Service Disruptions",
    severity: "PUBLIC IMPACT",
    severityClass: "text-ochre-400 bg-ochre-500/20 border-ochre-500/40",
    rootCause: "Unforeseen third-party API changes, expired certificates, and unhandled server failovers in civic web services.",
    chennaiImpact: "Disruption in Tamil Nadu e-Governance portals (TNeGA), Chennai Metro QR ticketing, electricity billing (TANGEDCO), and property registration systems, causing direct inconvenience to millions of citizens.",
    mitigation: "State-level digital redundancy units trained in AI oversight and fallback offline operational protocols."
  },
  "delivery-bottlenecks": {
    num: "04",
    title: "Business Delivery & Pipeline Bottlenecks",
    severity: "ECONOMIC FRICTION",
    severityClass: "text-ivory-200 bg-charcoal-800 border-charcoal-700",
    rootCause: "Clients demanding customized integration features that generic AI prompts cannot resolve without bespoke business context.",
    chennaiImpact: "Contractual disputes and milestone delays across OMR software development centers, impacting regional revenue and international client trust.",
    mitigation: "Transitioning delivery managers into Technical Solution Architects who translate client specifications into precise algorithmic prompts."
  },
  "support-vacuum": {
    num: "05",
    title: "Lack of Custom Technical Support",
    severity: "OPERATIONAL GAP",
    severityClass: "text-ivory-200 bg-charcoal-800 border-charcoal-700",
    rootCause: "Standard AI models cannot diagnose unique hardware-software combinations found in legacy factories and data centers.",
    chennaiImpact: "Chennai's manufacturing belts in Sriperumbudur and Oragadam (automotive and electronics) facing delays when automation software fails to sync with assembly line controllers.",
    mitigation: "Cross-training industrial automation engineers with embedded AI troubleshooting skills."
  },
  "ai-dependence": {
    num: "06",
    title: "Overdependence on Black-Box AI Systems",
    severity: "GOVERNANCE RISK",
    severityClass: "text-sage-400 bg-sage-500/20 border-sage-500/40",
    rootCause: "Organizations adopting AI code generators without understanding how the generated algorithms make internal decisions.",
    chennaiImpact: "Legal compliance failures, unexplainable pricing algorithms, and severe vendor lock-in with offshore proprietary AI model providers.",
    mitigation: "State and corporate adoption of open-weight foundational models that permit transparent algorithmic auditing."
  },
  "skill-gap": {
    num: "07",
    title: "Academic & Engineering Skill Disconnect",
    severity: "WORKFORCE CHALLENGE",
    severityClass: "text-copper-400 bg-copper-500/20 border-copper-500/40",
    rootCause: "College syllabi still teaching syntax memorization, rote code writing, and basic loop exercises instead of systems architecture.",
    chennaiImpact: "Over 100,000 engineering graduates across Tamil Nadu facing unemployability if their only qualification is writing basic syntax that AI generates in seconds.",
    mitigation: "Emergency modernization of Anna University & autonomous college curricula focusing on system design, logic, and prompt engineering."
  },
  "system-decay": {
    num: "08",
    title: "Critical Infrastructure Software Decay",
    severity: "SYSTEMIC RISK",
    severityClass: "text-ochre-400 bg-ochre-500/20 border-ochre-500/40",
    rootCause: "Software systems left running on automated autopilot without continuous human code inspection and architectural refactoring.",
    chennaiImpact: "Gradual instability in Chennai Port logistics tracking, hospital healthcare records, and city water management control networks.",
    mitigation: "Establishing public-private Digital Infrastructure Oversight Boards for continuous resilience monitoring."
  }
};

function renderChallengeDetail(nodeKey) {
  const card = document.getElementById("challengeDetailCard");
  const data = challengeData[nodeKey];

  if (!card || !data) return;

  card.innerHTML = 
    '<div>' +
      '<div class="flex items-center justify-between pb-4 border-b border-charcoal-700">' +
        '<div class="flex items-center gap-2">' +
          '<span class="w-7 h-7 rounded bg-copper-500 text-white font-tech text-xs font-bold flex items-center justify-center">' + data.num + '</span>' +
          '<span class="text-xs font-tech uppercase tracking-widest text-ivory-300">Vulnerability Inspector</span>' +
        '</div>' +
        '<span class="px-2.5 py-1 text-[11px] font-tech font-bold uppercase rounded border ' + data.severityClass + '">' + data.severity + '</span>' +
      '</div>' +
      '<h4 class="text-2xl font-editorial font-bold text-ivory-50 mt-5 mb-4">' + data.title + '</h4>' +
      '<div class="space-y-4 text-xs sm:text-sm">' +
        '<div class="p-4 bg-charcoal-900 border-l-2 border-copper-500 rounded-sm">' +
          '<span class="block text-[11px] font-tech text-copper-400 uppercase tracking-wider mb-1">Root Cause</span>' +
          '<p class="text-ivory-300 leading-relaxed">' + data.rootCause + '</p>' +
        '</div>' +
        '<div class="p-4 bg-charcoal-900 border-l-2 border-sage-500 rounded-sm">' +
          '<span class="block text-[11px] font-tech text-sage-400 uppercase tracking-wider mb-1">Chennai Corridor Impact (OMR / Siruseri)</span>' +
          '<p class="text-ivory-300 leading-relaxed">' + data.chennaiImpact + '</p>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="mt-6 pt-4 border-t border-charcoal-700">' +
      '<div class="flex items-start gap-2">' +
        '<span class="text-xs font-tech font-bold text-ochre-400 uppercase tracking-wider shrink-0 mt-0.5">Recommended Action:</span>' +
        '<p class="text-xs text-ivory-200 leading-relaxed">' + data.mitigation + '</p>' +
      '</div>' +
    '</div>';
}

function initChallengeMatrix() {
  const nodes = document.querySelectorAll(".matrix-node");

  // Initial render with 'legacy-code'
  renderChallengeDetail("legacy-code");

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].addEventListener("click", function() {
      const nodeKey = this.getAttribute("data-node");

      // Reset all nodes
      for (let j = 0; j < nodes.length; j++) {
        nodes[j].classList.remove("active-matrix");
        const svg = nodes[j].querySelector("svg");
        if (svg) {
          svg.classList.remove("text-copper-400");
          svg.classList.add("text-ivory-500");
        }
      }

      // Activate clicked node
      this.classList.add("active-matrix");
      const currentSvg = this.querySelector("svg");
      if (currentSvg) {
        currentSvg.classList.remove("text-ivory-500");
        currentSvg.classList.add("text-copper-400");
      }

      // Render detailed view
      renderChallengeDetail(nodeKey);
    });
  }
}


/* ==========================================================================
   7. INTERACTIVE 5-STAGE FUTURE ROADMAP (SOLUTIONS SECTION)
   ========================================================================== */
const roadmapData = {
  "learn": {
    num: "01",
    stage: "STAGE 01: LEARN",
    title: "Master Core Logic & Systems Thinking",
    subtitle: "From Syntax Memorization to Architectural Design",
    description: "Instead of memorizing syntax rules and framework boilerplate, developers and students must learn how software components interact at a fundamental level.",
    actionPoints: [
      "Deep understanding of distributed systems, database normal forms, and network latency.",
      "Learning precise prompt engineering and natural language requirement specification.",
      "Mastering algorithmic logic and mathematical problem-solving."
    ],
    chennaiPlan: "Engineering institutions across Chennai (Anna University, IIT Madras Research Park) incorporating AI-assisted systems curricula.",
    outcome: "Graduates capable of directing and designing complex systems with clarity."
  },
  "adapt": {
    num: "02",
    stage: "STAGE 02: ADAPT",
    title: "Human + AI Symbiosis & Workflow Automation",
    subtitle: "Embracing AI as the Co-Architect",
    description: "IT professionals must stop viewing AI as a replacement and start leveraging it as a high-speed multiplier for code generation, testing, and documentation.",
    actionPoints: [
      "Building automated CI/CD pipelines orchestrated by autonomous agents.",
      "Developing rapid prototyping skills to convert client ideas into functional apps within hours.",
      "Transitioning from manual testers to AI verification supervisors."
    ],
    chennaiPlan: "OMR IT service companies implementing mandatory upskilling programs for over 300,000 software engineers.",
    outcome: "10x productivity boost with human-in-the-loop quality guarantees."
  },
  "build": {
    num: "03",
    stage: "STAGE 03: BUILD",
    title: "Architectural Oversight & Open Source Stewardship",
    subtitle: "Creating Resilient and Transparent Digital Assets",
    description: "Focus on building modular, open, and auditable software architectures that resist black-box lock-in and support long-term maintainability.",
    actionPoints: [
      "Designing microservices with self-documenting APIs and clean boundary contracts.",
      "Actively contributing to open-source foundational tools and local tech communities.",
      "Building software that can be audited, explained, and modified without vendor lock-in."
    ],
    chennaiPlan: "Chennai's SaaS startup ecosystem establishing shared open-source testing benches and design systems.",
    outcome: "Robust digital infrastructure built on transparent and verifiable code."
  },
  "secure": {
    num: "04",
    stage: "STAGE 04: SECURE",
    title: "Autonomous Cybersecurity & Verification Auditing",
    subtitle: "Zero-Trust Neural Defense and Compliance",
    description: "As software generation accelerates, automated security auditing and ethical compliance become the most critical safeguards against catastrophic bugs.",
    actionPoints: [
      "Deploying continuous automated fuzz testing and red-teaming agents.",
      "Enforcing strict data privacy (DPDP Act) and ethical AI governance standards.",
      "Human-verified cryptographic signing of all production deployments."
    ],
    chennaiPlan: "Tamil Nadu state government setting up a Cyber Resilience Center in Taramani for public digital assets.",
    outcome: "Zero-day vulnerability mitigation and uncompromised public trust."
  },
  "innovate": {
    num: "05",
    stage: "STAGE 05: INNOVATE",
    title: "Domain-Driven Innovation & Human Creativity",
    subtitle: "Solving Real-World Problems Through Empathy and Context",
    description: "The ultimate value of technology lies in solving real human problems—in agriculture, healthcare, local governance, and climate resilience—which AI alone cannot contextualize.",
    actionPoints: [
      "Focusing on domain expertise: healthcare informatics, fintech regulations, and smart urban mobility.",
      "Applying human empathy, cultural nuance, and ethics to product design.",
      "Building tech solutions tailored specifically to regional and global challenges."
    ],
    chennaiPlan: "Startups building localized solutions for Tamil Nadu's industrial, medical, and educational sectors.",
    outcome: "Technological advancement centered on human flourishing and progress."
  }
};

function renderRoadmapDetail(stepKey) {
  const display = document.getElementById("roadmapDetailDisplay");
  const data = roadmapData[stepKey];

  if (!display || !data) return;

  let actionsHtml = "";
  for (let i = 0; i < data.actionPoints.length; i++) {
    actionsHtml += '<li class="flex items-start gap-2 text-xs sm:text-sm text-ivory-300">' +
      '<span class="text-copper-400 font-bold mt-0.5">•</span>' +
      '<span>' + data.actionPoints[i] + '</span>' +
    '</li>';
  }

  display.innerHTML = 
    '<div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-charcoal-700">' +
      '<div>' +
        '<span class="text-xs font-tech font-bold uppercase text-copper-400 tracking-wider">' + data.stage + '</span>' +
        '<h4 class="text-2xl font-editorial font-bold text-ivory-50 mt-1">' + data.title + '</h4>' +
        '<span class="text-xs font-tech text-sage-400 italic">' + data.subtitle + '</span>' +
      '</div>' +
      '<span class="px-3 py-1 bg-charcoal-900 border border-charcoal-700 text-xs font-tech text-ivory-300 rounded-sm self-start md:self-auto">Strategic Milestone</span>' +
    '</div>' +
    '<p class="text-sm text-ivory-300 leading-relaxed my-5">' + data.description + '</p>' +
    '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">' +
      '<div class="p-5 bg-charcoal-900 border border-charcoal-800 rounded-sm">' +
        '<span class="text-xs font-tech text-copper-400 uppercase tracking-wider block mb-3 font-bold">Key Action Steps</span>' +
        '<ul class="space-y-2.5">' + actionsHtml + '</ul>' +
      '</div>' +
      '<div class="p-5 bg-charcoal-900 border border-charcoal-800 rounded-sm flex flex-col justify-between space-y-4">' +
        '<div>' +
          '<span class="text-xs font-tech text-sage-400 uppercase tracking-wider block mb-2 font-bold">Chennai Implementation Focus</span>' +
          '<p class="text-xs sm:text-sm text-ivory-300 leading-relaxed">' + data.chennaiPlan + '</p>' +
        '</div>' +
        '<div class="pt-3 border-t border-charcoal-800">' +
          '<span class="text-[11px] font-tech text-ochre-400 uppercase tracking-wider block">Target Outcome:</span>' +
          '<span class="text-xs font-semibold text-ivory-200">' + data.outcome + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function initRoadmapTabs() {
  const steps = document.querySelectorAll(".roadmap-step");

  // Initial render with 'learn'
  renderRoadmapDetail("learn");

  for (let i = 0; i < steps.length; i++) {
    steps[i].addEventListener("click", function() {
      const stepKey = this.getAttribute("data-step");

      // Reset step styles
      for (let j = 0; j < steps.length; j++) {
        steps[j].classList.remove("active-step");
        steps[j].classList.remove("border-copper-500");
        steps[j].classList.add("border-charcoal-700");
        const numBadge = steps[j].querySelector(".step-num");
        if (numBadge) {
          numBadge.classList.remove("bg-copper-500", "text-white");
          numBadge.classList.add("bg-charcoal-700", "text-ivory-300");
        }
      }

      // Activate clicked step
      this.classList.add("active-step");
      this.classList.remove("border-charcoal-700");
      this.classList.add("border-copper-500");
      const currentNum = this.querySelector(".step-num");
      if (currentNum) {
        currentNum.classList.remove("bg-charcoal-700", "text-ivory-300");
        currentNum.classList.add("bg-copper-500", "text-white");
      }

      // Render roadmap details
      renderRoadmapDetail(stepKey);
    });
  }
}


/* ==========================================================================
   8. FLOATING BACK-TO-TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (!backToTopBtn) return;

  // Toggle button visibility on scroll
  window.addEventListener("scroll", function() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // Scroll smoothly back to top when clicked
  backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
