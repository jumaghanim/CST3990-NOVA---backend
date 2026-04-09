const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;

/* =========================
   Middleware
========================= */

app.use(cors());
app.use(express.json());

/* =========================
   MongoDB Connection
========================= */

mongoose.connect("mongodb://localhost:27017/nova_store")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

/* =========================
   USER SCHEMA
========================= */

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    dob: String,
    password: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

/* =========================
   CONTACT SCHEMA
========================= */

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

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
    name: { type: String, required: true, unique: true },
    longDescription: { type: String, default: "" },
    basePrice: { type: Number, required: true },
    isNew: { type: Boolean, default: false },
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
   ORDER SCHEMA
========================= */

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    model: String,
    connectivity: String,
    color: String,
    storage: String,
    variant: String,
    chip: String,
    size: String,
    display: String,
    image: String,
    price: Number
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    customer: {
        name: String,
        email: String,
        contact: String,
        addressLabel: String,
        address: String,
        floorRoom: String,
        landmark: String
    },

    payment: {
        cardName: String,
        last4: String
    },

    pickupFromStore: { type: Boolean, default: false },
    selectedStore: { type: String, default: "" },
    estimatedDeliveryDate: { type: String, default: "" },

    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },

    purchaseDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

/* =========================
   SIGNUP
========================= */

app.post("/api/signup", async (req, res) => {
    try {
        const { name, email, phone, dob, pass } = req.body;

        if (!name || !email || !phone || !dob || !pass) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(pass, 10);

        const newUser = new User({
            name,
            email,
            phone,
            dob,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({ message: "Signup successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

/* =========================
   SIGNIN
========================= */

app.post("/api/signin", async (req, res) => {
    try {
        const { email, pass } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const match = await bcrypt.compare(pass, user.password);

        if (!match) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({
            message: "Login success",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                dob: user.dob
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

/* =========================
   RESET PASSWORD
========================= */

app.post("/api/reset-password", async (req, res) => {
    try {
        const { email, newPass } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPass, 10);
        user.password = hashedPassword;

        await user.save();

        res.json({ message: "Password updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

/* =========================
   CONTACT FORM SUBMISSION
========================= */

app.post("/api/contact", async (req, res) => {
    try {
        console.log("📩 Contact form received:", req.body);

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: "All contact fields required" });
        }

        const newContact = new Contact({
            name,
            email,
            phone,
            message
        });

        const savedContact = await newContact.save();

        console.log("✅ Contact saved:", savedContact);

        res.json({
            message: "Request submitted successfully",
            contact: savedContact
        });

    } catch (error) {
        console.log("❌ Contact route error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

/* =========================
   VIEW ALL CONTACT REQUESTS
========================= */

app.get("/api/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching contacts" });
    }
});

/* =========================
   VIEW ALL SIGNED UP USERS
========================= */

app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

/* =========================
   GET ALL PRODUCTS
========================= */

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

/* =========================
   GET SINGLE PRODUCT
========================= */

app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch product" });
    }
});

/* =========================
   PLACE ORDER
========================= */

app.post("/api/orders", async (req, res) => {
    try {
        const {
            checkoutForm,
            cart,
            pickupFromStore,
            selectedStore,
            estimatedDeliveryDate,
            userId
        } = req.body;

        if (!checkoutForm || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        const {
            name,
            email,
            contact,
            addressLabel,
            address,
            floorRoom,
            landmark,
            cardName,
            cardNumber,
            expiryDate,
            cvc
        } = checkoutForm;

        if (
            !name || !email || !contact || !addressLabel || !address ||
            !floorRoom || !landmark || !cardName || !cardNumber ||
            !expiryDate || !cvc
        ) {
            return res.status(400).json({ message: "Please fill all checkout fields" });
        }

        if (pickupFromStore && !selectedStore) {
            return res.status(400).json({ message: "Please select pickup location" });
        }

        let finalItems = [];
        let totalPrice = 0;

        for (const item of cart) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.name}` });
            }

            const computedPrice = calculateItemPrice(product, item);

            const stockResult = reduceStockForItem(product, item);

            if (!stockResult.success) {
                return res.status(400).json({ message: stockResult.message });
            }

            await product.save();

            finalItems.push({
                productId: product._id,
                name: product.name,
                model: item.model || null,
                connectivity: item.connectivity || null,
                color: item.color || null,
                storage: item.storage || null,
                variant: item.variant || null,
                chip: item.chip || null,
                size: item.size || null,
                display: item.display || null,
                image: item.image || "",
                price: computedPrice
            });

            totalPrice += computedPrice;
        }

        const orderCount = await Order.countDocuments();
        const orderNumber = `#NVA${String(orderCount + 1).padStart(3, "0")}`;

        const order = new Order({
            orderNumber,
            userId: userId || null,
            customer: {
                name,
                email,
                contact,
                addressLabel,
                address,
                floorRoom,
                landmark
            },
            payment: {
                cardName,
                last4: cardNumber.replace(/\s/g, "").slice(-4)
            },
            pickupFromStore: !!pickupFromStore,
            selectedStore: pickupFromStore ? selectedStore : "",
            estimatedDeliveryDate: pickupFromStore ? "" : estimatedDeliveryDate,
            items: finalItems,
            totalPrice,
            purchaseDate: new Date()
        });

        await order.save();

        const now = new Date();

        res.status(201).json({
            message: "Order placed successfully",
            receipt: {
                orderNumber: order.orderNumber,
                purchaseDate: now.toLocaleDateString(),
                purchaseTime: now.toLocaleTimeString(),
                name: order.customer.name,
                email: order.customer.email,
                contact: order.customer.contact,
                addressLabel: order.customer.addressLabel,
                address: order.customer.address,
                floorRoom: order.customer.floorRoom,
                landmark: order.customer.landmark,
                pickupFromStore: order.pickupFromStore,
                selectedStore: order.selectedStore,
                estimatedDeliveryDate: order.estimatedDeliveryDate,
                items: order.items,
                totalPrice: order.totalPrice.toLocaleString()
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to place order" });
    }
});

/* =========================
   GET ORDER BY ORDER NUMBER
========================= */

app.get("/api/orders/:orderNumber", async (req, res) => {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderNumber });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch order" });
    }
});

/* =========================
   HELPERS
========================= */

function calculateItemPrice(product, item) {
    let total = product.basePrice || 0;

    if (item.model && Array.isArray(product.models)) {
        const model = product.models.find(m => m.name === item.model);

        if (model) {
            total += model.priceMod || model.price || model.basePrice || 0;

            if (item.connectivity && Array.isArray(model.connectivityOptions)) {
                const connectivity = model.connectivityOptions.find(c => c.name === item.connectivity);

                if (connectivity) {
                    total += connectivity.priceMod || connectivity.price || 0;
                }
            }
        }
    }

    if (item.storage && Array.isArray(product.storageOptions)) {
        const storage = product.storageOptions.find(s => s.name === item.storage);

        if (storage) {
            total += storage.priceMod || storage.price || 0;
        }
    }

    if (item.size && Array.isArray(product.sizes)) {
        const size = product.sizes.find(s => s.name === item.size);

        if (size) {
            total += size.priceMod || size.price || size.basePrice || 0;
        }
    }

    if (item.display && Array.isArray(product.displayOptions)) {
        const display = product.displayOptions.find(d => d.name === item.display);

        if (display) {
            total += display.priceMod || display.price || 0;
        }
    }

    if (item.chip && Array.isArray(product.chips)) {
        const chip = product.chips.find(c => c.name === item.chip);

        if (chip) {
            total += chip.priceMod || chip.price || 0;

            if (item.variant && Array.isArray(chip.variants)) {
                const variant = chip.variants.find(v => v.name === item.variant);

                if (variant) {
                    total += variant.priceMod || variant.price || 0;
                }
            }
        }
    }

    return total;
}

function reduceStockForItem(product, item) {
    if (!Array.isArray(product.inventory) || product.inventory.length === 0) {
        return { success: true };
    }

    let inventoryItem = null;

    const hasStorage = !!item.storage;
    const hasModel = !!item.model;
    const hasColor = !!item.color;

    if (hasStorage) {
        inventoryItem = product.inventory.find(inv =>
            String(inv.color || "") === String(item.color || "") &&
            String(inv.storage || "") === String(item.storage || "")
        );
    } else if (hasModel) {
        inventoryItem = product.inventory.find(inv =>
            String(inv.color || "") === String(item.color || "") &&
            String(inv.model || "") === String(item.model || "")
        );
    } else if (hasColor) {
        inventoryItem = product.inventory.find(inv =>
            String(inv.color || "") === String(item.color || "")
        );
    } else {
        inventoryItem = product.inventory.find(inv => inv.stock > 0);
    }

    if (!inventoryItem) {
        return { success: false, message: `${product.name} variant stock not found` };
    }

    if (inventoryItem.stock <= 0) {
        return { success: false, message: `${product.name} is out of stock` };
    }

    inventoryItem.stock -= 1;
    return { success: true };
}

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});