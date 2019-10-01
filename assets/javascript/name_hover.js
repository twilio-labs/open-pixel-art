// Wait until the window has loaded to add the event handler
window.onload = () => {
	// Add a mouse move event handler to the canvas
	document.getElementById("canvas").onmousemove = pixel_hover;
};

function pixel_hover(evt) {
	// Get the element under the mouse (or tap)
	moused_over_el = document.elementFromPoint(evt.clientX, evt.clientY);

	// Check if the moused over element is a RECT
	if (moused_over_el.nodeName == "rect") {
		// If it is a rect then get the "name" attribute
		rect_name = moused_over_el.getAttribute("name");
		// Check if there is a name associated with that block then set
		// the contributer name span to the name
		if (rect_name != null) {
			document.getElementById("contributer-name").textContent = rect_name;
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