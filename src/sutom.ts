import { Grid } from "./grid";
import { Keyboard } from "./keyboard";
import { waitForElement } from "./wait-for-element";
import { WordsManager } from "./words-manager";

console.log("nerfing sutom...");
class AutoButton {
  private keyboard: Keyboard;
  private grid: Grid;
  private wordsManager: WordsManager;
  private currentLine = 0;

  public constructor() {
    this.keyboard = new Keyboard();
    this.grid = new Grid();
    this.wordsManager = new WordsManager(this.grid.firstLetter, this.grid.size);
  }

  public async auto(): Promise<void> {
    try {
      const updatedCurrentLine = this.grid.getCurrentLine();
      if (updatedCurrentLine === 6) {
        console.log("nothing to do anymore");
        return;
      }
      for (let i = this.currentLine; i < updatedCurrentLine; i++) {
        const lineResult = this.grid.getLineResult(i);
        this.wordsManager.feed(lineResult);
      }
      this.wordsManager.filterAvailablesWords();
      const bestWord = this.wordsManager.findCandidate();
      this.currentLine = updatedCurrentLine;
      await this.keyboard.enterWord(bestWord);
    } catch (up) {
      console.error(up);
    }
  }
}

function addAutoButton(): void {
  const inputLine3 = document.querySelector("div.input-ligne:nth-child(3)");
  if (!inputLine3) throw new Error("Keyboard is not loaded");
  const autoButton = document.createElement("div");
  autoButton.classList.add("input-lettre");
  autoButton.innerText = "AUTO";
  const autoButtonHandler = new AutoButton();
  autoButton.onclick = () => autoButtonHandler.auto();
  inputLine3.removeChild(inputLine3.children[0]);
  inputLine3.appendChild(autoButton);
}

waitForElement("div.input-ligne:nth-child(3)").then(() => {
    try {
      addAutoButton();
    } catch (up) {
      console.error(up);
    }
});
