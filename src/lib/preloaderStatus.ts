/**
 * Tiny pub/sub so content hidden behind the fixed-position Preloader (which
 * covers the page but doesn't stop it from laying out/mounting underneath)
 * can wait for it to actually finish before running scroll-into-view
 * animations — otherwise things like StatsBar's count-up can fire and
 * complete while still hidden behind the overlay. `markPreloaderDone` is a
 * module-level flag (not component state), so it stays true for the rest of
 * the session — a component that mounts later (e.g. after a client-side nav
 * back to "/") sees it's already done and proceeds immediately instead of
 * waiting for an event that already fired in the past.
 */

let done = false;
const listeners = new Set<() => void>();

export function markPreloaderDone() {
  if (done) return;
  done = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}

/** Calls `cb` once the preloader has finished — immediately if it already has. */
export function onPreloaderDone(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
