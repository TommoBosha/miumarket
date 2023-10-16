import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function NovaPoshta() {
    const apiKey = '1f4156810d037ab33030a8a23e134751';
    const baseURL = 'https://api.novaposhta.ua/v2.0/json/';

    const [cityName, setCityName] = useState('');
    const [cities, setCities] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedCity] = useState(null);



    async function searchCityHandler() {
        try {
            const response = await axios.get(`${baseURL}common/city/find`, {
                apiKey: apiKey,
                modelName: 'Address',
                calledMethod: 'searchSettlements',
                methodProperties: {
                    CityName: cityName,
                    Limit: 10,
                },
            });
            console.log(response.data.data)
            setCities(response.data.data);
        } catch (error) {
            console.error('Помилка під час пошуку города:', error);
        }
    }


    useEffect(() => {
        if (selectedCity) {
            getBranchesHandler(selectedCity.value);
        }
        searchCityHandler();
    }, [selectedCity]);

    async function getBranchesHandler(cityRef) {
        try {
            const response = await axios.post(`${baseURL}counterparty/getWarehouses`, {
                apiKey: apiKey,
                modelName: 'AddressGeneral',
                calledMethod: 'getWarehouses',
                methodProperties: {
                    CityRef: cityRef,
                },
            });

            setBranches(response.data.data);
        } catch (error) {
            console.error('Помилка під час отримання відділень Нової Пошти:', error);
        }
    }

    const cityOptions = cities.map((city) => ({
        value: city.Ref,
        label: city.Description,
    }));

    return (
        <div>
            <Select
                options={cityOptions}
                value={selectedCity}
                onChange={(e) => setCityName(e.target.value)}
            />

            <input
                list="cities"
                type="text"
                placeholder="Введіть назву міста"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
            />

            <datalist id="cities">
                {cities.map((city) => (
                    <option key={city.Ref} value={city.Description} />
                ))}
            </datalist>



            <h2>Відділення Нової Пошти:</h2>
            <ul>
                {branches.map((branch) => (
                    <li key={branch.Ref}>{branch.Description}</li>
                ))}
            </ul>
        </div>
    );
}