class SideNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    set brandLogo(brand) {
        this._brandLogo = brand;
    }

    set brandLogoAlt(alt) {
        this._brandLogoAlt = alt;
    }

    set itemList(items) {
        this._itemList = items;
    }

    render() {
        this.innerHTML = `
			<input type="checkbox" id="e-sidenav">
            <div class="e-cap cap-sidenav">
            <div class="e-sidenav">
              <div class="sidenav-brand">
                <img src="${this._brandLogo}" alt="${this._brandLogoAlt}">
              </div>
            </div>
		`;

        for (let [section, link] of Object.entries(this._itemList)) {
            const sectionTitle = document.createElement('p');
            sectionTitle.classList.add('sidenav-label');
            sectionTitle.textContent = section;
            this.querySelector('.e-sidenav').appendChild(sectionTitle);

            if (link.length > 1) {
                link.forEach((item) => {
                    const sectionLink = document.createElement('a');
                    sectionLink.classList.add('sidenav-item');
                    sectionLink.textContent = item;
                    this.querySelector('.e-sidenav').appendChild(sectionLink);
                });
            }
        }

        this.querySelector('.e-sidenav').insertAdjacentHTML(
            'afterend',
            '<label for="e-sidenav" class="e-cap sidenav-hidden"></label>'
        );
    }
}

customElements.define('side-nav', SideNav);
