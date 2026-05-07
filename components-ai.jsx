// components-ai.jsx — Muster AI: Pre-Inspection Intelligence

// ─── Translation strings (multi-language) ────────────────────
const AI_STRINGS = {
  en: {
    title: 'Muster AI',
    subtitle: 'Pre-Inspection Intelligence',
    upload: 'Upload OCIMF Pre-Inspection Pack',
    uploadHint: 'PDF from OCIMF portal — last report, certificates, PSC history',
    processing: 'Analysing documents…',
    processingSteps: ['Reading last inspection report…', 'Extracting PSC history…', 'Parsing certificate repository…', 'Mapping closure evidence…', 'Generating inspection brief…'],
    digestTitle: 'Inspection Brief',
    digestSub: 'Ready before you board',
    prevFindings: 'Previous Non-Compliances',
    certWatch: 'Certificate Watch',
    pscAlerts: 'PSC History Alerts',
    closureCheck: 'Closure Evidence Tracker',
    hvpqAlerts: 'HVPQ Declaration Alerts',
    voiceNote: 'Voice Field Notes',
    voiceHint: 'Speak your observation — AI structures it for SIRE',
    listening: 'Listening…',
    tapToRecord: 'Tap to record',
    structured: 'Structured observation ready',
    confirmObs: 'Confirm & add to question',
    days: 'days',
    expires: 'expires',
    expired: 'EXPIRED',
    expiresSoon: 'Expiring soon',
    valid: 'Valid',
    verifyOnBoard: 'Verify on board',
    recurrence: 'Recurrence risk',
    noClosure: 'No closure evidence uploaded',
    closureUploaded: 'Closure evidence uploaded',
    pscCode: 'PSC Code',
    matchesSIRE: 'Maps to SIRE',
    detained: 'Detained',
    deficiency: 'Deficiency only',
    declaredAs: 'Declared in HVPQ as',
    verifyMatch: 'Verify this matches what you observe on board',
  },
  zh: {
    title: 'Muster AI',
    subtitle: '检验前智能分析',
    upload: '上传OCIMF检验前资料包',
    uploadHint: '来自OCIMF门户的PDF — 上次报告、证书、PSC历史',
    processing: '正在分析文件…',
    processingSteps: ['读取上次检验报告…', '提取PSC历史…', '解析证书库…', '映射关闭证据…', '生成检验简报…'],
    digestTitle: '检验简报',
    digestSub: '登船前准备就绪',
    prevFindings: '以往不合规项',
    certWatch: '证书监控',
    pscAlerts: 'PSC历史警报',
    closureCheck: '关闭证据追踪',
    hvpqAlerts: 'HVPQ申报警报',
    voiceNote: '语音现场备注',
    voiceHint: '说出您的观察 — AI为SIRE构建格式',
    listening: '正在收听…',
    tapToRecord: '点击录音',
    structured: '结构化观察已就绪',
    confirmObs: '确认并添加到问题',
    days: '天',
    expires: '到期',
    expired: '已过期',
    expiresSoon: '即将到期',
    valid: '有效',
    verifyOnBoard: '在船上核实',
    recurrence: '重复风险',
    noClosure: '未上传关闭证据',
    closureUploaded: '已上传关闭证据',
    pscCode: 'PSC代码',
    matchesSIRE: '对应SIRE',
    detained: '被扣押',
    deficiency: '仅缺陷',
    declaredAs: 'HVPQ中申报为',
    verifyMatch: '核实与船上实际情况相符',
  },
  fr: {
    title: 'Muster AI',
    subtitle: 'Intelligence Pré-Inspection',
    upload: 'Télécharger le pack pré-inspection OCIMF',
    uploadHint: 'PDF depuis le portail OCIMF — dernier rapport, certificats, historique PSC',
    processing: 'Analyse des documents…',
    processingSteps: ["Lecture du dernier rapport d'inspection…", 'Extraction de l\'historique PSC…', 'Analyse du référentiel de certificats…', 'Cartographie des preuves de clôture…', 'Génération du briefing d\'inspection…'],
    digestTitle: "Briefing d'Inspection",
    digestSub: 'Prêt avant l\'embarquement',
    prevFindings: 'Non-conformités précédentes',
    certWatch: 'Surveillance des certificats',
    pscAlerts: 'Alertes historique PSC',
    closureCheck: 'Suivi des preuves de clôture',
    hvpqAlerts: 'Alertes déclaration HVPQ',
    voiceNote: 'Notes vocales terrain',
    voiceHint: 'Dictez votre observation — L\'IA la structure pour SIRE',
    listening: 'Écoute en cours…',
    tapToRecord: 'Appuyer pour enregistrer',
    structured: 'Observation structurée prête',
    confirmObs: 'Confirmer et ajouter à la question',
    days: 'jours',
    expires: 'expire',
    expired: 'EXPIRÉ',
    expiresSoon: 'Expire bientôt',
    valid: 'Valide',
    verifyOnBoard: 'Vérifier à bord',
    recurrence: 'Risque de récurrence',
    noClosure: 'Aucune preuve de clôture téléchargée',
    closureUploaded: 'Preuve de clôture téléchargée',
    pscCode: 'Code PSC',
    matchesSIRE: 'Correspond à SIRE',
    detained: 'Retenu',
    deficiency: 'Déficience uniquement',
    declaredAs: 'Déclaré dans HVPQ comme',
    verifyMatch: 'Vérifiez que cela correspond à ce que vous observez à bord',
  },
};

// ─── Mock AI output data ──────────────────────────────────────
const MOCK_DIGEST = {
  vessel: 'MT Aurora Pacific',
  inspectionType: 'SIRE 2.0',
  lastInspectionDate: 'Apr 2025',
  inspector: 'R. Petrov',
  processedAt: new Date().toISOString(),

  prevFindings: [
    { ref: '2.1', chapter: 'Manning & Training', severity: 'high', finding: 'Crew matrix incomplete — 2nd Engineer entry missing for Mar 2025. Not updated after crew change.', status: 'closure_uploaded', closureNote: 'Updated matrix uploaded 14 Feb 2026. Verify current and signed by Master.' },
    { ref: '5.3', chapter: 'Cargo & Ballast', severity: 'high', finding: 'Pre-transfer cargo checklist not signed prior to commencement of discharge. Verbal briefing only.', status: 'no_closure', closureNote: null },
    { ref: '7.4', chapter: 'Safety Management', severity: 'medium', finding: 'Emergency fire pump weekly test records missing for 2 consecutive weeks. Chief Engineer confirmed tests performed but not logged.', status: 'closure_uploaded', closureNote: 'New SMS record-keeping procedure uploaded. Check actual records on board.' },
    { ref: '4.2', chapter: 'Mooring Operations', severity: 'medium', finding: 'Mooring tail condition — 3 tails on port forward cluster beyond replacement criteria. No PMS entry.', status: 'closure_uploaded', closureNote: 'Replacement record uploaded. Verify tails physically on deck.' },
    { ref: '9.1', chapter: 'Pump Room', severity: 'low', finding: 'Observation note (not NC): pump room bilge level high alarm test record shows one gap in Jan 2025.', status: 'no_closure', closureNote: null },
  ],

  certificates: [
    { name: 'International Oil Pollution Prevention (IOPP)', ref: '1.2', expiryDate: '2026-05-24', daysLeft: 17, status: 'critical' },
    { name: 'Safe Manning Certificate', ref: '2.1', expiryDate: '2026-06-11', daysLeft: 35, status: 'warning' },
    { name: 'Maritime Labour Certificate (MLC)', ref: '2.5', expiryDate: '2026-07-30', daysLeft: 84, status: 'warning' },
    { name: 'Safety Management Certificate (SMC)', ref: '3.1', expiryDate: '2027-01-15', daysLeft: 253, status: 'ok' },
    { name: 'ISPS Code Certificate (ISSC)', ref: '3.2', expiryDate: '2027-03-22', daysLeft: 319, status: 'ok' },
    { name: 'Load Line Certificate', ref: '1.3', expiryDate: '2028-09-01', daysLeft: 847, status: 'ok' },
  ],

  pscHistory: [
    { date: 'Aug 2025', port: 'Rotterdam', mou: 'Paris MOU', result: 'detained', deficiencies: ['Code 17 — ISM: Emergency fire pump test records', 'Code 10 — Fire safety: Fixed CO2 system inspection overdue'], sireMapping: ['7.4', '7.6'] },
    { date: 'Mar 2025', port: 'Singapore', mou: 'Tokyo MOU', result: 'deficiency', deficiencies: ['Code 04 — Certificates: IOPP supplement not updated'], sireMapping: ['1.2'] },
    { date: 'Nov 2024', port: 'Houston', mou: 'USCG', result: 'clean', deficiencies: [], sireMapping: [] },
  ],

  hvpqAlerts: [
    { field: 'Cargo pump type', declared: '2 × centrifugal, 1500 m³/hr capacity', ref: '6.1.2', instruction: 'Verify pump type and nameplate rating match declaration.' },
    { field: 'IG system', declared: 'Flue gas system fitted', ref: '6.3.1', instruction: 'Confirm IG system type on board — flue gas vs inert gas generator.' },
    { field: 'Crew common working language', declared: 'English', ref: '2.2.1', instruction: 'Verify Master and officers can communicate in English during inspection.' },
    { field: 'Emergency towing arrangement', declared: 'Fitted forward and aft', ref: '4.5.1', instruction: 'Physically verify both arrangements are accessible and operational.' },
  ],
};

// ─── Voice Note Processor (rules-based, offline) ──────────────
const SIRE_TAXONOMY = {
  keywords: {
    'pressure gauge': { subject: 'Hardware', nature: 'Defective or poorly maintained equipment', soc: 'sms-maint-pm' },
    'no maintenance': { subject: 'Documentation', nature: 'Record incomplete or missing', soc: 'sms-doc-record' },
    'not logged': { subject: 'Documentation', nature: 'Record incomplete or missing', soc: 'sms-doc-record' },
    'crew could not': { subject: 'Personnel', nature: 'Personnel unfamiliar with or unable to perform procedure', soc: 'sms-ops-crew' },
    'checklist not signed': { subject: 'Process', nature: 'Procedure not followed', soc: 'sms-ops-procedure' },
    'expired': { subject: 'Documentation', nature: 'Certificate or document expired', soc: 'sms-doc-cert' },
    'missing': { subject: 'Documentation', nature: 'Record incomplete or missing', soc: 'sms-doc-record' },
    'not fitted': { subject: 'Hardware', nature: 'Equipment not fitted as required', soc: 'sms-maint-equip' },
    'not working': { subject: 'Hardware', nature: 'Defective or poorly maintained equipment', soc: 'sms-maint-pm' },
    'alarm': { subject: 'Hardware', nature: 'Defective or poorly maintained equipment', soc: 'sms-maint-pm' },
    'procedure not': { subject: 'Process', nature: 'Procedure not followed', soc: 'sms-ops-procedure' },
    'not demonstrated': { subject: 'Personnel', nature: 'Personnel unfamiliar with or unable to perform procedure', soc: 'sms-ops-crew' },
    'wear': { subject: 'Hardware', nature: 'Defective or poorly maintained equipment', soc: 'sms-maint-pm' },
    'corrosion': { subject: 'Hardware', nature: 'Defective or poorly maintained equipment', soc: 'sms-maint-pm' },
    'matrix': { subject: 'Documentation', nature: 'Record incomplete or missing', soc: 'sms-doc-record' },
  },
};

function processVoiceNote(text) {
  var lower = text.toLowerCase();
  var subject = 'Process';
  var nature = 'Procedure not followed';
  var soc = 'sms-ops-procedure';
  for (var keyword in SIRE_TAXONOMY.keywords) {
    if (lower.includes(keyword)) {
      var match = SIRE_TAXONOMY.keywords[keyword];
      subject = match.subject; nature = match.nature; soc = match.soc;
      break;
    }
  }
  // Build professional OCIMF-style observation
  var sentences = text.split('.').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; });
  var observation = sentences.map(function(s) {
    var c = s.charAt(0).toUpperCase() + s.slice(1);
    return c.endsWith('.') ? c : c + '.';
  }).join(' ');
  return { observation: observation, subject: subject, nature: nature, soc: soc, compliance: 'noncomp' };
}

// ─── Upload Zone ──────────────────────────────────────────────
function UploadZone({ onUploaded, lang }) {
  var t = AI_STRINGS[lang] || AI_STRINGS.en;
  var [dragging, setDragging] = useState(false);
  var [step, setStep] = useState(0);
  var [processing, setProcessing] = useState(false);

  function handleFile() {
    setProcessing(true);
    var steps = t.processingSteps;
    var i = 0;
    var interval = setInterval(function() {
      i++;
      setStep(i);
      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(function() { onUploaded(MOCK_DIGEST); }, 600);
      }
    }, 700);
  }

  if (processing) {
    return (
      <div style={{ padding: '32px 20px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, border: '3px solid var(--blue)', borderTopColor: 'transparent', animation: 'aiSpin 0.8s linear infinite' }} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t.processing}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(t.processingSteps || []).map(function(s, i) {
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 12, background: step > i ? 'rgba(47,182,124,0.08)' : step === i ? 'var(--blue-soft)' : 'rgba(0,0,0,0.03)', transition: 'all .3s' }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: step > i ? '#2FB67C' : step === i ? 'var(--blue)' : 'rgba(0,0,0,0.08)' }}>
                  {step > i ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : step === i ? (
                    <div style={{ width: 8, height: 8, borderRadius: 4, border: '2px solid #fff', borderTopColor: 'transparent', animation: 'aiSpin 0.8s linear infinite' }} />
                  ) : null}
                </div>
                <span style={{ fontSize: 13, color: step > i ? '#1B7048' : step === i ? 'var(--blue-deep)' : 'var(--ink-3)', fontWeight: step === i ? 700 : 400 }}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <button
        onClick={handleFile}
        onDragOver={function(e) { e.preventDefault(); setDragging(true); }}
        onDragLeave={function() { setDragging(false); }}
        onDrop={function(e) { e.preventDefault(); setDragging(false); handleFile(); }}
        style={{
          width: '100%', border: 'none', cursor: 'pointer', padding: 0,
          borderRadius: 20, overflow: 'hidden',
          outline: dragging ? '2px dashed var(--blue)' : '2px dashed rgba(0,0,0,0.12)',
          background: dragging ? 'var(--blue-soft)' : 'rgba(0,0,0,0.02)',
          transition: 'all .2s',
        }}>
        <div style={{ padding: '28px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📄</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{t.upload}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{t.uploadHint}</div>
          <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 20, background: 'var(--blue)', color: '#fff', fontSize: 13, fontWeight: 700 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Select PDF
          </div>
        </div>
      </button>
      <style>{`@keyframes aiSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Document Digest ──────────────────────────────────────────
function DocumentDigest({ digest, lang }) {
  var t = AI_STRINGS[lang] || AI_STRINGS.en;
  var [activeTab, setActiveTab] = useState('findings');

  var highCount = digest.prevFindings.filter(function(f) { return f.severity === 'high'; }).length;
  var noClosure = digest.prevFindings.filter(function(f) { return f.status === 'no_closure'; }).length;
  var critCerts = digest.certificates.filter(function(c) { return c.status === 'critical'; }).length;
  var warnCerts = digest.certificates.filter(function(c) { return c.status === 'warning'; }).length;
  var detained = digest.pscHistory.filter(function(p) { return p.result === 'detained'; }).length;

  return (
    <div style={{ padding: '0 16px' }}>
      {/* Brief header */}
      <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', marginBottom: 14 }}>
        <div className="muster-orb" style={{ opacity: 0.7 }} />
        <div style={{ position: 'relative', padding: '16px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.digestTitle}</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{digest.vessel}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{digest.inspectionType} · Last inspection {digest.lastInspectionDate}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {highCount > 0 && <span style={{ padding: '3px 9px', borderRadius: 8, background: '#FBDDD4', color: '#8E2A14', fontSize: 11, fontWeight: 700 }}>⚠ {highCount} high-risk refs</span>}
            {noClosure > 0 && <span style={{ padding: '3px 9px', borderRadius: 8, background: 'var(--yellow-soft)', color: '#8A6620', fontSize: 11, fontWeight: 700 }}>📋 {noClosure} no closure evidence</span>}
            {critCerts > 0 && <span style={{ padding: '3px 9px', borderRadius: 8, background: '#FBDDD4', color: '#8E2A14', fontSize: 11, fontWeight: 700 }}>🔴 {critCerts} cert critical</span>}
            {detained > 0 && <span style={{ padding: '3px 9px', borderRadius: 8, background: '#FBDDD4', color: '#8E2A14', fontSize: 11, fontWeight: 700 }}>PSC detained</span>}
          </div>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: 'flex', gap: 4, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 12 }}>
        {[
          { id: 'findings', label: t.prevFindings, count: digest.prevFindings.length },
          { id: 'certs', label: t.certWatch, count: critCerts + warnCerts },
          { id: 'psc', label: t.pscAlerts, count: digest.pscHistory.filter(function(p) { return p.result !== 'clean'; }).length },
          { id: 'hvpq', label: t.hvpqAlerts, count: digest.hvpqAlerts.length },
        ].map(function(tab) {
          var active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={function() { setActiveTab(tab.id); }} style={{
              flexShrink: 0, padding: '6px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: active ? 'var(--ink)' : 'rgba(0,0,0,0.06)',
              color: active ? '#fff' : 'var(--ink-2)',
              fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5,
              transition: 'all .15s',
            }}>
              {tab.label}
              {tab.count > 0 && (
                <span style={{ padding: '1px 5px', borderRadius: 8, background: active ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.12)', fontSize: 10, fontWeight: 700 }}>{tab.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Previous Findings */}
      {activeTab === 'findings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {digest.prevFindings.map(function(f) {
            var hasClosure = f.status === 'closure_uploaded';
            return (
              <div key={f.ref} style={{ background: 'var(--paper)', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ height: 3, background: f.severity === 'high' ? '#E2563B' : f.severity === 'medium' ? '#E8A93C' : '#2FB67C' }} />
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--blue)', flexShrink: 0 }}>Ref {f.ref}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>· {f.chapter}</span>
                    <div style={{ flex: 1 }} />
                    <span style={{ padding: '2px 7px', borderRadius: 7, background: hasClosure ? '#D8F1E5' : '#FBDDD4', color: hasClosure ? '#1B7048' : '#8E2A14', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                      {hasClosure ? t.closureUploaded : t.noClosure}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.55, marginBottom: hasClosure ? 10 : 0 }}>{f.finding}</div>
                  {hasClosure && f.closureNote && (
                    <div style={{ padding: '8px 10px', background: 'rgba(47,182,124,0.07)', borderRadius: 10, border: '1px solid rgba(47,182,124,0.15)' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#1B7048', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{t.verifyOnBoard}</div>
                      <div style={{ fontSize: 12, color: '#1B7048', lineHeight: 1.4 }}>{f.closureNote}</div>
                    </div>
                  )}
                  {!hasClosure && (
                    <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(226,86,59,0.06)', borderRadius: 10 }}>
                      <div style={{ fontSize: 11, color: '#8E2A14', fontWeight: 600 }}>⚠ {t.recurrence} — probe this area during inspection</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Certificates */}
      {activeTab === 'certs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {digest.certificates.map(function(cert) {
            var statusColor = cert.status === 'critical' ? '#E2563B' : cert.status === 'warning' ? '#E8A93C' : '#2FB67C';
            var statusBg = cert.status === 'critical' ? '#FBDDD4' : cert.status === 'warning' ? 'var(--yellow-soft)' : '#D8F1E5';
            var statusLabel = cert.status === 'critical' ? t.expiresSoon : cert.status === 'warning' ? t.expiresSoon : t.valid;
            return (
              <div key={cert.name} style={{ background: 'var(--paper)', borderRadius: 16, padding: '12px 14px', boxShadow: 'var(--shadow-card)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: statusColor, flexShrink: 0, marginTop: 4 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{cert.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>SIRE Ref {cert.ref} · {t.expires} {cert.expiryDate}</div>
                </div>
                <div style={{ padding: '3px 8px', borderRadius: 8, background: statusBg, color: statusColor, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                  {cert.status !== 'ok' ? cert.daysLeft + ' ' + t.days : t.valid}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PSC History */}
      {activeTab === 'psc' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {digest.pscHistory.map(function(psc, i) {
            var isDetained = psc.result === 'detained';
            var isClean = psc.result === 'clean';
            return (
              <div key={i} style={{ background: 'var(--paper)', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ height: 3, background: isDetained ? '#E2563B' : isClean ? '#2FB67C' : '#E8A93C' }} />
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{psc.port}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>· {psc.date} · {psc.mou}</span>
                    <div style={{ flex: 1 }} />
                    <span style={{ padding: '2px 8px', borderRadius: 8, background: isDetained ? '#FBDDD4' : isClean ? '#D8F1E5' : 'var(--yellow-soft)', color: isDetained ? '#8E2A14' : isClean ? '#1B7048' : '#8A6620', fontSize: 10, fontWeight: 700 }}>
                      {isDetained ? t.detained : isClean ? 'Clean' : t.deficiency}
                    </span>
                  </div>
                  {psc.deficiencies.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {psc.deficiencies.map(function(d, j) {
                        return (
                          <div key={j} style={{ padding: '7px 10px', background: 'rgba(0,0,0,0.03)', borderRadius: 10 }}>
                            <div style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1.4 }}>{d}</div>
                            {psc.sireMapping[j] && (
                              <div style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, marginTop: 3 }}>→ {t.matchesSIRE} Ref {psc.sireMapping[j]}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {isClean && <div style={{ fontSize: 13, color: '#1B7048' }}>No deficiencies recorded.</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* HVPQ Alerts */}
      {activeTab === 'hvpq' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '10px 12px', background: 'var(--blue-soft)', borderRadius: 14, fontSize: 12, color: 'var(--blue-deep)', lineHeight: 1.5 }}>
            These are declarations the vessel operator made in the HVPQ. Verify each one matches what you observe on board.
          </div>
          {digest.hvpqAlerts.map(function(alert, i) {
            return (
              <div key={i} style={{ background: 'var(--paper)', borderRadius: 16, padding: '12px 14px', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--blue)' }}>Ref {alert.ref}</span>
                  <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>· {alert.field}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 6 }}>{t.declaredAs}:</div>
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
        </div>
      )}

      <div style={{ height: 24 }} />
    </div>
  );
}

// ─── Voice Note Feature ───────────────────────────────────────
function VoiceNotePanel({ lang, onClose }) {
  var t = AI_STRINGS[lang] || AI_STRINGS.en;
  var [recording, setRecording] = useState(false);
  var [text, setText] = useState('');
  var [result, setResult] = useState(null);
  var [seconds, setSeconds] = useState(0);
  var timerRef = React.useRef(null);

  // Simulate voice input for prototype
  var SAMPLE_NOTES = [
    'Emergency fire pump was tested, pressure gauge fluctuating between 4 and 6 bar, crew said it has always been like this, no maintenance entry in the log for the past two months.',
    'Pre-transfer cargo checklist was not signed before discharge operation commenced. Chief Officer confirmed verbal briefing was given but paperwork was done 20 minutes after valves were opened.',
    'Crew matrix was reviewed, second engineer entry for March 2026 is missing. Master confirmed a crew change happened on 14 February but the matrix was not updated.',
  ];

  function startRecording() {
    setRecording(true); setSeconds(0); setText('');
    timerRef.current = setInterval(function() { setSeconds(function(s) { return s + 1; }); }, 1000);
    // Simulate voice transcription appearing
    var note = SAMPLE_NOTES[Math.floor(Math.random() * SAMPLE_NOTES.length)];
    var words = note.split(' ');
    var i = 0;
    var wordInterval = setInterval(function() {
      i += 2;
      setText(words.slice(0, i).join(' '));
      if (i >= words.length) clearInterval(wordInterval);
    }, 120);
  }

  function stopRecording() {
    setRecording(false);
    clearInterval(timerRef.current);
    setTimeout(function() {
      if (text) setResult(processVoiceNote(text));
    }, 400);
  }

  function formatTime(s) {
    return Math.floor(s / 60).toString().padStart(2, '0') + ':' + (s % 60).toString().padStart(2, '0');
  }

  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet" style={{ maxHeight: '85%' }}>
        <div className="modal-handle" />
        <div style={{ padding: '8px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
          <button onClick={onClose} style={{ color: 'var(--ink-3)', fontSize: 14, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{t.voiceNote}</div>
          <div style={{ width: 48 }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 28px' }}>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', textAlign: 'center', marginBottom: 20, lineHeight: 1.5 }}>{t.voiceHint}</div>

          {/* Record button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
            <button onClick={recording ? stopRecording : startRecording} style={{
              width: 80, height: 80, borderRadius: 40, border: 'none', cursor: 'pointer',
              background: recording ? '#E2563B' : 'var(--blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: recording ? '0 0 0 12px rgba(226,86,59,0.15)' : '0 6px 20px rgba(74,127,248,0.35)',
              transition: 'all .2s',
            }}>
              {recording ? (
                <div style={{ width: 20, height: 20, background: '#fff', borderRadius: 4 }} />
              ) : (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
              )}
            </button>
            <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: recording ? '#E2563B' : 'var(--ink-3)' }}>
              {recording ? t.listening + ' ' + formatTime(seconds) : t.tapToRecord}
            </div>
          </div>

          {/* Live transcript */}
          {text && (
            <div style={{ padding: '12px 14px', background: 'var(--paper)', borderRadius: 16, marginBottom: 16, boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Transcript</div>
              <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6 }}>{text}</div>
            </div>
          )}

          {/* Structured result */}
          {result && (
            <div style={{ background: 'var(--paper)', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ height: 3, background: 'linear-gradient(90deg, var(--blue), #2FB67C)' }} />
              <div style={{ padding: '14px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#1B7048', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t.structured}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, marginBottom: 12, padding: '10px 12px', background: 'rgba(0,0,0,0.03)', borderRadius: 12 }}>{result.observation}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                  <span style={{ padding: '3px 9px', borderRadius: 8, background: '#FBDDD4', color: '#8E2A14', fontSize: 11, fontWeight: 700 }}>Non-compliant</span>
                  <span style={{ padding: '3px 9px', borderRadius: 8, background: 'var(--blue-soft)', color: 'var(--blue-deep)', fontSize: 11, fontWeight: 700 }}>Subject: {result.subject}</span>
                  <span style={{ padding: '3px 9px', borderRadius: 8, background: 'rgba(0,0,0,0.05)', color: 'var(--ink-2)', fontSize: 11, fontWeight: 600 }}>{result.nature}</span>
                </div>
                <button onClick={onClose} className="pill primary" style={{ width: '100%', height: 44, fontSize: 14, fontWeight: 700 }}>{t.confirmObs}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

// ─── Main AI Sheet ────────────────────────────────────────────
function AiAssistantSheet({ onClose, lang }) {
  lang = lang || 'en';
  var t = AI_STRINGS[lang] || AI_STRINGS.en;
  var [digest, setDigest] = useState(null);
  var [voiceOpen, setVoiceOpen] = useState(false);
  var [view, setView] = useState('home'); // home | digest

  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet" style={{ height: '94%' }}>
        <div className="modal-handle" />

        {/* Header */}
        <div style={{ padding: '4px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
          <button onClick={onClose} style={{ color: 'var(--ink-3)', fontSize: 14, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Close</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{t.title}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>{t.subtitle}</div>
          </div>
          <button onClick={function() { setVoiceOpen(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--blue)', fontSize: 12, fontWeight: 700 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
            Voice
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {!digest ? (
            <Fragment>
              {/* Feature cards when no doc uploaded */}
              <div style={{ padding: '16px 16px 0' }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>What Muster AI does for you</div>
                {[
                  { icon: '📄', title: 'Document Digest', desc: 'Upload your OCIMF pre-inspection pack. AI extracts every previous non-compliance, maps it to a SIRE ref, and flags which ones have closure evidence.', color: 'var(--blue-soft)' },
                  { icon: '📜', title: 'Certificate Watch', desc: 'AI scans the certificate repository and shows every cert expiry date mapped to the relevant SIRE ref — with a traffic-light urgency indicator.', color: '#D8F1E5' },
                  { icon: '🔍', title: 'Closure Evidence Checker', desc: 'For every previous finding, AI tells you whether closure evidence was uploaded — and exactly what to verify on board.', color: 'var(--yellow-soft)' },
                  { icon: '⚓', title: 'HVPQ Cross-Reference', desc: 'AI extracts key HVPQ declarations and attaches them to the relevant question cards. If the vessel declared a specific equipment type, you\'ll see it when you open that question.', color: 'var(--orange-soft)' },
                  { icon: '🎙️', title: 'Voice Field Notes', desc: 'Speak your observation naturally in the field. AI transcribes and structures it into OCIMF format — with Subject, Nature and SOC pre-selected. Works offline.', color: 'rgba(74,127,248,0.1)' },
                ].map(function(card) {
                  return (
                    <div key={card.title} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'var(--paper)', borderRadius: 18, marginBottom: 10, boxShadow: 'var(--shadow-card)' }}>
                      <div style={{ width: 42, height: 42, borderRadius: 13, background: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{card.icon}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{card.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{card.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <UploadZone onUploaded={function(d) { setDigest(d); }} lang={lang} />
              <div style={{ height: 24 }} />
            </Fragment>
          ) : (
            <DocumentDigest digest={digest} lang={lang} />
          )}
        </div>
      </div>

      {voiceOpen && <VoiceNotePanel lang={lang} onClose={function() { setVoiceOpen(false); }} />}
    </Fragment>
  );
}

Object.assign(window, { AiAssistantSheet });
