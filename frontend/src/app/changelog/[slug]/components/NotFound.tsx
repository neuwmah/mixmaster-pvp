import React from 'react';

const NotFound: React.FC = async () => {
  return (
    <section className="section-not-found section">
      <div className="container flex flex-col items-center">
        <h1 className="title text-center">❗ 404</h1>
        <p className="text-big text-center mt-6 text-(--gray-4)">Not found.</p>
      </div>
    </section>
  )
}

export default NotFound;