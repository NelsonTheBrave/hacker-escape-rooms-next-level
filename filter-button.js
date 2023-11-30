export class FilterButton {
  render() {
    const filterDiv = document.querySelector('.filterDiv');
    const filterButton = document.querySelector('.filterButton');
    const closeMenu = document.querySelector('.closeMenu');
     
      filterButton.addEventListener('click', () => {
        filterDiv.style.display = 'block';
        filterButton.style.display = 'none';
      });
      closeMenu.addEventListener('click', () => {
        filterDiv.style.display = 'none';
        filterButton.style.display = 'block';
      });
    
  }
}
