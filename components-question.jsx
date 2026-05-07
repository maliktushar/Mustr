// components-question.jsx — The detailed Question card

function highlight(text, q) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <Fragment>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </Fragment>
  );
}

function QuestionCard({ question: q, answer, update, search, vesselName, onOpenGuidance }) {
  const [expanded, setExpanded] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [socOpen, setSocOpen] = useState(false);
  const [nocOpen, setNocOpen] = useState(false);

  const compliance = answer.compliance;
  const isAnswered = !!compliance;

  const setComp = (c) => {
    update({ compliance: c });
  };

  const subjects = answer.subjects || [];
  const socSelections = answer.socSelections || {};
  const totalSocCount = Object.values(socSelections).reduce((a, b) => a + (b?.length || 0), 0);

  const toggleSubject = (s) => {
    const next = subjects.includes(s) ? subjects.filter(x => x !== s) : [...subjects, s];
    // remove SOC selections for unselected subjects
    const cleaned = {};
    for (const k of next) if (socSelections[k]) cleaned[k] = socSelections[k];
    update({ subjects: next, socSelections: cleaned });
  };

  const aiActions = [
    { l: 'Proof-read', i: 'check' },
    { l: 'Rephrase', i: 'pencil' },
    { l: 'Elaborate', i: 'plus' },
    { l: 'Shorten', i: 'minus' },
  ];

  const applyAi = (action) => {
    const cur = answer.comment || '';
    let next = cur;
    if (action === 'Proof-read') next = cur.replace(/\s+/g, ' ').trim();
    else if (action === 'Rephrase') next = cur ? `Inspector observed: ${cur.toLowerCase()}` : 'Inspector confirmed observation during inspection.';
    else if (action === 'Elaborate') next = `${cur} Additional context: condition was verified visually and corroborated against ship records during the walkthrough.`;
    else if (action === 'Shorten' && cur) next = cur.split('.')[0] + '.';
    update({ comment: next });
    setAiOpen(false);
  };

  return (
    <div className="card" style={{ padding: 16, position: 'relative' }}>
      {/* Top: ref + type + status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em',
          color: 'var(--ink)', background: 'var(--cream)',
          padding: '2px 8px', borderRadius: 6,
        }}>{q.ref}</span>
        <span className="chip" style={{
          background: q.type === 'Core' ? 'var(--blue-soft)' : 'var(--yellow-soft)',
          color: q.type === 'Core' ? 'var(--blue-deep)' : '#8A6620',
        }}>{q.type}</span>
        <div style={{ flex: 1 }} />
        {isAnswered ? (
          <Icon name="check-circle" size={20} color={compliance === 'compliant' ? 'var(--green)' : compliance === 'noncomp' ? 'var(--red)' : 'var(--ink-3)'} />
        ) : (
          <Icon name="circle" size={20} color="var(--ink-3)" />
        )}
      </div>

      {/* Question text */}
      <div style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--ink)', textWrap: 'pretty', marginBottom: 10 }}>
        {highlight(q.text, search)}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        <span className="chip" style={{
          background: q.risk === 'High' ? '#FBDDD4' : q.risk === 'Moderate' ? 'var(--yellow-soft)' : 'rgba(0,0,0,0.04)',
          color: q.risk === 'High' ? '#8E2A14' : q.risk === 'Moderate' ? '#8A6620' : 'var(--ink-2)',
        }}>{q.risk} risk</span>
        <span className="chip gray"><Icon name="users" size={11} /> {q.rank}</span>
        {q.equipment.map(e => <span key={e} className="chip gray">{e}</span>)}
      </div>

      {/* Compliance segmented */}
      <div className="seg">
        <button className={compliance === 'compliant' ? 'active compliant' : ''} onClick={() => setComp('compliant')}>
          <Icon name="check" size={14} color={compliance === 'compliant' ? '#fff' : 'var(--green)'} />
          Compliant
        </button>
        <button className={compliance === 'noncomp' ? 'active noncomp' : ''} onClick={() => setComp('noncomp')}>
          <Icon name="alert" size={13} color={compliance === 'noncomp' ? '#fff' : 'var(--red)'} />
          Non-compliant
        </button>
        <button className={compliance === 'na' ? 'active na' : ''} onClick={() => setComp('na')}>
          N/A
        </button>
      </div>

      {/* Concern dropdown - only when non-compliant */}
      {compliance === 'noncomp' && (
        <div style={{ marginTop: 12, padding: 12, background: 'rgba(226,86,59,.06)', borderRadius: 14, border: '1px solid rgba(226,86,59,.18)' }}>
          <div className="field-label" style={{ marginBottom: 6 }}>Subject of concern * <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--ink-3)', fontWeight: 400 }}>· choose one or more</span></div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {SUBJECT_OF_CONCERN.map(s => {
              const on = subjects.includes(s);
              return (
                <button key={s} onClick={() => toggleSubject(s)} className="chip" style={{
                  background: on ? 'var(--red)' : 'rgba(0,0,0,0.04)',
                  color: on ? '#fff' : 'var(--ink-2)',
                  height: 30, padding: '0 12px', fontSize: 12, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}>
                  {on && <Icon name="check" size={11} color="#fff" />}
                  {s}
                </button>
              );
            })}
          </div>

          {subjects.length > 0 && (
            <Fragment>
              {/* SOC tree picker trigger */}
              <button onClick={() => setSocOpen(true)} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: '10px 12px', borderRadius: 12, background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer',
                marginBottom: 10, textAlign: 'left',
              }}>
                <Icon name="grid" size={15} color="var(--ink-2)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>
                    {totalSocCount > 0 ? `${totalSocCount} item${totalSocCount > 1 ? 's' : ''} selected` : 'Pick specific items'}
                  </div>
                  {totalSocCount > 0 && (
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.3 }}>
                      {Object.entries(socSelections).flatMap(([k, ids]) => (ids || []).map(i => findNodeName(i))).slice(0, 3).join(' · ')}
                      {totalSocCount > 3 && ` +${totalSocCount - 3} more`}
                    </div>
                  )}
                </div>
                <Icon name="chevron-right" size={14} color="var(--ink-3)" />
              </button>

              {/* NOC trigger */}
              <div className="field-label" style={{ marginBottom: 6 }}>Nature of concern *</div>
              <button onClick={() => setNocOpen(true)} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: '10px 12px', borderRadius: 12, background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer',
                textAlign: 'left',
              }}>
                <Icon name="alert" size={15} color="var(--ink-2)" />
                <span style={{ flex: 1, fontSize: 13, fontWeight: answer.nature ? 500 : 400, color: answer.nature ? 'var(--ink)' : 'var(--ink-3)' }}>
                  {answer.nature || 'Select nature of concern'}
                </span>
                <Icon name="chevron-right" size={14} color="var(--ink-3)" />
              </button>
            </Fragment>
          )}
        </div>
      )}

      {socOpen && <SOCSheet subjects={subjects} selected={socSelections} onChange={(s) => update({ socSelections: s })} onClose={() => setSocOpen(false)} />}
      {nocOpen && <NOCSheet value={answer.nature} onChange={(n) => update({ nature: n })} onClose={() => setNocOpen(false)} />}

      {/* Comment box */}
      <div style={{ marginTop: 12, position: 'relative' }}>
        <textarea
          value={answer.comment || ''}
          onChange={e => update({ comment: e.target.value })}
          placeholder="Add inspector comments…"
          style={{
            width: '100%', minHeight: 70, padding: '12px 14px',
            border: 'none', borderRadius: 14,
            background: 'rgba(0,0,0,0.03)',
            fontSize: 14, fontFamily: 'inherit', color: 'var(--ink)',
            resize: 'vertical', outline: 'none',
          }}
        />
        {/* Attachments / AI bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, position: 'relative' }}>
          {[
            { i: 'paperclip', t: 'File' },
            { i: 'image', t: 'Image' },
            { i: 'mic', t: 'Audio' },
            { i: 'play', t: 'Video' },
          ].map(b => (
            <button key={b.t} className="icon-btn" style={{ width: 36, height: 36, boxShadow: 'none', background: 'rgba(0,0,0,0.04)' }}
              onClick={() => update({ attachments: [...(answer.attachments || []), b.t] })}
              title={`Attach ${b.t}`}>
              <Icon name={b.i} size={15} color="var(--ink-2)" />
            </button>
          ))}
          <div style={{ flex: 1 }} />
          {(answer.attachments || []).length > 0 && (
            <span className="chip gray">
              <Icon name="paperclip" size={11} /> {answer.attachments.length}
            </span>
          )}
          <button onClick={() => setAiOpen(!aiOpen)} className="pill sm" style={{
            background: 'linear-gradient(135deg, #FF7648, #FFC757 50%, #4A7FF8 130%)',
            color: '#fff', boxShadow: '0 2px 8px rgba(255, 118, 72, 0.3)',
            paddingLeft: 12, paddingRight: 12,
          }}>
            <Icon name="sparkle" size={13} color="#fff" /> AI rewrite
          </button>
          {aiOpen && (
            <div style={{
              position: 'absolute', right: 0, bottom: 44, zIndex: 10,
              background: '#fff', borderRadius: 14, padding: 6,
              boxShadow: '0 8px 24px rgba(0,0,0,.15)',
              display: 'flex', flexDirection: 'column', minWidth: 160,
            }}>
              {aiActions.map(a => (
                <button key={a.l} onClick={() => applyAi(a.l)} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 10px', borderRadius: 8, fontSize: 13, color: 'var(--ink)', textAlign: 'left',
                }}>
                  <Icon name={a.i} size={14} /> {a.l}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expand toggle for guidance */}
      <button onClick={() => setExpanded(!expanded)} style={{
        marginTop: 10, padding: '8px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', borderRadius: 12,
        background: 'rgba(0,0,0,0.03)',
        fontSize: 13, fontWeight: 500, color: 'var(--ink-2)',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="eye" size={14} /> Guidance & history
        </span>
        <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color="var(--ink-3)" />
      </button>

      {expanded && (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { i: 'alert', l: 'Potential observations', k: 'potential-obs', n: 4 },
            { i: 'book', l: 'Inspector guidance', k: 'inspector', n: 4 },
            { i: 'doc', l: 'Publications', k: 'publications', n: 3 },
            { i: 'history', l: 'Past observations on this vessel', k: 'past-obs', n: 2 },
            { i: 'shield', l: 'Hardware guidance', k: 'hardware', n: 3 },
            { i: 'users', l: 'Human guidance', k: 'human', n: 3 },
            { i: 'route', l: 'Process guidance', k: 'process', n: 3 },
          ].map(g => (
            <button key={g.l} onClick={() => onOpenGuidance && onOpenGuidance(g.k)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 12,
              background: 'rgba(0,0,0,0.025)',
              fontSize: 13, width: '100%', textAlign: 'left',
              transition: 'background .15s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.025)'}>
              <Icon name={g.i} size={15} color="var(--ink-2)" />
              <span style={{ flex: 1, color: 'var(--ink)' }}>{g.l}</span>
              {g.n != null && <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{g.n} items</span>}
              <Icon name="chevron-right" size={14} color="var(--ink-3)" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { QuestionCard });
