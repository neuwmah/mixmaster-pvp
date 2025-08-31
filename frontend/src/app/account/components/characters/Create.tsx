"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createCharacter } from '@/app/api/character';

import Fields from '@/app/account/components/characters/create/Fields';
import Jobs from '@/app/account/components/characters/create/Jobs';

import { User } from '@/types/user';

interface CreateProps {
  user: User;
  setCreate: (value: boolean) => void;
}

export default function Create({ user, setCreate }: CreateProps) {
  const [name, setName] = useState('');
  const [job, setJob] = useState('ditt');
  const [attributes, setAttributes] = useState({ energy: 10, agility: 10, accuracy: 10, luck: 10 });
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);

    try {
      const partialCharacter = {
        userId: user.id,
        name: name,
        class: job,
        energy: attributes.energy,
        agility: attributes.agility,
        accuracy: attributes.accuracy,
        luck: attributes.luck
      }

      const created = await createCharacter(partialCharacter);
      if (!created) {
        console.log('handleCreate create error');
        setErrorMessage('Create error.');
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        await new Promise(r => setTimeout(r, 120));
        setCreate(false);
        router.refresh();
      }
    } catch (error) {
      console.error('handleCreate token error', error);
    }

    setSending(false);
  };

  return (
    <form
      onSubmit={handleCreate}
      className={`
        form flex flex-col items-center w-full mt-12 max-w-[640px] duration-[.25s]
        ${sending && 'pointer-events-none opacity-[.7]'}
      `}
    >
      
      <div className="wrapper w-full flex flex-col gap-12 sm:grid sm:grid-cols-2">
        <Fields sending={sending} name={name} setName={setName} attributes={attributes} setAttributes={setAttributes} />
        <Jobs sending={sending} job={job} setJob={setJob} />
      </div>
      
      <button className={`w-auto button-orange mt-16 ${sending && 'pointer-events-none'}`} type="submit" aria-label="Click to Create">
        Create ✨
      </button>

      {errorMessage && (
        <p className="text-base text-white mt-12">
          {errorMessage}
        </p>
      )}

    </form>
  )
}