"use client"
import React, { useEffect, useState } from 'react';

const faqData = [
  { id: 1, title: 'Empty message in Windows 10/11?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. </br> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.' },
  { id: 2, title: 'Empty texts in game chat?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.' },
  { id: 3, title: 'Is the server P2W?', text: `No! We don't sell anything. </br> Theres no game advantages you can buy with cash in this server.` },
  {
    id: 4,
    title: 'How can I help the server?',
    text: `
      Visit our <a
        href="/shop" 
        style="color: var(--primary-orange-1);"
        onmouseover="this.style.textDecoration=\'underline\'"
        onmouseout="this.style.textDecoration=\'none\'"
      >Store</a>.
    `
  }
];

const FAQ: React.FC = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(0);
  }, []);

  return (
    <section className="section-faq section">
      <div className="container flex flex-col items-center">

        <h1 className="title text-center">
          FAQ 💬
        </h1>

        <p className="text text-base text-white text-center mt-6">
          Frequent asked questions.
        </p>

        <div className="items flex flex-col w-full gap-1 mt-12 max-w-[700px]">
          {faqData.map((item, i) => (
            <div
              key={item.id}
              className={`faq w-full overflow-hidden flex flex-col border-1 border-(--gray-2) duration-250 hover:border-(--primary-orange-1) group ${active == i ? '-active' : ''}`}
            >

              <button
                className="button w-full flex justify-between items-center p-8 cursor-pointer text-white duration-250 group-[.-active]:hover:cursor-default"
                type="button"
                onClick={() => setActive(i)}
              >
                <p className="text-base font-bold">{item.title}</p>
                <span className="text-base">{active == i ? '-' : '+'}</span>
              </button>

              <div className="dropdown px-8 max-h-0 duration-700 group-[.-active]:max-h-[200px]">
                <p
                  className="answer text-sm text-white mb-8 opacity-0 duration-700 group-[.-active]:opacity-100"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                ></p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;