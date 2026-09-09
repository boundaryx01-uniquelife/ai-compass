const PREFIX = 'aiCompass:glossary:';
export function read(key, fallback, validate) {
  try {
    const value = JSON.parse(localStorage.getItem(PREFIX + key));
    return validate(value) ? value : fallback;
  } catch { return fallback; }
}
export function write(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; }
  catch {
    document.getElementById('storage-status').textContent = ' 이 브라우저에서는 기록을 저장할 수 없습니다. 현재 화면에서는 계속 사용할 수 있습니다.';
    return false;
  }
}
export const validFavorites = value => Array.isArray(value) && value.every(id => typeof id === 'string');
export const validLearning = value => value && Number.isSafeInteger(value.completed) && value.completed >= 0 && typeof value.lastCompleted === 'string' && Number.isFinite(Date.parse(value.lastCompleted)) && validFavorites(value.wrongTermIds) && validFavorites(value.wrongQuizIds);
