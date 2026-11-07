# Google Sheets & Google Drive Integration Guide

All forms on the website submit directly into your Google Spreadsheet, and **uploaded PDF resumes/documents are automatically stored in your Google Drive**!

### Core Capabilities:
1. **Automatic Google Drive Storage**:
   - Files are automatically saved into your Google Drive inside the dedicated folder:
     📁 **`The Affluentaccelerators: Hiring`**
   - The script creates this folder automatically if it doesn't already exist.
   - Files are renamed clearly: `[Applicant Name] - [Role] - [Original File Name].pdf`
2. **Direct Google Sheet Link**:
   - The direct Google Drive URL is recorded in the spreadsheet under the column **`CV / Resume (Drive Link)`**.
   - Anyone reviewing the sheet can click the link to view or download the candidate's PDF immediately.
3. **Automatic Sheet Tab Routing**:
   - **`Internship Applications`** — Fellowship & internship candidates with CVs attached.
   - **`Analyst Applications`** — 90-Day Programme applicants with CVs / credentials attached.
   - **`Consulting Inquiries`** — Advisory requests (with optional company brief / deck).
   - **`Business Audits`** — Free video/audio audit requests.

---

## How to Update Your Apps Script Deployment

If you have already set up Google Apps Script:

### Step 1: Update the Code in Apps Script
1. Open your Google Sheet ([sheets.google.com](https://sheets.google.com)).
2. In the top menu, click **Extensions** > **Apps Script**.
3. Replace all existing code in `Code.gs` with the updated script in [`google-sheets-script.js`](file:///home/agent/workspace/google-sheets-script.js).
4. Click the **Save** icon (diskette).

### Step 2: Grant Google Drive Permissions (One-Time)
1. In the toolbar at the top (next to "Debug"), choose **`testFileUploadSubmission`** from the dropdown.
2. Click **Run**.
3. Google will request permission to access Google Drive:
   - Click **Review permissions**
   - Select your Google account
   - Click **Advanced** > **Go to Untitled project (unsafe)**
   - Click **Allow**
4. Check your Google Drive: you will see the new folder **`The Affluentaccelerators: Hiring`** with a test PDF!
5. Check your Google Sheet: you will see a new row in **`Internship Applications`** with the Drive link!

### Step 3: Deploy New Version
1. Click the blue **Deploy** button (top right) > **Manage deployments**.
2. Click the **Pencil icon** (Edit) on your active deployment.
3. In the **Version** dropdown, select **New version**.
4. Click **Deploy**.
5. Your existing Web App URL remains the same! Submissions from the website will now automatically upload candidate PDFs to your Drive folder.

---

## File Upload Technical Specs
- **Accepted Formats**: PDF (`.pdf`, `application/pdf`)
- **Maximum File Size**: 10 MB
- **Drive Folder**: `The Affluentaccelerators: Hiring`
- **Link Sharing**: Anyone with the link can view
