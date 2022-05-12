class Keyboard {
  keys = {};

  constructor() {
    const lettersElements = [
      ...document.querySelector('div.input-ligne:nth-child(1)').children,
      ...document.querySelector('div.input-ligne:nth-child(2)').children,
      ...document.querySelector('div.input-ligne:nth-child(3)').children,
    ];
    lettersElements.forEach((element) => {
      const lettre = element.getAttribute('data-lettre');
      if (!lettre) return;
      this.keys[lettre] = element;
    });
  }

  async enterWord(word) {
    const letters = Array.from(word).slice(1);
    for (const letter of letters) {
      this.pressLetter(letter);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.pressEnter();
  }

  pressLetter(letter) {
    this.keys[letter].click();
  }

  pressEnter() {
    this.keys['_entree'].click();
  }
}
