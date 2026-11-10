/**
 * ============================================================================
 * THE AFFLUENTACCELERATORS – MASTER UNIFIED DATABASE AUTOMATION SCRIPT
 * (ALL EVENTS, INQUIRIES, BUSINESS AUDITS & APPLICATIONS IN ONE GOOGLE SHEET)
 * ============================================================================
 * 
 * SPREADSHEET ARCHITECTURE (SINGLE CONSOLIDATED DATABASE):
 * 1. "OVERVIEW DASHBOARD"     : Real-time KPI summaries, registration metrics & lead counts
 * 2. "Event Registrations"    : UNIFIED single tab for ALL masterclasses & webinars
 *                                (Each row includes "Event ID", "Event Name", plus all 30+
 *                                diagnostic fields: biggest bottlenecks, recurring requests,
 *                                stage, revenue, industry & consulting interest)
 * 3. "Business Audits"        : Free bespoke video/voice strategy audit requests
 * 4. "Consulting Inquiries"   : Formal consulting, advisory & growth support inquiries
 * 5. "Analyst Applications"   : 90-Day Consultant/Analyst Programme applications
 *                                (includes clickable Google Drive link to uploaded PDF CVs)
 * 6. "Internship Applications": Fellowship & Internship applications across all 7 roles
 *                                (includes clickable Google Drive link to uploaded PDF CVs)
 * 
 * GOOGLE DRIVE FILE AUTOMATION:
 * - Uploaded PDF resumes and documents are saved automatically to your Google Drive
 *   inside the dedicated folder: "The Affluentaccelerators: Hiring".
 * - The direct, clickable Google Drive link is recorded in the spreadsheet under
 *   "CV / Resume (Drive Link)" so you can click and review candidates instantly!
 * 
 * WHY COLLAPSING ALL EVENTS INTO ONE TAB IS SUPERIOR:
 * - Wholistic Bottleneck Analysis: Analyze recurring bottlenecks, challenges, and
 *   requests from all registrants across every masterclass in one unified table.
 * - Zero Maintenance: Launching Event 002, 003, etc., requires NO new tabs or formulas.
 * - Simple Filtering: You can easily filter by "Event ID" anytime via Google Sheets filters.
 * 
 * SETUP INSTRUCTIONS (3 MINUTES):
 * 1. Open your master Google Spreadsheet (or create a new one at https://sheets.new).
 * 2. Rename the spreadsheet to:
 *    THE AFFLUENTACCELERATORS – MASTER DATABASE
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Delete all existing code in Code.gs, and paste this ENTIRE script.
 * 5. Click the Save icon (diskette).
 * 6. Select "testUnifiedSetupAndSampleSubmissions" from the function dropdown at the top
 *    and click "Run".
 *    - Grant permissions when Google prompts (Review permissions > Advanced > Go to project > Allow).
 *    - Inspect your Google Sheet: All 6 tabs are generated with executive Forest Green & Gold styling!
 * 7. Click Deploy > New deployment.
 *    - Click Gear icon > Web app
 *    - Description: "The Affluentaccelerators Unified Master Database"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 8. Click Deploy, copy your Web App URL, and paste it into:
 *    - admin.html (under "Master Google Apps Script Webhook URL")
 *    - Or app.js (as UNIFIED_GOOGLE_SHEETS_WEBHOOK_URL)
 * ============================================================================
 */

// SPREADSHEET AND FOLDER CONFIGURATION
var MASTER_SPREADSHEET_NAME = "THE AFFLUENTACCELERATORS – MASTER DATABASE";
var GOOGLE_DRIVE_FOLDER_NAME = "The Affluentaccelerators: Hiring";

// EXECUTIVE BRAND COLOR PALETTE
var COLOR_FOREST_DARK = "#06261b";    // Deep Forest Green
var COLOR_FOREST_MED  = "#0a3828";    // Medium Forest Green
var COLOR_GOLD_LIGHT  = "#f3c74d";    // Warm Gold Text / Highlights
var COLOR_GOLD_BG     = "#fffdf5";    // Soft Gold Highlight
var COLOR_CARD_BG     = "#f0fdf4";    // Soft Mint KPI Card Background
var COLOR_ZEBRA_ROW   = "#f8faf8";    // Subtle alternating row tint

// TAB NAMES CONSTANTS
var TAB_OVERVIEW      = "OVERVIEW DASHBOARD";
var TAB_EVENTS        = "Event Registrations";
var TAB_AUDITS        = "Business Audits";
var TAB_INQUIRIES     = "Consulting Inquiries";
var TAB_ANALYST       = "Analyst Applications";
var TAB_INTERNSHIP    = "Internship Applications";

/**
 * Standardized Unified Headers for EVENT REGISTRATIONS (One Tab for All Events)
 */
var EVENT_REGISTRATIONS_HEADERS = [
  "Event ID",
  "Event Name",
  "Registration ID",
  "Registration Date",
  "Full Name",
  "Email Address",
  "Phone / WhatsApp Number",
  "Country",
  "City / State",
  "Occupation / Category",
  "Business Name",
  "Business Description",
  "Industry",
  "Business Age",
  "Business Stage",
  "Website / Social Link",
  "Number of Employees",
  "Monthly Revenue",
  "Business Registration Status",
  "Financial Record-Keeping Status",
  "Operational Systems Status",
  "Biggest Bottlenecks / Growth Challenges",
  "Business Priorities",
  "Learning Expectations",
  "Question for Speaker / Specific Bottleneck Request",
  "Consulting Interest",
  "Investable Business Playbook Interest",
  "Investment-Readiness Interest",
  "Follow-up Interest",
  "Marketing Consent",
  "Attendance Status",
  "Follow-up Status",
  "Sync Timestamp"
];

/**
 * Headers for BUSINESS AUDITS
 */
var BUSINESS_AUDITS_HEADERS = [
  "Reference ID",
  "Submission Time",
  "Full Name",
  "Business Name",
  "WhatsApp Number",
  "Email Address",
  "Industry / Sector",
  "Current Business Stage",
  "Business Description & Revenue Model",
  "Current Bottleneck / Where Stuck",
  "90-Day Growth Goal / Priority",
  "Preferred Audit Format",
  "Status",
  "Assigned Consultant / Notes"
];

/**
 * Headers for CONSULTING INQUIRIES
 */
var CONSULTING_INQUIRIES_HEADERS = [
  "Reference ID",
  "Submission Time",
  "Full Name",
  "Business Name",
  "Email Address",
  "Phone / WhatsApp Number",
  "Industry / Sector",
  "Location (City, Country)",
  "Business Stage",
  "Consulting Support Required",
  "Specific Challenges & Objectives",
  "Business Overview & Model",
  "Uploaded Document (Drive Link)",
  "Additional Notes",
  "Status",
  "Assigned Lead Consultant"
];

/**
 * Headers for ANALYST APPLICATIONS
 */
var ANALYST_APPLICATIONS_HEADERS = [
  "Reference ID",
  "Submission Time",
  "Full Name",
  "Email Address",
  "Phone / WhatsApp Number",
  "Location (City, State, Country)",
  "Highest Qualification",
  "Current Occupation",
  "CV / Resume (Drive Link)",
  "Motivation & Why This Programme",
  "Areas of Consulting Interest",
  "Post-Programme Career Goals",
  "Time Commitment (Hours/Week)",
  "Tuition Fee Readiness (₦175,000)",
  "How Did You Hear About Us",
  "Application Status",
  "Reviewer Notes"
];

/**
 * Headers for INTERNSHIP APPLICATIONS
 */
var INTERNSHIP_APPLICATIONS_HEADERS = [
  "Reference ID",
  "Submission Time",
  "Full Name",
  "Email Address",
  "Phone / WhatsApp Number",
  "Location (City, State, Country)",
  "Educational Background",
  "Current Occupation",
  "Preferred Role",
  "CV / Resume (Drive Link)",
  "Portfolio / LinkedIn / Work Links",
  "Key Skills & Strengths",
  "Weekly Availability",
  "Relevant Experience",
  "Motivation & Why Affluentaccelerators",
  "What You Hope To Learn",
  "Application Status",
  "Reviewer Notes"
];

// ============================================================================
// MAIN POST ROUTER (RECEIVES ALL INCOMING SUBMISSIONS & ADMIN REQUESTS)
// ============================================================================
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // 30-second concurrency lock
  } catch (lockError) {
    return createJsonResponse({
      status: "error",
      message: "Server busy, could not acquire script lock. Please try again."
    });
  }

  try {
    var payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        payload = (e && e.parameter) ? e.parameter : {};
      }
    } else if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      payload = e.parameter;
    } else {
      payload = { action: "ping" };
    }

    var spreadsheet = getMasterSpreadsheet();
    var action = payload.action || "";

    // 1. Connection Ping & Telemetry Test
    if (action === "test_connection" || action === "ping") {
      var sheets = spreadsheet.getSheets();
      var sheetNames = [];
      for (var s = 0; s < sheets.length; s++) {
        sheetNames.push(sheets[s].getName());
      }
      return createJsonResponse({
        status: "success",
        spreadsheetName: spreadsheet.getName(),
        spreadsheetUrl: spreadsheet.getUrl(),
        spreadsheetId: spreadsheet.getId(),
        totalSheets: sheets.length,
        sheets: sheetNames,
        type: "Unified Master Database (Events, Inquiries & Applications)",
        timestamp: new Date().toISOString()
      });
    }

    // 2. Action: Reconcile Batch of Registrations
    if (action === "reconcile_batch" && Array.isArray(payload.records)) {
      var batchResults = [];
      for (var i = 0; i < payload.records.length; i++) {
        var recResult = handleEventRegistrationSync(spreadsheet, payload.records[i]);
        batchResults.push(recResult);
      }
      return createJsonResponse({
        status: "success",
        reconciledCount: batchResults.length,
        results: batchResults
      });
    }

    // 3. Action: Create Event Tab Notice (All events now centralized)
    if (action === "create_event_tab") {
      ensureEventRegistrationsSheet(spreadsheet);
      return createJsonResponse({
        status: "success",
        message: "Unified event tab active. Event records will stream to 'Event Registrations' with Event ID.",
        eventId: payload.eventId || "EVENT",
        targetSheet: TAB_EVENTS,
        spreadsheetUrl: spreadsheet.getUrl()
      });
    }

    // 4. ROUTE: Event Registration (Centralized in single 'Event Registrations' tab)
    var isEvent = (action === "register_event") || 
                  (payload.formType === "event-registration") ||
                  (payload.eventId) || 
                  (payload.data && payload.data.eventId);

    if (isEvent) {
      var eventResult = handleEventRegistrationSync(spreadsheet, payload);
      return createJsonResponse(eventResult);
    }

    // 5. ROUTE: General Form Submissions (Audits, Inquiries, Applications)
    var formResult = handleGeneralFormSubmission(spreadsheet, payload);
    return createJsonResponse(formResult);

  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    return createJsonResponse({
      status: "error",
      message: error.toString(),
      stack: error.stack
    });
  } finally {
    lock.releaseLock();
  }
}

// ============================================================================
// MAIN GET ROUTER (HEALTH CHECK & STATUS)
// ============================================================================
function doGet(e) {
  try {
    var spreadsheet = getMasterSpreadsheet();
    var sheets = spreadsheet.getSheets();
    var sheetNames = [];
    for (var i = 0; i < sheets.length; i++) {
      sheetNames.push(sheets[i].getName());
    }

    var eventSheet = spreadsheet.getSheetByName(TAB_EVENTS);
    var totalRegistrations = eventSheet ? Math.max(0, eventSheet.getLastRow() - 1) : 0;

    return createJsonResponse({
      status: "online",
      service: "The Affluentaccelerators Master Unified Database",
      spreadsheetName: spreadsheet.getName(),
      spreadsheetUrl: spreadsheet.getUrl(),
      totalSheets: sheets.length,
      allSheets: sheetNames,
      totalRegistrationsRecorded: totalRegistrations,
      currentTime: new Date().toISOString()
    });
  } catch (err) {
    return createJsonResponse({
      status: "online_pending_setup",
      service: "The Affluentaccelerators Master Unified Database",
      message: "Ready to initialize. Run 'testUnifiedSetupAndSampleSubmissions' in Apps Script.",
      error: err.toString()
    });
  }
}

// ============================================================================
// EVENT REGISTRATION HANDLER (COLLAPSED INTO SINGLE 'Event Registrations' TAB)
// ============================================================================
function handleEventRegistrationSync(spreadsheet, payload) {
  var data = payload.data || payload.formData || payload;
  
  // Extract and clean Event ID & Title
  var rawEventId = payload.eventId || data.eventId || data["Event ID"] || "EVENT 001";
  var cleanNum = rawEventId.toString().replace(/[^0-9]/g, "");
  if (cleanNum.length === 1) cleanNum = "00" + cleanNum;
  else if (cleanNum.length === 2) cleanNum = "0" + cleanNum;
  var eventId = cleanNum ? "EVENT " + cleanNum : rawEventId;
  
  var eventTitle = payload.eventTitle || data.eventTitle || data["Event Name"] || "The Investable Business Playbook";

  // Registration ID
  var regId = data["Registration ID"] || data["registrationId"] || payload.registrationId || payload.id;
  if (!regId) {
    var randCode = Math.floor(1000 + Math.random() * 9000);
    regId = "REG-" + (cleanNum ? "EVT" + cleanNum : "EVT") + "-" + randCode;
  }

  var dateStr = data["Registration Date"] || payload.timestamp || getFormattedTimestamp();

  // Normalize field aliases
  if (data["Playbook & Event Materials Interest"] && !data["Investable Business Playbook Interest"]) {
    data["Investable Business Playbook Interest"] = data["Playbook & Event Materials Interest"];
  }
  if (data["Question for Guest Speaker / Conversation"] && !data["Question for Guest Speaker"]) {
    data["Question for Guest Speaker"] = data["Question for Guest Speaker / Conversation"];
  }

  // Ensure tabs exist
  ensureOverviewDashboardSheet(spreadsheet);
  var sheet = ensureEventRegistrationsSheet(spreadsheet);

  // Check for existing record to prevent duplicates (Idempotent Sync)
  var existingRow = findRowIndexByFirstMatch(sheet, 3, regId); // Column 3 is Registration ID

  var rowValues = [
    eventId,
    eventTitle,
    regId,
    dateStr,
    data["Full Name"] || data["name"] || "",
    data["Email Address"] || data["email"] || "",
    data["Phone / WhatsApp Number"] || data["whatsapp"] || data["phone"] || "",
    data["Country"] || data["country"] || "Nigeria",
    data["City / State"] || data["city"] || data["location"] || "",
    data["Occupation / Participant Category"] || data["Occupation / Category"] || data["occupation"] || "",
    data["Business Name"] || data["businessName"] || "",
    data["Business Description"] || data["description"] || "",
    data["Industry"] || data["industry"] || "",
    data["Business Age"] || data["age"] || "",
    data["Business Stage"] || data["stage"] || "",
    data["Website / Social Media Link"] || data["website"] || "",
    data["Number of Employees"] || data["teamSize"] || "",
    data["Monthly Revenue Range"] || data["Monthly Revenue"] || data["revenue"] || "",
    data["Business Registration Status"] || data["registered"] || "",
    data["Financial Record-Keeping Status"] || data["accounting"] || "",
    data["Operational Systems Status"] || data["systems"] || "",
    data["Biggest Business Challenges"] || data["Biggest Bottlenecks / Growth Challenges"] || data["challenges"] || data["bottlenecks"] || "",
    data["Business Priorities"] || data["priorities"] || "",
    data["Learning Expectations"] || data["expectations"] || "",
    data["Question for Guest Speaker"] || data["Question for Guest Speaker / Conversation"] || data["question"] || "",
    data["Consulting Interest"] || data["consultingInterest"] || "Yes",
    data["Investable Business Playbook Interest"] || "Yes",
    data["Investment-Readiness Interest"] || data["investmentReadiness"] || "Yes",
    data["Follow-up Interest"] || "Yes",
    data["Marketing Consent"] || "Granted",
    data["Attendance Status"] || "Registered",
    data["Follow-up Status"] || "Pending",
    getFormattedTimestamp()
  ];

  if (existingRow > 0) {
    sheet.getRange(existingRow, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
    applyZebraToLastRow(sheet);
  }

  return {
    status: "success",
    message: "Registration recorded successfully in unified Event Registrations tab",
    registrationId: regId,
    eventId: eventId,
    eventTitle: eventTitle,
    sheetName: TAB_EVENTS,
    isUpdate: (existingRow > 0)
  };
}

// ============================================================================
// GENERAL FORM SUBMISSION HANDLER (AUDITS, INQUIRIES, CANDIDATE CVs)
// ============================================================================
function handleGeneralFormSubmission(spreadsheet, payload) {
  var formData = payload.data || payload.formData || payload;
  var rawType = payload.sheetName || payload.formName || payload.formType || "business-audit";

  var targetTab = TAB_AUDITS;
  if (rawType === "consulting-inquiry" || rawType === TAB_INQUIRIES) {
    targetTab = TAB_INQUIRIES;
  } else if (rawType === "analyst-application" || rawType === TAB_ANALYST) {
    targetTab = TAB_ANALYST;
  } else if (rawType === "internship-application" || rawType === TAB_INTERNSHIP) {
    targetTab = TAB_INTERNSHIP;
  } else if (rawType === "business-audit" || rawType === TAB_AUDITS) {
    targetTab = TAB_AUDITS;
  }

  ensureOverviewDashboardSheet(spreadsheet);

  // File Upload Handling (PDF Resumes / Documents saved to Google Drive)
  var fileObj = payload.file || (formData && formData.file) || null;
  var driveFileUrl = "";
  if (fileObj && fileObj.base64) {
    try {
      var applicantName = formData["name"] || formData["Full Name"] || formData["businessName"] || "Candidate";
      var roleOrCategory = formData["preferredRole"] || formData["occupation"] || targetTab;
      var uploadResult = saveFileToDrive(fileObj, GOOGLE_DRIVE_FOLDER_NAME, applicantName, roleOrCategory);
      driveFileUrl = uploadResult.fileUrl;
    } catch (driveErr) {
      Logger.log("Drive upload error: " + driveErr.toString());
      driveFileUrl = "Upload error: " + driveErr.toString();
    }
  }

  var timeStr = payload.timestamp || getFormattedTimestamp();
  var refId = payload.id || formData["Reference ID"] || ("REF-" + Math.floor(1000 + Math.random() * 9000));
  var sheet = null;
  var rowValues = [];

  if (targetTab === TAB_AUDITS) {
    sheet = ensureBusinessAuditsSheet(spreadsheet);
    rowValues = [
      refId,
      timeStr,
      formData["name"] || formData["Full Name"] || "",
      formData["businessName"] || formData["Business Name"] || "",
      formData["whatsapp"] || formData["WhatsApp Number"] || "",
      formData["email"] || formData["Email Address"] || "",
      formData["industry"] || formData["Industry / Sector"] || "",
      formData["stage"] || formData["Current Business Stage"] || "",
      formData["description"] || formData["Business Description"] || "",
      formData["struggles"] || formData["Biggest Bottleneck"] || "",
      formData["goal"] || formData["90-Day Goal"] || "",
      formData["preferredFormat"] || formData["Preferred Format"] || "Video Audit",
      "New Request",
      ""
    ];
  } else if (targetTab === TAB_INQUIRIES) {
    sheet = ensureConsultingInquiriesSheet(spreadsheet);
    rowValues = [
      refId,
      timeStr,
      formData["name"] || formData["Full Name"] || "",
      formData["businessName"] || formData["Business Name"] || "",
      formData["email"] || formData["Email Address"] || "",
      formData["phone"] || formData["Phone Number"] || "",
      formData["industry"] || formData["Industry"] || "",
      formData["location"] || formData["Location"] || "",
      formData["stage"] || formData["Business Stage"] || "",
      formData["supportType"] || formData["Consulting Support Needed"] || "",
      formData["challenges"] || formData["Key Challenges"] || "",
      formData["description"] || formData["Business Overview"] || "",
      driveFileUrl,
      formData["notes"] || formData["Additional Notes"] || "",
      "New Lead",
      ""
    ];
  } else if (targetTab === TAB_ANALYST) {
    sheet = ensureAnalystApplicationsSheet(spreadsheet);
    rowValues = [
      refId,
      timeStr,
      formData["name"] || formData["Full Name"] || "",
      formData["email"] || formData["Email Address"] || "",
      formData["phone"] || formData["Phone Number"] || "",
      formData["location"] || formData["Location"] || "",
      formData["qualification"] || formData["Highest Qualification"] || "",
      formData["occupation"] || formData["Current Occupation"] || "",
      driveFileUrl,
      formData["motivation"] || formData["Motivation"] || "",
      formData["interests"] || formData["Consulting Interests"] || "",
      formData["goals"] || formData["Career Goals"] || "",
      formData["commitment"] || formData["Time Commitment"] || "",
      formData["investmentReady"] || formData["Tuition Readiness"] || "Yes",
      formData["source"] || formData["Source"] || "",
      "Under Review",
      ""
    ];
  } else if (targetTab === TAB_INTERNSHIP) {
    sheet = ensureInternshipApplicationsSheet(spreadsheet);
    rowValues = [
      refId,
      timeStr,
      formData["name"] || formData["Full Name"] || "",
      formData["email"] || formData["Email Address"] || "",
      formData["phone"] || formData["Phone Number"] || "",
      formData["location"] || formData["Location"] || "",
      formData["education"] || formData["Educational Background"] || "",
      formData["occupation"] || formData["Current Occupation"] || "",
      formData["preferredRole"] || formData["Preferred Role"] || "",
      driveFileUrl,
      formData["portfolio"] || formData["Portfolio Links"] || "",
      formData["skills"] || formData["Key Skills"] || "",
      formData["availability"] || formData["Weekly Availability"] || "",
      formData["experience"] || formData["Relevant Experience"] || "",
      formData["motivation"] || formData["Motivation"] || "",
      formData["learningGoals"] || formData["Learning Goals"] || "",
      "Under Review",
      ""
    ];
  }

  sheet.appendRow(rowValues);
  applyZebraToLastRow(sheet);

  return {
    status: "success",
    message: "Submission saved to " + targetTab,
    referenceId: refId,
    sheetName: targetTab,
    driveFileUrl: driveFileUrl
  };
}

// ============================================================================
// GOOGLE DRIVE PDF STORAGE ENGINE
// ============================================================================
function saveFileToDrive(fileObj, folderName, applicantName, category) {
  var root = DriveApp.getRootFolder();
  var folders = root.getFoldersByName(folderName);
  var targetFolder = folders.hasNext() ? folders.next() : root.createFolder(folderName);

  var decodedBytes = Utilities.base64Decode(fileObj.base64);
  var cleanName = (applicantName || "Applicant").toString().replace(/[^a-zA-Z0-9_\-\s]/g, "").trim().replace(/\s+/g, "_");
  var cleanCat = (category || "Document").toString().replace(/[^a-zA-Z0-9_\-\s]/g, "").trim().replace(/\s+/g, "_");
  var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "GMT+01:00", "yyyyMMdd_HHmmss");
  
  var newFileName = cleanName + "_" + cleanCat + "_" + timestamp + ".pdf";
  var blob = Utilities.newBlob(decodedBytes, "application/pdf", newFileName);
  var savedFile = targetFolder.createFile(blob);
  
  try {
    savedFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (shareErr) {}

  return {
    fileUrl: savedFile.getUrl(),
    fileId: savedFile.getId(),
    fileName: newFileName
  };
}

// ============================================================================
// WORKSHEET BUILDERS & GUARANTORS
// ============================================================================
function ensureEventRegistrationsSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(TAB_EVENTS);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(TAB_EVENTS);
    sheet.appendRow(EVENT_REGISTRATIONS_HEADERS);
    styleExecutiveHeader(sheet, EVENT_REGISTRATIONS_HEADERS.length);
  }
  return sheet;
}

function ensureBusinessAuditsSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(TAB_AUDITS);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(TAB_AUDITS);
    sheet.appendRow(BUSINESS_AUDITS_HEADERS);
    styleExecutiveHeader(sheet, BUSINESS_AUDITS_HEADERS.length);
  }
  return sheet;
}

function ensureConsultingInquiriesSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(TAB_INQUIRIES);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(TAB_INQUIRIES);
    sheet.appendRow(CONSULTING_INQUIRIES_HEADERS);
    styleExecutiveHeader(sheet, CONSULTING_INQUIRIES_HEADERS.length);
  }
  return sheet;
}

function ensureAnalystApplicationsSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(TAB_ANALYST);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(TAB_ANALYST);
    sheet.appendRow(ANALYST_APPLICATIONS_HEADERS);
    styleExecutiveHeader(sheet, ANALYST_APPLICATIONS_HEADERS.length);
  }
  return sheet;
}

function ensureInternshipApplicationsSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(TAB_INTERNSHIP);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(TAB_INTERNSHIP);
    sheet.appendRow(INTERNSHIP_APPLICATIONS_HEADERS);
    styleExecutiveHeader(sheet, INTERNSHIP_APPLICATIONS_HEADERS.length);
  }
  return sheet;
}

/**
 * Builds or refreshes the executive OVERVIEW DASHBOARD
 */
function ensureOverviewDashboardSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(TAB_OVERVIEW);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(TAB_OVERVIEW, 0); // Put dashboard first
  } else {
    // If it already exists and has rows, don't overwrite if not requested
    if (sheet.getLastRow() > 2) return sheet;
  }

  sheet.clear();
  sheet.setTabColor(COLOR_FOREST_DARK);

  // Row 1: Dashboard Title Banner
  sheet.getRange("A1:H1").merge();
  var banner = sheet.getRange("A1");
  banner.setValue("THE AFFLUENTACCELERATORS – MASTER EXECUTIVE DASHBOARD");
  banner.setBackground(COLOR_FOREST_DARK);
  banner.setFontColor(COLOR_GOLD_LIGHT);
  banner.setFontSize(14);
  banner.setFontWeight("bold");
  banner.setHorizontalAlignment("center");
  banner.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 45);

  // Row 2: Subtitle
  sheet.getRange("A2:H2").merge();
  var sub = sheet.getRange("A2");
  sub.setValue("Real-time telemetry across all Event Registrations, Consulting Inquiries, Business Audits & Career Applications");
  sub.setBackground(COLOR_FOREST_MED);
  sub.setFontColor("#ffffff");
  sub.setFontSize(9);
  sub.setHorizontalAlignment("center");
  sheet.setRowHeight(2, 24);

  // KPI Cards in Rows 4-6
  var kpis = [
    { label: "TOTAL EVENT REGISTRANTS", formula: "=COUNTA('" + TAB_EVENTS + "'!C2:C)", col: "A" },
    { label: "BUSINESS AUDIT REQUESTS", formula: "=COUNTA('" + TAB_AUDITS + "'!A2:A)", col: "C" },
    { label: "CONSULTING INQUIRIES",    formula: "=COUNTA('" + TAB_INQUIRIES + "'!A2:A)", col: "E" },
    { label: "CAREER CANDIDATES (CVs)", formula: "=COUNTA('" + TAB_ANALYST + "'!A2:A) + COUNTA('" + TAB_INTERNSHIP + "'!A2:A)", col: "G" }
  ];

  for (var k = 0; k < kpis.length; k++) {
    var c = kpis[k].col;
    var cNext = String.fromCharCode(c.charCodeAt(0) + 1);
    
    sheet.getRange(c + "4:" + cNext + "4").merge().setValue(kpis[k].label)
      .setBackground(COLOR_FOREST_DARK).setFontColor(COLOR_GOLD_LIGHT).setFontWeight("bold").setFontSize(8).setHorizontalAlignment("center");
    
    sheet.getRange(c + "5:" + cNext + "6").merge().setFormula(kpis[k].formula)
      .setBackground(COLOR_CARD_BG).setFontColor(COLOR_FOREST_DARK).setFontWeight("bold").setFontSize(22).setHorizontalAlignment("center").setVerticalAlignment("middle");
  }

  // Row 8: Event Registration Breakdown Header
  sheet.getRange("A8:H8").merge();
  var brk = sheet.getRange("A8");
  brk.setValue("UNIFIED DATABASE TABS SUMMARY & RECURRING BOTTLENECK ANALYSIS");
  brk.setBackground(COLOR_FOREST_MED);
  brk.setFontColor(COLOR_GOLD_LIGHT);
  brk.setFontWeight("bold");
  brk.setFontSize(10);
  brk.setHorizontalAlignment("left");
  sheet.setRowHeight(8, 28);

  var summaryHeaders = ["Database Stream / Tab", "Target Purpose", "Primary Focus Field", "Current Records"];
  for (var h = 0; h < summaryHeaders.length; h++) {
    sheet.getRange(9, (h * 2) + 1, 1, 2).merge().setValue(summaryHeaders[h])
      .setBackground(COLOR_FOREST_DARK).setFontColor("#ffffff").setFontWeight("bold").setFontSize(9);
  }

  var summaryRows = [
    [TAB_EVENTS, "Webinars & Masterclasses", "Biggest Bottlenecks & Recurring Requests", "=COUNTA('" + TAB_EVENTS + "'!C2:C)"],
    [TAB_AUDITS, "24h Custom Video/Voice Audits", "Current Bottleneck & 90-Day Priority", "=COUNTA('" + TAB_AUDITS + "'!A2:A)"],
    [TAB_INQUIRIES, "Strategic Advisory & Consulting", "Consulting Support & Challenges", "=COUNTA('" + TAB_INQUIRIES + "'!A2:A)"],
    [TAB_ANALYST, "90-Day Analyst Flagship", "Consulting Interests & Drive PDF CV", "=COUNTA('" + TAB_ANALYST + "'!A2:A)"],
    [TAB_INTERNSHIP, "Fellowship & Internships (7 Roles)", "Preferred Role & Drive PDF CV", "=COUNTA('" + TAB_INTERNSHIP + "'!A2:A)"]
  ];

  for (var r = 0; r < summaryRows.length; r++) {
    var rowIdx = 10 + r;
    var rowBg = (r % 2 === 0) ? "#ffffff" : COLOR_ZEBRA_ROW;
    sheet.getRange(rowIdx, 1, 1, 2).merge().setValue(summaryRows[r][0]).setFontWeight("bold").setFontColor(COLOR_FOREST_DARK).setBackground(rowBg);
    sheet.getRange(rowIdx, 3, 1, 2).merge().setValue(summaryRows[r][1]).setFontColor("#475569").setBackground(rowBg);
    sheet.getRange(rowIdx, 5, 1, 2).merge().setValue(summaryRows[r][2]).setFontColor("#0f172a").setBackground(rowBg);
    sheet.getRange(rowIdx, 7, 1, 2).merge().setFormula(summaryRows[r][3]).setFontWeight("bold").setFontColor(COLOR_FOREST_DARK).setHorizontalAlignment("center").setBackground(rowBg);
    sheet.setRowHeight(rowIdx, 24);
  }

  // Freeze top rows
  sheet.setFrozenRows(2);

  return sheet;
}

// ============================================================================
// STYLING & UTILITY FUNCTIONS
// ============================================================================
function styleExecutiveHeader(sheet, numColumns) {
  var headerRange = sheet.getRange(1, 1, 1, numColumns);
  headerRange.setBackground(COLOR_FOREST_DARK);
  headerRange.setFontColor(COLOR_GOLD_LIGHT);
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  headerRange.setFontFamily("Plus Jakarta Sans");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  headerRange.setWrap(true);
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  try {
    for (var col = 1; col <= numColumns; col++) {
      sheet.autoResizeColumn(col);
      if (sheet.getColumnWidth(col) < 130) sheet.setColumnWidth(col, 130);
      if (sheet.getColumnWidth(col) > 350) sheet.setColumnWidth(col, 350);
    }
  } catch (resizeErr) {}
}

function applyZebraToLastRow(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;
  var cols = sheet.getLastColumn();
  var rowBg = (lastRow % 2 === 0) ? "#ffffff" : COLOR_ZEBRA_ROW;
  sheet.getRange(lastRow, 1, 1, cols).setBackground(rowBg).setFontFamily("Plus Jakarta Sans").setFontSize(9.5);
}

function findRowIndexByFirstMatch(sheet, columnIndex, matchValue) {
  if (!matchValue) return -1;
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return -1;

  var rangeValues = sheet.getRange(2, columnIndex, lastRow - 1, 1).getValues();
  for (var i = 0; i < rangeValues.length; i++) {
    if (rangeValues[i][0] && rangeValues[i][0].toString().trim() === matchValue.toString().trim()) {
      return i + 2; // +2 offset for 1-based index and header row
    }
  }
  return -1;
}

function getMasterSpreadsheet() {
  var spreadsheet = null;
  try {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {}

  if (!spreadsheet) {
    var files = DriveApp.getFilesByName(MASTER_SPREADSHEET_NAME);
    if (files.hasNext()) {
      spreadsheet = SpreadsheetApp.openById(files.next().getId());
    } else {
      spreadsheet = SpreadsheetApp.create(MASTER_SPREADSHEET_NAME);
    }
  }

  if (spreadsheet.getName() !== MASTER_SPREADSHEET_NAME && spreadsheet.getName() === "Untitled spreadsheet") {
    try {
      spreadsheet.rename(MASTER_SPREADSHEET_NAME);
    } catch (renameErr) {}
  }

  return spreadsheet;
}

function getFormattedTimestamp() {
  try {
    var tz = (typeof Session !== "undefined" && Session.getScriptTimeZone) ? Session.getScriptTimeZone() : "Africa/Lagos";
    return Utilities.formatDate(new Date(), tz, "yyyy-MM-dd HH:mm:ss");
  } catch (e) {
    return new Date().toISOString().replace('T', ' ').substring(0, 19);
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// SELF-TEST RUNNER (TESTS ALL 6 TABS & DRIVE STORAGE IN 1 CLICK)
// ============================================================================
function testUnifiedSetupAndSampleSubmissions() {
  Logger.log("Starting Master Unified Database setup and verification...");

  var spreadsheet = getMasterSpreadsheet();
  Logger.log("Active Spreadsheet: " + spreadsheet.getName() + " (" + spreadsheet.getUrl() + ")");

  // 1. Build Overview Dashboard
  var dash = ensureOverviewDashboardSheet(spreadsheet);
  Logger.log("OVERVIEW DASHBOARD configured.");

  // 2. Build and Test Event Registrations Tab (Single Unified Tab)
  var sampleEventPayload = {
    action: "register_event",
    eventId: "EVENT 001",
    eventTitle: "The Investable Business Playbook",
    registrationId: "REG-EVT001-TEST",
    data: {
      "Full Name": "Adebayo Adeleke",
      "Email Address": "adebayo.sample@africagrowth.com",
      "Phone / WhatsApp Number": "+234 803 123 4567",
      "Country": "Nigeria",
      "City / State": "Lagos",
      "Occupation / Participant Category": "Founder / Managing Director",
      "Business Name": "Kora Logistics & Cold Chain Ltd",
      "Business Description": "End-to-end temperature-controlled logistics for pharmaceutical and FMCG distributors across West Africa.",
      "Industry": "Logistics, Supply Chain, Freight & Transport",
      "Business Age": "3–5 Years",
      "Business Stage": "Scaling SME ($100k - $1M/yr)",
      "Monthly Revenue Range": "$20,000 – $50,000 / month",
      "Biggest Business Challenges": "Recurring Bottleneck: Client payment delays causing working capital squeeze, lack of middle-management operational SOPs.",
      "Question for Guest Speaker": "How do we structure vendor receivables financing before pitching equity investors?",
      "Consulting Interest": "Yes - Interested in Fractional COO & Financial Advisory",
      "Investment-Readiness Interest": "Yes - Preparing for Series Seed round"
    }
  };
  var eventResult = handleEventRegistrationSync(spreadsheet, sampleEventPayload);
  Logger.log("Event Registrations Tab Test Result: " + JSON.stringify(eventResult));

  // 3. Build and Test Business Audits Tab
  var sampleAuditPayload = {
    formType: "business-audit",
    id: "AUDIT-TEST-001",
    data: {
      name: "Chidinma Nwosu",
      businessName: "Luxe Flora Skincare",
      whatsapp: "+234 812 987 6543",
      email: "chidinma@luxeflora.ng",
      industry: "Beauty, Hairdressing & Makeup (Salons, Spas, MUAs, Barbers)",
      stage: "Early-Stage Generating First Sales",
      description: "Direct-to-consumer organic skincare formulated for African skin tones.",
      struggles: "Bottleneck: Customer acquisition costs on Instagram ads keep rising, low repeat purchase rate.",
      goal: "Achieve ₦5,000,000 monthly recurring revenue within 90 days.",
      preferredFormat: "Video Audit"
    }
  };
  var auditResult = handleGeneralFormSubmission(spreadsheet, sampleAuditPayload);
  Logger.log("Business Audits Tab Test Result: " + JSON.stringify(auditResult));

  // 4. Build and Test Consulting Inquiries Tab
  var sampleInquiryPayload = {
    formType: "consulting-inquiry",
    id: "INQ-TEST-001",
    data: {
      name: "Tunde Bakare",
      businessName: "AgroPulse Technologies",
      email: "tunde@agropulse.io",
      phone: "+234 809 555 4321",
      industry: "Agriculture & Agribusiness",
      location: "Abuja, Nigeria",
      stage: "Consistent Revenue ($10k - $100k/yr)",
      supportType: "Commercial Strategy & Operational Structuring",
      challenges: "Bottleneck: Scaling from 1 state to 5 states requires standardized field ops SOPs and distributor agreements.",
      description: "Digital outgrower network connecting smallholders to industrial grain millers.",
      notes: "Looking to engage Affluentaccelerators for a 90-day advisory sprint."
    }
  };
  var inqResult = handleGeneralFormSubmission(spreadsheet, sampleInquiryPayload);
  Logger.log("Consulting Inquiries Tab Test Result: " + JSON.stringify(inqResult));

  // 5. Build and Test Analyst Applications Tab
  var sampleAnalystPayload = {
    formType: "analyst-application",
    id: "ANALYST-TEST-001",
    data: {
      name: "Emeka Okonkwo",
      email: "emeka.okonkwo@gmail.com",
      phone: "+234 902 111 2233",
      location: "Lagos, Nigeria",
      qualification: "B.Sc Economics (First Class Honours)",
      occupation: "Junior Financial Analyst",
      motivation: "Want to transition into high-impact management consulting and master commercial due diligence.",
      interests: "Financial Modeling, Business Valuation, Corporate Strategy",
      goals: "Lead client engagements with mid-sized Nigerian manufacturing companies.",
      commitment: "Full-Time (20+ Hours/Week)",
      investmentReady: "Yes",
      source: "LinkedIn"
    }
  };
  var analystResult = handleGeneralFormSubmission(spreadsheet, sampleAnalystPayload);
  Logger.log("Analyst Applications Tab Test Result: " + JSON.stringify(analystResult));

  // 6. Build and Test Internship Applications Tab (with Mock PDF Drive Upload)
  var sampleInternPayload = {
    formType: "internship-application",
    id: "INTERN-TEST-001",
    data: {
      name: "Folashade Alabi",
      email: "folashade.alabi@university.edu.ng",
      phone: "+234 814 333 4455",
      location: "Ibadan, Nigeria",
      education: "Final Year Student, Business Administration",
      occupation: "Undergraduate Student",
      preferredRole: "Business Development Intern",
      portfolio: "https://linkedin.com/in/folashade-alabi-sample",
      skills: "B2B Outreach, Financial Research, Pitch Deck Design",
      availability: "Full-Time / 30 Hours/Week",
      experience: "Organized founder pitch days and student consultancy projects.",
      motivation: "To learn practical business building directly alongside executive mentors.",
      learningGoals: "Master client acquisition funnels and strategic partnerships."
    },
    file: {
      base64: Utilities.base64Encode("SAMPLE PDF CV CONTENT FOR VERIFICATION - THE AFFLUENTACCELERATORS"),
      fileName: "Folashade_Alabi_CV.pdf"
    }
  };
  var internResult = handleGeneralFormSubmission(spreadsheet, sampleInternPayload);
  Logger.log("Internship Applications Tab Test Result: " + JSON.stringify(internResult));

  // Remove default "Sheet1" if empty
  var defaultSheet = spreadsheet.getSheetByName("Sheet1");
  if (defaultSheet && defaultSheet.getLastRow() === 0 && spreadsheet.getSheets().length > 1) {
    try { spreadsheet.deleteSheet(defaultSheet); } catch (e) {}
  }

  Logger.log("=================================================================");
  Logger.log("SUCCESS! All 6 worksheets configured and tested with sample data.");
  Logger.log("Master Spreadsheet URL: " + spreadsheet.getUrl());
  Logger.log("=================================================================");

  return "All 6 tabs configured and tested successfully! Spreadsheet URL: " + spreadsheet.getUrl();
}
