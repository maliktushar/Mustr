// data.jsx — Mock data for the Muster prototype

const SEED_INSPECTIONS = [
  {
    id: 'i1',
    vessel: 'MT Aurora Pacific',
    imo: '9785421',
    type: 'SIRE 2.0',
    company: 'Shell Marine',
    flag: 'PA',
    port: 'Singapore',
    start: '2026-04-22',
    due: '2026-05-04',
    operation: 'Discharging',
    inspector: 'James Holden',
    marineSup: 'A. Petrov',
    techSup: 'M. Singh',
    progress: 0.62,
    answered: 89,
    total: 144,
    status: 'in-progress',
    workflow: 'In Inspection',
    sync: 'synced',
  },
  {
    id: 'i2',
    vessel: 'MV Northern Crown',
    imo: '9612087',
    type: 'RISQ',
    company: 'Rightship',
    flag: 'LR',
    port: 'Rotterdam',
    start: '2026-04-18',
    due: '2026-04-30',
    operation: 'Loading',
    inspector: 'Linh Tran',
    marineSup: 'R. Okonkwo',
    techSup: 'D. Costa',
    progress: 1,
    answered: 168,
    total: 168,
    status: 'completed',
    workflow: 'Submitted',
    sync: 'synced',
  },
  {
    id: 'i3',
    vessel: 'MT Helios Star',
    imo: '9723318',
    type: 'CDI',
    company: 'CDI Marine',
    flag: 'MH',
    port: 'Houston',
    start: '2026-04-25',
    due: '2026-05-08',
    operation: 'Bunkering',
    inspector: 'Maya Carlsen',
    marineSup: 'T. Bell',
    techSup: 'P. Yamamoto',
    progress: 0.34,
    answered: 41,
    total: 122,
    status: 'in-progress',
    workflow: 'Draft',
    sync: 'pending',
  },
  {
    id: 'i4',
    vessel: 'MV Sapphire Dawn',
    imo: '9854712',
    type: 'SIRE 2.0',
    company: 'BP Shipping',
    flag: 'SG',
    port: 'Fujairah',
    start: '2026-04-12',
    due: '2026-04-26',
    operation: 'STS',
    inspector: 'Diego Alvarez',
    marineSup: 'I. Nakamura',
    techSup: 'S. Klein',
    progress: 0.12,
    answered: 17,
    total: 144,
    status: 'in-progress',
    workflow: 'Pre-inspection',
    sync: 'pending',
  },
  {
    id: 'i5',
    vessel: 'MT Cygnus Voyager',
    imo: '9801255',
    type: 'SIRE 2.0',
    company: 'ExxonMobil',
    flag: 'GR',
    port: 'Antwerp',
    start: '2026-04-05',
    due: '2026-04-20',
    operation: 'Idle',
    inspector: 'Ana Ribeiro',
    marineSup: 'K. Owusu',
    techSup: 'L. Bauer',
    progress: 1,
    answered: 144,
    total: 144,
    status: 'completed',
    workflow: 'Reviewed',
    sync: 'synced',
  },
];

const ROVIQ = ['Anywhere', 'Bridge', 'Accommodation', 'Cargo Control Room', 'Pump Room', 'Engine Room', 'External Decks', 'Hold/Cargo'];

const CHAPTERS = [
  { id: 'c1', num: '1', name: 'Certification & Documentation', count: 18 },
  { id: 'c2', num: '2', name: 'Crew Management', count: 22 },
  { id: 'c3', num: '3', name: 'Navigation & Comms', count: 26 },
  { id: 'c4', num: '4', name: 'Safety Management', count: 31 },
  { id: 'c5', num: '5', name: 'Pollution Prevention', count: 14 },
  { id: 'c6', num: '6', name: 'Maritime Security', count: 11 },
  { id: 'c7', num: '7', name: 'Cargo & Ballast', count: 22 },
];

const QUESTIONS = [
  {
    ref: '1.1', chapter: 'c1', roviq: 'Bridge', type: 'Core',
    text: 'Were all statutory certificates current, valid, and free of any outstanding conditions or memoranda from the flag state or classification society?',
    risk: 'High', equipment: ['All vessel types'], rank: 'Master', vesselType: 'Any',
  },
  {
    ref: '1.2', chapter: 'c1', roviq: 'Bridge', type: 'Regulatory',
    text: 'Was the Document of Compliance (DOC) covering this vessel type displayed and matched to the Safety Management Certificate?',
    risk: 'Moderate', equipment: ['SMS'], rank: 'Master', vesselType: 'Any',
  },
  {
    ref: '1.3', chapter: 'c1', roviq: 'Cargo Control Room', type: 'Core',
    text: 'Were P&I and Hull & Machinery insurance certificates onboard, valid, and aligned with the trading limits declared in the voyage orders?',
    risk: 'Low', equipment: ['Documentation'], rank: 'Chief Officer', vesselType: 'Any',
  },
  {
    ref: '1.4', chapter: 'c1', roviq: 'Bridge', type: 'Core',
    text: 'Were the Continuous Synopsis Record and ITU radio licence available, current, and matching the vessel\'s declared particulars?',
    risk: 'Moderate', equipment: ['Comms'], rank: 'Second Officer', vesselType: 'Any',
  },
  {
    ref: '2.1', chapter: 'c2', roviq: 'Accommodation', type: 'Core',
    text: 'Did the crew matrix demonstrate that minimum safe-manning requirements were met with valid certificates of competency for each rank onboard?',
    risk: 'High', equipment: ['Crew matrix'], rank: 'Master', vesselType: 'Any',
  },
  {
    ref: '2.2', chapter: 'c2', roviq: 'Accommodation', type: 'Core',
    text: 'Were rest-hour records for the previous 30 days available, complete, and free of patterns indicating non-compliance with MLC requirements?',
    risk: 'High', equipment: ['MLC'], rank: 'Chief Officer', vesselType: 'Any',
  },
  {
    ref: '3.1', chapter: 'c3', roviq: 'Bridge', type: 'Core',
    text: 'Were ECDIS chart corrections up to date, with backup arrangements documented and tested within the past month?',
    risk: 'High', equipment: ['ECDIS'], rank: 'Second Officer', vesselType: 'Any',
  },
];

const COMPANIES = ['Shell Marine', 'BP Shipping', 'ExxonMobil', 'Chevron', 'Rightship', 'CDI Marine', 'TotalEnergies', 'Vitol', 'Trafigura'];
const FLAGS = [
  { code: 'PA', name: 'Panama' }, { code: 'LR', name: 'Liberia' }, { code: 'MH', name: 'Marshall Islands' },
  { code: 'SG', name: 'Singapore' }, { code: 'GR', name: 'Greece' }, { code: 'CY', name: 'Cyprus' },
  { code: 'UK', name: 'United Kingdom' }, { code: 'NO', name: 'Norway' },
];
const TYPES = ['SIRE 2.0', 'RISQ', 'CDI'];
const OPERATIONS = ['Discharging', 'Loading', 'STS', 'Idle', 'Bunkering'];

const VESSEL_TYPES = ['Bulk Grain', 'Cellular Container', 'General Cargo', 'Self-Unloading', 'Trans-shipment', 'Solid Bulk (other)', 'CNG', 'LPG', 'LNG'];
const EQUIPMENT_FOCUS = ['Dual Fuel — Ammonia', 'Gantry Cranes', 'Ship-to-Ship Operation', 'Ice / Polar Water'];
const CREW_RANKS = ['Master', 'Chief Officer', 'Second Officer', '1st Engineer', '2nd Engineer', 'SSO', 'Deck Rating'];
const RISK_LEVELS = ['High', 'Moderate', 'Low'];

const SUBJECT_OF_CONCERN = ['Hardware', 'Process', 'Human'];

// Hardware: 3-level hierarchical tree (System > Sub-system > Item)
const SOC_HARDWARE_TREE = [
  { id: 'hull', name: 'Hull', children: [
    { id: 'hull-tanks', name: 'Tanks', children: [
      { id: 'hull-tanks-er', name: 'Engine room tanks' },
      { id: 'hull-tanks-cb', name: 'Cargo & ballast tanks' },
      { id: 'hull-tanks-fr', name: 'Fresh water tanks' },
    ]},
    { id: 'hull-accom', name: 'Accommodation block', children: [
      { id: 'hull-accom-int', name: 'Internal spaces' },
      { id: 'hull-accom-ext', name: 'External surfaces' },
    ]},
    { id: 'hull-out', name: 'Hull outfitting', children: [
      { id: 'hull-out-rail', name: 'Railings & ladders' },
      { id: 'hull-out-deck', name: 'Deck fittings' },
    ]},
  ]},
  { id: 'mach', name: 'Machinery', children: [
    { id: 'mach-prop', name: 'Propulsion', children: [
      { id: 'mach-prop-me', name: 'Main engine' },
      { id: 'mach-prop-shaft', name: 'Shafting' },
    ]},
    { id: 'mach-aux', name: 'Auxiliaries', children: [
      { id: 'mach-aux-gen', name: 'Generators' },
      { id: 'mach-aux-pump', name: 'Pumps' },
    ]},
  ]},
  { id: 'nav', name: 'Navigation', children: [
    { id: 'nav-bridge', name: 'Bridge equipment', children: [
      { id: 'nav-bridge-ecdis', name: 'ECDIS' },
      { id: 'nav-bridge-radar', name: 'Radar' },
      { id: 'nav-bridge-gyro', name: 'Gyrocompass' },
    ]},
  ]},
  { id: 'safety', name: 'Safety equipment', children: [
    { id: 'safety-ff', name: 'Firefighting', children: [
      { id: 'safety-ff-co2', name: 'CO2 system' },
      { id: 'safety-ff-foam', name: 'Foam system' },
    ]},
    { id: 'safety-ls', name: 'Life-saving', children: [
      { id: 'safety-ls-boat', name: 'Lifeboats' },
      { id: 'safety-ls-raft', name: 'Liferafts' },
    ]},
  ]},
];

// Process: also a tree
const SOC_PROCESS_TREE = [
  { id: 'sms', name: 'SMS procedures', children: [
    { id: 'sms-ops', name: 'Operational', children: [
      { id: 'sms-ops-cargo', name: 'Cargo operations' },
      { id: 'sms-ops-bunker', name: 'Bunkering' },
    ]},
    { id: 'sms-emer', name: 'Emergency', children: [
      { id: 'sms-emer-fire', name: 'Fire response' },
      { id: 'sms-emer-aban', name: 'Abandon ship' },
    ]},
  ]},
  { id: 'maint', name: 'Maintenance', children: [
    { id: 'maint-pms', name: 'PMS', children: [
      { id: 'maint-pms-sched', name: 'Scheduling' },
      { id: 'maint-pms-record', name: 'Record-keeping' },
    ]},
  ]},
  { id: 'docs', name: 'Documentation', children: [
    { id: 'docs-cert', name: 'Certificates', children: [
      { id: 'docs-cert-stat', name: 'Statutory' },
      { id: 'docs-cert-class', name: 'Classification' },
    ]},
  ]},
];

// Human: tree
const SOC_HUMAN_TREE = [
  { id: 'crew', name: 'Crew', children: [
    { id: 'crew-deck', name: 'Deck dept', children: [
      { id: 'crew-deck-master', name: 'Master' },
      { id: 'crew-deck-co', name: 'Chief Officer' },
      { id: 'crew-deck-2o', name: 'Second Officer' },
    ]},
    { id: 'crew-eng', name: 'Engine dept', children: [
      { id: 'crew-eng-ce', name: 'Chief Engineer' },
      { id: 'crew-eng-1e', name: 'First Engineer' },
    ]},
  ]},
  { id: 'training', name: 'Training & competence', children: [
    { id: 'training-fam', name: 'Familiarisation', children: [
      { id: 'training-fam-ship', name: 'Ship-specific' },
      { id: 'training-fam-equip', name: 'Equipment-specific' },
    ]},
  ]},
];

const SOC_TREES = {
  Hardware: SOC_HARDWARE_TREE,
  Process: SOC_PROCESS_TREE,
  Human: SOC_HUMAN_TREE,
};

// Single flat list for Nature of Concern
const NOC_LIST = [
  'No maintenance task developed',
  'Maintenance task available, not completed',
  'Maintenance task completed but ineffective',
  'Equipment defective',
  'Equipment missing',
  'Calibration overdue',
  'Wear & tear beyond tolerance',
  'Procedure not followed',
  'Procedure missing or unclear',
  'Record incomplete or missing',
  'Training gap identified',
  'Crew unfamiliar with equipment',
  'Communication failure',
  'Fatigue / rest-hour breach',
];

// Legacy reference (still exported for back-compat)
const NATURE_OF_CONCERN = { Hardware: NOC_LIST, Process: NOC_LIST, Human: NOC_LIST };

Object.assign(window, {
  SEED_INSPECTIONS, ROVIQ, CHAPTERS, QUESTIONS,
  COMPANIES, FLAGS, TYPES, OPERATIONS,
  VESSEL_TYPES, EQUIPMENT_FOCUS, CREW_RANKS, RISK_LEVELS,
  SUBJECT_OF_CONCERN, NATURE_OF_CONCERN,
  SOC_TREES, NOC_LIST,
});
