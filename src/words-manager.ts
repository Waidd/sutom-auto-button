import { LineResult } from "./grid";
import { ALL_WORDS } from "./words";

const VOWEL_REGEX = /^[aeiouy]$/i;
function isVowel(letter) {
  return VOWEL_REGEX.test(letter);
}

export class WordsManager {
  private availableWords: string[];

  private nbrOfLetters: Record<string, { min: number; max: number | null; }> = {};
  private word: Array<{ letter: string | null; notHere: Set<string> }>;

  constructor(firstLetter: string, size: number) {
    this.availableWords = ALL_WORDS.filter((word) => word.length === size && word[0] === firstLetter);
    this.nbrOfLetters[firstLetter] = { min: 1, max: null };
    this.word = [{ letter: firstLetter, notHere: new Set() }, ...Array(size - 1).fill(null).map(() => ({ letter: null, notHere: new Set<string>() }))];
  }

  public feed(lineResult: LineResult): void {
    // at some point count letters
    const currentNbrOfLetters: Record<string, { min: number; max: number | null; }> = {};

    lineResult.forEach((element, index) => {
      if (element.state !== "ko") {
        if (currentNbrOfLetters[element.letter]) {
          currentNbrOfLetters[element.letter].min++;
        } else {
          currentNbrOfLetters[element.letter] = { min: 1, max: null };
        }
      }

      if (this.word[index].letter) return;
      if (element.state === 'ok') {
        this.word[index].letter = element.letter;
        return
      }
      this.word[index].notHere.add(element.letter);
    });

    lineResult.forEach((element) => {
      if (element.state !== 'ko') return;
      if (currentNbrOfLetters[element.letter]) {
        currentNbrOfLetters[element.letter].max = currentNbrOfLetters[element.letter].min;
      } else {
        currentNbrOfLetters[element.letter] = { min: 0, max: 0 };
      }
    });

    Object.entries(currentNbrOfLetters).forEach(([letter, nbr]) => {
      if (!this.nbrOfLetters[letter]) {
        this.nbrOfLetters[letter] = nbr;
        return;
      }
      if (nbr.min > this.nbrOfLetters[letter].min) {
        this.nbrOfLetters[letter].min = nbr.min;
      }
      if (nbr.max) {
        this.nbrOfLetters[letter].max = nbr.max;
      }
    });
  }

  public filterAvailablesWords(): void {
    this.availableWords = this.availableWords.filter((word) => {
      if (!Array.from(word).every((letter, index) => {
        if (this.word[index].letter && this.word[index].letter !== letter) return false;
        if (this.word[index].notHere.has(letter)) return false;
        return true
      })) return false;

      const wordLetters = Array.from(word);
      return Object.entries(this.nbrOfLetters).every(([letter, { min, max }]) => {
        const nbr = wordLetters.filter((each) => each === letter).length;
        if (nbr < min) return false;
        if (max !== null && nbr > max) return false;
        return true;
      })
    });
    console.log('available words', this.availableWords);
  }

  public findCandidate(): string {
    let maxDifferentVowels = 0;
    let maxDifferentConsonants = 0;
    let bestWord = '';
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
