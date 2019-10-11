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
 * Print the contributer of a pixel on the canvas
 * @param  {Event} evt MouseEvent from onmousemove event
 */
function pixelHover(event) {
  const node = event.target; // Get Node element of current target
  const fill = node.style.fill; // Get fill style of node
  const name = node.getAttribute('name'); // Check if attribute name is in node

  // Calculate top position and put in variable
  const topPos = event.clientY - 3 + window.scrollY;

  let tooltip = document.getElementsByClassName('tooltip-name')[0];
  let contributorName = document.getElementById('contributor-name');

  // If node is a rect element and has name attribute in it and the tooltip didn't exist yet
  if (node.nodeName === 'rect' && name && !tooltip) {
    currentName = name.replace(/ /g, '');
    const textName = document.createTextNode(`@${currentName}`);
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
  // Split rgb string into an array by ', '
  const rgbS = rgb.substring(4, rgb.length - 1).split(', ');
  const r = rgbS[0],
    g = rgbS[1],
    b = rgbS[2];
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? true : false;
}
