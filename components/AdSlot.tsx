'use client';

import React from 'react';

interface AdSlotProps {
  placement: 'sidebar' | 'banner-home' | 'game-below' | 'game-side' | 'profile';
}

const adConfigs: Record<string, { key: string, width: number, height: number }> = {
  'sidebar': { key: 'f7f8fe548a743e896041ef92b92e6deb', width: 160, height: 600 },
  'banner-home': { key: '43c31b5154eee340f6dc013fb088e988', width: 728, height: 90 },
  'game-below': { key: '43c31b5154eee340f6dc013fb088e988', width: 728, height: 90 },
  'game-side': { key: 'def431e6f8a36ee4eeca81f8d6d841f3', width: 300, height: 250 },
  'profile': { key: 'def431e6f8a36ee4eeca81f8d6d841f3', width: 300, height: 250 }
};

const AdSlot = React.memo(function AdSlot({ placement }: AdSlotProps) {
  const config = adConfigs[placement];
  if (!config) return null;

  return (
    <div className={`promo-box promo-box--${placement}`} style={{ display: 'flex', justifyContent: 'center', margin: '16px 0', overflow: 'hidden' }}>
      <iframe
        src={`/ad.html?key=${config.key}&w=${config.width}&h=${config.height}`}
        width={config.width}
        height={config.height}
        frameBorder="0"
        scrolling="no"
        style={{ border: 'none', background: 'transparent' }}
        title="Advertisement"
      />
    </div>
  );
});

export default AdSlot;
