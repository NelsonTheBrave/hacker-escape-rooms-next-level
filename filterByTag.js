export class Filter {
  constructor(tagSelector) {
    this.tagSelector = document.querySelectorAll(tagSelector); // What tag to filter
    this.activeTags = []; //Array to store active tags
  }

  /*  Filter method to display the selected tags and hide the other tags.
        This will also reset the filter and display all challenges when none is selected */
  filterTags() {
    const cards = document.querySelectorAll('.challenges-container__challenge');

    if (this.activeTags.length === 0) {
      cards.forEach((card) => {
        card.style.display = '';
      });
    } else {
      cards.forEach((card) => {
        if (this.activeTags.every((tag) => card.classList.contains(tag))) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }
  }

  // Method to Toggle the chosen tag as active
  toggleTag(tag) {
    const index = this.activeTags.indexOf(tag);
    if (index === -1) {
      this.activeTags.push(tag);
    } else {
      this.activeTags.splice(index, 1);
    }
  }

  hasActiveTags(challenge) {
    const challengeTags = Array.from(challenge.classList);
    return this.activeTags.some((tag) => challengeTags.includes(tag));
  }
}

// class for eventlistener and handlers for the tag buttons
export class FilterButton {
  constructor(buttonId, filterInstance, tag) {
    this.button = document.getElementById(buttonId);
    this.filterInstance = filterInstance;
    this.tag = tag;

    this.button.addEventListener('click', this.handleButtonClick.bind(this));
  }

  handleButtonClick() {
    this.filterInstance.toggleTag(this.tag);
    this.filterInstance.filterTags();

    //Add class -active to the active tag button
    if (this.filterInstance.activeTags.includes(this.tag)) {
      this.button.classList.add('-active');
    } else {
      this.button.classList.remove('-active');
    }
  }
}
