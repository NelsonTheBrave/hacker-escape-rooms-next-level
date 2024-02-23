import { TopThreeView } from './challenges.js';
import { MobileMenu } from './mobile-menu.js';

const topThreeContainer = document.querySelector(
  '.challenges-container.main-page'
);

new TopThreeView().render(topThreeContainer);
new MobileMenu();
