export default function TrustedPartners() {
  const partners = [
    { name: 'GamerGrip', logo: '🎮' },
    { name: 'PixelPlay', logo: '🕹️' },
    { name: 'NexusGaming', logo: '🌌' },
    { name: 'LootDrop', logo: '🎁' },
    { name: 'EpicQuest', logo: '⚔️' },
  ];

  return (
    <section className="trusted-partners-strip" style={{ 
      margin: '40px 0', 
      padding: '24px 0', 
      background: 'rgba(255,255,255,0.02)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h3 style={{ 
          fontSize: '0.875rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em', 
          color: 'var(--text-dim)',
          margin: 0
        }}>
          Trusted by our amazing partners
        </h3>
      </div>
      
      <div className="partners-marquee" style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="partners-track" style={{ display: 'flex', gap: '48px', alignItems: 'center', animation: 'marquee 20s linear infinite' }}>
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div key={i} className="partner-item" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              opacity: 0.6,
              transition: 'opacity 0.2s ease, transform 0.2s ease'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{partner.logo}</span> {partner.name}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .partner-item:hover {
          opacity: 1 !important;
          transform: scale(1.05);
          color: var(--text-primary) !important;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
