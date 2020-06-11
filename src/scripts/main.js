import brandLogo from '../images/logo.png';
import { getSummaryStatistics, getProvinsiStatistics } from './data/api';

import './components/card-figure.js';
import './components/stat-table.js';

const basicElements = {
    header: document.querySelector('header'),
    container: document.querySelector('.e-container'),
    spinnerOverlay: document.querySelector('.spinner-overlay'),
    summaryCol: document.querySelectorAll('.figure-col'),
    tableContainer: document.querySelector('.statistic-provinsi'),
};

const addIconToFigure = (parent, iconName) => {
    const icon = document.createElement('p');
    icon.innerHTML = `<i class="fas fa-${iconName}"></i>`;
    icon.classList.add('figure-icon');
    parent.appendChild(icon);
};

const renderLoader = () => {
    document.querySelector('.spinner-overlay').style.display = 'block';
};

const clearLoader = () => {
    document.querySelector('.spinner-overlay').style.display = 'none';
};

const createNavbar = () => {
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

        basicElements.header.insertAdjacentElement('afterbegin', navbar);
        navbar.appendChild(sideNav);
    } catch (e) {
        alert('Terjadi kesalahan saat merender navbar');
    }
};

const createSummaryStatisticsFigure = (data) => {
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

        basicElements.summaryCol[0].appendChild(positifCard);
        basicElements.summaryCol[1].appendChild(dirawatCard);
        basicElements.summaryCol[2].appendChild(sembuhCard);
        basicElements.summaryCol[3].appendChild(meninggalCard);

        addIconToFigure(positifCard.querySelector('.card-body'), 'lungs-virus');
        addIconToFigure(dirawatCard.querySelector('.card-body'), 'hand-holding-medical');
        addIconToFigure(sembuhCard.querySelector('.card-body'), 'smile-beam');
        addIconToFigure(meninggalCard.querySelector('.card-body'), 'dizzy');
    } catch (e) {
        alert('Terjadi kesalahan saat merender statistik');
    }
};

const createProvinsiStatisticsTable = (tableHeader, tableData) => {
    try {
        const tableStat = document.createElement('stat-table');
        tableStat.tableHeader = tableHeader;
        basicElements.tableContainer.appendChild(tableStat);

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
};

// MAIN APPLICATION ENTRY

const main = async () => {
    renderLoader(basicElements.spinnerOverlay);

    try {
        const statTableHeaderIndonesia = ['Provinsi', 'Positif', 'Sembuh', 'Meninggal'];

        createNavbar();

        const statIndonesia = await getSummaryStatistics();
        const statTableData = await getProvinsiStatistics();

        createSummaryStatisticsFigure(statIndonesia);
        createProvinsiStatisticsTable(statTableHeaderIndonesia, statTableData);

        clearLoader();
    } catch (e) {
        alert('Halaman gagal dimuat. Silahkan refresh ulang halaman');
    }
};

export default main;
