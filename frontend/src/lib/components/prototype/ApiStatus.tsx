import { createSignal, onSettled } from 'solid-js';
import { getBackendHealth, type HealthStatus } from '../../api/health';

const statusLabels = {
  checking: 'Checking backend',
  available: 'Backend connected',
  unavailable: 'Backend is unavailable',
};

const statusColors = {
  checking: 'bg-slate-300',
  available: 'bg-emerald-600',
  unavailable: 'bg-rose-600',
};

export function ApiStatus() {
  const [status, setStatus] = createSignal<HealthStatus | 'checking'>('checking');

  onSettled(() => {
    let active = true;
    void getBackendHealth().then((health) => {
      if (active) setStatus(health);
    });
    return () => {
      active = false;
    };
  });

  return (
    <p aria-live="polite" class="flex items-center gap-2 text-xs text-slate-500">
      <span aria-hidden="true" class={`size-2 rounded-full ${statusColors[status()]}`} />
      {statusLabels[status()]}
    </p>
  );
}
