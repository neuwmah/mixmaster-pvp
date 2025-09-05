"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createCharacter, getCharacter } from '@/app/api/character';
import { createPetsBulk } from '@/app/api/pets';

import Fields from '@/app/account/components/characters/create/Fields';
import Jobs from '@/app/account/components/characters/create/Jobs';

import { User } from '@/types/user';
import { Character } from '@/types/character';

interface CreateProps {
  user: User;
  create: boolean;
  backgroundRef: any;
  setCreate: (value: boolean) => void;
  setHenchList: (value: Character | undefined) => void;
}

export default function Create({ user, create, backgroundRef, setCreate, setHenchList }: CreateProps) {
  const [name, setName] = useState('');
  const [job, setJob] = useState('ditt');
  const [attributes, setAttributes] = useState({ energy: 10, agility: 10, accuracy: 10, luck: 10 });
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    setErrorMessage('');

    try {
      const partialCharacter = {
        userId: user.id,
        name,
        class: job,
        energy: attributes.energy,
        agility: attributes.agility,
        accuracy: attributes.accuracy,
        luck: attributes.luck
      };

      const result = await createCharacter(partialCharacter);
      if (result.error || !result.data) {
        alert(result.error || 'Create error.');
        setTimeout(() => setErrorMessage(''), 2500);
      } else {
        const createdChar = result.data;
        const henchIds = [
          'cmf5rubal0000oxrl3qlthug8',
          'cmf5u1umf000g111c4rdna21w',
          'cmf5u4b93000h111c551i192k'
        ];
        try {
          await createPetsBulk(henchIds.map(
            (hid, idx) => ({ 
              characterId: createdChar.id,
              henchId: hid,
              slot: idx, 
              in_party: true
            })
          ))
        } catch {}

        let updatedCharacter: Character | null = null;
        try { updatedCharacter = await getCharacter(createdChar.id) } catch {}

        await new Promise(r => setTimeout(r, 120));
        setCreate(false);
        setHenchList(updatedCharacter || createdChar);
        router.refresh();
      }
    } catch {
      alert('Unexpected error.');
      setTimeout(() => setErrorMessage(''), 2500);
    }

    setSending(false);
  };

  return (
    <form
      onSubmit={handleCreate}
      className={`
        form flex flex-col items-center w-full mt-12 max-w-[800px] duration-[.25s]
        ${sending && 'pointer-events-none opacity-[.7]'}
      `}
    >
      
      <div className="wrapper w-full flex flex-col gap-12 sm:grid sm:grid-cols-2 sm:items-start">
        <Fields sending={sending} name={name} setName={setName} attributes={attributes} setAttributes={setAttributes} />
        <Jobs sending={sending} job={job} setJob={setJob} backgroundRef={backgroundRef} />
      </div>
      
      <div className="mt-16 flex items-center gap-4">
        {create &&
          <button
            className={`w-auto button-gray ${sending && 'pointer-events-none'}`}
            aria-label="Click to Return"
            type="button"
            onClick={() => setCreate(false)}
          >
            Return
          </button>      
        }
        <button
          className={`w-auto button-orange ${sending && 'pointer-events-none'}`}
          aria-label="Click to Create"
          type="submit"
        >
          Create ✨
        </button>
      </div>

      {errorMessage && (
        <p className="text-base text-white mt-12">
          {errorMessage}
        </p>
      )}

    </form>
  )
}