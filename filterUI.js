import { FilterLogic } from './filter-logic.js';

export class FilterUI {
  // Creating an object that can store information about filter settings
  constructor() {
    this.filterInfo = {
      tagsAndType: [],
      rating: [0, 5],
      keyword: '',
    };
  } // End of constructor

  render() {
    const filterLogic = new FilterLogic();

    // Rating Filter UI
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
          filterLogic.run(this.filterInfo);
          console.log('1');
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
        filterLogic.run(this.filterInfo);
        console.log('2');
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
          filterLogic.run(this.filterInfo);
          console.log('3');
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
        filterLogic.run(this.filterInfo);
        console.log('4');
      });
    });

    //Tags UI
    const tagButton = document.querySelectorAll('.tagButton');
    tagButton.forEach((button) => {
      button.addEventListener('click', () => {
        console.log(button.id);
        button.classList.toggle('-active');
        if (this.filterInfo.tagsAndType.includes(button.id)) {
          for (let i = 0; i < this.filterInfo.tagsAndType.length; i++) {
            if (this.filterInfo.tagsAndType[i] === button.id) {
              this.filterInfo.tagsAndType.splice(i, 1);
              console.log(this.filterInfo.tagsAndType);
            }
          }
        } else {
          //   button.classList.add('-active');
          this.filterInfo.tagsAndType.push(button.id);
          console.log(this.filterInfo.tagsAndType);
        }
        filterLogic.run(this.filterInfo);
      });
    });

    // Type UI
    const typeBox = document.querySelectorAll('.checkBoxContainer input');
    typeBox.forEach((box) => {
        box.addEventListener('click', () => {
          if (this.filterInfo.tagsAndType.includes(box.id)) {
            for (let i = 0; i < this.filterInfo.tagsAndType.length; i++) {
              if (this.filterInfo.tagsAndType[i] === box.id) {
                this.filterInfo.tagsAndType.splice(i, 1);
                console.log(this.filterInfo.tagsAndType);
              }
            }
          } else {
            this.filterInfo.tagsAndType.push(box.id);
            console.log(this.filterInfo.tagsAndType);
          }
          filterLogic.run(this.filterInfo);
        });
      });


  } // End of render method
} // End of FilterUI
