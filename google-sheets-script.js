/**
 * ============================================================================
 * THE AFFLUENTACCELERATORS - MULTI-FORM GOOGLE SHEETS AUTOMATION SCRIPT
 * ============================================================================
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new) and name your spreadsheet
 *    (e.g., "The Affluentaccelerators - Submissions & Leads").
 * 2. Click "Extensions" > "Apps Script" in the top menu.
 * 3. Delete ALL existing code inside Code.gs and paste this entire script.
 * 4. (Optional Test): To test immediately inside Apps Script, select the function
 *    "testSubmission" from the toolbar dropdown and click "Run".
 *    Grant Google permissions when prompted. A test lead will appear in your sheet!
 * 5. Click "Deploy" > "New deployment".
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. Set:
 *    - Description: "Affluent Accelerators Forms Webhook"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (allows website submissions to reach your sheet)
 * 8. Click "Deploy".
 * 9. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
 * 10. Send that URL here in the chat (or paste it into app.js) to connect the website!
 * ============================================================================
 */

// POST endpoint: receives form submissions from the website
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (lockError) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Server busy, could not acquire lock. Please try again."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    // Graceful payload extraction: works with both POST JSON bodies and direct invocations
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
      // Default fallback if executed directly without an event payload
      payload = {
        sheetName: "General Submissions",
        data: {
          "Reference ID": "INIT-001",
          "Status": "Webhook active and ready",
          "Note": "Run testSubmission() from the dropdown to verify with sample data"
        }
      };
    }

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create("The Affluentaccelerators - Submissions & Leads");
    }

    // Determine target sheet tab name
    var targetSheetName = payload.sheetName || payload.formName || payload.category || "General Submissions";

    // 1. Locate or create the tab
    var sheet = spreadsheet.getSheetByName(targetSheetName);
    var isBrandNewSheet = false;
    if (!sheet) {
      sheet = spreadsheet.insertSheet(targetSheetName);
      isBrandNewSheet = true;

      // Clean up default empty Sheet1 if this is the first custom tab
      var defaultSheet = spreadsheet.getSheetByName("Sheet1");
      if (defaultSheet && defaultSheet.getLastRow() === 0 && spreadsheet.getSheets().length > 1) {
        try {
          spreadsheet.deleteSheet(defaultSheet);
        } catch (delErr) {
          // Ignore if Sheet1 cannot be deleted
        }
      }
    }

    // 2. Extract and format row record
    var formData = payload.data || payload.formData || payload;
    var rowRecord = {};

    // Generate safe timestamp
    var timestampStr = "";
    try {
      var tz = (typeof Session !== "undefined" && Session.getScriptTimeZone) ? Session.getScriptTimeZone() : "GMT+01:00";
      timestampStr = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd HH:mm:ss");
    } catch (dateErr) {
      timestampStr = new Date().toISOString();
    }

    rowRecord["Submission Time"] = payload.timestamp || timestampStr;
    if (payload.id) {
      rowRecord["Reference ID"] = payload.id;
    }

    // Populate all submission fields (omitting internal metadata routing keys)
    for (var key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key !== 'sheetName' && key !== 'formName' && key !== 'data' && key !== 'formData' && key !== 'timestamp') {
          rowRecord[key] = formData[key];
        }
      }
    }

    // 3. Header management
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    var headers = [];

    if (lastRow === 0 || lastCol === 0 || isBrandNewSheet) {
      // First submission to this tab: build header row
      headers = Object.keys(rowRecord);

      if (headers.length > 0) {
        var headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setValues([headers]);
        headerRange.setBackground("#06261b");
        headerRange.setFontColor("#f3c74d");
        headerRange.setFontWeight("bold");
        headerRange.setFontFamily("Arial");
        headerRange.setHorizontalAlignment("center");
        headerRange.setVerticalAlignment("middle");
        sheet.setRowHeight(1, 35);
        sheet.setFrozenRows(1);
      }
    } else {
      // Read existing header labels from row 1
      headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

      // Dynamically add any newly introduced form field as a new column
      for (var f in rowRecord) {
        if (rowRecord.hasOwnProperty(f)) {
          if (headers.indexOf(f) === -1) {
            headers.push(f);
            var newColIdx = headers.length;
            var newHeaderCell = sheet.getRange(1, newColIdx);
            newHeaderCell.setValue(f);
            newHeaderCell.setBackground("#06261b");
            newHeaderCell.setFontColor("#f3c74d");
            newHeaderCell.setFontWeight("bold");
            newHeaderCell.setFontFamily("Arial");
            newHeaderCell.setHorizontalAlignment("center");
            newHeaderCell.setVerticalAlignment("middle");
          }
        }
      }
    }

    // 4. Assemble row values matching header order
    var rowValues = [];
    for (var i = 0; i < headers.length; i++) {
      var colHeader = headers[i];
      var cellVal = rowRecord[colHeader];
      rowValues.push((cellVal !== undefined && cellVal !== null) ? cellVal : "");
    }

    sheet.appendRow(rowValues);
    var insertedRowIdx = sheet.getLastRow();

    // Style data row
    if (headers.length > 0) {
      var dataRange = sheet.getRange(insertedRowIdx, 1, 1, headers.length);
      dataRange.setVerticalAlignment("middle");
      dataRange.setFontFamily("Arial");
      sheet.setRowHeight(insertedRowIdx, 28);

      if (insertedRowIdx % 2 === 0) {
        dataRange.setBackground("#f8faf8");
      }

      // Auto-fit column widths with breathing room
      for (var c = 1; c <= headers.length; c++) {
        sheet.autoResizeColumn(c);
        var width = sheet.getColumnWidth(c);
        sheet.setColumnWidth(c, Math.max(width + 20, 120));
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead recorded in sheet: " + targetSheetName,
      sheet: targetSheetName,
      row: insertedRowIdx
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// GET endpoint: allows quick browser verification
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "The Affluentaccelerators Form Webhook",
    message: "Ready to accept form submissions into Google Sheets tabs."
  })).setMimeType(ContentService.MimeType.JSON);
}

// SAFE TEST FUNCTION:
// Select "testSubmission" in the Apps Script top toolbar and click "Run".
// This safely triggers Google permissions and creates a sample row in your sheet!
function testSubmission() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        sheetName: "Consulting Inquiries",
        id: "TEST-001",
        timestamp: "2026-11-04 12:00:00",
        data: {
          "Reference ID": "TEST-001",
          "Full Name": "Test Lead (Verification)",
          "Business Name": "Affluent Accelerators Ltd",
          "Work Email": "advisory@affluentaccelerators.com",
          "Phone / WhatsApp": "+234 903 954 5275",
          "Industry": "Management Consulting",
          "Business Stage": "Growth ($2M - $5M ARR)",
          "Support Requested": "Operations & Systems Optimization",
          "Verification Status": "Confirmed Working"
        }
      })
    }
  };

  var response = doPost(mockEvent);
  Logger.log("Test Result: " + response.getContent());
}
