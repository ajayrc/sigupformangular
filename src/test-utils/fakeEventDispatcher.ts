export function dipatchFakeInputAndBlurEvent(element: HTMLInputElement) {
  element.dispatchEvent(new Event('input'));
  element.dispatchEvent(new Event('blur'));
}
