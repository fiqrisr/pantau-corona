import './stat-table-item.js';

class StatTable extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    set tableHeader(headers) {
        this._tableHeader = headers;
    }

    render() {
        this.innerHTML = `
			<table class="e-table">
				<thead>
					${this._tableHeader.map((header) => `<th class="text-center">${header}</th>`).join('')}
				</thead>
				<tbody id="stat-table-data">
				</tbody>
			</table>
		`;
    }
}

customElements.define('stat-table', StatTable);
