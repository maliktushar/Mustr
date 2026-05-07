// components-shell.jsx — Home + Bottom Nav + helpers

const { useState, useEffect, useRef, useMemo, Fragment } = React;

// ─── Bottom navigation ──────────────────────────────────────
const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'inspect', label: 'Inspect', icon: 'inspect' },
  { id: 'worklist', label: 'Worklist', icon: 'tasks' },
  { id: 'forum', label: 'Forum', icon: 'forum' },
  { id: 'analytics', label: 'Insights', icon: 'analytics' },
];

function BottomNav({ active, onChange, onAi }) {
  return (
    <div className="bottom-nav">
      <div className="bottom-nav-inner">
        {TABS.map(t => (
          <button key={t.id} className={`nav-tab ${active === t.id ? 'active' : ''}`} onClick={() => onChange(t.id)}>
            <Icon name={t.icon} size={20} />
            <span className="nav-label">{t.label}</span>
          </button>
        ))}
      </div>
      {/* Floating AI assistant */}
      <button onClick={onAi} aria-label="AI Assistant" style={{
        position: 'absolute', right: 22, bottom: 90, zIndex: 31,
        width: 56, height: 56, borderRadius: 28,
        background: 'linear-gradient(135deg, #FF7648, #FFC757 60%, #4A7FF8 130%)',
        boxShadow: '0 6px 20px rgba(255, 118, 72, 0.4), 0 1px 2px rgba(0,0,0,.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="sparkle" size={24} color="#fff" />
      </button>
    </div>
  );
}

// ─── Home screen ────────────────────────────────────────────
function HomeScreen({ inspections, onTab, onOpenInspection, onSettings }) {
  const inProgress = inspections.filter(i => i.status === 'in-progress').length;
  const completed = inspections.filter(i => i.status === 'completed').length;
  const dueSoon = inspections.filter(i => {
    const d = (new Date(i.due) - new Date()) / 864e5;
    return d > 0 && d < 7 && i.status !== 'completed';
  }).length;

  const recent = inspections.slice(0, 2);

  return (
    <div className="app-body">
      {/* Status bar spacer */}
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

      {/* Hero card with gradient orb */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{
          position: 'relative', borderRadius: 28, overflow: 'hidden',
          background: '#F7F6F2', minHeight: 260,
          boxShadow: '0 1px 2px rgba(20,20,20,.04), 0 8px 24px rgba(20,20,20,.06)',
        }}>
          <div className="muster-orb" style={{ opacity: 0.95 }} />
          <div style={{ position: 'relative', padding: '24px 22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(32,32,32,0.6)' }}>
              Welcome aboard, James
            </div>
            <div style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.1, marginTop: 8, letterSpacing: '-0.02em', maxWidth: '85%' }}>
              Ready for today's<br/>inspection?
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 18 }}>
              <button className="pill" onClick={() => onTab('inspect')}>
                <Icon name="plus" size={16} /> Start inspection
              </button>
              <button className="pill" onClick={() => onTab('inspect')}>
                Continue
              </button>
            </div>
            {/* Ask Muster bar */}
            <div style={{
              marginTop: 80,
              background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
              borderRadius: 9999, padding: '8px 8px 8px 18px',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}>
              <span style={{ flex: 1, fontSize: 14, color: 'rgba(32,32,32,0.5)' }}>Ask Muster anything</span>
              <button style={{
                width: 38, height: 38, borderRadius: 19,
                background: '#4A7FF8', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="mic" size={18} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: '20px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>This week</div>
        <button style={{ fontSize: 13, color: 'var(--ink-3)' }}>See all</button>
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

      {/* Recent inspections */}
      <div style={{ padding: '24px 16px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Recent inspections</div>
        <button style={{ fontSize: 13, color: 'var(--ink-3)' }} onClick={() => onTab('inspect')}>See all</button>
      </div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {recent.map(i => <InspectionCard key={i.id} inspection={i} onClick={() => onOpenInspection(i.id)} compact />)}
      </div>
    </div>
  );
}

Object.assign(window, { BottomNav, HomeScreen, TABS });
