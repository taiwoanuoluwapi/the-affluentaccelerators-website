// THE AFFLUENTACCELERATORS - CORE APPLICATION LOGIC

// Default Initial State & CMS Data
const DEFAULT_STATE = {
  cms: {
    programmeFee: "₦175,000",
    cohortStartDate: "March 15, 2026",
    cohortLocation: "Hybrid (In-Person Consulting Hub & Live Strategic Sessions)",
    whatsappNumber: "+2348000000000",
    contactEmail: "advisory@affluentaccelerators.com",
    officeLocation: "Victoria Island, Lagos, Nigeria",
  },
  roles: [
    { id: "role-1", title: "Business Research Associate", type: "Research & Strategy", active: true, department: "Strategy & Advisory", commitment: "Full-Time / Part-Time" },
    { id: "role-2", title: "Business Analyst Intern", type: "Analysis & Intelligence", active: true, department: "Consulting Operations", commitment: "Full-Time" },
    { id: "role-3", title: "Consulting Associate", type: "Client Engagements", active: true, department: "Client Advisory", commitment: "Full-Time" },
    { id: "role-4", title: "Business Development Intern", type: "Growth & Partnerships", active: true, department: "Growth & Expansion", commitment: "Full-Time" },
    { id: "role-5", title: "Marketing & Growth Associate", type: "Brand & Campaigns", active: true, department: "Commercial Growth", commitment: "Full-Time" },
    { id: "role-6", title: "Operations & Project Support", type: "Process Optimization", active: true, department: "Internal Operations", commitment: "Full-Time" },
    { id: "role-7", title: "Research & Strategy Fellow", type: "Fellowship (Advanced)", active: true, department: "Executive Research", commitment: "6-Month Fellowship" }
  ],
  leads: [
    {
      id: "LEAD-101",
      category: "consulting",
      name: "Tunde Balogun",
      email: "t.balogun@apexholdings.ng",
      phone: "+234 803 219 4481",
      businessName: "Apex Logistics & Haulage Ltd",
      industry: "Supply Chain & Logistics",
      location: "Lagos, Nigeria",
      stage: "Growth ($2M - $5M ARR)",
      challenge: "Bottlenecks in fleet dispatch operations and margin leakage.",
      supportType: "Operations & Systems Optimization",
      status: "In Review",
      date: "2026-11-02"
    },
    {
      id: "LEAD-102",
      category: "analyst-programme",
      name: "Chidinma Okoye",
      email: "chidinma.okoye@gmail.com",
      phone: "+234 812 490 1120",
      location: "Abuja, Nigeria",
      qualification: "B.Sc. Economics (First Class)",
      occupation: "Junior Financial Analyst",
      whyConsulting: "Looking to transition from back-office reporting into hands-on corporate turnaround strategy.",
      readyToInvest: "Yes - ₦175,000 ready upon acceptance",
      status: "New",
      date: "2026-11-03"
    },
    {
      id: "LEAD-103",
      category: "internship",
      name: "Emmanuel Adeyemi",
      email: "e.adeyemi@uni-lag.edu.ng",
      phone: "+234 905 882 1432",
      location: "Lagos, Nigeria",
      role: "Business Research Associate",
      qualification: "Final Year Student - Business Admin",
      skills: "Market sizing, competitive benchmarking, financial modeling",
      status: "Interview Scheduled",
      date: "2026-11-03"
    }
  ],
  articles: [
    {
      id: "art-1",
      title: "The Architecture of Business Scalability: Moving Beyond Founder-Led Operations",
      category: "Business Strategy",
      readTime: "6 min read",
      author: "Senior Advisory Practice",
      date: "November 2026",
      summary: "Why most African businesses hit a structural revenue ceiling at 3–5 years, and the four operating systems required to build institutional resilience.",
      content: `Many emerging market businesses achieve early momentum purely through the tenacity and network of their founding principal. However, reliance on founder intuition eventually creates a systemic growth bottleneck.

To transition from fragile growth to institutional scalability, executive leadership must embed three structural pillars:
1. Standardized Operational Playbooks: Transforming informal founder knowledge into repeatable operating SOPs.
2. Unit Economics Precision: Auditing actual customer acquisition cost versus true lifetime contribution margin.
3. Decentralized Execution Governance: Empowering mid-level analytical managers with clear decision rights.

Organizations that solve these structural fundamentals build sustainable enterprise value that survives market volatility.`
    },
    {
      id: "art-2",
      title: "Diagnosing Before Prescribing: The Consultant's Guide to Corporate Diagnostics",
      category: "Consulting & Analysis",
      readTime: "8 min read",
      author: "Advisory Practice & Research",
      date: "October 2026",
      summary: "A practical breakdown of how top-tier business analysts systematically isolate commercial symptoms from root operational causes.",
      content: `The most common mistake amateur consultants make is proposing solutions before accurately diagnosing systemic friction points. When a business reports 'a sales problem', the root cause is rarely sales effort—it is frequently broken pricing structure, delayed fulfillment, or misalignment in the target buyer persona.

A rigorous diagnostic framework consists of:
• Discovery Interviews: Uncovering qualitative organizational friction.
• Quantitative Telemetry: Analyzing cash flow cycle duration, repeat purchase frequency, and team capacity utilization.
• Root-Cause Mapping: Distinguishing visible surface symptoms from underlying structural defects.`
    },
    {
      id: "art-3",
      title: "Building High-Impact Talent Pipelines in Emerging Markets",
      category: "Talent & Capacity",
      readTime: "5 min read",
      author: "Executive Talent Fellows",
      date: "September 2026",
      summary: "How practical fieldwork, rigorous analytical training, and real business exposure develop world-class business thinkers.",
      content: `The gap between conventional academic curricula and modern corporate consulting demands has never been wider. Businesses require professionals who can walk into a company, assess financial statements, map out workflow bottlenecks, and formulate actionable implementation roadmaps.

By fusing rigorous classroom learning with immediate in-field exposure to real commercial enterprises, the 90-Day Business Consultant/Analyst Programme delivers high-caliber strategic problem solvers.`
    }
  ],
  caseStudies: [
    {
      id: "cs-1",
      title: "Commercial Model Optimization & Growth Strategy",
      clientType: "Mid-Market Manufacturing Enterprise",
      industry: "FMCG / Distribution",
      challenge: "Legacy distribution model caused severe inventory delays, margin compression, and uncollected receivables across regional hubs.",
      strategy: "Conducted exhaustive commercial diagnostics, restructured pricing tiers, and implemented direct-to-retailer partner fulfillment channels.",
      outcome: "28% reduction in cycle turnaround time and stabilized operating cash flows within 120 days.",
      badge: "Completed Advisory"
    },
    {
      id: "cs-2",
      title: "Operational Workflow & Financial Controls Restructuring",
      clientType: "Regional Healthcare & Diagnostic Provider",
      industry: "Healthcare Services",
      challenge: "Multi-branch operational friction, non-standardized procurement processes, and absence of unified billing telemetry.",
      strategy: "Mapped comprehensive end-to-end patient workflow, established centralized ERP controls, and trained branch managers on KPI governance.",
      outcome: "Identified and eliminated 18% operational expense leakage; improved daily patient processing capacity by 34%.",
      badge: "Diagnostic & Systems"
    },
    {
      id: "cs-3",
      title: "Go-to-Market Strategy & Channel Partnership Development",
      clientType: "Agri-Processing & Export Firm",
      industry: "Agriculture & Agro-Allied",
      challenge: "High dependence on single intermediary broker; lack of structured commercial contracts for institutional buyers.",
      strategy: "Formulated institutional sales playbooks, negotiated strategic off-taker partnerships, and built a dedicated commercial business development team.",
      outcome: "Diversified buyer base across 4 international corporate buyers and secured multi-year forward supply agreements.",
      badge: "Market Expansion"
    }
  ]
};

// Application State Manager
class AffluentApp {
  constructor() {
    this.state = this.loadState();
    this.currentView = 'home';
    this.isAdminAuthenticated = false;
  }

  loadState() {
    try {
      const stored = localStorage.getItem('affluent_state_v1');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not parse stored state", e);
    }
    return DEFAULT_STATE;
  }

  saveState() {
    try {
      localStorage.setItem('affluent_state_v1', JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }

  init() {
    this.bindNavigation();
    this.bindHashRouter();
    this.bindDropdowns();
    this.bindMobileMenu();
    this.bindCurriculumAccordion();
    this.bindModals();
    this.bindForms();
    this.bindAdminPortal();
    this.renderDynamicContent();
    this.handleRoute();
  }

  // Router logic
  bindHashRouter() {
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  handleRoute() {
    let hash = window.location.hash.replace('#', '') || 'home';
    
    // Check if hash points to an anchor on home page
    const homeAnchors = ['about', 'services', 'approach', 'programmes', 'why-us', 'experience', 'insights', 'contact'];
    
    if (homeAnchors.includes(hash)) {
      this.switchView('home');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (hash === 'programme-analyst' || hash === 'programme-internship' || hash === 'programme-accelerator' || hash === 'insights-view' || hash === 'admin') {
      this.switchView(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.switchView('home');
    }
  }

  switchView(viewName) {
    this.currentView = viewName;
    const views = document.querySelectorAll('.page-view');
    views.forEach(v => {
      if (v.id === `view-${viewName}`) {
        v.classList.remove('hidden');
      } else {
        v.classList.add('hidden');
      }
    });

    // Update active nav indicators
    document.querySelectorAll('.nav-link-item').forEach(link => {
      const target = link.getAttribute('data-view-target');
      if (target === viewName) {
        link.classList.add('text-gold-400', 'font-bold');
      } else {
        link.classList.remove('text-gold-400', 'font-bold');
      }
    });

    if (viewName === 'admin') {
      this.renderAdminTable();
    }
  }

  bindNavigation() {
    // Top nav brand click
    document.querySelectorAll('.brand-home-link').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#home';
      });
    });

    // Dedicated CTA openers
    document.querySelectorAll('[data-open-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = btn.getAttribute('data-open-modal');
        this.openModal(modalId);
      });
    });
  }

  bindDropdowns() {
    const dropdownBtn = document.getElementById('programmes-dropdown-btn');
    const dropdownMenu = document.getElementById('programmes-dropdown-menu');

    if (dropdownBtn && dropdownMenu) {
      let timeout;
      const show = () => {
        clearTimeout(timeout);
        dropdownMenu.classList.remove('hidden');
      };
      const hide = () => {
        timeout = setTimeout(() => {
          dropdownMenu.classList.add('hidden');
        }, 200);
      };

      dropdownBtn.addEventListener('mouseenter', show);
      dropdownBtn.addEventListener('mouseleave', hide);
      dropdownMenu.addEventListener('mouseenter', show);
      dropdownMenu.addEventListener('mouseleave', hide);

      dropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle('hidden');
      });
    }
  }

  bindMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-navigation-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  }

  bindCurriculumAccordion() {
    document.addEventListener('click', (e) => {
      const header = e.target.closest('.curriculum-header');
      if (!header) return;
      const item = header.closest('.curriculum-item');
      if (!item) return;

      const isActive = item.classList.contains('active');
      // Close others in same accordion
      const parent = item.closest('.curriculum-accordion');
      if (parent) {
        parent.querySelectorAll('.curriculum-item').forEach(i => i.classList.remove('active'));
      }
      if (!isActive) {
        item.classList.add('active');
      }
    });
  }

  // Modals management
  bindModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-backdrop');
        if (modal) this.closeModal(modal.id);
      });
    });
  }

  openModal(modalId, prefillData = {}) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // If role prefill
    if (prefillData.role && modalId === 'modal-internship-application') {
      const select = modal.querySelector('#internship-preferred-role');
      if (select) select.value = prefillData.role;
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Forms binding (Three distinct funnels)
  bindForms() {
    // Form A: Business Consulting Inquiry Form
    const formA = document.getElementById('form-consulting-inquiry');
    if (formA) {
      formA.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          id: `CS-${Date.now().toString().slice(-4)}`,
          category: 'consulting',
          name: formA.querySelector('#consulting-name').value.trim(),
          businessName: formA.querySelector('#consulting-business').value.trim(),
          email: formA.querySelector('#consulting-email').value.trim(),
          phone: formA.querySelector('#consulting-phone').value.trim(),
          industry: formA.querySelector('#consulting-industry').value.trim(),
          location: formA.querySelector('#consulting-location').value.trim(),
          stage: formA.querySelector('#consulting-stage').value,
          businessDescription: formA.querySelector('#consulting-desc').value.trim(),
          challenge: formA.querySelector('#consulting-challenge').value.trim(),
          supportType: formA.querySelector('#consulting-support').value,
          additionalInfo: formA.querySelector('#consulting-notes')?.value.trim() || '',
          status: 'New',
          date: new Date().toISOString().split('T')[0]
        };

        this.handleFormSuccess(formA, data, 'modal-consulting-inquiry', 'Consulting Inquiry Received', 'Thank you. Our senior consulting practice will review your business diagnostic and reach out within 24 business hours.');
      });
    }

    // Form B: 90-Day Business Consultant/Analyst Programme Application
    const formB = document.getElementById('form-analyst-application');
    if (formB) {
      formB.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          id: `AP-${Date.now().toString().slice(-4)}`,
          category: 'analyst-programme',
          name: formB.querySelector('#analyst-name').value.trim(),
          email: formB.querySelector('#analyst-email').value.trim(),
          phone: formB.querySelector('#analyst-phone').value.trim(),
          location: formB.querySelector('#analyst-location').value.trim(),
          qualification: formB.querySelector('#analyst-qualification').value.trim(),
          occupation: formB.querySelector('#analyst-occupation').value.trim(),
          whyConsulting: formB.querySelector('#analyst-why').value.trim(),
          interestStrategy: formB.querySelector('#analyst-interest').value.trim(),
          goals: formB.querySelector('#analyst-goals').value.trim(),
          commitment: formB.querySelector('#analyst-commitment').value,
          readyToInvest: formB.querySelector('#analyst-investment').value,
          source: formB.querySelector('#analyst-source').value,
          status: 'New',
          date: new Date().toISOString().split('T')[0]
        };

        this.handleFormSuccess(formB, data, 'modal-analyst-application', '90-Day Programme Application Submitted', 'Your application for the Business Consultant/Analyst Development Programme has been logged. Our admissions committee will review your profile.');
      });
    }

    // Form C: Internship / Fellowship Application
    const formC = document.getElementById('form-internship-application');
    if (formC) {
      formC.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          id: `INT-${Date.now().toString().slice(-4)}`,
          category: 'internship',
          name: formC.querySelector('#internship-name').value.trim(),
          email: formC.querySelector('#internship-email').value.trim(),
          phone: formC.querySelector('#internship-phone').value.trim(),
          location: formC.querySelector('#internship-location').value.trim(),
          qualification: formC.querySelector('#internship-education').value.trim(),
          occupation: formC.querySelector('#internship-occupation').value.trim(),
          role: formC.querySelector('#internship-preferred-role').value,
          skills: formC.querySelector('#internship-skills').value.trim(),
          experience: formC.querySelector('#internship-experience').value.trim(),
          interest: formC.querySelector('#internship-why').value.trim(),
          goals: formC.querySelector('#internship-learn').value.trim(),
          availability: formC.querySelector('#internship-availability').value,
          portfolio: formC.querySelector('#internship-portfolio').value.trim(),
          status: 'New',
          date: new Date().toISOString().split('T')[0]
        };

        this.handleFormSuccess(formC, data, 'modal-internship-application', 'Internship Application Received', 'Thank you for your interest in gaining practical business exposure with The Affluentaccelerators team.');
      });
    }
  }

  handleFormSuccess(formElement, leadData, modalId, title, message) {
    // Save to state
    this.state.leads.unshift(leadData);
    this.saveState();

    // Reset Form
    formElement.reset();
    this.closeModal(modalId);

    // Show luxury feedback toast/modal
    this.showConfirmationModal(title, message);
    this.renderAdminTable();
  }

  showConfirmationModal(title, message) {
    const modal = document.getElementById('modal-confirmation');
    if (!modal) return;
    document.getElementById('confirmation-title').textContent = title;
    document.getElementById('confirmation-message').textContent = message;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  // Dynamic Content rendering
  renderDynamicContent() {
    // Update CMS placeholders
    document.querySelectorAll('[data-cms="programmeFee"]').forEach(el => el.textContent = this.state.cms.programmeFee);
    document.querySelectorAll('[data-cms="cohortStartDate"]').forEach(el => el.textContent = this.state.cms.cohortStartDate);
    document.querySelectorAll('[data-cms="cohortLocation"]').forEach(el => el.textContent = this.state.cms.cohortLocation);
    document.querySelectorAll('[data-cms="contactEmail"]').forEach(el => {
      el.textContent = this.state.cms.contactEmail;
      el.href = `mailto:${this.state.cms.contactEmail}`;
    });
    document.querySelectorAll('[data-cms="whatsappNumber"]').forEach(el => {
      el.textContent = this.state.cms.whatsappNumber;
      el.href = `https://wa.me/${this.state.cms.whatsappNumber.replace(/[^0-9]/g, '')}`;
    });

    this.renderInternshipRoles();
    this.renderInsights();
    this.renderCaseStudies();
  }

  renderInternshipRoles() {
    const container = document.getElementById('internship-roles-container');
    const selectBox = document.getElementById('internship-preferred-role');

    if (selectBox) {
      selectBox.innerHTML = '<option value="">Select your preferred role...</option>';
      this.state.roles.filter(r => r.active).forEach(r => {
        selectBox.innerHTML += `<option value="${r.title}">${r.title} (${r.type})</option>`;
      });
    }

    if (!container) return;

    container.innerHTML = '';
    this.state.roles.forEach(role => {
      const card = document.createElement('div');
      card.className = `p-6 rounded-2xl border transition-all ${
        role.active 
          ? 'bg-white border-slate-200/90 hover:border-gold-400 hover:shadow-lg' 
          : 'bg-slate-50 border-slate-200 opacity-60'
      }`;

      card.innerHTML = `
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
            role.active ? 'bg-forest-900/10 text-forest-800' : 'bg-slate-200 text-slate-500'
          }">
            ${role.department}
          </span>
          <span class="text-xs font-medium ${role.active ? 'text-emerald-700' : 'text-slate-400'}">
            ${role.active ? '● Accepting Applications' : '○ Closed for Cohort'}
          </span>
        </div>
        <h4 class="text-lg font-bold text-slate-900 font-heading mb-1">${role.title}</h4>
        <p class="text-xs text-slate-500 mb-4">${role.type} • ${role.commitment}</p>
        <button 
          ${role.active ? '' : 'disabled'}
          class="role-apply-btn w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            role.active 
              ? 'bg-forest-900 text-gold-400 hover:bg-forest-800 shadow-sm' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }"
          data-role-name="${role.title}"
        >
          ${role.active ? 'Apply For Role' : 'Position Filled'}
        </button>
      `;

      container.appendChild(card);
    });

    // Bind role card buttons
    container.querySelectorAll('.role-apply-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const roleName = btn.getAttribute('data-role-name');
        this.openModal('modal-internship-application', { role: roleName });
      });
    });
  }

  renderInsights() {
    const previewContainer = document.getElementById('insights-home-preview');
    if (!previewContainer) return;

    previewContainer.innerHTML = '';
    this.state.articles.slice(0, 3).forEach(article => {
      const card = document.createElement('article');
      card.className = "bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-gold-400/80 transition-all hover:shadow-xl flex flex-col justify-between";
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span class="font-semibold text-forest-700 bg-forest-50 px-2.5 py-0.5 rounded">${article.category}</span>
            <span>${article.readTime}</span>
          </div>
          <h3 class="text-xl font-bold text-slate-900 font-heading mb-3 hover:text-forest-700 cursor-pointer article-open-trigger" data-article-id="${article.id}">
            ${article.title}
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed mb-6">
            ${article.summary}
          </p>
        </div>
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs text-slate-500">${article.author}</span>
          <button class="article-open-trigger text-xs font-bold text-forest-800 hover:text-gold-600 flex items-center space-x-1" data-article-id="${article.id}">
            <span>Read Article</span>
            <span>→</span>
          </button>
        </div>
      `;
      previewContainer.appendChild(card);
    });

    // Bind triggers to open article view
    document.querySelectorAll('.article-open-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-article-id');
        this.openArticleReader(id);
      });
    });
  }

  openArticleReader(articleId) {
    const article = this.state.articles.find(a => a.id === articleId);
    if (!article) return;

    document.getElementById('reader-article-category').textContent = article.category;
    document.getElementById('reader-article-title').textContent = article.title;
    document.getElementById('reader-article-meta').textContent = `${article.author} • ${article.date} • ${article.readTime}`;
    document.getElementById('reader-article-body').innerHTML = article.content.split('\n\n').map(p => `<p class="mb-4 leading-relaxed">${p}</p>`).join('');

    this.switchView('insights-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderCaseStudies() {
    const container = document.getElementById('case-studies-container');
    if (!container) return;

    container.innerHTML = '';
    this.state.caseStudies.forEach(cs => {
      const card = document.createElement('div');
      card.className = "bg-white p-7 rounded-2xl border border-slate-200/90 hover:border-forest-700/50 shadow-sm hover:shadow-lg transition-all";
      card.innerHTML = `
        <div class="flex items-center justify-between mb-4">
          <span class="text-[11px] font-bold uppercase tracking-wider text-gold-600 bg-gold-50 border border-gold-subtle px-2.5 py-0.5 rounded-full">
            ${cs.badge}
          </span>
          <span class="text-xs text-slate-500 font-medium">${cs.industry}</span>
        </div>
        <h4 class="text-lg font-bold font-heading text-slate-900 mb-2">${cs.title}</h4>
        <p class="text-xs font-semibold text-forest-800 mb-4">${cs.clientType}</p>
        
        <div class="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
          <div>
            <strong class="text-slate-800 block mb-0.5">The Challenge:</strong>
            <p>${cs.challenge}</p>
          </div>
          <div>
            <strong class="text-slate-800 block mb-0.5">Strategic Intervention:</strong>
            <p>${cs.strategy}</p>
          </div>
          <div class="p-3 bg-forest-50 border border-forest-100 rounded-xl text-forest-900">
            <strong class="block text-forest-950 font-bold mb-0.5">Outcome & Value Generated:</strong>
            <p>${cs.outcome}</p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Admin Portal & Dashboard
  bindAdminPortal() {
    const loginForm = document.getElementById('admin-login-form');
    const passcodeBtn = document.getElementById('admin-passcode-submit');
    const passcodeInput = document.getElementById('admin-passcode-input');
    const loginView = document.getElementById('admin-login-view');
    const dashboardView = document.getElementById('admin-dashboard-view');
    const quickUnlockBtn = document.getElementById('admin-quick-unlock-btn');

    const unlock = () => {
      this.isAdminAuthenticated = true;
      loginView.classList.add('hidden');
      dashboardView.classList.remove('hidden');
      this.renderAdminTable();
      this.populateAdminCMSInputs();
    };

    if (quickUnlockBtn) {
      quickUnlockBtn.addEventListener('click', unlock);
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (passcodeInput.value === 'affluent2026' || passcodeInput.value === 'admin') {
          unlock();
        } else {
          alert("Invalid administrative password. (Hint: Use 'affluent2026' or tap Quick Access)");
        }
      });
    }

    // Category filter tabs
    document.querySelectorAll('.admin-filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-filter-tab').forEach(t => {
          t.classList.remove('bg-forest-900', 'text-gold-400');
          t.classList.add('bg-slate-100', 'text-slate-700');
        });
        tab.classList.add('bg-forest-900', 'text-gold-400');
        tab.classList.remove('bg-slate-100', 'text-slate-700');

        const filter = tab.getAttribute('data-filter');
        this.renderAdminTable(filter);
      });
    });

    // Search input
    const searchInput = document.getElementById('admin-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        this.renderAdminTable(null, query);
      });
    }

    // Export CSV
    const exportBtn = document.getElementById('admin-export-csv-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportLeadsToCSV());
    }

    // Save CMS Settings Form
    const cmsForm = document.getElementById('admin-cms-form');
    if (cmsForm) {
      cmsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.state.cms.programmeFee = document.getElementById('admin-cms-fee').value.trim();
        this.state.cms.cohortStartDate = document.getElementById('admin-cms-date').value.trim();
        this.state.cms.whatsappNumber = document.getElementById('admin-cms-whatsapp').value.trim();
        this.state.cms.contactEmail = document.getElementById('admin-cms-email').value.trim();
        this.saveState();
        this.renderDynamicContent();
        alert("Website settings updated successfully!");
      });
    }
  }

  populateAdminCMSInputs() {
    const feeInput = document.getElementById('admin-cms-fee');
    const dateInput = document.getElementById('admin-cms-date');
    const waInput = document.getElementById('admin-cms-whatsapp');
    const emailInput = document.getElementById('admin-cms-email');

    if (feeInput) feeInput.value = this.state.cms.programmeFee;
    if (dateInput) dateInput.value = this.state.cms.cohortStartDate;
    if (waInput) waInput.value = this.state.cms.whatsappNumber;
    if (emailInput) emailInput.value = this.state.cms.contactEmail;
  }

  renderAdminTable(categoryFilter = null, searchQuery = '') {
    const tableBody = document.getElementById('admin-leads-tbody');
    const countBadge = document.getElementById('admin-total-leads-count');
    if (!tableBody) return;

    let leads = this.state.leads;

    if (categoryFilter && categoryFilter !== 'all') {
      leads = leads.filter(l => l.category === categoryFilter);
    }

    if (searchQuery) {
      leads = leads.filter(l => 
        (l.name && l.name.toLowerCase().includes(searchQuery)) ||
        (l.email && l.email.toLowerCase().includes(searchQuery)) ||
        (l.businessName && l.businessName.toLowerCase().includes(searchQuery)) ||
        (l.phone && l.phone.includes(searchQuery))
      );
    }

    if (countBadge) countBadge.textContent = `${leads.length} Records`;

    tableBody.innerHTML = '';
    if (leads.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-sm text-slate-500">No applicant records found in this category.</td></tr>`;
      return;
    }

    leads.forEach(lead => {
      const tr = document.createElement('tr');
      tr.className = "border-b border-slate-200 hover:bg-slate-50 text-xs";

      let categoryBadge = '';
      if (lead.category === 'consulting') {
        categoryBadge = '<span class="px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800">Business Consulting</span>';
      } else if (lead.category === 'analyst-programme') {
        categoryBadge = '<span class="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800">90-Day Analyst (₦175k)</span>';
      } else {
        categoryBadge = '<span class="px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800">Internship/Fellowship</span>';
      }

      tr.innerHTML = `
        <td class="py-3 px-4 font-mono text-slate-500">${lead.id}</td>
        <td class="py-3 px-4">
          <p class="font-bold text-slate-900">${lead.name}</p>
          <p class="text-slate-500 text-[11px]">${lead.email}</p>
        </td>
        <td class="py-3 px-4">${categoryBadge}</td>
        <td class="py-3 px-4">
          <p class="font-medium text-slate-800">${lead.businessName || lead.role || lead.occupation || 'Candidate'}</p>
          <p class="text-[11px] text-slate-500">${lead.location || ''} • ${lead.phone || ''}</p>
        </td>
        <td class="py-3 px-4">
          <select class="admin-status-select bg-white border border-slate-300 rounded px-2 py-1 text-xs font-semibold" data-lead-id="${lead.id}">
            <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New</option>
            <option value="In Review" ${lead.status === 'In Review' ? 'selected' : ''}>In Review</option>
            <option value="Interview Scheduled" ${lead.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
            <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Enrolled" ${lead.status === 'Enrolled' ? 'selected' : ''}>Enrolled / Closed</option>
          </select>
        </td>
        <td class="py-3 px-4 text-right">
          <button class="admin-view-lead-btn text-forest-700 hover:text-gold-600 font-bold px-2 py-1" data-lead-id="${lead.id}">
            Details
          </button>
        </td>
      `;

      tableBody.appendChild(tr);
    });

    // Bind status changes
    tableBody.querySelectorAll('.admin-status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const leadId = select.getAttribute('data-lead-id');
        const target = this.state.leads.find(l => l.id === leadId);
        if (target) {
          target.status = e.target.value;
          this.saveState();
        }
      });
    });

    // Bind details view
    tableBody.querySelectorAll('.admin-view-lead-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const leadId = btn.getAttribute('data-lead-id');
        this.viewLeadDetailsModal(leadId);
      });
    });
  }

  viewLeadDetailsModal(leadId) {
    const lead = this.state.leads.find(l => l.id === leadId);
    if (!lead) return;

    let content = `
      <div class="space-y-3 text-xs text-slate-700">
        <div class="flex justify-between border-b pb-2">
          <strong>Application ID:</strong> <span>${lead.id} (${lead.date})</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <strong>Full Name:</strong> <span>${lead.name}</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <strong>Email:</strong> <span>${lead.email}</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <strong>Phone / WhatsApp:</strong> <span>${lead.phone}</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <strong>Location:</strong> <span>${lead.location || 'N/A'}</span>
        </div>
    `;

    if (lead.category === 'consulting') {
      content += `
        <div class="border-b pb-2"><strong>Company:</strong> ${lead.businessName} (${lead.industry})</div>
        <div class="border-b pb-2"><strong>Stage:</strong> ${lead.stage}</div>
        <div class="border-b pb-2"><strong>Core Challenge:</strong> ${lead.challenge}</div>
        <div class="border-b pb-2"><strong>Support Needed:</strong> ${lead.supportType}</div>
      `;
    } else if (lead.category === 'analyst-programme') {
      content += `
        <div class="border-b pb-2"><strong>Education:</strong> ${lead.qualification}</div>
        <div class="border-b pb-2"><strong>Occupation:</strong> ${lead.occupation}</div>
        <div class="border-b pb-2"><strong>Why Consulting:</strong> ${lead.whyConsulting}</div>
        <div class="border-b pb-2"><strong>Investment Commitment:</strong> ${lead.readyToInvest}</div>
      `;
    } else {
      content += `
        <div class="border-b pb-2"><strong>Preferred Role:</strong> ${lead.role}</div>
        <div class="border-b pb-2"><strong>Education:</strong> ${lead.qualification}</div>
        <div class="border-b pb-2"><strong>Relevant Skills:</strong> ${lead.skills}</div>
        <div class="border-b pb-2"><strong>Availability:</strong> ${lead.availability}</div>
      `;
    }

    content += `</div>`;

    document.getElementById('confirmation-title').textContent = `Applicant Details: ${lead.name}`;
    document.getElementById('confirmation-message').innerHTML = content;
    const modal = document.getElementById('modal-confirmation');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  exportLeadsToCSV() {
    if (!this.state.leads.length) {
      alert("No applicant records to export.");
      return;
    }

    const headers = ["ID", "Category", "Date", "Name", "Email", "Phone", "Location", "Organization/Role", "Status"];
    const rows = this.state.leads.map(l => [
      l.id,
      l.category,
      l.date,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.location || '').replace(/"/g, '""')}"`,
      `"${(l.businessName || l.role || l.occupation || '').replace(/"/g, '""')}"`,
      l.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `affluent_accelerators_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.affluentApp = new AffluentApp();
  window.affluentApp.init();
});
