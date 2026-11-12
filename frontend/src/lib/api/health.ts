export type HealthStatus = 'available' | 'unavailable';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export async function getBackendHealth(): Promise<HealthStatus> {
  try {
    const response = await fetch(`${apiBaseUrl}/health/live`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) return 'unavailable';

    const body: unknown = await response.json();
    return typeof body === 'object' && body !== null && 'status' in body && body.status === 'ok'
      ? 'available'
      : 'unavailable';
  } catch {
    return 'unavailable';
  }
}
