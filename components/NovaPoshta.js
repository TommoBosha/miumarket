import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NovaPoshta({ errors, register, cityName, setCityName, warehouses, setWarehouses }) {
  const apiKey = process.env.NOVAPOSHTA_API;
  const baseURL = "https://api.novaposhta.ua/v2.0/json/";


  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
 

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName]);

  async function searchCityHandler() {
    try {
      const response = await axios.post(`${baseURL}common/city/find`, {
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "searchSettlements",
        methodProperties: {
          CityName: cityName,
          Limit: 20,
        },
      });
      setCities(response.data.data[0].Addresses);
      return response.data.data[0].Addresses[0].MainDescription;
    } catch (error) {
      console.error;
      return null;
    }
  }

  async function getBranchesHandler(deliveryCity) {
    try {
      const response = await axios.post(
        `${baseURL}counterparty/getWarehouses`,
        {
          apiKey: apiKey,
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityName: deliveryCity,
          },
        }
      );
      setBranches(response.data.data);
    } catch (error) {
      console.error("Помилка під час отримання відділень Нової Пошти:", error);
    }
  }

  function clearBranches() {
    setBranches([]);
    setWarehouses("");
  }
  return (
    <div>
      <div className="mb-8 relative">
        <label
          htmlFor="cityName"
          className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
        >
          Місто
        </label>
        <input
          list="cities"
          type="text"
          id="cityName"
          placeholder="Введіть назву міста"
          autoComplete="off"
          {...register("cityName", {
            required: "Введіть місто",
          })}
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
            clearBranches();
          }}
          className={`appearance-none border-2 rounded-3xl
                ${errors.cityName ? "border-red-500" : "border-gray-300"} 
                rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
        />
        {errors.cityName && (
          <div className="text-red-500">{errors.cityName.message}</div>
        )}

        <datalist id="cities">
          {cities.length > 0 &&
            cities.map((city) => (
              <option key={city.Ref} value={city.Present} />
            ))}
        </datalist>
      </div>

      <div className="mb-8 relative">
        <label
          htmlFor="warehouses"
          className="block   text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4  bg-graybg text-form"
        >
          Відділення Нової Пошти
        </label>
        <input
          id="warehouses"
          {...register("warehouses", {
            required: "Введіть місто",
          })}
          type="text"
          list="branches"
          value={warehouses}
          onChange={(e) => setWarehouses(e.target.value)}
          className={`appearance-none border-2 rounded-3xl
          ${errors.warehouse ? "border-red-500" : "border-gray-300"} 
          rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
        />

        {errors.warehouse && (
          <div className="text-red-500">{errors.warehouses.message}</div>
        )}

        <datalist id="branches" className="w-full">
          {branches.map((branch) => (
            <option key={branch.SiteKey} value={branch.Description}>
              {branch.Description}
            </option>
          ))}
        </datalist>
      </div>
      <h2></h2>
    </div>
  );
}


