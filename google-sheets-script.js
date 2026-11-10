/**
 * ============================================================================
 * THE AFFLUENTACCELERATORS – CENTRAL EVENT REGISTRATION DATABASE
 * & MULTI-FORM GOOGLE APPS SCRIPT AUTOMATION
 * ============================================================================
 * 
 * SPREADSHEET NAME:
 * THE AFFLUENTACCELERATORS – EVENTS & REGISTRATION DATABASE
 * 
 * CORE ARCHITECTURE:
 * 1. ONE MASTER SPREADSHEET for all event registrations and website leads.
 * 2. OVERVIEW DASHBOARD: Executive KPI metrics, real-time formula summaries,
 *    registrations per event, industry distribution, stage, consulting interest,
 *    and investment-readiness tracking.
 * 3. ALL REGISTRATIONS: Central consolidated master sheet storing every participant
 *    across all events with standardized columns.
 * 4. DEDICATED EVENT WORKSHEETS: Automatically generated tabs per event
 *    (e.g., "EVENT 001 – The Investable Business Playbook", "EVENT 002 – ...")
 *    containing all 31+ comprehensive form diagnostic fields.
 * 5. AUTOMATIC EVENT TAB CREATION: Dynamically verifies existing tabs, reuses them
 *    without duplication, or creates a new formatted worksheet when a new event
 *    is published.
 * 6. IDEMPOTENT SYNC & DEDUPLICATION: Prevents duplicate rows when submissions
 *    are retried or re-synced using unique Registration IDs.
 * 7. MULTI-FORM & GOOGLE DRIVE SUPPORT: Retains full backward compatibility for
 *    Hiring/Internship/Analyst applications, Consulting Inquiries, Business Audits,
 *    and automated PDF resume uploads to Google Drive.
 * 
 * QUICK SETUP INSTRUCTIONS (3 MINUTES):
 * 1. Go to https://sheets.new to create a new spreadsheet (or open your existing one).
 * 2. Rename the spreadsheet to:
 *    THE AFFLUENTACCELERATORS – EVENTS & REGISTRATION DATABASE
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Select all code in Code.gs, delete it, and paste this entire script.
 * 5. Click the Save icon (diskette).
 * 6. In the toolbar at the top (next to "Debug"), choose "testSetupAndSampleRegistration"
 *    from the dropdown and click "Run".
 *    Grant Google permissions when prompted (Review permissions > Advanced > Go to project > Allow).
 *    Check your spreadsheet: The "OVERVIEW DASHBOARD", "ALL REGISTRATIONS", and
 *    "EVENT 001 – The Investable Business Playbook" tabs are built immediately!
 * 7. Click the blue Deploy button (top-right) > New deployment.
 *    - Click the Gear icon > Web app
 *    - Description: "The Affluentaccelerators Central Event & Leads Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 8. Click Deploy, copy the Web App URL, and paste it into the Admin Portal on the website!
 * ============================================================================
 */

// MASTER SPREADSHEET TITLE
var MASTER_SPREADSHEET_NAME = "THE AFFLUENTACCELERATORS – EVENTS & REGISTRATION DATABASE";

// GOOGLE DRIVE RESUME/DOCUMENT STORAGE FOLDER
var GOOGLE_DRIVE_FOLDER_NAME = "The Affluentaccelerators: Hiring";

// BRAND EXECUTIVE COLOR PALETTE
var COLOR_FOREST_DARK = "#06261b";    // Deep Forest Green
var COLOR_FOREST_MED  = "#0a3828";    // Emerald Green Accent
var COLOR_GOLD_LIGHT  = "#f3c74d";    // Warm Gold Text/Borders
var COLOR_GOLD_BG     = "#fffdf5";    // Soft Gold Highlight
var COLOR_CARD_BG     = "#f0fdf4";    // Soft Mint KPI Card Background
var COLOR_ZEBRA_ROW   = "#f8faf8";    // Subtle alternating row tint
var COLOR_HEADER_FONT = "#ffffff";

/**
 * Standardized Common Headers for ALL REGISTRATIONS master worksheet
 */
var ALL_REGISTRATIONS_HEADERS = [
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
  "Industry",
  "Business Stage",
  "Monthly Revenue",
  "Consulting Interest",
  "Investment-Readiness Interest",
  "Attendance Status",
  "Follow-up Status",
  "Target Sheet Tab",
  "Sync Timestamp"
];

/**
 * Full 31-Field Diagnostic Headers for Inaugural Event (Event 001)
 */
var EVENT_001_FULL_HEADERS = [
  "Registration ID",
  "Registration Date",
  "Full Name",
  "Email Address",
  "Phone / WhatsApp Number",
  "Country",
  "City / State",
  "Occupation / Participant Category",
  "Business Name",
  "Business Description",
  "Industry",
  "Business Age",
  "Business Stage",
  "Website / Social Media Link",
  "Number of Employees",
  "Revenue Status",
  "Monthly Revenue Range",
  "Business Registration Status",
  "Financial Record-Keeping Status",
  "Operational Systems Status",
  "Biggest Business Challenges",
  "Business Priorities",
  "Learning Expectations",
  "Question for Guest Speaker",
  "Consulting Interest",
  "Investable Business Playbook Interest",
  "Investment-Readiness Interest",
  "Follow-up Interest",
  "Marketing Consent",
  "Communication Preferences",
  "Attendance Status",
  "Follow-up Status",
  "Submission Timestamp"
];

// ============================================================================
// MAIN POST ROUTER (RECEIVES WEBSITE SUBMISSIONS & ADMIN REQUESTS)
// ============================================================================
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // Wait up to 30s to prevent concurrent write collisions
  } catch (lockError) {
    return createJsonResponse({
      status: "error",
      message: "Server busy, could not acquire script lock. Please try again."
    });
  }

  try {
    // Parse incoming payload
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

    // Route based on action
    var action = payload.action || "";

    // 1. Action: Test Connection / Ping from Admin Dashboard
    if (action === "test_connection" || action === "ping") {
      var sheetNames = [];
      var sheets = spreadsheet.getSheets();
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
        timestamp: new Date().toISOString()
      });
    }

    // 2. Action: Create or Verify Event Tab from Admin Dashboard
    if (action === "create_event_tab") {
      var eventId = payload.eventId || "EVENT-NEW";
      var eventTitle = payload.eventTitle || "Upcoming Masterclass";
      var customFields = payload.customFields || [];
      var eventSheetInfo = getOrCreateEventWorksheet(spreadsheet, eventId, eventTitle, customFields);
      
      return createJsonResponse({
        status: "success",
        message: "Worksheet ready for event",
        eventId: eventId,
        sheetName: eventSheetInfo.sheetName,
        sheetId: eventSheetInfo.sheetId,
        alreadyExisted: eventSheetInfo.alreadyExisted,
        spreadsheetUrl: spreadsheet.getUrl()
      });
    }

    // 3. Action: Event Registration Sync (Central Database Sync)
    var isEventRegistration = (action === "register_event") || 
                              (payload.formType === "event-registration") || 
                              (payload.eventId !== undefined);

    if (isEventRegistration) {
      var syncResult = handleEventRegistrationSync(spreadsheet, payload);
      return createJsonResponse(syncResult);
    }

    // 4. Action: Reconcile Batch of Registrations
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

    // 5. Fallback: Legacy Website Forms (Internship, Analyst, Consulting, Audit)
    var legacyResult = handleLegacyFormSubmission(spreadsheet, payload);
    return createJsonResponse(legacyResult);

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
    var eventTabs = [];
    for (var i = 0; i < sheets.length; i++) {
      var name = sheets[i].getName();
      sheetNames.push(name);
      if (name.toUpperCase().indexOf("EVENT") !== -1) {
        eventTabs.push(name);
      }
    }

    var allRegSheet = spreadsheet.getSheetByName("ALL REGISTRATIONS");
    var totalRegistrations = allRegSheet ? Math.max(0, allRegSheet.getLastRow() - 1) : 0;

    return createJsonResponse({
      status: "online",
      service: "The Affluentaccelerators Central Event Registration & Leads Hub",
      spreadsheetName: spreadsheet.getName(),
      spreadsheetUrl: spreadsheet.getUrl(),
      totalSheets: sheets.length,
      eventWorksheetsCount: eventTabs.length,
      eventWorksheets: eventTabs,
      totalRegistrationsRecorded: totalRegistrations,
      allSheets: sheetNames,
      currentTime: new Date().toISOString()
    });
  } catch (err) {
    return createJsonResponse({
      status: "online_pending_setup",
      service: "The Affluentaccelerators Central Event Hub",
      message: "Ready to initialize. Run 'testSetupAndSampleRegistration' in Apps Script to build sheets.",
      error: err.toString()
    });
  }
}

// ============================================================================
// CORE: MASTER SPREADSHEET LOCATOR OR CREATOR
// ============================================================================
function getMasterSpreadsheet() {
  var spreadsheet = null;
  try {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {}

  if (!spreadsheet) {
    // Try finding by name in user drive
    var files = DriveApp.getFilesByName(MASTER_SPREADSHEET_NAME);
    if (files.hasNext()) {
      var file = files.next();
      spreadsheet = SpreadsheetApp.openById(file.getId());
    } else {
      spreadsheet = SpreadsheetApp.create(MASTER_SPREADSHEET_NAME);
    }
  }

  // Ensure title matches standard
  if (spreadsheet.getName() !== MASTER_SPREADSHEET_NAME && spreadsheet.getName() === "Untitled spreadsheet") {
    try {
      spreadsheet.rename(MASTER_SPREADSHEET_NAME);
    } catch (renameErr) {}
  }

  return spreadsheet;
}

// ============================================================================
// CORE: EVENT REGISTRATION SYNCHRONIZATION ENGINE
// ============================================================================
function handleEventRegistrationSync(spreadsheet, payload) {
  var data = payload.data || payload.formData || payload;
  var eventId = payload.eventId || data.eventId || "EVENT-001";
  var eventTitle = payload.eventTitle || data.eventTitle || "The Investable Business Playbook";

  // Normalize Event ID string (e.g. "EVENT 001", "001", "EVENT-001")
  var cleanEventNum = eventId.toString().replace(/[^0-9]/g, "");
  if (cleanEventNum.length === 1) cleanEventNum = "00" + cleanEventNum;
  else if (cleanEventNum.length === 2) cleanEventNum = "0" + cleanEventNum;
  var formattedEventLabel = cleanEventNum ? "EVENT " + cleanEventNum : eventId;

  // Generate or sanitize unique Registration ID
  var regId = data["Registration ID"] || data["registrationId"] || payload.registrationId || payload.id;
  if (!regId) {
    var randCode = Math.floor(1000 + Math.random() * 9000);
    regId = "REG-" + (cleanEventNum ? "EVT" + cleanEventNum : "EVT") + "-" + randCode;
  }

  // Determine submission date string
  var dateStr = data["Registration Date"] || payload.timestamp || getFormattedTimestamp();

  // 1. Ensure master tabs exist
  ensureOverviewDashboardSheet(spreadsheet);
  var allRegSheet = ensureAllRegistrationsSheet(spreadsheet);

  // 2. Ensure / locate event-specific worksheet
  var eventSheetInfo = getOrCreateEventWorksheet(spreadsheet, eventId, eventTitle, Object.keys(data));
  var eventSheet = eventSheetInfo.sheet;
  var eventTabName = eventSheetInfo.sheetName;

  // 3. Assemble data for the dedicated Event Worksheet
  var eventHeaders = getSheetHeaders(eventSheet);
  var eventRowData = mapDataToHeaders(data, eventHeaders, {
    "Registration ID": regId,
    "Registration Date": dateStr,
    "Submission Timestamp": getFormattedTimestamp(),
    "Attendance Status": data["Attendance Status"] || "Confirmed Registered",
    "Follow-up Status": data["Follow-up Status"] || "Pending Review"
  });

  // Deduplication check in Event Sheet (by Registration ID in col 1)
  var eventRowIdx = findRowByRegistrationId(eventSheet, regId);
  var eventActionTaken = "inserted";
  if (eventRowIdx > 1) {
    // Update existing row
    eventSheet.getRange(eventRowIdx, 1, 1, eventRowData.length).setValues([eventRowData]);
    eventActionTaken = "updated";
  } else {
    // Append new row
    eventSheet.appendRow(eventRowData);
    eventRowIdx = eventSheet.getLastRow();
    styleDataRow(eventSheet, eventRowIdx, eventHeaders.length);
  }

  // 4. Assemble data for ALL REGISTRATIONS master worksheet
  var allRegHeaders = getSheetHeaders(allRegSheet);
  var allRegData = [
    formattedEventLabel,
    eventTitle,
    regId,
    dateStr,
    data["Full Name"] || data["name"] || data["fullName"] || "",
    data["Email Address"] || data["email"] || "",
    data["Phone / WhatsApp Number"] || data["whatsapp"] || data["phone"] || "",
    data["Country"] || data["country"] || "Nigeria",
    data["City / State"] || data["city"] || data["location"] || "",
    data["Occupation / Participant Category"] || data["occupation"] || "",
    data["Business Name"] || data["businessName"] || "",
    data["Industry"] || data["industry"] || "",
    data["Business Stage"] || data["stage"] || "",
    data["Monthly Revenue Range"] || data["Monthly Revenue"] || data["monthlyRevenue"] || "",
    data["Consulting Interest"] || data["consultingInterest"] || "No",
    data["Investment-Readiness Interest"] || data["investmentReadiness"] || "No",
    data["Attendance Status"] || "Confirmed Registered",
    data["Follow-up Status"] || "Pending Review",
    eventTabName,
    getFormattedTimestamp()
  ];

  // Deduplication check in ALL REGISTRATIONS (Registration ID is column 3)
  var allRegRowIdx = findRowByRegistrationId(allRegSheet, regId, 3);
  var allRegActionTaken = "inserted";
  if (allRegRowIdx > 1) {
    allRegSheet.getRange(allRegRowIdx, 1, 1, allRegData.length).setValues([allRegData]);
    allRegActionTaken = "updated";
  } else {
    allRegSheet.appendRow(allRegData);
    allRegRowIdx = allRegSheet.getLastRow();
    styleDataRow(allRegSheet, allRegRowIdx, allRegHeaders.length);
  }

  // 5. Trigger Overview Dashboard formulas refresh
  refreshOverviewDashboard(spreadsheet);

  return {
    status: "success",
    message: "Registration successfully recorded in central database",
    registrationId: regId,
    eventId: formattedEventLabel,
    eventTitle: eventTitle,
    eventWorksheet: eventTabName,
    eventRow: eventRowIdx,
    eventAction: eventActionTaken,
    allRegistrationsRow: allRegRowIdx,
    allRegistrationsAction: allRegActionTaken,
    spreadsheetUrl: spreadsheet.getUrl()
  };
}

// ============================================================================
// EVENT WORKSHEET DYNAMIC CREATION & RESOLUTION
// ============================================================================
function getOrCreateEventWorksheet(spreadsheet, eventId, eventTitle, customFields) {
  var cleanEventNum = eventId.toString().replace(/[^0-9]/g, "");
  if (cleanEventNum.length === 1) cleanEventNum = "00" + cleanEventNum;
  else if (cleanEventNum.length === 2) cleanEventNum = "0" + cleanEventNum;

  var shortTitle = (eventTitle || "Special Event").replace(/[\\/:?*\[\]]/g, "").trim();
  if (shortTitle.length > 40) shortTitle = shortTitle.substring(0, 37) + "...";

  var standardTabName = (cleanEventNum ? "EVENT " + cleanEventNum : eventId) + " – " + shortTitle;

  // Search existing sheets: check exact name or ID prefix match
  var sheets = spreadsheet.getSheets();
  var matchedSheet = null;
  var matchedName = "";

  for (var i = 0; i < sheets.length; i++) {
    var curName = sheets[i].getName();
    if (curName === standardTabName) {
      matchedSheet = sheets[i];
      matchedName = curName;
      break;
    }
    // Check if starts with EVENT XXX prefix
    if (cleanEventNum && curName.toUpperCase().indexOf("EVENT " + cleanEventNum) === 0) {
      matchedSheet = sheets[i];
      matchedName = curName;
      break;
    }
  }

  if (matchedSheet) {
    return {
      sheet: matchedSheet,
      sheetName: matchedName,
      sheetId: matchedSheet.getSheetId(),
      alreadyExisted: true
    };
  }

  // Does not exist: create brand new worksheet
  var newSheet = spreadsheet.insertSheet(standardTabName);

  // Determine headers
  var headers = EVENT_001_FULL_HEADERS.slice();
  if (customFields && customFields.length > 0) {
    for (var f = 0; f < customFields.length; f++) {
      var fieldName = customFields[f];
      if (headers.indexOf(fieldName) === -1 && fieldName !== "eventId" && fieldName !== "eventTitle") {
        headers.push(fieldName);
      }
    }
  }

  // Set and format headers
  var headerRange = newSheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground(COLOR_FOREST_DARK);
  headerRange.setFontColor(COLOR_GOLD_LIGHT);
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Arial");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  newSheet.setRowHeight(1, 38);
  newSheet.setFrozenRows(1);

  // Auto resize
  for (var c = 1; c <= headers.length; c++) {
    newSheet.setColumnWidth(c, 160);
  }

  return {
    sheet: newSheet,
    sheetName: standardTabName,
    sheetId: newSheet.getSheetId(),
    alreadyExisted: false
  };
}

// ============================================================================
// ALL REGISTRATIONS MASTER WORKSHEET
// ============================================================================
function ensureAllRegistrationsSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName("ALL REGISTRATIONS");
  if (!sheet) {
    sheet = spreadsheet.insertSheet("ALL REGISTRATIONS", 1);
  }

  if (sheet.getLastRow() === 0) {
    var headerRange = sheet.getRange(1, 1, 1, ALL_REGISTRATIONS_HEADERS.length);
    headerRange.setValues([ALL_REGISTRATIONS_HEADERS]);
    headerRange.setBackground(COLOR_FOREST_DARK);
    headerRange.setFontColor(COLOR_GOLD_LIGHT);
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 40);
    sheet.setFrozenRows(1);

    // Initial column widths
    var colWidths = [100, 220, 140, 130, 180, 200, 150, 110, 120, 160, 180, 140, 130, 140, 130, 160, 140, 140, 220, 140];
    for (var i = 0; i < colWidths.length; i++) {
      sheet.setColumnWidth(i + 1, colWidths[i] || 140);
    }
  }

  return sheet;
}

// ============================================================================
// OVERVIEW DASHBOARD BUILDER & FORMULA REFRESHER
// ============================================================================
function ensureOverviewDashboardSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName("OVERVIEW DASHBOARD");
  if (!sheet) {
    sheet = spreadsheet.insertSheet("OVERVIEW DASHBOARD", 0);
    buildOverviewDashboardLayout(sheet, spreadsheet);
  }
  return sheet;
}

function buildOverviewDashboardLayout(sheet, spreadsheet) {
  sheet.clear();
  sheet.setGridlines(true);

  // Title Banner
  sheet.getRange("A1:H2").merge();
  var titleCell = sheet.getRange("A1");
  titleCell.setValue("THE AFFLUENTACCELERATORS – CENTRAL EVENT INTELLIGENCE DASHBOARD");
  titleCell.setBackground(COLOR_FOREST_DARK);
  titleCell.setFontColor(COLOR_GOLD_LIGHT);
  titleCell.setFontSize(14);
  titleCell.setFontWeight("bold");
  titleCell.setFontFamily("Arial");
  titleCell.setHorizontalAlignment("center");
  titleCell.setVerticalAlignment("middle");

  sheet.getRange("A3:H3").merge();
  var subCell = sheet.getRange("A3");
  subCell.setValue("Real-time telemetry across all webinars, masterclasses, and executive registrations. Data updates automatically upon submission.");
  subCell.setBackground("#0a3828");
  subCell.setFontColor("#e2e8f0");
  subCell.setFontSize(9);
  subCell.setFontStyle("italic");
  subCell.setHorizontalAlignment("center");
  subCell.setVerticalAlignment("middle");

  // KPI CARDS ROW (Rows 5-7)
  // Card 1: Total Registrations
  buildKpiCard(sheet, "A5:B7", "TOTAL REGISTRATIONS", "=COUNTA('ALL REGISTRATIONS'!C2:C)");
  // Card 2: Total Events
  buildKpiCard(sheet, "C5:D7", "TOTAL ACTIVE EVENTS", "=COUNTA(UNIQUE('ALL REGISTRATIONS'!A2:A))");
  // Card 3: Consulting Interest
  buildKpiCard(sheet, "E5:F7", "CONSULTING INQUIRIES", '=COUNTIF(\'ALL REGISTRATIONS\'!O2:O, "*Yes*")');
  // Card 4: Investment-Readiness Interest
  buildKpiCard(sheet, "G5:H7", "INVESTMENT READINESS", '=COUNTIF(\'ALL REGISTRATIONS\'!P2:P, "*Yes*")');

  // SECTION: REGISTRATIONS PER EVENT (Rows 9+)
  sheet.getRange("A9:H9").merge();
  var section1 = sheet.getRange("A9");
  section1.setValue("EVENT PERFORMANCE BREAKDOWN");
  section1.setBackground(COLOR_FOREST_DARK);
  section1.setFontColor(COLOR_GOLD_LIGHT);
  section1.setFontWeight("bold");
  section1.setFontSize(11);
  section1.setVerticalAlignment("middle");

  var table1Headers = ["Event ID", "Event Name", "Worksheet Tab", "Total Registrations", "Attended", "Consulting Leads", "Playbook Leads", "% of Total"];
  sheet.getRange("A10:H10").setValues([table1Headers]);
  sheet.getRange("A10:H10").setBackground(COLOR_FOREST_MED);
  sheet.getRange("A10:H10").setFontColor("#ffffff");
  sheet.getRange("A10:H10").setFontWeight("bold");
  sheet.getRange("A10:H10").setHorizontalAlignment("center");

  // Pre-seed Event 001 row
  sheet.getRange("A11").setValue("EVENT 001");
  sheet.getRange("B11").setValue("The Investable Business Playbook");
  sheet.getRange("C11").setValue("EVENT 001 – The Investable Business Playbook");
  sheet.getRange("D11").setFormula('=COUNTIF(\'ALL REGISTRATIONS\'!A2:A, "EVENT 001")');
  sheet.getRange("E11").setFormula('=COUNTIFS(\'ALL REGISTRATIONS\'!A2:A, "EVENT 001", \'ALL REGISTRATIONS\'!Q2:Q, "*Attended*")');
  sheet.getRange("F11").setFormula('=COUNTIFS(\'ALL REGISTRATIONS\'!A2:A, "EVENT 001", \'ALL REGISTRATIONS\'!O2:O, "*Yes*")');
  sheet.getRange("G11").setFormula('=COUNTIFS(\'ALL REGISTRATIONS\'!A2:A, "EVENT 001", \'ALL REGISTRATIONS\'!P2:P, "*Yes*")');
  sheet.getRange("H11").setFormula('=IF(D5>0, D11/D5, 1)');
  sheet.getRange("H11").setNumberFormat("0.0%");

  // Column width formatting
  sheet.setColumnWidth(1, 110);
  sheet.setColumnWidth(2, 230);
  sheet.setColumnWidth(3, 230);
  sheet.setColumnWidth(4, 140);
  sheet.setColumnWidth(5, 110);
  sheet.setColumnWidth(6, 130);
  sheet.setColumnWidth(7, 130);
  sheet.setColumnWidth(8, 100);

  // Freeze top rows
  sheet.setFrozenRows(3);
}

function buildKpiCard(sheet, rangeA1, cardTitle, formulaOrValue) {
  var range = sheet.getRange(rangeA1);
  range.setBackground(COLOR_CARD_BG);
  range.setBorder(true, true, true, true, false, false, "#10b981", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

  var topRow = range.getRow();
  var leftCol = range.getColumn();
  var numCols = range.getNumColumns();

  // Top title cell
  var titleCell = sheet.getRange(topRow, leftCol, 1, numCols);
  titleCell.merge();
  titleCell.setValue(cardTitle);
  titleCell.setFontSize(9);
  titleCell.setFontWeight("bold");
  titleCell.setFontColor(COLOR_FOREST_DARK);
  titleCell.setHorizontalAlignment("center");
  titleCell.setVerticalAlignment("middle");

  // Big metric cell
  var valueCell = sheet.getRange(topRow + 1, leftCol, 2, numCols);
  valueCell.merge();
  if (formulaOrValue.toString().indexOf("=") === 0) {
    valueCell.setFormula(formulaOrValue);
  } else {
    valueCell.setValue(formulaOrValue);
  }
  valueCell.setFontSize(18);
  valueCell.setFontWeight("bold");
  valueCell.setFontColor(COLOR_FOREST_DARK);
  valueCell.setHorizontalAlignment("center");
  valueCell.setVerticalAlignment("middle");
}

function refreshOverviewDashboard(spreadsheet) {
  var dashboard = spreadsheet.getSheetByName("OVERVIEW DASHBOARD");
  if (!dashboard) {
    dashboard = ensureOverviewDashboardSheet(spreadsheet);
  }

  // Scan all event worksheets and ensure they appear in the breakdown table
  var sheets = spreadsheet.getSheets();
  var eventSheets = [];
  for (var i = 0; i < sheets.length; i++) {
    var name = sheets[i].getName();
    if (name.toUpperCase().indexOf("EVENT ") === 0) {
      eventSheets.push(name);
    }
  }

  // Update table starting at row 11
  for (var e = 0; e < eventSheets.length; e++) {
    var tabName = eventSheets[e];
    var rowIdx = 11 + e;
    var parts = tabName.split("–");
    var evtLabel = parts[0] ? parts[0].trim() : "EVENT " + (e + 1);
    var evtName = parts[1] ? parts[1].trim() : tabName;

    dashboard.getRange("A" + rowIdx).setValue(evtLabel);
    dashboard.getRange("B" + rowIdx).setValue(evtName);
    dashboard.getRange("C" + rowIdx).setValue(tabName);
    dashboard.getRange("D" + rowIdx).setFormula('=COUNTIF(\'ALL REGISTRATIONS\'!A2:A, "' + evtLabel + '")');
    dashboard.getRange("E" + rowIdx).setFormula('=COUNTIFS(\'ALL REGISTRATIONS\'!A2:A, "' + evtLabel + '", \'ALL REGISTRATIONS\'!Q2:Q, "*Attended*")');
    dashboard.getRange("F" + rowIdx).setFormula('=COUNTIFS(\'ALL REGISTRATIONS\'!A2:A, "' + evtLabel + '", \'ALL REGISTRATIONS\'!O2:O, "*Yes*")');
    dashboard.getRange("G" + rowIdx).setFormula('=COUNTIFS(\'ALL REGISTRATIONS\'!A2:A, "' + evtLabel + '", \'ALL REGISTRATIONS\'!P2:P, "*Yes*")');
    dashboard.getRange("H" + rowIdx).setFormula('=IF($A$5>0, D' + rowIdx + '/$A$5, 0)');
    dashboard.getRange("H" + rowIdx).setNumberFormat("0.0%");
    
    // Subtle alternating striping
    var rowRange = dashboard.getRange("A" + rowIdx + ":H" + rowIdx);
    rowRange.setVerticalAlignment("middle");
    dashboard.setRowHeight(rowIdx, 26);
    if (rowIdx % 2 === 0) {
      rowRange.setBackground(COLOR_ZEBRA_ROW);
    }
  }
}

// ============================================================================
// ROW DEDUPLICATION & SEARCH HELPERS
// ============================================================================
function findRowByRegistrationId(sheet, registrationId, idColIdx) {
  if (!sheet || !registrationId) return -1;
  idColIdx = idColIdx || 1;
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return -1;

  var idValues = sheet.getRange(2, idColIdx, lastRow - 1, 1).getValues();
  for (var r = 0; r < idValues.length; r++) {
    if (idValues[r][0] && idValues[r][0].toString().trim() === registrationId.toString().trim()) {
      return r + 2; // 1-based index (header is row 1)
    }
  }
  return -1;
}

// ============================================================================
// LEGACY WEBSITE FORMS HANDLER (CVs, Audits, Consulting, Analyst)
// ============================================================================
function handleLegacyFormSubmission(spreadsheet, payload) {
  var targetSheetName = payload.sheetName || payload.formName || payload.formType || "General Submissions";
  if (targetSheetName === "internship-application") targetSheetName = "Internship Applications";
  if (targetSheetName === "analyst-application") targetSheetName = "Analyst Applications";
  if (targetSheetName === "consulting-inquiry") targetSheetName = "Consulting Inquiries";
  if (targetSheetName === "business-audit") targetSheetName = "Business Audits";

  var sheet = spreadsheet.getSheetByName(targetSheetName);
  var isBrandNew = false;
  if (!sheet) {
    sheet = spreadsheet.insertSheet(targetSheetName);
    isBrandNew = true;
  }

  var formData = payload.data || payload.formData || payload;
  var rowRecord = {};
  rowRecord["Submission Time"] = payload.timestamp || getFormattedTimestamp();
  if (payload.id) rowRecord["Reference ID"] = payload.id;

  // Process File Upload (PDF) to Google Drive
  var fileObj = payload.file || (formData && formData.file) || null;
  var driveFileUrl = "";
  var uploadedFileName = "";
  if (fileObj && fileObj.base64) {
    try {
      var candidateName = formData["Full Name"] || formData["name"] || formData["Applicant Name"] || formData["Business Name"] || "Candidate";
      var roleOrCategory = formData["Preferred Role"] || formData["occupation"] || targetSheetName;
      var uploadResult = saveFileToDrive(fileObj, GOOGLE_DRIVE_FOLDER_NAME, candidateName, roleOrCategory);
      driveFileUrl = uploadResult.url;
      uploadedFileName = uploadResult.fileName;
    } catch (uploadErr) {
      driveFileUrl = "Upload Error: " + uploadErr.toString();
    }
  }

  if (driveFileUrl) {
    var driveCol = (targetSheetName === "Consulting Inquiries") ? "Company Brief (Drive Link)" : "CV / Resume (Drive Link)";
    rowRecord[driveCol] = driveFileUrl;
    if (uploadedFileName) rowRecord["Original File Name"] = uploadedFileName;
  }

  // Copy remaining fields
  for (var key in formData) {
    if (formData.hasOwnProperty(key)) {
      if (key !== 'sheetName' && key !== 'formName' && key !== 'formType' && key !== 'data' && key !== 'formData' && key !== 'timestamp' && key !== 'file') {
        rowRecord[key] = formData[key];
      }
    }
  }

  var headers = getSheetHeaders(sheet);
  if (headers.length === 0 || isBrandNew) {
    headers = Object.keys(rowRecord);
    var hRange = sheet.getRange(1, 1, 1, headers.length);
    hRange.setValues([headers]);
    hRange.setBackground(COLOR_FOREST_DARK);
    hRange.setFontColor(COLOR_GOLD_LIGHT);
    hRange.setFontWeight("bold");
    sheet.setRowHeight(1, 36);
    sheet.setFrozenRows(1);
  } else {
    // Append any newly discovered fields to headers
    for (var k in rowRecord) {
      if (rowRecord.hasOwnProperty(k) && headers.indexOf(k) === -1) {
        headers.push(k);
        var newCol = headers.length;
        var cell = sheet.getRange(1, newCol);
        cell.setValue(k);
        cell.setBackground(COLOR_FOREST_DARK);
        cell.setFontColor(COLOR_GOLD_LIGHT);
        cell.setFontWeight("bold");
      }
    }
  }

  var rowVals = mapDataToHeaders(rowRecord, headers);
  sheet.appendRow(rowVals);
  var insertedRow = sheet.getLastRow();
  styleDataRow(sheet, insertedRow, headers.length);

  return {
    status: "success",
    message: "Submission saved to sheet: " + targetSheetName,
    sheet: targetSheetName,
    row: insertedRow,
    fileUrl: driveFileUrl || null
  };
}

// ============================================================================
// GOOGLE DRIVE RESUME/DOCUMENT STORAGE
// ============================================================================
function saveFileToDrive(fileObj, folderName, candidateName, roleOrCategory) {
  if (!fileObj || !fileObj.base64) return { url: "", fileName: "" };

  var folderIter = DriveApp.getFoldersByName(folderName);
  var targetFolder = folderIter.hasNext() ? folderIter.next() : DriveApp.createFolder(folderName);

  var decodedBytes = Utilities.base64Decode(fileObj.base64);
  var mimeType = fileObj.mimeType || "application/pdf";
  var originalName = fileObj.fileName || "Resume.pdf";

  var cleanCandidate = candidateName.toString().replace(/[^a-zA-Z0-9_\- ]/g, "").trim() || "Candidate";
  var cleanRole = roleOrCategory ? " - " + roleOrCategory.toString().replace(/[^a-zA-Z0-9_\- ]/g, "").trim() : "";
  var sanitizedOrigName = originalName.replace(/[/\\?%*:|"<>]/g, '_');

  var finalFileName = cleanCandidate + cleanRole + " - " + sanitizedOrigName;
  if (!finalFileName.toLowerCase().endsWith(".pdf") && mimeType === "application/pdf") {
    finalFileName += ".pdf";
  }

  var blob = Utilities.newBlob(decodedBytes, mimeType, finalFileName);
  var createdFile = targetFolder.createFile(blob);

  try {
    createdFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (permErr) {}

  return {
    url: createdFile.getUrl(),
    fileName: finalFileName
  };
}

// ============================================================================
// UTILITY & STYLING HELPERS
// ============================================================================
function getSheetHeaders(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0 || sheet.getLastRow() === 0) return [];
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0];
}

function mapDataToHeaders(dataObj, headers, overrides) {
  var row = [];
  overrides = overrides || {};
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    var val = overrides[header] !== undefined ? overrides[header] : dataObj[header];
    
    // Fuzzy fallback for snake_case or camelCase matches
    if (val === undefined || val === null) {
      var lowerHeader = header.toLowerCase().replace(/[^a-z0-9]/g, "");
      for (var k in dataObj) {
        if (dataObj.hasOwnProperty(k)) {
          var cleanKey = k.toLowerCase().replace(/[^a-z0-9]/g, "");
          if (cleanKey === lowerHeader) {
            val = dataObj[k];
            break;
          }
        }
      }
    }

    row.push((val !== undefined && val !== null) ? val : "");
  }
  return row;
}

function styleDataRow(sheet, rowIdx, numCols) {
  if (numCols <= 0 || rowIdx <= 1) return;
  var range = sheet.getRange(rowIdx, 1, 1, numCols);
  range.setVerticalAlignment("middle");
  range.setFontFamily("Arial");
  sheet.setRowHeight(rowIdx, 28);
  if (rowIdx % 2 === 0) {
    range.setBackground(COLOR_ZEBRA_ROW);
  }
}

function getFormattedTimestamp() {
  try {
    var tz = (typeof Session !== "undefined" && Session.getScriptTimeZone) ? Session.getScriptTimeZone() : "GMT+01:00";
    return Utilities.formatDate(new Date(), tz, "yyyy-MM-dd HH:mm:ss");
  } catch (e) {
    return new Date().toISOString();
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// TEST & INITIALIZATION FUNCTION (RUN THIS FIRST IN APPS SCRIPT)
// ============================================================================
function testSetupAndSampleRegistration() {
  var spreadsheet = getMasterSpreadsheet();
  Logger.log("Configuring master spreadsheet: " + spreadsheet.getName());

  // 1. Build Overview Dashboard
  ensureOverviewDashboardSheet(spreadsheet);

  // 2. Build ALL REGISTRATIONS sheet
  ensureAllRegistrationsSheet(spreadsheet);

  // 3. Create Sample Registration for Event 001
  var mockEventPayload = {
    action: "register_event",
    eventId: "EVENT 001",
    eventTitle: "The Investable Business Playbook",
    timestamp: getFormattedTimestamp(),
    data: {
      "Registration ID": "REG-EVT001-TEST01",
      "Registration Date": "2026-11-19",
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
      "Business Stage": "Growth / Scaling",
      "Website / Social Media Link": "https://nexoralogistics.example.com",
      "Number of Employees": "6 – 15",
      "Revenue Status": "Consistently Profitable",
      "Monthly Revenue Range": "₦2M – ₦10M ($1,400–$7,000)",
      "Business Registration Status": "Fully Registered / Incorporated (CAC)",
      "Financial Record-Keeping Status": "Cloud Accounting (QuickBooks)",
      "Operational Systems Status": "Transitioning to Systems",
      "Biggest Business Challenges": "Capital / Funding Access & Fleet Expansion",
      "Business Priorities": "Securing Institutional Growth Capital",
      "Learning Expectations": "Mastering the investor readiness checklist and financial modeling requirements.",
      "Question for Guest Speaker": "How should early-stage African logistics operators structure debt vs equity when expanding fleet?",
      "Consulting Interest": "Yes - Immediate Need",
      "Investable Business Playbook Interest": "Yes - Want Full Playbook & Advisory Brief",
      "Investment-Readiness Interest": "Yes - Actively Preparing for Funding Round",
      "Follow-up Interest": "Yes - Schedule 15-min Discovery Call",
      "Marketing Consent": "Yes",
      "Communication Preferences": "WhatsApp & Email",
      "Attendance Status": "Confirmed Registered",
      "Follow-up Status": "Pending Review"
    }
  };

  var result = handleEventRegistrationSync(spreadsheet, mockEventPayload);
  Logger.log("Registration Test Result: " + JSON.stringify(result));
}
