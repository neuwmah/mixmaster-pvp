import React from 'react';

import HenchGallery from '@/app/mix/components/HenchGallery';
import { getHenchs } from '@/app/api/hench';

const Hench: React.FC = async () => {
  const henches = await getHenchs();

  return (
    <section className="section-hench section !mt-12">
      <div className="container flex flex-col items-center">
        <HenchGallery henches={henches} />
      </div>
    </section>
  );
};

export default Hench;