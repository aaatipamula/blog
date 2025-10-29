export function wrapPreCopy(pre: HTMLPreElement) {
  // Create a new div element to wrap everything in
  const div = document.createElement("div");
  div.className = "pre-wrapper";

  // Create the button
  const button = document.createElement("button");
  button.className = "copy-btn bi bi-clipboard";

  // Add elements to div
  div.appendChild(button);
  pre.insertAdjacentElement("beforebegin", div);
  div.appendChild(pre);

  // Copy handler
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.textContent);
      button.className = "copy-btn bi bi-clipboard-check-fill";
      setTimeout(() => button.className = "copy-btn bi bi-clipboard", 1500);
    } catch (err) {
      button.textContent = "copy-btn bi bi-clipboard-x";
    }
  });
}

