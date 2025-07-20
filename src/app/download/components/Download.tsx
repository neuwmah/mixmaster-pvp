import React from 'react';
import Link from 'next/link';

interface File {
  id: string;
  url: string;
}

const fileData = {
  id: '1',
  url: '#',
};

const Download: React.FC = () => {
  return (
    <section className="section-download section">
      <div className="container flex flex-col items-center">

        <h1 className="title text-center">
          Download
        </h1>

        <p className="text-base text-white text-center mt-6">
          Our server is currently in beta testing. <br/>
          You can report any bugs you find. <br/>
          <span className="text-(--gray-3)">(we will be looking anyway) 👀</span> <br/>
        </p>

        <Link className="button-main mt-12" href={fileData.url}>
          Click Here!
        </Link>

      </div>
    </section>
  );
};

export default Download;