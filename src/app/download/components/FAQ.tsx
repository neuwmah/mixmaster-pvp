"use client"
import React, { useEffect, useState } from 'react';

const faqData = [
  { id: 1, title: 'Empty message in Windows 10/11?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. </br> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.' },
  { id: 2, title: 'Empty texts in game chat?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.' },
  { id: 3, title: 'Is the server P2W?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.' },
  { id: 4, title: 'How can I help the server?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.' },
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
          FAQ
        </h1>

        <p className="text text-base text-white text-center mt-6">
          Frequent asked questions.
        </p>

        <div className="items flex flex-col gap-1 mt-16 w-full max-w-[700px]">
          {faqData.map((item, i) => (
            <div
              key={item.id}
              className={`faq w-full overflow-hidden flex flex-col border-1 border-(--gray-2) duration-250 hover:border-(--personal) group ${active == i ? '-active' : ''}`}
            >

              <button
                className="button w-full flex justify-between items-center p-8 cursor-pointer text-white duration-250 hover:text-(--personal) group-[.-active]:hover:text-white group-[.-active]:hover:cursor-default"
                type="button"
                onClick={() => setActive(i)}
              >
                <p className="text-sm font-bold">{item.title}</p>
                <span>{active == i ? '-' : '+'}</span>
              </button>

              <div className="dropdown px-8 max-h-0 duration-400 group-[.-active]:max-h-[80px]">
                <p
                  className="answer text-xs text-white mb-8 opacity-0 duration-700 group-[.-active]:opacity-100"
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