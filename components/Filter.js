import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

export default function Filter({
  setIsFiltered,
  setFilteredProducts,
  setCurrentPage,
  latestCurrency,
  productCounts,
  products,
  parentCategories,
  router,
  setSearchResults,
  query,
  setQuery,
  setIsLoading

}) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const handleCategoryClick = async (categoryId) => {
    try {
      await router.push(`/catalog/${categoryId}`);

      setIsFiltered(false);
      setFilteredProducts([]);
    } catch (error) {
      console.error("Помилка переходу до категорії:", error);
    }
  };

  const applyFilters = () => {
    const exchangeRate = latestCurrency.currency;
    const minPriceInDollars = parseInt(priceRange.min, 10) / exchangeRate;
    const maxPriceInDollars = parseInt(priceRange.max, 10) / exchangeRate;

    const filtered = products.filter((product) => {
      const priceInDollars = product.price;
      return (
        priceInDollars >= minPriceInDollars &&
        priceInDollars <= maxPriceInDollars
      );
    });

    setIsFiltered(true);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handlePriceChange = (e) => {
    setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
  };
  
  
  const submitHandler =  async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const response = await axios.get(`/api/products?phrase=${(query)}`);
      setSearchResults(response.data); 
      setIsFiltered(true);
      setCurrentPage(1);
      setIsLoading(false)
    } catch (error) {
      console.error("Помилка пошуку продуктів:", error);
    } finally {
      setIsLoading(false); // Переконайтеся, що завжди вимикаєте завантаження
    }
  };


  if (!parentCategories) {
    return <div>Loading...</div>;
  }
  return (
    <div className="pt-[18px] md:pt-[20px] xl:pt-[30px]">
      
      

      <h2 className="text-[24px] md:text-[15px] xl:text-[21px] uppercase font-bold text-accent">
        Каталог
      </h2>

      <div className="relative bottom-2 md:bottom-0 left-0  mt-5 mb-2 md:hidden ">
       

      
       <form onSubmit={submitHandler}>
         <input
           onChange={(e) => setQuery(e.target.value)}
           type="text"
           value={query}
           className=" pl-[26px]  w-full  border-none bg-primary rounded-full text-white placeholder-white focus:outline-none   "
           placeholder="Пошук"
         />
         <button
           type="submit"
           className="absolute inset-y-0 left-2 md:left-[10px] xl:left-3 flex items-center"
         >
           <Image
             src="/images/search.svg"
             alt="Лупа"
             width={11}
             height={11}
           />
         </button>
       </form>
   
     </div>

      <button
        className=" md:pt-[7px] xl:pt-[15px] text-[24px] md:text-[15px] xl:text-[18px] md:leading-[22px] uppercase font-semibold"
        onClick={() => router.push(`/catalog/`)}
      >
        Всі товари
      </button>
      {parentCategories.map((parentCategory) => (
        <div
          key={parentCategory._id}
          className="pt-[10px] md:pt-[14px] xl:pt-[7px]"
        >
          <button
            onClick={() => handleCategoryClick(parentCategory._id)}
            className="text-[19px] md:text-[15px] xl:text-[18px] leading-[22px] text-primary uppercase font-semibold"
          >
            {parentCategory.name}{" "}
            <span className="text-accent ">
              (
              {productCounts.find(
                (pc) => pc._id.toString() === parentCategory._id.toString()
              )?.count || 0}
              )
            </span>
          </button>
          {parentCategory.children && parentCategory.children.length > 0 ? (
            <ul>
              {parentCategory.children.map((childCategory) => (
                <li key={childCategory._id}>
                  <button
                    className="pl-[12px] text-[15px] md:text-[12px] xl:text-[16px]  leading-[6px] text-center"
                    onClick={() => handleCategoryClick(childCategory._id)}
                  >
                    {childCategory.name}{" "}
                    <span className="text-accent">
                      (
                      {productCounts.find(
                        (pc) =>
                          pc._id.toString() === childCategory._id.toString()
                      )?.count || 0}
                      )
                    </span>{" "}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Дочірні категорії відсутні</p>
          )}
        </div>
      ))}

      <div className="pt-[8px] md:pt-[16px] xl:pt-[33px]">
        <h2 className="text-[24px] md:text-[15px] xl:text-[21px] uppercase font-bold text-accent">
          Фільтр
        </h2>
        <div className="border-t-[2px] border-primary"></div>
        <h3 className="pt-[16px] md:pt-[23px] xl:pt-[13px] text-[24px] md:text-[15px] xl:text-[18px] md:leading-[22px] uppercase font-semibold">
          Ціна
        </h3>
        <div className="pt-[6px] xl:pt-[12px]">
          <input
            className="border-[2px] rounded-[10px] text-center w-[100px] md:w-[54px] xl:w-[60px] h-[30px] xl:h-[37px] "
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
          />
          <span> - </span>
          <input
            className="border-[2px] rounded-[10px] text-center w-[184px] md:w-[62px] xl:w-[70px] h-[30px] xl:h-[37px] "
            name="max"
            value={priceRange.max}
            onChange={handlePriceChange}
          />
        </div>
        <div className="pt-[8px] md:pt-[12px] xl:pt-[14px]">
          <button
            onClick={applyFilters}
            className="bg-primary px-[12px]  py-[8px] rounded-[10px] xl:text-[16px] xl:font-semibold leading-[16.67px]"
          >
            Застосувати фільтри
          </button>
        </div>
      </div>
    </div>
  );
}
