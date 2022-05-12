import { Grid } from "./grid";
import { Keyboard } from "./keyboard";
import { ALL_WORDS } from "./mots";
import { waitForElement } from "./waitForElement";

console.log('hello sutom');

const VOWEL_REGEX = /^[aeiouy]$/i;
function isVowel(letter) {
  return VOWEL_REGEX.test(letter);
}

class WordsManager {
  private availableWords: string[];

  constructor(firstLetter: string, size: number) {
    this.availableWords = ALL_WORDS.filter((word) => word.length === size && word[0].toUpperCase() === firstLetter);
  }

  public findCandidate(): string {
    let maxDifferentVowels = 0;
    let maxDifferentConsonants = 0;
    let bestWord = '';
    console.log(this.availableWords.length);
    for (const word of this.availableWords) {
      const vowels = Array.from(word).filter((letter) => isVowel(letter));
      const differentVowels = [...new Set(vowels)].length;
      if (differentVowels < maxDifferentVowels) continue;
      const consonants = Array.from(word).filter((letter) => !isVowel(letter));
      const differentConsonants = [...new Set(consonants)].length;
      if (differentVowels <= maxDifferentVowels && differentConsonants < maxDifferentConsonants) continue;
      bestWord = word;
      maxDifferentVowels = differentVowels;
      maxDifferentConsonants = differentConsonants;
    }
    return bestWord;
  }
}

async function auto(): Promise<void> {
  try {
    const keyboard = new Keyboard();
    const grid = new Grid();
    const wordsManager = new WordsManager(grid.firstLetter, grid.size);
    const bestWord = wordsManager.findCandidate();
    console.log('best world', bestWord);
    await keyboard.enterWord(bestWord);
  } catch (up) {
    console.error(up);
  }
}

function addAutoButton(): void {
  const inputLine3 = document.querySelector('div.input-ligne:nth-child(3)');
  const autoButton = document.createElement('div');
  autoButton.classList.add('input-lettre')
  autoButton.innerText = 'AUTO';
  autoButton.onclick = auto;
  inputLine3.removeChild(inputLine3.children[0]);
  inputLine3.appendChild(autoButton);
}

waitForElement('div.input-ligne:nth-child(3)').then(() => {
    try {
      addAutoButton();
    } catch (up) {
      console.error(up);
    }
});
