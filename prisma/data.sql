DELETE FROM
    Product;

DELETE FROM
    Category;

INSERT INTO
    Category (name, parentCategoryId)
VALUES
    ('Laptops and Computers', NULL),
    ('Smartphones and Smartwatches', NULL),
    ('Computer Components', NULL),
    ('Gaming and Streaming Equipment', NULL),
    ('Peripheral Devices', NULL),
    ('TVs and Audio Equipment', NULL),
    ('Smart Home and Lifestyle Product', NULL),
    ('Accessories', NULL);

INSERT INTO
    Category (name, parentCategoryId)
VALUES
    -- SubCategory for "Laptops and Computers"
    (
        'Laptops',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laptops and Computers'
        )
    ),
    (
        'Desktops',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laptops and Computers'
        )
    ),
    (
        'Tablets',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laptops and Computers'
        )
    ),
    (
        'Monitors',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laptops and Computers'
        )
    ),
    (
        'Workstations',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laptops and Computers'
        )
    ),
    -- SubCategory for "Smartphones and Smartwatches"
    (
        'Smartphones',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones and Smartwatches'
        )
    ),
    (
        'Smartwatches',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones and Smartwatches'
        )
    ),
    (
        'Phone Accessories',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones and Smartwatches'
        )
    ),
    -- SubCategory for "Computer Components"
    (
        'Processors',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Computer Components'
        )
    ),
    (
        'Graphics Cards',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Computer Components'
        )
    ),
    (
        'Memory (RAM)',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Computer Components'
        )
    ),
    (
        'Motherboards',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Computer Components'
        )
    ),
    (
        'Storage (SSD/HDD)',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Computer Components'
        )
    ),
    (
        'Power Supplies',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Computer Components'
        )
    ),
    (
        'Cooling Systems',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Computer Components'
        )
    ),
    -- SubCategory for "Gaming and Streaming Equipment"
    (
        'Streaming Accessories',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming and Streaming Equipment'
        )
    ),
    (
        'Gaming Consoles',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming and Streaming Equipment'
        )
    ),
    (
        'Gaming Chairs',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming and Streaming Equipment'
        )
    ),
    -- SubCategory for "Peripheral Devices"
    (
        'Keyboards',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Peripheral Devices'
        )
    ),
    (
        'Mice',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Peripheral Devices'
        )
    ),
    (
        'Headsets',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Peripheral Devices'
        )
    ),
    (
        'Webcams',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Peripheral Devices'
        )
    ),
    (
        'Printers',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Peripheral Devices'
        )
    ),
    -- SubCategory for "TVs and Audio Equipment"
    (
        'Televisions',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'TVs and Audio Equipment'
        )
    ),
    (
        'Soundbars',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'TVs and Audio Equipment'
        )
    ),
    (
        'Speakers',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'TVs and Audio Equipment'
        )
    ),
    (
        'Headphones',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'TVs and Audio Equipment'
        )
    ),
    -- SubCategory for "Smart Home and Lifestyle Product"
    (
        'Smart Home Devices',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home and Lifestyle Product'
        )
    ),
    (
        'Household Appliances',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home and Lifestyle Product'
        )
    ),
    -- SubCategory for "Accessories"
    (
        'Cables',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Accessories'
        )
    ),
    (
        'Adapters',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Accessories'
        )
    ),
    (
        'Bags',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Accessories'
        )
    );

INSERT INTO
    Category (name, parentCategoryId)
VALUES
    (
        'Phone Cases',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Accessories'
        )
    ),
    (
        'Screen Protectors',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Accessories'
        )
    ),
    (
        'Phone Holders and Stands',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Accessories'
        )
    ),
    (
        'Power Banks',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Accessories'
        )
    ),
    (
        'Chargers',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Accessories'
        )
    );

INSERT INTO
    Category (name, parentCategoryId)
VALUES
    (
        'Smart Lighting',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        )
    ),
    (
        'Smart Plugs and Outlets',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        )
    ),
    (
        'Smart Thermostats',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        )
    ),
    (
        'Smart Security and Cameras',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        )
    ),
    (
        'Smart Locks',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        )
    ),
    (
        'Smart Home Hubs',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        )
    );

INSERT INTO
    Category (name, parentCategoryId)
VALUES
    (
        'Kitchen Appliances',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        )
    ),
    (
        'Cleaning Appliances',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        )
    ),
    (
        'Air Conditioners and Heaters',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        )
    ),
    (
        'Laundry Appliances',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        )
    ),
    (
        'Small Home Appliances',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        )
    ),
    (
        'Water Purifiers',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        )
    );