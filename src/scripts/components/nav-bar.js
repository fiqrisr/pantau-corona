class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    set brandLogo(logo) {
        this._brandLogo = logo;
    }

    set brandLogoAlt(alt) {
        this._brandLogoAlt = alt;
    }

    set sideBarItems(items) {
        this._sideBarItems = items;
    }

    render() {
        this.innerHTML = `
			<nav class="e-nav white align-start fixed px-3">
              <label for="e-sidenav" class="e-btn small circle inverted mr-3"><i class="fas fa-bars"></i></label>
              <img src="${this._brandLogo}" alt="${this._brandLogoAlt}" style="width:175px;height:auto;">
            </nav>
		`;
    }
}

customElements.define('nav-bar', NavBar);
