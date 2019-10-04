function getContrast50(hexcolor) {
  // return true if contrast greated than 50
  return !(parseInt(hexcolor, 16) > 0xffffff / 2);
}

var hexRegEx = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Wait until the window has loaded to add the event handler
window.onload = () => {
  // Add a mouse move event handler to the canvas
  document.getElementById('canvas').onmousemove = pixelHover;
};

/**
 * Print the contributer of a pixel on the canvas
 * @param  {Event} evt MouseEvent from onmousemove event
 */
function pixelHover(evt) {
  // Get the element under the mouse (or tap)
  mousedOverEl = document.elementFromPoint(evt.clientX, evt.clientY);

  // Check if the moused over element is a RECT
  if (mousedOverEl.nodeName == 'rect') {
    // If it is a rect then get the "name" attribute
    rectName = mousedOverEl.getAttribute('name');
    rectColor = hexRegEx.exec(mousedOverEl.getAttribute('style'))[1];
    contrastGreaterThan50 = getContrast50(rectColor);
    // Check if there is a name associated with that block then set
    // the contributer name span to the name
    // Contrast permitting set the name color to match that of the pixel
    if (rectName != null) {
      document.getElementById('contributer-name').textContent = rectName;
      document.getElementById(
        'contributer-name'
      ).style.cssText = contrastGreaterThan50 ? 'color: #' + rectColor : '';
    } else {
      // If there is no associated name then set the text to nothing
      document.getElementById('contributer-name').textContent = '';
      document.getElementById('contributer-name').style.cssText = '';
    }
  } else {
    // If the element is not a rect set the text to nothing
    document.getElementById('contributer-name').textContent = '';
    document.getElementById('contributer-name').style.cssText = '';
  }
}
