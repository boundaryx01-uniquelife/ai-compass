export function routeParts() {
  try { return (location.hash.startsWith('#/') ? location.hash.slice(2) : 'intro').split('/').map(decodeURIComponent); }
  catch {return ['missing'];}
}
export function selectNav(section) {
  document.querySelectorAll('.header nav a').forEach(link => {
    if (link.hash.split('/')[1] === section) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
}
