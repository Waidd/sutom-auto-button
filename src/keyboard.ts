export class Keyboard {
  private keys: Record<string, HTMLElement> = {};

  public constructor() {
    const lettersElements = [
      ...Array.from(document.querySelector('div.input-ligne:nth-child(1)').children),
      ...Array.from(document.querySelector('div.input-ligne:nth-child(2)').children),
      ...Array.from(document.querySelector('div.input-ligne:nth-child(3)').children),
    ];
    lettersElements.forEach((element) => {
      const lettre = element.getAttribute('data-lettre');
      if (!lettre) return;
      this.keys[lettre] = element as HTMLElement;
    });
  }

  public async enterWord(word: string): Promise<void> {
    const letters = Array.from(word).slice(1);
    for (const letter of letters) {
      this.pressLetter(letter);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.pressEnter();
  }

  private pressLetter(letter: string): void {
    this.keys[letter].click();
  }

  private pressEnter(): void {
    this.keys['_entree'].click();
  }
}
