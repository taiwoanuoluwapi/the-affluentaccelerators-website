# Google Sheets Integration Guide for The Affluentaccelerators

All forms on the website submit directly into your Google Spreadsheet, with **each form automatically creating and saving into its own separate tab (sheet)**:
1. **Consulting Inquiries** — Submissions from the *"Request A Business Consultation"* modal.
2. **Analyst Applications** — Applications for the *90-Day Business Consultant/Analyst Programme* (₦175,000 cohort).
3. **Internship Applications** — Applications for the *Internship & Fellowship Programme*.
4. **Any Future Forms** — Any new form added in the future automatically generates a new sheet tab and formatted headers with zero manual spreadsheet configuration!

---

## Quick Setup Instructions

### Step 1: Create Your Google Sheet
1. Go to [sheets.new](https://sheets.new) in your web browser.
2. Name the spreadsheet (e.g. `The Affluentaccelerators - Submissions & Leads`).

### Step 2: Paste the Automation Script
1. In the Google Sheets top menu, click **Extensions** > **Apps Script**.
2. Erase everything inside `Code.gs` and copy-paste the code from [`google-sheets-script.js`](file:///home/agent/workspace/google-sheets-script.js).
3. Click the **Save** icon (diskette).

### Step 3 (Optional): Verify with "Run"
1. In the top toolbar next to "Debug", choose **testSubmission** in the function dropdown.
2. Click **Run**.
3. Google will ask for permission the first time:
   - Click **Review permissions**
   - Choose your Google account
   - Click **Advanced** > **Go to Untitled project (unsafe)**
   - Click **Allow**
4. Check your Google Sheet tab — you will see a new tab *"Consulting Inquiries"* with the header row styled in executive Forest Green (`#06261b`) and Gold (`#f3c74d`) with a test lead inserted!

### Step 4: Deploy as a Web App
1. Click the blue **Deploy** button (top right) > **New deployment**.
2. Click the gear icon ⚙️ next to *Select type* and choose **Web app**.
3. Configure:
   - **Description**: `Affluent Accelerators Forms Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: allows website submissions to reach your sheet)*
4. Click **Deploy**.
5. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).

### Step 5: Connect to Your Website
- **Send the Web app URL in this chat**, and I will immediately plug it into the code!
- Or paste it into `GOOGLE_SHEETS_WEBHOOK_URL` at the top of [`app.js`](file:///home/agent/workspace/app.js).

---

## What Happens When a Visitor Submits?
- **Automatic Tab Routing**: The script checks which form was used and locates or creates that tab.
- **Header Formatting**: Automatically styles the header row in deep forest green with gold bold text and freezes the row.
- **Zero Data Loss**: Data is saved locally and transmitted to your spreadsheet immediately.
