import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data (optional - remove if you want to keep existing data)
  await prisma.contact.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.distributor.deleteMany();
  console.log('🗑️ Cleared existing data');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'cables' },
      update: {},
      create: {
        name: 'Bulk Cables',
        slug: 'cables',
        description: 'High-quality networking cables for all your infrastructure needs'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'patch-cords' },
      update: {},
      create: {
        name: 'Patch Cords',
        slug: 'patch-cords',
        description: 'Reliable patch cords for seamless network connections'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'adapters' },
      update: {},
      create: {
        name: 'Adapters',
        slug: 'adapters',
        description: 'Comprehensive range of network adapters'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'connectors' },
      update: {},
      create: {
        name: 'Connectors',
        slug: 'connectors',
        description: 'High-quality network connectors for reliable connections'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'fiber' },
      update: {},
      create: {
        name: 'Fiber Solutions',
        slug: 'fiber',
        description: 'Advanced fiber optic solutions for high-speed connectivity'
      }
    })
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'CAT6 Bulk Cable - 1000ft',
        description: 'High-quality CAT6 bulk cable for professional networking installations',
        sku: 'CAT6-BLK-1000',
        price: 89.99,
        categoryId: categories[0].id, // cables
        images: ['/images/cat6-cable.jpg'],
        features: ['23AWG', '550MHz', 'CMR Rated', 'Blue'],
        specifications: {
          'Cable Type': 'CAT6',
          'Length': '1000 feet',
          'Gauge': '23AWG',
          'Bandwidth': '550MHz',
          'Rating': 'CMR',
          'Color': 'Blue'
        },
        tags: ['cable', 'networking', 'bulk'],
        isFeatured: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Fiber Optic Patch Cord - LC/LC',
        description: 'Single-mode fiber optic patch cord with LC connectors',
        sku: 'FO-PC-LC-LC-3M',
        price: 24.99,
        categoryId: categories[1].id, // patch-cords
        images: ['/images/fiber-patch-cord.jpg'],
        features: ['Single-mode', '3 meters', 'LC/LC', 'OS2'],
        specifications: {
          'Fiber Type': 'Single-mode',
          'Length': '3 meters',
          'Connectors': 'LC/LC',
          'Grade': 'OS2',
          'Jacket': 'LSZH'
        },
        tags: ['fiber', 'patch cord', 'single-mode'],
        isFeatured: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'RJ45 Adapter - Female to Female',
        description: 'Compact RJ45 coupler for extending network connections',
        sku: 'RJ45-ADAP-FF',
        price: 4.99,
        categoryId: categories[2].id, // adapters
        images: ['/images/rj45-adapter.jpg'],
        features: ['Female/Female', 'RJ45', 'Gold Plated'],
        specifications: {
          'Type': 'RJ45 Coupler',
          'Connection': 'Female to Female',
          'Plating': 'Gold',
          'Compatibility': 'CAT5e/6/6a'
        },
        tags: ['adapter', 'coupler', 'rj45'],
        isFeatured: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Fiber Panel - 24 Port',
        description: 'High-density fiber optic patch panel for organized cable management',
        sku: 'FP-24P-1U',
        price: 159.99,
        categoryId: categories[4].id, // fiber
        images: ['/images/fiber-panel.jpg'],
        features: ['24 Port', '1U Rack', 'LC/SC/ST', 'Metal'],
        specifications: {
          'Ports': '24',
          'Rack Units': '1U',
          'Compatibility': 'LC/SC/ST',
          'Material': 'Metal',
          'Color': 'Black'
        },
        tags: ['fiber', 'panel', 'patch panel', '24 port'],
        isFeatured: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'CAT6 Patch Cord - 5ft Blue',
        description: 'Molded CAT6 patch cord for reliable network connections',
        sku: 'CAT6-PC-5FT-BL',
        price: 8.99,
        categoryId: categories[1].id, // patch-cords
        images: ['/images/cat6-patch-cord.jpg'],
        features: ['5ft', 'CAT6', 'Molded', 'Blue'],
        specifications: {
          'Length': '5 feet',
          'Category': 'CAT6',
          'Connectors': 'RJ45',
          'Type': 'Molded',
          'Color': 'Blue'
        },
        tags: ['patch cord', 'cat6', 'network cable'],
        isFeatured: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'MTP Fiber Connector',
        description: 'High-performance MTP connector for fiber optic networks',
        sku: 'MTP-CONN-12F',
        price: 34.99,
        categoryId: categories[3].id, // connectors
        images: ['/images/mtp-connector.jpg'],
        features: ['12 Fiber', 'MTP', 'Single-mode', 'Blue'],
        specifications: {
          'Fiber Count': '12',
          'Connector Type': 'MTP',
          'Mode': 'Single-mode',
          'Color': 'Blue',
          'Backward Compatibility': 'MPO'
        },
        tags: ['connector', 'mtp', 'fiber', '12 fiber'],
        isFeatured: true
      }
    })
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Create sample distributors
  const hashedPassword = await hashPassword('distributor123');
  
  const distributors = await Promise.all([
    prisma.distributor.create({
      data: {
        email: 'distributor1@example.com',
        password: hashedPassword,
        name: 'John Smith',
        company: 'Tech Solutions Inc.',
        phone: '+1 (555) 123-4567',
        address: '123 Business Ave',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA'
      }
    }),
    prisma.distributor.create({
      data: {
        email: 'distributor2@example.com',
        password: hashedPassword,
        name: 'Jane Doe',
        company: 'Network Pro Ltd.',
        phone: '+1 (555) 987-6543',
        address: '456 Tech Park',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    })
  ]);

  console.log(`✅ Created ${distributors.length} distributors`);

  console.log('🎉 Database seeded successfully!');
  console.log('\nSample distributor accounts:');
  console.log('Email: distributor1@example.com, Password: distributor123');
  console.log('Email: distributor2@example.com, Password: distributor123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });