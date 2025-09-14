# Project Scripts

This directory contains scripts for managing the application's backend services, specifically for seeding and checking the Firebase environment. These scripts require **Node.js** to run.

## Prerequisites

1.  **Firebase Project**: Ensure you have an active Firebase project.
2.  **Service Account Key**: You need a Firebase service account key (`service-account.json`) to grant these scripts admin access to your Firebase project.
    *   Go to your [Firebase Project Settings](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk).
    *   Select your project.
    *   Go to the **Service accounts** tab.
    *   Click the **"Generate new private key"** button and save the JSON file. **Do not commit this file to your repository.**
3.  **Environment Variable**: These scripts use **Application Default Credentials (ADC)**, which means they load credentials via an environment variable. Before running any script, you must set `GOOGLE_APPLICATION_CREDENTIALS` to the **absolute path** of your downloaded service account key.

    **macOS/Linux:**
    ```bash
    export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account.json"
    ```
    
    **Windows (Command Prompt):**
    ```bash
    set GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your\service-account.json"
    ```

    **Windows (PowerShell):**
    ```bash
    $env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your\service-account.json"
    ```
    Replace the path with the actual path to your key file.

---

## `seed.js`

This script populates your Firestore database with the initial demo data required for the application to function correctly. It will not overwrite existing data.

### How to Run
After setting the environment variable as described above, run:
```bash
node scripts/seed.js
```
The script will connect to your Firebase project and create the following collections with demo documents if they don't already exist:
- `paths`
- `labs`
- `ctfs`
- `teams`

---

## `check-firebase.js`

This script verifies that the core Firebase services (Authentication and Firestore) are enabled and accessible for the project linked to your service account. It's a useful diagnostic tool to ensure your backend is correctly configured.

### How to Run
After setting the environment variable, run:
```bash
node scripts/check-firebase.js
```
The script will output the status of each service, indicating whether it's enabled and accessible or if there are any issues with permissions or setup.
