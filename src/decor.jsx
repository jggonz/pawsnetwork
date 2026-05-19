export const Paw = ({ size = 28, color = '#F37A3E', style }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={style} fill={color}>
    <ellipse cx="6" cy="9" rx="2.2" ry="2.8" />
    <ellipse cx="12" cy="6" rx="2.4" ry="3" />
    <ellipse cx="18" cy="9" rx="2.2" ry="2.8" />
    <ellipse cx="3.5" cy="14" rx="1.8" ry="2.2" />
    <path d="M12 11c-3.2 0-5.5 2.2-5.5 4.8 0 2.2 1.8 3.2 3.6 3.2 1 0 1.6-.4 1.9-.4s.9.4 1.9.4c1.8 0 3.6-1 3.6-3.2 0-2.6-2.3-4.8-5.5-4.8z" />
  </svg>
);

export const Heart = ({ size = 24, color = '#F0A7B0', style }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={style} fill={color}>
    <path d="M12 21s-7-4.5-9.5-9.2C.8 8.2 2.6 4 6.4 4c2 0 3.6 1.2 4.4 2.7C11.6 5.2 13.2 4 15.2 4 19 4 20.8 8.2 19.1 11.8 16.5 16.5 12 21 12 21z" stroke="rgba(45,36,24,0.15)" strokeWidth="0.5" />
  </svg>
);

export const Bone = ({ size = 60, color = '#FFFDF6', style }) => (
  <svg viewBox="0 0 120 60" width={size} height={size * 0.5} style={style}>
    <g fill={color} stroke="rgba(45,36,24,0.18)" strokeWidth="2">
      <circle cx="20" cy="18" r="14" />
      <circle cx="20" cy="42" r="14" />
      <circle cx="100" cy="18" r="14" />
      <circle cx="100" cy="42" r="14" />
      <rect x="20" y="20" width="80" height="20" />
    </g>
  </svg>
);

export const Yarn = ({ size = 70, color = '#D87680', style }) => (
  <svg viewBox="0 0 80 80" width={size} height={size} style={style}>
    <circle cx="40" cy="40" r="32" fill={color} />
    <g stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none">
      <path d="M14 36 q14 -18 30 -8 t30 -8" />
      <path d="M10 48 q16 -14 28 -4 t32 -10" />
      <path d="M14 60 q12 -12 26 -6 t30 -10" />
      <path d="M20 70 q12 -14 26 -8 t26 -14" />
    </g>
    <path d="M62 60 q12 6 18 18" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export const Star = ({ size = 14, color = '#F4C24A', filled = true }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinejoin="round">
    <path d="M12 2l3.1 6.5 7.2 1-5.2 5 1.2 7.1L12 18.2 5.7 21.6 7 14.5 1.7 9.5l7.2-1z" />
  </svg>
);

export const HomeIcon = ({ size = 36 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size}>
    <path d="M32 6 L8 26 v32 h48 V26 z" fill="#F4C24A" stroke="#2D2418" strokeWidth="3" strokeLinejoin="round" />
    <rect x="22" y="34" width="20" height="20" rx="2" fill="#FFF6E2" stroke="#2D2418" strokeWidth="2.5" />
    <circle cx="32" cy="44" r="2.5" fill="#2D2418" />
    <path d="M28 22 Q32 18 36 22" stroke="#2D2418" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="22" cy="20" rx="3.5" ry="4" fill="#E05F22" />
    <ellipse cx="42" cy="20" rx="3.5" ry="4" fill="#E05F22" />
  </svg>
);

export const Stars = ({ rating, size = 14 }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          filled={i < full || (i === full && half)}
          color={i < full ? '#F4C24A' : i === full && half ? '#F4C24A' : '#E8DAB7'}
        />
      ))}
    </div>
  );
};

export const PetGlyph = ({ type, size = 28 }) => {
  if (type === 'dog') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} fill="#2D2418">
        <ellipse cx="16" cy="20" rx="9" ry="8" />
        <ellipse cx="8" cy="14" rx="3.5" ry="5" transform="rotate(-20 8 14)" />
        <ellipse cx="24" cy="14" rx="3.5" ry="5" transform="rotate(20 24 14)" />
        <circle cx="13" cy="19" r="1.3" fill="#FFF6E2" />
        <circle cx="19" cy="19" r="1.3" fill="#FFF6E2" />
        <ellipse cx="16" cy="23" rx="2" ry="1.3" fill="#E05F22" />
      </svg>
    );
  }
  if (type === 'cat') {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} fill="#2D2418">
        <path d="M6 12 L10 22 H22 L26 12 L22 16 L16 12 L10 16 Z" />
        <circle cx="13" cy="18" r="1.2" fill="#FFF6E2" />
        <circle cx="19" cy="18" r="1.2" fill="#FFF6E2" />
        <path d="M14 21 Q16 23 18 21" stroke="#FFF6E2" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="#2D2418">
      <ellipse cx="16" cy="22" rx="8" ry="7" />
      <ellipse cx="12" cy="10" rx="2.5" ry="6" />
      <ellipse cx="20" cy="10" rx="2.5" ry="6" />
      <circle cx="13" cy="22" r="1.2" fill="#FFF6E2" />
      <circle cx="19" cy="22" r="1.2" fill="#FFF6E2" />
    </svg>
  );
};

export const PhotoPlaceholder = ({ sitter, large = false }) => (
  <div className={`photo-ph ${large ? 'large' : ''}`} style={{ '--bg': sitter.color }}>
    <span className="glyph">{sitter.monogram}</span>
    <span className="pet-emoji">
      <PetGlyph type={sitter.petType} size={large ? 36 : 22} />
    </span>
    <span className="meta">photo · {sitter.id}</span>
  </div>
);

export const Brand = () => (
  <div className="brand">
    <HomeIcon />
    <div className="brand-name">
      <span>Paws &amp; Play</span>
      <span>Network</span>
    </div>
  </div>
);

export const NavLinks = ({ active = '' }) => (
  <div className="nav-links">
    <a href="/" className={active === 'find' ? 'active' : ''}>Find a Sitter</a>
    <a href="#how">How It Works</a>
    <a href="#sitters">For Sitters</a>
    <button className="btn-join">Join Us</button>
  </div>
);

export const Footer = () => (
  <footer className="footer">
    <Brand />
    <div className="footer-links">
      <a href="/">Find a Sitter</a>
      <a href="#how">How it Works</a>
      <a href="#sitters">For Sitters</a>
      <a href="#join">Join Us</a>
      <a href="#contact">Contact</a>
    </div>
  </footer>
);
