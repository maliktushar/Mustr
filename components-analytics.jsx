// components-analytics.jsx — Analytics tab: Portfolio + Vessel History views

// ─── Mock analytics data ────────────────────────────────────
const PORTFOLIO_KPIS = {
  total: { value: 27, delta: '+4 this month', deltaColor: 'green' },
  avgObs: { value: 11.3, delta: '−1.2 vs prev', deltaColor: 'green' },
  vessels: { value: 18, delta: '6 vessel types', deltaColor: 'gray' },
  avgTime: { value: '4.2h', delta: '−0.6h vs prev', deltaColor: 'green' },
};

// Density chart — recent inspections completed by user
const DENSITY_DATA = [
  { label: 'Aurora', date: 'Apr 22', obs: 17, type: 'SIRE' },
  { label: 'Sapphire', date: 'Apr 12', obs: 9, type: 'SIRE' },
  { label: 'Cygnus', date: 'Apr 5', obs: 14, type: 'SIRE' },
  { label: 'Helios', date: 'Mar 28', obs: 22, type: 'CDI' },
  { label: 'Northern', date: 'Mar 19', obs: 8, type: 'RISQ' },
  { label: 'Polaris', date: 'Mar 11', obs: 11, type: 'SIRE' },
  { label: 'Atlas', date: 'Mar 03', obs: 6, type: 'SIRE' },
];

// Drift — observation category split per inspection
const DRIFT_DATA = [
  { label: 'Apr 22', human: 7, process: 6, hardware: 4 },
  { label: 'Apr 12', human: 3, process: 4, hardware: 2 },
  { label: 'Apr 5', human: 4, process: 5, hardware: 5 },
  { label: 'Mar 28', human: 11, process: 7, hardware: 4 },
  { label: 'Mar 19', human: 2, process: 4, hardware: 2 },
  { label: 'Mar 11', human: 5, process: 4, hardware: 2 },
];

// Top flagged chapters across user's inspections
const TOP_CHAPTERS = [
  { name: 'Cargo Operations', count: 24, pct: 88 },
  { name: 'Navigation & Comms', count: 19, pct: 72 },
  { name: 'Safety Management', count: 14, pct: 53 },
  { name: 'Crew Management', count: 11, pct: 41 },
  { name: 'Maritime Security', count: 7, pct: 26 },
];

// Vessel history — inspection timeline (4 inspections of MT Aurora Pacific)
const VESSEL_TIMELINE = [
  { id: 'h1', date: 'Jul 22', longDate: 'Jul 2022', type: 'SIRE', obs: 24 },
  { id: 'h2', date: 'Feb 23', longDate: 'Feb 2023', type: 'CDI', obs: 19 },
  { id: 'h3', date: 'Sep 23', longDate: 'Sep 2023', type: 'SIRE', obs: 14 },
  { id: 'h4', date: 'Apr 24', longDate: 'Apr 2024', type: 'SIRE', obs: 11 },
  { id: 'h5', date: 'Nov 24', longDate: 'Nov 2024', type: 'CDI', obs: 9 },
  { id: 'h6', date: 'Apr 26', longDate: 'Apr 2026', type: 'SIRE', obs: 17 },
];

// Repeated observations across the vessel's inspections
const REPEATED_OBS = [
  { ref: '5.1.2', title: 'Passage planning', count: 4, severity: 'High', firstSeen: 'Jul 22', lastSeen: 'Apr 26', soc: 'Process' },
  { ref: '7.3.4', title: 'Cargo pre-transfer checklist', count: 4, severity: 'High', firstSeen: 'Feb 23', lastSeen: 'Apr 26', soc: 'Process' },
  { ref: '4.2.1', title: 'EEBD inspection records', count: 3, severity: 'Medium', firstSeen: 'Sep 23', lastSeen: 'Apr 26', soc: 'Hardware' },
  { ref: '2.4.5', title: 'Rest-hour matrix', count: 3, severity: 'Medium', firstSeen: 'Jul 22', lastSeen: 'Nov 24', soc: 'Human' },
  { ref: '3.1.1', title: 'ECDIS chart corrections', count: 2, severity: 'Medium', firstSeen: 'Sep 23', lastSeen: 'Apr 26', soc: 'Hardware' },
  { ref: '6.2.3', title: 'SSAS test record', count: 2, severity: 'Low', firstSeen: 'Feb 23', lastSeen: 'Nov 24', soc: 'Process' },
];

// Chapter readiness scorecard
const CHAPTER_READINESS = [
  { name: 'Certification', score: 88, status: 'green', reason: 'No recent observations' },
  { name: 'Crew Management', score: 64, status: 'amber', reason: 'High severity findings' },
  { name: 'Navigation', score: 38, status: 'red', reason: 'Repeated observations' },
  { name: 'Safety Mgmt', score: 72, status: 'green', reason: 'Low recurrence' },
  { name: 'Pollution', score: 81, status: 'green', reason: 'Stable' },
  { name: 'Security', score: 58, status: 'amber', reason: 'Recent observations' },
  { name: 'Cargo Ops', score: 32, status: 'red', reason: 'High severity, recurring' },
];

// Recent vessels (for empty state)
const RECENT_VESSELS = [
  { name: 'MT Aurora Pacific', imo: '9785421', type: 'Crude Tanker', lastInsp: 'Apr 22, 2026' },
  { name: 'MV Northern Crown', imo: '9612087', type: 'Bulk', lastInsp: 'Apr 18, 2026' },
  { name: 'MT Helios Star', imo: '9723318', type: 'Chemical Tanker', lastInsp: 'Apr 25, 2026' },
  { name: 'MV Sapphire Dawn', imo: '9854712', type: 'Crude Tanker', lastInsp: 'Apr 12, 2026' },
  { name: 'MT Cygnus Voyager', imo: '9801255', type: 'Crude Tanker', lastInsp: 'Apr 5, 2026' },
];

// ─── Reusable chart primitives (SVG, no deps) ───────────────

function MiniSparkline({ data, color = '#4A7FF8', height = 40, width = 100 }) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1 || 1);
  const points = data.map((v, i) => `${i * step},${height - ((v - min) / range) * (height - 4) - 2}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Vertical bars chart with average line (Density)
function DensityChart({ data, height = 160 }) {
  const max = Math.max(...data.map(d => d.obs));
  const avg = data.reduce((a, b) => a + b.obs, 0) / data.length;
  const W = 320, H = height, padL = 8, padR = 8, padT = 16, padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const barW = innerW / data.length * 0.62;
  const slot = innerW / data.length;
  const avgY = padT + innerH - (avg / max) * innerH;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      {/* gridlines */}
      {[0.25, 0.5, 0.75, 1].map(p => (
        <line key={p} x1={padL} y1={padT + innerH * (1 - p)} x2={W - padR} y2={padT + innerH * (1 - p)} stroke="rgba(0,0,0,0.05)" />
      ))}
      {/* avg line */}
      <line x1={padL} y1={avgY} x2={W - padR} y2={avgY} stroke="var(--blue)" strokeDasharray="3 3" strokeWidth="1.5" opacity="0.6" />
      <text x={W - padR - 4} y={avgY - 4} fontSize="9" textAnchor="end" fill="var(--blue)" fontWeight="600">
        avg {avg.toFixed(1)}
      </text>
      {/* bars */}
      {data.map((d, i) => {
        const cx = padL + slot * i + slot / 2;
        const h = (d.obs / max) * innerH;
        const y = padT + innerH - h;
        const isHigh = d.obs > avg * 1.4;
        const fill = isHigh ? 'var(--red)' : d.obs > avg ? 'var(--orange)' : 'var(--blue)';
        return (
          <g key={i}>
            <rect x={cx - barW / 2} y={y} width={barW} height={h} rx="3" fill={fill} opacity="0.9" />
            <text x={cx} y={y - 4} fontSize="9" textAnchor="middle" fill="var(--ink-2)" fontWeight="600">{d.obs}</text>
            <text x={cx} y={H - 14} fontSize="9" textAnchor="middle" fill="var(--ink-3)">{d.label}</text>
            <text x={cx} y={H - 4} fontSize="8" textAnchor="middle" fill="var(--ink-3)" opacity="0.7">{d.date}</text>
          </g>
        );
      })}
    </svg>
  );
}

// 100% Stacked bar chart — Drift
function DriftChart({ data, height = 160 }) {
  const W = 320, H = height, padL = 8, padR = 8, padT = 16, padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const slot = innerW / data.length;
  const barW = slot * 0.62;
  const colors = { human: '#4A7FF8', process: '#FF7648', hardware: '#FFC757' };

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      {data.map((d, i) => {
        const total = d.human + d.process + d.hardware;
        const cx = padL + slot * i + slot / 2;
        const x = cx - barW / 2;
        let yCursor = padT;
        const segments = [
          { v: d.human, k: 'human' },
          { v: d.process, k: 'process' },
          { v: d.hardware, k: 'hardware' },
        ];
        return (
          <g key={i}>
            {segments.map((s, k) => {
              const h = (s.v / total) * innerH;
              const y = yCursor;
              yCursor += h;
              const pct = Math.round((s.v / total) * 100);
              return (
                <g key={k}>
                  <rect x={x} y={y} width={barW} height={h} fill={colors[s.k]}
                    rx={k === 0 ? 3 : 0} ry={k === 0 ? 3 : 0} />
                  {pct >= 18 && (
                    <text x={cx} y={y + h / 2 + 3} fontSize="9" textAnchor="middle"
                      fill={s.k === 'hardware' ? '#8A6620' : '#fff'} fontWeight="600">{pct}%</text>
                  )}
                </g>
              );
            })}
            <text x={cx} y={H - 10} fontSize="9" textAnchor="middle" fill="var(--ink-3)">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// Multi-line timeline chart
function TimelineChart({ data, height = 180 }) {
  if (!data.length) return null;
  const W = 320, H = height, padL = 24, padR = 16, padT = 20, padB = 32;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const max = Math.max(...data.map(d => d.obs)) * 1.15;
  const step = innerW / (data.length - 1 || 1);

  const points = data.map((d, i) => ({
    x: padL + i * step,
    y: padT + innerH - (d.obs / max) * innerH,
    ...d,
  }));
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = path + ` L ${points[points.length - 1].x} ${padT + innerH} L ${points[0].x} ${padT + innerH} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="tl-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A7FF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4A7FF8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* y gridlines */}
      {[0, 0.5, 1].map(p => (
        <g key={p}>
          <line x1={padL} y1={padT + innerH * (1 - p)} x2={W - padR} y2={padT + innerH * (1 - p)} stroke="rgba(0,0,0,0.05)" />
          <text x={padL - 4} y={padT + innerH * (1 - p) + 3} fontSize="9" textAnchor="end" fill="var(--ink-3)">{Math.round(max * p)}</text>
        </g>
      ))}
      <path d={areaPath} fill="url(#tl-grad)" />
      <path d={path} fill="none" stroke="#4A7FF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke="#4A7FF8" strokeWidth="2.5" />
          <text x={p.x} y={p.y - 10} fontSize="9" textAnchor="middle" fill="var(--ink)" fontWeight="700">{p.obs}</text>
          <text x={p.x} y={H - 14} fontSize="9" textAnchor="middle" fill="var(--ink-3)">{p.date}</text>
          <text x={p.x} y={H - 4} fontSize="8" textAnchor="middle" fill="var(--ink-3)" opacity="0.7">{p.type}</text>
        </g>
      ))}
    </svg>
  );
}

// Risk gauge (semi-circle)
function RiskGauge({ score, max = 40, size = 180 }) {
  const r = size / 2 - 14;
  const cx = size / 2;
  const cy = size / 2 + 4;
  const ratio = Math.min(score / max, 1);
  // arc from 180° to 0° (left to right)
  const startA = Math.PI;
  const endA = Math.PI * (1 - ratio);
  const x1 = cx + r * Math.cos(startA);
  const y1 = cy + r * Math.sin(startA);
  const x2 = cx + r * Math.cos(endA);
  const y2 = cy + r * Math.sin(endA);
  const largeArc = ratio > 0.5 ? 1 : 0;

  const level = score <= 10 ? 'Low' : score <= 25 ? 'Medium' : 'High';
  const color = level === 'Low' ? '#2FB67C' : level === 'Medium' ? '#E8A93C' : '#E2563B';

  // tick marks at boundaries
  const mark = (frac, label) => {
    const a = Math.PI * (1 - frac);
    const ix = cx + (r + 6) * Math.cos(a);
    const iy = cy + (r + 6) * Math.sin(a);
    return { x: ix, y: iy, label };
  };
  const m1 = mark(10 / max, 'Low');
  const m2 = mark(25 / max, 'Med');

  return (
    <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.7}`}>
      <defs>
        <linearGradient id="risk-g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2FB67C" />
          <stop offset="50%" stopColor="#E8A93C" />
          <stop offset="100%" stopColor="#E2563B" />
        </linearGradient>
      </defs>
      {/* track */}
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="14" strokeLinecap="round" />
      {/* progress */}
      <path d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
        fill="none" stroke="url(#risk-g)" strokeWidth="14" strokeLinecap="round" />
      {/* boundary ticks */}
      {[m1, m2].map((m, i) => (
        <text key={i} x={m.x} y={m.y - 2} fontSize="9" textAnchor="middle" fill="var(--ink-3)">{m.label}</text>
      ))}
      {/* center text */}
      <text x={cx} y={cy - 16} fontSize="11" textAnchor="middle" fill="var(--ink-3)" fontWeight="600" textTransform="uppercase">{level} risk</text>
      <text x={cx} y={cy + 8} fontSize="32" textAnchor="middle" fill={color} fontWeight="700">{score}</text>
      <text x={cx} y={cy + 22} fontSize="9" textAnchor="middle" fill="var(--ink-3)">/ {max}</text>
    </svg>
  );
}

// ─── Sticky filter bar ──────────────────────────────────────
function StickyBar({ children, top = 0 }) {
  return (
    <div style={{
      position: 'sticky', top, zIndex: 5,
      background: 'rgba(240,239,235,0.92)',
      backdropFilter: 'blur(8px)',
      padding: '10px 16px 10px',
      borderBottom: '1px solid rgba(0,0,0,0.04)',
    }}>{children}</div>
  );
}

function FilterPill({ label, value, onClick, icon = 'chevron-down' }) {
  return (
    <button onClick={onClick} className="pill sm" style={{
      background: '#fff', height: 34, padding: '0 12px', fontSize: 12, fontWeight: 500,
      gap: 6, display: 'inline-flex', alignItems: 'center',
    }}>
      <span style={{ color: 'var(--ink-3)' }}>{label}</span>
      <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{value}</span>
      <Icon name={icon} size={12} color="var(--ink-3)" />
    </button>
  );
}

// ─── Tab bar (My Portfolio sub-tabs) ────────────────────────
function SwipeTabs({ tabs, active, onChange }) {
  return (
    <div style={{ padding: '6px 16px 0' }}>
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            flex: 1, padding: '12px 4px', fontSize: 13, fontWeight: 600,
            color: active === t.id ? 'var(--ink)' : 'var(--ink-3)',
            borderBottom: '2px solid',
            borderBottomColor: active === t.id ? 'var(--ink)' : 'transparent',
            marginBottom: -1, transition: 'color .15s',
          }}>{t.label}</button>
        ))}
      </div>
    </div>
  );
}

// ─── PORTFOLIO VIEW ─────────────────────────────────────────
function PortfolioView() {
  const [vesselType, setVesselType] = useState('All');
  const [timeframe, setTimeframe] = useState('YTD');
  const [subTab, setSubTab] = useState('activity');
  const [filterOpen, setFilterOpen] = useState(null); // 'vesselType' | 'timeframe' | null

  return (
    <Fragment>
      <StickyBar>
        <div style={{ display: 'flex', gap: 8 }}>
          <FilterPill label="Vessel" value={vesselType} onClick={() => setFilterOpen('vesselType')} />
          <FilterPill label="" value={timeframe} onClick={() => setFilterOpen('timeframe')} icon="calendar" />
        </div>
      </StickyBar>

      <SwipeTabs
        tabs={[{ id: 'activity', label: 'Activity Overview' }, { id: 'trends', label: 'Observation Trends' }]}
        active={subTab} onChange={setSubTab}
      />

      {subTab === 'activity' && (
        <div style={{ padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* KPI grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <KpiCard
              label="Inspections" value={PORTFOLIO_KPIS.total.value} delta={PORTFOLIO_KPIS.total.delta}
              accent="var(--blue)" bg="var(--blue-soft)"
              spark={[3, 5, 4, 6, 8, 7, 9]} sparkColor="var(--blue-deep)"
            />
            <KpiCard
              label="Avg observations" value={PORTFOLIO_KPIS.avgObs.value} delta={PORTFOLIO_KPIS.avgObs.delta}
              accent="var(--orange)" bg="var(--orange-soft)"
              spark={[14, 13, 15, 12, 11, 12, 11]} sparkColor="#B8431F"
            />
            <KpiCard
              label="Vessels covered" value={PORTFOLIO_KPIS.vessels.value} delta={PORTFOLIO_KPIS.vessels.delta}
              accent="var(--ink)" bg="rgba(0,0,0,0.04)"
            />
            <KpiCard
              label="Avg inspection time" value={PORTFOLIO_KPIS.avgTime.value} delta={PORTFOLIO_KPIS.avgTime.delta}
              accent="#8A6620" bg="var(--yellow-soft)"
              spark={[6, 5.5, 5, 4.8, 4.5, 4.3, 4.2]} sparkColor="#8A6620"
            />
          </div>

          {/* Density chart card */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Observation density</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Last 7 inspections you completed</div>
              </div>
              <button style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Explain</button>
            </div>
            <DensityChart data={DENSITY_DATA} />
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--ink-3)', marginTop: 6, flexWrap: 'wrap' }}>
              <LegendDot color="var(--blue)" label="Below avg" />
              <LegendDot color="var(--orange)" label="Above avg" />
              <LegendDot color="var(--red)" label="Outlier" />
            </div>
          </div>

          {/* AI insight card */}
          <AIInsight
            text="Helios Star (Mar 28) shows an outlier observation count — 22 vs your average of 11.3. Common drivers: post-drydock readiness gap and crew change. Consider reviewing what triggered the spike."
          />
        </div>
      )}

      {subTab === 'trends' && (
        <div style={{ padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Observation drift</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Human · Process · Hardware ratio per inspection</div>
            </div>
            <DriftChart data={DRIFT_DATA} />
            <div style={{ display: 'flex', gap: 14, fontSize: 11, marginTop: 10, flexWrap: 'wrap' }}>
              <LegendDot color="#4A7FF8" label="Human" />
              <LegendDot color="#FF7648" label="Process" />
              <LegendDot color="#FFC757" label="Hardware" />
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Top flagged chapters</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Across your recent inspections</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {TOP_CHAPTERS.map((c, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</span>
                    <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{c.count} obs</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${c.pct}%`,
                      background: i === 0 ? 'var(--red)' : i === 1 ? 'var(--orange)' : 'var(--blue)',
                      borderRadius: 4,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AIInsight
            text="Your inspections lean heavily toward Process observations (avg 42%), suggesting procedural non-adherence is a recurring theme rather than equipment failure across vessels you cover."
          />
        </div>
      )}

      {/* Filter sheets */}
      {filterOpen === 'vesselType' && (
        <FilterSheet
          title="Vessel type" options={['All', 'Tanker', 'Bulk', 'Container', 'LPG / LNG', 'Chemical']}
          value={vesselType} onChange={setVesselType} onClose={() => setFilterOpen(null)}
        />
      )}
      {filterOpen === 'timeframe' && (
        <FilterSheet
          title="Timeframe" options={['Last 30 days', 'Last 90 days', 'YTD', 'Last 12 months', 'All time']}
          value={timeframe} onChange={setTimeframe} onClose={() => setFilterOpen(null)}
        />
      )}
    </Fragment>
  );
}

function KpiCard({ label, value, delta, accent, bg, spark, sparkColor }) {
  return (
    <div className="card" style={{ padding: 14, background: bg }}>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 4 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: accent, letterSpacing: '-0.02em' }}>{value}</div>
        {spark && <MiniSparkline data={spark} color={sparkColor || accent} width={50} height={22} />}
      </div>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>{delta}</div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span style={{ width: 8, height: 8, borderRadius: 4, background: color }} />
      <span style={{ color: 'var(--ink-2)', fontWeight: 500 }}>{label}</span>
    </span>
  );
}

function AIInsight({ text }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 22, overflow: 'hidden',
      background: '#F7F6F2', padding: 16,
      boxShadow: 'var(--shadow-card)',
    }}>
      <div className="muster-orb" style={{ opacity: 0.6 }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Icon name="sparkle" size={14} color="var(--orange)" />
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-2)' }}>Muster insight</span>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink)' }}>{text}</div>
      </div>
    </div>
  );
}

function FilterSheet({ title, options, value, onChange, onClose }) {
  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 80 }} />
      <div className="modal-sheet" style={{ height: 'auto', maxHeight: '60%', zIndex: 81 }}>
        <div className="modal-handle" />
        <div style={{ padding: '8px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onClose} style={{ color: 'var(--ink-3)', fontSize: 14 }}>Cancel</button>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
          <span style={{ width: 50 }} />
        </div>
        <div style={{ padding: '12px 16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {options.map(o => (
            <button key={o} onClick={() => { onChange(o); onClose(); }} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', borderRadius: 14, textAlign: 'left',
              background: value === o ? 'rgba(74,127,248,0.10)' : 'rgba(0,0,0,0.025)',
              fontSize: 14, fontWeight: value === o ? 600 : 500,
              color: value === o ? 'var(--blue-deep)' : 'var(--ink)',
            }}>
              <span>{o}</span>
              {value === o && <Icon name="check" size={16} color="var(--blue)" />}
            </button>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

// ─── VESSEL HISTORY VIEW ────────────────────────────────────
function VesselHistoryView() {
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [vesselSearchOpen, setVesselSearchOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('Last 6');
  const [filterOpen, setFilterOpen] = useState(null);
  const [subTab, setSubTab] = useState('performance');
  const [search, setSearch] = useState('');

  if (!selectedVessel) {
    // Empty state — search gateway
    const filtered = RECENT_VESSELS.filter(v =>
      v.name.toLowerCase().includes(search.toLowerCase()) || v.imo.includes(search)
    );
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        <div className="input" style={{ marginBottom: 18 }}>
          <Icon name="search" size={16} color="var(--ink-3)" />
          <input placeholder="Search by IMO or vessel name" value={search} onChange={e => setSearch(e.target.value)} autoFocus={false} />
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-3)', marginBottom: 10 }}>
          Recent inspections
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(v => (
            <button key={v.imo} onClick={() => setSelectedVessel(v)} className="card" style={{
              padding: 14, display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', width: '100%', cursor: 'pointer',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon name="ship" size={20} color="var(--blue-deep)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{v.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 3 }}>
                  IMO {v.imo} · {v.type} · {v.lastInsp}
                </div>
              </div>
              <Icon name="chevron-right" size={16} color="var(--ink-3)" />
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
              No vessels match "{search}"
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vessel selected — show analytics
  return (
    <Fragment>
      <StickyBar>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setVesselSearchOpen(true)} className="pill sm" style={{
            background: '#fff', height: 36, padding: '0 12px 0 10px', fontSize: 12, fontWeight: 600,
            gap: 8, flex: 1, justifyContent: 'flex-start',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6, background: 'var(--blue-soft)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="ship" size={12} color="var(--blue-deep)" />
            </div>
            <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedVessel.name}
            </span>
            <Icon name="chevron-down" size={12} color="var(--ink-3)" />
          </button>
          <FilterPill label="" value={timeframe} onClick={() => setFilterOpen('timeframe')} icon="calendar" />
          <button onClick={() => setExportOpen(true)} className="icon-btn" style={{ width: 36, height: 36, flexShrink: 0 }}>
            <Icon name="export" size={16} color="var(--ink)" />
          </button>
        </div>
      </StickyBar>

      <SwipeTabs
        tabs={[{ id: 'performance', label: 'Performance History' }, { id: 'risks', label: 'Persistent Risks' }]}
        active={subTab} onChange={setSubTab}
      />

      {subTab === 'performance' && (
        <div style={{ padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Vessel header card */}
          <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'linear-gradient(135deg, var(--blue), var(--blue-deep))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="ship" size={22} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>{selectedVessel.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>IMO {selectedVessel.imo} · {selectedVessel.type}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>76th</div>
              <div style={{ fontSize: 9, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>percentile</div>
            </div>
          </div>

          {/* Timeline chart */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Inspection performance</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Total observations over time</div>
              </div>
              <div className="chip green" style={{ height: 22, fontSize: 10 }}>Improving</div>
            </div>
            <TimelineChart data={VESSEL_TIMELINE} />
          </div>

          {/* Risk gauge */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Next inspection risk</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>If inspected tomorrow</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -4 }}>
              <RiskGauge score={28} size={200} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
              {[
                { label: 'Repeated observations', score: '+10', color: 'var(--red)' },
                { label: 'Severity concentration', score: '+10', color: 'var(--orange)' },
                { label: 'Trend (improving)', score: '+0', color: 'var(--green)' },
                { label: 'Time since last (5mo)', score: '+5', color: 'var(--amber)' },
              ].map((d, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 12px', background: 'rgba(0,0,0,0.025)', borderRadius: 10,
                  fontSize: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 3, background: d.color }} />
                    <span style={{ fontWeight: 500 }}>{d.label}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: d.color }}>{d.score}</span>
                </div>
              ))}
            </div>
          </div>

          <AIInsight
            text="The vessel is in the 76th percentile and trending toward improvement, but repeated procedural observations in cargo and navigation chapters keep risk elevated. Closing those would push next-inspection risk into the Low band."
          />
        </div>
      )}

      {subTab === 'risks' && (
        <div style={{ padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Repeated observations */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Repeated observations</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Across {VESSEL_TIMELINE.length} inspections</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {REPEATED_OBS.map((o, i) => {
                const sevColor = o.severity === 'High' ? 'var(--red)' : o.severity === 'Medium' ? 'var(--orange)' : 'var(--green)';
                const sevBg = o.severity === 'High' ? '#FBDDD4' : o.severity === 'Medium' ? 'var(--orange-soft)' : '#D8F1E5';
                const maxCount = Math.max(...REPEATED_OBS.map(x => x.count));
                const w = (o.count / maxCount) * 100;
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                        <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'ui-monospace, monospace', flexShrink: 0 }}>{o.ref}</span>
                        <span style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.title}</span>
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '2px 6px',
                        background: sevBg, color: sevColor,
                        borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.04em', flexShrink: 0,
                      }}>{o.severity}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 10, background: 'rgba(0,0,0,0.05)', borderRadius: 5, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${w}%`, background: sevColor, borderRadius: 5 }} />
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--ink-3)', flexShrink: 0, minWidth: 56, textAlign: 'right' }}>
                        {o.count} insp · {o.soc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chapter readiness scorecard */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Chapter readiness</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>How prepared each chapter is</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {CHAPTER_READINESS.map((c, i) => {
                const bg = c.status === 'green' ? '#D8F1E5' : c.status === 'amber' ? 'var(--yellow-soft)' : '#FBDDD4';
                const fg = c.status === 'green' ? '#1B7048' : c.status === 'amber' ? '#8A6620' : '#8E2A14';
                return (
                  <div key={i} style={{
                    padding: 12, borderRadius: 14, background: bg,
                    display: 'flex', flexDirection: 'column', gap: 4,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: fg, lineHeight: 1.2 }}>{c.name}</span>
                      <span style={{ fontSize: 18, fontWeight: 700, color: fg, letterSpacing: '-0.02em' }}>{c.score}</span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(0,0,0,0.08)', borderRadius: 2, overflow: 'hidden', marginTop: 2 }}>
                      <div style={{ height: '100%', width: `${c.score}%`, background: fg, borderRadius: 2 }} />
                    </div>
                    <div style={{ fontSize: 10, color: fg, opacity: 0.85, marginTop: 2 }}>{c.reason}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <AIInsight
            text="Cargo Operations and Navigation are your two lowest-readiness chapters, both driven by repeated procedural findings. These are the highest-leverage areas to address before the next vetting window."
          />
        </div>
      )}

      {/* Vessel switcher modal */}
      {vesselSearchOpen && (
        <VesselPickerSheet
          current={selectedVessel}
          onPick={(v) => { setSelectedVessel(v); setVesselSearchOpen(false); }}
          onClose={() => setVesselSearchOpen(false)}
          onClear={() => { setSelectedVessel(null); setVesselSearchOpen(false); }}
        />
      )}

      {/* Timeframe filter */}
      {filterOpen === 'timeframe' && (
        <FilterSheet
          title="Timeframe" options={['Last 3', 'Last 6', 'Last 12', 'All inspections']}
          value={timeframe} onChange={setTimeframe} onClose={() => setFilterOpen(null)}
        />
      )}

      {/* Export sheet */}
      {exportOpen && <ExportSheet vessel={selectedVessel} onClose={() => setExportOpen(false)} />}
    </Fragment>
  );
}

function VesselPickerSheet({ current, onPick, onClose, onClear }) {
  const [s, setS] = useState('');
  const filtered = RECENT_VESSELS.filter(v =>
    v.name.toLowerCase().includes(s.toLowerCase()) || v.imo.includes(s)
  );
  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 80 }} />
      <div className="modal-sheet" style={{ height: '78%', zIndex: 81 }}>
        <div className="modal-handle" />
        <div style={{ padding: '8px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onClear} style={{ color: 'var(--ink-3)', fontSize: 14 }}>Clear</button>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Switch vessel</div>
          <button onClick={onClose} style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600 }}>Done</button>
        </div>
        <div style={{ padding: '12px 16px 8px' }}>
          <div className="input">
            <Icon name="search" size={16} color="var(--ink-3)" />
            <input placeholder="Search by IMO or name" value={s} onChange={e => setS(e.target.value)} />
          </div>
        </div>
        <div style={{ padding: '4px 16px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map(v => (
            <button key={v.imo} onClick={() => onPick(v)} className="card" style={{
              padding: 12, display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', cursor: 'pointer',
              border: current?.imo === v.imo ? '2px solid var(--blue)' : '2px solid transparent',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name="ship" size={16} color="var(--blue-deep)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{v.name}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>IMO {v.imo} · {v.type}</div>
              </div>
              {current?.imo === v.imo && <Icon name="check" size={14} color="var(--blue)" />}
            </button>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

function ExportSheet({ vessel, onClose }) {
  const [done, setDone] = useState(null);
  const trigger = (kind) => {
    setDone(kind);
    setTimeout(() => { setDone(null); onClose(); }, 1100);
  };
  const opts = [
    { id: 'pdf', icon: 'doc', title: 'Full PDF report', sub: 'White-labelled executive summary, paginated', color: 'var(--red)', bg: '#FBDDD4' },
    { id: 'csv', icon: 'export', title: 'Raw data (CSV)', sub: 'Inspection observations & severity scores', color: 'var(--green)', bg: '#D8F1E5' },
    { id: 'png', icon: 'analytics', title: 'Snapshot (image)', sub: 'Save current chart to camera roll', color: 'var(--blue)', bg: 'var(--blue-soft)' },
  ];
  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 80 }} />
      <div className="modal-sheet" style={{ height: 'auto', maxHeight: '60%', zIndex: 81 }}>
        <div className="modal-handle" />
        <div style={{ padding: '12px 20px 4px' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Export vessel analytics</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{vessel.name} · IMO {vessel.imo}</div>
        </div>
        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {opts.map(o => (
            <button key={o.id} onClick={() => trigger(o.id)} className="card" style={{
              padding: 14, display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', width: '100%', cursor: 'pointer',
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, background: o.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {done === o.id ? <Icon name="check" size={20} color={o.color} /> : <Icon name={o.icon} size={18} color={o.color} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{o.title}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{o.sub}</div>
              </div>
              <Icon name="chevron-right" size={14} color="var(--ink-3)" />
            </button>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

// ─── Main analytics screen ──────────────────────────────────
function AnalyticsScreen() {
  const [view, setView] = useState('portfolio'); // 'portfolio' | 'history'

  return (
    <div className="app-body">
      <div style={{ height: 54 }} />
      {/* Header */}
      <div style={{ padding: '8px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Insights</div>
        </div>
        <button className="icon-btn" style={{ width: 40, height: 40 }}>
          <Icon name="sparkle" size={18} color="var(--orange)" />
        </button>
      </div>

      {/* Top segmented toggle */}
      <div style={{ padding: '0 16px 6px' }}>
        <div className="mode-toggle" style={{ width: '100%' }}>
          <button className={view === 'portfolio' ? 'active' : ''} onClick={() => setView('portfolio')} style={{ flex: 1 }}>
            My Portfolio
          </button>
          <button className={view === 'history' ? 'active' : ''} onClick={() => setView('history')} style={{ flex: 1 }}>
            Vessel History
          </button>
        </div>
      </div>

      {view === 'portfolio' ? <PortfolioView /> : <VesselHistoryView />}
    </div>
  );
}

Object.assign(window, { AnalyticsScreen });
