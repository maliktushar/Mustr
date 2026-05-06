// components-worklist.jsx — Muster Worklist: Observation tracking & sign-off

const { useState, useEffect, useRef, useMemo, Fragment } = React;

// ─── Seed Data ────────────────────────────────────────────────

const RESPONSIBLE_OPTIONS = [
  'Bridge Team', 'Chief Officer', '2nd Officer', '3rd Officer',
  'Chief Engineer', '2nd Engineer', '3rd Engineer', 'Bosun',
  'Pump Man', 'Deck Crew', 'Engine Room Crew', 'Company Office',
];

const SEED_WORKLIST = [
  {
    id: 'w1', inspectionId: 'i1', vessel: 'MT Aurora Pacific', type: 'SIRE 2.0',
    ref: '2.1', chapter: 'Manning & Training',
    observation: 'Crew matrix was found to be incomplete. The 2nd Engineer entry for March 2026 was missing from the training record matrix. The matrix had not been updated following crew change dated 14 Feb 2026.',
    initialPhoto: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=500&q=80',
    correctedPhoto: null,
    status: 'in-progress',
    responsible: 'Chief Engineer',
    dateStarted: '2026-04-23',
    dateClosed: null,
    closingPlan: 'Chief Engineer to update crew matrix for 2nd Engineer slot. Training records to be reconciled against ship\'s articles by 30 Apr 2026. Master to countersign on completion.',
    inspector: 'James Holden',
    marineSup: 'A. Petrov',
    priority: 'high',
  },
  {
    id: 'w2', inspectionId: 'i1', vessel: 'MT Aurora Pacific', type: 'SIRE 2.0',
    ref: '5.3', chapter: 'Cargo & Ballast Operations',
    observation: 'Pre-transfer cargo checklist not signed prior to commencement of discharge operation. Verbal briefing was conducted but formal documentation was completed approximately 20 minutes after cargo valves were opened.',
    initialPhoto: 'https://images.unsplash.com/photo-1570937914529-03a7e5a7d65b?w=500&q=80',
    correctedPhoto: 'https://images.unsplash.com/photo-1494587416117-f102a0ef7f73?w=500&q=80',
    status: 'closed',
    responsible: 'Chief Officer',
    dateStarted: '2026-04-23',
    dateClosed: '2026-04-28',
    closingPlan: 'Updated cargo checklist procedure issued and briefed to deck officers. Revised standing order posted in cargo control room requiring checklist completion prior to valve operation. Confirmed closed.',
    inspector: 'James Holden',
    marineSup: 'A. Petrov',
    priority: 'medium',
  },
  {
    id: 'w3', inspectionId: 'i1', vessel: 'MT Aurora Pacific', type: 'SIRE 2.0',
    ref: '7.4', chapter: 'Safety Management',
    observation: 'Emergency fire pump weekly test record was not maintained for weeks of 17 Mar and 24 Mar 2026. Chief Engineer stated tests were performed but entries not logged in SMS record book.',
    initialPhoto: 'https://images.unsplash.com/photo-1504655047556-b63ebe3b2710?w=500&q=80',
    correctedPhoto: null,
    status: 'open',
    responsible: 'Chief Engineer',
    dateStarted: null,
    dateClosed: null,
    closingPlan: '',
    inspector: 'James Holden',
    marineSup: 'A. Petrov',
    priority: 'high',
  },
  {
    id: 'w4', inspectionId: 'i1', vessel: 'MT Aurora Pacific', type: 'SIRE 2.0',
    ref: '4.2', chapter: 'Mooring Operations',
    observation: 'Mooring tail condition — three tails on port forward cluster showed signs of excessive wear beyond company replacement criteria. No defect entry was found in the planned maintenance system.',
    initialPhoto: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80',
    correctedPhoto: null,
    status: 'in-progress',
    responsible: 'Bosun',
    dateStarted: '2026-04-25',
    dateClosed: null,
    closingPlan: 'Replacement tails ordered via ship\'s chandler Singapore. Expected delivery 05 May 2026. Defect raised in PMS. Interim measure: affected tails marked and vessel to not use port forward cluster until replaced.',
    inspector: 'James Holden',
    marineSup: 'A. Petrov',
    priority: 'medium',
  },
  // Inspection i2 (completed)
  {
    id: 'w5', inspectionId: 'i2', vessel: 'MV Northern Crown', type: 'RISQ',
    ref: '3.1', chapter: 'Navigation',
    observation: 'ECDIS chart update procedure not followed correctly. Latest chart corrections applied manually but no entry in the chart correction log. Bridge team unable to confirm currency of ENC cells.',
    initialPhoto: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=500&q=80',
    correctedPhoto: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&q=80',
    status: 'closed',
    responsible: '2nd Officer',
    dateStarted: '2026-04-19',
    dateClosed: '2026-04-27',
    closingPlan: 'Chart correction log updated and verified. AVCS update procedure re-briefed at navigation team meeting. Confirmed all ENC cells current. Closed.',
    inspector: 'Linh Tran',
    marineSup: 'R. Okonkwo',
    priority: 'high',
  },
  {
    id: 'w6', inspectionId: 'i2', vessel: 'MV Northern Crown', type: 'RISQ',
    ref: '6.1', chapter: 'Crew Management',
    observation: 'Rest hour records for two ABs showed pattern of repeated minimum rest periods across a 14-day window. Records technically within MLC limits but pattern suggests watchkeeping fatigue risk.',
    initialPhoto: null,
    correctedPhoto: null,
    status: 'closed',
    responsible: 'Bridge Team',
    dateStarted: '2026-04-19',
    dateClosed: '2026-04-29',
    closingPlan: 'Watchkeeping schedules reviewed and revised. Additional manpower allocated from engine room during port operations. Rest hour monitoring to be reviewed weekly by Master. Closed.',
    inspector: 'Linh Tran',
    marineSup: 'R. Okonkwo',
    priority: 'medium',
  },
  // Inspection i3
  {
    id: 'w7', inspectionId: 'i3', vessel: 'MT Helios Star', type: 'CDI',
    ref: '9.2', chapter: 'Pump Room',
    observation: 'Pump room bilge level high alarm was not functional at time of inspection. Audible alarm test performed — no response. Last recorded test entry in maintenance log was 6 weeks prior.',
    initialPhoto: 'https://images.unsplash.com/photo-1545420860-1b26acdb2bd0?w=500&q=80',
    correctedPhoto: null,
    status: 'open',
    responsible: '2nd Engineer',
    dateStarted: null,
    dateClosed: null,
    closingPlan: '',
    inspector: 'Maya Carlsen',
    marineSup: 'T. Bell',
    priority: 'high',
  },
];

// ─── Helpers ─────────────────────────────────────────────────

function StatusPill({ status }) {
  var map = {
    open:        { label: 'Open',        bg: '#FBDDD4', color: '#8E2A14' },
    'in-progress': { label: 'In Progress', bg: 'var(--yellow-soft)', color: '#8A6620' },
    closed:      { label: 'Closed',      bg: '#D8F1E5', color: '#1B7048' },
  };
  var s = map[status] || map.open;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 9px', borderRadius: 7, background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0 }}>
      {s.label}
    </span>
  );
}

function PriorityDot({ priority }) {
  var color = priority === 'high' ? '#E2563B' : priority === 'medium' ? '#E8A93C' : '#2FB67C';
  return <div style={{ width: 8, height: 8, borderRadius: 4, background: color, flexShrink: 0 }} />;
}

function PhotoSlot({ label, src, onChange }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{label}</div>
      <div style={{
        aspectRatio: '4/3', borderRadius: 14, overflow: 'hidden', position: 'relative',
        background: src ? 'transparent' : 'rgba(0,0,0,0.04)',
        border: src ? 'none' : '1.5px dashed rgba(0,0,0,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}>
        {src ? (
          <>
            <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={function(e) { e.target.parentElement.style.background = '#eee'; e.target.style.display = 'none'; }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', bottom: 6, right: 6 }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600 }}>Add photo</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Observation Detail Sheet ──────────────────────────────────

function ObservationDetail({ obs, onBack, onSave }) {
  var [status, setStatus] = useState(obs.status);
  var [responsible, setResponsible] = useState(obs.responsible);
  var [closingPlan, setClosingPlan] = useState(obs.closingPlan);
  var [dateStarted, setDateStarted] = useState(obs.dateStarted || '');
  var [dateClosed, setDateClosed] = useState(obs.dateClosed || '');
  var [correctedPhoto, setCorrectedPhoto] = useState(obs.correctedPhoto);
  var [showResp, setShowResp] = useState(false);
  var [dirty, setDirty] = useState(false);

  function markDirty() { setDirty(true); }

  function handleSave() {
    onSave({
      ...obs, status, responsible, closingPlan, dateStarted, dateClosed, correctedPhoto,
    });
    onBack();
  }

  var statusColor = status === 'closed' ? '#1B7048' : status === 'in-progress' ? '#8A6620' : '#8E2A14';

  return (
    <div className="app-shell screen-enter" style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'var(--cream)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ padding: '4px 16px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--blue)' }}>Ref {obs.ref}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>· {obs.chapter}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{obs.vessel}</div>
        </div>
        {dirty && (
          <button onClick={handleSave} className="pill sm primary">Save</button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Status bar — prominent top section */}
        <div style={{ padding: '14px 16px', background: '#fff', borderBottom: '1px solid var(--line-2)' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {['open', 'in-progress', 'closed'].map(function(s) {
              var labels = { open: 'Open', 'in-progress': 'In Progress', closed: 'Closed' };
              var active = status === s;
              return (
                <button key={s} onClick={function() { setStatus(s); setDirty(true); }} style={{
                  flex: 1, padding: '8px 4px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: active ? (s === 'closed' ? '#D8F1E5' : s === 'in-progress' ? 'var(--yellow-soft)' : '#FBDDD4') : 'rgba(0,0,0,0.04)',
                  color: active ? (s === 'closed' ? '#1B7048' : s === 'in-progress' ? '#8A6620' : '#8E2A14') : 'var(--ink-3)',
                  fontWeight: active ? 800 : 600, fontSize: 12, transition: 'all .15s',
                }}>
                  {active && '✓ '}{labels[s]}
                </button>
              );
            })}
          </div>

          {/* Responsible person */}
          <div>
            <div className="field-label" style={{ marginBottom: 6 }}>Responsible Person</div>
            <button onClick={function() { setShowResp(!showResp); }} style={{
              width: '100%', padding: '10px 14px', borderRadius: 12, background: 'rgba(0,0,0,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              border: 'none', cursor: 'pointer',
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: responsible ? 'var(--ink)' : 'var(--ink-3)' }}>{responsible || 'Select responsible…'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {showResp && (
              <div style={{ marginTop: 6, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)' }}>
                {RESPONSIBLE_OPTIONS.map(function(r) {
                  return (
                    <button key={r} onClick={function() { setResponsible(r); setShowResp(false); setDirty(true); }} style={{
                      width: '100%', padding: '10px 14px', textAlign: 'left', border: 'none', cursor: 'pointer',
                      background: responsible === r ? 'var(--blue-soft)' : '#fff',
                      borderBottom: '1px solid var(--line-2)',
                      fontSize: 13, fontWeight: responsible === r ? 700 : 400,
                      color: responsible === r ? 'var(--blue-deep)' : 'var(--ink)',
                    }}>
                      {responsible === r && '✓ '}{r}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Observation text */}
          <div>
            <div className="field-label" style={{ marginBottom: 8 }}>Observation Noted</div>
            <div style={{ padding: '12px 14px', background: '#fff', borderRadius: 14, border: '1px solid var(--line)', fontSize: 13, lineHeight: 1.65, color: 'var(--ink)' }}>
              {obs.observation}
            </div>
          </div>

          {/* Photos side by side */}
          <div>
            <div className="field-label" style={{ marginBottom: 8 }}>Photos</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <PhotoSlot label="Initial (inspection)" src={obs.initialPhoto} onChange={function() {}} />
              <PhotoSlot label="Corrected (after fix)" src={correctedPhoto} onChange={function() { setDirty(true); }} />
            </div>
          </div>

          {/* Dates */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div className="field-label" style={{ marginBottom: 6 }}>Date Started</div>
              <div className="input">
                <input type="date" value={dateStarted} onChange={function(e) { setDateStarted(e.target.value); setDirty(true); }}
                  style={{ fontSize: 13, color: dateStarted ? 'var(--ink)' : 'var(--ink-3)' }} />
              </div>
            </div>
            <div>
              <div className="field-label" style={{ marginBottom: 6 }}>Date Closed</div>
              <div className="input">
                <input type="date" value={dateClosed} onChange={function(e) { setDateClosed(e.target.value); setDirty(true); }}
                  disabled={status !== 'closed'}
                  style={{ fontSize: 13, color: dateClosed ? 'var(--ink)' : 'var(--ink-3)', opacity: status !== 'closed' ? 0.4 : 1 }} />
              </div>
            </div>
          </div>

          {/* Closing plan / superintendent comments */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
              <div className="field-label">Superintendent's Closing Plan</div>
              <span style={{ fontSize: 10, color: 'var(--ink-3)' }}>by {obs.marineSup}</span>
            </div>
            <div style={{
              borderRadius: 14, overflow: 'hidden',
              border: closingPlan ? '1px solid rgba(47,182,124,0.25)' : '1px solid var(--line)',
              background: closingPlan ? 'rgba(47,182,124,0.03)' : '#fff',
            }}>
              <textarea value={closingPlan}
                onChange={function(e) { setClosingPlan(e.target.value); setDirty(true); }}
                placeholder="Enter corrective action plan, timeline, and responsible party details…"
                style={{ width: '100%', padding: '12px 14px', border: 'none', outline: 'none', fontSize: 13, lineHeight: 1.65, background: 'transparent', resize: 'none', fontFamily: 'inherit', minHeight: 100, color: 'var(--ink)' }} />
            </div>
            {closingPlan && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2FB67C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: 11, color: '#2FB67C', fontWeight: 600 }}>Closing plan entered</span>
              </div>
            )}
          </div>

          {/* Inspector info */}
          <div style={{ padding: '12px 14px', background: '#fff', borderRadius: 14, border: '1px solid var(--line)' }}>
            <div className="field-label" style={{ marginBottom: 8 }}>Inspection Record</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                { label: 'Inspector', value: obs.inspector },
                { label: 'Marine Superintendent', value: obs.marineSup },
                { label: 'Inspection type', value: obs.type },
                { label: 'Vessel', value: obs.vessel },
              ].map(function(row) {
                return (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{row.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{row.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ height: 8 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Export Sheet ─────────────────────────────────────────────

function ExportSheet({ inspection, items, onClose }) {
  var [format, setFormat] = useState('pdf');
  var [exporting, setExporting] = useState(false);
  var [done, setDone] = useState(false);

  var formats = [
    { id: 'pdf',   icon: '📄', label: 'PDF Report',      hint: 'Full formatted report with photos and worklist' },
    { id: 'excel', icon: '📊', label: 'Excel Workbook',   hint: 'Tabular data with one sheet per section' },
    { id: 'word',  icon: '📝', label: 'Word Document',    hint: 'Editable document for further comment' },
    { id: 'json',  icon: '🔗', label: 'JSON Export',      hint: 'Raw structured data for system integration' },
  ];

  var closed = items.filter(function(i) { return i.status === 'closed'; }).length;
  var total = items.length;

  function doExport() {
    setExporting(true);
    setTimeout(function() { setExporting(false); setDone(true); }, 1800);
  }

  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet" style={{ maxHeight: '90%' }}>
        <div className="modal-handle" />
        <div style={{ padding: '8px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
          <button onClick={onClose} style={{ color: 'var(--ink-3)', fontSize: 14, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Export Report</div>
          <div style={{ width: 48 }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 28px' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: 32, background: '#D8F1E5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B7048" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Report ready</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 20 }}>{inspection.vessel} — Worklist exported as {format.toUpperCase()}</div>
              <button onClick={onClose} className="pill primary" style={{ paddingLeft: 28, paddingRight: 28 }}>Done</button>
            </div>
          ) : (
            <Fragment>
              {/* Inspection summary */}
              <div style={{ padding: '12px 14px', background: 'var(--blue-soft)', borderRadius: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue-deep)', marginBottom: 2 }}>{inspection.vessel}</div>
                <div style={{ fontSize: 11, color: 'var(--blue)', marginBottom: 8 }}>{inspection.type} · {inspection.port}</div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}><b style={{ color: 'var(--ink)' }}>{total}</b> observations</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}><b style={{ color: '#1B7048' }}>{closed}</b> closed</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}><b style={{ color: '#8E2A14' }}>{total - closed}</b> open</span>
                </div>
              </div>

              <div className="field-label" style={{ marginBottom: 10 }}>Export format</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {formats.map(function(f) {
                  return (
                    <button key={f.id} onClick={function() { setFormat(f.id); }} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14,
                      background: format === f.id ? 'var(--blue-soft)' : 'rgba(0,0,0,0.03)',
                      border: 'none', cursor: 'pointer', transition: 'all .15s', textAlign: 'left',
                    }}>
                      <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: format === f.id ? 'var(--blue-deep)' : 'var(--ink)' }}>{f.label}</div>
                        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{f.hint}</div>
                      </div>
                      {format === f.id && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </button>
                  );
                })}
              </div>

              <div style={{ padding: '12px 14px', background: 'rgba(0,0,0,0.03)', borderRadius: 12, marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Report will include</div>
                {['Inspection summary & scores', 'All observations with ref numbers', 'Worklist status & responsible persons', 'Superintendent closing plans', 'Initial and corrected photos', 'Date opened / date closed'].map(function(item) {
                  return (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: 12, color: 'var(--ink)' }}>{item}</span>
                    </div>
                  );
                })}
              </div>

              <button onClick={doExport} className="pill primary" style={{ width: '100%', height: 50, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {exporting ? (
                  <Fragment>
                    <div style={{ width: 18, height: 18, borderRadius: 9, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite' }} />
                    Generating…
                  </Fragment>
                ) : (
                  <Fragment>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Export as {format.toUpperCase()}
                  </Fragment>
                )}
              </button>
            </Fragment>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Fragment>
  );
}

// ─── Inspection Worklist View ─────────────────────────────────

function InspectionWorklist({ inspection, items, onBack, onOpenObs, onExport }) {
  var [filter, setFilter] = useState('all');

  var filtered = items.filter(function(i) {
    if (filter === 'all') return true;
    return i.status === filter;
  });

  var open = items.filter(function(i) { return i.status === 'open'; }).length;
  var inProg = items.filter(function(i) { return i.status === 'in-progress'; }).length;
  var closed = items.filter(function(i) { return i.status === 'closed'; }).length;
  var pct = items.length ? Math.round((closed / items.length) * 100) : 0;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'var(--cream)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="screen-enter">
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ padding: '4px 16px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{inspection.vessel}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{inspection.type} · {inspection.port}</div>
        </div>
        <button onClick={onExport} className="pill sm" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Progress summary */}
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '16px', boxShadow: 'var(--shadow-card)', marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Worklist Progress</div>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' }}>{pct}<span style={{ fontSize: 16, color: 'var(--ink-3)' }}>%</span></div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {[{ v: open, l: 'Open', c: '#E2563B' }, { v: inProg, l: 'Progress', c: '#E8A93C' }, { v: closed, l: 'Closed', c: '#2FB67C' }].map(function(s) {
                  return (
                    <div key={s.l} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                      <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600 }}>{s.l}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: pct + '%', background: 'linear-gradient(90deg, #2FB67C, #4A7FF8)', borderRadius: 4, transition: 'width 0.6s ease' }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--ink-3)' }}>
              {closed} of {items.length} observations resolved · Inspector: {inspection.inspector}
            </div>
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {[['all', 'All (' + items.length + ')'], ['open', 'Open (' + open + ')'], ['in-progress', 'In Progress (' + inProg + ')'], ['closed', 'Closed (' + closed + ')']].map(function(pair) {
              return (
                <button key={pair[0]} onClick={function() { setFilter(pair[0]); }} style={{
                  padding: '5px 12px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0,
                  background: filter === pair[0] ? 'var(--ink)' : 'rgba(0,0,0,0.06)',
                  color: filter === pair[0] ? '#fff' : 'var(--ink-2)',
                  fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all .15s',
                }}>{pair[1]}</button>
              );
            })}
          </div>
        </div>

        {/* Observation cards */}
        <div style={{ padding: '0 16px 24px' }}>
          {filtered.map(function(obs) {
            var hasPhoto = !!obs.initialPhoto;
            return (
              <button key={obs.id} onClick={function() { onOpenObs(obs); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 10 }}>
                <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
                  {/* Photo banner if available */}
                  {hasPhoto && (
                    <div style={{ position: 'relative', height: 110, overflow: 'hidden' }}>
                      <img src={obs.initialPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={function(e) { e.target.parentElement.style.display = 'none'; }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
                      {/* Status pill on photo */}
                      <div style={{ position: 'absolute', top: 10, right: 10 }}>
                        <StatusPill status={obs.status} />
                      </div>
                      {obs.correctedPhoto && (
                        <div style={{ position: 'absolute', top: 10, left: 10 }}>
                          <div style={{ padding: '3px 8px', borderRadius: 8, background: 'rgba(47,182,124,0.9)', color: '#fff', fontSize: 10, fontWeight: 700 }}>✓ Fixed</div>
                        </div>
                      )}
                      <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.7)' }}>Ref {obs.ref}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{obs.chapter}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ padding: '12px 14px 14px' }}>
                    {!hasPhoto && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <PriorityDot priority={obs.priority} />
                          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--blue)' }}>Ref {obs.ref}</span>
                          <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>· {obs.chapter}</span>
                        </div>
                        <StatusPill status={obs.status} />
                      </div>
                    )}

                    <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 10 }}>
                      {obs.observation}
                    </div>

                    {/* Meta row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 8, background: 'rgba(0,0,0,0.04)' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>{obs.responsible || 'Unassigned'}</span>
                      </div>
                      {obs.dateStarted && (
                        <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>Started {obs.dateStarted}</span>
                      )}
                      {obs.dateClosed && (
                        <span style={{ fontSize: 11, color: '#2FB67C', fontWeight: 600 }}>✓ Closed {obs.dateClosed}</span>
                      )}
                      <div style={{ flex: 1 }} />
                      {obs.closingPlan ? (
                        <div style={{ fontSize: 10, color: '#2FB67C', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Plan entered
                        </div>
                      ) : (
                        <div style={{ fontSize: 10, color: '#E2563B', fontWeight: 700 }}>No plan yet</div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--ink-3)' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>No {filter === 'all' ? '' : filter} observations</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Worklist Screen ─────────────────────────────────────

function WorklistScreen() {
  var [worklist, setWorklist] = useState(SEED_WORKLIST);
  var [openInspId, setOpenInspId] = useState(null);
  var [openObs, setOpenObs] = useState(null);
  var [exportFor, setExportFor] = useState(null);
  var [filterTab, setFilterTab] = useState('active');

  // Group by inspection
  var inspections = useMemo(function() {
    var map = {};
    SEED_INSPECTIONS.forEach(function(insp) {
      var items = worklist.filter(function(w) { return w.inspectionId === insp.id; });
      if (items.length > 0) {
        map[insp.id] = { inspection: insp, items: items };
      }
    });
    return Object.values(map);
  }, [worklist]);

  var filtered = useMemo(function() {
    if (filterTab === 'active') return inspections.filter(function(g) { return g.inspection.status !== 'completed' || g.items.some(function(i) { return i.status !== 'closed'; }); });
    if (filterTab === 'completed') return inspections.filter(function(g) { return g.inspection.status === 'completed' && g.items.every(function(i) { return i.status === 'closed'; }); });
    return inspections;
  }, [inspections, filterTab]);

  var openInspGroup = openInspId ? inspections.find(function(g) { return g.inspection.id === openInspId; }) : null;

  function handleSaveObs(updated) {
    setWorklist(function(prev) { return prev.map(function(w) { return w.id === updated.id ? updated : w; }); });
    setOpenObs(null);
  }

  // Total stats for header
  var totalOpen = worklist.filter(function(w) { return w.status === 'open'; }).length;
  var totalInProg = worklist.filter(function(w) { return w.status === 'in-progress'; }).length;

  return (
    <div className="app-body" style={{ paddingBottom: 100 }}>
      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ padding: '8px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Muster</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 1 }}>Worklist</div>
          </div>
          {(totalOpen + totalInProg) > 0 && (
            <div style={{ marginTop: 8, display: 'flex', gap: 5 }}>
              {totalOpen > 0 && <div style={{ padding: '4px 10px', borderRadius: 20, background: '#FBDDD4', color: '#8E2A14', fontSize: 12, fontWeight: 700 }}>{totalOpen} open</div>}
              {totalInProg > 0 && <div style={{ padding: '4px 10px', borderRadius: 20, background: 'var(--yellow-soft)', color: '#8A6620', fontSize: 12, fontWeight: 700 }}>{totalInProg} in progress</div>}
            </div>
          )}
        </div>

        {/* Summary strip */}
        <div style={{ marginTop: 12, padding: '12px 14px', background: '#fff', borderRadius: 16, boxShadow: 'var(--shadow-card)', display: 'flex', gap: 0, marginBottom: 14 }}>
          {[
            { v: worklist.filter(function(w) { return w.status === 'open'; }).length, l: 'Open', c: '#E2563B' },
            { v: worklist.filter(function(w) { return w.status === 'in-progress'; }).length, l: 'In Progress', c: '#E8A93C' },
            { v: worklist.filter(function(w) { return w.status === 'closed'; }).length, l: 'Closed', c: '#2FB67C' },
            { v: worklist.length, l: 'Total', c: 'var(--ink)' },
          ].map(function(s, i, arr) {
            return (
              <div key={s.l} style={{ flex: 1, textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid var(--line-2)' : 'none', padding: '0 8px' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.c, letterSpacing: '-0.02em' }}>{s.v}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600, marginTop: 2 }}>{s.l}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ padding: '0 16px 10px' }}>
        <div className="mode-toggle" style={{ width: '100%' }}>
          <button className={filterTab === 'active' ? 'active' : ''} onClick={function() { setFilterTab('active'); }} style={{ flex: 1 }}>Active</button>
          <button className={filterTab === 'all' ? 'active' : ''} onClick={function() { setFilterTab('all'); }} style={{ flex: 1 }}>All</button>
          <button className={filterTab === 'completed' ? 'active' : ''} onClick={function() { setFilterTab('completed'); }} style={{ flex: 1 }}>Completed</button>
        </div>
      </div>

      {/* Inspection groups */}
      <div style={{ padding: '0 16px' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--ink-3)' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>No worklists here</div>
            <div style={{ fontSize: 13 }}>Complete an inspection to generate a worklist</div>
          </div>
        )}

        {filtered.map(function(group) {
          var insp = group.inspection;
          var items = group.items;
          var closedCount = items.filter(function(i) { return i.status === 'closed'; }).length;
          var pct = Math.round((closedCount / items.length) * 100);
          var allClosed = closedCount === items.length;

          return (
            <button key={insp.id} onClick={function() { setOpenInspId(insp.id); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 12 }}>
              <div style={{ background: '#fff', borderRadius: 22, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
                {/* Top color stripe based on completion */}
                <div style={{ height: 4, background: allClosed ? 'linear-gradient(90deg, #2FB67C, #4A7FF8)' : 'linear-gradient(90deg, #E2563B 0%, #E8A93C ' + pct + '%, rgba(0,0,0,0.08) ' + pct + '%)', transition: 'background 0.5s' }} />

                <div style={{ padding: '14px 16px' }}>
                  {/* Vessel + type */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>{insp.vessel}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{insp.type} · {insp.port} · {insp.inspector}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: allClosed ? '#2FB67C' : 'var(--ink)', letterSpacing: '-0.02em' }}>{pct}<span style={{ fontSize: 13, color: 'var(--ink-3)' }}>%</span></div>
                      <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600 }}>complete</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.06)', overflow: 'hidden', marginBottom: 10 }}>
                    <div style={{ height: '100%', width: pct + '%', background: allClosed ? '#2FB67C' : 'var(--blue)', borderRadius: 3, transition: 'width 0.5s ease' }} />
                  </div>

                  {/* Observation status chips */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                    {[
                      { s: 'open', count: items.filter(function(i) { return i.status === 'open'; }).length, bg: '#FBDDD4', color: '#8E2A14' },
                      { s: 'in-progress', count: items.filter(function(i) { return i.status === 'in-progress'; }).length, bg: 'var(--yellow-soft)', color: '#8A6620' },
                      { s: 'closed', count: items.filter(function(i) { return i.status === 'closed'; }).length, bg: '#D8F1E5', color: '#1B7048' },
                    ].filter(function(s) { return s.count > 0; }).map(function(s) {
                      return (
                        <span key={s.s} style={{ padding: '2px 8px', borderRadius: 8, background: s.bg, color: s.color, fontSize: 11, fontWeight: 700 }}>
                          {s.count} {s.s === 'in-progress' ? 'in progress' : s.s}
                        </span>
                      );
                    })}
                  </div>

                  {/* Preview of first open observation */}
                  {items.filter(function(i) { return i.status !== 'closed'; }).slice(0, 1).map(function(obs) {
                    return (
                      <div key={obs.id} style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.03)', borderRadius: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                          <PriorityDot priority={obs.priority} />
                          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)' }}>Ref {obs.ref}</span>
                          <span style={{ fontSize: 10, color: 'var(--ink-3)' }}>· {obs.responsible || 'Unassigned'}</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--ink-2)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {obs.observation}
                        </div>
                      </div>
                    );
                  })}

                  {/* Action row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{closedCount}/{items.length} observations resolved</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={function(e) { e.stopPropagation(); setExportFor(group); }} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 10, background: 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Export
                      </button>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '5px 10px', borderRadius: 10, background: 'var(--blue-soft)', fontSize: 12, color: 'var(--blue)', fontWeight: 700 }}>
                        View all
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Overlays */}
      {openInspGroup && !openObs && !exportFor && (
        <InspectionWorklist
          inspection={openInspGroup.inspection}
          items={openInspGroup.items}
          onBack={function() { setOpenInspId(null); }}
          onOpenObs={function(obs) { setOpenObs(obs); }}
          onExport={function() { setExportFor(openInspGroup); }}
        />
      )}

      {openObs && (
        <ObservationDetail
          obs={openObs}
          onBack={function() { setOpenObs(null); }}
          onSave={handleSaveObs}
        />
      )}

      {exportFor && (
        <ExportSheet
          inspection={exportFor.inspection}
          items={exportFor.items}
          onClose={function() { setExportFor(null); }}
        />
      )}
    </div>
  );
}

Object.assign(window, { WorklistScreen });
