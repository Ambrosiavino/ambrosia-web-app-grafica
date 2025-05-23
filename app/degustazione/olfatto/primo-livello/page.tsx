'use client';

import { useEffect, useState } from 'react';

const sentori = {
  ve: "Vegetale",
  sp: "Speziato",
  fr: "Frutta",
  to: "Tostato",
  fi: "Fiori",
  le: "Legno",
};

export default function OlfattoPrimoLivello() {
  const [selezione, setSelezione] = useState<string | null>(null);

  useEffect(() => {
    const ids = Object.keys(sentori);

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => setSelezione(id));
      }
    });

    return () => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.replaceWith(el.cloneNode(true));
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <object
        data="/file.svg"  // usa "/ruota-livello1.svg" se lo rinomini
        type="image/svg+xml"
        className="w-full max-w-md h-auto"
      />
      {selezione && (
        <p className="mt-4 text-lg font-medium">
          Hai selezionato: <strong>{sentori[selezione]}</strong> ({selezione})
        </p>
      )}
    </div>
  );
}

