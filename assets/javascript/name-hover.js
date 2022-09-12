// Wait until the window has loaded to add the event handler
window.onload = () => {
  // Add a mouse move event handler to the canvas
  document.getElementById('canvas').onmousemove = pixelHover;
  // Add a mouse out event handler to the canvas
  document.getElementById('canvas').onmouseout = removeTooltip;
};

// To save name that currently in the tooltip
let currentName;

/**
 * Print the contributor of a pixel on the canvas
 * @param  {Event} evt MouseEvent from onmousemove event
 */
function pixelHover(event) {
  const node = event.target; // Get Node element of current target
  const fill = node.style.fill || node.getAttribute('color'); // Get fill style of node
  const name = node.getAttribute('name'); // Check if attribute name is in node
  const x = node.getAttribute('data-pixel-x'); // Check if attribute data-pixel-x is in node
  const y = node.getAttribute('data-pixel-y'); // Check if attribute data-pixel-y is in node

  // Calculate top position and put in variable
  const topPos = event.clientY - 3 + window.scrollY;

  let tooltip = document.getElementsByClassName('tooltip-name')[0];
  let contributorName = document.getElementById('contributor-name');

  // If node is a rect element and has name attribute in it and the tooltip didn't exist yet
  // prettier-ignore
  if ((node.nodeName === 'rect' || node.nodeName === 'image') && name && !tooltip) {
    currentName = name.replace(/ /g, '');
    currentX = x.replace(/ /g, '');
    currentY = y.replace(/ /g, '');
    const textName = document.createTextNode(`[${currentY},${currentX}] @${currentName}`);
    tooltip = document.createElement('div');
    // Check if color fill is a light color
    const isLightColor = getContrastYIQ(fill);

    tooltip.className = 'tooltip-name';
    contributorName.innerText = `${currentName}`;
    // Same style so save in one variable
    const contrastStyle = {
      color: fill,
      borderColor: fill,
      background: isLightColor ? '#000000' : ''
    };
    styleElem(tooltip, contrastStyle);
    styleElem(contributorName, contrastStyle);

    tooltip.appendChild(textName);
    document.body.appendChild(tooltip);
    // Get bounding client rect of tooltip
    const { width } = tooltip.getBoundingClientRect();

    // If tooltip touching the left side of screen
    if (event.clientX - width < 0) {
      // flip to right
      tooltip.style.transform = `translateX(0) translateY(-100%)`;
      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${topPos}px`;
    } else {
      // flip to left
      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${topPos}px`;
    }
  } else if (tooltip && name && name.replace(/ /g, '') !== currentName) {
    // Change only the text name if tooltip is existing and hover on different pixel
    tooltip.innerText = name;
  } else if (tooltip) {
    // Change position if tooltip exist and no other things change
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${topPos}px`;
  }
}

/**
 * Remove tooltip from body
 * @param  {Event} event MouseEvent from mouseout event
 */
function removeTooltip(event) {
  // Search for tooltip element
  const tooltip = document.getElementsByClassName('tooltip-name')[0];
  // If exist remove it
  tooltip && tooltip.remove();

  // Gets contributor name on the contributor box
  let contributorName = document.getElementById('contributor-name');
  // Replace username with initial state
  contributorName.innerText = 'no pixel hovered';
  contributorName.style = {
    ...contributorName.style,
    color: '#f00',
    'background-color': '#000'
  };
}

/**
 * Style element with a given style object
 * @param  {Node} elem DOM element to be styled
 * @param  {Object} style Style object to put in element
 */
function styleElem(elem, style = {}) {
  Object.assign(elem.style, style);
}

/**
 * Check color contrast with YIQ
 * @param  {String} rgb String of rgb color
 */
function getContrastYIQ(rgb) {
  let r, g, b;
  if (rgb.startsWith('#')) {
    const hex = rgb.slice(1);
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    // Split rgb string into an array by ', '
    const rgbS = rgb.substring(4, rgb.length - 1).split(', ');
    [r, g, b] = rgbS;
  }
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? true : false;
}
