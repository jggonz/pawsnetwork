import { useState } from 'react';
import { SITTERS } from './data.js';
import {
  Paw, Heart, Bone, Yarn, Star, Stars, PetGlyph, PhotoPlaceholder, Brand, NavLinks, Footer,
} from './decor.jsx';

function getSitterFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'sarah-b';
  return SITTERS.find((s) => s.id === id) || SITTERS[0];
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

function ProfileDecor() {
  return (
    <>
      <Deco top={60} right={60} rotate={20}><Bone size={68} /></Deco>
      <Deco top={180} right={20}><Heart size={26} color="#F0A7B0" /></Deco>
      <Deco top={320} right={70} rotate={25} opacity={0.7}><Paw size={28} color="#F37A3E" /></Deco>
      <Deco top={520} right={30}><Yarn size={70} color="#7CC36A" /></Deco>
      <Deco top={700} right={90}><Heart size={20} color="#F37A3E" /></Deco>
      <Deco top={280} left={-10} rotate={-30}><Bone size={62} /></Deco>
      <Deco top={480} left={40} rotate={-15}><Paw size={24} color="#F4C24A" /></Deco>
      <Deco top={620} left={70}><Heart size={22} color="#F0A7B0" /></Deco>
      <Deco top={780} left={20}><Yarn size={64} color="#F4C24A" /></Deco>
    </>
  );
}

function ServiceItem({ icon, name, price, blurb }) {
  return (
    <div className="svc-item">
      <div className="svc-icon">{icon}</div>
      <div style={{ flex: 1 }}>
        <div className="svc-name">{name}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 600, marginTop: 2 }}>{blurb}</div>
      </div>
      <div className="svc-price">{price}</div>
    </div>
  );
}

export default function Profile() {
  const [sitter] = useState(() => getSitterFromQuery());
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [liked, setLiked] = useState(false);

  const SERVICE_DEFS = {
    'Dog Walking': { icon: <PetGlyph type="dog" size={22} />, price: '$22/walk', blurb: '30 or 60 min · GPS-tracked' },
    'Cat Sitting': { icon: <PetGlyph type="cat" size={22} />, price: '$26/visit', blurb: 'Feeding, play, litter, updates' },
    'Overnight Stays': { icon: <Heart size={20} color="#D87680" />, price: '$85/night', blurb: 'At your home · 12 hrs' },
    'Drop-in Visits': { icon: <Paw size={20} color="#F37A3E" />, price: '$24/visit', blurb: 'Quick 30-min check-in' },
    'Pack Walks': { icon: <PetGlyph type="dog" size={22} />, price: '$30/walk', blurb: 'Group of 3 · supervised' },
    'Daycare': { icon: <PetGlyph type="dog" size={22} />, price: '$60/day', blurb: '8 hrs in my home' },
    'Puppy Training': { icon: <Paw size={20} color="#F37A3E" />, price: '$45/session', blurb: '60 min · positive reinforcement' },
    'Bunny Boarding': { icon: <PetGlyph type="exotic" size={22} />, price: '$45/night', blurb: 'Quiet, climate-controlled' },
    'Solo Walks': { icon: <PetGlyph type="dog" size={22} />, price: '$28/walk', blurb: 'One pup at a time · low stress' },
    'Behavior Support': { icon: <Heart size={20} color="#D87680" />, price: '$55/session', blurb: 'Reactive-dog specialist' },
    'Long Walks': { icon: <PetGlyph type="dog" size={22} />, price: '$32/walk', blurb: '60 min · trails available' },
    'Hiking Adventures': { icon: <Paw size={20} color="#5BA34A" />, price: '$48/hike', blurb: '90 min · scenic trails' },
    'Medication Care': { icon: <Heart size={20} color="#D87680" />, price: '+$8/visit', blurb: 'Pills, drops, injections' },
    'Vacation Care': { icon: <Heart size={20} color="#D87680" />, price: 'Custom', blurb: 'Daily visits · plant care add-on' },
    'Feeding': { icon: <Paw size={20} color="#F37A3E" />, price: '$18/visit', blurb: 'Quick 20-min stop' },
    'Vet Transport': { icon: <Heart size={20} color="#D87680" />, price: '$35/trip', blurb: 'Round-trip · safe carrier' },
    'Beach Walks': { icon: <PetGlyph type="dog" size={22} />, price: '$36/walk', blurb: 'Sand, surf, towels included' },
    'Puppy Visits': { icon: <PetGlyph type="dog" size={22} />, price: '$28/visit', blurb: '45 min · play & potty' },
  };

  return (
    <>
      <div className="speckle"></div>
      <nav className="nav">
        <Brand />
        <NavLinks />
      </nav>

      <div className="profile-page">
        <a href="/" className="profile-back">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          Back to Sitter Search
        </a>

        <div className="profile-layout">
          <ProfileDecor />

          <div className="profile-left" style={{ position: 'relative', zIndex: 2 }}>
            <div className="profile-photo-wrap">
              <PhotoPlaceholder sitter={sitter} large />
            </div>
            <div className="profile-gallery">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`gallery-thumb ${i === galleryIdx ? 'active' : ''}`}
                  onClick={() => setGalleryIdx(i)}
                >
                  <div className="photo-ph" style={{ '--bg': [sitter.color, '#FCE7A5', '#B8DCB0'][i] }}>
                    <PetGlyph type={['dog', 'cat', 'dog'][i]} size={36} />
                    <span className="meta">action {i + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="profile-section">
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <h1 className="profile-name">{sitter.name}</h1>
                  <div className="profile-loc">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#F37A3E"><path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
                    {sitter.city}
                  </div>
                </div>
                <button
                  onClick={() => setLiked((l) => !l)}
                  style={{
                    width: 44, height: 44, borderRadius: 999,
                    background: liked ? 'var(--pink-deep)' : 'white',
                    border: '2px solid var(--line)',
                    display: 'grid', placeItems: 'center',
                    transition: 'transform .12s',
                  }}
                  aria-label="Save sitter"
                >
                  <Heart size={20} color={liked ? 'white' : '#D87680'} />
                </button>
              </div>

              <div className="profile-rating">
                <Stars rating={sitter.rating} size={22} />
                <span className="rating-num">{sitter.rating}</span>
                <span className="rating-reviews">({sitter.reviews} reviews)</span>
              </div>

              <div className="profile-meta">
                <div className="meta-card">
                  <div className="meta-num">{sitter.yearsActive}+</div>
                  <div className="meta-lbl">Years sitting</div>
                </div>
                <div className="meta-card">
                  <div className="meta-num">{sitter.repeatClients}</div>
                  <div className="meta-lbl">Repeat clients</div>
                </div>
                <div className="meta-card">
                  <div className="meta-num">{sitter.response}</div>
                  <div className="meta-lbl">Avg response</div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3><Paw size={22} color="#F37A3E" /> About Me</h3>
              <p>{sitter.bio}</p>
            </div>

            <div className="profile-section">
              <h3><Heart size={20} color="#D87680" /> Services</h3>
              <div className="svc-list">
                {sitter.services.map((s) => {
                  const def = SERVICE_DEFS[s] || { icon: <Paw size={18} color="#F37A3E" />, price: 'Custom', blurb: '' };
                  return <ServiceItem key={s} icon={def.icon} name={s} price={def.price} blurb={def.blurb} />;
                })}
              </div>
            </div>

            <div className="profile-section">
              <h3><Star size={20} /> Expert With</h3>
              <div className="expert-tags">
                {sitter.expert.map((t) => (
                  <span key={t} className="expert-tag">
                    <span style={{ width: 6, height: 6, background: 'var(--orange-deep)', borderRadius: 999 }}></span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="booking-col">
            <div className="booking-panel">
              <h2>Check Availability &amp; Book</h2>
              <p className="booking-sub">
                Ready to schedule with {sitter.name.split(' ')[0]}? Use the interactive calendar below to see her availability and lock in a visit.
              </p>

              <div className="booking-meta">
                <div className="bm-card">
                  <div className="bm-icon">💰</div>
                  <div className="bm-label">Starting at</div>
                  <div className="bm-value">{sitter.rate}</div>
                </div>
                <div className="bm-card">
                  <div className="bm-icon">⚡</div>
                  <div className="bm-label">Replies in</div>
                  <div className="bm-value">{sitter.response}</div>
                </div>
                <div className="bm-card">
                  <div className="bm-icon">📅</div>
                  <div className="bm-label">Next open</div>
                  <div className="bm-value">{sitter.available}</div>
                </div>
              </div>

              <div className="booking-placeholder">
                <div className="placeholder-tag">{'<embed slot>'}</div>
                <div className="placeholder-title">Embeddable Booking Widget</div>
                <div className="placeholder-text">
                  Drop your custom booking widget code here. This area will render the interactive calendar, service selector, and checkout flow specific to {sitter.name}'s offerings.
                </div>
                <div className="placeholder-code">
                  &lt;booking-widget sitter-id="{sitter.id}" /&gt;
                </div>
              </div>

              <div className="trust-row">
                <span className="trust-pill">✓ Background checked</span>
                <span className="trust-pill">✓ Insured</span>
                <span className="trust-pill">✓ Pet first-aid certified</span>
              </div>

              <div className="message-row">
                <button>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8z"/></svg>
                  Message
                </button>
                <button>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  Schedule meet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
