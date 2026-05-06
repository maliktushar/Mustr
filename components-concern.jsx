// components-concern.jsx — SOC tree picker (multi-select, hierarchical) + NOC single-list

function SOCNodePicker({ tree, selected, onToggle, depth = 0 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {tree.map(node => <SOCNode key={node.id} node={node} selected={selected} onToggle={onToggle} depth={depth} />)}
    </div>
  );
}

function SOCNode({ node, selected, onToggle, depth }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;
  const isSel = selected.includes(node.id);

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: `8px ${10 - depth * 2}px 8px ${10 + depth * 14}px`,
        borderRadius: 10,
        background: isSel ? 'rgba(74,127,248,0.10)' : 'transparent',
        cursor: 'pointer',
      }}>
        {hasChildren ? (
          <button onClick={() => setOpen(!open)} style={{
            width: 22, height: 22, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.04)', flexShrink: 0,
          }}>
            <Icon name={open ? 'chevron-down' : 'chevron-right'} size={12} color="var(--ink-2)" />
          </button>
        ) : (
          <div style={{ width: 22, flexShrink: 0 }} />
        )}
        <button onClick={() => onToggle(node.id)} style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 8,
          textAlign: 'left', padding: 0,
        }}>
          <div className={`checkbox ${isSel ? 'on' : ''}`} style={{ width: 18, height: 18, borderRadius: 5 }}>
            {isSel && <Icon name="check" size={11} color="#fff" />}
          </div>
          <span style={{
            fontSize: depth === 0 ? 14 : 13,
            fontWeight: depth === 0 ? 600 : 400,
            color: 'var(--ink)',
          }}>{node.name}</span>
        </button>
      </div>
      {hasChildren && open && (
        <SOCNodePicker tree={node.children} selected={selected} onToggle={onToggle} depth={depth + 1} />
      )}
    </div>
  );
}

// Helper: find a node label by id across all trees
function findNodeName(id) {
  const walk = (nodes) => {
    for (const n of nodes) {
      if (n.id === id) return n.name;
      if (n.children) {
        const f = walk(n.children);
        if (f) return f;
      }
    }
  };
  for (const k of Object.keys(SOC_TREES)) {
    const f = walk(SOC_TREES[k]);
    if (f) return f;
  }
  return id;
}

function SOCSheet({ subjects, selected, onChange, onClose }) {
  const [tab, setTab] = useState(subjects[0] || 'Hardware');
  const sel = selected || {};
  const toggle = (id) => {
    const cur = sel[tab] || [];
    onChange({ ...sel, [tab]: cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id] });
  };
  const totalSel = Object.values(sel).reduce((a, b) => a + (b?.length || 0), 0);
  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 80 }} />
      <div className="modal-sheet" style={{ height: '82%', zIndex: 81 }}>
        <div className="modal-handle" />
        <div style={{ padding: '8px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onClose} style={{ color: 'var(--ink-3)', fontSize: 14 }}>Cancel</button>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Subject of concern</div>
          <button onClick={onClose} style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600 }}>
            Done {totalSel > 0 && `(${totalSel})`}
          </button>
        </div>
        {subjects.length > 1 && (
          <div style={{ padding: '12px 16px 4px' }}>
            <div className="mode-toggle" style={{ width: '100%' }}>
              {subjects.map(s => (
                <button key={s} className={tab === s ? 'active' : ''} onClick={() => setTab(s)} style={{ flex: 1 }}>
                  {s} {(sel[s]?.length || 0) > 0 && <span style={{ marginLeft: 4, fontSize: 11, opacity: 0.7 }}>· {sel[s].length}</span>}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{ padding: '12px 16px 24px', overflowY: 'auto', flex: 1 }}>
          <SOCNodePicker tree={SOC_TREES[tab] || []} selected={sel[tab] || []} onToggle={toggle} />
        </div>
      </div>
    </Fragment>
  );
}

function NOCSheet({ value, onChange, onClose }) {
  const [search, setSearch] = useState('');
  const filtered = NOC_LIST.filter(n => n.toLowerCase().includes(search.toLowerCase()));
  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 80 }} />
      <div className="modal-sheet" style={{ height: '76%', zIndex: 81 }}>
        <div className="modal-handle" />
        <div style={{ padding: '8px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onClose} style={{ color: 'var(--ink-3)', fontSize: 14 }}>Cancel</button>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Nature of concern</div>
          <button onClick={onClose} style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600 }}>Done</button>
        </div>
        <div style={{ padding: '12px 16px 8px' }}>
          <div className="input">
            <Icon name="search" size={16} color="var(--ink-3)" />
            <input placeholder="Search nature" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div style={{ padding: '4px 16px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filtered.map(n => (
            <button key={n} onClick={() => { onChange(n); onClose(); }} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', borderRadius: 12, textAlign: 'left',
              background: value === n ? 'rgba(74,127,248,0.10)' : 'rgba(0,0,0,0.025)',
              fontSize: 14, fontWeight: value === n ? 600 : 500,
              color: value === n ? 'var(--blue-deep)' : 'var(--ink)',
            }}>
              <span>{n}</span>
              {value === n && <Icon name="check" size={16} color="var(--blue)" />}
            </button>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

Object.assign(window, { SOCSheet, NOCSheet, findNodeName });
