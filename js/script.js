const countries = document.getElementById('countries-list');
const modal = document.querySelector('.modal');
let countryList;

const API_ALL = 'https://restcountries.com/v3/all';

const getData = async () => {
    try {
        const response = await fetch(API_ALL);
        if(!response.ok) {
            const errMessage = 'No countries found!!'
            throw new Error(errMessage);
        }
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err)
    }
};

// const getImage = async () => {
//     try {
//         const response = await fetch(API_ALL);
//         if(!response.ok) {
//             const errMessage = 'No flags found!!'
//             throw new Error(errMessage);
//         }
//         const data = await response.json();
//         let images = data.map(item => {
//             let image = item.flags[0]
//             let country = item.name.common
//             let response = `${country}: ${image}`
//             return response
//         })
//         return images
//     } catch(err) {
//         console.log(err)
//     }
// };

const renderData = async () => {
    const dataList = await getData();
    countryList = dataList.sort((a, b) => {
        let name1 = a.name.common
        let name2 = b.name.common
        return name1.localeCompare(name2)
    });
    countryList.forEach(country => {
        let countryName = country.name.common
        let countryID = countryName.replaceAll(' ', '.')
        let countryImage = `<img class='image' src=${country.flags[0]} alt=${countryName} />`
        let html = `
        <div id=${countryID} class='card'>
            ${countryImage}
            <p class='title'>${countryName}</p>
        </div>
        `
        countries.innerHTML += html
        showModal();
    })
};


    const showModal = async() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                let name = (card.id).replaceAll('.', ' ');
                let modalCountries = countryList.filter(country => country.name.common == name)
                let modalCountry = modalCountries[0]
                modal.style.display = 'flex'
                modal.innerHTML = `
                    <div class='modalInfo'>
                    <img class='modalImage' src=${modalCountry.flags[0]} alt=${name} />
                        <div class='modalText'>
                            <h1>${name}</h1>
                            <p>Capital: ${modalCountry.capital}</p>
                            <p>Población: ${modalCountry.population}</p>
                            <p>Conducción: ${modalCountry.car.side}</p>
                        </div>
                    </div>
                    <button id="closeBtn">Cerrar</button>
                `
                const cerrar = document.getElementById('closeBtn');
                cerrar.onclick = () => {
                    modal.style.display = 'none'
                }
            })
        })
    };

    renderData();