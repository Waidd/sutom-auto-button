export class Grid {
  public size: number;
  public firstLetter: string;

  private grid: HTMLElement;

  public constructor() {
    this.grid = document.querySelector('#grille > table:nth-child(1)');
    this.size = this.grid.children[0].children.length;
    this.firstLetter = (this.grid.children[0].children[0] as HTMLElement).innerText;
  }
}
