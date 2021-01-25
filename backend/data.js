import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Lucitian',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Duterte',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }
    ],
    games: [
        {
            name: "inFAMOUS: Second Son",
            console: "PlayStation 4",
            image: '/images/Games/inFAMOUS.jpg',
            price: 969.75,
            developer: "Sucker Punch Productions LLC",
            publisher: "Sony Computer Entertainment America LLC",
            stock: "0"
            //description
        },
        {
            name: "Child of Light",
            console: ["PlayStation 4", "Nintendo Switch", "Xbox One"],
            image: '/images/Games/Child_of_Light.jpg',
            price: 749.75,
            developer: "Ubisoft Montreal",
            publisher: "Ubisoft",
            stock: "10"
            //description
        },
        {
            name: "Alien: Isolation",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One", "Nintendo Switch"],
            image: '/images/Games/Alien_Isolation.jpg',
            price: 1449.75,
            developer: "Creative Assembly",
            publisher: "Sega",
            stock: "10"
            //description
        },
        {
            name: "The Evil Wihtin",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One"],
            image: '/images/Games/The_Evil_Within.jpg',
            price: 1095.00,
            developer: "Tango Gameworks",
            publisher: "Bethesda Softworks",
            stock: "10"
            //description
        },
        {
            name: "Dragon Age: Inquistion",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One"],
            image: '/images/Games/Dragon_Age_Inquisition.jpg',
            price: 1929.75,
            developer: "BioWare",
            publisher: "Electronic Arts",
            stock: "10"
            //description
        },
        {
            name: "Far Cry 4",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One"],
            image: '/images/Games/Far_Cry_4.jpg',
            price: 965.75,
            developer: "Ubisoft Montreal",
            publisher: "Ubisoft",
            stock: "10"
            //description
        },
        {
            name: "Dying Light",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One"],
            image: '/images/Games/Dying_Light.jpg',
            price: 924.75,
            developer: "Techland",
            publisher: "Warner Bros. Interactive Entertainment",
            stock: "10"
            //description
        },
        {
            name: "Life is Strange: Complete Season",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One"],
            image: '/images/Games/Life_is_Strange.jpg',
            price: 924.75,
            developer: "Dontnod Entertainment",
            publisher: "Square Enix",
            stock: "10"
            //description
        },
        {
            name: "Bloodborne",
            console: ["PlayStation 5", "PlayStation 4"],
            image: '/images/Games/Bloodborne.jpg',
            price: 720.59,
            developer: "FromSoftware",
            publisher: "Sony Computer Entertainment",
            stock: "10"
            //description
        },
        {
            name: "Dark Souls II: Scholar of the First Sin",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One"],
            image: '/images/Games/Dark_Souls_II.jpg',
            price: 1899.75,
            developer: "FromSoftware",
            publisher: "Bandai Namco Games Inc.",
            stock: "10"
            //description
        },
        {
            name: "Farming Simulator 15",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One", "Nintendo Switch"],
            image: '/images/Games/Farming_Simulator_15.jpg',
            price: 875.49,
            developer: "Giants Software",
            publisher: "Giants Software",
            stock: "10"
            //description
        },
        {
            name: "Batman: Arkham Knight",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One"],
            image: '/images/Games/Arkham_Knight.jpg',
            price: 924.75,
            developer: "Rocksteady Studios",
            publisher: "Warner Bros. Interactive Entertainment",
            stock: "10"
            //description
        },
        {
            name: "Goat Simulator",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One", "Nintendo Switch"],
            image: '/images/Games/Goat_Simulator.jpg',
            price: 449.75,
            developer: "Coffee Stain Studios",
            publisher: "Coffee Stain Studios",
            stock: "10"
            //description
        },
        {
            name: "Fallout 4",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One"],
            image: '/images/Games/Fallout_4.jpg',
            price: 1399.75,
            developer: "Bethesda Game Studios",
            publisher: "Bethesda Softworks",
            stock: "10"
            //description
        },
        {
            name: "Layers of Fear",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One", "Nintendo Switch"],
            image: '/images/Games/Layers_of_Fear.jpg',
            price: 924.75,
            developer: "Bloober Team",
            publisher: "Aspyr",
            stock: "10"
            //description
        },
        {
            name: "Far Cry: Primal",
            console: ["PlayStation 5", "PlayStation 4", "Xbox X", "Xbox One"],
            image: '/images/Games/Far_Cry_Primal.jpg',
            price: 1449.75,
            developer: "Ubisoft Montreal",
            publisher: "Ubisoft",
            stock: "10"
            //description
        },
    ]
}

export default data