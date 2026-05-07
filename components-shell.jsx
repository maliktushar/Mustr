// components-shell.jsx — Home + Bottom Nav + helpers

const { useState, useEffect, useRef, useMemo, Fragment } = React;

// ─── Bottom navigation ────────────────────────────────────────
const TABS = [
  { id: 'home',     label: 'Home',     icon: 'home' },
  { id: 'inspect',  label: 'Inspect',  icon: 'inspect' },
  { id: 'ai',       label: 'AI',       icon: 'sparkle' },
  { id: 'worklist', label: 'Worklist', icon: 'tasks' },
  { id: 'comms',    label: 'Comms',    icon: 'forum' },
];

function BottomNav({ active, onChange }) {
  return (
    <div className="bottom-nav">
      <div className="bottom-nav-inner">
        {TABS.map(t => {
          const isAI = t.id === 'ai';
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              className={`nav-tab ${isActive ? 'active' : ''}`}
              onClick={() => onChange(t.id)}
              style={isAI ? { position: 'relative' } : {}}
            >
              {isAI ? (
                <div style={{
                  width: 46, height: 46, borderRadius: 23, marginTop: -22,
                  background: isActive
                    ? 'linear-gradient(135deg, #FF7648, #FFC757 60%, #4A7FF8)'
                    : 'linear-gradient(135deg, #1B2B5E, #4A7FF8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isActive
                    ? '0 4px 18px rgba(255,118,72,0.45)'
                    : '0 4px 14px rgba(74,127,248,0.35)',
                  flexShrink: 0,
                  transition: 'all .2s',
                }}>
                  <Icon name="sparkle" size={22} color="#fff" />
                </div>
              ) : (
                <Icon name={t.icon} size={20} />
              )}
              <span className="nav-label" style={isAI ? { marginTop: 2, color: isActive ? 'var(--blue)' : 'var(--ink-3)' } : {}}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mini sparkline for analytics strip ──────────────────────
function MiniSparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 28;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return x + ',' + y;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={'0 0 ' + w + ' ' + h}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Last point dot */}
      {data.length > 0 && (
        <circle
          cx={(data.length - 1) / (data.length - 1) * w}
          cy={h - ((data[data.length - 1] - min) / range) * (h - 4) - 2}
          r="3" fill={color}
        />
      )}
    </svg>
  );
}

// ─── Home screen ──────────────────────────────────────────────
function HomeScreen({ inspections, onTab, onOpenInspection, onSettings }) {
  const inProgress = inspections.filter(i => i.status === 'in-progress').length;
  const completed  = inspections.filter(i => i.status === 'completed').length;
  const dueSoon    = inspections.filter(i => {
    const d = (new Date(i.due) - new Date()) / 864e5;
    return d > 0 && d < 7 && i.status !== 'completed';
  }).length;

  const recent = inspections.slice(0, 2);

  // Sparkline data — obs counts from DENSITY_DATA
  const sparkData = [24, 9, 14, 22, 8, 11, 6, 17];
  const trendDown = sparkData[sparkData.length - 1] < sparkData[sparkData.length - 2];

  return (
    <div className="app-body" style={{ paddingBottom: 100 }}>
      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ padding: '8px 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="icon-btn" style={{ width: 40, height: 40 }}>
          <Icon name="menu" size={20} />
        </button>
        <MusterMark size={32} />
        <button className="icon-btn" style={{ width: 40, height: 40 }} onClick={onSettings}>
          <Icon name="gear" size={20} />
        </button>
      </div>

      {/* ── Hero card ── */}
      <div style={{ padding: '10px 16px 0' }}>
        <div style={{
          position: 'relative', borderRadius: 28, overflow: 'hidden',
          background: '#F7F6F2', minHeight: 270,
          boxShadow: '0 1px 2px rgba(20,20,20,.04), 0 8px 24px rgba(20,20,20,.06)',
        }}>
          <div className="muster-orb" style={{ opacity: 0.95 }} />
          <div style={{ position: 'relative', padding: '24px 22px 26px' }}>

            {/* Greeting */}
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(32,32,32,0.55)' }}>
              Welcome aboard, James
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.15, marginTop: 6, letterSpacing: '-0.02em', maxWidth: '80%' }}>
              Ready for today's inspection?
            </div>

            {/* Quick action pills — row 1 */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
              <button className="pill" onClick={() => onTab('inspect')} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="plus" size={15} /> New inspection
              </button>
              <button className="pill" onClick={() => onTab('inspect')} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="inspect" size={15} /> Continue
              </button>
              <button className="pill" onClick={() => onTab('worklist')} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="tasks" size={15} /> Worklist
              </button>
            </div>

            {/* Quick action pills — row 2 */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              <button className="pill" onClick={() => onTab('ai')} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="sparkle" size={15} /> Upload pre-inspection pack
              </button>
              <button className="pill" onClick={() => onTab('comms')} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="forum" size={15} /> Comms
              </button>
            </div>

            {/* Ask Muster bar */}
            <button
              onClick={() => onTab('ai')}
              style={{
                marginTop: 16, width: '100%',
                background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                borderRadius: 9999, padding: '9px 9px 9px 18px',
                display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: 'none', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <Icon name="sparkle" size={16} color="var(--blue)" />
              <span style={{ flex: 1, fontSize: 14, color: 'rgba(32,32,32,0.45)' }}>Ask Muster anything…</span>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: 'linear-gradient(135deg, #FF7648, #4A7FF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="mic" size={17} color="#fff" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── This week stats ── */}
      <div style={{ padding: '22px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>This week</div>
      </div>
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <div className="stat" style={{ background: 'var(--blue-soft)' }}>
          <div className="v" style={{ color: 'var(--blue-deep)' }}>{inProgress}</div>
          <div className="l" style={{ color: 'var(--blue-deep)', opacity: 0.7 }}>In progress</div>
        </div>
        <div className="stat" style={{ background: 'var(--orange-soft)' }}>
          <div className="v" style={{ color: '#B8431F' }}>{dueSoon}</div>
          <div className="l" style={{ color: '#B8431F', opacity: 0.7 }}>Due soon</div>
        </div>
        <div className="stat" style={{ background: 'var(--yellow-soft)' }}>
          <div className="v" style={{ color: '#8A6620' }}>{completed}</div>
          <div className="l" style={{ color: '#8A6620', opacity: 0.7 }}>Completed</div>
        </div>
      </div>

      {/* ── Analytics glance strip ── */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 22, padding: '16px 18px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06)',
        }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Performance</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 1 }}>Your inspection trend</div>
            </div>
            <button onClick={() => onTab('analytics')} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '6px 12px', borderRadius: 20,
              background: 'var(--blue-soft)', border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 700, color: 'var(--blue)',
            }}>
              Full view
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          {/* Sparkline + KPIs side by side */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <MiniSparkline data={sparkData} color={trendDown ? '#2FB67C' : '#E2563B'} />
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>Observations per inspection</div>
            </div>
            <div style={{ display: 'flex', flex: 1, gap: 8 }}>
              <div style={{ flex: 1, padding: '8px 10px', background: 'rgba(0,0,0,0.03)', borderRadius: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>27</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>Total inspections</div>
              </div>
              <div style={{ flex: 1, padding: '8px 10px', background: 'rgba(0,0,0,0.03)', borderRadius: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#2FB67C' }}>11.3</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>Avg obs / insp</div>
              </div>
            </div>
          </div>

          {/* Top risk chapter bar */}
          <div style={{ padding: '10px 12px', background: 'rgba(226,86,59,0.06)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: '#E2563B', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>Cargo Operations</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Highest finding rate across your inspections</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#E2563B' }}>88%</div>
          </div>
        </div>
      </div>

      {/* ── Recent inspections ── */}
      <div style={{ padding: '22px 16px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Recent inspections</div>
        <button style={{ fontSize: 13, color: 'var(--ink-3)', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onTab('inspect')}>See all</button>
      </div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {recent.map(i => <InspectionCard key={i.id} inspection={i} onClick={() => onOpenInspection(i.id)} compact />)}
      </div>
    </div>
  );
}

Object.assign(window, { BottomNav, HomeScreen, TABS });
