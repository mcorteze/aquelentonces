import { useState } from 'react';
import { Plus } from 'lucide-react';
import { EntrySheet } from './EntrySheet';
import type { Child } from '../../types';
import styles from './DiaryFAB.module.css';

interface Props {
  children: Child[];
  onSaved: () => void;
}

export function DiaryFAB({ children, onSaved }: Props) {
  const [open, setOpen] = useState(false);

  const handleSaved = () => {
    setOpen(false);
    onSaved();
  };

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setOpen(true)}
        aria-label="Nuevo recuerdo"
        title="Nuevo recuerdo"
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>

      {open && (
        <EntrySheet
          children={children}
          onClose={() => setOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}
