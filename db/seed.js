import { pool } from '../services/db.js';

const seedData = async () => {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting seed...');

    // 1. Ensure Category Exists
    const categoryName = 'Dermocosmetica';
    // (Already exists in initial schema, but good practice to ensure)
    await client.query(`
      INSERT INTO categories (name, sort_order) 
      VALUES ($1, 5) 
      ON CONFLICT (name) DO NOTHING;
    `, [categoryName]);

    // 2. Ensure Brands Exist
    const brands = ['Bioderma', 'Vichy', 'Eucerin', 'Avène', 'Isdin'];
    for (const brand of brands) {
      await client.query(`
        INSERT INTO brands (name) 
        VALUES ($1) 
        ON CONFLICT (name) DO NOTHING;
      `, [brand]);
    }
    console.log('✅ Brands synced');

    // 3. Products Data
    const products = [
      {
        id: 'seed-dermo-001',
        name: 'Bioderma Sensibio H2O',
        tagline: 'Agua micelar para pieles sensibles.',
        description: 'Limpia y desmaquilla cara y ojos, calmando las pieles sensibles.',
        long_description: 'Sensibio H2O es la primera y única agua micelar dermatológica que presenta una analogía biológica perfecta con la piel: los ésteres de ácidos grasos que forman las micelas son similares a los fosfolípidos de las membranas de las células cutáneas y participan en la reconstitución natural de la película hidrolipídica de la piel.',
        price: 135000,
        brand_name: 'Bioderma',
        discount_percent: 0,
        category: categoryName,
        image_url: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1000',
        gallery: ['https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1000'],
        features: ['Sin enjuague', 'Sin perfume', 'Hipoalergénico']
      },
      {
        id: 'seed-dermo-002',
        name: 'Vichy Minéral 89',
        tagline: 'Fortificante e hidratante diario.',
        description: 'Refuerza la barrera cutánea contra las agresiones externas e internas.',
        long_description: 'Minéral 89 refuerza la función barrera de la piel para hacerla más fuerte contra las agresiones como la contaminación, el estrés y la fatiga. Día tras día, la piel está hidratada, tonificada y radiante. Mineral 89, para todos los tipos de piel.',
        price: 210000,
        brand_name: 'Vichy',
        discount_percent: 15, // 15% OFF
        discount_starts_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        discount_ends_at: new Date(Date.now() + 604800000).toISOString(), // +7 days
        category: categoryName,
        image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000',
        gallery: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000'],
        features: ['Ácido Hialurónico', 'Agua Volcánica', 'Sin alcohol']
      },
      {
        id: 'seed-dermo-003',
        name: 'Eucerin Oil Control 50+',
        tagline: 'Protección solar toque seco.',
        description: 'Protector solar facial para piel grasa y con tendencia acneica. Efecto anti-brillo.',
        long_description: 'Advanced Spectral Technology de Eucerin ofrece una protección de factor alto frente a rayos UVA y UVB, y protección contra la luz HEVIS. El protector solar también estimula el mecanismo de reparación del ADN de la piel e incluye la tecnología Oil Control reguladora del sebo.',
        price: 165000,
        brand_name: 'Eucerin',
        discount_percent: 5,
        discount_starts_at: new Date().toISOString(),
        discount_ends_at: new Date(Date.now() + 864000000).toISOString(), // +10 days
        category: categoryName,
        image_url: 'https://images.unsplash.com/photo-1556228720-1987bad8b96c?auto=format&fit=crop&q=80&w=1000',
        gallery: ['https://images.unsplash.com/photo-1556228720-1987bad8b96c?auto=format&fit=crop&q=80&w=1000'],
        features: ['Toque Seco', 'Anti-brillo', 'No comedogénico']
      },
      {
        id: 'seed-dermo-004',
        name: 'Avène Agua Termal',
        tagline: 'Calma, suaviza e irritaciones.',
        description: 'Extraída directamente del manantial, conserva intactas todas sus propiedades calmantes.',
        long_description: 'El Agua Termal de Avène conserva intactas todas sus propiedades calmantes, desensibilizantes y suavizantes. Sensación de suavidad te envuelve y te alivia. Es toda la delicadeza y la pureza del Agua Termal de Avène, que te protege de forma duradera.',
        price: 95000,
        brand_name: 'Avène',
        discount_percent: 0,
        category: categoryName,
        image_url: 'https://images.unsplash.com/photo-1616750819456-5c220f186008?auto=format&fit=crop&q=80&w=1000',
        gallery: ['https://images.unsplash.com/photo-1616750819456-5c220f186008?auto=format&fit=crop&q=80&w=1000'],
        features: ['Calmante', 'Suavizante', 'Para piel sensible']
      },
      {
        id: 'seed-dermo-005',
        name: 'Isdin Fusion Water',
        tagline: 'Fotoprotector facial de fase acuosa.',
        description: 'Hidratación intensa, absorción inmediata y garantiza una alta protección UV.',
        long_description: 'Fotoprotector facial de fase acuosa que aporta hidratación intensa, absorción inmediata y garantiza una alta protección frente a la radiación UV. Alta protección UVB/UVA SPF 50. Safe-Eye Tech: no pica en los ojos. Wet Skin: puede aplicarse sobre piel mojada.',
        price: 195000,
        brand_name: 'Isdin',
        discount_percent: 0,
        category: categoryName,
        image_url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=1000',
        gallery: ['https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=1000'],
        features: ['No pica los ojos', 'Oil-free', 'Absorción inmediata']
      }
    ];

    for (const p of products) {
      await client.query(`
        INSERT INTO products (
          id, name, tagline, description, long_description, price, 
          brand_name, discount_percent, discount_starts_at, discount_ends_at, 
          category, image_url, gallery, features
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          tagline = EXCLUDED.tagline,
          description = EXCLUDED.description,
          long_description = EXCLUDED.long_description,
          price = EXCLUDED.price,
          brand_name = EXCLUDED.brand_name,
          discount_percent = EXCLUDED.discount_percent,
          discount_starts_at = EXCLUDED.discount_starts_at,
          discount_ends_at = EXCLUDED.discount_ends_at,
          category = EXCLUDED.category,
          image_url = EXCLUDED.image_url,
          gallery = EXCLUDED.gallery,
          features = EXCLUDED.features;
      `, [
        p.id, p.name, p.tagline, p.description, p.long_description, p.price,
        p.brand_name, p.discount_percent, p.discount_starts_at || null, p.discount_ends_at || null,
        p.category, p.image_url, p.gallery, p.features
      ]);
      console.log(`Inserted/Updated: ${p.name}`);
    }

    console.log('✅ Seed completed successfully.');
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    client.release();
    pool.end();
  }
};

seedData();
