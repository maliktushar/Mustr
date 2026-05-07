// components-completion.jsx — Completion screen + placeholder tabs

function CompletionScreen({ inspection, answers, onBack, onAnalytics }) {
  const compliantN = Object.values(answers).filter(a => a.compliance === 'compliant').length;
  const noncompN = Object.values(answers).filter(a => a.compliance === 'noncomp').length;
  const naN = Object.values(answers).filter(a => a.compliance === 'na').length;
  const total = QUESTIONS.length;
  const answered = compliantN + noncompN + naN;

  return (
    <div className="app-shell screen-enter" style={{ position: 'absolute', inset: 0, zIndex: 45 }}>
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '4px 12px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="icon-btn" onClick={onBack}><Icon name="close" size={20} /></button>
        <button className="icon-btn"><Icon name="more-v" size={20} /></button>
      </div>

      <div className="app-body no-pad" style={{ padding: '8px 16px 30px' }}>
        {/* Hero with orb */}
        <div style={{
          position: 'relative', borderRadius: 26, overflow: 'hidden', minHeight: 220,
          padding: '24px 22px',
        }}>
          <div className="muster-orb" style={{ opacity: 0.95 }} />
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 28,
              background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
            }}>
              <Icon name="check" size={28} color="var(--green)" strokeWidth={2.5} />
            </div>
            <div style={{ marginTop: 18, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(32,32,32,0.65)' }}>
              Inspection complete
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.15, marginTop: 4, letterSpacing: '-0.02em', maxWidth: '85%' }}>
              {inspection.vessel}<br/>
              <span style={{ color: 'rgba(32,32,32,0.7)', fontWeight: 500 }}>signed off</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
          <div className="stat" style={{ background: '#D8F1E5' }}>
            <div className="v" style={{ color: '#1B7048' }}>{compliantN}</div>
            <div className="l" style={{ color: '#1B7048', opacity: 0.7 }}>Compliant</div>
          </div>
          <div className="stat" style={{ background: '#FBDDD4' }}>
            <div className="v" style={{ color: '#8E2A14' }}>{noncompN}</div>
            <div className="l" style={{ color: '#8E2A14', opacity: 0.7 }}>Negative obs.</div>
          </div>
          <div className="stat" style={{ background: 'var(--paper)' }}>
            <div className="v">{answered}/{total}</div>
            <div className="l">Answered</div>
          </div>
          <div className="stat" style={{ background: 'var(--paper)' }}>
            <div className="v">{naN}</div>
            <div className="l">Marked N/A</div>
          </div>
        </div>

        {/* Mini chart */}
        <div className="card" style={{ padding: 16, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Observations by chapter</div>
            <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>last inspection</span>
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-end', gap: 8, height: 90 }}>
            {[
              { l: 'C1', v: 0.8, c: 'var(--blue)' },
              { l: 'C2', v: 0.4, c: 'var(--orange)' },
              { l: 'C3', v: 0.95, c: 'var(--blue)' },
              { l: 'C4', v: 0.6, c: 'var(--yellow)' },
              { l: 'C5', v: 0.3, c: 'var(--orange)' },
              { l: 'C6', v: 0.7, c: 'var(--blue)' },
              { l: 'C7', v: 0.5, c: 'var(--yellow)' },
            ].map(b => (
              <div key={b.l} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ width: '100%', height: `${b.v * 100}%`, background: b.c, borderRadius: '6px 6px 2px 2px' }} />
                </div>
                <span style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600 }}>{b.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export */}
        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 18, marginBottom: 8, padding: '0 4px' }}>Export report</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { l: 'PDF', s: 'Audit-ready', c: 'var(--red)' },
            { l: 'Word', s: 'Editable', c: 'var(--blue)' },
            { l: 'Excel', s: 'Analytics', c: 'var(--green)' },
            { l: 'JSON', s: 'Raw data', c: 'var(--ink)' },
          ].map(x => (
            <button key={x.l} className="card" style={{ padding: 14, textAlign: 'left' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: x.c, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
              }}>{x.l}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{x.l} report</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{x.s}</div>
            </button>
          ))}
        </div>

        <button onClick={onAnalytics} className="pill primary" style={{
          width: '100%', height: 52, marginTop: 18, fontSize: 15,
        }}>
          <Icon name="analytics" size={16} color="#fff" /> View AI insights & analytics
        </button>
      </div>
    </div>
  );
}

// ─── Placeholder tabs ──────────────────────────────────────
function PlaceholderScreen({ title, subtitle, icon }) {
  return (
    <div className="app-body" style={{ padding: '60px 24px 40px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 32 }} />
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Muster
      </div>
      <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 4 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 6, textWrap: 'pretty' }}>{subtitle}</div>

      <div style={{
        marginTop: 24, position: 'relative', borderRadius: 24, overflow: 'hidden',
        minHeight: 220, padding: 22,
      }}>
        <div className="muster-orb" style={{ opacity: 0.85 }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', minHeight: 200 }}>
          <Icon name={icon} size={36} color="rgba(32,32,32,0.85)" />
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 12, maxWidth: '85%' }}>
            Coming up next
          </div>
          <div style={{ fontSize: 13, color: 'rgba(32,32,32,0.65)', marginTop: 4, maxWidth: '85%' }}>
            This module is part of the Muster suite. The Inspections flow is fully prototyped — open the Inspect tab to explore.
          </div>
        </div>
      </div>
    </div>
  );
}

function AiAssistantSheet({ onClose }) {
  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet" style={{ height: '78%' }}>
        <div className="modal-handle" />
        <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 36 }} />
          <div style={{ fontSize: 15, fontWeight: 600 }}>Muster AI</div>
          <button className="icon-btn" style={{ width: 36, height: 36 }} onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>
        <div style={{ padding: '8px 16px 16px', flex: 1, overflowY: 'auto' }}>
          <div style={{
            position: 'relative', borderRadius: 22, overflow: 'hidden',
            padding: '24px 22px', minHeight: 220,
          }}>
            <div className="muster-orb" style={{ opacity: 0.95 }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(32,32,32,0.6)' }}>
                Hello, James
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.15, marginTop: 8, letterSpacing: '-0.02em' }}>
                What can I help<br/>with today?
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                <button className="pill sm">Summarise observations</button>
                <button className="pill sm">Risk on Aurora Pacific</button>
                <button className="pill sm">Compare last 3 SIRE</button>
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 14, padding: '10px 10px 10px 18px',
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#fff', borderRadius: 9999,
            boxShadow: '0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.04)',
          }}>
            <span style={{ flex: 1, fontSize: 14, color: 'var(--ink-3)' }}>Ask Muster anything…</span>
            <button style={{
              width: 38, height: 38, borderRadius: 19,
              background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="mic" size={18} color="#fff" />
            </button>
          </div>

          <div style={{ marginTop: 18, fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Recent insights
          </div>
          {[
            { i: 'sparkle', t: 'Pump-room observations are trending up across your fleet', s: '+18% vs last quarter', c: 'var(--orange)' },
            { i: 'shield', t: 'Mooring equipment defects on Aurora Pacific match a known risk pattern', s: 'Review recommended', c: 'var(--blue)' },
            { i: 'analytics', t: 'SIRE 2.0 average score improved across 4 vessels', s: 'Keep going', c: 'var(--green)' },
          ].map((x, k) => (
            <div key={k} className="card" style={{ padding: 14, marginTop: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: x.c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={x.i} size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.35 }}>{x.t}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{x.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

Object.assign(window, { CompletionScreen, PlaceholderScreen, AiAssistantSheet });
