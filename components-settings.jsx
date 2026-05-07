// components-settings.jsx — Profile, Settings, Language, Subscription, Dark Mode

const LANGUAGES = [
  { code: 'en',    label: 'English',              native: 'English',       flag: '🇬🇧' },
  { code: 'zh',    label: 'Chinese (Simplified)', native: '简体中文',        flag: '🇨🇳' },
  { code: 'zh-tw', label: 'Chinese (Traditional)',native: '繁體中文',        flag: '🇹🇼' },
  { code: 'fr',    label: 'French',               native: 'Français',      flag: '🇫🇷' },
  { code: 'ja',    label: 'Japanese',             native: '日本語',          flag: '🇯🇵' },
  { code: 'ko',    label: 'Korean',               native: '한국어',          flag: '🇰🇷' },
  { code: 'ru',    label: 'Russian',              native: 'Русский',        flag: '🇷🇺' },
  { code: 'es',    label: 'Spanish',              native: 'Español',        flag: '🇪🇸' },
  { code: 'ar',    label: 'Arabic',               native: 'العربية',        flag: '🇸🇦' },
  { code: 'pt',    label: 'Portuguese',           native: 'Português',      flag: '🇧🇷' },
  { code: 'de',    label: 'German',               native: 'Deutsch',        flag: '🇩🇪' },
  { code: 'tl',    label: 'Filipino',             native: 'Filipino',       flag: '🇵🇭' },
  { code: 'uk',    label: 'Ukrainian',            native: 'Українська',     flag: '🇺🇦' },
  { code: 'hi',    label: 'Hindi',                native: 'हिन्दी',           flag: '🇮🇳' },
  { code: 'id',    label: 'Indonesian',           native: 'Bahasa Indonesia',flag: '🇮🇩' },
];

const PLANS = [
  {
    id: 'free', name: 'Free', price: 0,
    gradient: 'rgba(0,0,0,0.04)', textColor: 'var(--ink)', badgeColor: null,
    features: ['3 inspections per month', 'Basic SIRE 2.0 question bank', 'PDF export only', 'Community forum (read-only)', 'No AI features', 'No worklist', 'No analytics'],
    missing: [4, 5, 6],
    cta: 'Current plan', current: false,
  },
  {
    id: 'inspector', name: 'Inspector', price: 29,
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #4A7FF8 100%)', textColor: '#fff', badgeColor: '#FFC757',
    badge: 'Most Popular',
    features: ['Unlimited inspections', 'Full SIRE 2.0, RISQ & CDI banks', 'Worklist & observation tracking', 'Full analytics dashboard', 'AI observation rewriter', 'PDF, Excel, Word, JSON export', 'Forum + group chats', 'No Vessel Risk Radar'],
    missing: [7],
    cta: 'Upgrade to Inspector', current: true,
  },
  {
    id: 'superintendent', name: 'Superintendent', price: 79,
    gradient: 'linear-gradient(135deg, #0f2027 0%, #1B2B5E 60%, #203a43 100%)', textColor: '#fff', badgeColor: '#FF7648',
    badge: 'Full Power',
    features: ['Everything in Inspector', '✦ Muster AI Pre-Inspection', '✦ Vessel Risk Radar', '✦ Defect Pattern Matching', '✦ Voice Field Notes (AI)', '✦ Multi-vessel management', '✦ Priority support', '✦ Live Desk hosting'],
    missing: [],
    cta: 'Upgrade to Superintendent', current: false,
  },
  {
    id: 'enterprise', name: 'Enterprise', price: null,
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 100%)', textColor: '#fff', badgeColor: '#4A7FF8',
    badge: 'Custom',
    features: ['Everything in Superintendent', 'Unlimited inspector seats', 'API & system integrations', 'Custom inspection templates', 'SSO & admin dashboard', 'Dedicated account manager', 'SLA & compliance reporting'],
    missing: [],
    cta: 'Contact Sales', current: false,
  },
];

// ─── Subscription Screen ──────────────────────────────────────
function SubscriptionScreen({ onBack }) {
  var [annual, setAnnual] = useState(false);
  var [selected, setSelected] = useState('inspector');

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 65, background: 'var(--cream)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="screen-enter">
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '4px 16px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Muster</div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Plans & Pricing</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Current plan summary */}
        <div style={{ margin: '14px 16px 0' }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', padding: '16px 18px', background: 'var(--paper)', boxShadow: 'var(--shadow-card)' }}>
            <div className="muster-orb" style={{ opacity: 0.5 }} />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your plan</div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 2 }}>Inspector</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Renews 1 Jun 2026 · $29/month</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, padding: '3px 9px', borderRadius: 20, background: '#D8F1E5', color: '#1B7048' }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: '#2FB67C' }} />
                  <span style={{ fontSize: 11, fontWeight: 700 }}>Active</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>This month</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>12 inspections</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>7 worklists</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>3 AI briefs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Annual toggle */}
        <div style={{ padding: '16px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: annual ? 400 : 700, color: annual ? 'var(--ink-3)' : 'var(--ink)' }}>Monthly</span>
          <button onClick={function() { setAnnual(!annual); }} style={{
            width: 48, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer',
            background: annual ? 'var(--blue)' : 'rgba(0,0,0,0.14)', position: 'relative', transition: 'background .2s',
          }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 4, left: annual ? 24 : 4, transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }} />
          </button>
          <span style={{ fontSize: 13, fontWeight: annual ? 700 : 400, color: annual ? 'var(--ink)' : 'var(--ink-3)' }}>
            Annual <span style={{ color: '#2FB67C', fontWeight: 800 }}>–20%</span>
          </span>
        </div>

        {/* Plan cards */}
        <div style={{ padding: '4px 16px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {PLANS.map(function(plan) {
            var isSelected = selected === plan.id;
            var price = plan.price === null ? 'Custom' : plan.price === 0 ? 'Free' : annual ? '$' + Math.round(plan.price * 0.8) : '$' + plan.price;
            var period = plan.price === 0 || plan.price === null ? '' : annual ? '/mo, billed annually' : '/month';

            return (
              <button key={plan.id} onClick={function() { setSelected(plan.id); }} style={{
                textAlign: 'left', border: 'none', cursor: 'pointer', padding: 0,
                borderRadius: 24, overflow: 'hidden',
                outline: isSelected ? '2.5px solid var(--blue)' : '2.5px solid transparent',
                boxShadow: isSelected ? '0 8px 32px rgba(74,127,248,0.25)' : 'var(--shadow-card)',
                transition: 'all .2s',
              }}>
                <div style={{ background: plan.gradient, padding: '18px 18px 16px' }}>
                  {/* Plan header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 18, fontWeight: 800, color: plan.textColor }}>{plan.name}</span>
                        {plan.badge && (
                          <span style={{ padding: '2px 8px', borderRadius: 8, background: plan.badgeColor || 'rgba(255,255,255,0.2)', color: plan.id === 'free' ? '#8A6620' : '#1B2B5E', fontSize: 10, fontWeight: 800 }}>{plan.badge}</span>
                        )}
                        {plan.current && (
                          <span style={{ padding: '2px 8px', borderRadius: 8, background: 'rgba(47,182,124,0.3)', color: '#fff', fontSize: 10, fontWeight: 800 }}>✓ Active</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontSize: 28, fontWeight: 800, color: plan.textColor, letterSpacing: '-0.03em' }}>{price}</span>
                        {period && <span style={{ fontSize: 12, color: plan.textColor, opacity: 0.65 }}>{period}</span>}
                      </div>
                    </div>
                    <div style={{ width: 26, height: 26, borderRadius: 13, border: '2px solid ' + (isSelected ? 'var(--blue)' : (plan.id === 'free' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.35)')), background: isSelected ? 'var(--blue)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
                      {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                  </div>

                  {/* Feature list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {plan.features.map(function(feature, fi) {
                      var isMissing = plan.missing.includes(fi);
                      return (
                        <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, opacity: isMissing ? 0.4 : 1 }}>
                          <div style={{ width: 16, height: 16, borderRadius: 8, background: isMissing ? 'rgba(0,0,0,0.15)' : feature.startsWith('✦') ? '#FFC757' : 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                            {!isMissing && (
                              feature.startsWith('✦') ?
                                <span style={{ fontSize: 8 }}>✦</span> :
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={plan.id === 'free' ? 'var(--ink)' : '#fff'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            )}
                            {isMissing && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={plan.id === 'free' ? 'var(--ink)' : '#fff'} strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>}
                          </div>
                          <span style={{ fontSize: 12, color: plan.textColor, opacity: plan.id === 'free' ? 1 : 0.88, lineHeight: 1.4 }}>{feature.replace('✦ ', '')}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA button */}
                  <button style={{
                    marginTop: 14, width: '100%', height: 42, borderRadius: 12,
                    background: plan.current ? 'rgba(255,255,255,0.12)' : plan.id === 'free' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.92)',
                    color: plan.current ? plan.textColor : plan.id === 'free' ? 'var(--ink)' : '#1B2B5E',
                    fontWeight: 700, fontSize: 13, border: 'none', cursor: plan.current ? 'default' : 'pointer',
                    opacity: plan.current ? 0.65 : 1, transition: 'opacity .15s',
                  }}>{plan.cta}</button>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Language Screen ──────────────────────────────────────────
function LanguageScreen({ onBack, currentLang, onSelect }) {
  var [search, setSearch] = useState('');
  var filtered = LANGUAGES.filter(function(l) {
    if (!search) return true;
    var q = search.toLowerCase();
    return l.label.toLowerCase().includes(q) || l.native.toLowerCase().includes(q);
  });

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 65, background: 'var(--cream)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="screen-enter">
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '4px 16px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Language</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>App interface & report exports</div>
        </div>
      </div>

      <div style={{ padding: '10px 16px 6px', flexShrink: 0 }}>
        <div className="input">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input autoFocus value={search} onChange={function(e) { setSearch(e.target.value); }} placeholder="Search language…" />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 0 6px' }}>Maritime Languages</div>
        <div style={{ background: 'var(--paper)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
          {filtered.map(function(lang, i) {
            var isActive = currentLang === lang.code;
            return (
              <button key={lang.code} onClick={function() { onSelect(lang.code); onBack(); }} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px',
                textAlign: 'left', background: isActive ? 'var(--blue-soft)' : 'transparent',
                border: 'none', cursor: 'pointer',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--line-2)' : 'none',
                transition: 'background .1s',
              }}>
                <span style={{ fontSize: 26, flexShrink: 0 }}>{lang.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--blue-deep)' : 'var(--ink)' }}>{lang.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{lang.native}</div>
                </div>
                {isActive && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--ink-3)', fontSize: 13 }}>No languages found</div>
        )}
      </div>
    </div>
  );
}

// ─── Profile Edit ─────────────────────────────────────────────
function ProfileEditScreen({ onBack }) {
  var [name, setName] = useState('James Holden');
  var [title, setTitle] = useState('Senior Marine Inspector');
  var [company, setCompany] = useState('Shell Marine');
  var [email, setEmail] = useState('j.holden@shellmarine.com');
  var [phone, setPhone] = useState('+971 50 123 4567');
  var [cert, setCert] = useState('OCIMF/SIRE 2.0, CDI, RISQ');
  var [bio, setBio] = useState('Senior vetting inspector with 14 years in tanker operations. Specialist in cargo systems and SIRE 2.0.');
  var [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(function() { setSaved(false); onBack(); }, 1000);
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 65, background: 'var(--cream)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="screen-enter">
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '4px 16px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Edit Profile</div>
        <button onClick={handleSave} className="pill sm primary" style={{ background: saved ? '#2FB67C' : undefined }}>
          {saved ? '✓ Saved' : 'Save'}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 32px' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 84, height: 84, borderRadius: 42, background: '#4A7FF8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 700, color: '#fff', boxShadow: '0 4px 16px rgba(74,127,248,0.35)' }}>JH</div>
            <button style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, background: 'var(--blue)', border: '2.5px solid var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </button>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--ink-3)' }}>Tap photo to change</div>
        </div>

        {[
          { label: 'Full Name', val: name, set: setName, placeholder: 'Your full name' },
          { label: 'Job Title', val: title, set: setTitle, placeholder: 'e.g. Senior Marine Inspector' },
          { label: 'Company', val: company, set: setCompany, placeholder: 'Organisation name' },
          { label: 'Work Email', val: email, set: setEmail, placeholder: 'you@company.com' },
          { label: 'Phone', val: phone, set: setPhone, placeholder: '+xx xxx xxx xxxx' },
          { label: 'Certifications', val: cert, set: setCert, placeholder: 'e.g. SIRE 2.0, CDI, RISQ' },
        ].map(function(field) {
          return (
            <div key={field.label} style={{ marginBottom: 12 }}>
              <div className="field-label" style={{ marginBottom: 6 }}>{field.label}</div>
              <div className="input">
                <input value={field.val} onChange={function(e) { field.set(e.target.value); }}
                  placeholder={field.placeholder} style={{ fontSize: 14 }} />
              </div>
            </div>
          );
        })}

        <div>
          <div className="field-label" style={{ marginBottom: 6 }}>Bio</div>
          <div style={{ background: 'var(--paper)', borderRadius: 16, border: '1px solid var(--line)', padding: '12px 14px', boxShadow: 'var(--shadow-card)' }}>
            <textarea value={bio} onChange={function(e) { setBio(e.target.value); }}
              placeholder="Short professional bio…"
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, background: 'transparent', resize: 'none', fontFamily: 'inherit', minHeight: 80, lineHeight: 1.6, color: 'var(--ink)' }} />
          </div>
        </div>

        {/* Badges */}
        <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--paper)', borderRadius: 18, boxShadow: 'var(--shadow-card)' }}>
          <div className="field-label" style={{ marginBottom: 10 }}>Your Badges</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['SIRE Expert', 'Top Contributor', '14 yrs Experience', 'Verified Inspector'].map(function(b) {
              return <span key={b} style={{ padding: '5px 11px', borderRadius: 10, background: 'var(--blue-soft)', color: 'var(--blue-deep)', fontSize: 12, fontWeight: 700 }}>⭐ {b}</span>;
            })}
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 8 }}>Badges are earned automatically based on your activity.</div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Settings Screen ─────────────────────────────────────
function SettingsScreen({ onBack, darkMode, onToggleDark, language, onLanguage }) {
  var [page, setPage] = useState(null);
  var currentLang = LANGUAGES.find(function(l) { return l.code === language; }) || LANGUAGES[0];

  var sections = [
    {
      title: 'Account',
      items: [
        {
          icon: '👤', label: 'Edit Profile',
          sub: 'James Holden · Senior Marine Inspector',
          action: function() { setPage('profile'); },
        },
        {
          icon: '💳', label: 'Plan & Billing',
          sub: 'Inspector · $29/mo · Renews 1 Jun',
          badge: 'Active', badgeGreen: true,
          action: function() { setPage('subscription'); },
        },
      ],
    },
    {
      title: 'App Preferences',
      items: [
        {
          icon: '🌍', label: 'Language',
          sub: currentLang.flag + '  ' + currentLang.label,
          action: function() { setPage('language'); },
        },
        {
          icon: darkMode ? '☀️' : '🌙', label: 'Dark Mode',
          sub: darkMode ? 'Dark theme enabled' : 'Light theme enabled',
          isToggle: true, toggleOn: darkMode, onToggle: onToggleDark,
        },
        {
          icon: '🔔', label: 'Notifications',
          sub: 'Inspection reminders, worklist updates',
          action: function() {},
        },
        {
          icon: '📏', label: 'Measurement Units',
          sub: 'Metric (m, kg, bar)',
          action: function() {},
        },
      ],
    },
    {
      title: 'Inspection',
      items: [
        { icon: '📋', label: 'Default Inspection Type', sub: 'SIRE 2.0', action: function() {} },
        { icon: '🔒', label: 'Require PIN to open', sub: 'Off', action: function() {} },
        { icon: '☁️', label: 'Auto-sync when online', sub: 'Enabled', action: function() {} },
        { icon: '📥', label: 'Offline data size', sub: '47 MB downloaded', action: function() {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: '📖', label: 'User Guide', sub: 'How to use Muster', action: function() {} },
        { icon: '💬', label: 'Send Feedback', sub: 'Help us improve', action: function() {} },
        { icon: '⭐', label: 'Rate Muster', sub: 'Share on App Store', action: function() {} },
        { icon: '📄', label: 'Privacy Policy', sub: '', action: function() {} },
        { icon: '📜', label: 'Terms of Service', sub: '', action: function() {} },
      ],
    },
    {
      title: '',
      items: [
        { icon: '🚪', label: 'Sign Out', sub: 'j.holden@shellmarine.com', red: true, action: function() {} },
      ],
    },
  ];

  return (
    <Fragment>
      <div style={{ position: 'absolute', inset: 0, zIndex: 55, background: 'var(--cream)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="screen-enter">
        <div style={{ height: 54, flexShrink: 0 }} />
        <div style={{ padding: '4px 16px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
          <button className="icon-btn" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div style={{ flex: 1, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Settings</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* Profile hero */}
          <div style={{ margin: '14px 16px 16px', borderRadius: 24, overflow: 'hidden', position: 'relative', background: 'var(--paper)', boxShadow: 'var(--shadow-card)' }}>
            <div className="muster-orb" style={{ opacity: 0.55 }} />
            <div style={{ position: 'relative', padding: '18px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 58, height: 58, borderRadius: 29, background: '#4A7FF8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0, boxShadow: '0 4px 12px rgba(74,127,248,0.35)' }}>JH</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>James Holden</div>
                <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 1 }}>Senior Marine Inspector · Shell Marine</div>
                <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>
                  <span style={{ padding: '2px 7px', borderRadius: 6, background: 'var(--blue-soft)', color: 'var(--blue-deep)', fontSize: 10, fontWeight: 700 }}>SIRE Expert</span>
                  <span style={{ padding: '2px 7px', borderRadius: 6, background: 'var(--yellow-soft)', color: '#8A6620', fontSize: 10, fontWeight: 700 }}>Top Contributor</span>
                </div>
              </div>
              <button onClick={function() { setPage('profile'); }} style={{ padding: '7px 13px', borderRadius: 12, background: 'rgba(0,0,0,0.07)', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: 'var(--ink)', flexShrink: 0 }}>Edit</button>
            </div>
          </div>

          <div style={{ padding: '0 16px 40px' }}>
            {sections.map(function(section, si) {
              return (
                <div key={si} style={{ marginBottom: 20 }}>
                  {section.title && <div className="field-label" style={{ marginBottom: 8 }}>{section.title}</div>}
                  <div style={{ background: 'var(--paper)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
                    {section.items.map(function(item, ii) {
                      return (
                        <button key={item.label} onClick={item.isToggle ? item.onToggle : (item.action || function() {})} style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
                          textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                          borderBottom: ii < section.items.length - 1 ? '1px solid var(--line-2)' : 'none',
                          transition: 'background .1s',
                        }}>
                          <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 500, color: item.red ? 'var(--red)' : 'var(--ink)' }}>{item.label}</div>
                            {item.sub && <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{item.sub}</div>}
                          </div>
                          {item.badge && (
                            <span style={{ padding: '2px 8px', borderRadius: 8, background: item.badgeGreen ? '#D8F1E5' : 'var(--blue-soft)', color: item.badgeGreen ? '#1B7048' : 'var(--blue)', fontSize: 10, fontWeight: 700 }}>{item.badge}</span>
                          )}
                          {item.isToggle ? (
                            <div style={{
                              width: 46, height: 26, borderRadius: 13, flexShrink: 0,
                              background: item.toggleOn ? 'var(--blue)' : 'rgba(0,0,0,0.14)',
                              position: 'relative', transition: 'background .2s',
                            }}>
                              <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 3, left: item.toggleOn ? 23 : 3, transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                            </div>
                          ) : !item.red && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Muster v2.4.1 · Made for marine professionals 🚢</div>
            </div>
          </div>
        </div>
      </div>

      {page === 'profile'       && <ProfileEditScreen    onBack={function() { setPage(null); }} />}
      {page === 'subscription'  && <SubscriptionScreen   onBack={function() { setPage(null); }} />}
      {page === 'language'      && <LanguageScreen       onBack={function() { setPage(null); }} currentLang={language} onSelect={onLanguage} />}
    </Fragment>
  );
}

Object.assign(window, { SettingsScreen, LANGUAGES });
