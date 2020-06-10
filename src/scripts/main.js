import brandLogo from '../images/logo.png';
import { getSummaryStatistics, getProvinsiStatistics } from './data/api';

import './components/card-figure.js';
import './components/stat-table.js';

const elements = {
    container: document.querySelector('.e-container'),
    spinnerOverlay: document.querySelector('.spinner-overlay'),
    summaryCol: document.querySelectorAll('.figure-col'),
    tableContainer: document.querySelector('.statistic-provinsi'),
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

function createSummaryStatisticsFigure(data) {
    const dirawatCard = document.createElement('card-figure');
    const positifCard = document.createElement('card-figure');
    const sembuhCard = document.createElement('card-figure');
    const meninggalCard = document.createElement('card-figure');

    try {
        positifCard.title = data.positif;
        positifCard.text = 'Positif';
        positifCard.color = 'primary';

        dirawatCard.title = data.dirawat;
        dirawatCard.text = 'Dirawat';
        dirawatCard.color = 'warning';

        sembuhCard.title = data.sembuh;
        sembuhCard.text = 'Sembuh';
        sembuhCard.color = 'success';

        meninggalCard.title = data.meninggal;
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

function createProvinsiStatisticsData(data) {
    try {
        const tableItem = document.createElement('stat-table-item');
        tableItem.data = data;
        return tableItem;
    } catch (e) {
        alert('Terjadi kesalahan saat merender statistik per provinsi');
    }
}

function createProvinsiStatisticsTable(tableHeader, tableData) {
    try {
        const tableStat = document.createElement('stat-table');
        tableStat.tableHeader = tableHeader;
        elements.tableContainer.appendChild(tableStat);

        const tableDataContainer = tableStat.querySelector('#stat-table-data');

        tableData.forEach((data) => {
            data = data['attributes'];
            const provinsi = data['Provinsi'];
            const kasusPositif = data['Kasus_Posi'];
            const kasusSembuh = data['Kasus_Semb'];
            const kasusMeninggal = data['Kasus_Meni'];

            const tableItem = `
                <td>${provinsi}</td>
                <td class="text-center text-primary">${kasusPositif}</td>
                <td class="text-center text-success">${kasusSembuh}</td>
                <td class="text-center text-danger">${kasusMeninggal}</td>
            `;

            tableDataContainer.insertAdjacentHTML('beforeend', `<tr>${tableItem}</tr>`);
        });
    } catch (e) {
        alert('Terjadi kesalahan saat merender statistik provinsi');
    }
}

// MAIN APPLICATION ENTRY

async function main() {
    renderLoader(elements.spinnerOverlay);

    try {
        const statTableHeaderIndonesia = ['Provinsi', 'Positif', 'Sembuh', 'Meninggal'];
        /*let statTableData = [
            ['12', '13', '23', '42'],
            ['13', '14', '50', '100'],
        ];*/

        createNavbar();

        const statIndonesia = await getSummaryStatistics();

        const statTableData = await getProvinsiStatistics();
        console.log(statTableData);

        createSummaryStatisticsFigure(statIndonesia);
        createProvinsiStatisticsTable(statTableHeaderIndonesia, statTableData);

        clearLoader();
    } catch (e) {
        alert('Silahkan refresh ulang halaman');
    }
}

export default main;
