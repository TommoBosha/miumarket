import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Igor',
            email: 'miumarket.com@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Nataliya',
            email: 'tommobosha@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Кулон з гільзи у крафтовому пакуванні',
            category: 'Pendant',
            slug: 'case-pedant',
            image: '/images/pendant1.webp',
            price: 70,
            numReviews: 8,
            countInStock: 20,
            description: 'Кулон з гільзи у крафтовому пакуванні, з нанесенням гравіювання, ручна робота. Вилучені кошти збираються для виготовлення зарядних станцій на ЗСУ.',
        },
        {
            name: 'Браслет з гільзи "Слава Україні"',
            category: 'Braslets',
            slug: 'case-plate-braslet',
            image: '/images/braslets1.webp',
            price: 80,
            numReviews: 10,
            countInStock: 20,
            description: 'Браслет з гільзи "Слава Україні" у крафтовому пакуванні, з нанесенням гравіювання ручної роботи. Розмір ланцюжка керується.Пластина зроблена з відстріляної гільзи(латунь), плетіння з паракорду. Розмір виробу: 5.5 х 1.5 см Вилучені кошти збираються для виготовлення зарядних станцій на ЗСУ.',
        },
        {
            name: 'Браслет з гравіюванням на гільзі',
            category: 'Braslets',
            slug: 'case-braslet',
            image: '/images/braslets2.webp',
            price: 90,
            numReviews: 3,
            countInStock: 20,
            description: 'Браслет з гільзою та гравіюванням у крафтовому пакуванні, ручної роботи. Плетіння з паракорду(колір: олива, чорний). Вилучені кошти збираються для виготовлення зарядних станцій на ЗСУ.',
        },
        {
            name: 'Свічник з гільзи 40мм "Be Brave Like Ukraine"',
            category: 'Candlestick',
            slug: 'case-candlestick-brave',
            image: '/images/candlestick1.webp',
            price: 90,
            numReviews: 13,
            countInStock: 20,
            description: 'Свічник з гільзи 40мм "Be Brave Like Ukraine" у крафтовій упаковці, ручної роботи. Розмір виробу: 5, 3см х 4, 5 см Виручені кошти збираються для виготовлення зарядних станцій на ЗСУ.',
        },
        {
            name: 'Свічник з гільзи 40мм "Слава ЗСУ"',
            category: 'Candlestick',
            slug: 'case-candlestick-zsu',
            image: '/images/candlestick2.webp',
            price: 95,
            numReviews: 7,
            countInStock: 20,
            description: 'Свічник з гільзи 40мм "Слава ЗСУ" у крафтовій упаковці, ручної роботи. Розмір виробу: 5, 3см х 4, 5 см Виручені кошти збираються для виготовлення зарядних станцій на ЗСУ.',
        },

    ],
}


export default data