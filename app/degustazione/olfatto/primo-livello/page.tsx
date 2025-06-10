'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sentoriVino } from '../../../constants/sentoriVino';

export default function OlfattoPrimoLivello() {
  const router = useRouter();
  const categorie = Object.keys(sentoriVino.rossi_e_rosati);
  const [selezionati, setSelezionati] = useState<string[]>([]);

  const toggle = (cat: string) => {
    setSelezionati(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleNext = () => {
    if (selezionati.length > 0) {
      localStorage.setItem('olfatto_primo_livello', JSON.stringify(selezionati));
      router.push('/degustazione/olfatto/secondo-livello');
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Olfatto – Primo Livello</h1>
      <p>Seleziona i sentori principali percepiti:</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {categorie.map(c => (
          <li key={c}>
            <button
              onClick={() => toggle(c)}
              style={{
                margin: '0.5rem 0',
                padding: '0.5rem 1rem',
                backgroundColor: selezionati.includes(c) ? '#a3e635' : '#e5e7eb',
                border: '1px solid #ccc',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
              }}
            >
              {c}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleNext}
        disabled={selezionati.length === 0}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: selezionati.length > 0 ? '#2563eb' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: selezionati.length > 0 ? 'pointer' : 'not-allowed',
        }}
      >
        Continua
      </button>
    </main>
  );
}
