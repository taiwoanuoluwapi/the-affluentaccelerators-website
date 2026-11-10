# Google Sheets Setup: Inquiries, Hiring & Business Audits

This guide covers the **dedicated Google Spreadsheet for website inquiries, consulting requests, and career applications**.

> **Note:** This spreadsheet operates independently from your Events Database. Submissions from `forms.html` and consulting/internship modals on `index.html` flow exclusively into this sheet.

---

## 1. Sheet Overview & Capabilities

* **Spreadsheet Name**: `THE AFFLUENTACCELERATORS – MASTER DATABASE` (or `The Affluentaccelerators - Submissions & Leads`)
* **Google Drive Storage Folder**: `The Affluentaccelerators: Hiring` (PDF resumes and company briefs are automatically stored in Drive, with clickable links recorded in the sheet).
* **Dedicated Sheet Tabs**:
  * **`Business Audits & Inquiries`** — Consolidated single tab for Free Audits, In-Depth Strategic Consultations, and BDR In-Field Leads (includes Business Location, Team Size, and Website/Social URL).
  * **`Internship Applications`** — Fellowship candidates with CVs stored in Google Drive.
  * **`Analyst Applications`** — 90-Day Programme applicants with credentials in Drive.
  * **`Event Registrations`** — Masterclasses & webinars.
  * **`OVERVIEW DASHBOARD`** — Real-time telemetry and KPI metrics.

> **Note on Migration**: If your sheet has the old `Business Audits`, `Consulting Inquiries`, or `General Submissions` tabs, run **`testAuditAndInquiryConsolidation`** in Apps Script. It will merge existing leads into `Business Audits & Inquiries` and clean up the old tabs automatically! See full documentation in [GOOGLE_SHEETS_UNIFIED_SETUP.md](./GOOGLE_SHEETS_UNIFIED_SETUP.md).

---

## 2. Setup Instructions (3 Minutes)

### Step 1: Open or Create Your Inquiries Sheet
1. Open your Google Spreadsheet (or create a new one at [sheets.new](https://sheets.new)).
2. Name it:
   ```
   The Affluentaccelerators - Submissions & Leads
   ```

### Step 2: Paste the Inquiries Script
1. In the top menu, click **Extensions** > **Apps Script**.
2. Replace all code in `Code.gs` with the script in [`google-sheets-inquiries-script.js`](./google-sheets-inquiries-script.js).
3. Click the **Save** icon (diskette).

### Step 3: Authorize Google Drive & Sheets Permissions (One-Time)
1. In the toolbar at the top (next to "Debug"), choose **`testFileUploadSubmission`** from the dropdown.
2. Click **Run**.
3. Grant permissions when prompted (*Review permissions* > select account > *Advanced* > *Go to project* > *Allow*).
4. Check your Google Drive: you will see the folder **`The Affluentaccelerators: Hiring`** with a test PDF!
5. Check your Google Sheet: you will see a new row in **`Internship Applications`** with the Drive link!

### Step 4: Deploy as Web App
1. Click the blue **Deploy** button (top right) > **Manage deployments** (or **New deployment**).
2. Set:
   * **Execute as**: `Me`
   * **Who has access**: `Anyone`
3. Click **Deploy** and copy your **Web App URL**.
4. In `app.js`, set `INQUIRIES_GOOGLE_SHEETS_WEBHOOK_URL` to your Web App URL.
