# Google Sheets Integration Guide for The Affluentaccelerators

All forms on the website are wired to submit directly into a Google Spreadsheet, with **each form automatically creating and saving into its own separate tab (sheet)**:
1. **Consulting Inquiries** — Submissions from the *"Request A Business Consultation"* modal.
2. **Analyst Applications** — Applications for the *90-Day Business Consultant/Analyst Programme* (₦175,000 cohort).
3. **Internship Applications** — Applications for the *Internship & Fellowship Programme*.
4. **Any Future Forms** — Any new form added in the future automatically generates a new sheet tab and formatted headers with zero manual spreadsheet configuration!

---

## 3-Minute Setup Instructions

### Step 1: Create Your Google Sheet
1. Go to [sheets.new](https://sheets.new) in your web browser.
2. Name the spreadsheet (e.g. `The Affluentaccelerators - Submissions & Leads`).

### Step 2: Paste the Automation Script
1. In the Google Sheets top menu, click **Extensions** > **Apps Script**.
2. Erase any code inside `Code.gs` and copy-paste the entire contents of [`google-sheets-script.js`](file:///home/agent/workspace/google-sheets-script.js).
3. Click the **Save** icon (diskette).

### Step 3: Deploy as a Web App
1. Click the blue **Deploy** button (top right) > **New deployment**.
2. Click the gear icon ⚙️ next to *Select type* and choose **Web app**.
3. Configure the settings:
   - **Description**: `Affluent Accelerators Form Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: allows website submissions to reach your sheet)*
4. Click **Deploy**.
5. Grant Google permissions when prompted (Click *Authorize access*, choose your account, click *Advanced* > *Go to Untitled project (unsafe)* > *Allow*).
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).

### Step 4: Connect to Your Website
You have two easy ways:
- **Option A (Instant in Chat)**: Send the Web app URL right here in this chat, and I will instantly connect it to the code!
- **Option B (Direct in Code)**: Open `app.js` and paste your URL into `GOOGLE_SHEETS_WEBHOOK_URL`:
  ```javascript
  const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
  ```

---

## What Happens When a Visitor Submits?
- **Automatic Tab Routing**: The script checks which form was used and locates or creates that tab.
- **Header Formatting**: Automatically styles the header row in deep forest green with gold bold text and freezes the row.
- **Zero Data Loss**: Data is simultaneously backed up locally so submissions are never lost even if a visitor loses connection.
