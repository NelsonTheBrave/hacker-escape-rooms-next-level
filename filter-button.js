export class FilterButton {
  render() {
    const filterDiv = document.querySelector('.filterDiv');
    const filterButton = document.querySelector('.filterButton');
    const closeMenu = document.querySelector('.closeMenu');
    const body = document.querySelector('body');
     
      filterButton.addEventListener('click', () => {
        filterDiv.style.display = 'block';
        if (window.screen.width > 480) {
        filterButton.style.display = 'none';} else {body.style.overflow = 'hidden';

        }
      });
      closeMenu.addEventListener('click', () => {
        filterDiv.style.display = 'none';
        filterButton.style.display = 'block';
        if (window.screen.width <= 480) {body.style.overflow = 'auto'
          } 
      });
    
  }
}
