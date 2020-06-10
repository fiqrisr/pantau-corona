class StatTableItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    set data(data) {
        this._data = data;
    }

    render() {
        this.innerHTML = `
			${this._data.map((item) => `<td>${item}</td>`).join('')}
		`;
    }
}

customElements.define('stat-table-item', StatTableItem);
