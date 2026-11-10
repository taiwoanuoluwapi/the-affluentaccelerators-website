// THE AFFLUENTACCELERATORS - CORE APPLICATION LOGIC

// ============================================================================
// UNIFIED MASTER GOOGLE SHEETS WEBHOOK CONFIGURATION
// ============================================================================
// Master Unified Webhook URL: Routes all Event Registrations (single tab)
// and Inquiries/Applications (Business Audits, Consulting, Analyst, Internship)
// into one consolidated Master Google Spreadsheet with dedicated tabs.
const UNIFIED_GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzIwLdLmzRJVPJAyrrLwLDCYgsiOmZAR3-SjYG_CllDA17xgCITuCYFKwIOWdsZj8w/exec";
const INQUIRIES_GOOGLE_SHEETS_WEBHOOK_URL = UNIFIED_GOOGLE_SHEETS_WEBHOOK_URL;
const EVENTS_GOOGLE_SHEETS_WEBHOOK_URL = UNIFIED_GOOGLE_SHEETS_WEBHOOK_URL;
const GOOGLE_SHEETS_WEBHOOK_URL = UNIFIED_GOOGLE_SHEETS_WEBHOOK_URL; // Backward compatibility alias

// Default Initial State
const DEFAULT_STATE = {
  cms: {
    programmeFee: "₦175,000",
    cohortStartDate: "March 15, 2026",
    cohortLocation: "Hybrid (In-Person Consulting Hub & Live Strategic Sessions)",
    whatsappNumber: "+234 903 954 5275",
    whatsappChannel: "https://whatsapp.com/channel/0029VbF4VgZAojYzawgu8I0Q",
    contactPhone: "+234 903 954 5275",
    contactEmail: "advisory@affluentaccelerators.com",
    officeLocation: "Victoria Island, Lagos, Nigeria",
  },
  roles: [
    { id: "role-1", title: "Business Research Associate", type: "Research & Strategy", active: true, department: "Strategy & Advisory", commitment: "Full-Time / Part-Time" },
    { id: "role-2", title: "Business Analyst Intern", type: "Analysis & Intelligence", active: true, department: "Consulting Operations", commitment: "Full-Time" },
    { id: "role-3", title: "Consulting Associate", type: "Client Engagements", active: true, department: "Client Advisory", commitment: "Full-Time" },
    { id: "role-4", title: "Business Development Intern", type: "Growth & Partnerships", active: true, department: "Growth & Expansion", commitment: "Full-Time / Flexible", externalUrl: "https://docs.google.com/forms/d/e/1FAIpQLSflnGt5tzDGTz6Ow5bPcLeTQLjCvGrW4I_c9NvfSDtAf7eA7Q/viewform", isHot: true },
    { id: "role-ea", title: "Executive Assistant Intern", type: "Executive Support & Operations", active: true, department: "Executive Office", commitment: "Full-Time / Flexible", externalUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfPE3ZLkJ-PLMNPF76JQB__fQ-EdsK9k6XPqraz5TGz0_f7mg/viewform", isHot: true },
    { id: "role-5", title: "Marketing & Growth Associate", type: "Brand & Campaigns", active: true, department: "Commercial Growth", commitment: "Full-Time" },
    { id: "role-6", title: "Operations & Project Support", type: "Process Optimization", active: true, department: "Internal Operations", commitment: "Full-Time" },
    { id: "role-7", title: "Research & Strategy Fellow", type: "Fellowship (Advanced)", active: true, department: "Executive Research", commitment: "6-Month Fellowship" }
  ],
  leads: [],
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
  }

  loadState() {
    try {
      const stored = localStorage.getItem('affluent_state_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure new phone number is always applied if old placeholder was cached
        if (!parsed.cms || parsed.cms.whatsappNumber === '+2348000000000' || !parsed.cms.contactPhone) {
          parsed.cms = parsed.cms || {};
          parsed.cms.whatsappNumber = "+234 903 954 5275";
          parsed.cms.contactPhone = "+234 903 954 5275";
        }
        // Ensure latest case studies are merged
        if (parsed.caseStudies && Array.isArray(parsed.caseStudies)) {
          parsed.caseStudies = parsed.caseStudies.filter(c => c.id !== 'cs-4' && c.id !== 'cs-5');
          DEFAULT_STATE.caseStudies.forEach(defaultCs => {
            if (!parsed.caseStudies.some(c => c.id === defaultCs.id)) {
              parsed.caseStudies.push(defaultCs);
            }
          });
        } else {
          parsed.caseStudies = DEFAULT_STATE.caseStudies;
        }
        return parsed;
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
    const homeAnchors = ['about', 'services', 'approach', 'programmes', 'why-us', 'experience', 'careers', 'insights', 'contact'];
    
    if (homeAnchors.includes(hash)) {
      this.switchView('home');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (hash === 'programme-analyst' || hash === 'programme-internship' || hash === 'programme-accelerator') {
      window.location.href = 'careers.html';
      return;
    }

    if (hash === 'insights-view') {
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
  }

  bindNavigation() {
    // Top nav brand click
    document.querySelectorAll('.brand-home-link').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#home';
      });
    });

    // Dedicated CTA openers with optional prefill
    document.querySelectorAll('[data-open-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = btn.getAttribute('data-open-modal');
        const industry = btn.getAttribute('data-industry');
        this.openModal(modalId, { industry });
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

    // If industry prefill
    if (prefillData.industry) {
      const selectAudit = modal.querySelector('#audit-industry');
      if (selectAudit) selectAudit.value = prefillData.industry;
      const selectConsulting = modal.querySelector('#consulting-industry');
      if (selectConsulting) selectConsulting.value = prefillData.industry;
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';

    if (modalId === 'modal-consulting-inquiry' && this.consultingUploader) this.consultingUploader.clear();
    if (modalId === 'modal-analyst-application' && this.analystUploader) this.analystUploader.clear();
    if (modalId === 'modal-internship-application' && this.internshipUploader) this.internshipUploader.clear();
  }

  // ============================================================================
  // GOOGLE SHEETS FORM SUBMISSION HANDLER (INQUIRIES & HIRING APPLICATIONS ONLY)
  // ============================================================================
  async submitToGoogleSheet(sheetName, submissionData, fileObj = null) {
    const webhookUrl = localStorage.getItem('AA_UNIFIED_SHEETS_URL') ||
                       localStorage.getItem('AA_INQUIRIES_SHEETS_URL') ||
                       localStorage.getItem('AA_EVENTS_SHEETS_URL') ||
                       UNIFIED_GOOGLE_SHEETS_WEBHOOK_URL;
    
    const payload = {
      sheetName: sheetName,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
      id: submissionData["Reference ID"] || `LEAD-${Date.now().toString().slice(-4)}`,
      data: submissionData
    };

    if (fileObj && fileObj.base64) {
      payload.file = fileObj;
    }

    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
        console.log(`[Google Sheets] Transmitted successfully to sheet: ${sheetName}`);
      } catch (err) {
        console.warn("[Google Sheets] Network transmission error, saved locally:", err);
      }
    } else {
      console.info(`[Google Sheets] Form logged for tab: '${sheetName}'. Set your Google Apps Script Web App URL in app.js or localStorage to stream rows live.`);
    }

    // Resilient Local Backup (store file metadata only, avoiding localStorage overflow)
    const backupData = Object.assign({}, submissionData);
    if (fileObj) {
      backupData["Uploaded File"] = `${fileObj.fileName} (${(fileObj.fileSize / 1024).toFixed(1)} KB)`;
    }
    this.state.leads.unshift({
      id: payload.id,
      sheetName: sheetName,
      date: new Date().toISOString().split('T')[0],
      ...backupData
    });
    this.saveState();
  }

  // Forms binding (Three distinct funnels)
  bindForms() {
    // Initialize PDF Drag & Drop Uploaders for modal forms
    this.consultingUploader = setupPdfUploader({
      dropzoneId: 'dropzone-consulting-doc',
      inputId: 'consulting-doc-file',
      defaultPreviewId: 'preview-consulting-doc-default',
      selectedPreviewId: 'preview-consulting-doc-selected',
      filenameId: 'filename-consulting-doc',
      filesizeId: 'filesize-consulting-doc',
      removeBtnId: 'remove-consulting-doc',
      errorId: 'error-consulting-doc'
    });

    this.analystUploader = setupPdfUploader({
      dropzoneId: 'dropzone-analyst-cv',
      inputId: 'analyst-cv-file',
      defaultPreviewId: 'preview-analyst-cv-default',
      selectedPreviewId: 'preview-analyst-cv-selected',
      filenameId: 'filename-analyst-cv',
      filesizeId: 'filesize-analyst-cv',
      removeBtnId: 'remove-analyst-cv',
      errorId: 'error-analyst-cv'
    });

    this.internshipUploader = setupPdfUploader({
      dropzoneId: 'dropzone-internship-cv',
      inputId: 'internship-cv-file',
      defaultPreviewId: 'preview-internship-cv-default',
      selectedPreviewId: 'preview-internship-cv-selected',
      filenameId: 'filename-internship-cv',
      filesizeId: 'filesize-internship-cv',
      removeBtnId: 'remove-internship-cv',
      errorId: 'error-internship-cv'
    });

    // Form A: Business Consulting Inquiry Form
    const formA = document.getElementById('form-consulting-inquiry');
    if (formA) {
      formA.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fileObj = this.consultingUploader ? this.consultingUploader.getFile() : null;
        const submitBtn = formA.querySelector('button[type="submit"]');
        const origBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = fileObj 
            ? `<span>Uploading to Google Drive & Transmitting...</span>` 
            : `<span>Transmitting to Advisory Council...</span>`;
        }

        const trackVal = (formA.querySelector('#consulting-track') && formA.querySelector('#consulting-track').value) 
          ? formA.querySelector('#consulting-track').value 
          : "Paid In-Depth Strategy & Review";
        const teamSizeVal = formA.querySelector('#consulting-team-size') ? formA.querySelector('#consulting-team-size').value : "6 – 20 Employees";
        const websiteVal = formA.querySelector('#consulting-website') ? formA.querySelector('#consulting-website').value.trim() : "N/A";

        const leadData = {
          "Reference ID": `INQ-${Date.now().toString().slice(-4)}`,
          "Submission Track": trackVal,
          "Lead Source": "Website - Paid In-Depth Strategy Track",
          "Full Name": formA.querySelector('#consulting-name').value.trim(),
          "Business Name": formA.querySelector('#consulting-business').value.trim(),
          "Work Email": formA.querySelector('#consulting-email').value.trim(),
          "Phone / WhatsApp": formA.querySelector('#consulting-phone').value.trim(),
          "Industry": formA.querySelector('#consulting-industry').value.trim(),
          "Business Location": formA.querySelector('#consulting-location').value.trim(),
          "Team Size": teamSizeVal,
          "Website or Social URL": websiteVal,
          "Business Stage": formA.querySelector('#consulting-stage').value,
          "Business Operations": formA.querySelector('#consulting-desc').value.trim(),
          "Core Challenges": formA.querySelector('#consulting-challenge').value.trim(),
          "Support Requested": formA.querySelector('#consulting-support').value,
          "Additional Notes": (formA.querySelector('#consulting-notes') && formA.querySelector('#consulting-notes').value) ? formA.querySelector('#consulting-notes').value.trim() : 'N/A'
        };

        await this.submitToGoogleSheet('Business Audits & Inquiries', leadData, fileObj);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
        }

        formA.reset();
        if (this.consultingUploader) this.consultingUploader.clear();
        this.closeModal('modal-consulting-inquiry');
        this.showConfirmationModal(
          'Consultation Request Received',
          'Thank you. Your strategic diagnostic inquiry has been recorded. Our senior advisory practice will review your profile and reach out within 24 business hours.'
        );
      });
    }

    // Form B: 90-Day Business Consultant/Analyst Programme Application
    const formB = document.getElementById('form-analyst-application');
    if (formB) {
      formB.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fileObj = this.analystUploader ? this.analystUploader.getFile() : null;
        const submitBtn = formB.querySelector('button[type="submit"]');
        const origBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = fileObj 
            ? `<span>Uploading to Google Drive & Submitting...</span>` 
            : `<span>Submitting Application...</span>`;
        }

        const leadData = {
          "Reference ID": `AP-${Date.now().toString().slice(-4)}`,
          "Full Name": formB.querySelector('#analyst-name').value.trim(),
          "Email Address": formB.querySelector('#analyst-email').value.trim(),
          "Phone (WhatsApp Active)": formB.querySelector('#analyst-phone').value.trim(),
          "City of Residence": formB.querySelector('#analyst-location').value.trim(),
          "Highest Qualification": formB.querySelector('#analyst-qualification').value.trim(),
          "Current Role": formB.querySelector('#analyst-occupation').value.trim(),
          "Why Consulting": formB.querySelector('#analyst-why').value.trim(),
          "Strategy Interest": formB.querySelector('#analyst-interest').value.trim(),
          "Post-Programme Goals": formB.querySelector('#analyst-goals').value.trim(),
          "Schedule Commitment": formB.querySelector('#analyst-commitment').value,
          "Ready to Invest (₦175,000)": formB.querySelector('#analyst-investment').value,
          "Referral Source": formB.querySelector('#analyst-source').value
        };

        await this.submitToGoogleSheet('Analyst Applications', leadData, fileObj);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
        }

        formB.reset();
        if (this.analystUploader) this.analystUploader.clear();
        this.closeModal('modal-analyst-application');
        this.showConfirmationModal(
          'Application Successfully Submitted',
          'Your application for the 90-Day Business Consultant/Analyst Development Programme has been logged. Our admissions committee will review your profile and follow up via WhatsApp / email.'
        );
      });
    }

    // Form C: Internship / Fellowship Application
    const formC = document.getElementById('form-internship-application');
    if (formC) {
      formC.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fileObj = this.internshipUploader ? this.internshipUploader.getFile() : null;
        const portfolioVal = formC.querySelector('#internship-portfolio') ? formC.querySelector('#internship-portfolio').value.trim() : '';

        if (!fileObj && !portfolioVal) {
          if (this.internshipUploader) {
            this.internshipUploader.setError('Please upload your CV / Resume in PDF format.');
          }
          return;
        }

        const submitBtn = formC.querySelector('button[type="submit"]');
        const origBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = fileObj 
            ? `<span>Uploading to Google Drive & Submitting...</span>` 
            : `<span>Submitting Application...</span>`;
        }

        const leadData = {
          "Reference ID": `INT-${Date.now().toString().slice(-4)}`,
          "Full Name": formC.querySelector('#internship-name').value.trim(),
          "Email Address": formC.querySelector('#internship-email').value.trim(),
          "Phone / WhatsApp": formC.querySelector('#internship-phone').value.trim(),
          "Location": formC.querySelector('#internship-location').value.trim(),
          "Educational Background": formC.querySelector('#internship-education').value.trim(),
          "Current Occupation": formC.querySelector('#internship-occupation').value.trim(),
          "Preferred Role": formC.querySelector('#internship-preferred-role').value,
          "Relevant Skills": formC.querySelector('#internship-skills').value.trim(),
          "Weekly Commitment": formC.querySelector('#internship-availability').value,
          "Previous Experience": (formC.querySelector('#internship-experience') && formC.querySelector('#internship-experience').value) ? formC.querySelector('#internship-experience').value.trim() : 'N/A',
          "Motivation": formC.querySelector('#internship-why').value.trim(),
          "Learning Goals": formC.querySelector('#internship-learn').value.trim(),
          "LinkedIn / Portfolio": portfolioVal || 'N/A'
        };

        await this.submitToGoogleSheet('Internship Applications', leadData, fileObj);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
        }

        formC.reset();
        if (this.internshipUploader) this.internshipUploader.clear();
        this.closeModal('modal-internship-application');
        this.showConfirmationModal(
          'Internship Application Received',
          'Thank you for your interest in practical exposure with The Affluentaccelerators team. Our talent council reviews applications on a rolling basis.'
        );
      });
    }

    // Form D: Custom Business Video & Strategy Audit Request
    const formAudit = document.getElementById('form-business-audit');
    if (formAudit) {
      formAudit.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = formAudit.querySelector('button[type="submit"]');
        const origBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Assigning Consultant & Preparing Audit...</span>`;
        }

        const trackVal = (formAudit.querySelector('#audit-track') && formAudit.querySelector('#audit-track').value)
          ? formAudit.querySelector('#audit-track').value
          : "One-Time Free Audit";
        const locationVal = formAudit.querySelector('#audit-location') ? formAudit.querySelector('#audit-location').value.trim() : "Lagos, Nigeria";
        const teamSizeVal = formAudit.querySelector('#audit-team-size') ? formAudit.querySelector('#audit-team-size').value : "6 – 20 Employees";
        const websiteVal = formAudit.querySelector('#audit-website') ? formAudit.querySelector('#audit-website').value.trim() : "N/A";

        const leadData = {
          "Reference ID": `AUD-${Date.now().toString().slice(-4)}`,
          "Submission Track": trackVal,
          "Lead Source": "Website - One-Time Free Audit Track",
          "Full Name": formAudit.querySelector('#audit-name').value.trim(),
          "Business Name": formAudit.querySelector('#audit-business').value.trim(),
          "WhatsApp Number": formAudit.querySelector('#audit-whatsapp').value.trim(),
          "Email Address": formAudit.querySelector('#audit-email').value.trim(),
          "Industry / Sector": formAudit.querySelector('#audit-industry').value.trim(),
          "Business Location": locationVal,
          "Team Size": teamSizeVal,
          "Website or Social URL": websiteVal,
          "Current Stage": formAudit.querySelector('#audit-stage').value,
          "What the Business Does": formAudit.querySelector('#audit-desc').value.trim(),
          "Core Struggle / Bottleneck": formAudit.querySelector('#audit-struggles').value.trim(),
          "Primary Goal": formAudit.querySelector('#audit-goal').value.trim(),
          "Preferred Response Format": formAudit.querySelector('#audit-format').value
        };

        await this.submitToGoogleSheet('Business Audits & Inquiries', leadData);

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
        }

        formAudit.reset();
        this.closeModal('modal-business-audit');
        this.showConfirmationModal(
          'Audit Request Dispatched to Consultant',
          'Thank you! Your business breakdown has been delivered directly to our consulting desk. An available consultant is preparing your personalized video/message audit and will deliver it directly to your WhatsApp number within 24 hours. Be sure to also join our WhatsApp Channel for continuous executive briefings.'
        );
      });
    }
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
      el.textContent = `WhatsApp: ${this.state.cms.whatsappNumber}`;
      el.href = `https://wa.me/${this.state.cms.whatsappNumber.replace(/[^0-9]/g, '')}`;
    });
    document.querySelectorAll('[data-cms="contactPhone"]').forEach(el => {
      el.textContent = this.state.cms.contactPhone || "+234 903 954 5275";
      if (el.tagName === 'A') {
        el.href = `tel:${(this.state.cms.contactPhone || '2349039545275').replace(/[^0-9+]/g, '')}`;
      }
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
}

// PDF Drag & Drop / File Uploader Helper for Modal Forms
function setupPdfUploader(config) {
  const dropzone = document.getElementById(config.dropzoneId);
  const input = document.getElementById(config.inputId);
  const defaultPreview = document.getElementById(config.defaultPreviewId);
  const selectedPreview = document.getElementById(config.selectedPreviewId);
  const filenameEl = document.getElementById(config.filenameId);
  const filesizeEl = document.getElementById(config.filesizeId);
  const removeBtn = document.getElementById(config.removeBtnId);
  const errorEl = document.getElementById(config.errorId);

  if (!input) return null;

  let currentFile = null;

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  }

  function setError(msg) {
    if (errorEl) {
      if (msg) {
        errorEl.textContent = msg;
        errorEl.classList.remove('hidden');
      } else {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
      }
    }
  }

  function handleFile(file) {
    setError('');
    if (!file) return;

    // Check if PDF
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setError('Invalid file format: Please select a PDF document (.pdf).');
      clearFile();
      return;
    }

    // Max 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File exceeds 10MB limit (' + formatBytes(file.size) + '). Please choose a smaller PDF.');
      clearFile();
      return;
    }

    // Read file as Base64
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      const base64 = dataUrl.split(',')[1];
      currentFile = {
        base64: base64,
        fileName: file.name,
        mimeType: 'application/pdf',
        fileSize: file.size
      };

      if (filenameEl) filenameEl.textContent = file.name;
      if (filesizeEl) filesizeEl.textContent = formatBytes(file.size) + ' • Ready to upload to Google Drive';
      if (defaultPreview) defaultPreview.classList.add('hidden');
      if (selectedPreview) selectedPreview.classList.remove('hidden');
      if (dropzone) dropzone.classList.add('border-emerald-500', 'bg-emerald-50/40');
    };
    reader.onerror = function() {
      setError('Error reading file. Please try again.');
      clearFile();
    };
    reader.readAsDataURL(file);
  }

  function clearFile() {
    currentFile = null;
    if (input) input.value = '';
    if (defaultPreview) defaultPreview.classList.remove('hidden');
    if (selectedPreview) selectedPreview.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('border-emerald-500', 'bg-emerald-50/40');
  }

  input.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      clearFile();
      setError('');
    });
  }

  // Drag and drop events on dropzone
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('border-gold-400', 'bg-gold-50/40');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('border-gold-400', 'bg-gold-50/40');
      }, false);
    });

    dropzone.addEventListener('drop', function(e) {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) {
        handleFile(dt.files[0]);
      }
    }, false);
  }

  return {
    getFile: () => currentFile,
    clear: clearFile,
    hasFile: () => currentFile !== null,
    setError: setError
  };
}

// Global Career Role Modal Helpers
window.openRoleModal = function(roleId) {
  const modal = document.getElementById(roleId === 'role-ea-intern' ? 'modal-ea-intern' : 'modal-bd-intern');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
};

window.closeRoleModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

// ============================================================================
// CENTRAL EVENT REGISTRATION & GOOGLE SHEETS DATABASE MANAGER (SECTIONS A - I)
// ============================================================================
class CentralEventManager {
  constructor() {
    this.storageKey = 'affluent_events_database_v1';
    this.state = this.loadState();
  }

  loadState() {
    const defaultData = {
      spreadsheetName: "THE AFFLUENTACCELERATORS – MASTER DATABASE",
      spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1B7nNssq52qgZkXwHq7YJ_mQn_sample",
      events: [
        {
          id: "EVENT 001",
          title: "The Investable Business Playbook",
          category: "Live Webinar",
          date: "2026-11-19",
          time: "18:00",
          timezone: "WAT",
          dateFormatted: "Wednesday, November 19, 2026 • 6:00 PM WAT",
          isoDate: "2026-11-19T18:00:00+01:00",
          venue: "Live on Google Meet",
          host: "Fulfilment Taiwo (Lead Consultant)",
          tabName: "EVENT 001 – The Investable Business Playbook",
          flyer: "images/photo-1794301616-c3edd84b.jpg",
          status: "Upcoming",
          description: "How to Build Businesses That Attract Investors. A masterclass on institutional systems, cash flow diagnostics, and angel/VC due-diligence criteria."
        },
        {
          id: "EVENT 002",
          title: "Business Growth & Revenue Scaling Masterclass",
          category: "Executive Masterclass",
          date: "2026-12-12",
          time: "16:00",
          timezone: "WAT",
          dateFormatted: "Saturday, December 12, 2026 • 4:00 PM WAT",
          isoDate: "2026-12-12T16:00:00+01:00",
          venue: "Virtual Interactive Workshop",
          host: "Lead Advisory Practice",
          tabName: "EVENT 002 – Business Growth Masterclass",
          flyer: "images/photo-1794301616-c3edd84b.jpg",
          status: "Upcoming",
          description: "Moving beyond founder-led hustle to sustainable sales funnels, regional distributor partnerships, and predictable revenue engines."
        },
        {
          id: "EVENT 003",
          title: "Business Finance & Cashflow Restructuring",
          category: "Diagnostic Workshop",
          date: "2027-01-14",
          time: "17:00",
          timezone: "WAT",
          dateFormatted: "Thursday, January 14, 2027 • 5:00 PM WAT",
          isoDate: "2027-01-14T17:00:00+01:00",
          venue: "Live on Google Meet",
          host: "Lead Financial Advisory Practice",
          tabName: "EVENT 003 – Business Finance Workshop",
          flyer: "images/photo-1794301616-c3edd84b.jpg",
          status: "Upcoming",
          description: "Hands-on diagnostic clinic covering working capital traps, managing uncollected trade receivables, and structuring audited financial dashboards."
        },
        {
          id: "EVENT 004",
          title: "African Founder Roundtable & Deal Clinic",
          category: "Founder Roundtable",
          date: "2027-02-18",
          time: "18:00",
          timezone: "WAT",
          dateFormatted: "Thursday, February 18, 2027 • 6:00 PM WAT",
          isoDate: "2027-02-18T18:00:00+01:00",
          venue: "Curated Executive Roundtable",
          host: "Fulfilment Taiwo & Guest Partners",
          tabName: "EVENT 004 – Founder Roundtable",
          flyer: "images/photo-1794301616-c3edd84b.jpg",
          status: "Upcoming",
          description: "Intimate deal clinic for established founders looking to pitch institutional investors, structure mezzanine debt, or execute expansion rounds."
        }
      ],
      registrations: [
        {
          id: "REG-EVT001-TEST01",
          eventId: "EVENT 001",
          eventTitle: "The Investable Business Playbook",
          createdAt: "2026-11-09 14:30:00",
          syncStatus: "synced",
          syncTimestamp: "2026-11-09 14:30:04",
          attendanceStatus: "Confirmed Registered",
          followupStatus: "Pending Review",
          data: {
            "Registration ID": "REG-EVT001-TEST01",
            "Registration Date": "2026-11-09",
            "Full Name": "Emeka Adeleke",
            "Email Address": "emeka.adeleke@example.com",
            "Phone / WhatsApp Number": "+234 803 123 4567",
            "Country": "Nigeria",
            "City / State": "Lagos",
            "Occupation / Participant Category": "Founder / CEO",
            "Business Name": "Nexora Logistics & Distribution",
            "Business Description": "B2B temperature-controlled logistics for fast-moving consumer goods and regional retailers.",
            "Industry": "Logistics & Supply Chain",
            "Business Age": "1 – 3 Years",
            "Business Stage": "Growth & Scaling",
            "Website / Social Media Link": "https://nexoralogistics.example.com",
            "Number of Employees": "6 – 15 Employees",
            "Revenue Status": "Consistently Profitable",
            "Monthly Revenue Range": "₦2M – ₦10M ($1,400–$7,000)",
            "Business Registration Status": "Fully Registered / Incorporated (CAC)",
            "Financial Record-Keeping Status": "Cloud Accounting (QuickBooks / Xero / Wave)",
            "Operational Systems Status": "Transitioning to Systems (Some SOPs, founder still involved)",
            "Biggest Business Challenges": "Access to Growth Capital & Funding",
            "Business Priorities": "Securing Institutional Growth Capital",
            "Learning Expectations": "Mastering the investor readiness checklist and financial modeling requirements.",
            "Question for Guest Speaker": "How should early-stage African logistics operators structure debt vs equity when expanding fleet?",
            "Consulting Interest": "Yes - Immediate Need (Next 30 Days)",
            "Investable Business Playbook Interest": "Yes - Want Full Playbook & Advisory Brief",
            "Playbook & Event Materials Interest": "Yes - Want Full Playbook & Advisory Brief",
            "Investment-Readiness Interest": "Yes - Actively Preparing for Funding Round",
            "Follow-up Interest": "Yes - Schedule 15-min Discovery Call",
            "Marketing Consent": "Yes",
            "Communication Preferences": "WhatsApp & Email",
            "Attendance Status": "Confirmed Registered",
            "Follow-up Status": "Pending Review"
          }
        }
      ]
    };

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.events || parsed.events.length === 0) {
          parsed.events = defaultData.events;
        } else {
          // Ensure events have structured date, time, isoDate, flyer, and status
          parsed.events.forEach(evt => {
            const def = defaultData.events.find(d => d.id === evt.id);
            if (def) {
              if (!evt.time && def.time) evt.time = def.time;
              if (!evt.date && def.date) evt.date = def.date;
              if (!evt.isoDate && def.isoDate) evt.isoDate = def.isoDate;
              if (!evt.dateFormatted && def.dateFormatted) evt.dateFormatted = def.dateFormatted;
              if (!evt.flyer && def.flyer) evt.flyer = def.flyer;
              if (!evt.host && def.host) evt.host = def.host;
              if (!evt.status) evt.status = def.status;
            }
          });
        }
        return parsed;
      }
    } catch (e) {
      console.warn("Could not load stored event database:", e);
    }
    return defaultData;
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error("Error saving event database:", e);
    }
  }

  // Register Participant (Requirements C, D, G)
  async registerParticipant(formData) {
    const eventId = formData.eventId || "EVENT 001";
    const cleanNum = eventId.replace(/[^0-9]/g, "") || "001";
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const regId = "REG-EVT" + cleanNum + "-" + randCode;

    const eventObj = this.state.events.find(e => e.id === eventId) || {
      id: eventId,
      title: formData.eventTitle || "Special Event"
    };

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const record = {
      id: regId,
      eventId: eventId,
      eventTitle: eventObj.title,
      createdAt: nowStr,
      syncStatus: "pending",
      syncTimestamp: null,
      attendanceStatus: formData["Attendance Status"] || "Confirmed Registered",
      followupStatus: formData["Follow-up Status"] || "Pending Review",
      data: {
        "Registration ID": regId,
        "Registration Date": nowStr.substring(0, 10),
        ...formData
      }
    };

    // Save locally immediately (Primary source of truth - Section G)
    this.state.registrations.unshift(record);
    this.saveState();

    // Trigger asynchronous sync to Google Sheets
    await this.syncRegistration(regId);

    return {
      id: regId,
      record: record
    };
  }

  // Send Registration to Dedicated Events Google Sheets Webhook
  async syncRegistration(regId) {
    const record = this.state.registrations.find(r => r.id === regId);
    if (!record) return false;

    const webhookUrl = localStorage.getItem('AA_UNIFIED_SHEETS_URL') ||
                       localStorage.getItem('AA_EVENTS_SHEETS_URL') ||
                       localStorage.getItem('AA_INQUIRIES_SHEETS_URL') ||
                       EVENTS_GOOGLE_SHEETS_WEBHOOK_URL ||
                       UNIFIED_GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl || !webhookUrl.startsWith('http')) {
      console.warn("[Events Sync] Unified Events Webhook URL not configured yet. Registration is securely saved in local database.");
      return false;
    }

    const payload = {
      action: "register_event",
      eventId: record.eventId,
      eventTitle: record.eventTitle,
      registrationId: record.id,
      timestamp: record.createdAt,
      data: record.data
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      });

      record.syncStatus = "synced";
      record.syncTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
      this.saveState();
      return true;
    } catch (err) {
      console.error("[Google Sheets Sync Error]", err);
      record.syncStatus = "failed";
      record.lastError = err.toString();
      this.saveState();
      return false;
    }
  }

  // Parse any event date/time format into a reliable JavaScript Date object
  parseEventDate(evt) {
    if (!evt) return null;
    if (evt.isoDate) {
      const d = new Date(evt.isoDate);
      if (!isNaN(d.getTime())) return d;
    }
    if (evt.date) {
      // Clean standard YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(evt.date)) {
        const timeStr = evt.time || "18:00";
        const d = new Date(`${evt.date}T${timeStr}:00+01:00`);
        if (!isNaN(d.getTime())) return d;
      }
      // Natural language e.g. "Wednesday, November 19, 2026 • 6:00 PM WAT"
      const dateOnly = evt.date.replace(/^[A-Za-z]+,\s*/, '').replace(/•.*$/, '').trim();
      let timeOnly = evt.time || "";
      if (!timeOnly) {
        const timeMatch = evt.date.match(/(\d{1,2}:\d{2}\s*(?:AM|PM|WAT|GMT))/i);
        if (timeMatch) timeOnly = timeMatch[1].replace(/WAT|GMT/i, '').trim();
      }
      const combined = dateOnly + " " + (timeOnly || "18:00") + " GMT+0100";
      const d = new Date(combined);
      if (!isNaN(d.getTime())) return d;

      const direct = new Date(evt.date);
      if (!isNaN(direct.getTime())) return direct;
    }
    return null;
  }

  // Get all upcoming events sorted chronologically (nearest upcoming first)
  getUpcomingEvents() {
    const now = new Date();
    return this.state.events
      .filter(evt => {
        const evtDate = this.parseEventDate(evt);
        if (!evtDate) return true; // keep if cannot parse
        // Add 2 hours buffer so event remains "live/upcoming" during its session
        const evtEnd = new Date(evtDate.getTime() + (2 * 60 * 60 * 1000));
        return evtEnd >= now;
      })
      .sort((a, b) => {
        const da = this.parseEventDate(a);
        const db = this.parseEventDate(b);
        if (!da || !db) return 0;
        return da.getTime() - db.getTime();
      });
  }

  // Get next upcoming event (or latest fallback if all passed)
  getNextUpcomingEvent() {
    const upcoming = this.getUpcomingEvents();
    if (upcoming.length > 0) {
      return upcoming[0];
    }
    // Fallback: return first event in list
    return this.state.events.length > 0 ? this.state.events[0] : null;
  }

  // Sync latest published events catalogue from Google Sheet
  async syncEventsFromSheet() {
    const webhookUrl = localStorage.getItem('AA_UNIFIED_SHEETS_URL') ||
                       EVENTS_GOOGLE_SHEETS_WEBHOOK_URL ||
                       UNIFIED_GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl || !webhookUrl.startsWith('http')) return this.state.events;

    try {
      const resp = await fetch(webhookUrl + (webhookUrl.includes('?') ? '&' : '?') + 'action=get_events', {
        method: 'GET',
        mode: 'cors'
      });
      const data = await resp.json();
      if (data && data.status === 'success' && Array.isArray(data.events) && data.events.length > 0) {
        data.events.forEach(sheetEvt => {
          if (!sheetEvt.id) return;
          const idx = this.state.events.findIndex(e => e.id === sheetEvt.id);
          if (idx >= 0) {
            this.state.events[idx] = Object.assign(this.state.events[idx], sheetEvt);
          } else {
            this.state.events.push(sheetEvt);
          }
        });
        this.saveState();
      }
    } catch (e) {
      // Quiet fallback to local events catalogue
    }
    return this.state.events;
  }

  // Create & Publish New Event with Date, Time, Flyer & Google Sheet Tab Sync
  async createAndPublishEvent(eventData) {
    const cleanNum = (eventData.id || "").replace(/[^0-9]/g, "");
    const formattedId = cleanNum ? "EVENT " + cleanNum.padStart(3, '0') : (eventData.id || "EVENT 005");
    const tabName = formattedId + " – " + (eventData.title || "").substring(0, 35);

    // Format display date cleanly
    let formattedDateStr = eventData.dateFormatted;
    if (!formattedDateStr && eventData.date) {
      const parts = eventData.date.split('-');
      if (parts.length === 3) {
        const [y, m, d] = parts;
        const dateObj = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const monthName = dateObj.toLocaleDateString('en-US', { month: 'long' });
        
        let timeDisplay = "6:00 PM";
        if (eventData.time) {
          const [h, min] = eventData.time.split(':');
          const hours = parseInt(h, 10);
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const hours12 = hours % 12 || 12;
          timeDisplay = `${hours12}:${min || '00'} ${ampm}`;
        }
        const tz = eventData.timezone || "WAT";
        formattedDateStr = `${dayName}, ${monthName} ${parseInt(d, 10)}, ${y} • ${timeDisplay} ${tz}`;
      } else {
        formattedDateStr = eventData.date;
      }
    }

    const isoDateStr = eventData.isoDate || 
      (eventData.date && eventData.time ? `${eventData.date}T${eventData.time}:00+01:00` : null);

    const newEvt = {
      id: formattedId,
      title: eventData.title,
      category: eventData.category || "Executive Masterclass",
      date: eventData.date, // e.g. "2026-11-25"
      time: eventData.time || "18:00", // e.g. "18:00"
      timezone: eventData.timezone || "WAT",
      dateFormatted: formattedDateStr || (eventData.date + ' • ' + (eventData.time || '18:00') + ' WAT'),
      isoDate: isoDateStr,
      venue: eventData.venue || "Live on Google Meet",
      host: eventData.host || "Fulfilment Taiwo (Lead Consultant)",
      flyer: eventData.flyer || "images/photo-1794301616-c3edd84b.jpg",
      tabName: tabName,
      description: eventData.description || "",
      status: "Upcoming",
      createdAt: new Date().toISOString()
    };

    const existingIdx = this.state.events.findIndex(e => e.id === formattedId);
    if (existingIdx >= 0) {
      this.state.events[existingIdx] = Object.assign(this.state.events[existingIdx], newEvt);
    } else {
      this.state.events.push(newEvt);
    }
    this.saveState();

    // Stream & Sync Published Event to Master Google Sheets 'Events' Tab
    const webhookUrl = localStorage.getItem('AA_UNIFIED_SHEETS_URL') ||
                       localStorage.getItem('AA_EVENTS_SHEETS_URL') ||
                       EVENTS_GOOGLE_SHEETS_WEBHOOK_URL ||
                       UNIFIED_GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        const payload = {
          action: "publish_event",
          eventId: formattedId,
          eventTitle: newEvt.title,
          category: newEvt.category,
          date: newEvt.date,
          time: newEvt.time,
          timezone: newEvt.timezone,
          dateFormatted: newEvt.dateFormatted,
          isoDate: newEvt.isoDate,
          venue: newEvt.venue,
          host: newEvt.host,
          description: newEvt.description,
          flyer: (typeof newEvt.flyer === 'string' && newEvt.flyer.startsWith('data:')) ? 'Uploaded Flyer Image' : newEvt.flyer,
          tabName: tabName,
          status: "Upcoming",
          publishedAt: new Date().toISOString()
        };

        if (eventData.flyerFile && eventData.flyerFile.base64) {
          payload.flyerFile = eventData.flyerFile;
        }

        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
          mode: 'no-cors'
        });
      } catch (e) {
        console.warn("Could not sync published event to Google Sheets:", e);
      }
    }

    return newEvt;
  }

  // Retry Failed Synchronizations (Requirement F & G)
  async retryFailedSyncs() {
    const failed = this.state.registrations.filter(r => r.syncStatus !== "synced");
    let count = 0;
    for (const rec of failed) {
      const ok = await this.syncRegistration(rec.id);
      if (ok) count++;
    }
    return count;
  }

  // Reconcile All Registrations
  async reconcileAll() {
    let count = 0;
    for (const rec of this.state.registrations) {
      const ok = await this.syncRegistration(rec.id);
      if (ok) count++;
    }
    return count;
  }

  // Accessors
  getAllEvents() { return this.state.events; }
  getAllRegistrations() { return this.state.registrations; }
  getRegistrationById(id) { return this.state.registrations.find(r => r.id === id); }
  getRegistrationsForEvent(eventId) { return this.state.registrations.filter(r => r.eventId === eventId); }

  updateRegistrationField(regId, field, value) {
    const reg = this.getRegistrationById(regId);
    if (reg) {
      reg[field] = value;
      if (reg.data) reg.data[field] = value;
      this.saveState();
    }
  }

  // CSV Export
  exportRegistrationsCSV() {
    const regs = this.state.registrations;
    if (regs.length === 0) return;

    const sample = regs[0].data || {};
    const headers = ["Reg ID", "Event ID", "Sync Status", "Attendance", ...Object.keys(sample)];

    const rows = [headers];
    regs.forEach(r => {
      const row = [r.id, r.eventId, r.syncStatus, r.attendanceStatus];
      Object.keys(sample).forEach(k => {
        const val = (r.data[k] || '').toString().replace(/"/g, '""');
        row.push(`"${val}"`);
      });
      rows.push(row);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `affluent_accelerators_event_registrations_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // JSON Export
  exportRegistrationsJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.registrations, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `affluent_accelerators_event_registrations_${new Date().toISOString().substring(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// ============================================================================
// CENTRAL BUSINESS LEADS MANAGER (AUDITS, STRATEGY REVIEWS, CONSULTING LEADS)
// ============================================================================
class CentralLeadsManager {
  constructor() {
    this.storageKey = 'affluent_business_leads_v1';
    this.state = this.loadState();
  }

  loadState() {
    const defaultLeads = [
      {
        id: "LEAD-AUDIT-2026-4821",
        date: "2026-11-10",
        track: "One-Time Free Audit",
        name: "Babatunde Ogunlesi",
        businessName: "Zenith Peak Logistics",
        whatsapp: "+234 802 345 6789",
        email: "babatunde@zenithpeak.ng",
        industry: "Logistics, Supply Chain, Freight & Transport",
        stage: "Scaling SME ($100k - $1M/yr)",
        location: "Ikeja, Lagos, Nigeria",
        teamSize: "21 – 50 Employees (Established SME)",
        website: "https://zenithpeak.ng",
        description: "B2B long-haul cold chain logistics and freight forwarding for pharmaceutical and consumer goods distributors across southwestern Nigeria.",
        struggles: "Fleet downtime is eating margins, clients take 75+ days to settle invoices, and cash flow is locked in uncollected trade receivables.",
        goal: "Restructure working capital and establish formal distributor prepayment terms in next 60 days.",
        preferredFormat: "Custom Video Audit (Loom / Screen & Face)",
        status: "New Lead",
        syncStatus: "synced"
      },
      {
        id: "LEAD-STRAT-2026-3190",
        date: "2026-11-09",
        track: "Paid In-Depth Strategy & Review",
        name: "Dr. Amina Bello",
        businessName: "Zaria Bio-Nutrient Farms",
        whatsapp: "+234 814 987 6543",
        email: "amina.bello@zariabionutrients.com",
        industry: "Agriculture & Agribusiness",
        stage: "Consistent Revenue ($10k - $100k/yr)",
        location: "Kaduna & Kano, Nigeria",
        teamSize: "6 – 20 Employees (Growing Team)",
        website: "https://zariabionutrients.com",
        description: "Organic fertilizer and high-yield grain processing supplying off-taker networks across northern Nigeria.",
        struggles: "Need institutional expansion capital, audited cash flow forecasting, and unit economics pricing models to pitch commercial off-takers.",
        supportType: "Business Strategy & Advisory",
        notes: "Targeting Q1 2027 mezzanine debt. Requesting senior team advisory review.",
        status: "Contacted on WhatsApp",
        syncStatus: "synced"
      },
      {
        id: "LEAD-AUDIT-2026-2245",
        date: "2026-11-08",
        track: "One-Time Free Audit",
        name: "Chinedu Okonkwo",
        businessName: "Apex Cloud Solutions",
        whatsapp: "+234 905 432 1098",
        email: "chinedu@apexcloud.io",
        industry: "Technology, Software & Telecommunications",
        stage: "Early-Stage Generating First Sales",
        location: "Lekki, Lagos, Nigeria",
        teamSize: "2 – 5 Employees (Micro Enterprise)",
        website: "https://apexcloud.io",
        description: "Custom cloud infrastructure migration and DevOps support for mid-market financial services.",
        struggles: "Sales cycles take over 6 months; prospective clients agree during discovery but delay contract signing.",
        goal: "Shorten sales cycle to under 30 days and package fixed-scope productized retainers.",
        preferredFormat: "Detailed WhatsApp Voice Note Breakdown",
        status: "Audit Sent",
        syncStatus: "synced"
      }
    ];

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not parse stored business leads:", e);
    }
    return defaultLeads;
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error("Error saving business leads:", e);
    }
  }

  getAllLeads() {
    return this.state;
  }

  getLeadById(id) {
    return this.state.find(l => l.id === id);
  }

  saveLead(leadData) {
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const prefix = (leadData.track && leadData.track.includes("Paid")) ? "LEAD-STRAT" : "LEAD-AUDIT";
    const leadId = `${prefix}-${new Date().getFullYear()}-${randCode}`;

    const newLead = {
      id: leadId,
      date: new Date().toISOString().substring(0, 10),
      status: "New Lead",
      syncStatus: "synced",
      ...leadData
    };

    this.state.unshift(newLead);
    this.saveState();
    return newLead;
  }

  updateLeadStatus(leadId, newStatus) {
    const lead = this.getLeadById(leadId);
    if (lead) {
      lead.status = newStatus;
      this.saveState();
    }
  }

  exportLeadsCSV() {
    if (this.state.length === 0) return;
    const headers = [
      "Lead ID", "Date", "Track", "Full Name", "Business Name", "WhatsApp Number", 
      "Email Address", "Industry", "Location", "Team Size", "Business Stage", "Website", 
      "Status", "Core Struggles", "Growth Goal", "Support Type", "Preferred Format", "Notes"
    ];

    const rows = [headers];
    this.state.forEach(l => {
      rows.push([
        l.id || '',
        l.date || '',
        l.track || '',
        l.name || '',
        l.businessName || '',
        l.whatsapp || '',
        l.email || '',
        l.industry || '',
        l.location || '',
        l.teamSize || '',
        l.stage || '',
        l.website || '',
        l.status || '',
        (l.struggles || '').replace(/"/g, '""'),
        (l.goal || '').replace(/"/g, '""'),
        (l.supportType || '').replace(/"/g, '""'),
        (l.preferredFormat || '').replace(/"/g, '""'),
        (l.notes || '').replace(/"/g, '""')
      ].map(val => `"${val}"`));
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `affluent_business_inquiring_leads_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportLeadsJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `affluent_business_inquiring_leads_${new Date().toISOString().substring(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Instantiate Global Managers
window.affluentEvents = new CentralEventManager();
window.affluentLeads = new CentralLeadsManager();

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.affluentApp = new AffluentApp();
  window.affluentApp.init();
  if (!window.affluentEvents) {
    window.affluentEvents = new CentralEventManager();
  }
  if (!window.affluentLeads) {
    window.affluentLeads = new CentralLeadsManager();
  }
});
