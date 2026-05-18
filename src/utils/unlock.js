const UNLOCK_KEY = 'exp-lab-unlocked-v1';
const VALID_CODE = 'EXP-LAB-DEV-2026';

export function isUnlocked() {
  try {
    return localStorage.getItem(UNLOCK_KEY) === 'true';
  } catch {
    return false;
  }
}

export function tryUnlock(code) {
  if (code.trim().toUpperCase() === VALID_CODE) {
    try {
      localStorage.setItem(UNLOCK_KEY, 'true');
    } catch {
      // ignore
    }
    return true;
  }
  return false;
}

export function lock() {
  try {
    localStorage.removeItem(UNLOCK_KEY);
  } catch {
    // ignore
  }
}
