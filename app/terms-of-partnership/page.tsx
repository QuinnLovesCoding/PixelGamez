import React from 'react';

export const metadata = {
  title: 'Terms of Partnership - PixelGamez',
  description: 'Terms of Partnership (TOP) for PixelGamez brand integration and sponsorships.',
};

export default function TermsOfPartnershipPage() {
  return (
    <div className="terms-page animate-fade-in" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--accent-primary)' }}>Terms of Partnership (TOP)</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Last updated: July 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.6 }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>1. Overview</h2>
          <p>These Terms of Partnership ("TOP") govern all brand partnerships, sponsorships, and collaborations between PixelGamez ("we", "us") and a partnering brand, company, or individual ("Partner"). By entering into a partnership with PixelGamez, the Partner agrees to these terms in addition to any specific agreement signed for their tier or campaign.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>2. What We Offer</h2>
          <p>Depending on tier, partnerships may include: placement in our Trusted Partners logo strip, homepage takeovers, in-game advertising integration, sponsored/branded games, social media shoutouts (TikTok, YouTube, Twitter, Discord), monthly competition/tournament integration, and access to verified engagement and analytics reporting. Exact deliverables are defined by the Partner's selected tier (Spotlight, Network, or Logo) or a custom agreement.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>3. Access We Provide</h2>
          <p>Partners receive access to a partner dashboard (or monthly report) showing DAU, WAU, MAU, impressions, verified active-engagement time, and traffic driven to their site or app. We do not provide access to individual user data, personal information of PixelGamez users, or backend site infrastructure. All data shared is aggregated and anonymized.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>4. Partner Responsibilities</h2>
          <p>Partners must provide accurate branding assets (logos, creatives, links) in a timely manner, ensure any linked website or app is safe, functional, and free of malware, and disclose clearly if their product involves gambling, age-restricted content, or regulated goods/services so we can apply appropriate safeguards (e.g. age-gating).</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>5. Who We Will Partner With</h2>
          <p>We welcome partnerships with brands relevant to gaming, tech, entertainment, and youth/young-adult audiences, provided the brand is legitimate, operates lawfully, and aligns with a safe, positive experience for our community.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>6. Who We Won't Partner With</h2>
          <p>We do not partner with brands involved in: gambling or betting services not properly licensed/age-restricted, adult content, tobacco/vaping, weapons, hate groups or extremist organizations, scams or MLM schemes, or any brand that conflicts with maintaining a safe environment for our audience (which may include minors). We reserve the right to decline or end any partnership at our discretion if it no longer aligns with our community standards.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>7. Payment Terms</h2>
          <p>Payment is due monthly in advance unless otherwise agreed in writing. Late payments may result in paused placements until resolved.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>8. Duration &amp; Cancellation</h2>
          <p>Partnerships run month-to-month unless a fixed term is agreed. Either party may cancel with 14 days' written notice. No refunds are provided for the current billing period once services have been delivered.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>9. Content &amp; Brand Guidelines</h2>
          <p>We reserve final say on how a Partner's branding is displayed to ensure it fits naturally within the PixelGamez experience and does not mislead or overwhelm users. Partners may not imply an endorsement, exclusivity, or relationship beyond what has been agreed.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>10. Termination for Cause</h2>
          <p>We may terminate a partnership immediately, without refund, if the Partner violates these terms, damages our reputation, or if their product/service becomes non-compliant with law or our standards after the partnership began.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>11. Confidentiality</h2>
          <p>Both parties agree to keep any non-public analytics, pricing, or strategy discussions confidential unless both parties agree otherwise.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>12. Liability</h2>
          <p>PixelGamez is not liable for indirect or consequential damages arising from the partnership, including changes in traffic, engagement, or platform performance beyond our reasonable control.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>13. Changes to These Terms</h2>
          <p>We may update this TOP from time to time. Existing partners will be notified of material changes in advance.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>14. Contact</h2>
          <p>Questions about a partnership can be sent to <a href="mailto:partnerships@pixelgamez.com" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>partnerships@pixelgamez.com</a>.</p>
        </section>

        <hr style={{ borderColor: 'var(--border-color)', margin: '32px 0' }} />

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          This document is a general template and does not constitute legal advice. Please have it reviewed by a qualified attorney before relying on it for legal compliance, especially before entering into any paid partnership agreement.
        </p>
      </div>
    </div>
  );
}
