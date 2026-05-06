// components-forum.jsx — Muster Forum v3: Repost + Group Chat + Live Desk

// ─── Data ────────────────────────────────────────────────────

const FORUM_USERS = [
  { id: 'u1', name: 'James Holden', handle: 'jholden', initials: 'JH', avatarColor: '#4A7FF8',
    rank: 'Senior Marine Inspector', company: 'Shell Marine', years: 14, verified: true,
    followers: 312, following: 89, posts: 47, badges: ['SIRE Expert', 'Top Contributor'],
    bio: 'Senior vetting inspector. SIRE 2.0 certified. Tanker ops & cargo systems.', hasStory: false },
  { id: 'u2', name: 'Linh Tran', handle: 'ltran_marine', initials: 'LT', avatarColor: '#2FB67C',
    rank: 'Marine Superintendent', company: 'Rightship', years: 9, verified: false,
    followers: 541, following: 203, posts: 128, badges: ['RISQ Specialist', 'Top Contributor'],
    bio: 'Bulk carrier specialist. Crew welfare and rest hours compliance.', hasStory: true },
  { id: 'u3', name: 'Diego Alvarez', handle: 'dalvarez', initials: 'DA', avatarColor: '#FF7648',
    rank: 'Chief Inspector', company: 'BP Shipping', years: 18, verified: true,
    followers: 890, following: 134, posts: 203, badges: ['SIRE Expert', 'Mentor'],
    bio: '18 years in marine vetting. STS operations and mooring safety.', hasStory: true },
  { id: 'u4', name: 'Maya Carlsen', handle: 'mcarlsen', initials: 'MC', avatarColor: '#E8A93C',
    rank: 'Vetting Inspector', company: 'CDI Marine', years: 6, verified: false,
    followers: 178, following: 412, posts: 34, badges: ['CDI Specialist'],
    bio: 'Chemical tanker inspector. CDI certified. Rotterdam.', hasStory: true },
  { id: 'u5', name: 'Ana Ribeiro', handle: 'aribeiro', initials: 'AR', avatarColor: '#E2563B',
    rank: 'Fleet Superintendent', company: 'ExxonMobil', years: 11, verified: true,
    followers: 423, following: 267, posts: 91, badges: ['SIRE Expert'],
    bio: 'Fleet superintendent. 12 crude tankers. Former Chief Officer.', hasStory: false },
];
const ME = FORUM_USERS[0];

const SHIP_PHOTOS = [
  'https://images.unsplash.com/photo-1570937914529-03a7e5a7d65b?w=700&q=80',
  'https://images.unsplash.com/photo-1494587416117-f102a0ef7f73?w=700&q=80',
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=80',
  'https://images.unsplash.com/photo-1504655047556-b63ebe3b2710?w=700&q=80',
];

const TAGS = ['#SIRE2.0','#CargoOps','#CrewMgmt','#ECDIS','#RestHours','#MooringOps','#SMS','#CDI','#RISQ','#PumpRoom'];

const POSTS = [
  {
    id: 'p1', type: 'question', author: FORUM_USERS[2], photo: null,
    title: 'SIRE 2.0 ref 7.3.4 — verbal pre-transfer briefing acceptable?',
    body: 'Situation on MT Caspian Pride last week. Master conducted a thorough verbal pre-transfer briefing, but the formal checklist was not signed until 20 minutes into the operation. OCIMF guidance feels ambiguous. How is the community calling this?',
    tags: ['#SIRE2.0', '#CargoOps'],
    timeAgo: '2h', upvotes: 47, comments: 23, views: 312, reposts: 8,
    saved: false, myVote: null, reposted: false,
  },
  {
    id: 'p2', type: 'casestudy', author: FORUM_USERS[1], photo: SHIP_PHOTOS[0],
    title: 'Persistent ECDIS failures across 3 SIRE cycles — root cause found',
    body: 'Anonymised case from a Panamax bulk carrier inspected 3 times in 18 months. Ref 3.1 flagged each time. Root cause was a shore-side update procedure never communicated to the vessel.',
    tags: ['#ECDIS', '#SIRE2.0', '#SMS'],
    inspectionRef: '3.1', vesselType: 'Panamax Bulk Carrier',
    timeAgo: '5h', upvotes: 134, comments: 41, views: 891, reposts: 29,
    saved: true, myVote: 'up', reposted: false,
    repostOf: null,
  },
  {
    id: 'p3', type: 'poll', author: FORUM_USERS[4], photo: null,
    title: 'Rest hours technically compliant but clearly gamed — do you flag?',
    body: 'Records within MLC limits but patterns are obviously manufactured. What do you do when instinct says manipulation but evidence is circumstantial?',
    tags: ['#RestHours', '#CrewMgmt'],
    pollOptions: [
      { id: 'o1', text: 'Always flag suspected manipulation', votes: 89 },
      { id: 'o2', text: 'Only flag with corroborating evidence', votes: 156 },
      { id: 'o3', text: 'Raise verbally, skip the non-compliance', votes: 43 },
      { id: 'o4', text: 'Records comply = they comply', votes: 17 },
    ],
    myPollVote: 'o2',
    timeAgo: '1d', upvotes: 201, comments: 67, views: 1420, reposts: 44,
    saved: false, myVote: 'up', reposted: false,
  },
  {
    id: 'p4', type: 'photo', author: FORUM_USERS[2], photo: SHIP_PHOTOS[1],
    title: 'Mooring arrangement that passed a SIRE — worth discussing',
    body: 'Found this at a Fujairah terminal. Tail wire splicing borderline at best. Company had all paperwork. Would you have called ref 4.x here?',
    tags: ['#MooringOps', '#SIRE2.0'],
    timeAgo: '2d', upvotes: 88, comments: 34, views: 567, reposts: 12,
    saved: false, myVote: null, reposted: false,
  },
  {
    id: 'p5', type: 'discussion', author: FORUM_USERS[3], photo: SHIP_PHOTOS[2],
    title: 'SIRE 2.0 is improving consistency but killing inspector judgment',
    body: 'Two years in and the same pattern: structured scoring trains inspectors to be form-fillers. Hot take — are we raising the floor and lowering the ceiling?',
    tags: ['#SIRE2.0'],
    timeAgo: '1d', upvotes: 312, comments: 98, views: 2100, reposts: 67,
    saved: false, myVote: null, reposted: false,
  },
  // A repost example
  {
    id: 'p6', type: 'discussion', author: FORUM_USERS[0], photo: null,
    repostOf: { author: FORUM_USERS[2], title: 'SIRE 2.0 ref 7.3.4 — verbal pre-transfer briefing acceptable?', id: 'p1' },
    repostComment: 'Diego makes an important point here — worth reading if you missed it. I have seen 3 similar cases this quarter alone.',
    title: '', body: '',
    tags: [],
    timeAgo: '1h', upvotes: 14, comments: 5, views: 89, reposts: 2,
    saved: false, myVote: null, reposted: false,
  },
];

const ALL_COMMENTS = {
  p1: [
    { id: 'c1', author: FORUM_USERS[2], text: 'Checklist signature timing is key. OCIMF says "prior to commencement" — unambiguous. Mark non-compliant, note verbal briefing as a strong mitigating factor.', timeAgo: '1h', likes: 18 },
    { id: 'c2', author: FORUM_USERS[4], text: 'Intent does not matter for the question score — the process does. Write a clear observation acknowledging positives.', timeAgo: '45m', likes: 12 },
    { id: 'c3', author: FORUM_USERS[1], text: 'Seen this at OCIMF working group. Consensus leans toward "process not followed" but genuinely grey in published guidance.', timeAgo: '30m', likes: 24 },
  ],
  p2: [
    { id: 'c4', author: FORUM_USERS[0], text: 'Shore-side procedure communication needs its own SIRE question. The vessel did everything they were told — just not the right thing.', timeAgo: '4h', likes: 31 },
    { id: 'c5', author: FORUM_USERS[3], text: 'Same finding across 3 cycles is a systemic red flag. Usually fleet-level PMS gaps.', timeAgo: '3h', likes: 19 },
  ],
};

const DM_THREADS = [
  { id: 'dm1', user: FORUM_USERS[2], unread: 0, lastTime: '10:33 AM', isGroup: false,
    messages: [
      { from: 'them', text: 'James, great comment on the pre-transfer briefing thread.', time: '10:24 AM' },
      { from: 'me', text: 'Context in the observation makes it useful for the operator.', time: '10:31 AM' },
      { from: 'them', text: 'Worth sharing as a full post — observation writing best practice.', time: '10:33 AM' },
    ]},
  { id: 'dm2', user: FORUM_USERS[1], unread: 1, lastTime: 'Yesterday', isGroup: false,
    messages: [{ from: 'them', text: 'Hi James — done SIRE 2.0 on chemical tankers? Moving from bulk.', time: 'Yesterday' }]},
  { id: 'dm3', user: FORUM_USERS[4], unread: 0, lastTime: 'Mon', isGroup: false,
    messages: [
      { from: 'me', text: 'Ana, do you have the 2023 OCIMF mooring equipment guidelines?', time: 'Mon' },
      { from: 'them', text: 'Yes — members portal under Equipment section.', time: 'Mon' },
    ]},
];

const GROUP_CHATS = [
  { id: 'g1', name: 'SIRE 2.0 Working Group', emoji: '🔵', members: FORUM_USERS, unread: 3, lastTime: '11:02 AM',
    lastMsg: 'Diego: Has anyone seen the new cargo ref guidance?',
    messages: [
      { from: FORUM_USERS[2], text: 'Good morning all. OCIMF released an updated Q&A document on cargo chapter. Worth a look before your next SIRE.', time: '9:14 AM' },
      { from: FORUM_USERS[1], text: 'Thanks Diego — do you have the direct link?', time: '9:31 AM' },
      { from: FORUM_USERS[2], text: 'Members portal, under SIRE 2.0 resources. Published 3 days ago.', time: '9:33 AM' },
      { from: FORUM_USERS[4], text: 'Just downloaded it. The pre-transfer briefing section is much clearer now.', time: '10:12 AM' },
      { from: FORUM_USERS[0], text: 'Relevant to the thread I posted earlier — verbal briefing question.', time: '10:45 AM' },
      { from: FORUM_USERS[2], text: 'Has anyone seen the new cargo ref guidance for LNG?', time: '11:02 AM' },
    ]},
  { id: 'g2', name: 'Tanker Ops Channel', emoji: '🚢', members: [FORUM_USERS[0], FORUM_USERS[2], FORUM_USERS[4]], unread: 0, lastTime: 'Yesterday',
    lastMsg: 'Ana: Pump room incident reports are worth sharing here',
    messages: [
      { from: FORUM_USERS[4], text: 'Pump room incident reports are worth sharing here if anyone has anonymised cases.', time: 'Yesterday' },
      { from: FORUM_USERS[0], text: 'Good idea Ana. I will post one from last quarter.', time: 'Yesterday' },
    ]},
  { id: 'g3', name: 'Rotterdam Port Hub', emoji: '⚓', members: [FORUM_USERS[0], FORUM_USERS[1], FORUM_USERS[3]], unread: 1, lastTime: '2d ago',
    lastMsg: 'Maya: Terminal briefing for berth 24 has changed',
    messages: [
      { from: FORUM_USERS[3], text: 'Heads up — the terminal briefing for berth 24 has changed. New mooring procedure effective this week.', time: '2d ago' },
    ]},
];

// Live Desk sessions
const LIVE_SESSIONS = [
  { id: 'ls1', host: FORUM_USERS[2], title: 'SIRE 2.0 Cargo Chapter: Live Q&A', topic: 'Open questions on refs 6.x and 7.x', scheduled: 'Today, 3:00 PM GST', live: true, attendees: 47, questions: [
    { id: 'lq1', author: FORUM_USERS[1], text: 'How do you handle ref 7.3.4 when verbal briefing happened but paperwork lagged?', upvotes: 23, answered: true },
    { id: 'lq2', author: FORUM_USERS[4], text: 'Does the new OCIMF Q&A clarify cargo officer presence requirements?', upvotes: 15, answered: false },
    { id: 'lq3', author: FORUM_USERS[0], text: 'What is the current consensus on sampling equipment for ref 6.2.1?', upvotes: 11, answered: false },
  ]},
  { id: 'ls2', host: FORUM_USERS[4], title: 'Rest Hours: Spotting Manipulation Patterns', topic: 'Practical MLC 2006 enforcement strategies', scheduled: 'Tomorrow, 10:00 AM GST', live: false, attendees: 12, questions: [] },
];

// ─── Shared Components ────────────────────────────────────────

function UserAvatar({ user, size, showRing }) {
  size = size || 36;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {showRing && user.hasStory && (
        <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'linear-gradient(135deg, #FF7648, #FFC757, #4A7FF8)', zIndex: 0 }} />
      )}
      <div style={{
        width: size, height: size, borderRadius: '50%', background: user.avatarColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(size * 0.33), fontWeight: 700, color: '#fff',
        letterSpacing: '-0.02em', position: 'relative', zIndex: 1,
        border: showRing && user.hasStory ? '2.5px solid var(--cream)' : 'none',
      }}>{user.initials}</div>
    </div>
  );
}

function TypePill({ type }) {
  var map = {
    question:   { label: 'Q&A',        bg: 'var(--blue-soft)',    color: 'var(--blue-deep)' },
    casestudy:  { label: 'Case Study', bg: '#D8F1E5',             color: '#1B7048' },
    poll:       { label: 'Poll',        bg: 'var(--yellow-soft)',  color: '#8A6620' },
    discussion: { label: 'Discussion', bg: 'rgba(32,32,32,0.06)', color: 'var(--ink-2)' },
    photo:      { label: 'Photo',      bg: 'var(--orange-soft)',  color: '#B8431F' },
  };
  var m = map[type] || map.discussion;
  return React.createElement('span', {
    style: { display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 8px', borderRadius: 6, background: m.bg, color: m.color, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 }
  }, m.label);
}

// ─── Live Desk ────────────────────────────────────────────────

function LiveDeskSession({ session, onBack }) {
  var [questions, setQuestions] = useState(session.questions);
  var [input, setInput] = useState('');
  var [votes, setVotes] = useState({});

  function submitQuestion() {
    if (!input.trim()) return;
    setQuestions(function(q) {
      return [...q, { id: 'lq_' + Date.now(), author: ME, text: input.trim(), upvotes: 0, answered: false }];
    });
    setInput('');
  }

  function voteQ(id) {
    setVotes(function(v) { var n = Object.assign({}, v); n[id] = !n[id]; return n; });
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'var(--cream)', display: 'flex', flexDirection: 'column' }} className="screen-enter">
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)' }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{session.title}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{session.topic}</div>
        </div>
        {session.live && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, background: 'rgba(226,86,59,0.1)' }}>
            <div style={{ width: 7, height: 7, borderRadius: 4, background: '#E2563B', animation: 'livePulse 1.5s infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: '#E2563B', letterSpacing: '0.04em' }}>LIVE</span>
          </div>
        )}
      </div>

      {/* Host card */}
      <div style={{ padding: '12px 16px 0' }}>
        <div className="card" style={{ padding: '14px', background: 'var(--blue-soft)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <UserAvatar user={session.host} size={44} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue-deep)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Expert Host</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{session.host.name}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{session.host.rank} · {session.host.company}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue)' }}>{session.attendees + questions.length}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>watching</div>
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          Questions from the floor
          <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 400 }}>{questions.length} submitted</span>
        </div>

        {questions.map(function(q) {
          var voted = votes[q.id];
          return (
            <div key={q.id} className="card" style={{ padding: '12px 14px', marginBottom: 8, opacity: q.answered ? 0.7 : 1, position: 'relative', overflow: 'hidden' }}>
              {q.answered && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #2FB67C, #4A7FF8)' }} />
              )}
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <UserAvatar user={q.author} size={26} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 3 }}>{q.author.name}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink)' }}>{q.text}</div>
                  {q.answered && (
                    <div style={{ marginTop: 6, fontSize: 11, color: '#1B7048', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Answered by host
                    </div>
                  )}
                </div>
                <button onClick={function() { voteQ(q.id); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 8px', borderRadius: 10, background: voted ? 'var(--blue-soft)' : 'rgba(0,0,0,0.04)', border: 'none', cursor: 'pointer', transition: 'all .15s' }}>
                  <svg width="10" height="9" viewBox="0 0 10 9" fill={voted ? 'var(--blue)' : 'var(--ink-3)'}><polygon points="5,0 10,9 0,9"/></svg>
                  <span style={{ fontSize: 11, fontWeight: 700, color: voted ? 'var(--blue)' : 'var(--ink-3)' }}>{q.upvotes + (voted ? 1 : 0)}</span>
                </button>
              </div>
            </div>
          );
        })}

        {questions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--ink-3)' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>❓</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Be the first to ask</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Submit a question below</div>
          </div>
        )}
      </div>

      {/* Question input */}
      <div style={{ padding: '10px 16px 28px', borderTop: '1px solid var(--line)', background: 'rgba(240,239,235,0.96)', backdropFilter: 'blur(10px)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <UserAvatar user={ME} size={28} />
        <div className="input" style={{ flex: 1 }}>
          <input value={input} onChange={function(e) { setInput(e.target.value); }}
            onKeyDown={function(e) { if (e.key === 'Enter') submitQuestion(); }}
            placeholder="Ask the expert a question…" />
        </div>
        <button onClick={submitQuestion} className="pill sm primary" style={{ opacity: input.trim() ? 1 : 0.4 }}>Ask</button>
      </div>
    </div>
  );
}

// Live Desk list view
function LiveDesk({ onBack, onOpenSession }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 55, background: 'var(--cream)', display: 'flex', flexDirection: 'column' }} className="screen-enter">
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '4px 16px 10px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--line)' }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Muster</div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Live Desk</div>
        </div>
        <button className="pill sm primary">Host session</button>
      </div>

      <div className="app-body" style={{ paddingBottom: 24 }}>
        <div style={{ padding: '4px 0 8px', fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>
          Live Q&A sessions with expert inspectors. Ask questions, vote to surface the best ones, get real answers.
        </div>

        {LIVE_SESSIONS.map(function(session) {
          return (
            <button key={session.id} onClick={function() { onOpenSession(session); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 12 }}>
              <div className="card" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
                {session.live && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E2563B, #FF7648, #FFC757)' }} />
                )}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                  <UserAvatar user={session.host} size={42} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{session.title}</div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Hosted by {session.host.name} · {session.host.rank}</div>
                  </div>
                  {session.live ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 20, background: 'rgba(226,86,59,0.1)', flexShrink: 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 3, background: '#E2563B', animation: 'livePulse 1.5s infinite' }} />
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#E2563B' }}>LIVE</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-3)', flexShrink: 0 }}>Upcoming</div>
                  )}
                </div>

                <div style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.03)', borderRadius: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 2 }}>Topic</div>
                  <div style={{ fontSize: 12, color: 'var(--ink)' }}>{session.topic}</div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>🕐 {session.scheduled}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>👤 {session.attendees} attending</span>
                  {session.questions.length > 0 && <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>❓ {session.questions.length} questions</span>}
                  <div style={{ flex: 1 }} />
                  <button className={'pill sm ' + (session.live ? 'primary' : '')} style={{ background: session.live ? undefined : 'rgba(0,0,0,0.06)' }}>
                    {session.live ? 'Join now' : 'Remind me'}
                  </button>
                </div>
              </div>
            </button>
          );
        })}

        {/* Past sessions */}
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10, marginTop: 4 }}>Past Sessions</div>
        {[
          { title: 'Mooring Safety: Common SIRE Findings', host: 'Diego Alvarez', date: 'Last week', attendees: 132 },
          { title: 'CDI Chemical Tanker Walkthrough', host: 'Ana Ribeiro', date: '3 weeks ago', attendees: 89 },
        ].map(function(s) {
          return (
            <div key={s.title} className="card" style={{ padding: '12px 14px', marginBottom: 8, opacity: 0.7 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{s.title}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Hosted by {s.host} · {s.date} · {s.attendees} attended</div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

// ─── Group Chat ───────────────────────────────────────────────

function GroupChatThread({ group, onBack }) {
  var [msgs, setMsgs] = useState(group.messages);
  var [input, setInput] = useState('');

  function send() {
    if (!input.trim()) return;
    setMsgs(function(m) { return [...m, { from: ME, text: input.trim(), time: 'now' }]; });
    setInput('');
  }

  function isMe(msg) { return msg.from && msg.from.id === ME.id; }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70, background: 'var(--cream)', display: 'flex', flexDirection: 'column' }} className="screen-enter">
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '6px 16px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)' }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{group.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{group.name}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{group.members.length} members</div>
        </div>
        <button className="icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      {/* Member strip */}
      <div style={{ padding: '8px 16px', overflowX: 'auto', display: 'flex', gap: 8, scrollbarWidth: 'none', borderBottom: '1px solid var(--line-2)' }}>
        {group.members.map(function(u) {
          return (
            <div key={u.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flexShrink: 0 }}>
              <UserAvatar user={u} size={28} />
              <span style={{ fontSize: 9, color: 'var(--ink-3)', maxWidth: 40, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name.split(' ')[0]}</span>
            </div>
          );
        })}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flexShrink: 0, cursor: 'pointer' }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <span style={{ fontSize: 9, color: 'var(--ink-3)' }}>Invite</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map(function(m, i) {
          var mine = isMe(m);
          var sender = mine ? ME : m.from;
          var prevSame = i > 0 && msgs[i-1].from && msgs[i-1].from.id === m.from.id;
          return (
            <div key={i} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
              {!mine && !prevSame && <UserAvatar user={sender} size={26} />}
              {!mine && prevSame && <div style={{ width: 26, flexShrink: 0 }} />}
              <div style={{ maxWidth: '74%' }}>
                {!mine && !prevSame && (
                  <div style={{ fontSize: 10, fontWeight: 700, color: sender.avatarColor, marginBottom: 3, paddingLeft: 4 }}>{sender.name}</div>
                )}
                <div style={{
                  padding: '9px 13px', borderRadius: 18,
                  borderBottomRightRadius: mine ? 4 : 18,
                  borderBottomLeftRadius: !mine ? 4 : 18,
                  background: mine ? 'var(--blue)' : '#fff',
                  color: mine ? '#fff' : 'var(--ink)',
                  fontSize: 13, lineHeight: 1.5, boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                }}>
                  {m.text}
                  <div style={{ fontSize: 10, color: mine ? 'rgba(255,255,255,0.5)' : 'var(--ink-3)', marginTop: 2, textAlign: 'right' }}>{m.time}</div>
                </div>
              </div>
              {mine && <UserAvatar user={ME} size={26} />}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '10px 16px 28px', borderTop: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'center', background: 'var(--cream)' }}>
        <UserAvatar user={ME} size={30} />
        <div className="input" style={{ flex: 1 }}>
          <input value={input} onChange={function(e) { setInput(e.target.value); }}
            onKeyDown={function(e) { if (e.key === 'Enter') send(); }}
            placeholder={'Message ' + group.name + '…'} />
        </div>
        <button onClick={send} className="pill sm primary" style={{ opacity: input.trim() ? 1 : 0.4 }}>Send</button>
      </div>
    </div>
  );
}

// ─── DM Thread ───────────────────────────────────────────────

function DMThread({ thread, onBack }) {
  var [msgs, setMsgs] = useState(thread.messages);
  var [input, setInput] = useState('');
  function send() { if (!input.trim()) return; setMsgs(function(m) { return [...m, { from: 'me', text: input.trim(), time: 'now' }]; }); setInput(''); }
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 65, background: 'var(--cream)', display: 'flex', flexDirection: 'column' }} className="screen-enter">
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '6px 16px 10px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)' }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <UserAvatar user={thread.user} size={36} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{thread.user.name}</div>
          <div style={{ fontSize: 11, color: '#2FB67C', fontWeight: 600 }}>● Active now</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map(function(m, i) {
          return (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
              {m.from !== 'me' && <UserAvatar user={thread.user} size={26} />}
              <div style={{ maxWidth: '74%', padding: '10px 14px', borderRadius: 20, borderBottomRightRadius: m.from === 'me' ? 4 : 20, borderBottomLeftRadius: m.from !== 'me' ? 4 : 20, background: m.from === 'me' ? 'var(--blue)' : '#fff', color: m.from === 'me' ? '#fff' : 'var(--ink)', fontSize: 13, lineHeight: 1.5, boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                {m.text}
                <div style={{ fontSize: 10, color: m.from === 'me' ? 'rgba(255,255,255,0.55)' : 'var(--ink-3)', marginTop: 3, textAlign: 'right' }}>{m.time}</div>
              </div>
              {m.from === 'me' && <UserAvatar user={ME} size={26} />}
            </div>
          );
        })}
      </div>
      <div style={{ padding: '10px 16px 28px', borderTop: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'center', background: 'var(--cream)' }}>
        <UserAvatar user={ME} size={30} />
        <div className="input" style={{ flex: 1 }}><input value={input} onChange={function(e) { setInput(e.target.value); }} onKeyDown={function(e) { if (e.key === 'Enter') send(); }} placeholder="Message…" /></div>
        <button onClick={send} className="pill sm primary" style={{ opacity: input.trim() ? 1 : 0.4 }}>Send</button>
      </div>
    </div>
  );
}

// ─── Messages Hub (DMs + Groups) ─────────────────────────────

function MessagesHub({ onBack, onOpenDM, onOpenGroup }) {
  var [tab, setTab] = useState('direct');
  var totalUnread = DM_THREADS.reduce(function(a, t) { return a + t.unread; }, 0)
    + GROUP_CHATS.reduce(function(a, g) { return a + g.unread; }, 0);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 55, background: 'var(--cream)', display: 'flex', flexDirection: 'column' }} className="screen-enter">
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '4px 16px 10px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--line)' }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Muster</div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Messages</div>
        </div>
        <button className="pill sm primary">+ New</button>
      </div>

      <div style={{ padding: '10px 16px 0' }}>
        <div className="mode-toggle" style={{ width: '100%' }}>
          <button className={tab === 'direct' ? 'active' : ''} onClick={function() { setTab('direct'); }} style={{ flex: 1 }}>Direct</button>
          <button className={tab === 'groups' ? 'active' : ''} onClick={function() { setTab('groups'); }} style={{ flex: 1 }}>
            Groups
            {GROUP_CHATS.some(function(g) { return g.unread > 0; }) && (
              <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 4, background: 'var(--blue)', marginLeft: 5, verticalAlign: 'middle' }} />
            )}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 0' }}>
        {tab === 'direct' && DM_THREADS.map(function(thread, i) {
          var last = thread.messages[thread.messages.length - 1];
          return (
            <button key={thread.id} onClick={function() { onOpenDM(thread); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', borderBottom: i < DM_THREADS.length - 1 ? '1px solid var(--line-2)' : 'none' }}>
              <div style={{ position: 'relative' }}>
                <UserAvatar user={thread.user} size={48} />
                {thread.unread > 0 && <div style={{ position: 'absolute', top: 0, right: 0, width: 16, height: 16, borderRadius: 8, background: 'var(--blue)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--cream)' }}>{thread.unread}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 14, fontWeight: thread.unread > 0 ? 700 : 600 }}>{thread.user.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{thread.lastTime}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', fontWeight: thread.unread > 0 ? 600 : 400 }}>{last.from === 'me' ? 'You: ' : ''}{last.text}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>{thread.user.rank}</div>
              </div>
            </button>
          );
        })}

        {tab === 'groups' && GROUP_CHATS.map(function(group, i) {
          return (
            <button key={group.id} onClick={function() { onOpenGroup(group); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', borderBottom: i < GROUP_CHATS.length - 1 ? '1px solid var(--line-2)' : 'none' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{group.emoji}</div>
                {group.unread > 0 && <div style={{ position: 'absolute', top: -2, right: -2, width: 16, height: 16, borderRadius: 8, background: 'var(--blue)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--cream)' }}>{group.unread}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 14, fontWeight: group.unread > 0 ? 700 : 600 }}>{group.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{group.lastTime}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', fontWeight: group.unread > 0 ? 600 : 400 }}>{group.lastMsg}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 1 }}>{group.members.length} members</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Repost Sheet ─────────────────────────────────────────────

function RepostSheet({ post, onClose, onSubmit }) {
  var [comment, setComment] = useState('');
  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet" style={{ maxHeight: '70%' }}>
        <div className="modal-handle" />
        <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
          <button onClick={onClose} style={{ color: 'var(--ink-3)', fontSize: 14, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Repost</div>
          <button onClick={function() { onSubmit(comment); onClose(); }} className="pill sm primary">Share</button>
        </div>
        <div style={{ padding: '14px 18px', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <UserAvatar user={ME} size={36} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{ME.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{ME.rank}</div>
            </div>
          </div>
          <textarea value={comment} onChange={function(e) { setComment(e.target.value); }}
            placeholder="Add a comment (optional)…"
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, color: 'var(--ink)', background: 'transparent', resize: 'none', fontFamily: 'inherit', minHeight: 60, lineHeight: 1.6, marginBottom: 12 }} />
          {/* Preview of reposted post */}
          <div style={{ borderRadius: 14, border: '1.5px solid var(--line)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <UserAvatar user={post.author} size={22} />
              <span style={{ fontSize: 12, fontWeight: 700 }}>{post.author.name}</span>
              <TypePill type={post.type} />
            </div>
            {post.photo && <img src={post.photo} alt="" style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} onError={function(e) { e.target.style.display = 'none'; }} />}
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>{post.title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.body}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// ─── Post Card ────────────────────────────────────────────────

function PostCard({ post, onOpen, onOpenProfile, onRepost }) {
  var [pollVote, setPollVote] = useState(post.myPollVote || null);
  var [reposts, setReposts] = useState(post.reposts);
  var [reposted, setReposted] = useState(post.reposted);
  var [repostSheetOpen, setRepostSheetOpen] = useState(false);
  var [saved, setSaved] = useState(post.saved);
  var [upvotes, setUpvotes] = useState(post.upvotes);
  var [myVote, setMyVote] = useState(post.myVote);

  var totalPoll = post.pollOptions ? post.pollOptions.reduce(function(a, b) { return a + b.votes; }, 0) : 0;

  function handleVoteUp() {
    if (myVote === 'up') { setMyVote(null); setUpvotes(function(v) { return v - 1; }); }
    else { setUpvotes(function(v) { return v + (myVote === 'down' ? 2 : 1); }); setMyVote('up'); }
  }
  function handleVoteDown() {
    if (myVote === 'down') { setMyVote(null); setUpvotes(function(v) { return v + 1; }); }
    else { setUpvotes(function(v) { return v - (myVote === 'up' ? 2 : 1); }); setMyVote('down'); }
  }

  function handleRepost(comment) {
    setReposts(function(r) { return r + 1; });
    setReposted(true);
    onRepost && onRepost(post, comment);
  }

  // Repost card rendering
  if (post.repostOf) {
    return (
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 10 }}>
        <div style={{ padding: '12px 14px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ fontSize: 13 }}>🔁</div>
            <UserAvatar user={post.author} size={22} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>{post.author.name} reposted</span>
            <span style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 'auto' }}>{post.timeAgo}</span>
          </div>
          {post.repostComment && (
            <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5, marginBottom: 10 }}>{post.repostComment}</div>
          )}
        </div>
        {/* Quoted post */}
        <div style={{ margin: '0 12px 12px', borderRadius: 14, border: '1.5px solid var(--line)', overflow: 'hidden', cursor: 'pointer' }} onClick={function() { onOpen({ id: post.repostOf.id }); }}>
          <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserAvatar user={post.repostOf.author} size={22} />
            <span style={{ fontSize: 12, fontWeight: 700 }}>{post.repostOf.author.name}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{post.repostOf.author.rank}</span>
          </div>
          <div style={{ padding: '8px 12px 12px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>{post.repostOf.title}</div>
          </div>
        </div>
        {/* Actions */}
        <div style={{ padding: '0 14px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 0, background: 'rgba(0,0,0,0.04)', borderRadius: 20, overflow: 'hidden' }}>
            <button onClick={handleVoteUp} style={{ padding: '5px 9px', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', color: myVote === 'up' ? '#fff' : 'var(--ink-2)', background: myVote === 'up' ? 'var(--blue)' : 'transparent', display: 'flex', alignItems: 'center', gap: 3, borderRadius: '20px 0 0 20px' }}>
              <svg width="10" height="9" viewBox="0 0 10 9" fill="currentColor"><polygon points="5,0 10,9 0,9"/></svg>{upvotes}
            </button>
            <div style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.08)', alignSelf: 'center' }} />
            <button onClick={handleVoteDown} style={{ padding: '5px 8px', border: 'none', cursor: 'pointer', color: myVote === 'down' ? '#fff' : 'var(--ink-3)', background: myVote === 'down' ? 'var(--red)' : 'transparent', borderRadius: '0 20px 20px 0' }}>
              <svg width="10" height="9" viewBox="0 0 10 9" fill="currentColor"><polygon points="5,9 0,0 10,0"/></svg>
            </button>
          </div>
          <button onClick={function() { onOpen(post); }} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 9px', borderRadius: 20, background: 'rgba(0,0,0,0.04)', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--ink-3)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>{post.comments}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 10 }}>
        {post.type === 'casestudy' && <div style={{ height: 3, background: 'linear-gradient(90deg, #2FB67C, #4A7FF8)' }} />}
        {post.type === 'question' && <div style={{ height: 3, background: 'var(--blue)' }} />}

        {/* Photo */}
        {post.photo && (
          <button onClick={function() { onOpen(post); }} style={{ width: '100%', height: 200, position: 'relative', overflow: 'hidden', display: 'block', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img src={post.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={function(e) { e.target.parentElement.style.display = 'none'; }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,20,20,0.75) 0%, rgba(20,20,20,0.1) 45%, transparent 100%)' }} />
            <div style={{ position: 'absolute', top: 12, left: 12 }}><TypePill type={post.type} /></div>
            {post.type === 'casestudy' && post.inspectionRef && (
              <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(47,182,124,0.92)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 8 }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>REF</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{post.inspectionRef}</div>
              </div>
            )}
            <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.3, letterSpacing: '-0.01em', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{post.title}</div>
            </div>
          </button>
        )}

        <div style={{ padding: '14px 16px 12px' }}>
          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <button onClick={function() { onOpenProfile(post.author); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <UserAvatar user={post.author} size={34} showRing={true} />
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button onClick={function() { onOpenProfile(post.author); }} style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{post.author.name}</button>
                {post.author.verified && (
                  <svg width="13" height="13" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4A7FF8" opacity="0.15"/><path d="M9 12l2 2 4-4" stroke="#4A7FF8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
                {!post.photo && <TypePill type={post.type} />}
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{post.author.rank} · {post.timeAgo} ago</div>
            </div>
            <button style={{ color: 'var(--ink-3)', fontSize: 18, background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>···</button>
          </div>

          {!post.photo && (
            <button onClick={function() { onOpen(post); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 6 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35, letterSpacing: '-0.01em' }}>{post.title}</div>
            </button>
          )}

          <button onClick={function() { onOpen(post); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 10 }}>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.body}</div>
          </button>

          {post.type === 'casestudy' && !post.photo && (
            <div style={{ marginBottom: 10, padding: '7px 12px', background: 'rgba(47,182,124,0.07)', borderRadius: 12, border: '1px solid rgba(47,182,124,0.18)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#2FB67C', flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1B7048' }}>Ref {post.inspectionRef}</span>
              <span style={{ fontSize: 11, color: '#2FB67C' }}>· {post.vesselType}</span>
            </div>
          )}

          {post.type === 'poll' && (
            <div style={{ marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {post.pollOptions.map(function(opt) {
                var pct = Math.round((opt.votes / totalPoll) * 100);
                var isVoted = pollVote === opt.id;
                return (
                  <button key={opt.id} onClick={function() { setPollVote(opt.id); }} style={{ position: 'relative', width: '100%', padding: '9px 12px', borderRadius: 12, textAlign: 'left', overflow: 'hidden', border: 'none', cursor: 'pointer', background: isVoted ? 'rgba(74,127,248,0.08)' : 'rgba(0,0,0,0.03)', outline: isVoted ? '1.5px solid var(--blue)' : '1.5px solid transparent', transition: 'all .2s' }}>
                    {pollVote && <div style={{ position: 'absolute', inset: 0, width: pct + '%', background: isVoted ? 'rgba(74,127,248,0.12)' : 'rgba(0,0,0,0.04)', transition: 'width 0.5s ease' }} />}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: isVoted ? 700 : 500, color: isVoted ? 'var(--blue-deep)' : 'var(--ink)' }}>{opt.text}</span>
                      {pollVote && <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)' }}>{pct}%</span>}
                    </div>
                  </button>
                );
              })}
              {pollVote && <div style={{ fontSize: 11, color: 'var(--ink-3)', textAlign: 'center', marginTop: 2 }}>{totalPoll} votes</div>}
            </div>
          )}

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {post.tags.map(function(t) { return <span key={t} style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 600 }}>{t}</span>; })}
          </div>

          {/* Action bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 10, borderTop: '1px solid var(--line-2)' }}>
            {/* Vote */}
            <div style={{ display: 'flex', gap: 0, background: 'rgba(0,0,0,0.04)', borderRadius: 20, overflow: 'hidden' }}>
              <button onClick={handleVoteUp} style={{ padding: '5px 9px', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', color: myVote === 'up' ? '#fff' : 'var(--ink-2)', background: myVote === 'up' ? 'var(--blue)' : 'transparent', display: 'flex', alignItems: 'center', gap: 3, transition: 'all .15s', borderRadius: '20px 0 0 20px' }}>
                <svg width="10" height="9" viewBox="0 0 10 9" fill="currentColor"><polygon points="5,0 10,9 0,9"/></svg>{upvotes}
              </button>
              <div style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.08)', alignSelf: 'center' }} />
              <button onClick={handleVoteDown} style={{ padding: '5px 8px', border: 'none', cursor: 'pointer', color: myVote === 'down' ? '#fff' : 'var(--ink-3)', background: myVote === 'down' ? 'var(--red)' : 'transparent', transition: 'all .15s', borderRadius: '0 20px 20px 0' }}>
                <svg width="10" height="9" viewBox="0 0 10 9" fill="currentColor"><polygon points="5,9 0,0 10,0"/></svg>
              </button>
            </div>

            {/* Comment */}
            <button onClick={function() { onOpen(post); }} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 9px', borderRadius: 20, background: 'rgba(0,0,0,0.04)', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', border: 'none', cursor: 'pointer' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>{post.comments}
            </button>

            {/* Repost */}
            <button onClick={function() { setRepostSheetOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 9px', borderRadius: 20, background: reposted ? 'rgba(47,182,124,0.1)' : 'rgba(0,0,0,0.04)', fontSize: 12, fontWeight: 600, color: reposted ? '#2FB67C' : 'var(--ink-3)', border: 'none', cursor: 'pointer', transition: 'all .15s' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
              {reposts}
            </button>

            <div style={{ flex: 1 }} />

            {/* Bookmark */}
            <button onClick={function() { setSaved(function(s) { return !s; }); }} style={{ display: 'flex', alignItems: 'center', padding: '5px 9px', borderRadius: 20, background: saved ? 'var(--blue-soft)' : 'rgba(0,0,0,0.04)', color: saved ? 'var(--blue)' : 'var(--ink-3)', border: 'none', cursor: 'pointer', transition: 'all .15s' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>
        </div>
      </div>

      {repostSheetOpen && <RepostSheet post={post} onClose={function() { setRepostSheetOpen(false); }} onSubmit={handleRepost} />}
    </Fragment>
  );
}

// ─── Post Detail ─────────────────────────────────────────────

function PostDetail({ post, onBack, onOpenProfile }) {
  var [comments, setComments] = useState(ALL_COMMENTS[post.id] || []);
  var [input, setInput] = useState('');
  function submit() {
    if (!input.trim()) return;
    setComments(function(c) { return [...c, { id: 'nc_' + Date.now(), author: ME, text: input.trim(), timeAgo: 'now', likes: 0 }]; });
    setInput('');
  }
  if (!post.title && !post.body) {
    return (
      <div className="app-shell screen-enter" style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 14, color: 'var(--ink-3)' }}>Original post not available</div>
        <button className="pill sm" onClick={onBack} style={{ marginTop: 12 }}>Back</button>
      </div>
    );
  }
  return (
    <div className="app-shell screen-enter" style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'var(--cream)' }}>
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '4px 12px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button className="icon-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ flex: 1 }}><TypePill type={post.type} /></div>
        <button className="pill sm">Follow</button>
      </div>
      <div className="app-body" style={{ paddingBottom: 100 }}>
        {post.photo && (
          <div style={{ width: '100%', height: 240, position: 'relative', overflow: 'hidden' }}>
            <img src={post.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={function(e) { e.target.parentElement.style.display = 'none'; }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--cream) 0%, transparent 50%)' }} />
          </div>
        )}
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <button onClick={function() { onOpenProfile(post.author); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <UserAvatar user={post.author} size={44} showRing={true} />
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <button onClick={function() { onOpenProfile(post.author); }} style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{post.author.name}</button>
                {post.author.verified && <svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4A7FF8" opacity="0.15"/><path d="M9 12l2 2 4-4" stroke="#4A7FF8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{post.author.rank} · {post.author.company} · {post.timeAgo} ago</div>
            </div>
          </div>
          {post.type === 'casestudy' && (
            <div style={{ marginBottom: 14, padding: '10px 14px', background: 'rgba(47,182,124,0.07)', borderRadius: 14, border: '1px solid rgba(47,182,124,0.2)', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#D8F1E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B7048" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#1B7048', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Inspection Case Study</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#2FB67C', marginTop: 1 }}>Ref {post.inspectionRef} · {post.vesselType}</div>
              </div>
            </div>
          )}
          <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.3, color: 'var(--ink)', marginBottom: 10, letterSpacing: '-0.02em' }}>{post.title}</div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 14 }}>{post.body}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {post.tags.map(function(t) { return <span key={t} style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>{t}</span>; })}
          </div>
          <div style={{ padding: '10px 0', marginBottom: 16, borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', display: 'flex', gap: 16 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}><b style={{ color: 'var(--ink)' }}>{post.upvotes}</b> upvotes</span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}><b style={{ color: 'var(--ink)' }}>{post.comments}</b> comments</span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}><b style={{ color: 'var(--ink)' }}>{post.reposts}</b> reposts</span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}><b style={{ color: 'var(--ink)' }}>{post.views}</b> views</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Comments ({comments.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {comments.map(function(c) {
              return (
                <div key={c.id} style={{ display: 'flex', gap: 10 }}>
                  <UserAvatar user={c.author} size={32} />
                  <div style={{ flex: 1 }}>
                    <div className="card" style={{ padding: '10px 12px', borderRadius: 14 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{c.author.name}<span style={{ fontWeight: 400, color: 'var(--ink-3)', marginLeft: 6 }}>{c.timeAgo}</span></div>
                      <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>{c.text}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 4, paddingLeft: 4 }}>
                      <button style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>▲ {c.likes}</button>
                      <button style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Reply</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 16px 26px', background: 'rgba(240,239,235,0.96)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <UserAvatar user={ME} size={30} />
        <div className="input" style={{ flex: 1 }}><input value={input} onChange={function(e) { setInput(e.target.value); }} onKeyDown={function(e) { if (e.key === 'Enter') submit(); }} placeholder="Add a comment…" /></div>
        <button onClick={submit} className="pill sm primary" style={{ opacity: input.trim() ? 1 : 0.4 }}>Post</button>
      </div>
    </div>
  );
}

// ─── Profile ─────────────────────────────────────────────────

function ProfilePage({ user, onBack, onMessage }) {
  var [following, setFollowing] = useState(false);
  var [tab, setTab] = useState('posts');
  var isMe = user.id === ME.id;
  var userPosts = POSTS.filter(function(p) { return p.author && p.author.id === user.id && !p.repostOf; });
  var photoPosts = userPosts.filter(function(p) { return !!p.photo; });
  var textPosts = userPosts.filter(function(p) { return !p.photo; });
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'var(--cream)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="screen-enter">
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: '4px 16px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="icon-btn" onClick={onBack}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>@{user.handle}</div>
          {user.verified && <div style={{ fontSize: 10, color: 'var(--blue)', fontWeight: 700 }}>✓ Verified Inspector</div>}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ margin: '0 16px 16px', borderRadius: 24, overflow: 'hidden', position: 'relative', minHeight: 130, background: '#F7F6F2' }}>
          <div className="muster-orb" style={{ opacity: 0.65 }} />
          <div style={{ position: 'relative', padding: '22px 18px 18px', display: 'flex', alignItems: 'flex-end', gap: 14 }}>
            <div style={{ position: 'relative' }}>
              <UserAvatar user={user} size={72} showRing={true} />
              {user.verified && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderRadius: 11, background: '#2FB67C', border: '2px solid #F7F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>}
            </div>
            <div style={{ paddingBottom: 4 }}>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{user.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', fontWeight: 600 }}>{user.rank} · {user.company}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{user.years} yrs experience</div>
            </div>
          </div>
        </div>
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>{user.badges.map(function(b) { return <span key={b} style={{ padding: '4px 10px', borderRadius: 8, background: 'var(--blue-soft)', color: 'var(--blue-deep)', fontSize: 11, fontWeight: 700 }}>⭐ {b}</span>; })}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 14 }}>{user.bio}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
            {[{v:user.posts,l:'Posts'},{v:user.followers,l:'Followers'},{v:user.following,l:'Following'}].map(function(s) { return (<div key={s.l} className="card" style={{ padding: '12px 8px', textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.v}</div><div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{s.l}</div></div>); })}
          </div>
          {!isMe ? (
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <button onClick={function() { setFollowing(function(f) { return !f; }); }} className={'pill ' + (following ? '' : 'primary')} style={{ flex: 1, background: following ? 'rgba(0,0,0,0.06)' : undefined }}>{following ? '✓ Following' : '+ Follow'}</button>
              <button onClick={function() { onMessage(user); }} className="pill" style={{ flex: 1 }}>Message</button>
            </div>
          ) : <button className="pill" style={{ width: '100%', marginBottom: 20 }}>Edit Profile</button>}
          <div className="mode-toggle" style={{ width: '100%', marginBottom: 14 }}>
            <button className={tab === 'posts' ? 'active' : ''} onClick={function() { setTab('posts'); }} style={{ flex: 1 }}>Posts</button>
            <button className={tab === 'saved' ? 'active' : ''} onClick={function() { setTab('saved'); }} style={{ flex: 1 }}>Saved</button>
          </div>
          {tab === 'posts' && photoPosts.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {photoPosts.map(function(p) { return (
                <div key={p.id + '_g'} style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', aspectRatio: '1', cursor: 'pointer' }}>
                  <img src={p.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={function(e) { e.target.parentElement.style.background = '#ddd'; e.target.style.display = 'none'; }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', top: 8, left: 8 }}><TypePill type={p.type} /></div>
                  <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, fontSize: 10, fontWeight: 700, color: '#fff', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.title}</div>
                </div>
              ); })}
            </div>
          )}
          {tab === 'posts' && textPosts.map(function(p) { return (
            <div key={p.id} className="card" style={{ padding: '12px 14px', marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 8 }}><TypePill type={p.type} /><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>{p.title}</div><div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>▲ {p.upvotes} · 💬 {p.comments} · 🔁 {p.reposts}</div></div></div>
            </div>
          ); })}
          {tab === 'saved' && POSTS.filter(function(p) { return p.saved; }).map(function(p) { return (
            <div key={p.id} className="card" style={{ padding: '12px 14px', marginBottom: 8 }}>
              <TypePill type={p.type} />
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, marginTop: 6 }}>{p.title}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>{p.author.name} · {p.timeAgo}</div>
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
}

// ─── Compose ─────────────────────────────────────────────────

function ComposePost({ onClose, onSubmit }) {
  var [type, setType] = useState('discussion');
  var [title, setTitle] = useState('');
  var [body, setBody] = useState('');
  var [tags, setTags] = useState([]);
  var [tagInput, setTagInput] = useState('');
  var types = [
    {id:'discussion', icon:'💬', label:'Discussion', hint:'Share a perspective'},
    {id:'question',   icon:'❓', label:'Q&A',        hint:'Ask the community'},
    {id:'casestudy', icon:'📋', label:'Case Study',  hint:'Anonymised inspection finding'},
    {id:'poll',       icon:'📊', label:'Poll',        hint:'Gather opinion'},
    {id:'photo',      icon:'📷', label:'Photo',       hint:'Attach an image'},
  ];
  function addTag(t) { var c = (t.startsWith('#') ? t : '#' + t).replace(/\s/g, ''); if (c.length > 1 && !tags.includes(c) && tags.length < 5) { setTags(function(p) { return [...p, c]; }); setTagInput(''); } }
  var canPost = title.trim() && body.trim();
  return (
    <Fragment>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-sheet" style={{ height: '94%' }}>
        <div className="modal-handle" />
        <div style={{ padding: '8px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onClose} style={{ color: 'var(--ink-3)', fontSize: 14, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
          <div style={{ fontSize: 17, fontWeight: 700 }}>New Post</div>
          <button onClick={function() { canPost && onSubmit({ type: type, title: title, body: body, tags: tags }); }} className="pill sm primary" style={{ opacity: canPost ? 1 : 0.4 }}>Share</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <UserAvatar user={ME} size={40} />
            <div><div style={{ fontSize: 14, fontWeight: 700 }}>{ME.name}</div><div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{ME.rank}</div></div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div className="field-label" style={{ marginBottom: 8 }}>Post type</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {types.map(function(t) { return (
                <button key={t.id} onClick={function() { setType(t.id); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 14, border: 'none', cursor: 'pointer', transition: 'all .15s', background: type === t.id ? 'var(--blue-soft)' : 'rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: type === t.id ? 'var(--blue-deep)' : 'var(--ink)' }}>{t.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{t.hint}</div>
                    </div>
                  </div>
                  {type === t.id && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
              ); })}
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--line)', margin: '4px 0 16px' }} />
          <textarea value={title} onChange={function(e) { setTitle(e.target.value); }} placeholder={type === 'question' ? "What's your question?" : "Write a title…"}
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: 18, fontWeight: 700, color: 'var(--ink)', background: 'transparent', resize: 'none', fontFamily: 'inherit', minHeight: 52, letterSpacing: '-0.01em', marginBottom: 6 }} />
          <textarea value={body} onChange={function(e) { setBody(e.target.value); }} placeholder={type === 'casestudy' ? "Describe the finding and root cause. Anonymise vessel name and IMO." : "Write the body…"}
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, color: 'var(--ink-2)', background: 'transparent', resize: 'none', fontFamily: 'inherit', minHeight: 100, lineHeight: 1.65 }} />
          <div style={{ marginTop: 12 }}>
            <div className="field-label" style={{ marginBottom: 8 }}>Hashtags (up to 5)</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              {tags.map(function(t) { return <button key={t} onClick={function() { setTags(tags.filter(function(x) { return x !== t; })); }} style={{ padding: '4px 10px', borderRadius: 20, background: 'var(--blue-soft)', color: 'var(--blue)', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}>{t} ×</button>; })}
            </div>
            <div className="input">
              <span style={{ color: 'var(--blue)', fontWeight: 700, fontSize: 15 }}>#</span>
              <input value={tagInput} onChange={function(e) { setTagInput(e.target.value); }} onKeyDown={function(e) { if (e.key === 'Enter' || e.key === ' ') addTag(tagInput); }} placeholder="Type a tag, press Enter" style={{ fontSize: 13 }} />
            </div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
              {TAGS.slice(0, 6).filter(function(t) { return !tags.includes(t); }).map(function(t) { return <button key={t} onClick={function() { addTag(t); }} style={{ padding: '3px 8px', borderRadius: 20, background: 'rgba(74,127,248,0.08)', color: 'var(--blue)', fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer' }}>{t}</button>; })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// ─── Main Forum Screen ────────────────────────────────────────

function ForumScreen() {
  var [posts, setPosts] = useState(POSTS);
  var [feedTab, setFeedTab] = useState('foryou');
  var [activeTag, setActiveTag] = useState(null);
  var [openPost, setOpenPost] = useState(null);
  var [openProfile, setOpenProfile] = useState(null);
  var [composeOpen, setComposeOpen] = useState(false);
  var [msgOpen, setMsgOpen] = useState(false);
  var [openDM, setOpenDM] = useState(null);
  var [openGroup, setOpenGroup] = useState(null);
  var [liveOpen, setLiveOpen] = useState(false);
  var [openSession, setOpenSession] = useState(null);
  var [search, setSearch] = useState('');
  var [searchOpen, setSearchOpen] = useState(false);

  var displayPosts = useMemo(function() {
    var list = posts.slice();
    if (activeTag) list = list.filter(function(p) { return p.tags && p.tags.includes(activeTag); });
    if (search) { var q = search.toLowerCase(); list = list.filter(function(p) { return (p.title && p.title.toLowerCase().includes(q)) || (p.body && p.body.toLowerCase().includes(q)) || (p.tags && p.tags.some(function(t) { return t.toLowerCase().includes(q); })); }); }
    if (feedTab === 'trending') list = list.slice().sort(function(a, b) { return (b.upvotes + b.comments * 2 + b.reposts) - (a.upvotes + a.comments * 2 + a.reposts); });
    if (feedTab === 'following') list = list.filter(function(p) { return p.author && ['u2', 'u3'].includes(p.author.id); });
    return list;
  }, [posts, feedTab, activeTag, search]);

  function handleSubmit(data) {
    setPosts(function(prev) { return [Object.assign({ id: 'p_' + Date.now(), author: ME, photo: null, timeAgo: 'just now', upvotes: 0, comments: 0, views: 1, reposts: 0, saved: false, myVote: null, reposted: false }, data), ...prev]; });
    setComposeOpen(false);
  }

  function handleRepost(post, comment) {
    var newPost = { id: 'rp_' + Date.now(), type: 'discussion', author: ME, photo: null,
      repostOf: { author: post.author, title: post.title, id: post.id },
      repostComment: comment || '',
      title: '', body: '', tags: [],
      timeAgo: 'just now', upvotes: 0, comments: 0, views: 1, reposts: 0,
      saved: false, myVote: null, reposted: false,
    };
    setPosts(function(prev) { return [newPost, ...prev]; });
  }

  function handleMessage(user) {
    var existing = DM_THREADS.find(function(t) { return t.user.id === user.id; });
    setOpenProfile(null); setMsgOpen(true);
    if (existing) setOpenDM(existing);
  }

  var totalUnread = DM_THREADS.reduce(function(a, t) { return a + t.unread; }, 0) + GROUP_CHATS.reduce(function(a, g) { return a + g.unread; }, 0);
  var hasLive = LIVE_SESSIONS.some(function(s) { return s.live; });

  return (
    <div className="app-body" style={{ paddingBottom: 100 }}>
      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ padding: '8px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Muster</div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 1 }}>Forum</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="icon-btn" onClick={function() { setSearchOpen(function(s) { return !s; }); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button className="icon-btn" style={{ position: 'relative' }} onClick={function() { setMsgOpen(true); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            {totalUnread > 0 && <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, background: 'var(--blue)', border: '2px solid var(--cream)' }} />}
          </button>
          <button onClick={function() { setOpenProfile(ME); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <UserAvatar user={ME} size={34} />
          </button>
        </div>
      </div>

      {/* Search */}
      {searchOpen && (
        <div style={{ padding: '10px 16px 0' }}>
          <div className="input">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input autoFocus value={search} onChange={function(e) { setSearch(e.target.value); }} placeholder="Search posts, tags, people…" />
            {search && <button onClick={function() { setSearch(''); }} style={{ color: 'var(--ink-3)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>×</button>}
          </div>
        </div>
      )}

      {/* Live Desk Banner */}
      {hasLive && (
        <div style={{ padding: '12px 16px 0' }}>
          <button onClick={function() { setLiveOpen(true); }} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
            <div style={{ borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(135deg, #1B2B5E 0%, #2a4098 100%)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: '#E2563B', animation: 'livePulse 1.5s infinite', boxShadow: '0 0 0 4px rgba(226,86,59,0.25)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#E2563B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live Now</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>· 47 attending</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{LIVE_SESSIONS[0].title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>by {LIVE_SESSIONS[0].host.name}</div>
              </div>
              <div style={{ padding: '7px 14px', borderRadius: 20, background: '#E2563B', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>Join</div>
            </div>
          </button>
        </div>
      )}

      {/* People strip */}
      <div style={{ padding: '14px 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 16px', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>People to follow</div>
          <button style={{ fontSize: 12, color: 'var(--ink-3)', background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
        </div>
        <div style={{ display: 'flex', gap: 10, padding: '0 16px 4px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {FORUM_USERS.filter(function(u) { return u.id !== ME.id; }).map(function(u) { return (
            <button key={u.id} onClick={function() { setOpenProfile(u); }} style={{ flexShrink: 0, width: 96, padding: '12px 8px', borderRadius: 20, textAlign: 'center', background: '#fff', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}><UserAvatar user={u} size={44} showRing={true} /></div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>{u.name.split(' ')[0]}</div>
              <div style={{ fontSize: 9, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.3 }}>{u.rank.split(' ').slice(-2).join(' ')}</div>
              <div style={{ marginTop: 8, padding: '4px 0', borderRadius: 10, background: 'var(--blue)', color: '#fff', fontSize: 10, fontWeight: 700 }}>+ Follow</div>
            </button>
          ); })}
        </div>
      </div>

      {/* Tabs + tags */}
      <div style={{ padding: '14px 16px 0' }}>
        <div className="mode-toggle" style={{ width: '100%' }}>
          {[['foryou','For You'],['trending','Trending'],['following','Following']].map(function(pair) { return (
            <button key={pair[0]} className={feedTab === pair[0] ? 'active' : ''} onClick={function() { setFeedTab(pair[0]); setActiveTag(null); }} style={{ flex: 1 }}>{pair[1]}</button>
          ); })}
        </div>
      </div>

      <div style={{ padding: '10px 0 4px', overflowX: 'auto', display: 'flex', gap: 6, paddingLeft: 16, paddingRight: 16, scrollbarWidth: 'none' }}>
        {(activeTag ? [activeTag, ...TAGS.filter(function(t) { return t !== activeTag; })] : TAGS).map(function(tag) { return (
          <button key={tag} onClick={function() { setActiveTag(activeTag === tag ? null : tag); }} style={{ padding: '5px 12px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0, background: activeTag === tag ? 'var(--ink)' : 'rgba(0,0,0,0.06)', color: activeTag === tag ? '#fff' : 'var(--ink-2)', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all .15s' }}>{tag}</button>
        ); })}
      </div>

      {/* Feed */}
      <div style={{ padding: '10px 16px 0' }}>
        {activeTag && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{activeTag}</span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{displayPosts.length} posts</span>
            <button onClick={function() { setActiveTag(null); }} style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--blue)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Clear ×</button>
          </div>
        )}
        {displayPosts.length === 0 && <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)' }}><div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div><div style={{ fontSize: 14, fontWeight: 600 }}>No posts found</div></div>}
        {displayPosts.map(function(post) { return (
          <PostCard key={post.id} post={post}
            onOpen={function(p) { setOpenPost(p); }}
            onOpenProfile={function(u) { setOpenProfile(u); }}
            onRepost={handleRepost}
          />
        ); })}
      </div>

      {/* Compose FAB */}
      <button onClick={function() { setComposeOpen(true); }} className="pill primary" style={{ position: 'absolute', bottom: 94, right: 16, zIndex: 30, height: 52, paddingLeft: 20, paddingRight: 20, boxShadow: '0 6px 20px rgba(74,127,248,0.35)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Post
      </button>

      <style>{`
        @keyframes livePulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
      `}</style>

      {/* Overlays */}
      {openPost && <PostDetail post={openPost} onBack={function() { setOpenPost(null); }} onOpenProfile={function(u) { setOpenPost(null); setOpenProfile(u); }} />}
      {openProfile && <ProfilePage user={openProfile} onBack={function() { setOpenProfile(null); }} onMessage={handleMessage} />}
      {msgOpen && !openDM && !openGroup && <MessagesHub onBack={function() { setMsgOpen(false); }} onOpenDM={function(t) { setOpenDM(t); }} onOpenGroup={function(g) { setOpenGroup(g); }} />}
      {openDM && <DMThread thread={openDM} onBack={function() { setOpenDM(null); }} />}
      {openGroup && <GroupChatThread group={openGroup} onBack={function() { setOpenGroup(null); }} />}
      {liveOpen && !openSession && <LiveDesk onBack={function() { setLiveOpen(false); }} onOpenSession={function(s) { setOpenSession(s); }} />}
      {openSession && <LiveDeskSession session={openSession} onBack={function() { setOpenSession(null); }} />}
      {composeOpen && <ComposePost onClose={function() { setComposeOpen(false); }} onSubmit={handleSubmit} />}
    </div>
  );
}

Object.assign(window, { ForumScreen });
