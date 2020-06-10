import brandLogo from '../images/logo.png';
import { getSummaryStatistics, getProvinsiStatistics } from './data/api';

import './components/card-figure.js';
import './components/stat-table.js';

import './data/api.js';

const statTableHeaderIndonesia = ['Provinsi', 'Positif', 'Sembuh', 'Meninggal'];
let statTableData = [];

const elements = {
    container: document.querySelector('.e-container'),
    spinnerOverlay: document.querySelector('.spinner-overlay'),
    summaryCol: document.querySelectorAll('.figure-col'),
    tableContainer: document.querySelector('.statistics'),
};

function renderLoader(parent) {
    const loader = `
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
    `;
    parent.insertAdjacentHTML('beforeend', loader);
}

function clearLoader() {
    const loader = elements.spinnerOverlay;
    if (loader) loader.parentElement.removeChild(loader);
}

function createNavbar() {
    try {
        const navbar = document.createElement('nav-bar');
        const sideNav = document.createElement('side-nav');

        navbar.brandLogo = brandLogo;
        navbar.brandLogoAlt = 'Track Covid-19';

        sideNav.brandLogo = brandLogo;
        sideNav.brandLogoAlt = 'Track Covid-19';
        sideNav.itemList = {
            'Statistik Covid-19': ['Indonesia', 'Dunia'],
        };

        elements.container.insertAdjacentElement('beforebegin', navbar);
        navbar.appendChild(sideNav);
    } catch (e) {
        alert('Terjadi kesalahan saat merender navbar');
    }
}

function createSummaryStatisticsFigure(response) {
    const dirawatCard = document.createElement('card-figure');
    const positifCard = document.createElement('card-figure');
    const sembuhCard = document.createElement('card-figure');
    const meninggalCard = document.createElement('card-figure');

    try {
        positifCard.title = response.positif;
        positifCard.text = 'Positif';
        positifCard.color = 'primary';

        dirawatCard.title = response.dirawat;
        dirawatCard.text = 'Dirawat';
        dirawatCard.color = 'warning';

        sembuhCard.title = response.sembuh;
        sembuhCard.text = 'Sembuh';
        sembuhCard.color = 'success';

        meninggalCard.title = response.meninggal;
        meninggalCard.text = 'Meninggal';
        meninggalCard.color = 'danger';

        elements.summaryCol[0].appendChild(positifCard);
        elements.summaryCol[1].appendChild(dirawatCard);
        elements.summaryCol[2].appendChild(sembuhCard);
        elements.summaryCol[3].appendChild(meninggalCard);
    } catch (e) {
        alert('Terjadi kesalahan saat merender statistik');
    }
}

function createProvinsiStatistics() {
    try {
    } catch (e) {
        alert('Terjadi kesalahan saat merender statistik provinsi');
    }
}

// MAIN APPLICATION ENTRY

async function main() {
    renderLoader(elements.spinnerOverlay);

    try {
        createNavbar();

        const statIndonesia = await getSummaryStatistics();
        const statProvinsi = await getProvinsiStatistics();

        createSummaryStatisticsFigure(statIndonesia);

        clearLoader();
    } catch (e) {
        alert('Silahkan refresh ulang halaman');
    }
}

export default main;
