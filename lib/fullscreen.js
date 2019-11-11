class Screen {
	static full(e) {
		if (!(e && e.nodeType === Element.ELEMENT_NODE)) {
			e = document.body
		}
		if (!document.fullscreen) {
			e.requestFullscreen()
		}
	}

	static exit() {
		if(document.fullscreen) {
			document.exitFullscreen()
		}
	}
}