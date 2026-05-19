import { useMemo, useState } from 'react';

const TIMELINE_LIVE = [
  { t: '2:32 PM', icon: 'arrive', title: 'Arrived', detail: 'Used the lockbox · all good' },
  { t: '2:38 PM', icon: 'photo', title: 'First hello', detail: 'Tail going wild' },
  { t: '2:55 PM', icon: 'walk', title: 'Walk in the park', detail: '1.2 mi loop · met two new dog friends' },
  { t: '3:12 PM', icon: 'bathroom', title: 'Bathroom break', detail: '#1 and #2 · normal' },
  { t: '3:24 PM', icon: 'feed', title: 'Snack time', detail: '½ cup kibble + carrot' },
  { t: '3:40 PM', icon: 'photo', title: 'Living his best life', detail: 'Belly rubs on the rug', active: true },
];

const GRADES = [
  { label: 'Eating', grade: 'A', note: 'Ate full portion + treat' },
  { label: 'Bathroom', grade: 'A−', note: '2× #1, 1× #2 · normal' },
  { label: 'Mood', grade: 'A+', note: 'Playful all visit' },
  { label: 'Behavior', grade: 'B+', note: 'Pulled a bit on leash' },
  { label: 'Home', grade: 'A', note: 'Plants watered, door locked' },
];

const MOODS = [
  { key: 'happy', label: 'Happy', icon: '🐾' },
  { key: 'chill', label: 'Chill', icon: '😌' },
  { key: 'anxious', label: 'Anxious', icon: '😟' },
  { key: 'playful', label: 'Playful', icon: '🎾' },
];

const T = {
  bg2: '#E5F2F1',
  paper: '#FFFFFF',
  ink: '#33272A',
  ink2: 'rgba(51,39,42,.62)',
  ink3: 'rgba(51,39,42,.4)',
  rule: 'rgba(51,39,42,.1)',
  peach: '#FF8C7A',
  mint: '#7FCFA0',
  sky: '#7FBEDB',
  lavender: '#B7A8E5',
  butter: '#FFD978',
};

const I = {
  arrow: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  back: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em">
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em">
      <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  plus: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  share: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em">
      <circle cx="6" cy="12" r="2.5" fill="currentColor" />
      <circle cx="18" cy="6" r="2.5" fill="currentColor" />
      <circle cx="18" cy="18" r="2.5" fill="currentColor" />
      <path d="M8 11l8-4M8 13l8 4" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

function PhotoPH({ label = '', tint = '#e9e2d5', tint2 = '#d8cdb8', radius = 12, aspect = '4/3', style = {} }) {
  return (
    <div
      className="bw-ph"
      style={{
        '--ph-tint': tint,
        '--ph-tint2': tint2,
        aspectRatio: aspect,
        borderRadius: radius,
        overflow: 'hidden',
        ...style,
      }}
    >
      {label}
    </div>
  );
}

function FakeQR({ size = 110, fg = '#1f1d1a', bg = '#fff', radius = 6 }) {
  const N = 21;
  const cells = useMemo(() => {
    const out = [];
    let h = 0x9e3779b1;
    for (let i = 0; i < N * N; i++) {
      h = (h * 1664525 + 1013904223) | 0;
      out.push((h & 0xff) > 110);
    }
    const carve = (cx, cy) => {
      for (let y = -1; y <= 7; y++)
        for (let x = -1; x <= 7; x++) {
          const px = cx + x, py = cy + y;
          if (px < 0 || py < 0 || px >= N || py >= N) continue;
          const onRing = (x === 0 || x === 6 || y === 0 || y === 6) && x >= 0 && y >= 0 && x <= 6 && y <= 6;
          const onCore = x >= 2 && x <= 4 && y >= 2 && y <= 4;
          const inside = x >= 0 && y >= 0 && x <= 6 && y <= 6;
          if (!inside) out[py * N + px] = false;
          else if (onRing || onCore) out[py * N + px] = true;
          else out[py * N + px] = false;
        }
    };
    carve(0, 0); carve(N - 7, 0); carve(0, N - 7);
    return out;
  }, []);
  return (
    <div style={{ width: size, height: size, background: bg, borderRadius: radius, display: 'inline-block' }}>
      <svg width={size} height={size} viewBox={`0 0 ${N} ${N}`} style={{ display: 'block' }}>
        {cells.map((on, i) => (on ? <rect key={i} x={i % N} y={Math.floor(i / N)} width="1" height="1" fill={fg} /> : null))}
      </svg>
    </div>
  );
}

function Top({ title, onBack }) {
  return (
    <div className="bw-topbar">
      <button className="bw-iconbtn" onClick={onBack} style={{ opacity: onBack ? 1 : 0, cursor: onBack ? 'pointer' : 'default' }}>
        <I.back />
      </button>
      <div className="bw-eyebrow">{title}</div>
      <div style={{ width: 36 }} />
    </div>
  );
}

function Home({ go, brand }) {
  const [serviceType, setServiceType] = useState('walk');
  const services = [
    { k: 'walk', l: 'Quick walk', d: '30–60 min', e: '🦮', tint: T.mint },
    { k: 'dropin', l: 'Drop-in visit', d: '1–4 hours', e: '🏡', tint: T.butter },
    { k: 'overnight', l: 'Overnight', d: 'Sleeps over', e: '🌙', tint: T.sky },
  ];
  return (
    <div className="bw-screen-enter" style={{ padding: '20px 18px 24px' }}>
      <h1 className="bw-h" style={{ fontSize: 36, margin: '0 0 22px', letterSpacing: '-.02em' }}>
        Book a
        <span className="bw-hand" style={{ fontSize: 36, color: brand.accent, marginLeft: 10 }}>visit.</span>
      </h1>

      <div className="bw-eyebrow" style={{ marginBottom: 10 }}>What do you need?</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {services.map((s) => {
          const on = serviceType === s.k;
          return (
            <button
              key={s.k}
              onClick={() => setServiceType(s.k)}
              style={{
                appearance: 'none', cursor: 'pointer',
                background: on ? T.paper : 'rgba(255,255,255,.55)',
                border: '1px solid rgba(51,39,42,.08)',
                borderRadius: 20, padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                boxShadow: on
                  ? `0 0 0 2px ${brand.accent}, 0 6px 18px rgba(51,39,42,.08)`
                  : '0 2px 8px rgba(51,39,42,.04)',
                transition: 'all .18s',
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 16, background: s.tint + '50', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{s.e}</div>
              <div style={{ flex: 1 }}>
                <div style={{ font: '700 15px Nunito, sans-serif' }}>{s.l}</div>
                <div style={{ font: '500 12px Nunito, sans-serif', color: T.ink2, marginTop: 2 }}>{s.d}</div>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: on ? 'none' : `1.5px solid ${T.rule}`, background: on ? brand.accent : 'transparent', color: T.paper, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                {on && <I.check />}
              </div>
            </button>
          );
        })}
      </div>

      <button className="bw-btn" style={{ width: '100%', background: brand.accent, marginBottom: 6 }} onClick={() => go('book1')}>
        Start booking <I.arrow />
      </button>
      <div style={{ font: '500 11px Nunito, sans-serif', color: T.ink3, textAlign: 'center', marginBottom: 14 }}>
        Free to set up · pay only when confirmed
      </div>
      <button onClick={() => go('visits')} style={{ appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer', width: '100%', textAlign: 'center', padding: '8px 0', font: '600 12px Nunito, sans-serif', color: T.ink2 }}>
        Returning? See your visits ›
      </button>
    </div>
  );
}

function Book1({ go, brand }) {
  const [date, setDate] = useState('thu');
  const [time, setTime] = useState('2:30 PM');
  const [dur, setDur] = useState('2h');
  return (
    <div className="bw-screen-enter">
      <Top title="Step 1 · Visit" onBack={() => go('home')} />
      <div style={{ padding: '8px 18px 24px' }}>
        <h2 className="bw-h" style={{ fontSize: 26, margin: '4px 0 18px' }}>When are we<br/>visiting?</h2>

        <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Date</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6, marginBottom: 18 }}>
          {[['mon','M','13'],['tue','T','14'],['wed','W','15'],['thu','T','16'],['fri','F','17']].map(([k,l,d]) => (
            <button key={k} onClick={() => setDate(k)} style={{
              appearance: 'none', cursor: 'pointer',
              background: date === k ? brand.accent : T.paper,
              border: date === k ? 'none' : '1px solid rgba(51,39,42,.08)',
              color: date === k ? T.paper : T.ink,
              borderRadius: 18, padding: '10px 0', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
              boxShadow: date === k ? `0 4px 14px ${brand.accent}66` : '0 2px 8px rgba(51,39,42,.05)',
            }}>
              <span style={{ font: '600 11px Nunito, sans-serif', opacity: .7 }}>{l}</span>
              <span style={{ font: '700 18px Nunito, sans-serif' }}>{d}</span>
            </button>
          ))}
        </div>

        <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Start time</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
          {['10:00 AM','12:00 PM','2:30 PM','4:00 PM','6:00 PM'].map((tt) => (
            <button key={tt} className={`bw-pill ${time === tt ? 'on' : ''}`} onClick={() => setTime(tt)}>{tt}</button>
          ))}
        </div>

        <div className="bw-eyebrow" style={{ marginBottom: 8 }}>How long</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: 24 }}>
          {[['30m','30 min','⏱'],['1h','1 hr','🕐'],['2h','2 hr','⏰'],['4h','4 hr','🌤'],['day','Day','🌞'],['night','Overnight','🌙']].map(([k,l,e]) => (
            <button key={k} className={`bw-pill ${dur === k ? 'on' : ''}`} onClick={() => setDur(k)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <span style={{ fontSize: 14 }}>{e}</span> {l}
            </button>
          ))}
        </div>

        <div className="bw-card-tinted" style={{ padding: 14, background: T.mint + '30', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div className="bw-eyebrow">Estimated total</div>
            <div className="bw-h" style={{ fontSize: 26, marginTop: 4 }}>$48</div>
          </div>
        </div>

        <button className="bw-btn" style={{ width: '100%', background: brand.accent }} onClick={() => go('book2')}>
          Next: about your pet <I.arrow />
        </button>
      </div>
    </div>
  );
}

function Book2({ go, brand }) {
  const [type, setType] = useState('dog');
  const [size, setSize] = useState('M');
  return (
    <div className="bw-screen-enter">
      <Top title="Step 2 · Pet" onBack={() => go('book1')} />
      <div style={{ padding: '8px 18px 24px' }}>
        <h2 className="bw-h" style={{ fontSize: 26, margin: '4px 0 16px' }}>Tell us about<br/>your buddy</h2>

        <div className="bw-card" style={{ padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="bw-eyebrow">Pet 1</span>
            <button style={{ appearance: 'none', border: 0, background: T.bg2, color: T.ink, padding: '6px 10px', borderRadius: 99, font: '700 11px Nunito, sans-serif', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <I.plus /> Add pet
            </button>
          </div>
          <input className="bw-field" placeholder="Pet name" defaultValue="Biscuit" style={{ marginBottom: 12 }} />

          <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Type</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {[['dog','🐶','Dog'],['cat','🐱','Cat'],['rabbit','🐰','Bunny'],['bird','🦜','Bird']].map(([k,e,l]) => (
              <button key={k} onClick={() => setType(k)} style={{
                flex: 1, appearance: 'none', border: 0, cursor: 'pointer',
                background: type === k ? brand.accent : T.bg2,
                color: type === k ? T.paper : T.ink,
                borderRadius: 16, padding: '10px 0',
                font: '600 12px Nunito, sans-serif',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              }}>
                <span style={{ fontSize: 20 }}>{e}</span> {l}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Size</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {['S','M','L'].map((s) => (
                  <button key={s} className={`bw-pill ${size === s ? 'on' : ''}`} onClick={() => setSize(s)} style={{ flex: 1, padding: '9px 0' }}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Age</div>
              <input className="bw-field" defaultValue="3 yrs" style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 600 }} />
            </div>
          </div>
        </div>

        {[
          { l: 'Feeding & allergies', ph: '1 cup kibble at 5pm. No chicken.', e: '🍖' },
          { l: 'Medications', ph: 'None', e: '💊' },
          { l: 'Bathroom habits', ph: '2× daily. Likes the back yard.', e: '🌳' },
          { l: 'Training & commands', ph: 'Sit, stay, "drop it"', e: '🎓' },
        ].map((f, i) => (
          <div key={i} className="bw-card" style={{ padding: 14, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>{f.e}</span>
              <span className="bw-eyebrow">{f.l}</span>
            </div>
            <textarea placeholder={f.ph} rows={2} style={{ width: '100%', boxSizing: 'border-box', background: 'transparent', border: 0, resize: 'none', font: '500 13px/1.4 Nunito, sans-serif', color: T.ink, outline: 'none', padding: 0 }} />
          </div>
        ))}

        <button className="bw-btn" style={{ width: '100%', marginTop: 12, background: brand.accent }} onClick={() => go('book3')}>
          Almost there <I.arrow />
        </button>
      </div>
    </div>
  );
}

function Book3({ go, brand }) {
  const [entry, setEntry] = useState('lockbox');
  return (
    <div className="bw-screen-enter">
      <Top title="Step 3 · Home" onBack={() => go('book2')} />
      <div style={{ padding: '8px 18px 24px' }}>
        <h2 className="bw-h" style={{ fontSize: 26, margin: '4px 0 16px' }}>One last thing —<br/>how do we get in?</h2>

        <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Address</div>
        <input className="bw-field" defaultValue="245 Linden St, Apt 3B" style={{ marginBottom: 18 }} />

        <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Entry method</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
          {[['key','🔑','Hidden key'],['lockbox','🔒','Lockbox'],['doorman','🛎','Doorman'],['person','👋','In person']].map(([k,e,l]) => (
            <button key={k} onClick={() => setEntry(k)} style={{
              appearance: 'none', cursor: 'pointer',
              background: entry === k ? brand.accent : T.paper,
              border: entry === k ? 'none' : '1px solid rgba(51,39,42,.08)',
              color: entry === k ? T.paper : T.ink,
              borderRadius: 18, padding: '14px',
              font: '600 13px Nunito, sans-serif', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: entry === k ? `0 4px 14px ${brand.accent}66` : '0 2px 8px rgba(51,39,42,.05)',
            }}>
              <span style={{ fontSize: 18 }}>{e}</span> {l}
            </button>
          ))}
        </div>

        {entry === 'lockbox' && (
          <div style={{ marginBottom: 18 }}>
            <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Lockbox code</div>
            <input className="bw-field" defaultValue="8421" placeholder="4-digit code" style={{ letterSpacing: '.4em', textAlign: 'center', fontWeight: 700, fontSize: 18 }} />
          </div>
        )}

        <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Emergency vet</div>
        <input className="bw-field" defaultValue="Linden Animal Hospital" placeholder="Hospital or clinic name" style={{ marginBottom: 8 }} />
        <input className="bw-field" type="tel" defaultValue="(212) 555-0118" placeholder="Phone number" style={{ marginBottom: 18 }} />

        <button className="bw-btn" style={{ width: '100%', background: brand.accent }} onClick={() => go('confirmed')}>
          <I.check /> Confirm · $48
        </button>
      </div>
    </div>
  );
}

function Confirmed({ go, brand }) {
  return (
    <div className="bw-screen-enter">
      <Top title="Confirmed" onBack={() => go('home')} />
      <div style={{ padding: '8px 18px 24px', textAlign: 'center' }}>
        <div className="bw-mood-face" style={{ width: 84, height: 84, fontSize: 42, margin: '8px auto 14px', background: brand.accent, color: T.paper }}>
          <I.check />
        </div>
        <h1 className="bw-h" style={{ fontSize: 30, margin: '0 0 4px' }}>You're all set!</h1>
        <div className="bw-hand" style={{ fontSize: 24, color: brand.accent, marginBottom: 18 }}>see you Thursday 🐾</div>

        <div className="bw-card" style={{ padding: 16, textAlign: 'left', marginBottom: 14 }}>
          {[
            { l: 'When', v: 'Thu, May 16 · 2:30 PM', e: '📅' },
            { l: 'Pet', v: 'Biscuit · Golden mix', e: '🐶' },
            { l: 'Sitter', v: `${brand.name} · 4.8★`, e: '🤗' },
            { l: 'Total', v: '$48 · 2 hours', e: '💸' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.rule}` }}>
              <span style={{ fontSize: 18 }}>{r.e}</span>
              <div style={{ flex: 1 }}>
                <div className="bw-eyebrow">{r.l}</div>
                <div style={{ font: '600 13px Nunito, sans-serif', marginTop: 2 }}>{r.v}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bw-card" style={{ padding: 16, marginBottom: 14, display: 'flex', gap: 14, alignItems: 'center', background: `linear-gradient(135deg, ${T.lavender}30, ${T.sky}30)` }}>
          <div style={{ background: T.paper, padding: 8, borderRadius: 14, boxShadow: '0 4px 12px rgba(51,39,42,.08)' }}>
            <FakeQR size={92} fg={T.ink} bg={T.paper} radius={4} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div className="bw-eyebrow" style={{ marginBottom: 6 }}>On the go?</div>
            <h3 className="bw-h" style={{ fontSize: 18, margin: 0, lineHeight: 1.1 }}>Scan to follow<br/>along live</h3>
            <div className="bw-hand" style={{ fontSize: 16, color: T.ink2, marginTop: 4 }}>or text me a link →</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <button className="bw-btn bw-btn-soft" style={{ flex: 1 }}><I.share /> &nbsp;Share</button>
          <button className="bw-btn bw-btn-soft" style={{ flex: 1 }}>📅 &nbsp;Calendar</button>
        </div>

        <button className="bw-btn" style={{ width: '100%', background: brand.accent }} onClick={() => go('home')}>
          Done
        </button>
      </div>
    </div>
  );
}

function Live({ go, brand }) {
  return (
    <div className="bw-screen-enter">
      <Top title="Live visit" onBack={() => go('home')} />
      <div style={{ padding: '4px 18px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: brand.accent, color: T.paper, padding: '4px 12px', borderRadius: 99, font: '700 11px Nunito, sans-serif' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} /> Live
          </div>
          <span style={{ font: '500 13px Nunito, sans-serif', color: T.ink2 }}>{brand.name.split(' ')[0]} · 50 min left</span>
        </div>

        <h1 className="bw-h" style={{ fontSize: 28, margin: '0 0 4px' }}>Biscuit's having<br/>a great time!</h1>
        <div className="bw-hand" style={{ fontSize: 22, color: brand.accent, marginBottom: 16 }}>last update 3:40 pm</div>

        <div style={{ borderRadius: 24, overflow: 'hidden', marginBottom: 14, boxShadow: '0 8px 30px rgba(51,39,42,.1)' }}>
          <PhotoPH label="biscuit · rug life · 3:40 pm" tint="#FFD9C9" tint2={brand.accent} aspect="4/5" radius={0} />
        </div>

        <div className="bw-card" style={{ padding: 16, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="bw-mood-face" style={{ background: T.butter + '50' }}>🎾</div>
          <div style={{ flex: 1 }}>
            <div className="bw-eyebrow">Mood right now</div>
            <div style={{ font: '700 16px Nunito, sans-serif', marginTop: 2 }}>Playful</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 18 }}>
          {[
            { n: '1.2', l: 'miles walked', c: T.mint, e: '🚶' },
            { n: '½', l: 'meal eaten', c: T.butter, e: '🍖' },
            { n: '2', l: 'bathroom', c: T.sky, e: '✨' },
          ].map((s, i) => (
            <div key={i} className="bw-card" style={{ padding: 12, textAlign: 'center', background: s.c + '30' }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{s.e}</div>
              <div className="bw-h" style={{ fontSize: 22, lineHeight: 1 }}>{s.n}</div>
              <div className="bw-eyebrow" style={{ marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div className="bw-eyebrow" style={{ marginBottom: 10 }}>Timeline</div>
        <div className="bw-card" style={{ padding: 16 }}>
          {TIMELINE_LIVE.slice().reverse().map((e, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${T.rule}` : 'none', marginBottom: i < arr.length - 1 ? 14 : 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: e.active ? brand.accent : T.bg2, color: e.active ? T.paper : T.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                {e.icon === 'walk' ? '🚶' : e.icon === 'photo' ? '📷' : e.icon === 'feed' ? '🍖' : e.icon === 'bathroom' ? '✨' : '🐾'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ font: '700 13px Nunito, sans-serif' }}>{e.title}</div>
                <div style={{ font: '500 12px/1.4 Nunito, sans-serif', color: T.ink2, marginTop: 2 }}>{e.detail}</div>
                <div style={{ font: '600 11px Nunito, sans-serif', color: T.ink3, marginTop: 4 }}>{e.t}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="bw-btn bw-btn-soft" style={{ width: '100%', marginTop: 14 }}>💬 &nbsp;Message {brand.name.split(' ')[0]}</button>
      </div>
    </div>
  );
}

function Complete({ go, brand }) {
  return (
    <div className="bw-screen-enter">
      <Top title="Report card" onBack={() => go('home')} />
      <div style={{ padding: '8px 18px 24px' }}>
        <div className="bw-card" style={{ padding: 20, marginBottom: 14, background: `linear-gradient(135deg, ${brand.accent}, ${T.butter})`, color: T.paper, textAlign: 'center', position: 'relative' }}>
          <div className="bw-hand" style={{ fontSize: 22, marginBottom: 4 }}>Biscuit's report card</div>
          <div className="bw-eyebrow" style={{ color: 'rgba(255,255,255,.85)', marginBottom: 12 }}>Thu May 16 · 2 hrs</div>
          <div className="bw-h" style={{ color: T.paper, fontSize: 78, lineHeight: 1, margin: 0 }}>A+</div>
          <div className="bw-hand" style={{ fontSize: 22, marginTop: 6 }}>gold star pup ⭐</div>
        </div>

        <div className="bw-card" style={{ padding: 16, marginBottom: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div className="bw-mood-face" style={{ width: 44, height: 44, fontSize: 20, background: T.bg2, flexShrink: 0 }}>👩</div>
          <div style={{ flex: 1 }}>
            <div className="bw-eyebrow" style={{ marginBottom: 6 }}>Note from {brand.name.split(' ')[0]}</div>
            <div className="bw-hand" style={{ fontSize: 20, lineHeight: 1.3, color: T.ink }}>
              "Biscuit was an absolute joy — lots of belly rubs, one short tantrum at a squirrel."
            </div>
          </div>
        </div>

        <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Photos · 4</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 14 }}>
          {[
            [brand.accent, '#FFB4A2'],
            [T.butter, '#FFC042'],
            [T.mint, '#A8DCB7'],
            [T.sky, '#A8D2E0'],
          ].map(([t1, t2], i) => (
            <PhotoPH key={i} tint={t1 + '80'} tint2={t2} aspect="1/1" radius={18} />
          ))}
        </div>

        <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Grades</div>
        <div className="bw-card" style={{ padding: 8, marginBottom: 14 }}>
          {GRADES.map((g, i) => (
            <div key={g.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 8px', borderBottom: i < GRADES.length - 1 ? `1px solid ${T.rule}` : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ font: '700 13px Nunito, sans-serif' }}>{g.label}</div>
                <div style={{ font: '500 11px/1.3 Nunito, sans-serif', color: T.ink2, marginTop: 2 }}>{g.note}</div>
              </div>
              <div className="bw-grade-bubble" style={{
                background: g.grade.startsWith('A') ? T.mint + '60' : g.grade.startsWith('B') ? T.butter + '60' : T.bg2,
                width: 42, height: 42, fontSize: 16,
              }}>{g.grade}</div>
            </div>
          ))}
        </div>

        <div className="bw-eyebrow" style={{ marginBottom: 8 }}>Mood</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {MOODS.map((m) => (
            <div key={m.key} style={{
              flex: 1, padding: '12px 0', borderRadius: 18,
              background: m.key === 'playful' ? brand.accent : T.paper,
              border: m.key === 'playful' ? 'none' : '1px solid rgba(51,39,42,.08)',
              color: m.key === 'playful' ? T.paper : T.ink2,
              boxShadow: m.key === 'playful' ? `0 4px 14px ${brand.accent}66` : '0 2px 8px rgba(51,39,42,.05)',
              textAlign: 'center', font: '700 11px Nunito, sans-serif',
            }}>
              <div style={{ fontSize: 22, marginBottom: 2 }}>{m.icon}</div>
              {m.label}
            </div>
          ))}
        </div>

        <button className="bw-btn" style={{ width: '100%', background: brand.accent }} onClick={() => go('book1')}>
          Book {brand.name.split(' ')[0]} again <I.arrow />
        </button>
      </div>
    </div>
  );
}

function Visits({ go, brand }) {
  const upcoming = [
    { date: 'Thu May 16', time: '2:30 PM', dur: '2h', type: 'Quick walk', sitter: brand.name },
    { date: 'Mon May 20', time: '6:00 PM', dur: 'Overnight', type: 'Overnight', sitter: brand.name },
  ];
  const past = [
    { date: 'Mon May 12', time: '12:30 PM', dur: '1h', type: 'Lunch walk', sitter: brand.name, grade: 'A',  mood: '🎾' },
    { date: 'Thu May 8',  time: '6:00 PM', dur: 'Overnight', type: 'Overnight', sitter: brand.name, grade: 'A−', mood: '😌' },
    { date: 'Sat May 4',  time: '11:00 AM', dur: '2h', type: 'Drop-in', sitter: brand.name, grade: 'A+', mood: '🐾' },
    { date: 'Tue Apr 29', time: '5:30 PM', dur: '1h', type: 'Quick walk', sitter: brand.name, grade: 'B+', mood: '😌' },
  ];

  const Row = ({ v, kind, onClick }) => {
    const parts = v.date.split(' ');
    const m = parts[parts.length - 2];
    const d = parts[parts.length - 1];
    return (
      <button onClick={onClick} style={{
        appearance: 'none', cursor: onClick ? 'pointer' : 'default',
        background: T.paper, width: '100%',
        border: '1px solid rgba(51,39,42,.08)',
        padding: 12, borderRadius: 18, display: 'flex', alignItems: 'center', gap: 12,
        textAlign: 'left', boxShadow: '0 2px 8px rgba(51,39,42,.04)',
      }}>
        <div style={{ flexShrink: 0, width: 44, textAlign: 'center' }}>
          <div style={{ font: '600 10px Nunito, sans-serif', color: T.ink3, textTransform: 'uppercase', letterSpacing: '.08em' }}>{m}</div>
          <div className="bw-h" style={{ fontSize: 20, lineHeight: 1, marginTop: 2 }}>{d}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '700 14px Nunito, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.type}</div>
          <div style={{ font: '500 12px Nunito, sans-serif', color: T.ink2, marginTop: 2 }}>{v.time} · {v.dur} · {v.sitter}</div>
        </div>
        {kind === 'upcoming' ? (
          <span style={{ flexShrink: 0, padding: '5px 10px', borderRadius: 99, background: brand.accent + '20', color: brand.accent, font: '700 10px Nunito, sans-serif', textTransform: 'uppercase', letterSpacing: '.08em' }}>
            Upcoming
          </span>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 16 }}>{v.mood}</span>
            <div className="bw-grade-bubble" style={{
              width: 36, height: 36, fontSize: 14,
              background: v.grade.startsWith('A') ? T.mint + '60' : v.grade.startsWith('B') ? T.butter + '60' : T.bg2,
            }}>{v.grade}</div>
            <span style={{ color: T.ink3, marginLeft: 2, fontSize: 16 }}>›</span>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="bw-screen-enter">
      <Top title="Visits" onBack={() => go('home')} />
      <div style={{ padding: '8px 18px 24px' }}>
        <h2 className="bw-h" style={{ fontSize: 26, margin: '4px 0 18px' }}>Your visits</h2>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <span className="bw-eyebrow">Upcoming · {upcoming.length}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
          {upcoming.map((v, i) => <Row key={i} v={v} kind="upcoming" />)}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <span className="bw-eyebrow">Past · {past.length}</span>
          <span style={{ font: '600 11px Nunito, sans-serif', color: T.ink3 }}>Tap to view report</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {past.map((v, i) => <Row key={i} v={v} kind="past" onClick={() => go('complete')} />)}
        </div>
      </div>
    </div>
  );
}

const SCREENS = { home: Home, book1: Book1, book2: Book2, book3: Book3, confirmed: Confirmed, live: Live, visits: Visits, complete: Complete };

export default function BookingWidget({ brand }) {
  const [screen, setScreen] = useState('home');
  const S = SCREENS[screen] || Home;
  return (
    <>
      <div className="bw-shell" style={{ '--bw-accent': brand.accent }}>
        <div className="bw-root">
          <div className="bw-scroll">
            <S go={setScreen} brand={brand} />
          </div>
        </div>
      </div>
    </>
  );
}
