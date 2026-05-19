import { useState, useMemo } from 'react';
import { SITTERS, PET_TYPES } from './data.js';
import {
  Paw, Heart, Bone, Yarn, Stars, PetGlyph, PhotoPlaceholder, Brand, NavLinks, Footer,
} from './decor.jsx';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-row">
        <div className="hero-pets" style={{ justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative', width: 240, height: 200 }}>
            <div style={{ position: 'absolute', left: 10, bottom: 0, width: 130, height: 160, background: '#F9CFA8', borderRadius: 24, border: '3px solid white', boxShadow: 'var(--shadow-card)', transform: 'rotate(-4deg)', display: 'grid', placeItems: 'center' }}>
              <PetGlyph type="dog" size={72} />
            </div>
            <div style={{ position: 'absolute', right: 10, bottom: 20, width: 110, height: 130, background: '#FCE7A5', borderRadius: 24, border: '3px solid white', boxShadow: 'var(--shadow-card)', transform: 'rotate(6deg)', display: 'grid', placeItems: 'center' }}>
              <PetGlyph type="cat" size={58} />
            </div>
            <Heart size={28} style={{ position: 'absolute', top: 8, right: 24 }} />
            <Heart size={18} color="#F37A3E" style={{ position: 'absolute', top: 30, left: 30 }} />
          </div>
        </div>

        <h1 className="hero-title">Find Your Pet's<br /><em>Perfect Pal!</em></h1>

        <div className="hero-pets hero-pets-right">
          <div style={{ position: 'relative', width: 240, height: 200 }}>
            <div style={{ position: 'absolute', left: 20, bottom: 0, width: 130, height: 170, background: '#B8DCB0', borderRadius: 24, border: '3px solid white', boxShadow: 'var(--shadow-card)', transform: 'rotate(4deg)', display: 'grid', placeItems: 'center' }}>
              <span style={{ fontFamily: 'Fredoka', fontSize: 56, fontWeight: 600, color: 'rgba(45,36,24,0.7)' }}>S</span>
            </div>
            <div style={{ position: 'absolute', right: 0, bottom: 30, width: 90, height: 110, background: '#F4B8C7', borderRadius: 20, border: '3px solid white', boxShadow: 'var(--shadow-card)', transform: 'rotate(-8deg)', display: 'grid', placeItems: 'center' }}>
              <PetGlyph type="exotic" size={48} />
            </div>
            <Heart size={24} style={{ position: 'absolute', top: 14, left: 30 }} />
            <Paw size={26} color="#F37A3E" style={{ position: 'absolute', top: 0, right: 30, transform: 'rotate(15deg)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchStrip({ query, setQuery, petType, setPetType }) {
  return (
    <div className="search-strip">
      <div className="search-bar">
        <div className="field">
          <span className="field-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
          </span>
          <input
            placeholder="Where do you need a sitter? (city or zip)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="divider" />
        <div className="field field-pet">
          <span className="field-icon">
            <Paw size={18} color="#F37A3E" />
          </span>
          <div className="select-wrap">
            <select value={petType} onChange={(e) => setPetType(e.target.value)}>
              {PET_TYPES.map((p) => (
                <option key={p} value={p}>
                  {p === 'All Pets' ? 'Pet type (e.g., Dog, Cat)' : p}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="search-btn" aria-label="Search">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </button>
      </div>
      <div className="pet-chips">
        {['Dogs', 'Cats', 'Rabbits', 'Birds', 'Reptiles', 'Small Animals', 'Senior Pets', 'Puppies'].map((c) => (
          <button
            key={c}
            className={`pet-chip ${petType === c ? 'active' : ''}`}
            onClick={() => setPetType(petType === c ? 'All Pets' : c)}
          >
            <span style={{ fontSize: 11 }}>●</span> {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function SitterCard({ sitter, liked, onLike }) {
  return (
    <a href={`/sitter.html?id=${sitter.id}`} className="sitter-card">
      <div className="sitter-photo">
        <PhotoPlaceholder sitter={sitter} />
        <span className="badge">
          <span style={{ width: 6, height: 6, background: 'white', borderRadius: 999 }}></span>
          {sitter.available}
        </span>
        <button
          className={`like ${liked ? 'liked' : ''}`}
          onClick={(e) => { e.preventDefault(); onLike(sitter.id); }}
          aria-label="Save"
        >
          <Heart size={16} color={liked ? 'white' : '#D87680'} />
        </button>
      </div>
      <div className="sitter-body">
        <div className="sitter-name">{sitter.name}</div>
        <div className="sitter-loc">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#F37A3E"><path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
          {sitter.city}
        </div>
        <div className="stars-row">
          <Stars rating={sitter.rating} />
          <span>({sitter.reviews} reviews)</span>
        </div>
        <div className="expert-row">
          <span className="lbl">Expert with:</span>
          <div className="tags">
            {sitter.expert.map((e) => <span key={e} className="tag">{e}</span>)}
          </div>
        </div>
        <div className="view-profile">View Profile →</div>
      </div>
    </a>
  );
}

function Deco({ top, left, right, rotate = 0, opacity = 1, children }) {
  return (
    <span style={{
      position: 'absolute',
      top, left, right,
      transform: `rotate(${rotate}deg)`,
      opacity,
      pointerEvents: 'none',
      zIndex: 0,
      lineHeight: 0,
    }}>{children}</span>
  );
}

function DecorativeLayer() {
  return (
    <>
      <Deco top={520} left={30} rotate={-15} opacity={0.7}><Paw size={28} color="#F4C24A" /></Deco>
      <Deco top={680} left={60}><Heart size={22} color="#F0A7B0" /></Deco>
      <Deco top={820} left={20} rotate={15}><Bone size={56} /></Deco>
      <Deco top={1040} left={80} rotate={30}><Paw size={26} color="#D87680" /></Deco>
      <Deco top={560} right={40}><Heart size={26} color="#F37A3E" /></Deco>
      <Deco top={760} right={20}><Yarn size={66} color="#7CC36A" /></Deco>
      <Deco top={980} right={70}><Heart size={20} color="#F0A7B0" /></Deco>
    </>
  );
}

export default function Landing() {
  const [query, setQuery] = useState('');
  const [petType, setPetType] = useState('All Pets');
  const [liked, setLiked] = useState({});
  const [sort, setSort] = useState('Top rated');

  const onLike = (id) => setLiked((l) => ({ ...l, [id]: !l[id] }));

  const filtered = useMemo(() => {
    let list = SITTERS;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((s) => s.city.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
    }
    if (petType !== 'All Pets') {
      const t = petType.toLowerCase();
      list = list.filter((s) => {
        if (t.startsWith('dog')) return s.petType === 'dog';
        if (t.startsWith('cat')) return s.petType === 'cat';
        if (t.includes('rabbit') || t.includes('small') || t.includes('bird') || t.includes('reptile'))
          return s.petType === 'exotic' || s.expert.join(' ').toLowerCase().includes(t.split(' ')[0]);
        if (t === 'senior pets' || t === 'puppies')
          return s.expert.join(' ').toLowerCase().includes(t.replace('s', '').slice(0, 4));
        return true;
      });
    }
    if (sort === 'Top rated') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === 'Most reviews') list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [query, petType, sort]);

  return (
    <>
      <div className="speckle"></div>
      <nav className="nav">
        <Brand />
        <NavLinks active="find" />
      </nav>

      <Hero />
      <SearchStrip query={query} setQuery={setQuery} petType={petType} setPetType={setPetType} />

      <section className="directory" id="find">
        <DecorativeLayer />
        <div className="section-title-row">
          <h2 className="section-title">Meet Our Pet Sitters</h2>
        </div>
        <p className="section-sub">{filtered.length} trusted sitters near you · verified, insured, and ready to play</p>

        <div className="directory-controls">
          <span className="result-count">{filtered.length} sitter{filtered.length === 1 ? '' : 's'} matching</span>
          <button
            className="sort-btn"
            onClick={() => {
              const opts = ['Top rated', 'Most reviews', 'Newest'];
              setSort(opts[(opts.indexOf(sort) + 1) % opts.length]);
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3 6h18v2H3zm3 5h12v2H6zm4 5h4v2h-4z"/></svg>
            Sort: {sort}
          </button>
        </div>

        <div className="grid">
          {filtered.map((s) => (
            <SitterCard key={s.id} sitter={s} liked={!!liked[s.id]} onLike={onLike} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--ink-soft)' }}>
            <Paw size={48} color="#E8DAB7" style={{ marginBottom: 12 }} />
            <h3 style={{ fontSize: 22 }}>No sitters match — try a different filter</h3>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
