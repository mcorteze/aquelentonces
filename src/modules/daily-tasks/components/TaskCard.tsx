import type { DailyTask } from '../types';
import { TaskStatusControl } from './TaskStatusControl';
import styles from './TaskCard.module.css';
import { cn } from '../../../utils/cn';

interface Props {
  task: DailyTask;
  onToggle: () => void;
}

export function TaskCard({ task, onToggle }: Props) {
  const assetPath = `/assets/tasks/${task.imageKey}.png`;

  return (
    <article className={cn(styles.card, task.status === 'done' && styles.done)}>
      <TaskStatusControl status={task.status} onToggle={onToggle} />
      <ImageOrPlaceholder src={assetPath} alt={task.title} label={task.imageKey} />
      <p className={styles.title}>{task.title}</p>
    </article>
  );
}

function ImageOrPlaceholder({ src, alt, label }: { src: string; alt: string; label: string }) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.style.display = 'none';
    const sibling = img.nextElementSibling as HTMLElement | null;
    if (sibling) sibling.style.display = 'flex';
  };

  return (
    <>
      <img src={src} alt={alt} className={styles.image} onError={handleError} />
      <div className={styles.placeholder} style={{ display: 'none' }} aria-hidden="true">
        <span className={styles.placeholderLabel}>{label}</span>
      </div>
    </>
  );
}
