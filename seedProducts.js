const mongoose = require("mongoose");

/* =========================
   MongoDB Connection
========================= */

const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb+srv://novaUser:NovaStore2026@cluster0.fzuyeqi.mongodb.net/nova_store";

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing. Add it in Render or your local .env");
    process.exit(1);
}

mongoose.set("strictQuery", true);
/* =========================
   PRODUCT SCHEMA
========================= */

const colorSchema = new mongoose.Schema({
    name: String,
    hex: String,
    image: String
}, { _id: false });

const connectivitySchema = new mongoose.Schema({
    name: String,
    price: { type: Number, default: 0 },
    priceMod: { type: Number, default: 0 }
}, { _id: false });

const modelSchema = new mongoose.Schema({
    name: String,
    price: { type: Number, default: 0 },
    priceMod: { type: Number, default: 0 },
    basePrice: { type: Number, default: 0 },
    connectivityOptions: [connectivitySchema],
    colors: [colorSchema]
}, { _id: false });

const optionSchema = new mongoose.Schema({
    name: String,
    price: { type: Number, default: 0 },
    priceMod: { type: Number, default: 0 },
    basePrice: { type: Number, default: 0 }
}, { _id: false });

const chipVariantSchema = new mongoose.Schema({
    name: String,
    price: { type: Number, default: 0 },
    priceMod: { type: Number, default: 0 }
}, { _id: false });

const chipSchema = new mongoose.Schema({
    name: String,
    price: { type: Number, default: 0 },
    priceMod: { type: Number, default: 0 },
    allowedModels: [String],
    variants: [chipVariantSchema]
}, { _id: false });

const inventorySchema = new mongoose.Schema({
    color: { type: String, default: null },
    storage: { type: String, default: null },
    model: { type: String, default: null },
    stock: { type: Number, default: 0 }
}, { _id: false });

const specSchema = new mongoose.Schema({
    label: String,
    value: String
}, { _id: false });

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    longDescription: { type: String, default: "" },
    basePrice: { type: Number, required: true },

    isNewProduct: { type: Boolean, default: false },

    bgColor: { type: String, default: "#ffffff" },
    textColor: { type: String, default: "#000000" },

    gallery: [String],
    specs: [specSchema],

    colors: [colorSchema],
    models: [modelSchema],
    storageOptions: [optionSchema],
    sizes: [optionSchema],
    displayOptions: [optionSchema],
    chips: [chipSchema],

    inventory: [inventorySchema]
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

/* =========================
   PRODUCTS
========================= */

const products = [
     {
    name: 'iPhone 15 Pro',
    longDescription: 'The first iPhone with an aerospace-grade titanium design and the A17 Pro chip.',
    basePrice: 3490,
    isNew: false,
     bgColor: '#ffffff',
    textColor: '#000000',
    gallery: [
        'pics/extraimg15pro.jpg',
        'pics/extraimg15pro1.webp',
        'pics/extraimgcam15pro.webp',
    ],

    specs: [
        { label: 'Width', value: '2.78 inches (70.6 mm)' },
        { label: 'Height', value: '5.77 inches (146.6 mm)' },
        { label: 'Depth', value: '0.32 inch (8.25 mm)' },
        { label: 'Weight', value: '6.60 ounces (187 grams)' },
        { label: 'Display', value: '6.1-inch all-screen OLED , Super Retina XDR display, Always-On Display, Dynamic Island' },
        { label: 'Chip', value: 'A17 Pro' },
    { label: 'Apple Intelligence', value: 'Built into your iPhone, Apple Intelligence is the personal intelligence system that helps you write, express yourself, and get things done effortlessly. With groundbreaking privacy protections, it gives you peace of mind that no one else can access your data - not even Apple' },
    { label: 'Camera', value: 'Pro camera system (48MP Main)' },
    { label: 'Resistance', value: 'Rated IP68 (maximum depth of 6 meters up to 30 minutes) under IEC standard 60529' },
    { label: 'Battery', value: 'Up to 23 hours Video Playback' },
    { label: 'Build', value: 'Titanium' },
    { label: 'Safety', value: 'Emergency SOS via Satellite, Crash Detection, Roadside Assistance via Satellite' },
    ],
    
    storageOptions: [
        { name: '128GB', priceMod: 0 }, 
        { name: '256GB', priceMod: 460 }, 
        { name: '512GB', priceMod: 1360 }, 
        { name: '1TB', priceMod: 1960 }
    ],
    colors: [
        { name: 'Black Titanium', hex: '#3C3C3D', image: 'pics/iphone15problack.png',stock: 3 },
        { name: 'Natural Titanium', hex: '#BEAF9E', image: 'pics/iphone15prodesert.jpg',stock: 3 },
        { name: 'Blue Titanium', hex: '#464E5B', image: 'pics/iphone15problue.jpg',stock: 3 },
        { name: 'White Titanium', hex: '#F2F1ED', image: 'pics/iphone15prowhite.jpg',stock: 0 }
    ],
    inventory: [
    { color: 'Natural Titanium', storage: '128GB', stock: 5 },
    { color: 'Natural Titanium', storage: '256GB', stock: 4 },
    { color: 'Natural Titanium', storage: '512GB', stock: 2 },
    { color: 'Natural Titanium', storage: '1TB', stock: 1 },

    { color: 'Blue Titanium', storage: '128GB', stock: 6 },
    { color: 'Blue Titanium', storage: '256GB', stock: 5 },
    { color: 'Blue Titanium', storage: '512GB', stock: 2 },
    { color: 'Blue Titanium', storage: '1TB', stock: 1 },

    { color: 'White Titanium', storage: '128GB', stock: 7 },
    { color: 'White Titanium', storage: '256GB', stock: 5 },
    { color: 'White Titanium', storage: '512GB', stock: 2 },
    { color: 'White Titanium', storage: '1TB', stock: 0 },

    { color: 'Black Titanium', storage: '128GB', stock: 8 },
    { color: 'Black Titanium', storage: '256GB', stock: 6 },
    { color: 'Black Titanium', storage: '512GB', stock: 3 },
    { color: 'Black Titanium', storage: '1TB', stock: 1 }
]
},
    {
    name: 'iPhone 15 Pro Max',
    longDescription: 'The first iPhone with an aerospace-grade titanium design and the A17 Pro chip.',
    basePrice: 4199,
    stock:10,
    isNew: false,
     bgColor: '#000000',
    textColor: '#ffffff',

    specs: [
        { label: 'Width', value: '3.02 inches (76.7 mm)' },
        { label: 'Height', value: '6.29 inches (159.9 mm)' },
        { label: 'Depth', value: '0.32 inch (8.25 mm)' },
        { label: 'Weight', value: '7.81 ounces (221 grams)' },
        { label: 'Display', value: '6.7-inch all-screen OLED , Super Retina XDR display, Always-On display, Dynamic Island' },
        { label: 'Chip', value: 'A17 Pro' },
        { label: 'Apple Intelligence', value: 'Built into your iPhone,' },
    { label: 'Camera', value: 'Pro camera system (48MP Main)' },
    { label: 'Resistance', value: 'Rated IP68 (maximum depth of 6 meters up to 30 minutes) under IEC standard 60529' },
    { label: 'Battery', value: 'Up to 23 hours video playback' },
    { label: 'Build', value: 'Titanium' },
    { label: 'Safety', value: 'Emergency SOS via satellite, Crash Detection, Roadside Assistance via satellite' },
    ],
    
    storageOptions: [
        { name: '256GB', priceMod: 0 }, 
        { name: '512GB', priceMod: 851 }, 
        { name: '1TB', priceMod: 1901 }
    ],
    colors: [
          { name: 'Black Titanium', hex: '#3C3C3D', image: 'pics/iphone15problack.png' },
        { name: 'Natural Titanium', hex: '#BEAF9E', image: 'pics/iphone15prodesert.jpg' },
        { name: 'Blue Titanium', hex: '#464E5B', image: 'pics/iphone15problue.jpg' },
        { name: 'White Titanium', hex: '#F2F1ED', image: 'pics/iphone15prowhite.jpg' }
    ],
    inventory: [
    { color: 'Natural Titanium', storage: '128GB', stock: 5 },
    { color: 'Natural Titanium', storage: '256GB', stock: 4 },
    { color: 'Natural Titanium', storage: '512GB', stock: 2 },
    { color: 'Natural Titanium', storage: '1TB', stock: 1 },

    { color: 'Blue Titanium', storage: '128GB', stock: 6 },
    { color: 'Blue Titanium', storage: '256GB', stock: 5 },
    { color: 'Blue Titanium', storage: '512GB', stock: 2 },
    { color: 'Blue Titanium', storage: '1TB', stock: 1 },

    { color: 'White Titanium', storage: '128GB', stock: 7 },
    { color: 'White Titanium', storage: '256GB', stock: 5 },
    { color: 'White Titanium', storage: '512GB', stock: 2 },
    { color: 'White Titanium', storage: '1TB', stock: 0 },

    { color: 'Black Titanium', storage: '128GB', stock: 8 },
    { color: 'Black Titanium', storage: '256GB', stock: 6 },
    { color: 'Black Titanium', storage: '512GB', stock: 3 },
    { color: 'Black Titanium', storage: '1TB', stock: 1 }
]
},

    // --- iPHONE 16 SERIES ---
    {
    name: 'iPhone 16',
    longDescription: 'Built for Apple Intelligence. Featuring the all-new Camera Control and the A18 chip.',
    isNew: true, // It's the 16, so usually marked as new!
    basePrice: 2199,
    bgColor: '#ffffff',
    stock:10,
    textColor: '#ffffff',
     gallery: [
        'pics/extraimg16-1.png',
        'pics/extraimg16-2.webp',
        'pics/extraimg16-3.png',
    ],
    
    // This matches your v-for="m in selectedProduct.models"
    models: [
        { 
            name: 'iPhone 16', 
            description: '6.1-inch display', 
            price: 2999 ,
        },
        { 
            name: 'iPhone 16 Plus', 
            description: '6.7-inch display', 
            price: 3399 
        }
    ],

    // Global specs shared by both
    specs: [
        { label: 'Chip', value: 'A18 Chip' },
        { label: 'Control', value: 'Camera Control' },
        { label: 'Camera', value: '48MP Fusion' }
    ],

    // This matches your v-for="s in selectedProduct.storageOptions"
    storageOptions: [
        { name: '128GB', priceMod: 0 }, 
        { name: '256GB', priceMod: 400 }, 
        { name: '512GB', priceMod: 800 }
    ],

    colors: [
        { name: 'Ultramarine', hex: '#6373b8', image: 'pics/iphone16ultramine.png' },
        { name: 'Teal', hex: '#87a8a4', image: 'pics/iphone16teal.png' },
        { name: 'Pink', hex: '#f0adb7', image: 'pics/iphone16pink.png' },
        { name: 'White', hex: '#ffffff', image: 'pics/iphone16white.png' },
        { name: 'Black', hex: '#323433', image: 'pics/iphone16black.png' }
    ],
    inventory: [
    // iPhone 16 (6.1")
    { model: 'iPhone 16', color: 'Ultramarine', storage: '128GB', stock: 8 },
    { model: 'iPhone 16', color: 'Ultramarine', storage: '256GB', stock: 6 },
    { model: 'iPhone 16', color: 'Ultramarine', storage: '512GB', stock: 4 },

    { model: 'iPhone 16', color: 'Teal', storage: '128GB', stock: 7 },
    { model: 'iPhone 16', color: 'Teal', storage: '256GB', stock: 5 },
    { model: 'iPhone 16', color: 'Teal', storage: '512GB', stock: 3 },

    { model: 'iPhone 16', color: 'Pink', storage: '128GB', stock: 9 },
    { model: 'iPhone 16', color: 'Pink', storage: '256GB', stock: 6 },
    { model: 'iPhone 16', color: 'Pink', storage: '512GB', stock: 3 },

    { model: 'iPhone 16', color: 'White', storage: '128GB', stock: 10 },
    { model: 'iPhone 16', color: 'White', storage: '256GB', stock: 7 },
    { model: 'iPhone 16', color: 'White', storage: '512GB', stock: 4 },

    { model: 'iPhone 16', color: 'Black', storage: '128GB', stock: 11 },
    { model: 'iPhone 16', color: 'Black', storage: '256GB', stock: 8 },
    { model: 'iPhone 16', color: 'Black', storage: '512GB', stock: 5 },

    // iPhone 16 Plus (6.7")
    { model: 'iPhone 16 Plus', color: 'Ultramarine', storage: '128GB', stock: 6 },
    { model: 'iPhone 16 Plus', color: 'Ultramarine', storage: '256GB', stock: 4 },
    { model: 'iPhone 16 Plus', color: 'Ultramarine', storage: '512GB', stock: 2 },

    { model: 'iPhone 16 Plus', color: 'Teal', storage: '128GB', stock: 5 },
    { model: 'iPhone 16 Plus', color: 'Teal', storage: '256GB', stock: 3 },
    { model: 'iPhone 16 Plus', color: 'Teal', storage: '512GB', stock: 2 },

    { model: 'iPhone 16 Plus', color: 'Pink', storage: '128GB', stock: 7 },
    { model: 'iPhone 16 Plus', color: 'Pink', storage: '256GB', stock: 4 },
    { model: 'iPhone 16 Plus', color: 'Pink', storage: '512GB', stock: 2 },

    { model: 'iPhone 16 Plus', color: 'White', storage: '128GB', stock: 8 },
    { model: 'iPhone 16 Plus', color: 'White', storage: '256GB', stock: 5 },
    { model: 'iPhone 16 Plus', color: 'White', storage: '512GB', stock: 3 },

    { model: 'iPhone 16 Plus', color: 'Black', storage: '128GB', stock: 9 },
    { model: 'iPhone 16 Plus', color: 'Black', storage: '256GB', stock: 6 },
    { model: 'iPhone 16 Plus', color: 'Black', storage: '512GB', stock: 3 }
]
},
{
    name: 'iPhone 16 Pro',
    longDescription: 'A larger display. A faster chip. Advanced Camera Control. Pro in every way.',
    basePrice: 3899,
    isNew: false,
    bgColor: '#000000',
    textColor: '#ffffff',
    gallery: [
        'pics/extraimg16pro1.jpg',
        'pics/extraimg16pro2.jpg',
        'pics/extraimg16pro3.jpg',
    ],
    specs: [
        { label: 'Chip', value: 'A18 Pro (3nm) <i class="fa-solid fa-microchip"></i>' },
        { label: 'Display', value: '6.3" ProMotion <i class="fa-solid fa-mobile-screen-button"></i>' },
        { label: 'Camera', value: '48MP Triple Lens <i class="fa-solid fa-camera"></i>' },
        { label: 'Build', value: 'Titanium <i class="fa-solid fa-gem"></i>' },
        { label: 'Battery', value: '27 Hours Playback <i class="fa-solid fa-battery-three-quarters"></i>' },
        { label: 'Control', value: 'Camera Control <i class="fa-solid fa-circle-dot"></i>' },
        { label: 'Video', value: '4K 120 fps <i class="fa-solid fa-film"></i>' },
        { label: 'Zoom', value: '5x Optical Zoom <i class="fa-solid fa-magnifying-glass-plus"></i>' }
    ],
    storageOptions: [
        { name: '128GB', priceMod: 0 },
        { name: '256GB', priceMod: 400 },
        { name: '512GB', priceMod: 800 },
        { name: '1TB', priceMod: 1200 }
    ],
    colors: [
        { name: 'Desert Titanium', hex: '#cbbba1', image: 'pics/iphone16prodesert.jpg' },
        { name: 'Black Titanium', hex: '#3c3c3d', image: 'pics/iphone16problack.png' },
        { name: 'White Titanium', hex: '#F2F1ED', image: 'pics/Iphone16prowhite.png' },
        { name: 'Natural Titanium', hex: '#878787', image: 'pics/iphone16pronatural.jpg' }
    ],
    inventory: [
        { color: 'Desert Titanium', storage: '128GB', stock: 9 },
        { color: 'Desert Titanium', storage: '256GB', stock: 7 },
        { color: 'Desert Titanium', storage: '512GB', stock: 5 },
        { color: 'Desert Titanium', storage: '1TB', stock: 3},

        { color: 'Black Titanium', storage: '128GB', stock: 1 },
        { color: 'Black Titanium', storage: '256GB', stock: 2 },
        { color: 'Black Titanium', storage: '512GB', stock: 2 },
        { color: 'Black Titanium', storage: '1TB', stock: 2 },

        { color: 'White Titanium', storage: '128GB', stock:2 },
        { color: 'White Titanium', storage: '256GB', stock: 10 },
        { color: 'White Titanium', storage: '512GB', stock: 1 },
        { color: 'White Titanium', storage: '1TB', stock: 0 },

        { color: 'Natural Titanium', storage: '128GB', stock: 1 },
        { color: 'Natural Titanium', storage: '256GB', stock: 0 },
        { color: 'Natural Titanium', storage: '512GB', stock: 10 },
        { color: 'Natural Titanium', storage: '1TB', stock: 10 }
    ]
},
     {
        name: 'iPhone 16 Pro Max',
        longDescription: 'A larger display. A faster chip. Advanced Camera Control. Pro in every way.',
        basePrice: 3899,
        isNew: false,
         bgColor: '#000000',
    textColor: '#ffffff',
    gallery: [
        'pics/extraimg16pro1.jpg',
        'pics/extraimg16pro2.jpg',
        'pics/extraimg16pro3.jpg',
    ],
        specs: [
           { label: 'Chip', value: 'A18 Pro (3nm) <i class="fa-solid fa-microchip"></i>' },
    { label: 'Display', value: '6.9" ProMotion <i class="fa-solid fa-mobile-screen-button"></i>' },
    { label: 'Camera', value: '48MP Triple Lens <i class="fa-solid fa-camera"></i>' },
    { label: 'Build', value: 'Titanium <i class="fa-solid fa-gem"></i>' },
    { label: 'Battery', value: '33 Hours Playback <i class="fa-solid fa-battery-three-quarters"></i>' },
    { label: 'Control', value: 'Camera Control <i class="fa-solid fa-circle-dot"></i>' },
    { label: 'Video', value: '4K 120 fps <i class="fa-solid fa-film"></i>' },
    { label: 'Zoom', value: '5x Optical Zoom <i class="fa-solid fa-magnifying-glass-plus"></i>' }
        ],
        storageOptions: [ { name: '256GB', priceMod: 400 }, { name: '512GB', priceMod: 800 }, { name: '1TB', priceMod: 1200 }],
        colors: [
            { name: 'Desert Titanium', hex: '#cbbba1', image: 'pics/iphone16prodesert.jpg' },
            { name: 'Black Titanium', hex: '#3c3c3d', image: 'pics/iphone16problack.png' },
            { name: 'White Titanium', hex: '#F2F1ED', image: 'pics/Iphone16prowhite.png' },
            { name: 'Natural Titanium', hex: '#878787', image: 'pics/iphone16pronatural.jpg' }
        ],
         inventory: [
        { color: 'Desert Titanium', storage: '256GB', stock: 7 },
        { color: 'Desert Titanium', storage: '512GB', stock: 5 },
        { color: 'Desert Titanium', storage: '1TB', stock: 3},

        { color: 'Black Titanium', storage: '256GB', stock: 2 },
        { color: 'Black Titanium', storage: '512GB', stock: 2 },
        { color: 'Black Titanium', storage: '1TB', stock: 2 },

        { color: 'White Titanium', storage: '256GB', stock: 10 },
        { color: 'White Titanium', storage: '512GB', stock: 1 },
        { color: 'White Titanium', storage: '1TB', stock: 0 },

        { color: 'Natural Titanium', storage: '256GB', stock: 0 },
        { color: 'Natural Titanium', storage: '512GB', stock: 10 },
        { color: 'Natural Titanium', storage: '1TB', stock: 10 }
    ]
        
        
    },

    // --- iPHONE 17 SERIES (2026 Concepts) ---
    {
        name: 'iPhone 17',
        longDescription: 'The new standard. Featuring the A19 chip and the all-new 18MP Center Stage front camera.',
        basePrice: 3199,
        stock:10,
        isNew: true,
        bgColor: '#000000',
    textColor: '#ffffff',
        specs: [
           { label: 'Chip', value: 'A19 (3nm) <i class="fa-solid fa-microchip"></i>' },
    { label: 'Display', value: '6.3" ProMotion 120Hz <i class="fa-solid fa-mobile-screen-button"></i>' },
    { label: 'Camera', value: '48MP Fusion Dual <i class="fa-solid fa-camera"></i>' },
    { label: 'Selfie', value: '24MP TrueDepth <i class="fa-solid fa-user-plus"></i>' },
    { label: 'Build', value: 'Aluminium <i class="fa-solid fa-cubes"></i>' },
    { label: 'Battery', value: '30 Hours Playback <i class="fa-solid fa-battery-half"></i>' }
        ],
        storageOptions: [{ name: '128GB', priceMod: 0 },{ name: '256GB', priceMod: 400 }, { name: '512GB', priceMod: 800 }],
        colors: [
            { name: 'Mist Blue', hex: '#d1e1e8', image: 'pics/iphone17blue.jpg' },
            { name: 'Sage', hex: '#b7c9b0', image: 'pics/iphone17greeen.jpg' },
            { name: 'Lavender', hex: '#e6e6fa', image: 'pics/iphone17purple.jpg' },
            { name: 'Black', hex: '#1d1d1f', image: 'pics/iphone17black.jpg' },
            { name: 'White', hex: '#f5f5f7', image: 'pics/iphone17white.jpg' },
        ],
        inventory: [
    { color: 'Lavender', storage: '128GB', stock: 8 },
    { color: 'Lavender', storage: '256GB', stock: 6 },
    { color: 'Lavender', storage: '512GB', stock: 2 },

    { color: 'Sage', storage: '128GB', stock: 5 },
    { color: 'Sage', storage: '256GB', stock: 3 },
    { color: 'Sage', storage: '512GB', stock: 1 },

    { color: 'Mist Blue', storage: '128GB', stock: 9 },
    { color: 'Mist Blue', storage: '256GB', stock: 4 },
    { color: 'Mist Blue', storage: '512GB', stock: 2 },

    { color: 'White', storage: '128GB', stock: 7 },
    { color: 'White', storage: '256GB', stock: 5 },
    { color: 'White', storage: '512GB', stock: 2 },

    { color: 'Black', storage: '128GB', stock: 6 },
    { color: 'Black', storage: '256GB', stock: 4 },
    { color: 'Black', storage: '512GB', stock: 1 }
]
    },
    {
        name: 'iPhone 17 Pro',
        longDescription: ' Super Retina XDR display10 ProMotion technology Always-On display Dynamic Island',
        basePrice: 4799,
        stock:10,
        isNew: true,
        bgColor: '#000000',
    textColor: '#ffffff',
    gallery: [
        'pics/extraimg17pro1.jpg',
        'pics/extraimg17pro2.jpg',
        'pics/extraimg17pro4.jpg'
    ],
        specs: [
            { label: 'Chip', value: 'A19 Pro (3nm) <i class="fa-solid fa-microchip"></i>' },
    { label: 'Display', value: '6.3" ProMotion <i class="fa-solid fa-mobile-screen-button"></i>' },
    { label: 'Camera', value: '48MP Triple Lens <i class="fa-solid fa-camera-retro"></i>' },
            { label: 'Build', value: 'Aluminium <i class="fa-solid fa-gem"></i>' },
           { label: 'Battery', value: '39 Hours Playback <i class="fa-solid fa-battery-three-quarters"></i>'}
        ],
        storageOptions: [{ name: '256GB', priceMod: 0 }, { name: '512GB', priceMod: 500 }, { name: '1TB', priceMod: 1100 }, { name: '2TB', priceMod: 2200 }],
        colors: [
            { name: 'Cosmic Orange', hex: '#FF4F00', image: 'pics/cosmicorangetransparent.png' },
               { name: 'Deep Blue', hex: '#00008B', image: 'pics/17blue.png' },
            { name: 'Silver', hex: '#B2B3B1', image: 'pics/iphone17silver.png' }
        ],
        inventory: [
    { color: 'Cosmic Orange', storage: '256GB', stock: 7 },
    { color: 'Cosmic Orange', storage: '512GB', stock: 5 },
    { color: 'Cosmic Orange', storage: '1TB', stock: 3 },

    { color: 'Deep Blue', storage: '256GB', stock: 6 },
    { color: 'Deep Blue', storage: '512GB', stock: 4 },
    { color: 'Deep Blue', storage: '1TB', stock: 2 },

    { color: 'Silver', storage: '256GB', stock: 10 },
    { color: 'Silver', storage: '512GB', stock: 6 },
    { color: 'Silver', storage: '1TB', stock: 1 }
]
    },

    {
        name: 'iPhone 17 Pro Max',
        longDescription: ' Super Retina XDR display10 ProMotion technology Always-On display Dynamic Island',
        basePrice: 5099,
        stock:0,
        isNew: true,
        bgColor: '#000000',
    textColor: '#ffffff',
    gallery: [
        'pics/extraimg17pro1.jpg',
        'pics/extraimg17pro2.jpg',
        'pics/extraimg17pro3.jpg'
    ],
        specs: [
           { label: 'Chip', value: 'A19 Pro (3nm) <i class="fa-solid fa-microchip"></i>' },
    { label: 'Display', value: '6.9" Super Retina <i class="fa-solid fa-mobile-screen"></i>' },
    { label: 'Camera', value: '48MP Pro System <i class="fa-solid fa-camera"></i>' },
    { label: 'Battery', value: '39 Hours Playback <i class="fa-solid fa-battery-full"></i>' },
    { label: 'Build', value: 'Aluminium Unibody <i class="fa-solid fa-gem"></i>' },
    { label: 'Video', value: '8K Recording <i class="fa-solid fa-video"></i>' },
    { label: 'Memory', value: '12GB LPDDR5X <i class="fa-solid fa-memory"></i>' },
        ],
       
        storageOptions: 
        [{ name: '256GB', priceMod: 0 }, 
         { name: '512GB', priceMod: 500 },
         { name: '1TB', priceMod: 1100 },
         { name: '2TB', priceMod: 2200 }],
      
        colors: [
        { name: 'Cosmic Orange', hex: '#FF4F00', image: 'pics/cosmicorangetransparent.png' },
        { name: 'Deep Blue', hex: '#00008B', image: 'pics/17blue.png' },
        { name: 'Silver', hex: '#B2B3B1', image: 'pics/iphone17silver.png' }
        ],
        inventory: [
        { color: 'Cosmic Orange', storage: '256GB', stock: 7 },
        { color: 'Cosmic Orange', storage: '512GB', stock: 5 },
        { color: 'Cosmic Orange', storage: '1TB', stock: 3 },

        { color: 'Deep Blue', storage: '256GB', stock: 6 },
        { color: 'Deep Blue', storage: '512GB', stock: 4 },
        { color: 'Deep Blue', storage: '1TB', stock: 2 },

        { color: 'Silver', storage: '256GB', stock: 10 },
        { color: 'Silver', storage: '512GB', stock: 6 },
        { color: 'Silver', storage: '1TB', stock: 1 }
]
    },
    {
        name: 'iPhone Air',
        longDescription: 'Impossibly thin. Remarkably powerful. The thinnest iPhone ever made with an ultra-thin aluminum unibody.',
        basePrice: 4299,
        bgColor: '#000000',
    textColor: '#ffffff',
        specs: [
            { label: 'Chip', value: 'A19 Chip'  },
            { label: 'Display', value: '6.6" OLED' },
            { label: 'Depth', value: '5.0mm' },
            { label: 'Weight', value: 'Ultra-light' },
            { label: 'Main Camera', value: '48MP Fusion' },
{ label: 'Chip', value: 'A19 Pro (Slim Edition) <i class="fa-solid fa-microchip"></i>' },
    { label: 'Design', value: '5.6mm Ultra-Thin <i class="fa-solid fa-feather"></i>' },
    { label: 'Display', value: '6.5" ProMotion <i class="fa-solid fa-mobile-screen"></i>' },
    { label: 'Main Camera', value: '48MP Fusion Plateau <i class="fa-solid fa-camera"></i>' },
    { label: 'Selfie', value: '18MP Center Stage <i class="fa-solid fa-user-plus"></i>' },
    { label: 'Build', value: 'Mirror-Finish Titanium <i class="fa-solid fa-gem"></i>' },
    { label: 'Battery', value: '27 Hours Playback <i class="fa-solid fa-battery-half"></i>' },
    { label: 'Memory', value: '12GB Unified RAM <i class="fa-solid fa-memory"></i>' }

        ],
        storageOptions: [{ name: '256GB', priceMod: 0 }, { name: '512GB', priceMod: 850 },{ name: '1TB', priceMod: 1700 }],
        colors: [
            { name: 'Sky Blue', hex: '#87CEEB', image: 'pics/iphoneairskyblue.png' },
            { name: 'Light Gold', hex: '#F1E5AC', image: 'pics/iphoneairlightgold.png' },
             { name: 'Black', hex: '#000000', image: 'pics/iphoneairblack.png' },
              { name: 'White', hex: '#ffffff', image: 'pics/iphoneairwhite.png' }
        ],
        inventory: [
    { color: 'Sky Blue', storage: '128GB', stock: 6 },
    { color: 'Sky Blue', storage: '256GB', stock: 4 },
    { color: 'Sky Blue', storage: '512GB', stock: 1 },

    { color: 'White', storage: '128GB', stock: 5 },
    { color: 'White', storage: '256GB', stock: 3 },
    { color: 'White', storage: '512GB', stock: 1 },

    { color: 'Black', storage: '128GB', stock: 7 },
    { color: 'Black', storage: '256GB', stock: 4 },
    { color: 'Black', storage: '512GB', stock: 2 }
]   
    },
    //watch
 {
    name: 'Watch SE 3',
    longDescription: 'Essential features to keep you active, healthy, and connected. Featuring fitness tracking, Crash Detection, and seamless Apple ecosystem integration.',
    basePrice: 999,
     bgColor: '#000000',
    textColor: '#ffffff',

    models: [
        {
            name: '40mm',
            price:0,
            connectivityOptions: [
                { name: 'GPS', price: 0 },
                { name: 'GPS + Cellular', price: 200 }
            ]
        },
        {
            name: '44mm',
            price:200,
            connectivityOptions: [
                { name: 'GPS', price: 0 },
                { name: 'GPS + Cellular', price: 200 }
            ]
        }
    ],

    colors: [
        { name: 'Midnight', hex: '#1A1A1A', image: 'pics/applewatchse3midnight.jpg' },
        { name: 'Starlight', hex: '#F0EDE5', image: 'pics/applewatchse3starlight.jpg' }
    ],

    inventory: [
        // Midnight
        { color: 'Midnight', model: '40mm', stock: 5 },
        { color: 'Midnight', model: '44mm', stock: 5 },

        // Starlight
        { color: 'Starlight', model: '40mm', stock: 5 },
        { color: 'Starlight', model: '44mm', stock: 4 }
    ]
},
    {
    name: 'Watch Series 11',
    longDescription: 'Groundbreaking health insights. Featuring Hypertension notifications, Sleep Score, and advanced connectivity.',
    basePrice: 1599,
    bgColor: '#ffffff',
    textColor: '#000000',

    specs: [
        { label: 'Health', value: 'Hypertension Alerts' },
        { label: 'Battery', value: '24 Hours' },
        { label: 'Network', value: 'GPS / GPS + Cellular' },
        { label: 'Glass', value: '2x Scratch Resist' }
    ],

    models: [
        {
            name: 'Aluminium',
            price: 0,
            connectivityOptions: [
                { name: 'GPS', price: 0 },
                { name: 'GPS + Cellular', price: 400 }
            ],
            colors: [
                { name: 'Jet Black', hex: '#000000', image: 'pics/watch11jetblack.png' },
                { name: 'Rose Gold', hex: '#B76E79', image: 'pics/watch11rosegold.png' },
                { name: 'Silver', hex: '#C0C0C0', image: 'pics/watch11silver.png' },
                { name: 'Blue', hex: '#5A6D8A', image: 'pics/watchseries11grey.png' }
            ]
        },
        {
            name: 'Titanium',
            price: 4300,
            connectivityOptions: [
                { name: 'GPS + Cellular', price: 0 }
            ],
            colors: [
                { name: 'Natural', hex: '#8F8A81', image: 'pics/applewatchsereis11black.png' },
                { name: 'Gold', hex: '#BFA37A', image: 'pics/watchseries11gold.png' },
                { name: 'Slate', hex: '#5C5C5C', image: 'pics/watchseries11natural.png' }
            ]
        }
    ],

    sizes: [
        { name: '42mm', basePrice: 0 },
        { name: '46mm', basePrice: 150 }
    ],
   inventory: [
    // Aluminium
    { color: 'Jet Black', model: 'Aluminium',  stock: 5 },
    { color: 'Jet Black', model: 'Aluminium',  stock: 3 },

    { color: 'Silver', model: 'Aluminium',  stock: 6 },
    { color: 'Silver', model: 'Aluminium',  stock: 4 },

    { color: 'Rose Gold', model: 'Aluminium',  stock: 4 },
    { color: 'Rose Gold', model: 'Aluminium',  stock: 2 },

    { color: 'Blue', model: 'Aluminium',  stock: 3 },
    { color: 'Blue', model: 'Aluminium',  stock: 2 },

    // Titanium
    { color: 'Natural', model: 'Titanium',  stock: 2 },
    { color: 'Natural', model: 'Titanium',  stock: 1 },

    { color: 'Slate', model: 'Titanium', stock: 2 },
    { color: 'Slate', model: 'Titanium',  stock: 1 },

    { color: 'Gold', model: 'Titanium', stock: 2 },
    { color: 'Gold', model: 'Titanium',  stock: 1 }
]
},
    //iPad
   {
    name: 'iPad Pro',
    longDescription: 'The most advanced iPad ever. Featuring the powerful M4 chip, Ultra Retina XDR display, and pro-level performance in an incredibly thin design.',
    basePrice: 4199,

    specs: [
        { label: 'Chip', value: 'Apple M4 (3nm)' },
        { label: 'Display', value: 'Ultra Retina XDR (Tandem OLED), ProMotion, True Tone' },
        { label: 'Resolution', value: 'Up to 2752 x 2064' },
        { label: 'Rear Camera', value: '12MP Wide, LiDAR Scanner, 4K Video' },
        { label: 'Front Cam', value: '12MP Ultra Wide (Landscape), Center Stage' },
        { label: 'Connectivity', value: 'Wi-Fi 6E, Bluetooth 5.3, Optional 5G (eSIM)' },
        { label: 'SIM', value: 'eSIM only (UAE)' },
        { label: 'Battery', value: 'Up to 10 hours usage' },
        { label: 'Charging', value: 'USB-C (Thunderbolt 4)' },
        { label: 'Audio', value: 'Four-speaker audio, studio-quality mics' },
        { label: 'Security', value: 'Face ID' },
        { label: 'Apple Pencil', value: 'Apple Pencil Pro supported' },
        { label: 'Build', value: 'Ultra-thin aluminum design' },
        { label: 'Weight', value: 'Approx. 444g (11") / 579g (13")' }
    ],

    bgColor: '#000000',
    textColor: '#ffffff',

    gallery: [
        'pics/extraimgipadpro1.jpg',
        'pics/extraimgipadpro2.jpg',
        'pics/extraimgipadpro3.jpg'
    ],

    models: [
        {
            name: '11-inch',
            price: 0,
            connectivityOptions: [
                { name: 'Wi-Fi', price: 0 },
                { name: 'Wi-Fi + Cellular', price:0 }
            ]
        },
        {
            name: '13-inch',
            price: 1300,
            connectivityOptions: [
                { name: 'Wi-Fi', price: 0 },
                { name: 'Wi-Fi + Cellular', price: 800 }
            ]
        }
    ],

    storageOptions: [
        { name: '256GB', priceMod: 0 },
        { name: '512GB', priceMod: 800 },
        { name: '1TB ', priceMod: 2400 },
         { name: '2TB ', priceMod: 4000 }
    ],

    colors: [
        { name: 'Space Black', hex: '#1C1C1E', image: 'pics/ipadpro-1.jpg' },
        { name: 'Silver', hex: '#E3E4E5', image: 'pics/ipadpro-2.jpg' }
    ],

    inventory: [
        { color: 'Space Black', storage: '256GB', stock: 8 },
        { color: 'Space Black', storage: '512GB', stock: 6 },
        { color: 'Space Black', storage: '1TB ', stock: 3 },
        { color: 'Space Black', storage: '2TB ', stock: 3 },

        { color: 'Silver', storage: '256GB', stock: 7 },
        { color: 'Silver', storage: '512GB', stock: 5 },
        { color: 'Silver', storage: '1TB ', stock: 2 },
        { color: 'Silver', storage: '2TB ', stock: 2 }
    ]
},
{
    name: 'iPad Air',
    longDescription: 'The ultimate iPad experience. Tandem OLED Ultra Retina XDR display powered by the M4 chip.',
    basePrice: 2499,
    bgColor: '#000000',
    textColor: '#ffffff',

    specs: [
    { label: 'Chip', value: 'Apple M4' },
    { label: 'Display', value: '11"/13" Ultra Retina XDR (Tandem OLED), ProMotion, True Tone' },
    { label: 'Resolution', value: 'Up to 2752 x 2064 pixels' },
    { label: 'Rear Camera', value: '12MP Wide, Smart HDR 5, 4K Video' },
    { label: 'Front Cam', value: '12MP Ultra Wide (Landscape), Center Stage' },
    { label: 'Connectivity', value: 'Wi-Fi 6E, Bluetooth 5.3, Optional 5G (eSIM)' },
    { label: 'SIM', value: 'eSIM only (UAE models)' },
    { label: 'Battery', value: 'Up to 10 hours web/video usage' },
    { label: 'Charging', value: 'USB-C (Thunderbolt 4 support)' },
    { label: 'Audio', value: 'Landscape stereo speakers, dual microphones' },
    { label: 'Security', value: 'Touch ID (top button)' },
    { label: 'Apple Pencil', value: 'Supports Apple Pencil Pro & USB-C Pencil' },
    { label: 'Build', value: 'Recycled aluminum enclosure' },
    { label: 'Weight', value: 'Approx. 460g (11") / 610g (13")' }
],

    models: [
        {
            name: '11-inch',
            price: 0,
            connectivityOptions: [
                { name: 'Wi-Fi', price: 0 },
                { name: 'Wi-Fi + Cellular', price: 600 }
            ]
        },
        {
            name: '13-inch',
            price: 800,
            connectivityOptions: [
                { name: 'Wi-Fi', price: 0 },
                { name: 'Wi-Fi + Cellular', price: 600 }
            ]
        }
    ],

    storageOptions: [
        { name: '128GB', priceMod: 0 },
        { name: '256GB', priceMod: 400 },
        { name: '512GB', priceMod: 1200 },
        { name: '1TB ', priceMod: 2000 }
    ],

    colors: [
        { name: 'Space Black', hex: '#2C2C2E', image: 'pics/ipadairspacegrey.jpg' },
        { name: 'Blue', hex: '#87CEEB', image: 'pics/ipadairblue.jpg' },
        { name: 'Purple', hex: '#AF8FFF', image: 'pics/ipadairpurple.jpg' },
        { name: 'Starlight', hex: '#F5F5DC', image: 'pics/ipadairstarlight.jpg' }
    ],

    // ✅ INVENTORY (COLOR + STORAGE)
    inventory: [
        // Space Black
        { color: 'Space Black', storage: '128GB', stock: 10 },
        { color: 'Space Black', storage: '256GB', stock: 8 },
        { color: 'Space Black', storage: '512GB', stock: 5 },
        { color: 'Space Black', storage: '1TB ', stock: 5 },

        // Blue
        { color: 'Blue', storage: '128GB', stock: 9 },
        { color: 'Blue', storage: '256GB', stock: 6 },
        { color: 'Blue', storage: '512GB', stock: 4 },
        { color: 'Blue', storage: '1TB ', stock: 2 },

        // Purple
        { color: 'Purple', storage: '128GB', stock: 7 },
        { color: 'Purple', storage: '256GB', stock: 5 },
        { color: 'Purple', storage: '512GB', stock: 3 },
        { color: 'Purple', storage: '1TB ', stock: 2 },

        // Starlight
        { color: 'Starlight', storage: '128GB', stock: 8 },
        { color: 'Starlight', storage: '256GB', stock: 6 },
        { color: 'Starlight', storage: '512GB', stock: 4 },
        { color: 'Starlight', storage: '1TB ', stock: 2 }
    ],

    gallery: [
        'pics/extraimgipadair1.jpg',
        'pics/extraimgipadair2.jpg',
        'pics/extraimgipadair3.jpg'
    ]
},
    //Mac
    {
    name: 'MacBook Pro',
    longDescription: 'The most powerful MacBook Pro, supercharged with the new Apple M5 family of chips.',
    basePrice: 7199,
    isNew: true,
    bgColor: '#000000',
    textColor: '#ffffff',
    gallery: [
        'pics/extraimgmacbookpro1.png',
        'pics/extraimgmacbookpro2.png',
    ],

    models: [
        { name: '14 inch', price: 0 },
        { name: '16 inch', price: 4300 }
    ],

    displayOptions: [
        { name: 'Standard Display', price: 0 },
        { name: 'Nano-texture Display', price: 675 }
    ],

    chips: [
    {
        name: 'M5 Chip',
        price: 0,
        allowedModels: ['14 inch'],
        variants: [
            { name: '10-core CPU, 10-core GPU, 16-core Neural Engine', price: 0 }
    ]
    },
    {
        name: 'M5 Pro Chip',
        price: 2100,
        allowedModels: ['14 inch', '16 inch'],
        variants: [
            { name: '15-core CPU, 16-core GPU', price: 0 },
            { name: '18-core CPU, 20-core GPU', price: 900 }
        ],
    },
    {
        name: 'M5 Max Chip',
        price: 8300,
        allowedModels: ['14 inch', '16 inch'],
        variants: [
            { name: '18-core CPU, 32-core GPU', price: 0 },
            { name: '18-core CPU, 40-core GPU', price: 1350 }
        ],
    }
],

    colors: [
        { name: 'Space Black', hex: '#1c1c1e', image: 'pics/macbookproblack.png' },
        { name: 'Silver', hex: '#d9d9d9', image: 'pics/macbookprowhite.png' }
    ],

    specs: [
        { label: 'Display', value: 'Liquid Retina XDR' },
    { label: 'Camera', value: '12MP Center Stage' },
    { label: 'Audio', value: 'Six-speaker sound system' },
    { label: 'Ports', value: 'HDMI, SDXC, Thunderbolt 5' }, 

    { label: 'Memory Bandwidth', value: 'Up to 400GB/s' },
    { label: 'Neural Engine', value: 'Enhanced 20-core for Applied AI' },
    { label: 'Wireless', value: 'Wi-Fi 7 and Bluetooth 5.4' },
    { label: 'Security', value: 'Touch ID with Secure Enclave' },
    { label: 'Battery', value: 'Up to 22 hours of professional use' }
    ],
    inventory: [
    { color: 'Space Black', model: '14 inch', stock: 3 },
    { color: 'Space Black', model: '16 inch', stock: 1 },

    { color: 'Silver', model: '14 inch', stock: 4 },
    { color: 'Silver', model: '16 inch', stock: 2 }
]
},
    {
    name: 'MacBook Air',
    longDescription: 'Supercharged by the Apple M4 chip, MacBook Air is strikingly thin, incredibly light, and built for all-day productivity and creativity.',
    basePrice: 4599,
    isNew: true,
    bgColor: '#f5f5f7',
    textColor: '#000000',
    gallery: [
        'pics/extraimgmacair1.png',
        'pics/extraimgmacair2.jpg'
    ],

    models: [
        { name: '13 inch', priceMod: 0 },
        { name: '15 inch', priceMod: 700 }
    ],


    chips: [
        {
            name: 'M5 Chip',
            price: 0,
            allowedModels: ['13 inch', '15 inch'],
            variants: [
                { name: '10-core CPU, 8-core GPU, 16-core Neural Engine', price: 0 },
                { name: '10-core CPU, 10-core GPU, 16-core Neural Engine', price: 450 }
            ],
        }
    ],

    colors: [
        { name: 'Sky Blue', hex: '#b9d9eb', image: 'pics/skyblueair.png' },
        { name: 'Silver', hex: '#d9d9d9', image: 'pics/silverair.png' },
        { name: 'Starlight', hex: '#f0e6c8', image: 'pics/starlightair.png' },
        { name: 'Midnight', hex: '#2c313a', image: 'pics/midnightair (1).png' }
    ],

    specs: [
        { label: 'Display', value: 'Liquid Retina display' },
        { label: 'Chip', value: 'Apple M4 chip' },
        { label: 'Camera', value: '12MP Center Stage camera' },
        { label: 'Audio', value: 'Immersive speakers with Spatial Audio' },
        { label: 'Battery', value: 'Up to 18 hours battery life' },
        { label: 'Memory', value: 'Up to 32GB unified memory' },
        { label: 'Storage', value: 'Up to 2TB SSD storage' },
        { label: 'Ports', value: 'MagSafe, 2x Thunderbolt / USB 4, headphone jack' },
        { label: 'Wireless', value: 'Wi-Fi 6E and Bluetooth 5.3' }
    ]
},
    //Airpods
    {
    name: 'Airpods Pro 3',
    longDescription: 'The ultimate audio experience with adaptive noise cancellation, heart rate tracking and the powerful H3 chip.',
    basePrice: 949,
    isNew: true,
   bgColor: '#000000',
    textColor: '#ffffff',

    gallery: [
        'pics/extraimgairpodspro3-1.png',
        'pics/extraimgairpodspro3-2.png' ,
        'pics/extraimgairpodspro3-3.png' 
    ],
    colors: [
        { name: 'White', hex: '#ffffff', image: 'pics/airpodspro3.png' }
    ],

    specs: [
        { label: 'Chip', value: 'H2 Chip' },
        { label: 'Feature', value: 'Heart Rate Tracking' },
        { label: 'ANC', value: 'Adaptive Noise Cancellation 2.0' },
        { label: 'Battery', value: 'Up to 30 hours with case' },
        { label: 'Case', value: 'USB-C / MagSafe Charging' }
    ],
    inventory: [
    { color: 'White', stock: 7 }
]
},
{
    name: 'Airpods 4',
    longDescription: 'A redesigned AirPods experience with improved sound, active noise cancellation and the powerful H3 chip.',
    basePrice: 549,
    isNew: true,
    bgColor: '#000000',
    textColor: '#ffffff',


    models: [
        { name: 'Standard', price: 0 },
        { name: 'With Active Noise Cancellation', priceMod: 200 }
    ],

    colors: [
        { name: 'White', hex: '#ffffff', image: 'pics/airpods4-1.png' }
    ],

    specs: [
        { label: 'Chip', value: 'H2 Chip' },
        { label: 'Feature', value: 'Adaptive EQ' },
        { label: 'ANC', value: 'Optional Active Noise Cancellation' },
        { label: 'Battery', value: 'Up to 24 hours with case' },
        { label: 'Case', value: 'USB-C Charging Case' }
    ],
    inventory: [
    { model: 'Standard', color: 'White', stock: 15 },
    { model: 'With Active Noise Cancellation', color: 'White', stock: 10 }
]
},
    {
    name: 'Airpods Max',
    longDescription: 'High-fidelity over-ear headphones with spatial audio, industry-leading noise cancellation and premium materials.',
    basePrice: 2099,
     bgColor: '#000000',
    textColor: '#ffffff',

    colors: [
        { name: 'Midnight', hex: '#191970', image: 'pics/airpodsmaxmidnight.png' },
        { name: 'Starlight', hex: '#F5F5DC', image: 'pics/airpodsmaxstarlight.png' },
        { name: 'Blue', hex: '#4682B4', image: 'pics/airpodsmaxblue.png' },
        { name: 'Purple', hex: '#800080', image: 'pics/airpodsmaxpurple.png' },
        { name: 'Orange', hex: '#FFA500', image: 'pics/airpodsmaxorange.png' }
    ],

    specs: [
        { label: 'Chip', value: 'Dual H1 Chips' },
        { label: 'Audio', value: 'Lossless via USB-C' },
        { label: 'ANC', value: 'Industry-leading Active Noise Cancellation' },
        { label: 'Spatial Audio', value: 'Dynamic Head Tracking' },
        { label: 'Battery', value: 'Up to 20 Hours Listening Time' }
    ],
    inventory: [
    { color: 'Midnight', stock: 6 },
    { color: 'Starlight', stock: 5 },
    { color: 'Blue', stock: 4 },
    { color: 'Purple', stock: 3 },
    { color: 'Orange', stock: 2 }
]
},
//samsung
  // =========================
  // GALAXY S SERIES
  // =========================

  {
    name: 'Galaxy S25',
    longDescription: 'Compact flagship Samsung smartphone with Galaxy AI, a premium flat design, strong cameras, and excellent all-day performance.',
    basePrice: 2349,
    isNew: true,
     bgColor: '#000000',
    textColor: '#ffffff',
     models: [
    { name: 'Galaxy S25', priceMod: 0, display: '6.3 inch' },
    { name: 'Galaxy S25+', priceMod:700, display: '6.7 inch' }
  ],
    specs: [
      { label: 'Display', value: '6.3" for Galaxy S26 / 6.7" for Galaxy S26+' },
      { label: 'Chip', value: 'Snapdragon 8 Elite for Galaxy' },
      { label: 'Camera', value: '50MP + 12MP + 10MP Triple Camera' },
      { label: 'Battery', value: '4000mAh' },
      { label: 'Charging', value: '25W Fast Charging' }
    ],
    storageOptions: [
      { name: '128GB', priceMod: 0 },
      { name: '256GB', priceMod: 500 },
      { name: '512GB', priceMod: 870 }
    ],
    colors: [
      { name: 'Icyblue', hex: '#bdd7f2', image: 'pics/samsungs25icyblue.avif' },
      { name: 'Navy', hex: '#2f4466', image: 'pics/samsungs25navyblue.png' },
      { name: 'Silver Shadow', hex: '#c9c9c9', image: 'pics/samsungs25silver.png' },
      { name: 'Mint', hex: '#cceee1', image: 'pics/samsungs25green.png' }
    ],
   inventory: [
  // Galaxy S25
  { model: 'Galaxy S25', color: 'Icyblue', storage: '128GB', stock: 10 },
  { model: 'Galaxy S25', color: 'Icyblue', storage: '256GB', stock: 7 },
  { model: 'Galaxy S25', color: 'Icyblue', storage: '512GB', stock: 5 },

  { model: 'Galaxy S25', color: 'Navy', storage: '128GB', stock: 9 },
  { model: 'Galaxy S25', color: 'Navy', storage: '256GB', stock: 6 },
  { model: 'Galaxy S25', color: 'Navy', storage: '512GB', stock: 4 },

  { model: 'Galaxy S25', color: 'Silver Shadow', storage: '128GB', stock: 11 },
  { model: 'Galaxy S25', color: 'Silver Shadow', storage: '256GB', stock: 8 },
  { model: 'Galaxy S25', color: 'Silver Shadow', storage: '512GB', stock: 5 },

  { model: 'Galaxy S25', color: 'Mint', storage: '128GB', stock: 10 },
  { model: 'Galaxy S25', color: 'Mint', storage: '256GB', stock: 7 },
  { model: 'Galaxy S25', color: 'Mint', storage: '512GB', stock: 4 },

  // Galaxy S25+
  { model: 'Galaxy S25+', color: 'Icyblue', storage: '128GB', stock: 7 },
  { model: 'Galaxy S25+', color: 'Icyblue', storage: '256GB', stock: 5 },
  { model: 'Galaxy S25+', color: 'Icyblue', storage: '512GB', stock: 3 },

  { model: 'Galaxy S25+', color: 'Navy', storage: '128GB', stock: 6 },
  { model: 'Galaxy S25+', color: 'Navy', storage: '256GB', stock: 4 },
  { model: 'Galaxy S25+', color: 'Navy', storage: '512GB', stock: 2 },

  { model: 'Galaxy S25+', color: 'Silver Shadow', storage: '128GB', stock: 8 },
  { model: 'Galaxy S25+', color: 'Silver Shadow', storage: '256GB', stock: 5 },
  { model: 'Galaxy S25+', color: 'Silver Shadow', storage: '512GB', stock: 3 },

  { model: 'Galaxy S25+', color: 'Mint', storage: '128GB', stock: 7 },
  { model: 'Galaxy S25+', color: 'Mint', storage: '256GB', stock: 4 },
  { model: 'Galaxy S25+', color: 'Mint', storage: '512GB', stock: 2 }
]
  },
  {
    name: 'Galaxy S25 Ultra',
    longDescription: 'Samsung’s premium Ultra flagship with built-in S Pen, titanium build, top-end camera system, and advanced Galaxy AI features.',
    basePrice: 5199,
    isNew: true,
    bgColor: '#000000',
    textColor: '#ffffff',
    gallery: [
      'pics/galaxys25ultra-1.png',
      'pics/galaxys25ultra-2.png',
      'pics/galaxys25ultra-3.png'
    ],
    specs: [
      { label: 'Display', value: '6.9" Dynamic AMOLED 2X, QHD+, 120Hz' },
      { label: 'Chip', value: 'Snapdragon 8 Elite for Galaxy' },
      { label: 'Camera', value: '200MP + 50MP + 10MP + 50MP Quad Camera' },
      { label: 'Battery', value: '5000mAh' },
      { label: 'Charging', value: '45W Fast Charging' }
    ],
    storageOptions: [
      { name: '256GB', priceMod: 0 },
      { name: '512GB', priceMod: 600 },
      { name: '1TB', priceMod: 1200 }
    ],
    colors: [
      { name: 'Titanium Silverblue', hex: '#aebfd1', image: 'pics/s25ultrasilverbluetit.png' },
      { name: 'Titanium Black', hex: '#2a2a2a', image: 'pics/s25ultratitaniumblack.png' },
      { name: 'Titanium Gray', hex: '#8f9195', image: 'pics/s25ultrawhitesilver.png' },
      { name: 'Titanium Whitesilver', hex: '#dddddb', image: 'pics/s25ultratitgrey.png' }
    ],
    inventory: [
  { color: 'Titanium Silverblue', storage: '256GB', stock: 8 },
  { color: 'Titanium Silverblue', storage: '512GB', stock: 5 },
  { color: 'Titanium Silverblue', storage: '1TB', stock: 3 },

  { color: 'Titanium Black', storage: '256GB', stock: 9 },
  { color: 'Titanium Black', storage: '512GB', stock: 6 },
  { color: 'Titanium Black', storage: '1TB', stock: 4 },

  { color: 'Titanium Gray', storage: '256GB', stock: 7 },
  { color: 'Titanium Gray', storage: '512GB', stock: 5 },
  { color: 'Titanium Gray', storage: '1TB', stock: 3 },

  { color: 'Titanium Whitesilver', storage: '256GB', stock: 6 },
  { color: 'Titanium Whitesilver', storage: '512GB', stock: 4 },
  { color: 'Titanium Whitesilver', storage: '1TB', stock: 2 }
]
  },

 {
  name: 'Galaxy S26',
  longDescription: 'The latest Samsung flagship lineup for 2026 with Galaxy AI, premium performance, brighter displays, and powerful cameras.',
  basePrice: 3599,
  isNew: true,
  bgColor: '#000000',
    textColor: '#ffffff',
  models: [
    { name: 'Galaxy S26', priceMod: 0, display: '6.3 inch' },
    { name: 'Galaxy S26+', priceMod:700, display: '6.7 inch' }
  ],
  specs: [
    { label: 'Display', value: '6.3" for Galaxy S26 / 6.7" for Galaxy S26+' },
    { label: 'Panel', value: 'Dynamic AMOLED 2X, 120Hz' },
    { label: 'Chip', value: 'Latest Galaxy flagship processor' },
    { label: 'Camera', value: '50MP Triple Camera' },
    { label: 'Battery', value: '4300mAh / 4900mAh' },
    { label: 'Charging', value: 'Fast Charging' }
  ],
  storageOptions: [
    { name: '256GB', priceMod: 0 },
    { name: '512GB', priceMod: 800 }
  ],
  colors: [
    { name: 'Cobalt Violet', hex: '#4F3FB6', image: 'pics/s26violet.png' },
    { name: 'Black', hex: '#1A1A1A', image: 'pics/s26black.png' },
    { name: 'Sky Blue', hex: '#87CEEB', image: 'pics/s26skyblue.png' },
    { name: 'White', hex: '#F5F5F5', image: 'pics/s26white.png' }
  ],
  inventory: [
  // Galaxy S26
  { model: 'Galaxy S26', color: 'Cobalt Violet', storage: '256GB', stock: 9 },
  { model: 'Galaxy S26', color: 'Cobalt Violet', storage: '512GB', stock: 6 },

  { model: 'Galaxy S26', color: 'Black', storage: '256GB', stock: 10 },
  { model: 'Galaxy S26', color: 'Black', storage: '512GB', stock: 7 },

  { model: 'Galaxy S26', color: 'Sky Blue', storage: '256GB', stock: 8 },
  { model: 'Galaxy S26', color: 'Sky Blue', storage: '512GB', stock: 5 },

  { model: 'Galaxy S26', color: 'White', storage: '256GB', stock: 9 },
  { model: 'Galaxy S26', color: 'White', storage: '512GB', stock: 6 },

  // Galaxy S26+
  { model: 'Galaxy S26+', color: 'Cobalt Violet', storage: '256GB', stock: 6 },
  { model: 'Galaxy S26+', color: 'Cobalt Violet', storage: '512GB', stock: 4 },

  { model: 'Galaxy S26+', color: 'Black', storage: '256GB', stock: 7 },
  { model: 'Galaxy S26+', color: 'Black', storage: '512GB', stock: 5 },

  { model: 'Galaxy S26+', color: 'Sky Blue', storage: '256GB', stock: 6 },
  { model: 'Galaxy S26+', color: 'Sky Blue', storage: '512GB', stock: 4 },

  { model: 'Galaxy S26+', color: 'White', storage: '256GB', stock: 7 },
  { model: 'Galaxy S26+', color: 'White', storage: '512GB', stock: 5 }
]
},

  {
    name: 'Galaxy S26 Ultra',
    longDescription: 'Samsung’s newest Ultra flagship with S Pen, 200MP camera, large QHD+ display, and top-tier 2026 Galaxy AI features.',
    basePrice: 5599,
    isNew: true,
    bgColor: '#000000',
    textColor: '#ffffff',
    gallery: [
      'pics/extraimgs26ultra-1.png',
      'pics/samsungs26ultra.png',
      'pics/galaxys26ultra-3.png'
    ],
    specs: [
      { label: 'Display', value: '6.9" Dynamic AMOLED 2X, QHD+, 120Hz' },
      { label: 'Chip', value: 'Latest Galaxy Ultra flagship processor' },
      { label: 'Camera', value: '200MP + 50MP + 10MP + 50MP Quad Camera' },
      { label: 'Battery', value: '5000mAh' },
      { label: 'Charging', value: '45W Fast Charging' }
    ],
    storageOptions: [
      { name: '256GB', priceMod: 0 },
      { name: '512GB', priceMod: 700 },
      { name: '1TB', priceMod: 1500 }
    ],
    colors: [
    { name: 'Cobalt Violet', hex: '#4F3FB6', image: 'pics/s26ultraviolet.png' },
    { name: 'Black', hex: '#1A1A1A', image: 'pics/samsungs26ultrablack.webp' },
    { name: 'Sky Blue', hex: '#87CEEB', image: 'pics/s26ultraskyblue.png' },
    { name: 'White', hex: '#F5F5F5', image: 'pics/s26ultrawhite.png' }
    ],
    inventory: [
  { color: 'Cobalt Violet', storage: '256GB', stock: 7 },
  { color: 'Cobalt Violet', storage: '512GB', stock: 5 },
  { color: 'Cobalt Violet', storage: '1TB', stock: 3 },

  { color: 'Black', storage: '256GB', stock: 8 },
  { color: 'Black', storage: '512GB', stock: 6 },
  { color: 'Black', storage: '1TB', stock: 4 },

  { color: 'Sky Blue', storage: '256GB', stock: 7 },
  { color: 'Sky Blue', storage: '512GB', stock: 5 },
  { color: 'Sky Blue', storage: '1TB', stock: 3 },

  { color: 'White', storage: '256GB', stock: 6 },
  { color: 'White', storage: '512GB', stock: 4 },
  { color: 'White', storage: '1TB', stock: 2 }
]
  },

  // =========================
  // GALAXY Z FLIP SERIES
  // =========================

 {
  name: 'Galaxy Z Flip7',
  longDescription: 'Slim premium flip phone with Galaxy AI, a larger 4.1-inch FlexWindow, flagship-level 50MP camera system, and a compact foldable design.',
  basePrice: 3479,
  isNew: true,

  bgColor: '#000000',
  textColor: '#ffffff',

  gallery: [
    'pics/extraimg7flip-1.jpg',
    'pics/extraimg7flip-2.jpg',
    'pics/extraimgzflip7.jpg'
  ],

  specs: [
    { label: 'Main Display', value: '6.9" Dynamic AMOLED 2X, 120Hz' },
    { label: 'Cover Display', value: '4.1" Super AMOLED FlexWindow, 120Hz' },
    { label: 'Processor', value: 'Samsung Exynos 2500 (3nm)' },
    { label: 'RAM', value: '12GB' },
    { label: 'Storage', value: '256GB / 512GB' },
    { label: 'Rear Camera', value: '50MP Wide + 12MP Ultra Wide' },
    { label: 'Front Camera', value: '10MP Selfie Camera' },
    { label: 'Video Recording', value: 'Up to 4K at 60fps' },
    { label: 'Battery', value: '4300mAh' },
    { label: 'Charging', value: '25W Fast Charging' },
    { label: 'Durability', value: 'Armor Aluminum, Gorilla Glass Victus 2' },
    { label: 'Water Resistance', value: 'IP48' },
    { label: 'Weight', value: '188g' },
    { label: 'Thickness', value: '6.5mm unfolded / 13.7mm folded' },
    { label: 'SIM', value: 'Single SIM + eSIM / Dual SIM support varies by market' },
    { label: 'OS Features', value: 'Galaxy AI, FlexCam, Nightography, Samsung DeX' }
  ],

  storageOptions: [
    { name: '256GB', priceMod: 0,  },
    { name: '512GB', priceMod: 435, }
  ],

  colors: [
    {
      name: 'BlueShadow',
      hex: '#627ea0',
      image: 'pics/galaxy7flipblueshadow.png',
    },
    {
      name: 'Jetblack',
      hex: '#1c1c1c',
      image: 'pics/galaxy7flipjetblack.png',
    },
    {
      name: 'Coralred',
      hex: '#d9655d',
      image: 'pics/galaxy7flipjcoralred.png',
    },
    {
      name: 'Mint',
      hex: '#c8ebdf',
      image: 'pics/galaxy7flipmint.png',
    }
  ],
  inventory: [
        { color: 'BlueShadow', storage: '256GB', stock: 7 },
        { color: 'BlueShadow', storage: '512GB', stock: 5 },
      
        { color: 'Jetblack', storage: '256GB', stock: 2 },
        { color: 'Jetblack', storage: '512GB', stock: 2 },
        

        { color: 'Coralred', storage: '256GB', stock: 10 },
        { color: 'Coralred', storage: '512GB', stock: 1 },
       

        { color: 'Mint', storage: '256GB', stock: 0 },
        { color: 'Mint', storage: '512GB', stock: 10 },
       
    ]
},

  {
    name: 'Galaxy Z Flip7 FE',
    longDescription: 'More affordable Galaxy flip phone with Galaxy AI, compact foldable styling, and strong everyday performance.',
    basePrice: 2599,
    isNew: true,
    bgColor: '#000000',
    textColor: '#ffffff',
    
    specs: [
      { label: 'Main Display', value: '6.7" AMOLED, 120Hz' },
      { label: 'Cover Display', value: '3.4" FlexWindow' },
      { label: 'Chip', value: 'Samsung flagship-class processor' },
      { label: 'Camera', value: '50MP Dual Camera' },
      { label: 'Battery', value: '4000mAh' }
    ],
    storageOptions: [
      { name: '256GB', priceMod: 0 }
    ],
    colors: [
      { name: 'Black', hex: '#202020', image: 'pics/zflip7feblack.png' },
      { name: 'White', hex: '#f3f3f3', image: 'pics/zflip7fewhite.png' }
    ],
    inventory: [
        { color: 'Black', storage: '256GB', stock: 7 },
         { color: 'White', storage: '256GB', stock: 5 },
       
       
    ]
  },

   {
    name: 'Galaxy Z Flip6',
    longDescription: ' Premium Samsung flip phone with Galaxy AI, improved battery life, a 50MP camera, and stylish compact form factor.',
    basePrice: 1948,
    stock: 10,
    isNew: false,
    bgColor: '#ffffff',
    textColor: '#111111',
    
    specs: [
        { label: 'Main Display', value: '6.7" Dynamic AMOLED 2X, 120Hz <i class="fa-solid fa-mobile-screen-button"></i>' },
        { label: 'Cover Display', value: '3.4" Super AMOLED <i class="fa-solid fa-mobile-screen"></i>' },
        { label: 'Chip', value: 'Snapdragon 8 Gen 3 for Galaxy <i class="fa-solid fa-microchip"></i>' },
        { label: 'Camera', value: '50MP + 12MP Dual Camera <i class="fa-solid fa-camera-retro"></i>' },
        { label: 'Battery', value: '4000mAh <i class="fa-solid fa-battery-three-quarters"></i>' }
    ],
    storageOptions: [
        { name: '256GB', priceMod: 0 },
        { name: '512GB', priceMod: 300 }
    ],
    colors: [
        { name: 'Silver Shadow', hex: '#c9c9c9', image: 'pics/zflip6silvershadow.png' },
        { name: 'Blue', hex: '#6d93cc', image: 'pics/zflip6blue.png' },
        { name: 'Yellow', hex: '#f2d64b', image: 'pics/zflip6yellow.png' },
        { name: 'Mint', hex: '#c8ebdf', image: 'pics/zflip6mint.png' }
    ],
    inventory: [
        { color: 'Silver Shadow', storage: '256GB', stock: 5 },
        { color: 'Silver Shadow', storage: '512GB', stock: 3 },

        { color: 'Blue', storage: '256GB', stock: 6 },
        { color: 'Blue', storage: '512GB', stock: 4 },

        { color: 'Yellow', storage: '256GB', stock: 4 },
        { color: 'Yellow', storage: '512GB', stock: 2 },

        { color: 'Mint', storage: '256GB', stock: 7 },
        { color: 'Mint', storage: '512GB', stock: 5 }
    ]
},

  // =========================
  // GALAXY Z FOLD SERIES
  // =========================
{
    name: 'Galaxy Z Fold7',
    longDescription: ' Samsung’s most advanced foldable with a huge inner display, premium multitasking experience, and upgraded flagship camera system.',
    basePrice: 6259,
    stock: 10,
    isNew: true,
    bgColor: '#f9f9f9',
    textColor: '#111111',
    gallery: [
        'pics/zfold7-1.png',
        'pics/zfold7-2.png',
        'pics/zfold7-3.png'
    ],
    specs: [
        { label: 'Main Display', value: '8.0" AMOLED, 120Hz <i class="fa-solid fa-mobile-screen-button"></i>' },
        { label: 'Cover Display', value: '6.5" AMOLED <i class="fa-solid fa-mobile-screen"></i>' },
        { label: 'Chip', value: 'Snapdragon 8 Elite for Galaxy <i class="fa-solid fa-microchip"></i>' },
        { label: 'Camera', value: '200MP + 12MP + 10MP Triple Camera <i class="fa-solid fa-camera-retro"></i>' },
        { label: 'Battery', value: '4400mAh <i class="fa-solid fa-battery-three-quarters"></i>' }
    ],
    storageOptions: [
        { name: '256GB', priceMod: 0 },
        { name: '512GB', priceMod: 420 },
        { name: '1TB', priceMod: 1300 }
    ],
    colors: [
        { name: 'Blue Shadow', hex: '#627ea0', image: 'pics/zfold7-blue.png' },
        { name: 'Silver Shadow', hex: '#d0d0d0', image: 'pics/zfold7-silver.png' },
        { name: 'Jetblack', hex: '#1c1c1c', image: 'pics/zfold7-black.png' },
        { name: 'Mint', hex: '#c8ebdf', image: 'pics/zfold7-mint.png' }
    ],
    inventory: [
        { color: 'Blue Shadow', storage: '256GB', stock: 4 },
        { color: 'Blue Shadow', storage: '512GB', stock: 3 },
        { color: 'Blue Shadow', storage: '1TB', stock: 2 },

        { color: 'Silver Shadow', storage: '256GB', stock: 5 },
        { color: 'Silver Shadow', storage: '512GB', stock: 4 },
        { color: 'Silver Shadow', storage: '1TB', stock: 2 },

        { color: 'Jetblack', storage: '256GB', stock: 6 },
        { color: 'Jetblack', storage: '512GB', stock: 4 },
        { color: 'Jetblack', storage: '1TB', stock: 3 },

        { color: 'Mint', storage: '256GB', stock: 3 },
        { color: 'Mint', storage: '512GB', stock: 2 },
        { color: 'Mint', storage: '1TB', stock: 1 }
    ]
},

{
    name: 'Galaxy Z Fold6',
    longDescription: ' Premium Samsung book-style foldable with strong multitasking, Galaxy AI features, and flagship-class performance in a thinner design.',
    basePrice: 3678,
    stock: 10,
    isNew: false,
    bgColor: '#fbfbfb',
    textColor: '#111111',
    gallery: [
        'pics/zfold6-1.png',
        'pics/zfold6-2.png',
        'pics/zfold6-3.png'
    ],
    specs: [
        { label: 'Main Display', value: '7.6" Dynamic AMOLED 2X, 120Hz <i class="fa-solid fa-mobile-screen-button"></i>' },
        { label: 'Cover Display', value: '6.3" Dynamic AMOLED 2X <i class="fa-solid fa-mobile-screen"></i>' },
        { label: 'Chip', value: 'Snapdragon 8 Gen 3 for Galaxy <i class="fa-solid fa-microchip"></i>' },
        { label: 'Camera', value: '50MP + 12MP + 10MP Triple Camera <i class="fa-solid fa-camera-retro"></i>' },
        { label: 'Battery', value: '4400mAh <i class="fa-solid fa-battery-three-quarters"></i>' }
    ],
    storageOptions: [
        { name: '256GB', priceMod: 0 },
        { name: '512GB', priceMod: 500 },
        { name: '1TB', priceMod: 1200 }
    ],
    colors: [
        { name: 'Silver Shadow', hex: '#d0d0d0', image: 'pics/zfold6-silver.png' },
        { name: 'Pink', hex: '#e6c9d5', image: 'pics/zfold6-pink.png' },
        { name: 'Navy', hex: '#24385c', image: 'pics/zfold6-navy.png' },
        { name: 'White', hex: '#efefef', image: 'pics/zfold6-white.png' }
    ],
    inventory: [
        { color: 'Silver Shadow', storage: '256GB', stock: 6 },
        { color: 'Silver Shadow', storage: '512GB', stock: 4 },
        { color: 'Silver Shadow', storage: '1TB', stock: 2 },

        { color: 'Pink', storage: '256GB', stock: 4 },
        { color: 'Pink', storage: '512GB', stock: 3 },
        { color: 'Pink', storage: '1TB', stock: 1 },

        { color: 'Navy', storage: '256GB', stock: 7 },
        { color: 'Navy', storage: '512GB', stock: 5 },
        { color: 'Navy', storage: '1TB', stock: 2 },

        { color: 'White', storage: '256GB', stock: 3 },
        { color: 'White', storage: '512GB', stock: 2 },
        { color: 'White', storage: '1TB', stock: 1 }
    ]
},
  
  // =========================
  // GALAXY A SERIES
  // =========================
{
    name: 'Galaxy A57 5G',
    longDescription: 'Upper mid-range Samsung smartphone with a smooth 120Hz AMOLED display, improved camera system, and powerful performance for everyday and gaming use.',
    basePrice: 1739,
    isNew: true,
    bgColor: '#ffffff',
    textColor: '#111111',

    specs: [
        { label: 'Display', value: '6.7" FHD+ Super AMOLED, 120Hz' },
        { label: 'Chip', value: 'Exynos 1480' },
        { label: 'Camera', value: '64MP + 12MP + 5MP Triple Camera (OIS)' },
        { label: 'Battery', value: '5000mAh' },
        { label: 'Charging', value: '25W Fast Charging' },
        { label: 'Build', value: 'Glass Front & Back' }
    ],

    storageOptions: [
        { name: '128GB', priceMod: 0 },
        { name: '256GB', priceMod: 210 },
    ],

    colors: [
        { name: 'Awesome Ice Blue', hex: '#b5d8eb', image: 'pics/galaxya575gicyblue.avif' },
        { name: 'Awesome Navy', hex: '#24385c', image: 'pics/galaxy1575gnavy.avif' },
        { name: 'Awesome Lilac', hex: '#d7c4eb', image: 'pics/galaxya575glilac.avif' },
        { name: 'Awesome Grey', hex: '#8e8d8a', image: 'pics/galaxya575ggrey.avif' }
    ],

    inventory: [
        { color: 'Awesome Ice Blue', storage: '128GB', stock: 10 },
        { color: 'Awesome Ice Blue', storage: '256GB', stock: 6 },
        

        { color: 'Awesome Navy', storage: '128GB', stock: 9 },
        { color: 'Awesome Navy', storage: '256GB', stock: 5 },
        

        { color: 'Awesome Lilac', storage: '128GB', stock: 8 },
        { color: 'Awesome Lilac', storage: '256GB', stock: 4 },
        
        { color: 'Awesome Lemon', storage: '128GB', stock: 7 },
        { color: 'Awesome Lemon', storage: '256GB', stock: 4 },
    ]
},
  {
    name: 'Galaxy A55 5G',
    longDescription: 'Premium mid-range Samsung phone with a glass-and-metal design, dependable battery life, and a strong AMOLED display.',
    basePrice: 1019,
    isNew: false,
    bgColor: '#ffffff',
    textColor: '#111111',
    
    specs: [
      { label: 'Display', value: '6.6" FHD+ Super AMOLED, 120Hz' },
      { label: 'Chip', value: 'Exynos 1480' },
      { label: 'Camera', value: '50MP + 12MP + 5MP Triple Camera' },
      { label: 'Battery', value: '5000mAh' },
      { label: 'Charging', value: '25W Fast Charging' }
    ],
    storageOptions: [
      { name: '128GB', priceMod: 0 },
      { name: '256GB', priceMod: 170 }
    ],
    colors: [
      { name: 'Awesome Iceblue', hex: '#b5d8eb', image: 'pics/galaxya555gblue.jpg' },
      { name: 'Awesome Navy', hex: '#24385c', image: 'pics/galaxya555gblack.jpg' }
    ],
     inventory: [
        { color: 'Awesome Iceblue', storage: '128GB', stock: 6 },
        { color: 'Awesome Iceblue', storage: '256GB', stock: 4 },

        { color: 'Awesome Navy', storage: '128GB', stock: 7 },
        { color: 'Awesome Navy', storage: '256GB', stock: 5 }
    ]

  },
  {
    name: 'Galaxy A36 5G',
    longDescription: 'Balanced mid-range Samsung phone with a bright 120Hz AMOLED display, solid OIS camera, and sleek design.',
    basePrice: 1250,
    isNew: false,
    bgColor: '#ffffff',
    textColor: '#111111',

    specs: [
        { label: 'Display', value: '6.6" FHD+ Super AMOLED, 120Hz' },
        { label: 'Chip', value: 'Exynos 1380' },
        { label: 'Camera', value: '50MP + 8MP + 5MP Triple Camera' },
        { label: 'Battery', value: '5000mAh' },
        { label: 'Charging', value: '25W Fast Charging' }
    ],

    storageOptions: [
        { name: '128GB', priceMod: 0 },
        { name: '256GB', priceMod: 100 }
    ],

    colors: [
        { name: 'Awesome Lavender', hex: '#b5d8eb', image: 'pics/galaxya36lavender.png' },
        { name: 'Awesome Lilac', hex: '#d7c4eb', image: 'pics/galaxya36white.avif' },
        { name: 'Awesome Lime', hex: '#f4e66a', image: 'pics/galaxy136lime.png' },
        { name: 'Awesome Navy', hex: '#24385c', image: 'pics/galaxya36black.png' }
    ],

    inventory: [
        { color: 'Awesome Iceblue', storage: '128GB', stock: 8 },
        { color: 'Awesome Iceblue', storage: '256GB', stock: 5 },

        { color: 'Awesome Lilac', storage: '128GB', stock: 7 },
        { color: 'Awesome Lilac', storage: '256GB', stock: 4 },

        { color: 'Awesome Lemon', storage: '128GB', stock: 6 },
        { color: 'Awesome Lemon', storage: '256GB', stock: 3 },

        { color: 'Awesome Navy', storage: '128GB', stock: 9 },
        { color: 'Awesome Navy', storage: '256GB', stock: 5 }
    ]
},

{
    name: 'Galaxy A26 5G',
    longDescription: 'Affordable Samsung 5G phone with an AMOLED display, 50MP main camera, and reliable battery life for daily use.',
    basePrice: 750,
    isNew: false,
    bgColor: '#ffffff',
    textColor: '#111111',

    specs: [
        { label: 'Display', value: '6.5" FHD+ Super AMOLED, 120Hz' },
        { label: 'Chip', value: 'Exynos 1280' },
        { label: 'Camera', value: '50MP + 8MP + 2MP Triple Camera' },
        { label: 'Battery', value: '5000mAh' },
        { label: 'Charging', value: '25W Fast Charging' }
    ],

    storageOptions: [
        { name: '128GB', priceMod: 0 },
        { name: '256GB', priceMod: 110 }
    ],

    colors: [
        { name: 'Black', hex: '#26364f', image: 'pics/galaxya26black.avif' },
        { name: 'white', hex: '#ffffff', image: 'pics/galaxya26white.avif' },
        { name: 'pink', hex: '#F99584', image: 'pics/galaxya26pink.avif' },
      
    ],

    inventory: [
        { color: 'Black', storage: '128GB', stock: 10 },
        { color: 'Black', storage: '256GB', stock: 6 },

        { color: 'white', storage: '128GB', stock: 7 },
        { color: 'white', storage: '256GB', stock: 4 },

        { color: 'pink', storage: '128GB', stock: 9 },
        { color: 'pink', storage: '256GB', stock: 5 }
    ]
},

{
    name: 'Galaxy A16 5G',
    longDescription: 'Budget-friendly Samsung 5G phone with a large AMOLED display, long battery life, and solid value for everyday use.',
    basePrice: 455,
    isNew: false,
    bgColor: '#ffffff',
    textColor: '#111111',

    gallery: [
        'pics/a15-1.png',
        'pics/a15-2.png',
        'pics/a15-3.png'
    ],

    specs: [
        { label: 'Display', value: '6.5" FHD+ Super AMOLED, 90Hz' },
        { label: 'Chip', value: 'Dimensity 6100+' },
        { label: 'Camera', value: '50MP + 5MP + 2MP Triple Camera' },
        { label: 'Battery', value: '5000mAh' },
        { label: 'Charging', value: '25W Fast Charging' }
    ],

    storageOptions: [
        { name: '128GB', priceMod: 0 },
        { name: '256GB', priceMod: 150 }
    ],

    colors: [
        { name: 'Black', hex: '#010914', image: 'pics/galaxya16black.avif' },
        { name: 'Green', hex: '#60ad65', image: 'pics/galaxya16green.avif' },
        { name: 'Grey', hex: '#a7a499', image: 'pics/galaxya16grey.avif' },
        
    ],

    inventory: [
        { color: 'Black', storage: '128GB', stock: 12 },
        { color: 'Black', storage: '256GB', stock: 7 },

        { color: 'Green', storage: '128GB', stock: 10 },
        { color: 'Green', storage: '256GB', stock: 6 },

        { color: 'Grey', storage: '128GB', stock: 8 },
        { color: 'Grey', storage: '256GB', stock: 5 },
    ]
},
  //Galaxy Watch
     {
    name: 'Galaxy Watch Ultra',
    longDescription: 'Premium rugged Samsung smartwatch with LTE, 1.5" Super AMOLED display, titanium casing, dual-frequency GPS, Galaxy AI-powered wellness insights, and long-lasting battery life built for outdoor adventure and everyday fitness.',
    basePrice: 2399,
    isNew: true,
    bgColor: '#000000',
    textColor: '#ffffff',

    gallery: [
        'pics/watchultra2025-1.png',
        'pics/watchultra2025-2.png',
        'pics/watchultra2025-3.png'
    ],

    specs: [
        { label: 'Case Size', value: '47 mm' },
        { label: 'Display', value: '1.5" Super AMOLED' },
        { label: 'Processor', value: '3nm Processor' },
        { label: 'Battery', value: 'Up to 100 hours (Power Saving Mode)' },
        { label: 'Durability', value: '10ATM Water Resistance + Titanium Build' },
        { label: 'Navigation', value: 'GPS / Dual-Frequency GPS' },
        { label: 'Connectivity', value: 'LTE, Bluetooth, Wi-Fi' },
        { label: 'Health', value: 'BioActive Sensor & Galaxy AI Insights' }
    ],

    
    colors: [
        { name: 'Titanium Blue', hex: '#071f38', image: 'pics/watchultrablue.avif' },
        { name: 'Titanium Silver', hex: '#b9bcc3', image: 'pics/watchultrasilver.avif' },
        { name: 'Titanium Gray', hex: '#6d7178', image: 'pics/watchultratitaniumgray.avif' },
        { name: 'Titanium White', hex: '#ffffff', image: 'pics/watchultrawhite.avif' }
    ],

    inventory: [
        { color: 'Titanium Blue',  stock: 6 },
        { color: 'Titanium Silver',  stock: 5 },
        { color: 'Titanium Gray',  stock: 7 },
        { color: 'Titanium White',  stock: 4 }
    ]
},
 {
    name: 'Galaxy Watch 8',
    longDescription: 'Slim and powerful Samsung smartwatch with Galaxy AI, advanced health tracking, sleep coaching, and a sleek cushion design built for everyday fitness and lifestyle.',
    basePrice: 1399,
    isNew: true,
    bgColor: '#000000',
    textColor: '#ffffff',
gallery: [
        'pics/extraimgwatch8.avif',
        'pics/extraimgwatch8-3.avif',
        'pics/extraimgwatch8-2.avif'
    ],

      
     specs: [
        { label: 'Display', value: '1.47" Super AMOLED' },
        { label: 'Processor', value: '3nm Exynos Processor' },
        { label: 'Battery', value: 'Up to 40 hours' },
        { label: 'Build', value: 'Aluminum Armor Case' },
        { label: 'Health', value: 'Heart Rate, SpO2, Sleep Tracking, ECG' },
        { label: 'Fitness', value: 'Running Coach & Activity Tracking' },
        { label: 'OS', value: 'Wear OS + One UI Watch' },
        { label: 'Connectivity', value: 'Bluetooth / LTE (variant)' }
    ],

    colors: [
        { name: 'Graphite', hex: '#2b2b2b', image: 'pics/glaxywatch8graphite.avif' },
        { name: 'Silver', hex: '#c7c9cc', image: 'pics/galaxywatch8silver.avif' }
    ],

    inventory: [
        { color: 'Graphite', stock: 10 },
        { color: 'Graphite', stock: 6 },

        { color: 'Silver',stock: 8 },
        { color: 'Silver', stock: 5 }
    ]
},
 {
    name: 'Galaxy Watch 8 Classic',
    longDescription: 'Premium Samsung smartwatch with a timeless rotating bezel, AI-powered health tracking, advanced fitness features, and elegant classic styling built for everyday wear.',
    basePrice: 1699,
    isNew: true,
    bgColor: '#000000',
    textColor: '#ffffff',

    gallery: [
        'pics/extraimgwatch8classic-1.avif',
        'pics/extraimgwatch8classic-2.avif',
        'pics/extraimgwatch8classic-3.avif'
    ],

    specs: [
        { label: 'Case Size', value: '46 mm' },
        { label: 'Display', value: 'Super AMOLED' },
        { label: 'Processor', value: '3nm Exynos Processor' },
        { label: 'Build', value: 'Stainless Steel + Sapphire Crystal' },
        { label: 'Feature', value: 'Rotating Bezel + Quick Button' },
        { label: 'Battery', value: '445mAh' },
        { label: 'Health', value: 'Sleep Tracking, Heart Rate, ECG, Body Composition' },
        { label: 'OS', value: 'Wear OS + One UI Watch' }
    ],

    colors: [
        { name: 'Black', hex: '#1f1f1f', image: 'pics/watch8classicblack.avif' },
        { name: 'White', hex: '#f2f2f2', image: 'pics/watch8classicwhite.avif' }
    ],

    inventory: [
        { color: 'Black',  stock: 7 },
        { color: 'White',  stock: 5 }
    ]
}, 

{
    name: 'Galaxy Tab',
    longDescription: 'A premium Samsung tablet experience with a large immersive display, S Pen support, and strong multitasking power.',
    basePrice: 2499,
    isNew: true,
    bgColor: '#ffffff',
    textColor: '#000000',
    gallery: [
        'pics/galaxytab-1.png',
        'pics/galaxytab-2.png'
    ],
    specs: [
        { label: 'Display', value: '12.4" AMOLED' },
        { label: 'Chip', value: 'Snapdragon Processor' },
        { label: 'Battery', value: '10090mAh' },
        { label: 'Pen', value: 'S Pen Included' },
        { label: 'Audio', value: 'Quad Speakers by AKG' }
    ],
    sizes: [
        { name: '11-inch', basePrice: 0 },
        { name: '12.4-inch', basePrice: 600 }
    ],
    storageOptions: [
        { name: '128GB', priceMod: 0 },
        { name: '256GB', priceMod: 300 },
        { name: '512GB', priceMod: 800 }
    ],
    colors: [
        { name: 'Graphite', hex: '#444444', image: 'pics/galaxytab-graphite.png' },
        { name: 'Silver', hex: '#d9d9d9', image: 'pics/galaxytab-silver.png' },
        { name: 'Navy', hex: '#203864', image: 'pics/galaxytab-navy.png' }
    ]
}
 
];

/* =========================
   SEED FUNCTION
========================= */

async function seedProducts() {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("✅ MongoDB Connected");

        await Product.deleteMany({});
        console.log("🗑️ Old products deleted");

        products.forEach((product, index) => {
            if (
                !product ||
                typeof product !== "object" ||
                product.basePrice === undefined ||
                product.basePrice === null
            ) {
                console.log(`❌ Problem at index ${index}:`, product);
            }
        });

        await Product.insertMany(products);
        console.log("✅ Products inserted successfully");
    } catch (error) {
        console.log("❌ Seeding error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("🔒 Database connection closed");
    }
}

seedProducts();