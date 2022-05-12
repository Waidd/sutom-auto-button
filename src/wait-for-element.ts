/**
 * Wait for an HTML element to exist.
 * Code from https://stackoverflow.com/a/61511955
 */
export function waitForElement(selector: string): Promise<Element> {
  return new Promise(resolve => {
    const element = document.querySelector(selector);
    if (element) {
      return resolve(element);
    }
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
