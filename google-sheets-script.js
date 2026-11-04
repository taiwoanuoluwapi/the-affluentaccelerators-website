/**
 * ============================================================================
 * THE AFFLUENTACCELERATORS - MULTI-FORM GOOGLE SHEETS AUTOMATION SCRIPT
 * ============================================================================
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new) and name your spreadsheet
 *    (e.g., "The Affluentaccelerators - Submissions & Leads").
 * 2. Click on "Extensions" > "Apps Script" in the top menu.
 * 3. Delete any default code in Code.gs and paste this entire file.
 * 4. Click "Deploy" > "New deployment".
 * 5. Click the gear icon next to "Select type" and choose "Web app".
 * 6. Set:
 *    - Description: "Affluent Accelerators Forms Webhook"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (crucial so the website can submit leads)
 * 7. Click "Deploy", authorize access with your Google account.
 * 8. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
 * 9. Paste that URL into app.js in the GOOGLE_SHEETS_WEBHOOK_URL setting
 *    (or tell me in the chat and I will insert it for you!).
 *
 * Each form submitted will automatically create and populate its own dedicated tab:
 * - "Consulting Inquiries"
 * - "Analyst Applications"
 * - "Internship Applications"
 * - Plus any new form you create in the future!
 * ============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent requests
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Server busy, could not acquire lock. Please try again."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var payload = {};
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        payload = e.parameter || {};
      }
    } else if (e.parameter) {
      payload = e.parameter;
    }

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create("The Affluentaccelerators - Submissions & Leads");
    }

    // Determine target sheet name based on submission
    var targetSheetName = payload.sheetName || payload.formName || payload.category || "General Submissions";

    // 1. Get or create the sheet tab for this form
    var sheet = spreadsheet.getSheetByName(targetSheetName);
    var isBrandNewSheet = false;
    if (!sheet) {
      sheet = spreadsheet.insertSheet(targetSheetName);
      isBrandNewSheet = true;

      // If the default "Sheet1" is empty and untouched, we can delete or keep it
      var defaultSheet = spreadsheet.getSheetByName("Sheet1");
      if (defaultSheet && defaultSheet.getLastRow() === 0 && spreadsheet.getSheets().length > 1) {
        try { spreadsheet.deleteSheet(defaultSheet); } catch (e) {}
      }
    }

    // 2. Extract submission data
    var formData = payload.data || payload.formData || payload;
    var rowRecord = {};

    // Standardized timestamps
    var timestampStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "GMT+1", "yyyy-MM-dd HH:mm:ss");
    rowRecord["Submission Time"] = payload.timestamp || timestampStr;
    if (payload.id) {
      rowRecord["Reference ID"] = payload.id;
    }

    // Copy all data fields (ignoring metadata routing keys)
    for (var key in formData) {
      if (key !== 'sheetName' && key !== 'formName' && key !== 'data' && key !== 'formData' && key !== 'timestamp') {
        rowRecord[key] = formData[key];
      }
    }

    // 3. Manage Headers
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    var headers = [];

    if (lastRow === 0 || lastCol === 0 || isBrandNewSheet) {
      // First submission to this tab: generate header row
      headers = Object.keys(rowRecord);
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Luxury Affluent Accelerators styling: Forest green header with gold text
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#06261b");
      headerRange.setFontColor("#f3c74d");
      headerRange.setFontWeight("bold");
      headerRange.setFontFamily("Arial");
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 35);
      sheet.setFrozenRows(1);
    } else {
      // Sheet already exists, read existing headers from row 1
      headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      
      // If the incoming submission has a new field not yet in headers, append new header column
      for (var f in rowRecord) {
        if (headers.indexOf(f) === -1) {
          headers.push(f);
          var newColIdx = headers.length;
          var newHeaderCell = sheet.getRange(1, newColIdx);
          newHeaderCell.setValue(f)
                        .setBackground("#06261b")
                        .setFontColor("#f3c74d")
                        .setFontWeight("bold")
                        .setFontFamily("Arial")
                        .setHorizontalAlignment("center")
                        .setVerticalAlignment("middle");
        }
      }
    }

    // 4. Construct the row corresponding to header columns
    var rowValues = headers.map(function(h) {
      var val = rowRecord[h];
      return (val !== undefined && val !== null) ? val : "";
    });

    sheet.appendRow(rowValues);
    var insertedRowIdx = sheet.getLastRow();

    // Style data row with clean padding and zebra highlight
    var dataRange = sheet.getRange(insertedRowIdx, 1, 1, headers.length);
    dataRange.setVerticalAlignment("middle");
    dataRange.setFontFamily("Arial");
    sheet.setRowHeight(insertedRowIdx, 28);

    if (insertedRowIdx % 2 === 0) {
      dataRange.setBackground("#f8faf8");
    }

    // Auto-fit column widths for clear readability
    for (var c = 1; c <= headers.length; c++) {
      sheet.autoResizeColumn(c);
      var width = sheet.getColumnWidth(c);
      // Give a little breathing room
      sheet.setColumnWidth(c, Math.max(width + 20, 120));
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

// GET endpoint to verify that the webhook is running
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "The Affluentaccelerators Form Webhook",
    message: "Ready to accept form submissions into Google Sheets tabs."
  })).setMimeType(ContentService.MimeType.JSON);
}
