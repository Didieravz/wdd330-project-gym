export const gymsData = [
    {
        id: "gym1",
        name: "FitGym Center",
        location: "Bogotá",
        address: "Calle 123 #45-67",
        image: "../images/GymBogota.jpeg",
        prices: {
            basic: { price: "$30", description: "Basic access" },
            silver: { price: "$50", description: "Access + group classes" },
            gold: { price: "$80", description: "Unlimited access + trainer" },
            platinum: { price: "$120", description: "All inclusive + spa" }
        },
        coordinates: [4.710989, -74.072092],
        schedule: "Monday to Friday: 5:00 AM - 10:00 PM\nSaturdays: 7:00 AM - 8:00 PM"
    },
    {
        id: "gym2",
        name: "StrongLife Gym",
        location: "Medellín",
        address: "Carrera 12 #8-90",
        image: "../images/GymMedellin.jpeg",
        prices: {
            basic: { price: "$25", description: "Basic access" },
            silver: { price: "$45", description: "Access + group classes" },
            gold: { price: "$75", description: "Unlimited access + trainer" },
            platinum: { price: "$110", description: "All inclusive + spa" }
        },
        coordinates: [6.244203, -75.581212],
        schedule: "Monday to Saturday: 6:00 AM - 9:00 PM"
    },
    {
        id: "gym3",
        name: "Sport Gym",
        location: "Tunja",
        address: "Carrera 28 #30-60",
        image: "../images/GymTunja.jpeg",
        prices: {
            basic: { price: "$20", description: "Basic access" },
            silver: { price: "$40", description: "Access + group classes" },
            gold: { price: "$70", description: "Unlimited access + trainer" },
            platinum: { price: "$100", description: "All inclusive + spa" }
        },
        coordinates: [5.535379, -73.367781],
        schedule: "Monday to Friday: 5:30 AM - 9:30 PM\nSundays: 8:00 AM - 4:00 PM"
    }
];

export const membershipPlans = [
    {
        id: "basic",
        name: "Basic",
        features: [
            "Access to basic equipment",
            "Use of locker room",
            "Purified water"
        ]
    },
    {
        id: "silver",
        name: "Silver",
        features: [
            "Everything in Basic",
            "Unlimited group classes",
            "Basic nutritional guidance"
        ]
    },
    {
        id: "gold",
        name: "Gold",
        features: [
            "Everything in Silver",
            "Personal trainer 2x/week",
            "VIP area access"
        ]
    },
    {
        id: "platinum",
        name: "Platinum",
        features: [
            "Everything in Gold",
            "Unlimited personal trainer",
            "Access to spa and sauna",
            "Premium towel and locker"
        ]
    }
];
