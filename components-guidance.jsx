// components-guidance.jsx — Guidance detail panels (slide-up sheets)

const GUIDANCE_DATA = {
  'potential-obs': {
    title: 'Potential observations',
    icon: 'alert',
    accent: 'var(--orange)',
    items: [
      { ref: 'PO-1', t: 'Mooring line records not aligned with manufacturer recommended retirement criteria', sev: 'High' },
      { ref: 'PO-2', t: 'Bridge equipment test records show gaps exceeding 7 days', sev: 'Moderate' },
      { ref: 'PO-3', t: 'Crew certification matrix missing flag-state endorsements', sev: 'High' },
      { ref: 'PO-4', t: 'Garbage management plan version superseded by IMO 2025 amendments', sev: 'Low' },
    ],
  },
  'inspector': {
    title: 'Inspector guidance',
    icon: 'book',
    accent: 'var(--blue)',
    items: [
      { t: 'Verify all certificates against original issuing authority records, not just on-board copies.' },
      { t: 'Cross-reference the DOC vessel-type list with the actual cargo profile of the last 3 voyages.' },
      { t: 'Pay attention to memoranda — they often signal pending defects flag inspectors will check next.' },
      { t: 'Photograph cert numbers, expiry dates, and any handwritten amendments for your report.' },
    ],
  },
  'publications': {
    title: 'Publications',
    icon: 'doc',
    accent: 'var(--ink)',
    items: [
      { ref: 'OCIMF', t: 'SIRE 2.0 Question Library — Section 1: Certification', date: 'Rev 2025.11' },
      { ref: 'IMO', t: 'SOLAS Chapter IX — Management for the Safe Operation of Ships', date: 'Consolidated Ed.' },
      { ref: 'ISM', t: 'International Safety Management Code — Document of Compliance', date: '2024 amendment' },
    ],
  },
  'past-obs': {
    title: 'Past observations on this vessel',
    icon: 'history',
    accent: 'var(--amber)',
    items: [
      { ref: '2024 SIRE', t: 'P&I certificate trading limit mismatch flagged at Singapore', date: 'Sep 2024' },
      { ref: '2023 RISQ', t: 'Continuous Synopsis Record had unrecorded change of management', date: 'Mar 2023' },
    ],
  },
  'hardware': {
    title: 'Hardware guidance',
    icon: 'shield',
    accent: 'var(--blue-deep)',
    items: [
      { t: 'Inspect cert holders, frames, and seals for tampering or weather damage.' },
      { t: 'Check that radio licence plate matches installed equipment serial numbers.' },
      { t: 'Verify backup ECDIS units have current chart updates loaded, not just the primary.' },
    ],
  },
  'human': {
    title: 'Human guidance',
    icon: 'users',
    accent: 'var(--orange)',
    items: [
      { t: 'Interview the Master and Chief Officer separately on certificate handling procedures.' },
      { t: 'Ask the Second Officer to demonstrate retrieval of any specific certificate within 60 seconds.' },
      { t: 'Confirm the SSO understands their authority to refuse cargo operations on a defective certificate.' },
    ],
  },
  'process': {
    title: 'Process guidance',
    icon: 'route',
    accent: 'var(--green)',
    items: [
      { t: 'Trace the certificate renewal workflow from office issuance through onboard filing.' },
      { t: 'Confirm SMS procedure for tracking expiring certificates references a single source of truth.' },
      { t: 'Verify that the company audit schedule covers all certificate types at least annually.' },
    ],
  },
};

function GuidanceSheet({ kind, vesselName, onClose }) {
  const g = GUIDANCE_DATA[kind];
  if (!g) return null;
  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 70 }} />
      <div className="modal-sheet" style={{ height: '78%', zIndex: 71 }}>
        <div className="modal-handle" />
        <div style={{ padding: '8px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button className="icon-btn" style={{ width: 36, height: 36 }} onClick={onClose}>
            <Icon name="arrow-left" size={18} />
          </button>
          <div style={{ width: 36 }} />
          <button className="icon-btn" style={{ width: 36, height: 36 }} onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>
        <div style={{ padding: '4px 20px 8px' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14, background: g.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
          }}>
            <Icon name={g.icon} size={22} color="#fff" />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Question 1.1 · {vesselName}
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>{g.title}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4 }}>
            {g.items.length} item{g.items.length !== 1 ? 's' : ''} relevant to this question
          </div>
        </div>
        <div style={{ padding: '8px 16px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {g.items.map((it, i) => (
            <div key={i} className="card" style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                {it.ref && (
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                    color: g.accent, background: 'rgba(0,0,0,0.04)',
                    padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase',
                  }}>{it.ref}</span>
                )}
                {it.sev && (
                  <span className="chip" style={{
                    background: it.sev === 'High' ? '#FBDDD4' : it.sev === 'Moderate' ? 'var(--yellow-soft)' : 'rgba(0,0,0,0.04)',
                    color: it.sev === 'High' ? '#8E2A14' : it.sev === 'Moderate' ? '#8A6620' : 'var(--ink-2)',
                  }}>{it.sev}</span>
                )}
                {it.date && <span style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 'auto' }}>{it.date}</span>}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--ink)', textWrap: 'pretty' }}>{it.t}</div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

Object.assign(window, { GuidanceSheet, GUIDANCE_DATA });
