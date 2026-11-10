# Google Sheets Integration Guide: Central Event Registration Database

This guide explains how to connect and configure the **Central Event Registration Database** for The AffluentAccelerators website.

All event registrations across the website are automatically collected and organized inside **ONE central Google Sheets document** with dedicated worksheets (tabs) per event, an executive **Overview Dashboard**, and a consolidated **ALL REGISTRATIONS** master tab.

---

## 1. Master Spreadsheet Architecture

The system connects to one master Google Spreadsheet named:
**`THE AFFLUENTACCELERATORS – EVENTS & REGISTRATION DATABASE`**

Inside this single workbook, the following tab structure is maintained automatically:

| Tab Name | Purpose & Contents |
| :--- | :--- |
| **`OVERVIEW DASHBOARD`** | Executive BI cards and real-time formulas tracking total events, total registrations, registrations per event, consulting inquiries, investment readiness, and industry breakdowns. |
| **`ALL REGISTRATIONS`** | Central consolidated master sheet with standard columns (Event ID, Event Name, Registration ID, Full Name, Contact info, Business Details, Diagnostic Responses, Sync Timestamp). |
| **`EVENT 001 – The Investable Business Playbook`** | Inaugural event tab with all 31 diagnostic questions and responses. |
| **`EVENT 002 – [Next Event Name]`** | Dynamically created when Event 002 is published or receives its first registration. |
| **`Internship Applications`** | Fellowship & internship applicants with Google Drive PDF resume links. |
| **`Analyst Applications`** | 90-Day Analyst programme applicants with credentials and Drive PDF links. |
| **`Consulting Inquiries`** | Advisory requests and business diagnostics. |
| **`Business Audits`** | Free diagnostic audit submissions. |

---

## 2. Quick 3-Minute Setup Instructions

Follow these simple steps to deploy or update your Apps Script:

### Step 1: Open or Create Your Master Google Sheet
1. Visit [sheets.new](https://sheets.new) in your browser.
2. Set the document title to:
   ```
   THE AFFLUENTACCELERATORS – EVENTS & REGISTRATION DATABASE
   ```

### Step 2: Paste the Apps Script Code
1. In the top Google Sheets menu, click **Extensions** > **Apps Script**.
2. Delete everything inside `Code.gs`.
3. Open [`google-sheets-script.js`](./google-sheets-script.js) in this repository, copy the entire code, and paste it into `Code.gs`.
4. Click the **Save** icon (diskette) or press `Ctrl + S` / `Cmd + S`.

### Step 3: Run Initial One-Time Setup & Grant Permissions
1. In the Apps Script toolbar (next to "Debug"), select **`testSetupAndSampleRegistration`** from the dropdown.
2. Click **Run**.
3. Google will show an **"Authorization required"** dialog:
   - Click **Review permissions**
   - Select your Google account
   - Click **Advanced** > **Go to Untitled project (unsafe)** (standard for custom personal Apps Scripts)
   - Click **Allow**
4. Check your Google Sheet:
   - You will see **`OVERVIEW DASHBOARD`**, **`ALL REGISTRATIONS`**, and **`EVENT 001 – The Investable Business Playbook`** created and formatted with brand green and gold headers, formulas, and a sample row!

### Step 4: Deploy as a Web App
1. In the top right of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure the settings:
   - **Description**: `The Affluentaccelerators Central Event & Leads Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Note: This allows the website's form submission engine to post registrations securely to your sheet without exposing your Google login).*
4. Click **Deploy**.
5. Copy the generated **Web App URL** (starts with `https://script.google.com/macros/s/.../exec`).

### Step 5: Connect to the Website
1. Go to the website's Admin Portal at `/admin.html` (or via the footer link on any page).
2. Enter your **Web App URL** in the **Google Sheets Integration Settings** field.
3. Click **Test Connection**. A green checkmark will confirm that the spreadsheet is connected and responsive!

---

## 3. How Automatic Event Tab Creation Works

Whenever an administrator creates and publishes a new event on the website:

1. **Worksheet Check**: The system checks if the event already has an assigned worksheet using its Event ID (e.g., `EVENT 001`).
2. **Reuse**: If the tab already exists, it is reused without creating duplicates.
3. **Automatic Creation**: If it does not exist, the system creates a new worksheet named:
   `EVENT [Number] – [Event Title]` (e.g., `EVENT 002 – Business Growth Masterclass`).
4. **Header Generation**: Column headers matching the registration form fields are applied with forest green `#06261b` background and gold `#f3c74d` text, frozen in row 1.
5. **Dashboard Registration**: The event is automatically added to the **`OVERVIEW DASHBOARD`** performance table with live formulas.

---

## 4. Automatic Registration Data Sync

When a participant registers for an event:

1. **Validation**: All form fields are validated on the client side.
2. **Local Database Backup**: The registration is instantly saved to the website's local persistent database with a unique Registration ID (e.g. `REG-EVT001-8421`). This prevents data loss even if the participant's network drops.
3. **Event Tab Sync**: The registration is appended to that event's dedicated worksheet (e.g. `EVENT 001 – The Investable Business Playbook`).
4. **Master Tab Sync**: The registration is simultaneously recorded in **`ALL REGISTRATIONS`**.
5. **Dashboard Update**: Formula counts for total registrations, consulting leads, and event-specific attendees update immediately.
6. **Deduplication Guarantee**: If a sync is retried, the system checks the Registration ID and updates the existing row instead of inserting duplicates.

---

## 5. Security & Data Privacy

- **No Public Editing**: The master spreadsheet remains private to authorized AffluentAccelerators team members.
- **No Credentials in Frontend**: Google service account secrets or private keys are never exposed in browser code. Submissions flow through the authenticated Google Apps Script Web App.
- **Participant Privacy**: Private registration data is stored securely and never displayed on public event landing pages.
- **Offline Resilience**: If Google Sheets is temporarily unreachable, registrations are preserved in the pending sync queue and can be re-synced with one click from the Admin Portal.
