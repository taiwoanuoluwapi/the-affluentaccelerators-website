# Google Sheets Setup: Central Event Registration Database

This guide covers the **dedicated Google Spreadsheet for Events, Webinars & Masterclasses**.

> **Note:** This spreadsheet operates independently from your Inquiries sheet. Submissions from `events.html` and Event RSVPs flow exclusively into this sheet.

---

## 1. Sheet Overview & Architecture

* **Spreadsheet Name**: `THE AFFLUENTACCELERATORS – EVENTS & REGISTRATION DATABASE`
* **Dedicated Script**: [`google-sheets-events-script.js`](./google-sheets-events-script.js)
* **Dedicated Worksheets**:
  * **`OVERVIEW DASHBOARD`** — Real-time formulas for total events, total registrations, registrations per event, consulting leads, investment readiness, and industry breakdown.
  * **`ALL REGISTRATIONS`** — Central consolidated master sheet with standardized columns for every attendee.
  * **`EVENT 001 – The Investable Business Playbook`** — Inaugural event tab with all 31 diagnostic questions and responses.
  * **`EVENT 002 – [Title]`** — Dynamically created when Event 002 is published or receives its first attendee.

---

## 2. Step-by-Step Setup Instructions (3 Minutes)

### Step 1: Create Your Event Google Sheet
1. Visit [sheets.new](https://sheets.new) in your browser.
2. Title the spreadsheet:
   ```
   THE AFFLUENTACCELERATORS – EVENTS & REGISTRATION DATABASE
   ```

### Step 2: Paste the Events Automation Script
1. In the top Google Sheets menu, click **Extensions** > **Apps Script**.
2. Delete everything inside `Code.gs`.
3. Open [`google-sheets-events-script.js`](./google-sheets-events-script.js) in this repository, copy the entire code, and paste it into `Code.gs`.
4. Click the **Save** icon (diskette).

### Step 3: Run Initial Setup (One-Time)
1. In the toolbar at the top (next to "Debug"), select **`testSetupAndSampleRegistration`** from the dropdown.
2. Click **Run**.
3. Grant permissions when prompted:
   * Click **Review permissions**
   * Select your Google account
   * Click **Advanced** > **Go to Untitled project (unsafe)**
   * Click **Allow**
4. Check your Google Sheet: the **OVERVIEW DASHBOARD**, **ALL REGISTRATIONS**, and **EVENT 001 – The Investable Business Playbook** tabs are built immediately!

### Step 4: Deploy as Web App
1. Click the blue **Deploy** button (top-right) > **New deployment**.
2. Click the gear icon > select **Web app**.
3. Set:
   * **Description**: `The Affluentaccelerators Central Event Hub`
   * **Execute as**: `Me`
   * **Who has access**: `Anyone` *(allows website form submissions to post to your sheet securely without exposing your Google login).*
4. Click **Deploy** and copy your **Web App URL** (starts with `https://script.google.com/macros/s/.../exec`).

### Step 5: Connect in Your Admin Portal
1. Open your private Admin Portal at `/admin.html`.
2. Paste the Web App URL into the **Events Master Google Apps Script Webhook URL** field.
3. Click **Save & Verify URL**.
4. Click **⚡ Test Connection** — a green checkmark will confirm that the spreadsheet is active and ready to stream registrations live!
