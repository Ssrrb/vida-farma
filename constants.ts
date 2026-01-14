/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Essencial Oud - Natura',
    tagline: 'Intensidad y sofisticación.',
    description: 'Un perfume amaderado intenso, con la nobleza del oud, la madera más preciosa del mundo, combinada con la sensualidad de la copaíba.',
    longDescription: 'Para quienes dejan huella. Essencial Oud combina la opulencia de la madera de oud con el calor de la copaíba, un ingrediente de la biodiversidad brasileña, y toques de especias. Ideal para ocasiones especiales en las noches de Pedro Juan Caballero.',
    price: 380000,
    category: 'Perfumes',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1523293188086-b469b97593c0?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Amaderado Intenso', 'Larga Duración', 'Ingredientes Naturales']
  },
  {
    id: 'p2',
    name: 'La Roche-Posay Anthelios',
    tagline: 'Protección solar avanzada.',
    description: 'Protector solar facial de toque seco, ideal para pieles sensibles y mixtas a grasas. FPS 50+.',
    longDescription: 'La máxima protección dermatológica. Anthelios XL ofrece una protección muy alta y de amplio espectro contra los rayos UVA/UVB. Su textura de toque seco, doble anti-brillos, se absorbe inmediatamente y no deja marcas blancas. Es resistente al agua, perfecto para nuestro clima.',
    price: 185000,
    category: 'Dermocosmetica',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-1987bad8b96c?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1556228720-1987bad8b96c?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['FPS 50+', 'Toque Seco', 'Sin Parabenos', 'Antioxidante']
  },
  {
    id: 'p3',
    name: 'Multivitamínico Vitalidad',
    tagline: 'Energía para tu día a día.',
    description: 'Complejo vitamínico completo con Zinc y Vitamina C para reforzar el sistema inmunológico.',
    longDescription: 'Mantén tu energía al máximo con nuestro complejo multivitamínico premium. Formulado para cubrir las necesidades nutricionales diarias, ayuda a combatir la fatiga, mejora la concentración y fortalece las defensas naturales del cuerpo. Indispensable para una vida activa y saludable.',
    price: 120000,
    category: 'Nutrición y Deporte',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Inmunidad Reforzada', 'Vitamina C + Zinc', 'Energía Diaria']
  },
  {
    id: 'p4',
    name: 'CeraVe Hidratante',
    tagline: 'Restauración de la barrera cutánea.',
    description: 'Crema hidratante para piel seca a muy seca. Desarrollada con dermatólogos.',
    longDescription: 'Hidratación que dura todo el día. Esta crema rica y no grasa, con 3 ceramidas esenciales y ácido hialurónico, hidrata y ayuda a restaurar la barrera protectora de la piel. Tecnología MVE de liberación controlada para una hidratación de 24 horas.',
    price: 145000,
    category: 'Dermocosmetica',
    imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Ácido Hialurónico', '3 Ceramidas', 'Sin Perfume']
  },
  {
    id: 'p5',
    name: 'Good Girl - Carolina Herrera',
    tagline: 'Es bueno ser mala.',
    description: 'Una fragancia audaz y sofisticada, inspirada en la visión única de Carolina Herrera sobre la dualidad de la mujer moderna.',
    longDescription: 'El icónico tacón de aguja. Good Girl es una fragancia sensual y evocadora, nacida de las hermosas contradicciones y la siempre presente dualidad de la mujer moderna y la vida moderna. Notas de almendra, café, jazmín sambac y cacao.',
    price: 850000,
    category: 'Perfumes',
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Floral Oriental', 'Diseño Icónico', 'Alta Fijación']
  },
  {
    id: 'p6',
    name: 'Monitor de Presión Omron',
    tagline: 'Precisión en tu hogar.',
    description: 'Monitor de presión arterial de brazo automático. Detección de latidos irregulares.',
    longDescription: 'Controla tu salud cardiovascular con confianza. El monitor de presión arterial Omron es fácil de usar y ofrece lecturas precisas y confiables. Cuenta con tecnología Intellisense para un inflado cómodo y detección de hipertensión matutina y latidos irregulares.',
    price: 450000,
    category: 'Salud',
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Automático', 'Memoria de Lecturas', 'Validado Clínicamente']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        title: "Cuidado de la piel en el verano de PJC",
        date: "12 de Abril, 2025",
        excerpt: "Cómo proteger tu piel del intenso sol de la frontera y mantenerla hidratada.",
        image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left text-muted-foreground" },
                "El sol en Pedro Juan Caballero no perdona. Con temperaturas que superan fácilmente los 35 grados, nuestra piel es la primera barrera que sufre las consecuencias. La radiación UV no solo causa quemaduras, sino que acelera el envejecimiento prematuro."
            ),
            React.createElement("p", { className: "mb-8 text-muted-foreground" },
                "La clave no es solo usar protector solar, sino reaplicarlo. Recomendamos un FPS 50+ de amplio espectro, reaplicado cada 2 horas si estás al aire libre. Además, la hidratación interna es fundamental: beber tereré ayuda, ¡pero no olvides el agua pura!"
            ),
            React.createElement("blockquote", { className: "border-l-2 border-primary pl-6 italic text-xl text-foreground my-10 font-serif" },
                "\"Tu piel es tu mejor vestido, cuídala todos los días.\""
            ),
            React.createElement("p", { className: "mb-6 text-muted-foreground" },
                "En VidaFarma, contamos con la línea completa de dermocosmética para cada tipo de piel. Ven a visitarnos para un diagnóstico gratuito."
            )
        )
    },
    {
        id: 2,
        title: "La importancia de la Suplementación",
        date: "28 de Marzo, 2025",
        excerpt: "Entrevista con la Dra. Martínez sobre vitaminas y bienestar general.",
        image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-muted-foreground" },
                "A veces, la dieta no es suficiente. Con el ritmo de vida acelerado que llevamos entre el trabajo y la familia, a menudo descuidamos nuestra nutrición básica."
            ),
            React.createElement("p", { className: "mb-8 text-muted-foreground" },
                "\"No se trata de reemplazar la comida real\", explica la Dra. Martínez, farmacéutica residente. \"Se trata de llenar los vacíos. La vitamina C, el Magnesio y el Zinc son esenciales para mantener nuestras defensas altas, especialmente durante los cambios de estación.\""
            ),
            React.createElement("div", { className: "my-12 p-8 bg-muted font-serif text-foreground italic text-center" },
                React.createElement("p", null, "Salud es equilibrio."),
                React.createElement("p", null, "Cuerpo sano,"),
                React.createElement("p", null, "Mente clara."),
                React.createElement("p", null, "Vida plena.")
            ),
            React.createElement("p", { className: "mb-6 text-muted-foreground" },
                "Consulta siempre con un profesional antes de iniciar cualquier régimen de suplementación. En VidaFarma estamos para asesorarte."
            )
        )
    },
    {
        id: 3,
        title: "Tendencias en Perfumería 2025",
        date: "15 de Marzo, 2025",
        excerpt: "Notas amaderadas y florales que dominarán esta temporada.",
        image: "https://images.unsplash.com/photo-1595535373192-fc04375b9672?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-muted-foreground" },
                "Este año, la perfumería vuelve a lo clásico pero con un giro moderno. Estamos viendo un resurgimiento de las notas de Oud y maderas profundas, suavizadas por toques florales ligeros como la peonía y el jazmín."
            ),
            React.createElement("p", { className: "mb-8 text-muted-foreground" },
                "Las fragancias 'Genderless' o unisex también están ganando terreno en el mercado paraguayo. Aromas limpios, cítricos y especiados que no distinguen género, solo personalidad."
            ),
             React.createElement("div", { className: "my-12 p-8 bg-primary text-primary-foreground font-serif italic text-center" },
                React.createElement("p", null, "El aroma es memoria."),
                React.createElement("p", null, "Deja tu marca,"),
                React.createElement("p", null, "Donde quiera que vayas.")
            )
        )
    }
];

export const BRAND_NAME = 'VidaFarma';
export const PRIMARY_COLOR = 'primary'; 
export const ACCENT_COLOR = 'secondary';