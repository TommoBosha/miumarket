import React, {  useState } from 'react'


export default function Filter({
    setIsFiltered, setFilteredProducts,latestCurrency, productCounts, products, parentCategories, router}) {
    
        const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
       

        const handleCategoryClick = async (categoryId) => {
                        try {
                await router.push(`/catalog/${categoryId}`);
                
                setIsFiltered(false);
                setFilteredProducts([]);
            } catch (error) {
                console.error('Помилка переходу до категорії:', error);
            }
        };

    
    const applyFilters = () => {
        const exchangeRate = latestCurrency.currency;
        const minPriceInDollars = parseInt(priceRange.min, 10) / exchangeRate;
        const maxPriceInDollars = parseInt(priceRange.max, 10) / exchangeRate;
    
        const filtered = products.filter(product => {
            const priceInDollars = product.price;
            return priceInDollars >= minPriceInDollars && priceInDollars <= maxPriceInDollars;
        });
    
        setIsFiltered(true);
        setFilteredProducts(filtered);
    };
    
    const handlePriceChange = (e) => {
        setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
    };

    if (!parentCategories) {
        return <div>Loading...</div>; 
    }
    return (
        <div>
            <h2 className='text-[24px] md:text-[15px] xl:text-[21px] uppercase font-bold text-accent'>Каталог</h2>
            <button 
            className='pt-[14px] md:pt-[7px] xl:pt-[15px] text-[24px] md:text-[15px] xl:text-[18px] md:leading-[22px] uppercase font-semibold'
            onClick={() => router.push(`/catalog/`)}>Всі товари</button>
          {parentCategories.map(parentCategory => (
    <div key={parentCategory._id}
    className='pt-[10px] md:pt-[14px] xl:pt-[7px]'
    >
        <button 
        onClick={() => handleCategoryClick(parentCategory._id)}
        className='text-[19px] md:text-[15px] xl:text-[18px] leading-[22px] uppercase font-semibold'
        >{parentCategory.name} ({productCounts.find(pc => pc._id.toString() === parentCategory._id.toString())?.count || 0})</button>
        {parentCategory.children && parentCategory.children.length > 0 ? (
            <ul>
                {parentCategory.children.map(childCategory => (
                    <li key={childCategory._id}>
                        <button 
                         className='text-[15px] md:text-[12px] xl:text-[16px]  leading-[6px] text-center'
                        onClick={() => handleCategoryClick(childCategory._id)}>{childCategory.name} ({productCounts.find(pc => pc._id.toString() === childCategory._id.toString())?.count || 0})</button> 
                    </li>
                ))}
            </ul>
        ) : (
            <p>Дочірні категорії відсутні</p>
        )}
    </div>
))}


<div className='pt-[8px] md:pt-[16px] xl:pt-[33px]'>
    <h2 className='text-[24px] md:text-[15px] xl:text-[21px] uppercase font-bold text-accent'>Фільтр</h2>
    <h3 className='text-[24px] md:text-[15px] xl:text-[18px] md:leading-[22px] uppercase font-semibold'>Ціна</h3>
        <input
        className='border-[2px] rounded-[10px] text-center w-[100px] md:w-[53px] xl:w-[60px] h-[30px] xl:h-[37px] '
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
        />
        -
        <input
                className='border-[2px] rounded-[10px] text-center w-[184px] md:w-[72px] xl:w-[81px] h-[30px] xl:h-[37px] '
            name="max"
            value={priceRange.max}
            onChange={handlePriceChange}
        />
        <button onClick={applyFilters}>Застосувати фільтри</button>
       
    </div>

        </div>
    );
}

