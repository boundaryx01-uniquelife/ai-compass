// Only canonical transcription files feed READ. No glossary or slide fallback.
export function splitPages(text){
 const parts=text.replace(/\r\n/g,'\n').split(/<!-- PDF page (\d+) \/ 53 -->/);
 const pages=[];
 for(let i=1;i<parts.length;i+=2)pages.push({page:Number(parts[i]),text:parts[i+1].trim()});
 return pages;
}
export function escape(text){return String(text??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function renderManuscript(text){
 // Paragraph boundaries and within-paragraph line breaks stay intact. No guessed table cells.
 return text.split(/\n\s*\n/).map(block=>{
   const lines=block.split('\n'),out=[];let plain=[];
   const flush=()=>{if(plain.length){out.push('<p>'+escape(plain.join('\n'))+'</p>');plain=[];}};
   for(const line of lines){if(/^#{1,6} /.test(line)){flush();out.push('<h2>'+escape(line.replace(/^#{1,6} /,''))+'</h2>');}else plain.push(line);}
   flush();return out.join('');
 }).join('');
}
