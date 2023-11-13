// import React, { useEffect, useState } from 'react'
// import { Category } from '../models/Category';
// import Product from '../models/Product';
// import axios from 'axios';

// export default function Filter({
//     category, subCategories, products: originalProducts
// }) {

//     const defaultSorting = '_id-desc';
//     const defaultFilterValues = category.properties
//         .map(p => ({ name: p.name, value: 'all' }));
//     const [products, setProducts] = useState(originalProducts);
//     const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
//     const [sort, setSort] = useState(defaultSorting);
//     const [loadingProducts, setLoadingProducts] = useState(false);
//     const [filtersChanged, setFiltersChanged] = useState(false);

//     function handleFilterChange(filterName, filterValue) {
//         setFiltersValues(prev => {
//             return prev.map(p => ({
//                 name: p.name,
//                 value: p.name === filterName ? filterValue : p.value,
//             }));
//         });
//         setFiltersChanged(true);
//     }
//     // useEffect(() => {
//     //     if (!filtersChanged) {
//     //         return;
//     //     }
//     //     setLoadingProducts(true);
//     //     const catIds = [category._id, ...(subCategories?.map(c => c._id) || [])];
//     //     const params = new URLSearchParams;
//     //     params.set('categories', catIds.join(','));
//     //     params.set('sort', sort);
//     //     filtersValues.forEach(f => {
//     //         if (f.value !== 'all') {
//     //             params.set(f.name, f.value);
//     //         }
//     //     });
//     //     const url = `/api/products?` + params.toString();
//     //     axios.get(url).then(res => {
//     //         setProducts(res.data);
//     //         setLoadingProducts(false);
//     //     })
//     // }, [filtersValues, sort, filtersChanged]);
//     return (
//         <div>
//             <div>
//                 <h1>{category.name}</h1>
//                 <div>
//                     {category.properties.map(prop => (
//                         <div key={prop.name}>
//                             <span>{prop.name}:</span>
//                             <select
//                                 onChange={ev => handleFilterChange(prop.name, ev.target.value)}
//                                 value={filtersValues.find(f => f.name === prop.name).value}>
//                                 <option value="all">All</option>
//                                 {prop.values.map(val => (
//                                     <option key={val} value={val}>{val}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     ))}
//                     <div>
//                         <span>Sort:</span>
//                         <select
//                             value={sort}
//                             onChange={ev => {
//                                 setSort(ev.target.value);
//                                 setFiltersChanged(true);
//                             }}>
//                             <option value="price-asc">price, lowest first</option>
//                             <option value="price-desc">price, highest first</option>
//                             <option value="_id-desc">newest first</option>
//                             <option value="_id-asc">oldest first</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>
//             {/* {loadingProducts && (
//                 <Spinner fullWidth />
//             )}
//             {!loadingProducts && (
//                 <div>
//                     {products.length > 0 && (
//                         <ProductsGrid products={products} />
//                     )}
//                     {products.length === 0 && (
//                         <div>Sorry, no products found</div>
//                     )}
//                 </div>
//             )} */}
//         </div>
//     )
// }

// export async function getServerSideProps(context) {
//     const category = await Category.findById(context.query.id);
//     const subCategories = await Category.find({ parent: category._id });
//     const catIds = [category._id, ...subCategories.map(c => c._id)];
//     const products = await Product.find({ category: catIds });
//     return {
//         props: {
//             category: JSON.parse(JSON.stringify(category)),
//             subCategories: JSON.parse(JSON.stringify(subCategories)),
//             products: JSON.parse(JSON.stringify(products)),
//         }
//     };
// }