import type { DailyTask } from '../types';
import { TaskCard } from './TaskCard';
import styles from './TaskList.module.css';

interface Props {
  tasks: DailyTask[];
  loading: boolean;
  onToggle: (id: string) => void;
}

export function TaskList({ tasks, loading, onToggle }: Props) {
  if (loading) {
    return (
      <ul className={styles.list}>
        {[1, 2, 3].map((i) => (
          <li key={i} className={styles.skeleton} aria-hidden="true" />
        ))}
      </ul>
    );
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} onToggle={() => onToggle(task.id)} />
        </li>
      ))}
    </ul>
  );
}
