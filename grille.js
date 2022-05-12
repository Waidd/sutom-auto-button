class Grille {
  constructor() {
    this.grille = document.querySelector('#grille > table:nth-child(1)');
    this.size = this.grille.children[0].children.length;
    this.firstLetter = this.grille.children[0].children[0].innerText;
  }
}
