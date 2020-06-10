import axios from 'axios';

export async function getSummaryStatistics() {
    try {
        const result = await axios(
            'https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/indonesia',
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
        return result.data[0];
    } catch (e) {
        alert('Terjadi kesalahan saat menerima data dari server');
    }
}

export async function getProvinsiStatistics() {
    try {
        const result = await axios(
            'https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/indonesia/provinsi',
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
        return result.data;
    } catch (e) {
        alert('Terjadi kesalahan saat menerima data provinsi dari server');
    }
}
