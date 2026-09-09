export function segments(){try{return (location.hash.replace(/^#\/?/,'')||'intro').split('/').map(decodeURIComponent);}catch{return ['missing'];}}
export function go(path){location.hash='#/'+path;}
export function link(path){return '#/'+path;}
