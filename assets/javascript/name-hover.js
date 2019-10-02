// Wait until the window has loaded to add the event handler
window.onload = () => {
	// Add a mouse move event handler to the canvas
	document.getElementById("canvas").onmousemove = pixelHover;
};

function pixelHover(evt) {
	// Get the element under the mouse (or tap)
	mousedOverEl = document.elementFromPoint(evt.clientX, evt.clientY);

	// Check if the moused over element is a RECT
	if (mousedOverEl.nodeName == "rect") {
		// If it is a rect then get the "name" attribute
		rectName = mousedOverEl.getAttribute("name");
		// Check if there is a name associated with that block then set
		// the contributer name span to the name
		if (rectName != null) {
			document.getElementById("contributer-name").textContent = rectName;
		}
		// If there is no associated name then set the text to nothing
		else {
			document.getElementById("contributer-name").textContent = "";
		}
	}
	// If the element is not a rect set the text to nothing
	else {
		document.getElementById("contributer-name").textContent = "";
	}


}