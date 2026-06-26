import type { TaskStatus } from '../types';
import styles from './TaskStatusControl.module.css';
import { cn } from '../../../utils/cn';

interface Props {
  status: TaskStatus;
  onToggle: () => void;
}

export function TaskStatusControl({ status, onToggle }: Props) {
  return (
    <button
      className={cn(styles.control, status === 'done' ? styles.done : styles.pending)}
      onClick={onToggle}
      aria-label={status === 'done' ? 'Marcar como pendiente' : 'Marcar como completada'}
    >
      {status === 'done' ? '✓' : ''}
    </button>
  );
}
