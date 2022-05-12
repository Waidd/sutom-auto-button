export type LineResult = Array<{
  letter: string;
  state: 'ok' | 'not-here' | 'ko';
}>;

export class Grid {
  public size: number;
  public firstLetter: string;

  public get lines(): Element[] {
    return Array.from(document.querySelector('#grille > table:nth-child(1)').children);
  }

  public constructor() {
    this.size = this.lines[0].children.length;
    this.firstLetter = this.lines[0].children[0].innerHTML;
  }

  public getCurrentLine(): number {
    return this.lines.filter((line) => line.children[0].classList.contains('resultat')).length;
  }

  public getLineResult(index: number): LineResult | undefined {
    return Array.from(this.lines[index].children).map((letterElement) => ({
      letter: letterElement.innerHTML,
      state: this.getLetterState(letterElement),
    }));
  }

  private getLetterState(letterElement: Element): 'ok' | 'not-here' | 'ko' {
    if (letterElement.classList.contains('bien-place')) return 'ok';
    if (letterElement.classList.contains('mal-place')) return 'not-here';
    return 'ko';
  }
}
