export enum LineResultState {
  ["🟥"] = "🟥",
  ["🟦"] = "🟦",
  ["🟡"] = "🟡",
}

export type LineResult = Array<{
  letter: string;
  state: LineResultState;
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

  private getLetterState(letterElement: Element): LineResultState {
    if (letterElement.classList.contains('bien-place')) return LineResultState["🟥"];
    if (letterElement.classList.contains('mal-place')) return LineResultState["🟡"];
    return LineResultState["🟦"];
  }
}
