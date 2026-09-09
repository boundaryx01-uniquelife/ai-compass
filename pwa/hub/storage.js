const PREFIX='aiCompass:hub:v2:';
export function read(key,fallback){try{return JSON.parse(localStorage.getItem(PREFIX+key))??fallback;}catch{return fallback;}}
export function write(key,value){try{localStorage.setItem(PREFIX+key,JSON.stringify(value));return true;}catch{document.querySelector('#status').textContent='이 브라우저에서 기록을 저장하지 못했습니다.';return false;}}
