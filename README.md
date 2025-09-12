# CyberPath - Cybersecurity Learning Platform [Frontend]

Welcome to the frontend of CyberPath, an interactive, gamified platform designed for learning cybersecurity. This project is a standalone demonstration, fully functional without a backend, using mock data to showcase the complete user experience.

**Created by: Paarth Vakharia | @Designerpro13**

---

## Architecture Overview

This repository contains the **Next.js frontend**. The backend (e.g., written in Go, Node.js, etc.) is expected to be a separate project.

The frontend connects to a shared **Firebase project**, which handles:
- **Authentication**: Manages user sign-up and login.
- **Firestore**: Acts as the database for the application.

## Getting Started

To get a local copy up and running, follow these simple steps.

### 1. Install Dependencies
First, install the necessary Node.js packages.
```sh
npm install
```

### 2. Environment Configuration
This project requires a Firebase backend to run.

1.  **Create `.env.local`**: In the root of the project, create a file named `.env.local`.
2.  **Copy from Example**: Copy the contents of `.env.example` into your new `.env.local` file.
3.  **Add Your Credentials**: Fill in the values with your actual Firebase Web App configuration keys. You can find these in your Firebase project settings.

### 3. Run the Frontend
Once your environment is configured, run the development server:
```sh
npm run dev
```
Open [http://localhost:9002](http://localhost:9002) with your browser to see the result. The app will connect to your Firebase project for authentication and data.

---

## Backend Integration Guide

If you are setting up a backend (e.g., in Go), you will need to create and configure your own Firebase project.

### Step 1: Create and Configure a Firebase Project

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Enable Services**: In your new project, enable **Authentication** (with the Email/Password provider) and **Firestore Database** (start in production mode).
3.  **Update Firestore Security Rules**: Go to the **Rules** tab in Firestore and paste the following. This allows public read access for common data and restricts users to writing only their own information.
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Publicly readable collections
        match /(paths|labs|ctfs|teams|laws|casestudies|resources)/{docId} {
          allow read: if true;
          allow write: if false; // Secure by default
        }

        // Users can read/write their own document
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```
    Click **Publish**.

### Step 2: Configure Your Go Backend

Your backend server needs administrative access to Firebase. This is achieved using a **Service Account**.

1.  **Generate a Service Account Key**:
    *   In your Firebase project settings, go to the **Service Accounts** tab.
    *   Click **"Generate new private key"**. This will download a `service-account.json` file.
    *   **Keep this file secure in your backend project. Do not expose it on the frontend.**

2.  **Using the Firebase Admin SDK for Go**:
    *   Add the SDK to your Go project:
        ```sh
        go get firebase.google.com/go/v4
        ```
    *   Initialize the Admin SDK in your Go application using the `service-account.json` file.
        ```go
        // main.go
        import (
            "context"
            "log"

            firebase "firebase.google.com/go/v4"
            "google.golang.org/api/option"
        )

        func main() {
            opt := option.WithCredentialsFile("path/to/your/service-account.json")
            app, err := firebase.NewApp(context.Background(), nil, opt)
            if err != nil {
                log.Fatalf("error initializing app: %v\n", err)
            }
            // You can now use 'app' to access Firebase services
        }
        ```

3.  **Backend Authentication Flow (Example)**:
    *   The **frontend** will use the regular Firebase SDK to sign in a user. After a successful login, it gets an **ID Token**.
    *   The frontend then sends this ID Token in the `Authorization` header of its API requests to your Go backend (e.g., `Authorization: Bearer <ID_TOKEN>`).
    *   Your **Go backend** receives the request, extracts the token, and uses the Admin SDK to verify it.
        ```go
        // Example: Middleware in your Go router
        client, err := app.Auth(context.Background())
        if err != nil {
            //... handle error
        }
        
        idToken := //... extract from Authorization header
        token, err := client.VerifyIDToken(context.Background(), idToken)
        if err != nil {
            //... handle invalid token (e.g., return 401 Unauthorized)
        }
        
        // Token is valid. 'token.UID' contains the user's ID.
        log.Printf("Verified ID token for user: %s", token.UID)
        ```
    *   Once verified, your Go handler can proceed to interact with Firestore or perform other business logic on behalf of the authenticated user.

### Step 4: Seed the Database
Your new Firestore database is empty. Use the `seed.js` script to populate it with initial data.
*   Follow the instructions in `scripts/README.md` to run the seed script.

---

## Features

*   **Interactive Learning Paths**: Structured modules to guide users from beginner to advanced topics.
*   **Hands-On Practice Labs**: A collection of labs simulating real-world security challenges.
*   **Competitive CTFs**: Engage in Capture The Flag events.
*   **User Dashboard**: Track progress, view activity, and manage team information.
*   **Theming**: Light and Dark mode support with multiple themes.
*   **Fully Responsive**: Designed to work seamlessly on desktop, tablet, and mobile devices.

---

## Tech Stack

This project is built with a modern, performant, and scalable tech stack:

*   **Framework**: [Next.js](https://nextjs.org/) (v15) with App Router
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/) - A collection of beautifully designed, accessible, and customizable components.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth).
*   **Database**: [Firestore](https://firebase.google.com/docs/firestore).
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation.
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## File Structure

Here is an overview of the key directories and their purpose:

```
.
├── scripts/                    # Backend utility scripts (seeding, checking)
│
├── src
│   ├── app/                      # Main application routes (App Router)
│   │   ├── (pages)/              # Main pages (home, learn, practice, etc.)
│   │   ├── dashboard/            # User dashboard layout and pages
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   │
│   ├── components/               # Reusable components
│   │   ├── layout/               # Global layout components (Header, Footer)
│   │   ├── ui/                   # Core UI components from ShadCN
│   │   └── animations/           # Animation components
│   │
│   ├── context/                  # React Context providers (e.g., AuthContext)
│   │
│   ├── hooks/                    # Custom React hooks (e.g., useToast)
│   │
│   ├── lib/                      # Utility functions and library instances
│   │   ├── firebase.ts           # Firebase SDK initialization (reads from .env.local)
│   │   └── utils.ts              # Helper functions (e.g., cn for classnames)
│   │
│   └── styles/                   # Global styles and theme configuration
│
├── public/                       # Static assets (images, fonts, etc.)
│
└── ...                           # Other config files (tailwind, next.config, etc.)

```