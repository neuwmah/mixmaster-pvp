import React from 'react';
import Link from 'next/link';

import { _environment } from '@/utils/environment';

const fileData = {
  id: '1',
  url: '#',
};

const Download: React.FC = () => {
  return (
    <section className="section-download section section-p bg-gradient-to-b from-black to-(--gray-0) my-[0!important]">
      <div className="container flex flex-col items-center">

        <h1 className="title text-center">
          Download 🎮
        </h1>

        {_environment.current == 'staging'
          ? <>
            <p className="text-base text-white text-center mt-6">
              Our server is currently in beta testing. <br/>
              You can report any bugs if you find. <br/>
              <span className="text-(--gray-3)">(we will be looking anyway) 👀</span> <br/>
            </p>

            <Link className="button-orange mt-12" href={fileData.url}>
              Click to Download
            </Link>
          </> : <>
            <p className="text-base text-white text-center mt-6">
              Beta test server will be released soon. <br />
              Join our Discord server to stay up-to-date with the news.
            </p>
          </>
        }

      </div>
    </section>
  );
};

export default Download;