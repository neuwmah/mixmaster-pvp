import React from 'react';

import {
  MinusIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface FieldsProps {
  sending: boolean;
  name: string;
  attributes: {
    energy: number;
    agility: number;
    accuracy: number;
    luck: number;
  };
  setName: (value: string) => void;
  setAttributes: React.Dispatch<React.SetStateAction<{
    energy: number;
    agility: number;
    accuracy: number;
    luck: number;
  }>>;
}

export default function Fields({ sending, name, setName, attributes, setAttributes }: FieldsProps) {
  const MIN = 10;
  const MAX = 15;
  const EXTRA_TOTAL = 5;
  const spent = (attributes.energy - MIN) + (attributes.agility - MIN) + (attributes.accuracy - MIN) + (attributes.luck - MIN);
  const remaining = EXTRA_TOTAL - spent;

  function update(key: keyof typeof attributes, delta: 1 | -1) {
    setAttributes(prev => {
      const next = { ...prev } as typeof attributes;
      const candidate = next[key] + delta;
      if (candidate < MIN || candidate > MAX) return prev;
      const prospectiveSpent = spent + (candidate - next[key]);
      if (prospectiveSpent > EXTRA_TOTAL) return prev;
      next[key] = candidate;
      return next;
    });
  }

  const attrList: { key: keyof typeof attributes; label: string }[] = [
    { key: 'energy', label: 'Energy' },
    { key: 'agility', label: 'Agility' },
    { key: 'accuracy', label: 'Accuracy' },
    { key: 'luck', label: 'Luck' }
  ];

  return (
    <div className="fields flex flex-col gap-8 p-[2.4rem] sm:p-[2.8rem] sm:pt-[2.4rem] bg-[rgba(0,0,0,.7)] border-[1px] border-(--gray-1) border-dashed rounded-[.8rem]">
      <div className="nickname">
        <p className="text-base mb-4 text-center">Set character nickname.</p>
        <div className="field flex">
          <label className="text-xs font-bold flex items-center justify-center w-[8rem] bg-(--primary-orange-1) rounded-l-[8px]" htmlFor="name">Name</label>
          <input
            className="text-xs text-(--gray-0) outline-none min-w-0 h-[3.2rem] px-[.8rem] w-[16rem] bg-white flex-1 rounded-r-[8px]"
            id="name"
            name="name"
            type="text"
            placeholder="Type here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={3}
            maxLength={16}
            required
          />
        </div>
      </div>

      <div className="attributes">
        <div className="text text-base flex items-center justify-between mb-4">
          <span>Choose character attributes.</span>
          <span>Points: <strong className={remaining < 0 ? 'text-(--primary-red-1)' : ''}>{remaining}</strong></span>
        </div>
        <div className="list flex flex-col gap-[1px]">
          {attrList.map(({ key, label }) => {
            const value = attributes[key];
            const disableMinus = value <= MIN;
            const disablePlus = value >= MAX || remaining <= 0;
            return (
              <div key={key} className="attribute flex items-stretch">
                <label className="text-xs font-bold flex items-center justify-center w-[8rem] bg-(--primary-orange-1) rounded-l-[8px]" htmlFor={key}>{label}</label>
                <div className="quantity flex text-xs justify-between items-center text-(--gray-0) h-[3.2rem] w-[16rem] bg-white flex-1 rounded-r-[8px] overflow-hidden">
                  <button
                    className="h-[3.2rem] w-[3.2rem] flex items-center justify-center cursor-pointer bg-(--gray-5) duration-[.25s] hover:bg-(--gray-4) text-(--gray-1) hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    type="button"
                    disabled={disableMinus || sending}
                    onClick={() => update(key, -1)}
                  >
                    <MinusIcon className="w-[1.5rem] h-[1.5rem] stroke-[2.4] duration-[.25s]" />
                  </button>
                  <input
                    className="min-w-0 text-center outline-none w-12 cursor-default"
                    id={key}
                    name={key}
                    type="text"
                    value={value}
                    readOnly
                  />
                  <button
                    className="h-[3.2rem] w-[3.2rem] flex items-center justify-center cursor-pointer bg-(--gray-5) duration-[.25s] hover:bg-(--gray-4) text-(--gray-1) hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    type="button"
                    disabled={disablePlus || sending}
                    onClick={() => update(key, 1)}
                  >
                    <PlusIcon className="w-[1.5rem] h-[1.5rem] stroke-[2.4] duration-[.25s]" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}