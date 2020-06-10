class StatTableItem extends HTMLElement {
    constructor() {
        super();
    }

    set data(data) {
        this._data = data;
        this.render();
    }

    render() {
        this.innerHTML = `
			<tr>
				${this._data.map((item) => `<td>${item}</td>`).join('')}
			</tr>
		`;
    }
}

customElements.define('stat-table-item', StatTableItem);
