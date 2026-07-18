# Google Apps Script Setup Guide

Follow these steps to connect your website's contact form directly to a Google Sheet.

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Set up the column headers in **Row 1** exactly like this:
   * **A1:** `Timestamp`
   * **B1:** `Name`
   * **C1:** `Email`
   * **D1:** `Type`
   * **E1:** `Company`
   * **F1:** `Message`

## Step 2: Add Apps Script Code
1. In your Google Sheet, click on **Extensions** in the top menu, then select **Apps Script**.
2. Delete any existing code in the editor (`myFunction()`) and paste the following script:

```javascript
function doPost(e) {
  try {
    var jsonString = e.postData.contents;
    var data = JSON.parse(jsonString);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append row: Timestamp | Name | Email | Type | Company | Message
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.email,
      data.type,
      data.company || "N/A",
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (floppy disk) at the top of the editor.

## Step 3: Deploy as a Web App
1. Click the **Deploy** button at the top right, then select **New deployment**.
2. Click the gear icon next to "Select type" and select **Web app**.
3. Fill out the configuration:
   * **Description:** `Vanyara Website Enquiry Handler`
   * **Execute as:** `Me (your-email@gmail.com)`
   * **Who has access:** `Anyone` (Crucial! Otherwise the web app cannot receive submissions from public users).
4. Click **Deploy**.
5. Copy the generated **Web app URL** (it should start with `https://script.google.com/macros/s/...`).

## Step 4: Link to Website
1. Open your project's `.env.local` file (create it in the root folder if it doesn't exist yet).
2. Add the URL you copied:
   ```env
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your_copied_web_app_url_here
   ```
3. Restart your local server (`npm run dev`) to apply the environment variable. Any new submissions on the Contact/Enquiry page will now populate directly inside your Google Sheet in real-time!
