# Backend Development Guidelines & Rules

## Project Context
This directory (`backend`) contains the Google Apps Script (GAS) code (`code.js`) used as the backend for the IBL 2K26 Registration Portal. The script receives form submissions via a `doPost` endpoint, uploads files to Google Drive, and logs the applicant's data into a Google Spreadsheet.

---

## Upcoming Implementation Rules: General Questions & Essays

Based on the recent frontend architectural changes (adding 5 General Questions from BoE and 2 General Essay Questions in the "Informasi Umum" section), the backend **must be adapted** to process the new payload structure.

When implementing the backend adaptation, you **must adhere to the following rules**:

### 1. Payload Extraction (`doPost` in `code.js`)
- Ensure that the extraction of the payload from `JSON.parse(e.postData.contents)` captures the new keys:
  - `kelebihanKekurangan` (String)
  - `halUnik` (String)
  - `generalAnswers` (Array of objects `{ question, answer }`)
- Provide safe fallback values (e.g., `""` or `[]`) to prevent undefined errors.

### 2. Dynamic Headers Generation
- When initializing a new subdivision sheet, the header array must be updated to inject 7 new columns **before** the division-specific questions. 
- The newly injected headers should be exactly:
  - `"Kelebihan & Kekurangan"`
  - `"Hal Unik"`
  - `"General Q: Apa yang kamu ketahui tentang IBL?"`
  - `"General Q: Apa motivasi dan alasan kamu untuk mendaftar sebagai staff IBL2K26?"`
  - `"General Q: Apa kesibukan kamu pada semester depan?"`
  - `"General Q: Skala prioritas IBL2K26 bagi kamu!"`
  - `"General Q: Komitmen apa yang bisa kamu berikan ketika nantinya kamu diterima sebagai staff dari IBL2K26?"`

### 3. Data Mapping & Array Indexing
- Map the values of `kelebihanKekurangan` and `halUnik` strictly to their newly defined headers using the `getHeaderColIndex("...")` function.
- Iterate over the `generalAnswers` array received from the frontend, and map them to the corresponding `"General Q: ..."` columns.

### 4. Master Sheet Logging (`logToMasterSheet`)
- The `logToMasterSheet` function collects a centralized summary of all applicants regardless of their division.
- You must update its hardcoded `headers` array to include the 2 new essay headers and the 5 new general question headers.
- Update the `row` array construction to pull these 7 new fields correctly and place them in the exact index corresponding to the headers.

### 5. Backup Service (`backupToCsv`)
- Ensure the `backupToCsv` function also recognizes the 7 new headers.
- Add the 7 headers to the `baselineHeaders` or a new intermediate header array.
- Update the `valueMap` population logic so that the backup CSV accurately reflects the new essay and general question answers.

### 6. Frontend API Contract (`frontend/lib/api.ts`)
- Although located in the frontend, `api.ts` is the bridge to this backend. When adapting the backend, you must simultaneously modify `api.ts` to ensure it packs `kelebihanKekurangan`, `halUnik`, and `pertanyaanGeneral` (mapped into a `generalAnswers` array structure) into the POST request body.
