'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sentoriVino } from '../../../constants/sentoriVino';

export default function OlfattoSecondoLivello() {
  const router = useRouter();
  const [sentori, setSentori] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('olfatto_primo_livello');
    if (stored) {
      try {
        const categorie: string[] = JSON.parse(stored);
        const arr: string[] = [];
        categorie.forEach((cat) => {
          const values = (sentoriVino.rossi_e_rosati as Record<string, string[]>)[cat];
          if (values) arr.push(...values);
        });
        setSentori(arr);
      } catch {
        setSentori([]);
      }
    } else {
      router.push('/degustazione/olfatto/primo-livello');
    }
  }, [router]);

  const toggleSelection = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value]
    );
  };

  const handleNext = () => {
    if (selected.length > 0) {
      localStorage.setItem('olfatto_secondo_livello', JSON.stringify(selected));
      router.push('/degustazione/gusto');
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Olfatto – Secondo Livello</h1>
      <p>Quali sentori specifici riesci a identificare?</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sentori.map((s) => (
          <li key={s}>
            <button
              onClick={() => toggleSelection(s)}
              style={{
                margin: '0.5rem 0',
                padding: '0.5rem 1rem',
                backgroundColor: selected.includes(s) ? '#a3e635' : '#e5e7eb',
                border: '1px solid #ccc',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleNext}
        disabled={selected.length === 0}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: selected.length > 0 ? '#2563eb' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
        }}
      >
        Vai al Gusto
      </button>
    </main>
  );
}
