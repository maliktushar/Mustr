// app.jsx — Root routing + global state

const App = () => {
  const [tab, setTab] = useState('home');
  const [inspections, setInspections] = useState(SEED_INSPECTIONS);
  const [openId, setOpenId] = useState(null);
  const [newOpen, setNewOpen] = useState(false);
  const [completionFor, setCompletionFor] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Global state
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const [answers, setAnswers] = useState({
    '1.1': { compliance: 'compliant', comment: 'All certificates verified against latest issued copies.' },
    '1.2': { compliance: 'compliant' },
    '2.1': { compliance: 'noncomp', subjects: ['Process'], socSelections: { Process: ['sms-ops-cargo'] }, nature: 'Record incomplete or missing', comment: 'Crew matrix missing 2nd Engineer entry for Mar 2026.' },
  });

  const shellClass = 'app-shell' + (darkMode ? ' dark-mode' : '');
  const open = inspections.find(i => i.id === openId);

  const handleCreate = (data) => {
    const id = 'i' + Date.now();
    setInspections([{ id, ...data, progress: 0, answered: 0, total: 144, status: 'in-progress', workflow: 'Pre-inspection', sync: 'pending' }, ...inspections]);
    setNewOpen(false);
    setOpenId(id);
  };

  const handleDelete = (id) => {
    setInspections(inspections.filter(i => i.id !== id));
    setOpenId(null);
  };

  const handleComplete = () => {
    setCompletionFor(openId);
    setInspections(inspections.map(i => i.id === openId ? { ...i, status: 'completed', progress: 1, workflow: 'Submitted' } : i));
  };

  const renderTab = () => {
    if (tab === 'home')      return <HomeScreen inspections={inspections} onTab={setTab} onOpenInspection={setOpenId} onSettings={() => setSettingsOpen(true)} />;
    if (tab === 'inspect')   return <InspectionsScreen inspections={inspections} setInspections={setInspections} onOpen={setOpenId} onNew={() => setNewOpen(true)} />;
    if (tab === 'ai')        return <AIScreen />;
    if (tab === 'worklist')  return <WorklistScreen />;
    if (tab === 'comms')     return <ForumScreen />;
    if (tab === 'analytics') return <AnalyticsScreen />;
    return null;
  };

  return (
    <div style={{ width: 402, height: 874, borderRadius: 48, overflow: 'hidden', position: 'relative', background: '#000', boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)' }}>
      <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 100 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 99 }}><IOSStatusBar /></div>

      <div className={shellClass}>
        {renderTab()}
        <BottomNav active={tab} onChange={(t) => { setOpenId(null); setTab(t); }} />
      </div>

      {newOpen && <NewInspectionModal onClose={() => setNewOpen(false)} onCreate={handleCreate} />}

      {open && !completionFor && (
        <InspectionDetail inspection={open} answers={answers} setAnswers={setAnswers}
          onBack={() => setOpenId(null)} onComplete={handleComplete} onDelete={handleDelete} />
      )}

      {completionFor && (
        <CompletionScreen
          inspection={inspections.find(i => i.id === completionFor)}
          answers={answers}
          onBack={() => { setCompletionFor(null); setOpenId(null); }}
          onAnalytics={() => { setCompletionFor(null); setOpenId(null); setTab('analytics'); }}
        />
      )}

      {settingsOpen && (
        <SettingsScreen
          onBack={() => setSettingsOpen(false)}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(d => !d)}
          language={language}
          onLanguage={(lang) => setLanguage(lang)}
        />
      )}

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 200, height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 8, pointerEvents: 'none' }}>
        <div style={{ width: 139, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.25)' }} />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
