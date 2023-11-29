export function openPopup() {
  const navBar = document.querySelector('.navBar');
  document.querySelector('body').style.overflow = 'hidden';
  const html = document.querySelector('html');
  html.setAttribute('class', '--transparant');
  setTimeout(() => {
    html.classList.remove('--transparant');
    navBar.setAttribute('class', 'navBar--popup');
  }, 200);
  navBar.addEventListener('click', closePopup);
  visualViewport.onresize = closePopup;
}

export function closePopup(event) {
  const navBar = document.querySelector('.navBar--popup');
  if (
    event.target.nodeName === 'BUTTON' ||
    event.target.nodeName == 'A' ||
    event.target.width > 900
  ) {
    if (navBar) {
      navBar.setAttribute('class', 'navBar');
      document.querySelector('body').style.overflow = 'auto';
    }
  }
}
