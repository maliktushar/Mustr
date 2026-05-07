// components-ai.jsx — Muster AI Tab: General Assistant + Pre-Inspection Intelligence

// ─── Shared helpers ───────────────────────────────────────────

const MOCK_DIGEST = {
  vessel: 'MT Aurora Pacific', inspectionType: 'SIRE 2.0', lastInspectionDate: 'Apr 2025',
  prevFindings: [
    { ref: '2.1', chapter: 'Manning & Training', severity: 'high', finding: 'Crew matrix incomplete — 2nd Engineer entry missing for Mar 2025. Not updated after crew change.', status: 'closure_uploaded', closureNote: 'Updated matrix uploaded 14 Feb 2026. Verify current and signed by Master.' },
    { ref: '5.3', chapter: 'Cargo & Ballast', severity: 'high', finding: 'Pre-transfer cargo checklist not signed prior to commencement of discharge. Verbal briefing only.', status: 'no_closure', closureNote: null },
    { ref: '7.4', chapter: 'Safety Management', severity: 'medium', finding: 'Emergency fire pump weekly test records missing for 2 consecutive weeks.', status: 'closure_uploaded', closureNote: 'New SMS record-keeping procedure uploaded. Check actual records on board.' },
    { ref: '4.2', chapter: 'Mooring Operations', severity: 'medium', finding: 'Mooring tail condition — 3 tails on port forward cluster beyond replacement criteria. No PMS entry.', status: 'closure_uploaded', closureNote: 'Replacement record uploaded. Verify tails physically on deck.' },
  ],
  certificates: [
    { name: 'International Oil Pollution Prevention (IOPP)', ref: '1.2', expiryDate: '2026-05-24', daysLeft: 17, status: 'critical' },
    { name: 'Safe Manning Certificate', ref: '2.1', expiryDate: '2026-06-11', daysLeft: 35, status: 'warning' },
    { name: 'Maritime Labour Certificate (MLC)', ref: '2.5', expiryDate: '2026-07-30', daysLeft: 84, status: 'warning' },
    { name: 'Safety Management Certificate (SMC)', ref: '3.1', expiryDate: '2027-01-15', daysLeft: 253, status: 'ok' },
    { name: 'Load Line Certificate', ref: '1.3', expiryDate: '2028-09-01', daysLeft: 847, status: 'ok' },
  ],
  pscHistory: [
    { date: 'Aug 2025', port: 'Rotterdam', mou: 'Paris MOU', result: 'detained', deficiencies: ['Code 17 — ISM: Emergency fire pump test records', 'Code 10 — Fire safety: Fixed CO2 system inspection overdue'], sireMapping: ['7.4', '7.6'] },
    { date: 'Mar 2025', port: 'Singapore', mou: 'Tokyo MOU', result: 'deficiency', deficiencies: ['Code 04 — IOPP supplement not updated'], sireMapping: ['1.2'] },
    { date: 'Nov 2024', port: 'Houston', mou: 'USCG', result: 'clean', deficiencies: [], sireMapping: [] },
  ],
  hvpqAlerts: [
    { field: 'Cargo pump type', declared: '2 × centrifugal, 1500 m³/hr capacity', ref: '6.1.2', instruction: 'Verify pump type and nameplate rating match declaration.' },
    { field: 'IG system', declared: 'Flue gas system fitted', ref: '6.3.1', instruction: 'Confirm IG system type — flue gas vs inert gas generator.' },
    { field: 'Crew working language', declared: 'English', ref: '2.2.1', instruction: 'Verify Master and officers communicate in English during inspection.' },
  ],
};

// ─── AI Chat responses (domain-specific) ─────────────────────
const AI_RESPONSES = {
  default: "I'm Muster AI — a maritime inspection assistant. I can help with SIRE 2.0, RISQ and CDI questions, observation writing, regulation references, and interpreting pre-inspection documents. What would you like to know?",
  keywords: [
    { match: ['sire', '7.3.4', 'pre-transfer', 'briefing'],
      reply: "Ref 7.3.4 requires the pre-transfer meeting to be completed *before* cargo operations commence. The checklist must be signed by both the vessel officer and the terminal representative. A verbal briefing alone does not satisfy this requirement — the documentation piece is what OCIMF assesses. If the checklist was signed 20 minutes after valves opened, that is a non-compliance. I would recommend noting the verbal briefing was comprehensive as a mitigating factor in your observation text." },
    { match: ['psc', 'detention', 'code 17', 'ism'],
      reply: "PSC Code 17 relates to ISM deficiencies. In the context of a SIRE inspection, Code 17 findings typically map to Chapter 3 (Safety Management System) questions — specifically around SMS implementation, record-keeping, and drill execution. A recent PSC detention under Code 17 is a strong signal to focus inspection time on refs 3.x and 7.x." },
    { match: ['iopp', 'certificate', 'marpol', 'pollution'],
      reply: "The IOPP Certificate (International Oil Pollution Prevention) is issued under MARPOL Annex I. It maps to SIRE ref 1.2 in the Certification chapter. Key things to verify: the supplement is current and matches the vessel's actual equipment list, the ORB entries are complete for the last 3 years, and any retained oily water has been processed through a compliant OWS." },
    { match: ['rest hours', 'mlc', 'fatigue', 'watchkeeping'],
      reply: "Rest hour compliance under MLC 2006 requires minimum 10 hours rest in any 24-hour period and minimum 77 hours in any 7-day period. When records show patterns of repeated minimum rest periods, this can indicate manipulation. While technically compliant records are difficult to mark non-compliant without additional evidence, SIRE allows you to note the pattern as an observation under ref 2.4 and flag it as a Human Factor concern." },
    { match: ['ecdis', 'chart', 'navigation'],
      reply: "ECDIS chart correction falls under SIRE ref 3.1. The vessel must be able to demonstrate an up-to-date chart correction procedure and show that ENCs are current. Ask the 2nd Officer to show the AVCS update log — gaps indicate the procedure is not being followed. Also verify that the ECDIS back-up arrangement is in place and that officers can demonstrate a manual fix if ECDIS fails." },
    { match: ['mooring', 'tail', 'rope', 'line'],
      reply: "Mooring equipment assessment falls under SIRE refs 4.1–4.3. Key things to check: mooring tail condition against the company replacement criteria (usually specified in the SMS), wire rope end terminations, fairlead and bitts condition, and that a mooring equipment management plan exists. If tails show visible wear beyond the criteria but no PMS defect has been raised, that is typically a non-compliant finding under Process (procedure not followed) and Hardware." },
    { match: ['pump room', 'bilge', 'alarm'],
      reply: "Pump room safety falls under SIRE refs 9.1–9.4 for chemical tankers and related refs for crude/product tankers. The bilge level high alarm must be functional and tested periodically — test records must be maintained in the SMS log. If the alarm is non-functional at time of inspection, that is a non-compliant finding under Hardware. Verify when the last test was conducted and whether the defect has been raised in PMS." },
    { match: ['hello', 'hi', 'hey'],
      reply: "Hello! I'm Muster AI. I'm here to help you with maritime inspections — whether that's SIRE 2.0 question interpretation, MARPOL references, observation writing, or analysing your pre-inspection documents. What can I help with today?" },
  ],
};

function getAIResponse(input) {
  var lower = input.toLowerCase();
  for (var i = 0; i < AI_RESPONSES.keywords.length; i++) {
    var item = AI_RESPONSES.keywords[i];
    if (item.match.some(function(k) { return lower.includes(k); })) {
      return item.reply;
    }
  }
  return AI_RESPONSES.default;
}

// Voice sample transcripts for demo
var VOICE_SAMPLES = [
  "What does SIRE 2.0 say about pre-transfer briefings for cargo operations?",
  "How do I handle rest hour records that look compliant but seem manipulated?",
  "Emergency fire pump alarm was not working and no maintenance record found.",
];

// ─── General AI Chat ──────────────────────────────────────────
function GeneralChat() {
  var [messages, setMessages] = useState([
    { id: 'm0', from: 'ai', text: AI_RESPONSES.default, time: 'now' },
  ]);
  var [input, setInput] = useState('');
  var [loading, setLoading] = useState(false);
  var [recording, setRecording] = useState(false);
  var [recSeconds, setRecSeconds] = useState(0);
  var [attachments, setAttachments] = useState([]);
  var timerRef = useRef(null);
  var bottomRef = useRef(null);
  var inputRef = useRef(null);
  var sampleIdx = useRef(0);

  useEffect(function() {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function sendMessage(text) {
    var txt = (text || input).trim();
    if (!txt && attachments.length === 0) return;
    var userMsg = { id: 'm' + Date.now(), from: 'user', text: txt, time: 'now', attachments: attachments.slice() };
    setMessages(function(m) { return [...m, userMsg]; });
    setInput(''); setAttachments([]); setLoading(true);
    setTimeout(function() {
      var reply = { id: 'm' + (Date.now() + 1), from: 'ai', text: getAIResponse(txt), time: 'now' };
      setMessages(function(m) { return [...m, reply]; });
      setLoading(false);
    }, 1100);
  }

  function startRecording() {
    setRecording(true); setRecSeconds(0);
    timerRef.current = setInterval(function() { setRecSeconds(function(s) { return s + 1; }); }, 1000);
    // Simulate transcription
    var sample = VOICE_SAMPLES[sampleIdx.current % VOICE_SAMPLES.length];
    sampleIdx.current++;
    var words = sample.split(' ');
    var i = 0;
    setInput('');
    var wordInt = setInterval(function() {
      i += 2;
      setInput(words.slice(0, i).join(' '));
      if (i >= words.length) clearInterval(wordInt);
    }, 100);
  }

  function stopRecording() {
    setRecording(false);
    clearInterval(timerRef.current);
  }

  function addAttachment(name) {
    setAttachments(function(a) { return [...a, { name: name, size: Math.round(Math.random() * 900 + 100) + ' KB' }]; });
  }

  function formatTime(s) {
    return Math.floor(s / 60).toString().padStart(2, '0') + ':' + (s % 60).toString().padStart(2, '0');
  }

  var SUGGESTED = [
    'How do I call ref 7.3.4?',
    'IOPP certificate checks',
    'Rest hour manipulation signs',
    'Pump room alarm non-compliance',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Suggested prompts — show only when just the greeting */}
        {messages.length === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Try asking</div>
            {SUGGESTED.map(function(s) {
              return (
                <button key={s} onClick={function() { sendMessage(s); }} style={{
                  textAlign: 'left', padding: '10px 14px', borderRadius: 14,
                  background: 'var(--paper)', border: '1px solid var(--line)',
                  fontSize: 13, color: 'var(--ink)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: 'var(--shadow-card)',
                }}>
                  <Icon name="sparkle" size={14} color="var(--blue)" />
                  {s}
                </button>
              );
            })}
          </div>
        )}

        {messages.map(function(msg) {
          var isAI = msg.from === 'ai';
          return (
            <div key={msg.id} style={{ display: 'flex', justifyContent: isAI ? 'flex-start' : 'flex-end', gap: 8, alignItems: 'flex-end' }}>
              {isAI && (
                <div style={{ width: 28, height: 28, borderRadius: 14, background: 'linear-gradient(135deg, #FF7648, #4A7FF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="sparkle" size={14} color="#fff" />
                </div>
              )}
              <div style={{ maxWidth: '78%' }}>
                {/* Attachments */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 5, alignItems: 'flex-end' }}>
                    {msg.attachments.map(function(a, i) {
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 14, background: 'rgba(74,127,248,0.1)', border: '1px solid rgba(74,127,248,0.2)' }}>
                          <span style={{ fontSize: 14 }}>📎</span>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)' }}>{a.name}</div>
                            <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>{a.size}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* Bubble */}
                {msg.text && (
                  <div style={{
                    padding: '11px 15px', borderRadius: 20,
                    borderBottomRightRadius: isAI ? 20 : 4,
                    borderBottomLeftRadius: isAI ? 4 : 20,
                    background: isAI ? 'var(--paper)' : 'var(--blue)',
                    color: isAI ? 'var(--ink)' : '#fff',
                    fontSize: 14, lineHeight: 1.55,
                    boxShadow: 'var(--shadow-card)',
                  }}>
                    {msg.text}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: 'linear-gradient(135deg, #FF7648, #4A7FF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="sparkle" size={14} color="#fff" />
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '20px 20px 20px 4px', background: 'var(--paper)', display: 'flex', gap: 5, alignItems: 'center', boxShadow: 'var(--shadow-card)' }}>
              {[0, 1, 2].map(function(i) {
                return <div key={i} style={{ width: 7, height: 7, borderRadius: 4, background: 'var(--ink-3)', animation: 'dotPulse 1.2s ease-in-out ' + (i * 0.2) + 's infinite' }} />;
              })}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Attachment previews above input */}
      {attachments.length > 0 && (
        <div style={{ padding: '6px 16px 0', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {attachments.map(function(a, i) {
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 20, background: 'rgba(74,127,248,0.1)', border: '1px solid rgba(74,127,248,0.2)' }}>
                <span style={{ fontSize: 12 }}>📎</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue)' }}>{a.name}</span>
                <button onClick={function() { setAttachments(function(prev) { return prev.filter(function(_, j) { return j !== i; }); }); }} style={{ fontSize: 14, color: 'var(--ink-3)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>×</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Input bar */}
      <div style={{ padding: '8px 16px 20px', background: 'var(--cream)', borderTop: '1px solid var(--line)' }}>
        {recording ? (
          /* Recording state */
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(226,86,59,0.08)', borderRadius: 24, border: '1.5px solid rgba(226,86,59,0.3)' }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: '#E2563B', animation: 'dotPulse 1s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 14, color: '#E2563B', fontWeight: 600 }}>Listening… {formatTime(recSeconds)}</span>
            <button onClick={stopRecording} style={{ padding: '6px 14px', borderRadius: 20, background: '#E2563B', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>Done</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            {/* Attach button */}
            <button onClick={function() { addAttachment(['OCIMF_pack.pdf','PSC_history.pdf','vessel_certs.pdf'][Math.floor(Math.random()*3)]); }} style={{ width: 40, height: 40, borderRadius: 20, background: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </button>

            {/* Text input */}
            <div style={{ flex: 1, background: 'var(--paper)', borderRadius: 22, border: '1px solid var(--line)', padding: '10px 14px', display: 'flex', alignItems: 'center', minHeight: 42 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={function(e) { setInput(e.target.value); }}
                onKeyDown={function(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Ask Muster AI anything…"
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: 'var(--ink)' }}
              />
            </div>

            {/* Send / mic button */}
            {input.trim() || attachments.length > 0 ? (
              <button onClick={function() { sendMessage(); }} style={{ width: 40, height: 40, borderRadius: 20, background: 'var(--blue)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            ) : (
              <button onClick={startRecording} style={{ width: 40, height: 40, borderRadius: 20, background: 'linear-gradient(135deg, #FF7648, #4A7FF8)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <Icon name="mic" size={18} color="#fff" />
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        @keyframes aiSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ─── Pre-Inspection Intelligence ──────────────────────────────
function PreInspectionPanel() {
  var [digest, setDigest] = useState(null);
  var [processing, setProcessing] = useState(false);
  var [step, setStep] = useState(0);
  var [activeTab, setActiveTab] = useState('findings');

  var STEPS = [
    'Reading last inspection report…',
    'Extracting PSC history…',
    'Parsing certificate repository…',
    'Mapping closure evidence…',
    'Generating inspection brief…',
  ];

  function handleUpload() {
    setProcessing(true); setStep(0);
    var i = 0;
    var interval = setInterval(function() {
      i++;
      setStep(i);
      if (i >= STEPS.length) {
        clearInterval(interval);
        setTimeout(function() { setDigest(MOCK_DIGEST); setProcessing(false); }, 500);
      }
    }, 650);
  }

  if (processing) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: 30, background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <div style={{ width: 26, height: 26, borderRadius: 13, border: '3px solid var(--blue)', borderTopColor: 'transparent', animation: 'aiSpin 0.8s linear infinite' }} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Analysing documents…</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STEPS.map(function(s, i) {
            var done = step > i; var active = step === i;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderRadius: 14, background: done ? 'rgba(47,182,124,0.07)' : active ? 'var(--blue-soft)' : 'rgba(0,0,0,0.03)', transition: 'all .3s' }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? '#2FB67C' : active ? 'var(--blue)' : 'rgba(0,0,0,0.08)' }}>
                  {done ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    : active ? <div style={{ width: 8, height: 8, borderRadius: 4, border: '2px solid #fff', borderTopColor: 'transparent', animation: 'aiSpin 0.8s linear infinite' }} />
                    : null}
                </div>
                <span style={{ fontSize: 13, color: done ? '#1B7048' : active ? 'var(--blue-deep)' : 'var(--ink-3)', fontWeight: active ? 700 : 400 }}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!digest) {
    return (
      <div style={{ padding: '16px 16px 24px' }}>
        {/* Feature cards */}
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>What the AI extracts for you</div>
        {[
          { icon: '📋', title: 'Previous non-compliances', desc: 'Every past finding mapped to its SIRE ref, with closure evidence status', color: 'var(--blue-soft)' },
          { icon: '📜', title: 'Certificate watch', desc: 'All certs with expiry dates and traffic-light urgency mapped to SIRE refs', color: '#D8F1E5' },
          { icon: '🔍', title: 'Closure evidence checker', desc: 'Which findings have uploaded evidence and exactly what to verify on board', color: 'var(--yellow-soft)' },
          { icon: '⚓', title: 'HVPQ cross-reference', desc: 'Key equipment declarations attached to the relevant question cards', color: 'var(--orange-soft)' },
          { icon: '🚢', title: 'PSC history mapping', desc: 'Recent PSC deficiencies translated to equivalent SIRE refs', color: 'rgba(74,127,248,0.1)' },
        ].map(function(card) {
          return (
            <div key={card.title} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'var(--paper)', borderRadius: 18, marginBottom: 10, boxShadow: 'var(--shadow-card)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{card.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{card.title}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.45 }}>{card.desc}</div>
              </div>
            </div>
          );
        })}

        {/* Upload zone */}
        <button onClick={handleUpload} style={{
          width: '100%', border: 'none', cursor: 'pointer', padding: 0, marginTop: 4,
          borderRadius: 20, overflow: 'hidden',
          outline: '2px dashed rgba(74,127,248,0.3)', background: 'rgba(74,127,248,0.03)',
          transition: 'all .2s',
        }}>
          <div style={{ padding: '26px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 34, marginBottom: 10 }}>📄</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>Upload OCIMF Pre-Inspection Pack</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: 16 }}>PDF from OCIMF portal — last inspection report, certificates, PSC history</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 20px', borderRadius: 20, background: 'var(--blue)', color: '#fff', fontSize: 13, fontWeight: 700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Select PDF
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Digest view
  var noClosure = digest.prevFindings.filter(function(f) { return f.status === 'no_closure'; }).length;
  var critCerts = digest.certificates.filter(function(c) { return c.status === 'critical'; }).length;
  var warnCerts = digest.certificates.filter(function(c) { return c.status === 'warning'; }).length;
  var detained = digest.pscHistory.filter(function(p) { return p.result === 'detained'; }).length;
  var highCount = digest.prevFindings.filter(function(f) { return f.severity === 'high'; }).length;

  return (
    <div style={{ padding: '0 16px' }}>
      {/* Brief header */}
      <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', marginBottom: 14 }}>
        <div className="muster-orb" style={{ opacity: 0.7 }} />
        <div style={{ position: 'relative', padding: '16px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pre-Inspection Brief</div>
          <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>{digest.vessel}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{digest.inspectionType} · Last inspection {digest.lastInspectionDate}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {highCount > 0 && <span style={{ padding: '3px 9px', borderRadius: 8, background: '#FBDDD4', color: '#8E2A14', fontSize: 11, fontWeight: 700 }}>⚠ {highCount} high-risk refs</span>}
            {noClosure > 0 && <span style={{ padding: '3px 9px', borderRadius: 8, background: 'var(--yellow-soft)', color: '#8A6620', fontSize: 11, fontWeight: 700 }}>📋 {noClosure} no closure evidence</span>}
            {critCerts > 0 && <span style={{ padding: '3px 9px', borderRadius: 8, background: '#FBDDD4', color: '#8E2A14', fontSize: 11, fontWeight: 700 }}>🔴 {critCerts} cert critical</span>}
            {detained > 0 && <span style={{ padding: '3px 9px', borderRadius: 8, background: '#FBDDD4', color: '#8E2A14', fontSize: 11, fontWeight: 700 }}>PSC detained</span>}
          </div>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 14 }}>
        {[
          { id: 'findings', label: 'Findings', count: digest.prevFindings.length },
          { id: 'certs', label: 'Certificates', count: critCerts + warnCerts },
          { id: 'psc', label: 'PSC', count: detained },
          { id: 'hvpq', label: 'HVPQ', count: digest.hvpqAlerts.length },
        ].map(function(tab) {
          var active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={function() { setActiveTab(tab.id); }} style={{
              flexShrink: 0, padding: '6px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: active ? 'var(--ink)' : 'rgba(0,0,0,0.06)',
              color: active ? '#fff' : 'var(--ink-2)', fontSize: 12, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 5, transition: 'all .15s',
            }}>
              {tab.label}
              {tab.count > 0 && <span style={{ padding: '1px 5px', borderRadius: 8, background: active ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.1)', fontSize: 10, fontWeight: 700 }}>{tab.count}</span>}
            </button>
          );
        })}
      </div>

      {activeTab === 'findings' && digest.prevFindings.map(function(f) {
        var hasClosure = f.status === 'closure_uploaded';
        return (
          <div key={f.ref} style={{ background: 'var(--paper)', borderRadius: 18, overflow: 'hidden', marginBottom: 10, boxShadow: 'var(--shadow-card)' }}>
            <div style={{ height: 3, background: f.severity === 'high' ? '#E2563B' : f.severity === 'medium' ? '#E8A93C' : '#2FB67C' }} />
            <div style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--blue)' }}>Ref {f.ref}</span>
                <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>· {f.chapter}</span>
                <div style={{ flex: 1 }} />
                <span style={{ padding: '2px 7px', borderRadius: 7, background: hasClosure ? '#D8F1E5' : '#FBDDD4', color: hasClosure ? '#1B7048' : '#8E2A14', fontSize: 10, fontWeight: 700 }}>
                  {hasClosure ? 'Evidence uploaded' : 'No evidence'}
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.55, marginBottom: hasClosure ? 8 : 0 }}>{f.finding}</div>
              {hasClosure && f.closureNote && (
                <div style={{ padding: '7px 10px', background: 'rgba(47,182,124,0.07)', borderRadius: 10, border: '1px solid rgba(47,182,124,0.15)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#1B7048', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Verify on board</div>
                  <div style={{ fontSize: 12, color: '#1B7048', lineHeight: 1.4 }}>{f.closureNote}</div>
                </div>
              )}
              {!hasClosure && <div style={{ marginTop: 7, padding: '6px 10px', background: 'rgba(226,86,59,0.06)', borderRadius: 10 }}><div style={{ fontSize: 11, color: '#8E2A14', fontWeight: 600 }}>⚠ No closure evidence — probe carefully during inspection</div></div>}
            </div>
          </div>
        );
      })}

      {activeTab === 'certs' && digest.certificates.map(function(cert) {
        var statusColor = cert.status === 'critical' ? '#E2563B' : cert.status === 'warning' ? '#E8A93C' : '#2FB67C';
        var statusBg = cert.status === 'critical' ? '#FBDDD4' : cert.status === 'warning' ? 'var(--yellow-soft)' : '#D8F1E5';
        return (
          <div key={cert.name} style={{ background: 'var(--paper)', borderRadius: 16, padding: '12px 14px', marginBottom: 8, boxShadow: 'var(--shadow-card)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: statusColor, flexShrink: 0, marginTop: 4 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{cert.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>SIRE Ref {cert.ref} · Expires {cert.expiryDate}</div>
            </div>
            <div style={{ padding: '3px 8px', borderRadius: 8, background: statusBg, color: statusColor, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
              {cert.status !== 'ok' ? cert.daysLeft + ' days' : 'Valid'}
            </div>
          </div>
        );
      })}

      {activeTab === 'psc' && digest.pscHistory.map(function(psc, i) {
        var isDetained = psc.result === 'detained';
        var isClean = psc.result === 'clean';
        return (
          <div key={i} style={{ background: 'var(--paper)', borderRadius: 18, overflow: 'hidden', marginBottom: 10, boxShadow: 'var(--shadow-card)' }}>
            <div style={{ height: 3, background: isDetained ? '#E2563B' : isClean ? '#2FB67C' : '#E8A93C' }} />
            <div style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{psc.port}</span>
                <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>· {psc.date} · {psc.mou}</span>
                <div style={{ flex: 1 }} />
                <span style={{ padding: '2px 8px', borderRadius: 8, background: isDetained ? '#FBDDD4' : isClean ? '#D8F1E5' : 'var(--yellow-soft)', color: isDetained ? '#8E2A14' : isClean ? '#1B7048' : '#8A6620', fontSize: 10, fontWeight: 700 }}>
                  {isDetained ? 'Detained' : isClean ? 'Clean' : 'Deficiency'}
                </span>
              </div>
              {psc.deficiencies.map(function(d, j) {
                return (
                  <div key={j} style={{ padding: '7px 10px', background: 'rgba(0,0,0,0.03)', borderRadius: 10, marginBottom: 6 }}>
                    <div style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1.4 }}>{d}</div>
                    {psc.sireMapping[j] && <div style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, marginTop: 3 }}>→ Maps to SIRE Ref {psc.sireMapping[j]}</div>}
                  </div>
                );
              })}
              {isClean && <div style={{ fontSize: 13, color: '#1B7048' }}>No deficiencies recorded.</div>}
            </div>
          </div>
        );
      })}

      {activeTab === 'hvpq' && (
        <Fragment>
          <div style={{ padding: '10px 12px', background: 'var(--blue-soft)', borderRadius: 14, fontSize: 12, color: 'var(--blue-deep)', lineHeight: 1.5, marginBottom: 10 }}>
            Declarations from the HVPQ. Verify each one matches what you observe on board.
          </div>
          {digest.hvpqAlerts.map(function(alert, i) {
            return (
              <div key={i} style={{ background: 'var(--paper)', borderRadius: 16, padding: '12px 14px', marginBottom: 10, boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 7 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--blue)' }}>Ref {alert.ref}</span>
                  <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>· {alert.field}</span>
                </div>
                <div style={{ padding: '6px 10px', background: 'rgba(74,127,248,0.06)', borderRadius: 10, marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{alert.declared}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8A93C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <div style={{ fontSize: 12, color: '#8A6620', lineHeight: 1.45 }}>{alert.instruction}</div>
                </div>
              </div>
            );
          })}
        </Fragment>
      )}

      <div style={{ height: 24 }} />
    </div>
  );
}

// ─── Main AI Screen (Tab) ─────────────────────────────────────
function AIScreen() {
  var [mode, setMode] = useState('chat'); // 'chat' | 'preinspection'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ padding: '6px 20px 10px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Muster</div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: 8 }}>
              AI Assistant
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#2FB67C', boxShadow: '0 0 0 3px rgba(47,182,124,0.2)' }} />
            </div>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="mode-toggle" style={{ width: '100%' }}>
          <button className={mode === 'chat' ? 'active' : ''} onClick={function() { setMode('chat'); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            General Chat
          </button>
          <button className={mode === 'preinspection' ? 'active' : ''} onClick={function() { setMode('preinspection'); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Pre-Inspection
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: mode === 'preinspection' ? 'auto' : 'hidden', display: 'flex', flexDirection: 'column' }}>
        {mode === 'chat' ? <GeneralChat /> : <PreInspectionPanel />}
      </div>
    </div>
  );
}

Object.assign(window, { AIScreen });
