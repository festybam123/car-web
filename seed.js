import mongoose from 'mongoose';
import User from './server/models/User.js';
import Car from './server/models/Car.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Car.deleteMany({});

    // Seed users
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@festybam.com',
      password: 'Admin123!',
      role: 'admin',
      phone: '+234 800 000 0000'
    });

    const dealer = await User.create({
      firstName: 'John',
      lastName: 'Dealer',
      email: 'dealer@festybam.com',
      password: 'Dealer123!',
      role: 'dealer',
      company: 'Premium Motors',
      phone: '+234 812 345 6789'
    });

    const dealer2 = await User.create({
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@festybam.com',
      password: 'Dealer123!',
      role: 'dealer',
      company: 'Elite Auto Haus',
      phone: '+234 813 456 7890'
    });

    const customer = await User.create({
      firstName: 'Jane',
      lastName: 'Customer',
      email: 'customer@festybam.com',
      password: 'Customer123!',
      role: 'customer',
      phone: '+234 901 234 5678'
    });

    console.log('✓ Users seeded');

    // Seed cars — each with local images from /public/images/
    const cars = await Car.create([
      {
        brand: 'Toyota',
        model: 'Camry',
        year: 2023,
        engine: '2.5L 4-Cylinder',
        horsepower: 206,
        fuel: 'Petrol',
        transmission: 'Automatic',
        mileage: 5000,
        condition: 'New',
        vin: 'VIN123456789',
        exteriorColor: 'Pearl White',
        interiorColor: 'Black Leather',
        driveType: 'FWD',
        seats: 5,
        doors: 4,
        price: 8500000,
        status: 'available',
        images: ['/images/car1.jpg', '/images/car2.jpg'],
        description: 'Premium sedan with excellent features and reliability. The Toyota Camry delivers a smooth ride, spacious interior, and top-tier fuel efficiency perfect for daily commuting and family trips.',
        features: ['Sunroof', 'Leather Seats', 'Backup Camera', 'Bluetooth', 'Cruise Control', 'Lane Assist'],
        dealer: dealer._id,
        availability: true,
        rating: 4.5,
        totalReviews: 12
      },
      {
        brand: 'BMW',
        model: '320i',
        year: 2022,
        engine: '2.0L Turbocharged',
        horsepower: 255,
        fuel: 'Petrol',
        transmission: 'Automatic',
        mileage: 15000,
        condition: 'Used',
        vin: 'VIN987654321',
        exteriorColor: 'Jet Black',
        interiorColor: 'Beige Leather',
        driveType: 'RWD',
        seats: 5,
        doors: 4,
        price: 12000000,
        discountPrice: 11500000,
        status: 'available',
        images: ['/images/car3.jpg', '/images/car4.jpg'],
        description: 'Luxury sport sedan with premium features. The BMW 320i offers exhilarating performance with a turbocharged engine, precise handling, and a beautifully crafted interior.',
        features: ['Panoramic Sunroof', 'Premium Audio', 'Navigation System', 'Heated Seats', 'Apple CarPlay'],
        dealer: dealer._id,
        availability: true,
        rating: 4.8,
        totalReviews: 8
      },
      {
        brand: 'Tesla',
        model: 'Model 3',
        year: 2023,
        engine: 'Electric Motor',
        horsepower: 358,
        fuel: 'Electric',
        transmission: 'Automatic',
        mileage: 1000,
        condition: 'New',
        vin: 'VIN111222333',
        exteriorColor: 'Midnight Silver',
        interiorColor: 'Black',
        driveType: 'RWD',
        seats: 5,
        doors: 4,
        price: 15000000,
        status: 'available',
        images: ['/images/car5.jpg', '/images/car6.jpg'],
        description: 'Electric sedan with cutting-edge technology and performance. The Tesla Model 3 features autopilot capabilities, lightning-fast acceleration, and an impressive electric range.',
        features: ['Autopilot', 'Premium Audio', 'Glass Roof', 'Smart Charging', 'Tesla App'],
        dealer: dealer._id,
        availability: true,
        rating: 4.9,
        totalReviews: 25
      },
      {
        brand: 'Mercedes-Benz',
        model: 'C300',
        year: 2023,
        engine: '2.0L Turbo 4-Cylinder',
        horsepower: 255,
        fuel: 'Petrol',
        transmission: 'Automatic',
        mileage: 3000,
        condition: 'New',
        vin: 'VIN444555666',
        exteriorColor: 'Obsidian Black',
        interiorColor: 'Macchiato Beige',
        driveType: 'RWD',
        seats: 5,
        doors: 4,
        price: 18000000,
        status: 'available',
        images: ['/images/car7.jpg', '/images/car8.jpg'],
        description: 'The Mercedes-Benz C300 combines luxury and performance in a stunning package. With handcrafted interior details and advanced driver assistance systems, every drive feels special.',
        features: ['64-color Ambient Lighting', 'Burmester Sound', 'MBUX Assistant', 'Heated/Ventilated Seats', 'Wireless Charging'],
        dealer: dealer2._id,
        availability: true,
        rating: 4.7,
        totalReviews: 15
      },
      {
        brand: 'Honda',
        model: 'Accord',
        year: 2023,
        engine: '1.5L Turbo 4-Cylinder',
        horsepower: 192,
        fuel: 'Petrol',
        transmission: 'CVT',
        mileage: 2000,
        condition: 'New',
        vin: 'VIN777888999',
        exteriorColor: 'Platinum White',
        interiorColor: 'Black Cloth',
        driveType: 'FWD',
        seats: 5,
        doors: 4,
        price: 6500000,
        status: 'available',
        images: ['/images/car9.jpg'],
        description: 'The Honda Accord is a benchmark in the midsize sedan segment, offering outstanding reliability, spacious interior, and impressive fuel economy. Perfect for families and professionals.',
        features: ['Honda Sensing Suite', 'Wireless CarPlay', 'Dual-zone Climate', 'Blind Spot Monitor', 'Smart Entry'],
        dealer: dealer._id,
        availability: true,
        rating: 4.4,
        totalReviews: 20
      },
      {
        brand: 'Audi',
        model: 'Q5',
        year: 2022,
        engine: '2.0L TFSI Turbo',
        horsepower: 261,
        fuel: 'Petrol',
        transmission: 'Automatic',
        mileage: 12000,
        condition: 'Certified Pre-Owned',
        vin: 'VIN222333444',
        exteriorColor: 'Navarra Blue',
        interiorColor: 'Okapi Brown',
        driveType: 'AWD',
        seats: 5,
        doors: 4,
        price: 14000000,
        discountPrice: 13200000,
        status: 'available',
        images: ['/images/car10.jpg'],
        description: 'The Audi Q5 luxury SUV offers a refined ride, high-quality cabin, and Quattro all-wheel drive for all-weather confidence. Certified pre-owned with full warranty.',
        features: ['Virtual Cockpit', 'Bang & Olufsen Sound', 'Panoramic Roof', 'Tri-zone Climate', 'Traffic Sign Recognition'],
        dealer: dealer2._id,
        availability: true,
        rating: 4.6,
        totalReviews: 10
      },
      {
        brand: 'Lexus',
        model: 'RX 350',
        year: 2023,
        engine: '3.5L V6',
        horsepower: 295,
        fuel: 'Petrol',
        transmission: 'Automatic',
        mileage: 1500,
        condition: 'New',
        vin: 'VIN555666777',
        exteriorColor: 'Atomic Silver',
        interiorColor: 'Birch Cream',
        driveType: 'AWD',
        seats: 5,
        doors: 4,
        price: 22000000,
        status: 'available',
        images: ['/images/car11.jpg'],
        description: 'The Lexus RX 350 sets the standard for luxury crossovers with its whisper-quiet cabin, buttery-smooth ride, and legendary Lexus reliability.',
        features: ['Mark Levinson Audio', 'Semi-Aniline Leather', 'Heated Steering Wheel', 'Rear Entertainment', 'Lexus Safety System+'],
        dealer: dealer2._id,
        availability: true,
        rating: 4.8,
        totalReviews: 18
      },
      {
        brand: 'Toyota',
        model: 'RAV4',
        year: 2023,
        engine: '2.5L 4-Cylinder Hybrid',
        horsepower: 219,
        fuel: 'Hybrid',
        transmission: 'CVT',
        mileage: 800,
        condition: 'New',
        vin: 'VIN888999000',
        exteriorColor: 'Lunar Rock',
        interiorColor: 'Black Fabric',
        driveType: 'AWD',
        seats: 5,
        doors: 4,
        price: 7200000,
        status: 'available',
        images: ['/images/car12.jpg'],
        description: 'The Toyota RAV4 Hybrid combines exceptional fuel efficiency with rugged capability. Ideal for adventurous drivers who want to minimize their carbon footprint.',
        features: ['Toyota Safety Sense', 'Wireless Charging', 'Power Liftgate', 'Heated Seats', 'JBL Audio'],
        dealer: dealer._id,
        availability: true,
        rating: 4.3,
        totalReviews: 30
      },
      {
        brand: 'Porsche',
        model: 'Cayenne',
        year: 2021,
        engine: '3.0L V6 Turbo',
        horsepower: 335,
        fuel: 'Petrol',
        transmission: 'Automatic',
        mileage: 25000,
        condition: 'Used',
        vin: 'VIN000111222',
        exteriorColor: 'Carrara White',
        interiorColor: 'Bordeaux Red',
        driveType: 'AWD',
        seats: 5,
        doors: 4,
        price: 32000000,
        discountPrice: 29500000,
        status: 'available',
        images: ['/images/car1.jpg', '/images/car3.jpg'],
        description: 'The Porsche Cayenne delivers sports car performance in an SUV body. Experience the thrill of Porsche engineering with everyday practicality.',
        features: ['Sport Chrono Package', 'Adaptive Air Suspension', 'Bose Surround Sound', 'Sport Exhaust', 'Porsche Crest on Seats'],
        dealer: dealer2._id,
        availability: true,
        rating: 4.9,
        totalReviews: 6
      },
      {
        brand: 'Nissan',
        model: 'Altima',
        year: 2022,
        engine: '2.5L 4-Cylinder',
        horsepower: 188,
        fuel: 'Petrol',
        transmission: 'CVT',
        mileage: 18000,
        condition: 'Used',
        vin: 'VIN333444555',
        exteriorColor: 'Gun Metallic',
        interiorColor: 'Charcoal',
        driveType: 'FWD',
        seats: 5,
        doors: 4,
        price: 4800000,
        status: 'available',
        images: ['/images/car5.jpg'],
        description: 'The Nissan Altima offers a comfortable ride, user-friendly tech, and excellent value. ProPILOT Assist makes highway driving effortless.',
        features: ['ProPILOT Assist', 'Remote Engine Start', 'Apple CarPlay/Android Auto', 'Intelligent Cruise Control', 'Rear Cross-Traffic Alert'],
        dealer: dealer._id,
        availability: true,
        rating: 4.1,
        totalReviews: 14
      },
      {
        brand: 'Hyundai',
        model: 'Tucson',
        year: 2023,
        engine: '2.5L 4-Cylinder',
        horsepower: 187,
        fuel: 'Petrol',
        transmission: 'Automatic',
        mileage: 500,
        condition: 'New',
        vin: 'VIN666777888',
        exteriorColor: 'Shimmering Silver',
        interiorColor: 'Black Leather',
        driveType: 'AWD',
        seats: 5,
        doors: 4,
        price: 5800000,
        status: 'available',
        images: ['/images/car7.jpg'],
        description: 'The Hyundai Tucson stands out with its futuristic design, generous warranty, and class-leading tech features. A smart choice for modern families.',
        features: ['Digital Key', 'Bose Premium Audio', 'Ambient Lighting', 'Blind-Spot View Monitor', 'Remote Smart Parking'],
        dealer: dealer._id,
        availability: true,
        rating: 4.2,
        totalReviews: 22
      },
      {
        brand: 'Ford',
        model: 'Mustang GT',
        year: 2022,
        engine: '5.0L V8',
        horsepower: 450,
        fuel: 'Petrol',
        transmission: 'Manual',
        mileage: 10000,
        condition: 'Used',
        vin: 'VIN999000111',
        exteriorColor: 'Race Red',
        interiorColor: 'Ebony Leather',
        driveType: 'RWD',
        seats: 4,
        doors: 2,
        price: 25000000,
        status: 'available',
        images: ['/images/car9.jpg', '/images/car11.jpg'],
        description: 'The Ford Mustang GT is an American icon. With its thunderous V8 engine, six-speed manual transmission, and aggressive styling, it delivers the ultimate driving thrill.',
        features: ['Active Valve Exhaust', 'Track Apps', 'Sync 4 with 12-inch Screen', 'B&O Sound System', 'Launch Control'],
        dealer: dealer2._id,
        availability: true,
        rating: 4.7,
        totalReviews: 16
      }
    ]);

    console.log('✓ Cars seeded (12 cars with local images)');

    console.log('\n✅ Database seeded successfully!\n');
    console.log('Test Credentials:');
    console.log('Admin: admin@festybam.com / Admin123!');
    console.log('Dealer: dealer@festybam.com / Dealer123!');
    console.log('Customer: customer@festybam.com / Customer123!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
