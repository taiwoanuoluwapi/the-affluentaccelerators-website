/**
 * ============================================================================
 * THE AFFLUENTACCELERATORS - MULTI-FORM & GOOGLE DRIVE AUTOMATION SCRIPT
 * ============================================================================
 * 
 * Features:
 * 1. Automatic Google Drive File Storage:
 *    - Uploaded PDF resumes / documents are automatically saved to your Google
 *      Drive inside the folder: "The Affluentaccelerators: Hiring".
 *    - If the folder does not exist yet, the script creates it automatically.
 *    - The file is granted view permissions with link.
 * 2. Automatic Tab Routing & Linking in Google Sheets:
 *    - "Internship Applications"
 *    - "Analyst Applications"
 *    - "Consulting Inquiries"
 *    - "Business Audits"
 *    - The direct Google Drive link is recorded in the spreadsheet under
 *      "CV / Resume (Drive Link)" so you can click and view the PDF instantly!
 * 3. Executive Formatting:
 *    - Deep Forest Green (#06261b) and Gold (#f3c74d) header styling with
 *      frozen rows and auto-adjusted column widths.
 * 
 * Instructions:
 * 1. Open your Google Spreadsheet (or create a new one at https://sheets.new).
 * 2. Click "Extensions" > "Apps Script".
 * 3. Replace all code in Code.gs with this entire script.
 * 4. To authorize Drive and Sheet access, select "testFileUploadSubmission" from
 *    the toolbar dropdown and click "Run". Grant permissions when prompted.
 *    You will see the folder "The Affluentaccelerators: Hiring" created in your
 *    Google Drive with a test PDF, and a new row inserted in your Google Sheet!
 * 5. Click "Deploy" > "New deployment" > Gear icon > "Web app".
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Click "Deploy" and copy your Web App URL.
 * ============================================================================
 */

// Target Google Drive folder name requested
var GOOGLE_DRIVE_FOLDER_NAME = "The Affluentaccelerators: Hiring";

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
    // Graceful payload extraction (supports JSON bodies and URL parameters)
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
      payload = {
        sheetName: "General Submissions",
        data: {
          "Reference ID": "INIT-001",
          "Status": "Webhook active and ready"
        }
      };
    }

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create("The Affluentaccelerators - Submissions & Leads");
    }

    // Determine target sheet tab name
    var targetSheetName = payload.sheetName || payload.formName || payload.formType || "General Submissions";
    if (targetSheetName === "internship-application") targetSheetName = "Internship Applications";
    if (targetSheetName === "analyst-application") targetSheetName = "Analyst Applications";
    if (targetSheetName === "consulting-inquiry") targetSheetName = "Consulting Inquiries";
    if (targetSheetName === "business-audit") targetSheetName = "Business Audits";

    // 1. Locate or create the sheet tab
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
        } catch (delErr) {}
      }
    }

    // 2. Extract form data
    var formData = payload.data || payload.formData || payload;
    var rowRecord = {};

    // Timestamp
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

    // 3. Process File Upload (PDF) to Google Drive
    var fileObj = payload.file || (formData && formData.file) || null;
    var driveFileUrl = "";
    var uploadedFileName = "";

    if (fileObj && fileObj.base64) {
      try {
        var applicantName = formData["Full Name"] || formData["name"] || formData["Applicant Name"] || formData["Business Name"] || "Candidate";
        var roleOrCategory = formData["Preferred Role"] || formData["occupation"] || targetSheetName;
        
        var uploadResult = saveFileToDrive(fileObj, GOOGLE_DRIVE_FOLDER_NAME, applicantName, roleOrCategory);
        driveFileUrl = uploadResult.url;
        uploadedFileName = uploadResult.fileName;
      } catch (uploadErr) {
        Logger.log("Drive upload error: " + uploadErr.toString());
        driveFileUrl = "Upload Error: " + uploadErr.toString();
      }
    }

    // Assign Drive URL and File info to rowRecord
    if (driveFileUrl) {
      var driveColumnHeader = "CV / Resume (Drive Link)";
      if (targetSheetName === "Consulting Inquiries") {
        driveColumnHeader = "Company Brief (Drive Link)";
      }
      rowRecord[driveColumnHeader] = driveFileUrl;
      if (uploadedFileName) {
        rowRecord["Original File Name"] = uploadedFileName;
      }
    }

    // Populate all other submission fields
    for (var key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key !== 'sheetName' && key !== 'formName' && key !== 'formType' && key !== 'data' && key !== 'formData' && key !== 'timestamp' && key !== 'file') {
          rowRecord[key] = formData[key];
        }
      }
    }

    // 4. Header management
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
        sheet.setRowHeight(1, 36);
        sheet.setFrozenRows(1);
      }
    } else {
      // Read existing header labels from row 1
      headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

      // Dynamically append any new field as a new column
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

    // 5. Assemble row values matching header order
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
        sheet.setColumnWidth(c, Math.max(width + 20, 130));
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead recorded in sheet: " + targetSheetName,
      sheet: targetSheetName,
      row: insertedRowIdx,
      fileUrl: driveFileUrl || null
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

/**
 * Saves a base64 encoded file into the designated Google Drive folder.
 * Returns { url: string, fileName: string }
 */
function saveFileToDrive(fileObj, folderName, candidateName, roleOrCategory) {
  if (!fileObj || !fileObj.base64) {
    return { url: "", fileName: "" };
  }

  // 1. Locate or create destination folder
  var folderIter = DriveApp.getFoldersByName(folderName);
  var targetFolder;
  if (folderIter.hasNext()) {
    targetFolder = folderIter.next();
  } else {
    targetFolder = DriveApp.createFolder(folderName);
  }

  // 2. Decode the file
  var decodedBytes = Utilities.base64Decode(fileObj.base64);
  var mimeType = fileObj.mimeType || "application/pdf";
  var originalName = fileObj.fileName || "Resume.pdf";
  
  // Clean candidate and role labels for the filename
  var cleanCandidate = candidateName.toString().replace(/[^a-zA-Z0-9_\- ]/g, "").trim() || "Candidate";
  var cleanRole = roleOrCategory ? " - " + roleOrCategory.toString().replace(/[^a-zA-Z0-9_\- ]/g, "").trim() : "";
  var sanitizedOrigName = originalName.replace(/[/\\?%*:|"<>]/g, '_');
  
  var finalFileName = cleanCandidate + cleanRole + " - " + sanitizedOrigName;
  if (!finalFileName.toLowerCase().endsWith(".pdf") && mimeType === "application/pdf") {
    finalFileName += ".pdf";
  }

  // 3. Create blob and save file in Drive folder
  var blob = Utilities.newBlob(decodedBytes, mimeType, finalFileName);
  var createdFile = targetFolder.createFile(blob);

  // 4. Set permissions so spreadsheet viewers can open the link
  try {
    createdFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (permErr) {
    Logger.log("Sharing restriction (normal in some Workspace tenants): " + permErr.toString());
  }

  return {
    url: createdFile.getUrl(),
    fileName: finalFileName
  };
}

// GET endpoint: allows quick browser verification
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "The Affluentaccelerators Form & Drive Webhook",
    folder: GOOGLE_DRIVE_FOLDER_NAME,
    message: "Ready to accept form submissions with PDF upload to Google Drive and Google Sheets."
  })).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// VERIFICATION & PERMISSION TEST FUNCTION
// ============================================================================
// Select "testFileUploadSubmission" in the Apps Script top toolbar and click "Run".
// This safely triggers Google permissions (for both Sheets and Drive), creates
// the "The Affluentaccelerators: Hiring" folder in your Drive, and logs a test row!
function testFileUploadSubmission() {
  // Sample base64 text document to test Drive creation
  var samplePdfContent = "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000010 00000 n\n0000000060 00000 n\n0000000118 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n187\n%%EOF";
  var sampleBase64 = Utilities.base64Encode(samplePdfContent);

  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        sheetName: "Internship Applications",
        id: "TEST-INT-001",
        timestamp: "2026-11-07 12:00:00",
        file: {
          fileName: "David_Eze_CV_Sample.pdf",
          mimeType: "application/pdf",
          base64: sampleBase64
        },
        data: {
          "Reference ID": "TEST-INT-001",
          "Full Name": "David Eze (Test Applicant)",
          "Email Address": "davideze.test@example.com",
          "Phone / WhatsApp": "+234 903 954 5275",
          "Location": "Lagos, Nigeria",
          "Educational Background": "B.Sc Finance (First Class)",
          "Current Occupation": "Early Career Analyst",
          "Preferred Role": "Business Development Intern",
          "Relevant Skills": "Financial modeling, Market research, Deal structuring",
          "Weekly Commitment": "Full-Time (40 hrs/wk)",
          "Motivation": "Passionate about building real businesses and learning advisory methodology.",
          "Learning Goals": "Master corporate diagnostic auditing and partnership development.",
          "LinkedIn / Portfolio": "https://linkedin.com/in/test-davideze"
        }
      })
    }
  };

  var response = doPost(mockEvent);
  Logger.log("Test Result: " + response.getContent());
}
