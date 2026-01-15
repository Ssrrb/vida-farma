-- Postgres schema + seed data for products.
-- Run with: psql "$DATABASE_URL" -f db/database.sql

BEGIN;

CREATE TABLE IF NOT EXISTS categories (
  name TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL
);

INSERT INTO categories (name, sort_order) VALUES
  ('Medicamentos', 1),
  ('Perfumes', 2),
  ('Higiene', 3),
  ('Salud', 4),
  ('Dermocosmetica', 5),
  ('Bebé y Mamá', 6),
  ('Nutrición y Deporte', 7)
  ('Ofertas', 8)
ON CONFLICT (name) DO UPDATE SET
  sort_order = EXCLUDED.sort_order;

CREATE TABLE IF NOT EXISTS brands (
  name TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL DEFAULT 0
);

INSERT INTO brands (name, sort_order) VALUES
  ('Sin Marca', 0),
  ('Natura', 1),
  ('La Roche-Posay', 2),
  ('Genérico', 3),
  ('CeraVe', 4),
  ('Carolina Herrera', 5),
  ('Omron', 6)
ON CONFLICT (name) DO UPDATE SET
  sort_order = EXCLUDED.sort_order;

CREATE TABLE IF NOT EXISTS subcategories (
  category_name TEXT NOT NULL REFERENCES categories(name) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (category_name, name)
);

INSERT INTO subcategories (category_name, name, sort_order) VALUES
  ('Medicamentos', 'Analgésicos', 1),
  ('Medicamentos', 'Antigripales', 2),
  ('Medicamentos', 'Antibióticos', 3),
  ('Perfumes', 'Femeninos', 1),
  ('Perfumes', 'Masculinos', 2),
  ('Higiene', 'Cuidado Oral', 1),
  ('Higiene', 'Cuidado Capilar', 2),
  ('Salud', 'Monitoreo', 1),
  ('Salud', 'Primeros Auxilios', 2),
  ('Dermocosmetica', 'Protector Solar', 1),
  ('Dermocosmetica', 'Hidratación', 2),
  ('Bebé y Mamá', 'Lactancia', 1),
  ('Bebé y Mamá', 'Higiene del Bebé', 2),
  ('Nutrición y Deporte', 'Vitaminas', 1),
  ('Nutrición y Deporte', 'Proteínas', 2)
ON CONFLICT (category_name, name) DO UPDATE SET
  sort_order = EXCLUDED.sort_order;

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  price INTEGER NOT NULL,
  brand_name TEXT NOT NULL REFERENCES brands(name),
  discount_percent INTEGER NOT NULL DEFAULT 0,
  discount_starts_at TIMESTAMPTZ,
  discount_ends_at TIMESTAMPTZ,
  category TEXT NOT NULL REFERENCES categories(name),
  image_url TEXT NOT NULL,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}'
);

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS brand_name TEXT DEFAULT 'Sin Marca';

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS discount_percent INTEGER NOT NULL DEFAULT 0;

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS discount_starts_at TIMESTAMPTZ;

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS discount_ends_at TIMESTAMPTZ;

UPDATE products
  SET brand_name = 'Sin Marca'
  WHERE brand_name IS NULL;

UPDATE products
  SET discount_percent = 0
  WHERE discount_percent IS NULL;

ALTER TABLE products
  ALTER COLUMN brand_name SET NOT NULL;

DO $$
BEGIN
  ALTER TABLE products
    ADD CONSTRAINT products_brand_name_fkey
    FOREIGN KEY (brand_name) REFERENCES brands(name);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER TABLE products
    ADD CONSTRAINT products_discount_percent_range
    CHECK (discount_percent >= 0 AND discount_percent <= 100);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS products_brand_name_idx ON products (brand_name);
CREATE INDEX IF NOT EXISTS products_discounted_idx ON products (discount_percent) WHERE discount_percent > 0;
CREATE INDEX IF NOT EXISTS products_discount_window_idx ON products (discount_starts_at, discount_ends_at);

INSERT INTO products (
  id,
  name,
  tagline,
  description,
  long_description,
  price,
  brand_name,
  discount_percent,
  discount_starts_at,
  discount_ends_at,
  category,
  image_url,
  gallery,
  features
) VALUES
  (
    'p1',
    'Essencial Oud - Natura',
    'Intensidad y sofisticación.',
    'Un perfume amaderado intenso, con la nobleza del oud, la madera más preciosa del mundo, combinada con la sensualidad de la copaíba.',
    'Para quienes dejan huella. Essencial Oud combina la opulencia de la madera de oud con el calor de la copaíba, un ingrediente de la biodiversidad brasileña, y toques de especias. Ideal para ocasiones especiales en las noches de Pedro Juan Caballero.',
    380000,
    'Natura',
    10,
    NOW() - INTERVAL '7 days',
    NOW() + INTERVAL '7 days',
    'Perfumes',
    'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1523293188086-b469b97593c0?auto=format&fit=crop&q=80&w=1000'
    ],
    ARRAY['Amaderado Intenso', 'Larga Duración', 'Ingredientes Naturales']
  ),
  (
    'p2',
    'La Roche-Posay Anthelios',
    'Protección solar avanzada.',
    'Protector solar facial de toque seco, ideal para pieles sensibles y mixtas a grasas. FPS 50+.',
    'La máxima protección dermatológica. Anthelios XL ofrece una protección muy alta y de amplio espectro contra los rayos UVA/UVB. Su textura de toque seco, doble anti-brillos, se absorbe inmediatamente y no deja marcas blancas. Es resistente al agua, perfecto para nuestro clima.',
    185000,
    'La Roche-Posay',
    0,
    NULL,
    NULL,
    'Dermocosmetica',
    'https://images.unsplash.com/photo-1556228720-1987bad8b96c?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
      'https://images.unsplash.com/photo-1556228720-1987bad8b96c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000'
    ],
    ARRAY['FPS 50+', 'Toque Seco', 'Sin Parabenos', 'Antioxidante']
  ),
  (
    'p3',
    'Multivitamínico Vitalidad',
    'Energía para tu día a día.',
    'Complejo vitamínico completo con Zinc y Vitamina C para reforzar el sistema inmunológico.',
    'Mantén tu energía al máximo con nuestro complejo multivitamínico premium. Formulado para cubrir las necesidades nutricionales diarias, ayuda a combatir la fatiga, mejora la concentración y fortalece las defensas naturales del cuerpo. Indispensable para una vida activa y saludable.',
    120000,
    'Genérico',
    15,
    NOW() - INTERVAL '2 days',
    NOW() + INTERVAL '5 days',
    'Nutrición y Deporte',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=1000'
    ],
    ARRAY['Inmunidad Reforzada', 'Vitamina C + Zinc', 'Energía Diaria']
  ),
  (
    'p4',
    'CeraVe Hidratante',
    'Restauración de la barrera cutánea.',
    'Crema hidratante para piel seca a muy seca. Desarrollada con dermatólogos.',
    'Hidratación que dura todo el día. Esta crema rica y no grasa, con 3 ceramidas esenciales y ácido hialurónico, hidrata y ayuda a restaurar la barrera protectora de la piel. Tecnología MVE de liberación controlada para una hidratación de 24 horas.',
    145000,
    'CeraVe',
    5,
    NOW() - INTERVAL '1 day',
    NOW() + INTERVAL '10 days',
    'Dermocosmetica',
    'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
      'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1000'
    ],
    ARRAY['Ácido Hialurónico', '3 Ceramidas', 'Sin Perfume']
  ),
  (
    'p5',
    'Good Girl - Carolina Herrera',
    'Es bueno ser mala.',
    'Una fragancia audaz y sofisticada, inspirada en la visión única de Carolina Herrera sobre la dualidad de la mujer moderna.',
    'El icónico tacón de aguja. Good Girl es una fragancia sensual y evocadora, nacida de las hermosas contradicciones y la siempre presente dualidad de la mujer moderna y la vida moderna. Notas de almendra, café, jazmín sambac y cacao.',
    850000,
    'Carolina Herrera',
    0,
    NULL,
    NULL,
    'Perfumes',
    'https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
      'https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=1000'
    ],
    ARRAY['Floral Oriental', 'Diseño Icónico', 'Alta Fijación']
  ),
  (
    'p6',
    'Monitor de Presión Omron',
    'Precisión en tu hogar.',
    'Monitor de presión arterial de brazo automático. Detección de latidos irregulares.',
    'Controla tu salud cardiovascular con confianza. El monitor de presión arterial Omron es fácil de usar y ofrece lecturas precisas y confiables. Cuenta con tecnología Intellisense para un inflado cómodo y detección de hipertensión matutina y latidos irregulares.',
    450000,
    'Omron',
    0,
    NULL,
    NULL,
    'Salud',
    'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
      'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1000'
    ],
    ARRAY['Automático', 'Memoria de Lecturas', 'Validado Clínicamente']
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

COMMIT;
