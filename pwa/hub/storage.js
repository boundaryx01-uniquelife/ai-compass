const prefix = 'aiCompass:hub:';
export function read(key, fallback, valid) {
  try { const value=JSON.parse(localStorage.getItem(prefix+key));return valid(value)?value:fallback; }
  catch {return fallback;}
}
export function write(key,value) {
  try { localStorage.setItem(prefix+key,JSON.stringify(value)); }
  catch { document.getElementById('status').textContent='이 브라우저에서는 기록을 저장할 수 없습니다.'; }
}
