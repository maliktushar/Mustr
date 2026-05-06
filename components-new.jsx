// components-new.jsx — New inspection 2-step modal

const { useState: uS } = React;

function NewInspectionModal({ onClose, onCreate }) {
  const [step, setStep] = uS(1);
  const [data, setData] = uS({
    vessel: '', imo: '', company: '', flag: 'PA', type: 'SIRE 2.0',
    start: '2026-04-30', due: '2026-05-14', port: '',
    inspector: '', marineSup: '', techSup: '', operation: 'Discharging',
  });
  const set = (k, v) => setData({ ...data, [k]: v });

  const canNext = data.vessel && data.imo && data.company && data.port;
  const canCreate = data.inspector && data.marineSup && data.techSup;

  const Field = ({ label, children }) => (
    <div style={{ marginBottom: 14 }}>
      <div className="field-label">{label}</div>
      {children}
    </div>
  );

  const TextInput = ({ value, onChange, placeholder }) => (
    <div className="input">
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );

  const Select = ({ value, onChange, options }) => (
    <div className="input" style={{ paddingRight: 14 }}>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        flex: 1, border: 'none', outline: 'none', background: 'transparent',
        fontSize: 15, color: 'var(--ink)', appearance: 'none', cursor: 'pointer',
      }}>
        {options.map(o => <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>{typeof o === 'string' ? o : o.label}</option>)}
      </select>
      <Icon name="chevron-down" size={16} color="var(--ink-3)" />
    </div>
  );

  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet" style={{ height: '92%' }}>
        <div className="modal-handle" />
        {/* Header w/ progress */}
        <div style={{ padding: '8px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={step === 1 ? onClose : () => setStep(1)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={step === 1 ? 'close' : 'arrow-left'} size={20} />
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div style={{ width: 28, height: 4, borderRadius: 4, background: 'var(--blue)' }} />
            <div style={{ width: 28, height: 4, borderRadius: 4, background: step === 2 ? 'var(--blue)' : 'rgba(0,0,0,0.1)' }} />
          </div>
          <div style={{ width: 36, fontSize: 13, color: 'var(--ink-3)', textAlign: 'right' }}>{step}/2</div>
        </div>

        <div style={{ padding: '12px 20px 20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {step === 1 ? 'Step 1' : 'Step 2'}
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 22, marginTop: 2 }}>
            {step === 1 ? 'Vessel & inspection' : 'Pre-inspection details'}
          </div>

          {step === 1 ? (
            <Fragment>
              <Field label="Vessel name">
                <TextInput value={data.vessel} onChange={v => set('vessel', v)} placeholder="e.g. MT Aurora Pacific" />
              </Field>
              <Field label="IMO number">
                <TextInput value={data.imo} onChange={v => set('imo', v)} placeholder="7-digit IMO" />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field label="Flag">
                  <Select value={data.flag} onChange={v => set('flag', v)} options={FLAGS.map(f => ({ value: f.code, label: f.name }))} />
                </Field>
                <Field label="Inspection type">
                  <Select value={data.type} onChange={v => set('type', v)} options={TYPES} />
                </Field>
              </div>
              <Field label="Inspecting company">
                <Select value={data.company || COMPANIES[0]} onChange={v => set('company', v)} options={['', ...COMPANIES]} />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field label="Start date">
                  <div className="input"><Icon name="calendar" size={16} color="var(--ink-3)" /><span style={{ flex: 1 }}>{fmtDate(data.start)}</span></div>
                </Field>
                <Field label="Due date">
                  <div className="input"><Icon name="calendar" size={16} color="var(--ink-3)" /><span style={{ flex: 1 }}>{fmtDate(data.due)}</span></div>
                </Field>
              </div>
              <Field label="Port name">
                <TextInput value={data.port} onChange={v => set('port', v)} placeholder="e.g. Singapore" />
              </Field>
            </Fragment>
          ) : (
            <Fragment>
              <Field label="Inspector name">
                <TextInput value={data.inspector} onChange={v => set('inspector', v)} placeholder="Lead inspector" />
              </Field>
              <Field label="Marine superintendent">
                <TextInput value={data.marineSup} onChange={v => set('marineSup', v)} placeholder="Name" />
              </Field>
              <Field label="Technical superintendent">
                <TextInput value={data.techSup} onChange={v => set('techSup', v)} placeholder="Name" />
              </Field>
              <Field label="Operation">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {OPERATIONS.map(op => (
                    <button key={op} onClick={() => set('operation', op)} className="chip" style={{
                      background: data.operation === op ? 'var(--ink)' : 'rgba(0,0,0,0.04)',
                      color: data.operation === op ? '#fff' : 'var(--ink-2)',
                      height: 36, padding: '0 14px', fontSize: 13, cursor: 'pointer',
                    }}>{op}</button>
                  ))}
                </div>
              </Field>
              {/* Summary card */}
              <div style={{
                marginTop: 14, padding: 16, borderRadius: 18,
                background: 'var(--paper)', boxShadow: '0 1px 2px rgba(0,0,0,.04)',
              }}>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Summary</div>
                <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>{data.vessel || 'New vessel'}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  <span className="chip blue">{data.type}</span>
                  <span className="chip gray">IMO {data.imo || '—'}</span>
                  <span className="chip gray">{data.port || 'Port'}</span>
                </div>
              </div>
            </Fragment>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 16px 26px', borderTop: '1px solid var(--line-2)' }}>
          {step === 1 ? (
            <button className="pill primary" disabled={!canNext} onClick={() => setStep(2)} style={{
              width: '100%', height: 52, fontSize: 16, opacity: canNext ? 1 : 0.4,
            }}>
              Continue <Icon name="arrow-left" size={16} color="#fff" style={{ transform: 'rotate(180deg)' }} />
            </button>
          ) : (
            <button className="pill primary" disabled={!canCreate} onClick={() => onCreate(data)} style={{
              width: '100%', height: 52, fontSize: 16, opacity: canCreate ? 1 : 0.4,
            }}>
              Create inspection
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
}

Object.assign(window, { NewInspectionModal });
