class CardFigure extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    set title(title) {
        this._title = title;
    }

    set text(text) {
        this._text = text;
    }

    set color(color) {
        this._color = color;
    }

    render() {
        this.innerHTML = `
			<div class="e-card e-x shadow-4 ${this._color}">
				<div class="card-body">
					<h3 class="card-title text-bold">${this._title}</h3>
					<p class="card-text">${this._text}</p>
				</div>
			</div>
		`;
    }
}

customElements.define('card-figure', CardFigure);
