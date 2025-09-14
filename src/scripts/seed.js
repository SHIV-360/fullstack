
/* eslint-disable @typescript-eslint/no-var-requires */
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

// --- IMPORTANT ---
// This script now uses Application Default Credentials (ADC).
// Before running, ensure you have set the GOOGLE_APPLICATION_CREDENTIALS
// environment variable to the path of your service account key file.
//
// Example (macOS/Linux):
// export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account.json"
//
// Example (Windows PowerShell):
// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\\path\\to\\your\\service-account.json"

let app;

try {
  console.log('Initializing Firebase Admin SDK...');
  app = initializeApp();
  console.log('Firebase Admin SDK initialized successfully using Application Default Credentials.');
} catch (error) {
  console.error('Firebase Admin SDK initialization failed.');
  console.error('Please ensure the GOOGLE_APPLICATION_CREDENTIALS environment variable is set correctly.');
  console.error(error);
  process.exit(1);
}

const db = getFirestore(app);

// --- Data Definitions ---

const paths = [
  {
    id: 'digital-forensics-fundamentals',
    title: 'Digital Forensics Fundamentals',
    description: 'Learn the core principles of digital forensics, including evidence handling, chain of custody, and the forensic process.',
    category: 'Forensics',
    icon: 'Shield',
    href: '/learn/digital-forensics-fundamentals',
    tags: ['Beginner', 'Forensics', 'Investigation'],
    modulesCount: 4,
    modules: [
      {
        title: 'Module 1: Introduction to Digital Forensics',
        description: 'Understanding the goals and principles of digital forensics.',
        tasks: [
          { title: 'What is Digital Forensics?', completed: true, type: 'reading' },
          { title: 'The Forensic Process', completed: true, type: 'reading' },
          { title: 'Chain of Custody', completed: false, type: 'lab' },
        ],
      },
      {
        title: 'Module 2: Evidence Acquisition',
        description: 'Learn how to properly acquire digital evidence from various sources.',
        tasks: [
          { title: 'Data Acquisition Concepts', completed: false, type: 'reading' },
          { title: 'Creating a Forensic Image', completed: false, type: 'lab' },
          { title: 'Volatile vs. Non-Volatile Data', completed: false, type: 'reading' },
        ],
      },
    ]
  },
  {
    id: 'memory-forensics',
    title: 'Memory Forensics',
    description: 'Dive into the art of analyzing volatile memory (RAM) to uncover runtime system activity.',
    category: 'Forensics',
    icon: 'Cpu',
    href: '/learn/memory-forensics',
    tags: ['Intermediate', 'Forensics', 'Memory Analysis'],
    modulesCount: 5,
  },
  {
    id: 'file-system-forensics',
    title: 'File System Forensics',
    description: 'Explore the details of common file systems to recover deleted files and investigate user activity.',
    category: 'Forensics',
    icon: 'FileCode',
    href: '/learn/file-system-forensics',
    tags: ['Intermediate', 'Forensics', 'File Systems'],
    modulesCount: 6,
  },
  {
    id: 'network-forensics',
    title: 'Network Forensics',
    description: 'Learn to capture and analyze network traffic to investigate security incidents.',
    category: 'Networking',
    icon: 'Network',
    href: '/learn/network-forensics',
    tags: ['Intermediate', 'Forensics', 'Networking'],
    modulesCount: 8,
  },
  {
    id: 'incident-response-analyst',
    title: 'Incident Response Analyst',
    description: 'A comprehensive path covering the skills needed to respond to and investigate cybersecurity incidents.',
    category: 'Career Path',
    icon: 'Siren',
    href: '/learn/incident-response-analyst',
    tags: ['DFIR', 'Blue Team', 'Career'],
    modulesCount: 20,
  }
];

const labs = [
  { id: 'volatile-data-collection', title: 'Volatile Data Collection', category: 'Forensics', difficulty: 'Easy', image: { src: 'https://picsum.photos/seed/volatile-data/600/400', hint: 'terminal commands' } },
  { id: 'analyzing-memory-dumps', title: 'Analyzing Memory Dumps', category: 'Memory Forensics', difficulty: 'Medium', image: { src: 'https://picsum.photos/seed/memory-dumps/600/400', hint: 'hexadecimal data' } },
  { id: 'ntfs-forensics', title: 'NTFS Forensics', category: 'File System Forensics', difficulty: 'Hard', image: { src: 'https://picsum.photos/seed/ntfs-forensics/600/400', hint: 'file system structure' } },
  { id: 'packet-capture-analysis', title: 'Packet Capture Analysis', category: 'Network Forensics', difficulty: 'Medium', image: { src: 'https://picsum.photos/seed/pcap-analysis/600/400', hint: 'network traffic graph' } },
  { id: 'log-analysis', title: 'Log Analysis', category: 'Incident Response', difficulty: 'Easy', image: { src: 'https://picsum.photos/seed/log-analysis/600/400', hint: 'server log files' } },
  { id: 'malware-triage', title: 'Malware Triage', category: 'Malware Analysis', difficulty: 'Hard', image: { src: 'https://picsum.photos/seed/malware-triage/600/400', hint: 'disassembled code' } },
];

const ctfs = [
    {
        id: 'the-huxley-case',
        title: 'The Huxley Case',
        organizer: 'DFIR Collective',
        prize: '$7,500',
        participants: 950,
        startTime: Timestamp.fromDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)), // 2 days ago
        endTime: Timestamp.fromDate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)), // 5 days from now
        image: { src: 'https://picsum.photos/seed/huxley-case/800/400', hint: 'detective board' },
        status: 'live',
    },
    {
        id: 'project-nightfall',
        title: 'Project: Nightfall',
        organizer: 'Cyber Infiltrators',
        prize: '$3,000',
        participants: 621,
        startTime: Timestamp.fromDate(new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)), // 12 days from now
        endTime: Timestamp.fromDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)), // 14 days from now
        image: { src: 'https://picsum.photos/seed/nightfall/800/400', hint: 'dark city skyline' },
        status: 'upcoming',
    },
     {
        id: 'artifact-hunt',
        title: 'Artifact Hunt',
        organizer: 'Forensics Guild',
        prize: '$1,500',
        participants: 430,
        startTime: Timestamp.fromDate(new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)), // 25 days from now
        endTime: Timestamp.fromDate(new Date(Date.now() + 26 * 24 * 60 * 60 * 1000)), // 26 days from now
        image: { src: 'https://picsum.photos/seed/artifact-hunt/800/400', hint: 'ancient map scroll' },
        status: 'upcoming',
    }
]

const teams = [
    { name: 'The Artifacts', score: 12500, rank: 1 },
    { name: 'Memory Scrapers', score: 11800, rank: 2 },
    { name: 'Packet Sniffers', score: 11540, rank: 3 },
    { name: 'The Sleuths', score: 10900, rank: 4 },
    { name: 'File Carvers', score: 9250, rank: 5 },
    { name: 'Log Miners', score: 8800, rank: 6 },
    { name: 'Hex Editors', score: 8650, rank: 7 },
    { name: 'The Chain of Custody', score: 8210, rank: 8 },
    { name: 'Data Recovery Unit', score: 7900, rank: 9 },
    { name: 'Timeline Analysts', score: 7500, rank: 10 },
    { name: 'The Investigators', score: 600, rank: 220, members: [] } // Example user's team
]

const laws = [
    {
        id: 'cfaa',
        title: 'Computer Fraud and Abuse Act (CFAA)',
        summary: 'The primary federal anti-hacking law. It criminalizes accessing a computer without authorization.',
        jurisdiction: 'United States',
        category: 'Cybercrime',
    },
    {
        id: 'ecpa',
        title: 'Electronic Communications Privacy Act (ECPA)',
        summary: 'Extends government restrictions on wiretaps to include electronic data transmissions.',
        jurisdiction: 'United States',
        category: 'Privacy',
    },
    {
        id: 'gdpr',
        title: 'General Data Protection Regulation (GDPR)',
        summary: 'A regulation in EU law on data protection and privacy for all individuals within the European Union.',
        jurisdiction: 'European Union',
        category: 'Data Protection',
    }
];

const casestudies = [
    {
        id: 'stuxnet',
        title: 'The Stuxnet Worm',
        description: 'An in-depth analysis of the first known digital weapon to cause physical destruction.',
        icon: 'Network',
        tags: ['Malware', 'Critical Infrastructure', 'Nation-State'],
        modulesCount: 7,
        href: '/case-studies/stuxnet'
    },
    {
        id: 'equifax-breach',
        title: 'Equifax Data Breach',
        description: 'Investigating the massive 2017 data breach that exposed the data of 147 million people.',
        icon: 'Database',
        tags: ['Data Breach', 'Vulnerability', 'Corporate'],
        modulesCount: 5,
        href: '/case-studies/equifax-breach'
    }
];

const resources = [
    {
        id: 'volatility-framework',
        title: 'Volatility Framework',
        description: 'An open-source memory forensics framework for incident response and malware analysis.',
        type: 'Tool',
        link: 'https://www.volatilityfoundation.org/',
        tags: ['Memory Forensics', 'Open Source', 'DFIR']
    },
    {
        id: 'nist-cyber-framework',
        title: 'NIST Cybersecurity Framework',
        description: 'A set of standards, guidelines, and best practices to manage cybersecurity-related risk.',
        type: 'Article',
        link: 'https://www.nist.gov/cyberframework',
        tags: ['Framework', 'Standards', 'Gov']
    },
    {
        id: 'krebsonsecurity',
        title: 'Krebs on Security',
        description: 'In-depth security news and investigation from Brian Krebs.',
        type: 'Blog',
        link: 'https://krebsonsecurity.com/',
        tags: ['News', 'Investigation', 'Blog']
    }
]


/**
 * --- User Data Structure ---
 * It's recommended to structure your \`users/{uid}\` documents like this.
 * The authentication process already creates the base user. You would add to it.
 * 
 * {
 *   uid: "firebase-auth-uid",
 *   username: "Alice",
 *   email: "alice@example.com",
 *   role: "user", // or "admin"
 *   subscription: "free", // or "pro"
 *   teamId: "the-investigators", // ID of the team they belong to
 *   hasLearningData: true, // A flag to check if they have activity
 *   createdAt: Timestamp,
 * 
 *   // Subcollections:
 *   // users/{uid}/ongoingPaths/{pathId} -> { progress: 50, lastAccessed: Timestamp }
 *   // users/{uid}/activities/{activityId} -> { description: "Completed 'Volatile Data Collection' lab", timestamp: Timestamp }
 * }
 */


// --- Seeding Logic ---

async function seedCollection(collectionName, data) {
  console.log(`\nChecking collection: ${collectionName}`);
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.limit(1).get();

  if (!snapshot.empty) {
    console.log(`Collection "${collectionName}" already contains data. Skipping seeding.`);
    return;
  }

  console.log(`Seeding ${collectionName}...`);
  const batch = db.batch();
  data.forEach((item) => {
    const docId = item.id || item.name.toLowerCase().replace(/\s+/g, '-');
    const docRef = collectionRef.doc(docId);
    // Remove id from the object if it exists before setting
    const { id, ...itemData } = item;
    batch.set(docRef, itemData);
  });

  await batch.commit();
  console.log(`Seeded ${data.length} documents into "${collectionName}".`);
}

async function main() {
  try {
    await seedCollection('paths', paths);
    await seedCollection('labs', labs);
    await seedCollection('ctfs', ctfs);
    await seedCollection('teams', teams);
    await seedCollection('laws', laws);
    await seedCollection('casestudies', casestudies);
    await seedCollection('resources', resources);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nNOTE: User data structure is provided as a comment in this script. You will need to create user documents (or have your app create them on signup) to test user-specific features.');
  } catch (error) {
    console.error('\n❌ An error occurred during database seeding:');
    console.error(error);
    process.exit(1);
  }
}

main();
