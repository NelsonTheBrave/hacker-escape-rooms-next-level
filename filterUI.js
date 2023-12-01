import { FilterLogic } from './filter-logic.js';

export class FilterUI {
  // Creating an object that can store information about filter settings
  constructor() {
    this.filterInfo = {
      tagsAndType: [],
      rating: [0, 5],
      keyword: '',
    };

    // Check if URL contains ?type= online or onsite
    const params = new URLSearchParams(window.location.search);
    const filterType = params.get('type');
    if (filterType === 'online') {
      this.filterInfo.tagsAndType = ['online'];
    } else if (filterType === 'onsite') {
      this.filterInfo.tagsAndType = ['onsite'];
    }
  }

  render(container) {
    const filterLogic = new FilterLogic(this.filterInfo, container);

    // Rating UI
    const stars = document.querySelectorAll('.stars i');
    const stars2 = document.querySelectorAll('.stars2 i');

    stars.forEach((star, index1) => {
      let clickedStar = index1 + 1;
      star.addEventListener('click', () => {
        if (clickedStar > this.filterInfo.rating[1]) {
          return;
        }
        if (clickedStar == this.filterInfo.rating[0]) {
          stars.forEach((star) => {
            star.classList.remove('active');
          });
          this.filterInfo.rating[0] = 0;
          filterLogic.run(this.filterInfo, container);
          return;
        }
        stars.forEach((star, index2) => {
          if (index1 > index2) {
            star.classList.add('active');
          } else if (index1 == index2) {
            star.classList.add('active');
            this.filterInfo.rating[0] = index1 + 1;
          } else {
            star.classList.remove('active');
          }
        });
        filterLogic.run(this.filterInfo, container);
      });
    });

    stars2.forEach((star, index1) => {
      let clickedStar = index1 + 1;
      star.addEventListener('click', () => {
        if (clickedStar < this.filterInfo.rating[0]) {
          return;
        }
        if (
          clickedStar == this.filterInfo.rating[1] &&
          this.filterInfo.rating[0] == 0
        ) {
          stars2.forEach((star) => {
            star.classList.remove('active');
          });
          this.filterInfo.rating[1] = 0;
          filterLogic.run(this.filterInfo, container);
          return;
        }
        stars2.forEach((star, index2) => {
          if (index1 > index2) {
            star.classList.add('active');
          } else if (index1 == index2) {
            star.classList.add('active');
            this.filterInfo.rating[1] = index1 + 1;
          } else {
            star.classList.remove('active');
          }
        });
        filterLogic.run(this.filterInfo, container);
      });
    });

    //Tags UI
    const tagButton = document.querySelectorAll('.tagButton');
    tagButton.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('-active');
        if (this.filterInfo.tagsAndType.includes(button.id)) {
          for (let i = 0; i < this.filterInfo.tagsAndType.length; i++) {
            if (this.filterInfo.tagsAndType[i] === button.id) {
              this.filterInfo.tagsAndType.splice(i, 1);
            }
          }
        } else {
          //   button.classList.add('-active');
          this.filterInfo.tagsAndType.push(button.id);
        }
        filterLogic.run(this.filterInfo, container);
      });
    });

    // Type UI
    const typeBox = document.querySelectorAll('.checkBoxContainer input');
    if (this.filterInfo.tagsAndType[0] == 'onsite') {
      typeBox[0].checked = false;
    }
    if (this.filterInfo.tagsAndType[0] == 'online') {
      typeBox[1].checked = false;
    }
    typeBox.forEach((box) => {
      box.addEventListener('click', () => {
        if (this.filterInfo.tagsAndType.includes(box.id)) {
          for (let i = 0; i < this.filterInfo.tagsAndType.length; i++) {
            if (this.filterInfo.tagsAndType[i] === box.id) {
              this.filterInfo.tagsAndType.splice(i, 1);
            }
          }
        } else {
          this.filterInfo.tagsAndType.push(box.id);
        }
        filterLogic.run(this.filterInfo, container);
      });
    });

    // Keyword UI
    const textFilterInput = document.querySelector('#textFilter');
    textFilterInput.addEventListener('input', () => {
      this.filterInfo.keyword = textFilterInput.value;
      filterLogic.run(this.filterInfo, container);
    });
  } // End of render method
} // End of FilterUI
