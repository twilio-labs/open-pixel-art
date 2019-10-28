// Wait until the window has loaded to add the event handler
window.onload = () => {
  // Add a mouse move event handler to the canvas
  document.getElementById('search-input').oninput = debounce(pixelSearch, 100);
};

/**
 * Print the contributor of a pixel on the canvas
 * @param  {Event} evt ChangeEvent from onchange event
 */
function pixelSearch(event) {
  event.stopPropagation(); // Keep input change events from bubbling to button handlers
  const searchField = event.target; // Get the search field
  const searchContainer = searchField.parentNode;
  const searchInput = searchField.value;

  const matchingNodes = findPixelNodes(searchInput);

  displayMatchedPixels(matchingNodes, searchContainer);
}

/**
 * Find mathing pixel nodes on the canvas
 * @param  {Node[]} nodes Nodes to display
 * @param  {Node} container Node to receive new elements
 */
function displayMatchedPixels(nodes, container) {
  const list = document.querySelector('ul#search-results');

  let child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }

  nodes.forEach(node => {
    const name = node.getAttribute('name'); // Check if attribute name is in node
    const x = node.getAttribute('data-pixel-x'); // Check if attribute data-pixel-x is in node
    const y = node.getAttribute('data-pixel-y'); // Check if attribute data-pixel-y is in node

    const text = `[${y},${x}] <span class="nes-text is-primary">@${name}</span>`;
    const entry = document.createElement('li');
    entry.innerHTML = text;
    list.appendChild(entry);
  });

  container.appendChild(list);
}
/**
 * Find mathing pixel nodes on the canvas
 * @param  {String} input String value from search input
 */
function findPixelNodes(input) {
  const query = input.replace(/ /g, '');

  return document.querySelectorAll(
    `.pixel[name^="${query}"],
    .pixel[data-pixel-x^="${query}"],
    .pixel[data-pixel-y^="${query}"]`
  );
}

/**
 * Enforce a time delay before executing a function more than once
 * @param  {Function} func Function to execute
 * @param  {Number} delay Number of milliseconds to delay function calls
 */
const debounce = (func, delay) => {
  let debounceActive;
  return function() {
    const context = this;
    const args = arguments;

    clearTimeout(debounceActive);
    debounceActive = setTimeout(() => func.apply(context, args), delay);
  };
};
