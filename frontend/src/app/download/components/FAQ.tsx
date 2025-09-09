"use client"
import React, { useEffect, useState } from 'react';

import { faqData } from '../data';

const FAQ: React.FC = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(0);
  }, []);

  return (
    <section className="section-faq section">
      <div className="container flex flex-col items-center">

        <h2 className="title text-center">
          FAQ 💬
        </h2>

        <p className="text text-base text-white text-center mt-6">
          Frequent asked questions.
        </p>

        <div className="items flex flex-col w-full gap-0 mt-12 max-w-[700px]">
          {faqData.map((item, i) => (
            <div
              key={item.id}
              className={`faq w-full overflow-hidden flex flex-col border-1 border-(--black) duration-250 hover:border-(--primary-orange-1) group [.-active]:bg-black ${active == i ? '-active' : ''}`}
            >

              <button
                className="button w-full flex justify-between items-center p-8 cursor-pointer text-white duration-250 group-[.-active]:hover:cursor-default"
                type="button"
                onClick={() => setActive(i)}
              >
                <p className="text-big font-bold">{item.title}</p>
                <span className="text-big !font-normal">{active == i ? '-' : '+'}</span>
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