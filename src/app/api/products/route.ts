import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'featured';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    // Build where clause
    const where: any = {
      isActive: true
    };

    // Add search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Add category filter
    if (category && category !== 'all') {
      where.category = {
        slug: category
      };
    }

    // Build order by clause
    let orderBy: any = {};
    switch (sortBy) {
      case 'price-low':
        orderBy = { price: 'asc' };
        break;
      case 'price-high':
        orderBy = { price: 'desc' };
        break;
      case 'name':
        orderBy = { name: 'asc' };
        break;
      case 'featured':
      default:
        orderBy = [
          { isFeatured: 'desc' },
          { createdAt: 'desc' }
        ];
        break;
    }

    // Fetch products with pagination
    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        },
        orderBy,
        skip: offset,
        take: limit
      }),
      db.product.count({ where })
    ]);

    // Transform products to include JSON fields as arrays
    const transformedProducts = products.map(product => ({
      ...product,
      images: product.images || [],
      features: product.features || [],
      tags: product.tags || []
    }));

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      sku,
      price,
      categoryId,
      images = [],
      features = [],
      specifications = {},
      tags = [],
      isFeatured = false
    } = body;

    // Validate required fields
    if (!name || !sku || !categoryId) {
      return NextResponse.json(
        { error: 'Name, SKU, and category are required' },
        { status: 400 }
      );
    }

    // Check if SKU already exists
    const existingProduct = await db.product.findUnique({
      where: { sku }
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this SKU already exists' },
        { status: 400 }
      );
    }

    // Verify category exists
    const category = await db.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Create product
    const product = await db.product.create({
      data: {
        name,
        description,
        sku,
        price: price ? parseFloat(price) : null,
        categoryId,
        images: images.length > 0 ? images : null,
        features: features.length > 0 ? features : null,
        specifications: Object.keys(specifications).length > 0 ? specifications : null,
        tags: tags.length > 0 ? tags : null,
        isFeatured
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Product created successfully',
      product: {
        ...product,
        images: product.images || [],
        features: product.features || [],
        tags: product.tags || []
      }
    });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}