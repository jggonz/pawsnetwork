import { QRCodeSVG } from 'qrcode.react';
import { Brand } from './decor.jsx';

const TARGET_URL = 'https://pawsnetwork.jggonz.workers.dev/';

export default function QR() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--cream)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 24, gap: 24,
    }}>
      <Brand />
      <div style={{
        background: 'white',
        padding: 28,
        borderRadius: 28,
        border: '3px solid var(--cream-deep)',
        boxShadow: 'var(--shadow-pop)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
        maxWidth: 360,
      }}>
        <h1 style={{
          fontFamily: 'Fredoka, sans-serif',
          fontSize: 28, fontWeight: 600,
          color: 'var(--ink)', margin: 0,
          textAlign: 'center',
        }}>
          Scan to visit Paws &amp; Play
        </h1>
        <QRCodeSVG
          value={TARGET_URL}
          size={256}
          level="M"
          fgColor="#2D2418"
          bgColor="#FFFFFF"
          marginSize={2}
        />
        <a
          href={TARGET_URL}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: 'var(--ink-soft)',
            wordBreak: 'break-all',
            textAlign: 'center',
            textDecoration: 'none',
          }}
        >
          {TARGET_URL}
        </a>
      </div>
    </div>
  );
}
