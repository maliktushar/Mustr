// components-list.jsx — Inspection list, card, filters, new-inspection modal

const fmtDate = (s) => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const daysFromNow = (s) => Math.round((new Date(s) - new Date()) / 864e5);

// ─── Inspection card ────────────────────────────────────────
function InspectionCard({ inspection: i, onClick, selected, selectMode, onSelect, compact }) {
  const dn = daysFromNow(i.due);
  const dueLabel = i.status === 'completed' ? 'Submitted' : dn < 0 ? `${-dn}d overdue` : dn === 0 ? 'Due today' : `${dn}d left`;
  const dueColor = i.status === 'completed' ? 'var(--ink-3)' : dn < 3 ? 'var(--red)' : dn < 7 ? 'var(--amber)' : 'var(--ink-3)';

  return (
    <div className="card" onClick={selectMode ? () => onSelect(i.id) : onClick} style={{
      padding: 16, cursor: 'pointer', position: 'relative',
      border: selected ? '2px solid var(--blue)' : '2px solid transparent',
      transition: 'border .15s ease',
    }}>
      {selectMode && (
        <div className={`checkbox ${selected ? 'on' : ''}`} style={{ position: 'absolute', top: 14, right: 14 }}>
          {selected && <Icon name="check" size={14} color="#fff" />}
        </div>
      )}
      {/* Top: vessel + flag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <FlagDot country={i.flag} />
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          IMO {i.imo}
        </div>
        <div style={{ flex: 1 }} />
        {i.sync === 'pending' && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--amber)' }}>
            <Icon name="sync" size={12} /> Pending
          </div>
        )}
      </div>
      <div style={{ fontSize: compact ? 16 : 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 10 }}>
        {i.vessel}
      </div>

      {/* Tag row */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <span className="chip blue">{i.type}</span>
        <span className="chip gray">
          <Icon name="building" size={11} /> {i.company}
        </span>
        {!compact && <span className="chip gray">{i.workflow}</span>}
      </div>

      {/* Progress + due */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 500 }}>
              {i.answered} / {i.total} answered
            </span>
            <span style={{ fontSize: 11, fontWeight: 600 }}>
              {Math.round(i.progress * 100)}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{
              width: `${i.progress * 100}%`,
              background: i.status === 'completed' ? 'var(--green)' : 'var(--blue)',
            }} />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{fmtDate(i.due)}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: dueColor, whiteSpace: 'nowrap' }}>{dueLabel}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Filter / sort sheet ────────────────────────────────────
function FilterSheet({ onClose, filters, setFilters, sort, setSort }) {
  const toggle = (key, val) => {
    const cur = filters[key] || [];
    setFilters({ ...filters, [key]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] });
  };
  const clear = () => { setFilters({}); setSort('due-asc'); };

  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet" style={{ height: '70%' }}>
        <div className="modal-handle" />
        <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={clear} style={{ color: 'var(--ink-3)', fontSize: 14 }}>Clear all</button>
          <div style={{ fontSize: 17, fontWeight: 600 }}>Filter & sort</div>
          <button onClick={onClose} style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600 }}>Done</button>
        </div>
        <div style={{ padding: 20, overflowY: 'auto' }}>
          {/* Sort */}
          <div className="field-label">Sort by</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 22 }}>
            {[
              ['due-asc', 'Due date — earliest first'],
              ['due-desc', 'Due date — latest first'],
              ['created-desc', 'Created — newest first'],
              ['created-asc', 'Created — oldest first'],
              ['status-comp', 'Status — completed first'],
              ['status-inc', 'Status — incomplete first'],
            ].map(([v, l]) => (
              <button key={v} onClick={() => setSort(v)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 14px', borderRadius: 14,
                background: sort === v ? 'var(--blue-soft)' : 'transparent',
                color: sort === v ? 'var(--blue-deep)' : 'var(--ink)',
                fontSize: 14, fontWeight: sort === v ? 600 : 500,
              }}>
                {l}
                {sort === v && <Icon name="check" size={18} />}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="field-label">Inspection type</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
            {TYPES.map(t => (
              <button key={t} onClick={() => toggle('type', t)} className="chip" style={{
                background: (filters.type || []).includes(t) ? 'var(--ink)' : 'rgba(0,0,0,0.04)',
                color: (filters.type || []).includes(t) ? '#fff' : 'var(--ink-2)',
                height: 36, padding: '0 14px', fontSize: 13, cursor: 'pointer',
              }}>{t}</button>
            ))}
          </div>

          {/* Company filter */}
          <div className="field-label">Inspecting company</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {COMPANIES.map(c => (
              <button key={c} onClick={() => toggle('company', c)} className="chip" style={{
                background: (filters.company || []).includes(c) ? 'var(--ink)' : 'rgba(0,0,0,0.04)',
                color: (filters.company || []).includes(c) ? '#fff' : 'var(--ink-2)',
                height: 32, padding: '0 12px', fontSize: 12, cursor: 'pointer',
              }}>{c}</button>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// ─── Inspection list screen ─────────────────────────────────
function InspectionsScreen({ inspections, setInspections, onOpen, onNew }) {
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('due-asc');
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [actionsOpen, setActionsOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...inspections];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.vessel.toLowerCase().includes(q) || i.imo.includes(q) || i.company.toLowerCase().includes(q)
      );
    }
    if (filters.type?.length) list = list.filter(i => filters.type.includes(i.type));
    if (filters.company?.length) list = list.filter(i => filters.company.includes(i.company));

    list.sort((a, b) => {
      switch (sort) {
        case 'due-asc': return new Date(a.due) - new Date(b.due);
        case 'due-desc': return new Date(b.due) - new Date(a.due);
        case 'created-desc': return new Date(b.start) - new Date(a.start);
        case 'created-asc': return new Date(a.start) - new Date(b.start);
        case 'status-comp': return (a.status === 'completed' ? 0 : 1) - (b.status === 'completed' ? 0 : 1);
        case 'status-inc': return (a.status === 'completed' ? 1 : 0) - (b.status === 'completed' ? 1 : 0);
        default: return 0;
      }
    });
    return list;
  }, [inspections, search, filters, sort]);

  const toggleSelect = (id) => {
    const ns = new Set(selected);
    if (ns.has(id)) ns.delete(id); else ns.add(id);
    setSelected(ns);
  };

  const deleteSelected = () => {
    setInspections(inspections.filter(i => !selected.has(i.id)));
    setSelected(new Set());
    setSelectMode(false);
  };

  const filterCount = (filters.type?.length || 0) + (filters.company?.length || 0);

  return (
    <div className="app-body">
      <div style={{ height: 54 }} />
      {/* Header */}
      <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {filtered.length} inspections
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>Inspections</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="icon-btn" onClick={() => setActionsOpen(!actionsOpen)} style={{ position: 'relative' }}>
            <Icon name="more-v" size={20} />
            {actionsOpen && (
              <div style={{
                position: 'absolute', top: 50, right: 0, zIndex: 20,
                background: '#fff', borderRadius: 16, padding: 6, minWidth: 200,
                boxShadow: '0 8px 24px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.06)',
              }}>
                {[
                  { i: 'check-circle', l: selectMode ? 'Cancel selection' : 'Select multiple', a: () => { setSelectMode(!selectMode); setSelected(new Set()); setActionsOpen(false); } },
                  { i: 'import', l: 'Import inspections', a: () => setActionsOpen(false) },
                  { i: 'export', l: 'Export all', a: () => setActionsOpen(false) },
                ].map(o => (
                  <div key={o.l} onClick={(e) => { e.stopPropagation(); o.a(); }} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 10, fontSize: 14,
                    color: 'var(--ink)', textAlign: 'left',
                  }}>
                    <Icon name={o.i} size={16} /> {o.l}
                  </div>
                ))}
              </div>
            )}
          </button>
          <button className="pill primary" onClick={onNew}>
            <Icon name="plus" size={16} color="#fff" /> New
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
        <div className="input" style={{ flex: 1 }}>
          <Icon name="search" size={18} color="var(--ink-3)" />
          <input
            placeholder="Search vessel, IMO, company"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button onClick={() => setSearch('')}><Icon name="close" size={16} color="var(--ink-3)" /></button>}
        </div>
        <button className="icon-btn" onClick={() => setFilterOpen(true)} style={{ position: 'relative' }}>
          <Icon name="filter" size={20} />
          {filterCount > 0 && (
            <div style={{
              position: 'absolute', top: 4, right: 4,
              width: 16, height: 16, borderRadius: 8,
              background: 'var(--blue)', color: '#fff',
              fontSize: 10, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{filterCount}</div>
          )}
        </button>
      </div>

      {/* Selection bar */}
      {selectMode && (
        <div style={{
          margin: '0 16px 14px', padding: '10px 14px',
          background: 'var(--ink)', color: '#fff',
          borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{selected.size} selected</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={deleteSelected} disabled={!selected.size} style={{
              padding: '6px 12px', borderRadius: 9999,
              background: selected.size ? 'var(--red)' : 'rgba(255,255,255,0.15)',
              color: '#fff', fontSize: 13, fontWeight: 500,
              opacity: selected.size ? 1 : 0.5,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Icon name="trash" size={14} color="#fff" /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Cards */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--ink-3)' }}>
            <Icon name="search" size={32} color="var(--ink-3)" />
            <div style={{ marginTop: 12, fontSize: 14 }}>No inspections match your search</div>
          </div>
        )}
        {filtered.map(i => (
          <InspectionCard
            key={i.id}
            inspection={i}
            onClick={() => onOpen(i.id)}
            selectMode={selectMode}
            selected={selected.has(i.id)}
            onSelect={toggleSelect}
          />
        ))}
      </div>

      {filterOpen && <FilterSheet onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />}
    </div>
  );
}

Object.assign(window, { InspectionCard, InspectionsScreen, FilterSheet, fmtDate, daysFromNow });
