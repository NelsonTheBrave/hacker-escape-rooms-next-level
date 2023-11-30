export class MobileMenu {
  constructor() {
    document.querySelector('.navbar-button').addEventListener('click', this.Popup);
  }
  Popup() {
    const navBar = document.querySelector('.navBar');
    document.querySelector('body').style.overflow = 'hidden';
    const html = document.querySelector('html');
    html.setAttribute('class', '--transparant');
    setTimeout(() => {
      html.classList.remove('--transparant');
      navBar.setAttribute('class', 'navBar--popup');
    }, 200);
    navBar.addEventListener('click', (closeIt));
    visualViewport.onresize = closeIt;

    function closeIt(event) {
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
    
  }

}

