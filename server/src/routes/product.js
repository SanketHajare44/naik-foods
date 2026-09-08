const express = require("express");
const Product = require("../models/product");

const productRouter = express.Router();

// GET all products + search + filters + sorting + pagination
productRouter.get("/", async (req, res) => {
    try {
        const {
            search,
            category,
            minPrice,
            maxPrice,
            tags,
            sort,
            page = 1,
            limit = 6,
        } = req.query;

        const query = {};

        // Search by product name or description
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};

            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }

        // Filter by tag
        if (tags) {
            query.tags = {
                $regex: tags,
                $options: "i",
            };
        }

        // Sorting
        let sortOption = {};

        if (sort === "price_asc") {
            sortOption.price = 1;
        } else if (sort === "price_desc") {
            sortOption.price = -1;
        } else if (sort === "name_asc") {
            sortOption.name = 1;
        } else if (sort === "name_desc") {
            sortOption.name = -1;
        }

        // Pagination
        const currentPage = Number(page);
        const pageLimit = Number(limit);
        const skip = (currentPage - 1) * pageLimit;

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(pageLimit);

        const totalPages = Math.ceil(totalProducts / pageLimit);

        res.status(200).json({
            success: true,
            count: products.length,
            totalProducts,
            currentPage,
            totalPages,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
});

// GET single product by slug
productRouter.get("/:slug", async (req, res) => {
    try {
        const { slug } = req.params;

        const product = await Product.findOne({ slug });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error.message,
        });
    }
});

module.exports = {
    productRouter,
};