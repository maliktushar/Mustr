// components-detail.jsx — Inspection detail screen w/ chapters + ROVIQ + question cards

function InspectionDetail({ inspection, answers, setAnswers, onBack, onComplete, onDelete }) {
  const [mode, setMode] = useState('chapter'); // chapter | roviq
  const [activeChapter, setActiveChapter] = useState('c1');
  const [activeRoviq, setActiveRoviq] = useState('Bridge');
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [questionFilters, setQuestionFilters] = useState({});
  const [moreOpen, setMoreOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [completeConfirm, setCompleteConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  const filteredQuestions = useMemo(() => {
    let qs = [...QUESTIONS];
    if (search) {
      const q = search.toLowerCase();
      qs = qs.filter((question) => question.text.toLowerCase().includes(q) || question.ref.includes(q));
    } else {
      qs = qs.filter((question) => mode === 'chapter' ? question.chapter === activeChapter : question.roviq === activeRoviq);
    }
    if (questionFilters.risk?.length) qs = qs.filter((q) => questionFilters.risk.includes(q.risk));
    if (questionFilters.rank?.length) qs = qs.filter((q) => questionFilters.rank.includes(q.rank));
    return qs;
  }, [search, mode, activeChapter, activeRoviq, questionFilters]);

  const answeredCount = Object.values(answers).filter((a) => a?.compliance).length;
  const totalQ = QUESTIONS.length;
  const progress = answeredCount / totalQ;

  const updateAnswer = (ref, patch) => {
    setAnswers({ ...answers, [ref]: { ...(answers[ref] || {}), ...patch } });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const filterCount = (questionFilters.risk?.length || 0) + (questionFilters.rank?.length || 0) + (questionFilters.vesselType?.length || 0) + (questionFilters.equipment?.length || 0);

  return (
    <div className="app-shell screen-enter" style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
      {/* Top bar */}
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '4px 12px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="icon-btn" onClick={onBack}><Icon name="arrow-left" size={20} /></button>
        <button className="icon-btn" onClick={() => setMoreOpen(!moreOpen)} style={{ position: 'relative' }}>
          <Icon name="more-v" size={20} />
          {moreOpen &&
          <div style={{
            position: 'absolute', top: 50, right: 0, zIndex: 30,
            background: '#fff', borderRadius: 16, padding: 6, minWidth: 220,
            boxShadow: '0 8px 24px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.06)'
          }}>
              {[
            { i: 'sync', l: 'Save & sync progress', a: () => {showToast('Synced');setMoreOpen(false);} },
            { i: 'check-circle', l: 'Complete inspection', a: () => {setCompleteConfirm(true);setMoreOpen(false);} },
            { i: 'trash', l: 'Delete inspection', red: true, a: () => {setDeleteConfirm(true);setMoreOpen(false);} }].
            map((o) =>
            <div key={o.l} onClick={(e) => {e.stopPropagation();o.a();}} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10, fontSize: 14,
              color: o.red ? 'var(--red)' : 'var(--ink)'
            }}>
                  <Icon name={o.i} size={16} /> {o.l}
                </div>
            )}
            </div>
          }
        </button>
      </div>

      {/* Vessel header */}
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <FlagDot country={inspection.flag} />
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            IMO {inspection.imo} · {inspection.port}
          </span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', fontFamily: "\"DM Sans\"" }}>{inspection.vessel}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <span className="chip blue">{inspection.type}</span>
          <span className="chip gray">{inspection.operation}</span>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{answeredCount} of {totalQ} answered</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{Math.round(progress * 100)}%</span>
          </div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${progress * 100}%` }} /></div>
        </div>
      </div>

      {/* Search & filter */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, position: 'relative' }}>
        <div className="input" style={{ flex: 1 }}>
          <Icon name="search" size={18} color="var(--ink-3)" />
          <input placeholder="Search question text" value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && <button onClick={() => setSearch('')}><Icon name="close" size={16} color="var(--ink-3)" /></button>}
        </div>
        <button className="icon-btn" onClick={() => setFilterOpen(true)} style={{ position: 'relative' }}>
          <Icon name="filter" size={20} />
          {filterCount > 0 &&
          <div style={{
            position: 'absolute', top: 4, right: 4,
            width: 16, height: 16, borderRadius: 8, background: 'var(--blue)', color: '#fff',
            fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{filterCount}</div>
          }
        </button>
      </div>

      {/* Mode toggle */}
      <div style={{ padding: '0 16px 8px', display: 'flex', justifyContent: 'center' }}>
        <div className="mode-toggle">
          <button className={mode === 'chapter' ? 'active' : ''} onClick={() => setMode('chapter')}>
            <Icon name="book" size={14} style={{ verticalAlign: -2, marginRight: 6 }} /> Chapters
          </button>
          <button className={mode === 'roviq' ? 'active' : ''} onClick={() => setMode('roviq')}>
            <Icon name="route" size={14} style={{ verticalAlign: -2, marginRight: 6 }} /> ROVIQ
          </button>
        </div>
      </div>

      {/* Chapter / ROVIQ scroller */}
      <div className="hscroll">
        {mode === 'chapter' ?
        CHAPTERS.map((c) => {
          const ans = QUESTIONS.filter((q) => q.chapter === c.id && answers[q.ref]?.compliance).length;
          const tot = QUESTIONS.filter((q) => q.chapter === c.id).length;
          return (
            <button key={c.id} className={`chapter-pill ${activeChapter === c.id ? 'active' : ''}`} onClick={() => setActiveChapter(c.id)}>
                  <span className="ch-num">Ch {c.num}</span>
                  <span className="ch-name">{c.name}</span>
                  <span className="ch-prog">{ans}/{tot} done</span>
                </button>);

        }) :
        ROVIQ.map((r) => {
          const tot = QUESTIONS.filter((q) => q.roviq === r).length;
          return (
            <button key={r} className={`chapter-pill ${activeRoviq === r ? 'active' : ''}`} onClick={() => setActiveRoviq(r)} style={{ minWidth: 'auto' }}>
                  <span className="ch-num">ROVIQ</span>
                  <span className="ch-name">{r}</span>
                  <span className="ch-prog">{tot} questions</span>
                </button>);

        })}
      </div>

      {/* Question cards */}
      <div className="app-body" style={{ paddingBottom: 40 }}>
        <div style={{ padding: '6px 16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredQuestions.length === 0 &&
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--ink-3)' }}>
              No questions match the current filters
            </div>
          }
          {filteredQuestions.map((q) =>
          <QuestionCard
            key={q.ref}
            question={q}
            answer={answers[q.ref] || {}}
            update={(patch) => updateAnswer(q.ref, patch)}
            search={search} />

          )}
        </div>
      </div>

      {/* Filter sheet for questions */}
      {filterOpen && <QuestionFilterSheet onClose={() => setFilterOpen(false)} filters={questionFilters} setFilters={setQuestionFilters} />}

      {/* Confirm dialogs */}
      {deleteConfirm &&
      <Fragment>
          <div className="modal-backdrop" onClick={() => setDeleteConfirm(false)} />
          <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 60, animation: 'popIn .2s ease'
        }}>
            <div className="dialog">
              <div style={{ fontSize: 17, fontWeight: 600 }}>Delete inspection?</div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 6 }}>
                This will permanently remove all answers and attachments for {inspection.vessel}.
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                <button className="pill" onClick={() => setDeleteConfirm(false)} style={{ flex: 1 }}>Cancel</button>
                <button className="pill" onClick={() => onDelete(inspection.id)} style={{ flex: 1, background: 'var(--red)', color: '#fff' }}>Delete</button>
              </div>
            </div>
          </div>
        </Fragment>
      }
      {completeConfirm &&
      <Fragment>
          <div className="modal-backdrop" onClick={() => setCompleteConfirm(false)} />
          <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 60, animation: 'popIn .2s ease'
        }}>
            <div className="dialog">
              <div style={{ fontSize: 17, fontWeight: 600 }}>Complete inspection?</div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 6 }}>
                You answered {answeredCount} of {totalQ} questions. Once completed, the report will be locked.
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                <button className="pill" onClick={() => setCompleteConfirm(false)} style={{ flex: 1 }}>Keep editing</button>
                <button className="pill primary" onClick={() => {setCompleteConfirm(false);onComplete();}} style={{ flex: 1 }}>Complete</button>
              </div>
            </div>
          </div>
        </Fragment>
      }

      {toast && <div className="toast">{toast}</div>}
    </div>);

}

function QuestionFilterSheet({ onClose, filters, setFilters }) {
  const toggle = (key, val) => {
    const cur = filters[key] || [];
    setFilters({ ...filters, [key]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val] });
  };
  const Group = ({ label, options, k }) =>
  <div style={{ marginBottom: 18 }}>
      <div className="field-label">{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {options.map((o) => {
        const on = (filters[k] || []).includes(o);
        return (
          <button key={o} onClick={() => toggle(k, o)} className="chip" style={{
            background: on ? 'var(--ink)' : 'rgba(0,0,0,0.04)',
            color: on ? '#fff' : 'var(--ink-2)',
            height: 32, padding: '0 12px', fontSize: 12, cursor: 'pointer'
          }}>{o}</button>);

      })}
      </div>
    </div>;

  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet" style={{ height: '80%' }}>
        <div className="modal-handle" />
        <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setFilters({})} style={{ color: 'var(--ink-3)', fontSize: 14 }}>Clear all</button>
          <div style={{ fontSize: 17, fontWeight: 600 }}>Filter questions</div>
          <button onClick={onClose} style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600 }}>Done</button>
        </div>
        <div style={{ padding: 20, overflowY: 'auto' }}>
          <Group label="Risk level" options={RISK_LEVELS} k="risk" />
          <Group label="Crew rank" options={CREW_RANKS} k="rank" />
          <Group label="Vessel type" options={VESSEL_TYPES} k="vesselType" />
          <Group label="Equipment focus" options={EQUIPMENT_FOCUS} k="equipment" />
        </div>
      </div>
    </Fragment>);

}

Object.assign(window, { InspectionDetail, QuestionFilterSheet });