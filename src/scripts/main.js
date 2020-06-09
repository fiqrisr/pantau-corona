import brandLogo from '../images/logo.png';
import { getSummaryStatistics } from './data/api';

import './components/card-figure.js';

import './data/api.js';

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
    const loader = document.querySelector('.spinner');
    if (loader) loader.parentElement.removeChild(loader);
}

function main() {
    const container = document.querySelector('.e-container');
    const summaryCol = document.querySelectorAll('.figure-col');

    const navbar = document.createElement('nav-bar');
    const sideNav = document.createElement('side-nav');

    const dirawatCard = document.createElement('card-figure');
    const positifCard = document.createElement('card-figure');
    const sembuhCard = document.createElement('card-figure');
    const meninggalCard = document.createElement('card-figure');

    navbar.brandLogo = brandLogo;
    navbar.brandLogoAlt = 'Track Covid-19';

    sideNav.brandLogo = brandLogo;
    sideNav.brandLogoAlt = 'Track Covid-19';
    sideNav.itemList = {
        'Statistik Covid-19': ['Indonesia', 'Dunia'],
    };

    document.body.insertAdjacentElement('afterbegin', navbar);
    navbar.appendChild(sideNav);

    const renderSummaryStatistics = async () => {
        renderLoader(container);

        try {
            getSummaryStatistics().then((response) => {
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

                summaryCol[0].appendChild(positifCard);
                summaryCol[1].appendChild(dirawatCard);
                summaryCol[2].appendChild(sembuhCard);
                summaryCol[3].appendChild(meninggalCard);

                clearLoader();
            });
        } catch (e) {
            alert('Terjadi kesalahan saat merender statistik');
            clearLoader();
        }
    };

    document.addEventListener('DOMContentLoaded', renderSummaryStatistics);
}

export default main;
