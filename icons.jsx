// icons.jsx — Shared icon set for Muster app

const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 1.8 }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'search': return (<svg {...props}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>);
    case 'filter': return (<svg {...props}><path d="M3 6h18M6 12h12M10 18h4"/></svg>);
    case 'sort': return (<svg {...props}><path d="M7 4v16M3 8l4-4 4 4M17 20V4M21 16l-4 4-4-4"/></svg>);
    case 'plus': return (<svg {...props}><path d="M12 5v14M5 12h14"/></svg>);
    case 'minus': return (<svg {...props}><path d="M5 12h14"/></svg>);
    case 'close': return (<svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>);
    case 'check': return (<svg {...props}><path d="M5 12.5l5 5L20 7"/></svg>);
    case 'chevron-left': return (<svg {...props}><path d="M15 6l-6 6 6 6"/></svg>);
    case 'chevron-right': return (<svg {...props}><path d="M9 6l6 6-6 6"/></svg>);
    case 'chevron-down': return (<svg {...props}><path d="M6 9l6 6 6-6"/></svg>);
    case 'chevron-up': return (<svg {...props}><path d="M6 15l6-6 6 6"/></svg>);
    case 'arrow-left': return (<svg {...props}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>);
    case 'more': return (<svg {...props}><circle cx="5" cy="12" r="1.4" fill={color}/><circle cx="12" cy="12" r="1.4" fill={color}/><circle cx="19" cy="12" r="1.4" fill={color}/></svg>);
    case 'more-v': return (<svg {...props}><circle cx="12" cy="5" r="1.4" fill={color}/><circle cx="12" cy="12" r="1.4" fill={color}/><circle cx="12" cy="19" r="1.4" fill={color}/></svg>);
    case 'home': return (<svg {...props}><path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2v-9z"/></svg>);
    case 'inspect': return (<svg {...props}><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 10h6M9 14h4"/><circle cx="17" cy="16" r="2"/><path d="M18.5 17.5l1.5 1.5"/></svg>);
    case 'analytics': return (<svg {...props}><path d="M5 19V11M12 19V5M19 19v-6"/></svg>);
    case 'tasks': return (<svg {...props}><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 10l2 2 4-4M8 16h8"/></svg>);
    case 'forum': return (<svg {...props}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/></svg>);
    case 'ai': return (<svg {...props}><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z"/><path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16z"/></svg>);
    case 'ship': return (<svg {...props}><path d="M3 17l1.3-3.5a2 2 0 011.9-1.3h11.6a2 2 0 011.9 1.3L21 17"/><path d="M3 17a3 3 0 003 2 3 3 0 003-2 3 3 0 003 2 3 3 0 003-2 3 3 0 003 2"/><path d="M12 5v7M9 9l3-3 3 3"/></svg>);
    case 'calendar': return (<svg {...props}><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>);
    case 'clock': return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
    case 'building': return (<svg {...props}><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2"/></svg>);
    case 'flag': return (<svg {...props}><path d="M5 21V4M5 4h12l-2 4 2 4H5"/></svg>);
    case 'doc': return (<svg {...props}><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>);
    case 'check-circle': return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg>);
    case 'circle': return (<svg {...props}><circle cx="12" cy="12" r="9"/></svg>);
    case 'alert': return (<svg {...props}><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 17.5v.1"/></svg>);
    case 'sync': return (<svg {...props}><path d="M21 12a9 9 0 01-15.5 6M3 12a9 9 0 0115.5-6"/><path d="M3 5v5h5M21 19v-5h-5"/></svg>);
    case 'trash': return (<svg {...props}><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13"/></svg>);
    case 'import': return (<svg {...props}><path d="M12 3v12M7 10l5 5 5-5M3 21h18"/></svg>);
    case 'export': return (<svg {...props}><path d="M12 21V9M7 14l5-5 5 5M3 3h18"/></svg>);
    case 'paperclip': return (<svg {...props}><path d="M21 11l-9 9a5 5 0 01-7-7l9-9a3.5 3.5 0 015 5l-9 9a2 2 0 01-3-3l8-8"/></svg>);
    case 'mic': return (<svg {...props}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>);
    case 'image': return (<svg {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M3 17l5-5 5 5 3-3 5 5"/></svg>);
    case 'play': return (<svg {...props}><path d="M6 4l14 8-14 8V4z"/></svg>);
    case 'sparkle': return (<svg {...props}><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/></svg>);
    case 'eye': return (<svg {...props}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>);
    case 'book': return (<svg {...props}><path d="M4 5a2 2 0 012-2h13v18H6a2 2 0 01-2-2V5z"/><path d="M4 19a2 2 0 012-2h13"/></svg>);
    case 'history': return (<svg {...props}><path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.5"/><path d="M3 4v5h5M12 7v5l3 2"/></svg>);
    case 'users': return (<svg {...props}><circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0114 0M17 11a3 3 0 100-6M22 21a5 5 0 00-5-5"/></svg>);
    case 'shield': return (<svg {...props}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></svg>);
    case 'gear': return (<svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3 1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8 1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>);
    case 'wand': return (<svg {...props}><path d="M15 4l-2 2M19 8l-2 2M21 4l-2-2M21 4l2 2"/><path d="M14 7l3 3-10 10-3-3 10-10z"/></svg>);
    case 'menu': return (<svg {...props}><path d="M4 6h16M4 12h16M4 18h16"/></svg>);
    case 'grid': return (<svg {...props}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>);
    case 'list': return (<svg {...props}><circle cx="5" cy="6" r="1" fill={color}/><circle cx="5" cy="12" r="1" fill={color}/><circle cx="5" cy="18" r="1" fill={color}/><path d="M10 6h11M10 12h11M10 18h11"/></svg>);
    case 'pencil': return (<svg {...props}><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>);
    case 'send': return (<svg {...props}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>);
    case 'route': return (<svg {...props}><path d="M6 19V5M18 5v14"/><circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 12h12"/></svg>);
    default: return null;
  }
};

// Country flag pill - simple colored circle
const FlagDot = ({ country = 'PA' }) => {
  const flags = {
    PA: ['#005293', '#fff', '#D21034'],
    LR: ['#BF0A30', '#fff', '#002868'],
    MH: ['#003893', '#FFA500', '#fff'],
    SG: ['#EF3340', '#fff'],
    GR: ['#0D5EAF', '#fff'],
    CY: ['#FFCE00', '#fff'],
    UK: ['#012169', '#fff', '#C8102E'],
    NO: ['#BA0C2F', '#fff', '#00205B'],
  };
  const cs = flags[country] || flags.PA;
  return (
    <div style={{
      width: 22, height: 16, borderRadius: 4, overflow: 'hidden',
      background: `linear-gradient(${cs.map((c,i) => `${c} ${i*100/cs.length}%, ${c} ${(i+1)*100/cs.length}%`).join(',')})`,
      flexShrink: 0,
    }} />
  );
};

// Tiny Muster logo mark - inspired by the M with crossed loops
const MusterMark = ({ size = 28, color = '#fff', bg = true }) => (
  <div style={{
    width: size, height: size,
    borderRadius: bg ? size * 0.28 : 0,
    background: bg ? 'linear-gradient(135deg, #FF7648 0%, #FFC757 60%, #4A7FF8 110%)' : 'transparent',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }}>
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
      <path d="M4 8c0-2 2-4 5-4s5 2 5 4c0-2 2-4 5-4s5 2 5 4-2 4-5 4c-3 0-5-2-5-4 0 2-2 4-5 4s-5-2-5-4z M4 16c0-2 2-4 5-4s5 2 5 4c0-2 2-4 5-4s5 2 5 4-2 4-5 4c-3 0-5-2-5-4 0 2-2 4-5 4s-5-2-5-4z" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  </div>
);

Object.assign(window, { Icon, FlagDot, MusterMark });
