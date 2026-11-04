// Business Presets Data
const PRESETS = {
  saas: {
    brandName: "NexusFlow",
    brandCategory: "AI-Powered SaaS",
    heroEyebrow: "🚀 Next-Generation Business Automation",
    heroTitle: "Supercharge your business with effortless intelligence",
    heroSubtitle: "NexusFlow empowers modern teams to automate tedious tasks, scale operations, and deliver 10x faster customer outcomes with zero friction.",
    primaryCta: "Start 14-Day Free Trial",
    secondaryCta: "Watch 2-Min Demo",
    badgeText: "Trusted by 10,000+ fast-growing modern businesses worldwide",
    feature1Title: "Automated Workflows",
    feature1Desc: "Trigger intelligent workflows across your entire stack without writing a single line of code.",
    feature2Title: "Real-Time Telemetry",
    feature2Desc: "Instant visibility into team productivity, revenue velocity, and user conversion funnels.",
    feature3Title: "Enterprise Integrations",
    feature3Desc: "Seamlessly connect with Slack, Stripe, GitHub, HubSpot, Salesforce, and 100+ native apps.",
    stat1: "99.99%",
    stat1Label: "Guaranteed Uptime",
    stat2: "$420M+",
    stat2Label: "Transactions Managed",
    stat3: "4.9 / 5",
    stat3Label: "Customer Satisfaction",
    tier1Name: "Starter",
    tier1PriceM: "$29",
    tier1PriceA: "$24",
    tier2Name: "Pro Scaler",
    tier2PriceM: "$79",
    tier2PriceA: "$64",
    tier3Name: "Enterprise",
    tier3PriceM: "$199",
    tier3PriceA: "$159",
  },
  agency: {
    brandName: "Aura Creative",
    brandCategory: "Design & Growth Studio",
    heroEyebrow: "✨ Award-Winning Digital Agency",
    heroTitle: "We build unforgettable digital brands & viral campaigns",
    heroSubtitle: "We partner with visionary founders and global enterprises to craft world-class websites, iconic identities, and performance-driven marketing funnels.",
    primaryCta: "Book a Strategy Call",
    secondaryCta: "View Our Portfolio",
    badgeText: "Ranked #1 Growth Agency • 45+ International Design Awards",
    feature1Title: "Bespoke Web Design",
    feature1Desc: "High-converting, mobile-first web experiences designed to turn casual visitors into loyal brand advocates.",
    feature2Title: "Performance Marketing",
    feature2Desc: "Multi-channel paid acquisition, SEO, and retention campaigns engineered for sustainable ROI.",
    feature3Title: "Brand Identity Systems",
    feature3Desc: "Timeless logos, typography systems, style guides, and design tokens that elevate your market presence.",
    stat1: "3.8x",
    stat1Label: "Average Client ROI",
    stat2: "120+",
    stat2Label: "Products Launched",
    stat3: "98%",
    stat3Label: "Client Retention Rate",
    tier1Name: "Brand Sprint",
    tier1PriceM: "$1,490",
    tier1PriceA: "$1,190",
    tier2Name: "Growth Partner",
    tier2PriceM: "$3,450",
    tier2PriceA: "$2,760",
    tier3Name: "Full Scale",
    tier3PriceM: "$6,900",
    tier3PriceA: "$5,520",
  },
  consulting: {
    brandName: "Vanguard Partners",
    brandCategory: "Strategic Advisory",
    heroEyebrow: "📈 Strategic Management & Growth",
    heroTitle: "Actionable strategic advisory for ambitious leaders",
    heroSubtitle: "We help executives and leadership teams navigate complex transformations, unlock hidden revenue, and build resilient, future-ready organizations.",
    primaryCta: "Schedule Consultation",
    secondaryCta: "Explore Case Studies",
    badgeText: "Advising Fortune 500s, private equity firms, and breakout ventures",
    feature1Title: "Operational Excellence",
    feature1Desc: "Streamline high-friction operations, eliminate organizational debt, and optimize unit economics.",
    feature2Title: "M&A & Capital Strategy",
    feature2Desc: "In-depth commercial due diligence, valuation modeling, and post-merger integration roadmaps.",
    feature3Title: "Executive Leadership",
    feature3Desc: "C-suite coaching and strategic governance frameworks tailored for high-stakes decisions.",
    stat1: "$1.4B+",
    stat1Label: "Client Value Generated",
    stat2: "250+",
    stat2Label: "Engagements Completed",
    stat3: "15+ Yrs",
    stat3Label: "Industry Track Record",
    tier1Name: "Advisory Sprint",
    tier1PriceM: "$950",
    tier1PriceA: "$760",
    tier2Name: "Retained Advisor",
    tier2PriceM: "$2,800",
    tier2PriceA: "$2,240",
    tier3Name: "Full Transformation",
    tier3PriceM: "$5,500",
    tier3PriceA: "$4,400",
  },
  services: {
    brandName: "Apex Premier",
    brandCategory: "Professional Services",
    heroEyebrow: "⚡ Trusted Local & Commercial Experts",
    heroTitle: "Premium service, certified experts, guaranteed results",
    heroSubtitle: "From urgent commercial maintenance to turnkey residential solutions, Apex Premier delivers top-tier craftsmanship with guaranteed on-time completion.",
    primaryCta: "Get an Instant Quote",
    secondaryCta: "Call (800) 555-APEX",
    badgeText: "Licensed, Insured & Bonded • 5-Star Rated Across 1,500+ Local Reviews",
    feature1Title: "Rapid Response Dispatch",
    feature1Desc: "Same-day service availability with real-time GPS technician tracking and transparent arrival windows.",
    feature2Title: "100% Quality Guarantee",
    feature2Desc: "All services backed by our ironclad warranty and certified master technicians.",
    feature3Title: "Transparent Upfront Pricing",
    feature3Desc: "Clear flat-rate estimates with zero hidden fees or surprise upcharges ever.",
    stat1: "45 Mins",
    stat1Label: "Average Response Time",
    stat2: "15,000+",
    stat2Label: "Jobs Completed",
    stat3: "99.4%",
    stat3Label: "5-Star Rating Ratio",
    tier1Name: "Essential Service",
    tier1PriceM: "$89",
    tier1PriceA: "$71",
    tier2Name: "Complete Care",
    tier2PriceM: "$179",
    tier2PriceA: "$143",
    tier3Name: "Premium Commercial",
    tier3PriceM: "$349",
    tier3PriceA: "$279",
  }
};

let currentPreset = 'saas';
let currentTheme = 'indigo';
let isAnnual = false;

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initPricingToggle();
  initAccordion();
  initContactForm();
  initIndustryPresets();
  initThemeSwitcher();
  initFeatureTabs();
  initCustomizerWidget();
  initAnnouncementDismiss();
});

// Mobile menu toggle
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-nav-link");

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isHidden = menu.classList.contains("hidden");
    if (isHidden) {
      menu.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
    } else {
      menu.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

// Pricing Toggle (Monthly vs Annual)
function initPricingToggle() {
  const toggleBtn = document.getElementById("billing-toggle");
  const toggleCircle = document.getElementById("toggle-circle");
  const periodLabels = document.querySelectorAll(".pricing-period");

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    isAnnual = !isAnnual;
    if (isAnnual) {
      toggleBtn.classList.remove("bg-slate-200");
      toggleBtn.classList.add("bg-indigo-600");
      toggleCircle.classList.add("translate-x-6");
      periodLabels.forEach(p => p.textContent = "/mo (billed annually)");
    } else {
      toggleBtn.classList.add("bg-slate-200");
      toggleBtn.classList.remove("bg-indigo-600");
      toggleCircle.classList.remove("translate-x-6");
      periodLabels.forEach(p => p.textContent = "/month");
    }
    updatePricingDisplay();
  });
}

function updatePricingDisplay() {
  const data = PRESETS[currentPreset];
  const t1 = document.getElementById("price-tier-1");
  const t2 = document.getElementById("price-tier-2");
  const t3 = document.getElementById("price-tier-3");

  if (t1) t1.textContent = isAnnual ? data.tier1PriceA : data.tier1PriceM;
  if (t2) t2.textContent = isAnnual ? data.tier2PriceA : data.tier2PriceM;
  if (t3) t3.textContent = isAnnual ? data.tier3PriceA : data.tier3PriceM;
}

// FAQ Accordion
function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");
  items.forEach(item => {
    const header = item.querySelector(".accordion-header");
    if (!header) return;
    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      // Close all others
      items.forEach(other => {
        if (other !== item) other.classList.remove("active");
      });
      // Toggle current
      if (isActive) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  });
}

// Feature Tabs
function initFeatureTabs() {
  const tabs = document.querySelectorAll(".feature-tab-btn");
  const panels = document.querySelectorAll(".feature-tab-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab");
      tabs.forEach(t => {
        t.classList.remove("bg-white", "shadow-md", "text-indigo-600", "font-bold");
        t.classList.add("text-slate-600", "hover:text-slate-900");
      });
      tab.classList.add("bg-white", "shadow-md", "text-indigo-600", "font-bold");
      tab.classList.remove("text-slate-600", "hover:text-slate-900");

      panels.forEach(p => {
        if (p.id === targetId) {
          p.classList.remove("hidden");
        } else {
          p.classList.add("hidden");
        }
      });
    });
  });
}

// Contact Form submission
function initContactForm() {
  const form = document.getElementById("lead-form");
  const toast = document.getElementById("form-toast");
  const submitBtn = document.getElementById("lead-submit-btn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Visual loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg> Sending Inquiry...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();

      if (toast) {
        toast.classList.remove("translate-y-24", "opacity-0", "pointer-events-none");
        toast.classList.add("translate-y-0", "opacity-100");

        setTimeout(() => {
          toast.classList.add("translate-y-24", "opacity-0", "pointer-events-none");
          toast.classList.remove("translate-y-0", "opacity-100");
        }, 5000);
      }
    }, 800);
  });
}

// Industry Presets handler
function initIndustryPresets() {
  const presetBtns = document.querySelectorAll(".preset-selector-btn");

  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-preset");
      if (!PRESETS[selected]) return;

      currentPreset = selected;
      presetBtns.forEach(b => {
        b.classList.remove("bg-indigo-600", "text-white", "shadow-sm");
        b.classList.add("text-slate-600", "hover:bg-slate-100");
      });
      btn.classList.add("bg-indigo-600", "text-white", "shadow-sm");
      btn.classList.remove("text-slate-600", "hover:bg-slate-100");

      applyPreset(selected);
    });
  });
}

function applyPreset(key) {
  const data = PRESETS[key];
  if (!data) return;

  // Update DOM elements with data-bind
  document.querySelectorAll("[data-bind='brandName']").forEach(el => el.textContent = data.brandName);
  document.querySelectorAll("[data-bind='brandCategory']").forEach(el => el.textContent = data.brandCategory);
  document.querySelectorAll("[data-bind='heroEyebrow']").forEach(el => el.textContent = data.heroEyebrow);
  document.querySelectorAll("[data-bind='heroTitle']").forEach(el => el.textContent = data.heroTitle);
  document.querySelectorAll("[data-bind='heroSubtitle']").forEach(el => el.textContent = data.heroSubtitle);
  document.querySelectorAll("[data-bind='primaryCta']").forEach(el => el.textContent = data.primaryCta);
  document.querySelectorAll("[data-bind='secondaryCta']").forEach(el => el.textContent = data.secondaryCta);
  document.querySelectorAll("[data-bind='badgeText']").forEach(el => el.textContent = data.badgeText);

  // Features
  const f1T = document.getElementById("feature-1-title");
  const f1D = document.getElementById("feature-1-desc");
  const f2T = document.getElementById("feature-2-title");
  const f2D = document.getElementById("feature-2-desc");
  const f3T = document.getElementById("feature-3-title");
  const f3D = document.getElementById("feature-3-desc");

  if (f1T) f1T.textContent = data.feature1Title;
  if (f1D) f1D.textContent = data.feature1Desc;
  if (f2T) f2T.textContent = data.feature2Title;
  if (f2D) f2D.textContent = data.feature2Desc;
  if (f3T) f3T.textContent = data.feature3Title;
  if (f3D) f3D.textContent = data.feature3Desc;

  // Stats
  const s1 = document.getElementById("stat-1-num");
  const s1L = document.getElementById("stat-1-label");
  const s2 = document.getElementById("stat-2-num");
  const s2L = document.getElementById("stat-2-label");
  const s3 = document.getElementById("stat-3-num");
  const s3L = document.getElementById("stat-3-label");

  if (s1) s1.textContent = data.stat1;
  if (s1L) s1L.textContent = data.stat1Label;
  if (s2) s2.textContent = data.stat2;
  if (s2L) s2L.textContent = data.stat2Label;
  if (s3) s3.textContent = data.stat3;
  if (s3L) s3L.textContent = data.stat3Label;

  // Tier names
  const tn1 = document.getElementById("tier-1-name");
  const tn2 = document.getElementById("tier-2-name");
  const tn3 = document.getElementById("tier-3-name");
  if (tn1) tn1.textContent = data.tier1Name;
  if (tn2) tn2.textContent = data.tier2Name;
  if (tn3) tn3.textContent = data.tier3Name;

  updatePricingDisplay();
}

// Theme Switcher (Color Palette)
function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll(".theme-color-btn");
  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme-name");
      document.body.setAttribute("data-theme", theme);
      currentTheme = theme;
      
      themeBtns.forEach(b => b.classList.remove("ring-4", "ring-offset-2", "ring-slate-400"));
      btn.classList.add("ring-4", "ring-offset-2", "ring-slate-400");
    });
  });
}

// Announcement Bar Dismiss
function initAnnouncementDismiss() {
  const bar = document.getElementById("announcement-bar");
  const btn = document.getElementById("dismiss-announcement-btn");
  if (btn && bar) {
    btn.addEventListener("click", () => {
      bar.style.display = "none";
    });
  }
}

// Floating Customizer Drawer
function initCustomizerWidget() {
  const toggle = document.getElementById("customizer-toggle");
  const panel = document.getElementById("customizer-panel");
  const closeBtn = document.getElementById("customizer-close");
  const nameInput = document.getElementById("customizer-name-input");

  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    panel.classList.toggle("translate-x-full");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      panel.classList.add("translate-x-full");
    });
  }

  if (nameInput) {
    nameInput.addEventListener("input", (e) => {
      const val = e.target.value.trim() || PRESETS[currentPreset].brandName;
      document.querySelectorAll("[data-bind='brandName']").forEach(el => el.textContent = val);
    });
  }
}
