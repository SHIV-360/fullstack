
export const lawsData = [
    {
        id: 'digital-evidence-standards',
        title: 'Digital Evidence Standards',
        summary: 'Guidelines for identifying, preserving, and presenting digital evidence.',
        icon: 'Scale',
        jurisdiction: 'Federal',
        category: 'Standards',
    },
    {
        id: 'privacy-data-protection',
        title: 'Privacy & Data Protection',
        summary: 'Legal frameworks protecting data handling and privacy rights.',
        icon: 'Shield',
        jurisdiction: 'International',
        category: 'Privacy',
    },
    {
        id: 'owasp-top-10',
        title: 'TOP 10 OWASP',
        summary: 'Understand what OWASP is and how it helps cybersecurity personnel, and its modern value.',
        icon: 'Lock',
        jurisdiction: 'International',
        category: 'Web Security',
    },
    {
        id: 'cybercrime-legislation',
        title: 'Cybercrime Legislation',
        summary: 'Laws prohibiting computer-based crimes and digital fraud.',
        icon: 'Gavel',
        jurisdiction: 'Federal',
        category: 'Criminal Law',
    },
    {
        id: 'chain-of-custody',
        title: 'Chain of Custody',
        summary: 'Legal requirements for evidence handling and documentation.',
        icon: 'FileText',
        jurisdiction: 'Procedural',
        category: 'Evidence Handling',
    },
];

export const caseStudiesData = [
    {
        id: 'corporate-data-breach',
        title: 'Corporate Data Breach Investigation',
        description: 'Investigation of a sophisticated APT attack on a Fortune 500 company.',
        icon: 'Briefcase',
        tags: ['Network Security', 'Advanced'],
        modulesCount: 8,
    },
    {
        id: 'aws-iam-investigation',
        title: 'AWS IAM Investigation',
        description: 'Investigation of a cloud based attack on a Fortune 500 company.',
        icon: 'Server',
        tags: ['Cloud Security', 'Advanced'],
        modulesCount: 12,
    },
    {
        id: 'mobile-financial-fraud',
        title: 'Mobile Device Financial Fraud',
        description: 'Recovery of deleted financial records from an Android device.',
        icon: 'Terminal',
        tags: ['Mobile Forensics', 'Intermediate'],
        modulesCount: 15,
    },
    {
        id: 'email-phishing-campaign',
        title: 'Email Phishing Campaign Analysis',
        description: 'Traced the source of a targeted phishing campaign.',
        icon: 'FileText',
        tags: ['Email Forensics', 'Beginner'],
        modulesCount: 5,
    },
];

export const resourcesData = [
    {
        id: 'digital-forensics-fundamentals',
        title: 'Digital Forensics Fundamentals',
        description: 'Comprehensive introduction to digital forensics principles and practices.',
        type: 'Guide',
        tags: ['Beginner', 'Fundamentals'],
        link: '#',
    },
    {
        id: 'network-analysis-toolkit',
        title: 'Network Analysis Toolkit',
        description: 'Professional-grade network packet analysis and investigation tools.',
        type: 'Tool',
        tags: ['Network', 'Software'],
        link: '#',
    },
    {
        id: 'mobile-forensics-video-course',
        title: 'Mobile Forensics Video Course',
        description: 'In-depth video tutorials on mobile device data extraction and analysis.',
        type: 'Article',
        tags: ['Mobile', 'Video'],
        link: '#',
    },
    {
        id: 'legal-documentation-templates',
        title: 'Legal Documentation Templates',
        description: 'Court-ready templates for evidence reports and instance.',
        type: 'Tool',
        tags: ['Legal', 'Templates'],
        link: '#',
    },
    {
        id: 'malware-analysis-handbook',
        title: 'Malware Analysis Handbook',
        description: 'Advanced techniques for reverse-engineering and malware analysis.',
        type: 'Guide',
        tags: ['Malware', 'Advanced'],
        link: '#',
    },
    {
        id: 'cloud-forensics-checklist',
        title: 'Cloud Forensics Checklist',
        description: 'Step-by-step checklist for investigating cloud-based incidents.',
        type: 'Blog',
        tags: ['Cloud', 'Checklist'],
        link: '#',
    },
];

export const challengesData = [
    {
        id: 'network-traffic-analysis',
        title: 'Network Traffic Analysis',
        category: 'Network Forensics',
        image: {
            src: 'https://picsum.photos/seed/net-traffic/600/400',
            hint: 'network graph',
        },
        difficulty: 'Intermediate',
    },
    {
        id: 'mobile-device-forensics',
        title: 'Mobile Device Forensics',
        category: 'Mobile Forensics',
        image: {
            src: 'https://picsum.photos/seed/mobile-forensics/600/400',
            hint: 'mobile device circuit',
        },
        difficulty: 'Intermediate',
    },
    {
        id: 'email-header-analysis',
        title: 'Email Header Analysis',
        category: 'Email Forensics',
        image: {
            src: 'https://picsum.photos/seed/email-header/600/400',
            hint: 'email code',
        },
        difficulty: 'Advanced',
    },
    {
        id: 'malware-detection',
        title: 'Malware Detection',
        category: 'Malware Analysis',
        image: {
            src: 'https://picsum.photos/seed/malware/600/400',
            hint: 'binary code matrix',
        },
        difficulty: 'Expert',
    }
];

export const leaderboardData = [
    { rank: 1, name: 'Cyber Sentinels', score: 12450 },
    { rank: 2, name: 'Digital Ghosts', score: 12375 },
    { rank: 3, name: 'Null Byte Crew', score: 11100 },
    { rank: 4, name: 'Packet Raiders', score: 10050 },
    { rank: 5, name: 'Team Volatility', score: 9800 },
];

export const teamsData = leaderboardData.map((team, index) => ({
    id: `team-${index + 1}`,
    ...team,
}));

export const recentActivityData = [
    { id: '1', description: 'Completed "Network Analysis" challenge', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: '2', description: 'Started "Mobile Forensics" challenge', timestamp: new Date(Date.now() - 10800000).toISOString() },
    { id: '3', description: 'Achieved "Streak Master" badge', timestamp: new Date(Date.now() - 86400000).toISOString() },
];

export const userProfileData = {
    username: 'Alex Johnson',
    email: 'alex.j@example.com',
    role: 'user',
    subscription: 'pro',
    teamId: 'team-1',
};
