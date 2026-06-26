import type { DailyTask } from '../types';
import { TaskStatusControl } from './TaskStatusControl';
import styles from './TaskCard.module.css';
import { cn } from '../../../utils/cn';

const TASK_EMOJIS: Record<string, string> = {
  teeth:      '🦷',
  bath:       '🛁',
  breakfast:  '🥣',
  school:     '🎒',
  lunch:      '🍱',
  nap:        '😴',
  dinner:     '🍽️',
  bedtime:    '🌙',
  read:       '📚',
  play:       '🎮',
  default:    '⭐',
};

interface Props {
  task: DailyTask;
  onToggle: () => void;
}

export function TaskCard({ task, onToggle }: Props) {
  const assetPath = `/assets/tasks/${task.imageKey}.png`;
  const emoji = TASK_EMOJIS[task.imageKey] ?? TASK_EMOJIS.default;

  return (
    <article className={cn(styles.card, task.status === 'done' && styles.done)}>
      <TaskStatusControl status={task.status} onToggle={onToggle} />
      <ImageOrPlaceholder src={assetPath} emoji={emoji} alt={task.title} />
      <p className={styles.title}>{task.title}</p>
    </article>
  );
}

function ImageOrPlaceholder({ src, emoji, alt }: { src: string; emoji: string; alt: string }) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).style.display = 'none';
    const sibling = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement | null;
    if (sibling) sibling.style.display = 'flex';
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        onError={handleError}
        referrerPolicy="no-referrer"
      />
      <div className={styles.placeholder} style={{ display: 'none' }}>
        {emoji}
      </div>
    </>
  );
}
