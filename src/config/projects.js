// src/config/projects.js

export const projects = [
  
  {
    id: 'ballotlookup',
    name: 'BallotLookup Desktop App',
    role: 'Python Desktop App • Tkinter',
    period: '2025',
    summary:
      'GUI tool that locates the correct ballot PDF by precinct code and language, supporting nested ballot-type folders and configurable paths.',
    highlights: [
      'Precinct format support: ####.### with language mapping',
      'Config-driven paths for primary/secondary locations and ballot types',
      'Logging, error handling, and PyInstaller builds for distribution',
      'Built for the King County - Elections Voter Services Vote Centers'
    ],
    tech: ['Python', 'Tkinter', 'PyInstaller', 'Config-driven design'],
    tags: ['Desktop app', 'Civic tech'],
    links: {
      github: 'https://github.com/durangomac/ballotlookup',
      live: null
    },
    status: 'Prototype'
  },
  {
    id: 'electoral-college-app',
    name: 'Electoral College Simulator',
    role: 'Full-stack Engineer • Angular 20',
    period: '2025 – Present',
    summary:
      'Interactive web app that models Electoral College outcomes with district-level splits, statewide vs proportional modes, and multiple election years.',
    highlights: [
      'Loads TopoJSON congressional district maps for multiple cycles',
      'Supports national proportional and per-state allocation modes',
      'Built to explore “what-if” scenarios and EV reform ideas'
    ],
    tech: ['Angular', 'TypeScript', 'TopoJSON', 'D3', 'Node'],
    tags: ['Visualization', 'Maps', 'Elections'],
    links: {
      github: 'https://github.com/durangomac/electoral-college',
      live: null
    },
    status: 'In progress'
  },
  {
    id: 'congress-bff',
    name: 'Congress BFF API',
    role: 'Backend for Frontend (BFF) • AWS Lambda + Python',
    period: '2025 – Present',
    summary:
      'Serverless backend that aggregates Congress.gov data, shapes it into metrics by party and bill outcome, and exposes a simplified API for a React front-end.',
    highlights: [
      'Handles pagination across congressional sessions and bill types',
      'Precomputes and caches metrics into S3 to avoid API rate limits',
      'Designed for future district-level and trend visualizations'
    ],
    tech: ['Python', 'AWS Lambda', 'API Gateway', 'S3', 'GitHub Actions'],
    tags: ['Civic tech', 'Data engineering', 'API design'],
    links: {
      github: null, // e.g. 'https://github.com/you/congress-bff'
      live: null    // e.g. 'https://congress.macpatterson.com'
    },
    status: 'In progress'
  },
  {
    id: 'all-time-guard-infra',
    name: 'All Time Guard',
    role: 'Director of IT • Network & Cloud Architecture',
    period: '2024',
    summary:
      'Network and cloud backbone for a security/patrol startup, including VLAN design, secure remote access, identity, and observability.',
    highlights: [
      'Netgear PR60X + VLANs, RADIUS, and BIND9 DNS for on-prem routing',
      'Azure Entra ID / Intune for device and identity management',
      'Multi-site camera monitoring, using Icenta AI technology'
    ],
    tech: ['Netgear PR60X', 'Azure', 'Icenta AI'],
    tags: ['Networking', 'Security', 'DevOps', 'AI'],
    links: {
      github: null,
      live: null
    },
    status: 'Operational'
  }
];

// If you want a default export:
export default projects;