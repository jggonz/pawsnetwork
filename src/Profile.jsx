import { useEffect, useRef, useState } from 'react';
import { Brand, NavLinks, Footer } from './decor.jsx';

const storageKey = () => `widget-snippet:${window.location.pathname}${window.location.search}`;

function ConfigureModal({ initial, onSave, onClose }) {
  const [draft, setDraft] = useState(initial || '');

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(45,36,24,0.5)',
        display: 'grid', placeItems: 'center', zIndex: 100, padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 24, padding: 28,
          width: '100%', maxWidth: 640,
          boxShadow: '0 20px 50px rgba(45,36,24,0.25)',
          border: '3px solid var(--cream-deep)',
        }}
      >
        <h2 style={{ fontSize: 26, marginBottom: 6 }}>Configure widget</h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginBottom: 16 }}>
          Paste an HTML snippet below. It will be embedded in the container on this page and persisted
          to localStorage for <code style={{ background: 'var(--cream)', padding: '2px 6px', borderRadius: 6 }}>{window.location.pathname}{window.location.search}</code>.
        </p>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={'<iframe src="https://example.com/widget" ...></iframe>'}
          style={{
            width: '100%', minHeight: 220,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, padding: 14,
            border: '2px solid var(--line)', borderRadius: 14,
            outline: 'none', resize: 'vertical', color: 'var(--ink)',
            background: 'var(--cream)',
          }}
        />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 18px', borderRadius: 999,
              border: '2px solid var(--line)', background: 'white',
              fontWeight: 800, color: 'var(--ink)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(draft)}
            style={{
              padding: '10px 22px', borderRadius: 999,
              background: 'var(--orange)', color: 'white',
              fontWeight: 800, boxShadow: '0 3px 0 var(--orange-deep)',
            }}
          >
            Save snippet
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const [snippet, setSnippet] = useState('');
  const [showModal, setShowModal] = useState(false);
  const embedRef = useRef(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey());
      if (stored) setSnippet(stored);
    } catch {}
  }, []);

  useEffect(() => {
    if (!embedRef.current) return;
    embedRef.current.innerHTML = snippet || '';
    if (!snippet) return;
    embedRef.current.querySelectorAll('script').forEach((oldScript) => {
      const s = document.createElement('script');
      for (const { name, value } of oldScript.attributes) s.setAttribute(name, value);
      s.text = oldScript.text;
      oldScript.replaceWith(s);
    });
  }, [snippet]);

  const save = (next) => {
    setSnippet(next);
    try {
      if (next) window.localStorage.setItem(storageKey(), next);
      else window.localStorage.removeItem(storageKey());
    } catch {}
    setShowModal(false);
  };

  const clear = () => save('');

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

        <div className="widget-wrap">
          <div className="widget-container">
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 16 }}>
              {snippet && (
                <button
                  onClick={clear}
                  style={{
                    padding: '8px 16px', borderRadius: 999,
                    border: '2px solid var(--line)', background: 'white',
                    fontWeight: 800, fontSize: 13, color: 'var(--ink-soft)',
                  }}
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setShowModal(true)}
                style={{
                  padding: '10px 20px', borderRadius: 999,
                  background: 'var(--orange)', color: 'white',
                  fontWeight: 800, fontSize: 14,
                  boxShadow: '0 3px 0 var(--orange-deep)',
                }}
              >
                Configure widget
              </button>
            </div>

            {snippet ? (
              <div ref={embedRef} />
            ) : (
              <div
                style={{
                  border: '2.5px dashed var(--ink-mute)',
                  borderRadius: 20,
                  background: 'repeating-linear-gradient(45deg, var(--cream) 0 14px, #FBEEC9 14px 28px)',
                  minHeight: 360,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center', padding: '32px 28px',
                }}
              >
                <div
                  style={{
                    background: 'var(--ink)', color: 'var(--cream)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
                    padding: '4px 10px', borderRadius: 999, textTransform: 'uppercase',
                    marginBottom: 16,
                  }}
                >
                  {'<embed slot>'}
                </div>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 22, fontWeight: 600 }}>
                  No widget configured
                </div>
                <div style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: 14, maxWidth: 420, lineHeight: 1.55 }}>
                  Click <strong>Configure widget</strong> to paste an HTML snippet. It will be embedded
                  here and remembered for this URL.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {showModal && (
        <ConfigureModal
          initial={snippet}
          onSave={save}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
