const Filters = ({
    categories,
    tags,
    filters,
    onFilterChange,
    onClearFilters,
}) => {
    const handleTagChange = (tag) => {
        let updatedTags;

        if (filters.tags.includes(tag)) {
            updatedTags = filters.tags.filter(
                (selectedTag) => selectedTag !== tag
            );
        } else {
            updatedTags = [...filters.tags, tag];
        }

        onFilterChange("tags", updatedTags);
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0 fw-bold">Filters</h5>

                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={onClearFilters}
                    >
                        Clear All
                    </button>
                </div>

                {/* Search */}
                <div className="mb-4">
                    <label className="form-label fw-semibold">
                        Search Products
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) =>
                            onFilterChange("search", e.target.value)
                        }
                    />
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="form-label fw-semibold">
                        Category
                    </label>

                    <select
                        className="form-select"
                        value={filters.category}
                        onChange={(e) =>
                            onFilterChange("category", e.target.value)
                        }
                    >
                        <option value="">All Categories</option>

                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="form-label fw-semibold">
                        Maximum Price: ₹{filters.maxPrice}
                    </label>

                    <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="500"
                        step="10"
                        value={filters.maxPrice}
                        onChange={(e) =>
                            onFilterChange(
                                "maxPrice",
                                Number(e.target.value)
                            )
                        }
                    />

                    <div className="d-flex justify-content-between text-muted small">
                        <span>₹0</span>
                        <span>₹500</span>
                    </div>
                </div>

                {/* Weight Filter */}
                <div className="mb-4">
                    <label className="form-label fw-semibold">
                        Weight
                    </label>

                    <select
                        className="form-select"
                        value={filters.weight}
                        onChange={(e) =>
                            onFilterChange("weight", e.target.value)
                        }
                    >
                        <option value="">All Weights</option>
                        <option value="under-200">Under 200g</option>
                        <option value="200-300">200g - 300g</option>
                        <option value="above-300">Above 300g</option>
                    </select>
                </div>

                {/* Tags */}
                <div className="mb-4">
                    <label className="form-label fw-semibold">
                        Tags
                    </label>

                    <div
                        style={{
                            maxHeight: "180px",
                            overflowY: "auto",
                        }}
                    >
                        {tags.map((tag) => (
                            <div className="form-check mb-2" key={tag}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`tag-${tag}`}
                                    checked={filters.tags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                />

                                <label
                                    className="form-check-label"
                                    htmlFor={`tag-${tag}`}
                                >
                                    {tag}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Availability */}
                <div className="mb-3">
                    <div className="form-check mb-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inStock"
                            checked={filters.inStock}
                            onChange={(e) =>
                                onFilterChange(
                                    "inStock",
                                    e.target.checked
                                )
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="inStock"
                        >
                            In Stock Only
                        </label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="featured"
                            checked={filters.featured}
                            onChange={(e) =>
                                onFilterChange(
                                    "featured",
                                    e.target.checked
                                )
                            }
                        />

                        <label
                            className="form-check-label"
                            htmlFor="featured"
                        >
                            Featured Products
                        </label>
                    </div>
                </div>

                {/* Sorting */}
                <div className="mt-4">
                    <label className="form-label fw-semibold">
                        Sort By
                    </label>

                    <select
                        className="form-select"
                        value={filters.sort}
                        onChange={(e) =>
                            onFilterChange("sort", e.target.value)
                        }
                    >
                        <option value="default">Default</option>
                        <option value="price-low">
                            Price: Low to High
                        </option>
                        <option value="price-high">
                            Price: High to Low
                        </option>
                        <option value="name-asc">
                            Name: A to Z
                        </option>
                        <option value="name-desc">
                            Name: Z to A
                        </option>
                    </select>
                </div>

            </div>
        </div>
    );
};

export default Filters;