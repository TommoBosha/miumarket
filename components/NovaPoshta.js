import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NovaPoshta() {
    const apiKey = process.env.NOVAPOSHTA_API;
    const baseURL = 'https://api.novaposhta.ua/v2.0/json/';


    const [cityName, setCityName] = useState('');
    const [cities, setCities] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');

    useEffect(() => {
        async function fetchData() {
            if (cityName) {
                const response = await searchCityHandler();
                if (response) {
                    getBranchesHandler(response);
                }
            }
        }
        fetchData();
    }, [cityName]);

    async function searchCityHandler() {
        try {
            const response = await axios.post(`${baseURL}common/city/find`, {
                apiKey: apiKey,
                modelName: 'Address',
                calledMethod: 'searchSettlements',
                methodProperties: {
                    CityName: cityName,
                    Limit: 20,
                }
            });
            setCities(response.data.data[0].Addresses);
            return response.data.data[0].Addresses[0].MainDescription;
        } catch (error) {
            console.error('Помилка під час пошуку города:', error);
            return null;
        }
    }

    async function getBranchesHandler(deliveryCity) {
        try {
            const response = await axios.post(`${baseURL}counterparty/getWarehouses`, {
                apiKey: apiKey,
                modelName: 'Address',
                calledMethod: 'getWarehouses',
                methodProperties: {
                    CityName: deliveryCity,
                },
            });
            setBranches(response.data.data);
        } catch (error) {
            console.error('Помилка під час отримання відділень Нової Пошти:', error);
        }
    }

    function clearBranches() {
        setBranches([]);
        setSelectedBranch('');
    }
    return (
        <div>
            <input
                list="cities"
                type="text"
                placeholder="Введіть назву міста"
                value={cityName}
                onChange={(e) => {
                    setCityName(e.target.value);
                    clearBranches();
                }}
                className='w-full'
            />

            <datalist id="cities">
                {cities.length > 0 && cities.map((city) => (
                    <option key={city.Ref} value={city.Present} />
                ))}
            </datalist>
            <h2>Відділення Нової Пошти:</h2>
            <input
                type="text"
                list="branches"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className='w-full'
            />

            <datalist
                id="branches"
                className='w-full'
            >
                {branches.map((branch) => (
                    <option key={branch.SiteKey} value={branch.Description}>
                        {branch.Description}
                    </option>
                ))}
            </datalist>
        </div>
    );
}