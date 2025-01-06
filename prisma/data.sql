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

INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Dell XPS 13',
        'Dell',
        '13-inch ultraportable laptop with high-performance hardware.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laptops'
        ),
        4999.99,
        50
    ),
    (
        'HP Spectre x360',
        'HP',
        'Premium convertible laptop with touchscreen.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laptops'
        ),
        5599.99,
        30
    ),
    (
        'MacBook Air M2',
        'Apple',
        'Thin and light laptop with Apple M2 chip.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laptops'
        ),
        6999.00,
        40
    ),
    (
        'Asus ROG Zephyrus G14',
        'Asus',
        'Compact gaming laptop with AMD Ryzen processor.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laptops'
        ),
        5999.99,
        25
    ),
    (
        'Lenovo ThinkPad X1 Carbon',
        'Lenovo',
        'Business laptop with durable design and powerful features.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laptops'
        ),
        7999.99,
        20
    );

-- Product for "Desktops"
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'HP Omen 30L',
        'HP',
        'High-performance gaming desktop with customizable hardware.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Desktops'
        ),
        8499.99,
        15
    ),
    (
        'Apple iMac 24"',
        'Apple',
        'All-in-one desktop with Retina display.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Desktops'
        ),
        9999.00,
        10
    ),
    (
        'Dell OptiPlex 5090',
        'Dell',
        'Reliable business desktop with compact design.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Desktops'
        ),
        4599.99,
        40
    ),
    (
        'Alienware Aurora R13',
        'Alienware',
        'Powerful gaming desktop with NVIDIA RTX graphics.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Desktops'
        ),
        12499.99,
        8
    ),
    (
        'Lenovo IdeaCentre 3',
        'Lenovo',
        'Affordable desktop for everyday use.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Desktops'
        ),
        2999.99,
        60
    );

-- Product for "Tablets"
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'iPad Pro 11"',
        'Apple',
        'Premium tablet with M2 chip and Apple Pencil support.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Tablets'
        ),
        4999.99,
        25
    ),
    (
        'Samsung Galaxy Tab S8',
        'Samsung',
        'High-performance Android tablet with S Pen.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Tablets'
        ),
        3899.99,
        35
    ),
    (
        'Microsoft Surface Pro 9',
        'Microsoft',
        '2-in-1 tablet and laptop with detachable keyboard.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Tablets'
        ),
        6199.99,
        20
    ),
    (
        'Lenovo Tab P12 Pro',
        'Lenovo',
        'Android tablet with stunning AMOLED display.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Tablets'
        ),
        2999.99,
        30
    ),
    (
        'Amazon Fire HD 10',
        'Amazon',
        'Affordable tablet with Alexa integration.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Tablets'
        ),
        999.99,
        50
    );

-- Product for "Monitors"
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Dell UltraSharp U2723QE',
        'Dell',
        '27-inch 4K monitor with wide color gamut.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Monitors'
        ),
        2499.99,
        40
    ),
    (
        'LG UltraGear 27GP850-B',
        'LG',
        '27-inch gaming monitor with 165Hz refresh rate.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Monitors'
        ),
        1999.99,
        30
    ),
    (
        'Samsung Smart Monitor M8',
        'Samsung',
        'Smart monitor with streaming apps.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Monitors'
        ),
        2999.99,
        25
    ),
    (
        'Asus ProArt PA32UCX',
        'Asus',
        'Professional monitor with HDR support.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Monitors'
        ),
        5999.99,
        10
    ),
    (
        'BenQ EX3501R',
        'BenQ',
        'Curved ultrawide monitor for productivity.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Monitors'
        ),
        3499.99,
        15
    );

-- Product for "Workstations"
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'HP ZBook Fury 16',
        'HP',
        'Powerful mobile workstation for professionals.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Workstations'
        ),
        12499.99,
        10
    ),
    (
        'Dell Precision 5560',
        'Dell',
        'High-performance workstation laptop.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Workstations'
        ),
        9499.99,
        15
    ),
    (
        'Apple Mac Studio',
        'Apple',
        'Compact desktop workstation with M2 Ultra chip.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Workstations'
        ),
        15999.00,
        5
    ),
    (
        'Lenovo ThinkStation P620',
        'Lenovo',
        'Workstation with AMD Ryzen Threadripper.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Workstations'
        ),
        19999.99,
        8
    ),
    (
        'Asus ProArt StudioBook 16',
        'Asus',
        'Creative workstation with 4K OLED display.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Workstations'
        ),
        11999.99,
        12
    );

-- Product for "Phone Cases"
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'OtterBox Defender Case',
        'OtterBox',
        'Heavy-duty case for iPhone 14 with shockproof protection.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Cases'
        ),
        49.99,
        100
    ),
    (
        'Spigen Ultra Hybrid Case',
        'Spigen',
        'Transparent protective case for Samsung Galaxy S22.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Cases'
        ),
        19.99,
        150
    ),
    (
        'Apple Leather Case',
        'Apple',
        'Premium leather case for iPhone 13.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Cases'
        ),
        49.00,
        120
    );

-- Product for "Chargers and Cables"
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Anker PowerPort 3 Charger',
        'Anker',
        '30W fast charger with USB-C port.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Chargers'
        ),
        29.99,
        200
    ),
    (
        'Samsung Wireless Charger Pad',
        'Samsung',
        'Qi-certified wireless charger for Galaxy devices.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Chargers'
        ),
        39.99,
        180
    );

-- Product for "Screen Protectors"
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'ZAGG InvisibleShield Glass Elite',
        'ZAGG',
        'Tempered glass screen protector for iPhone 13.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Screen Protectors'
        ),
        39.99,
        100
    ),
    (
        'Belkin InvisiGlass Ultra Screen Protector',
        'Belkin',
        'For Samsung Galaxy S21 Ultra.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Screen Protectors'
        ),
        29.99,
        150
    ),
    (
        'Spigen Glas.tR Slim',
        'Spigen',
        'Tempered glass protector for Google Pixel 6.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Screen Protectors'
        ),
        19.99,
        200
    );

-- Product for "Phone Holders and Stands"
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'iOttie Easy One Touch 5',
        'iOttie',
        'Car mount and phone holder for smartphones.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Holders and Stands'
        ),
        29.99,
        120
    ),
    (
        'Anker Wireless Charging Stand',
        'Anker',
        'Stand with built-in wireless charging for iPhone.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Holders and Stands'
        ),
        39.99,
        150
    ),
    (
        'Mophie Phone Stand',
        'Mophie',
        'Adjustable phone stand with built-in charger.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Phone Holders and Stands'
        ),
        49.99,
        80
    );

-- Product for "Power Banks"
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Anker PowerCore 10000',
        'Anker',
        'Compact portable charger with 10,000mAh capacity.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Power Banks'
        ),
        25.99,
        220
    ),
    (
        'RAVPower 20000mAh Power Bank',
        'RAVPower',
        'High-capacity power bank with dual USB ports.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Power Banks'
        ),
        45.99,
        150
    ),
    (
        'Zendure SuperTank Pro',
        'Zendure',
        '26,800mAh portable power bank with USB-C PD.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Power Banks'
        ),
        99.99,
        100
    );

INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    -- Smartphones (categoryId = 14)
    (
        'Galaxy S23 Ultra',
        'Samsung',
        'Flagship smartphone with 200 MP camera and S Pen.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones'
        ),
        1199.99,
        50
    ),
    (
        'iPhone 15 Pro',
        'Apple',
        'Latest iPhone with A17 Bionic chip and titanium design.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones'
        ),
        999.99,
        100
    ),
    (
        'Pixel 8 Pro',
        'Google',
        'Advanced AI features and Tensor G3 chip.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones'
        ),
        899.99,
        80
    ),
    (
        'OnePlus 12',
        'OnePlus',
        'High-performance Android phone with fast charging.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones'
        ),
        749.99,
        60
    ),
    (
        'Xperia 1 V',
        'Sony',
        '4K HDR OLED display and advanced camera system.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones'
        ),
        1399.99,
        30
    ),
    (
        'Galaxy A54 5G',
        'Samsung',
        'Mid-range 5G smartphone with long battery life.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones'
        ),
        449.99,
        120
    ),
    (
        'iPhone SE (3rd Gen)',
        'Apple',
        'Compact phone with A15 Bionic chip.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones'
        ),
        429.99,
        150
    ),
    (
        'Moto G Power 2024',
        'Motorola',
        'Affordable phone with 3-day battery.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartphones'
        ),
        199.99,
        200
    ),
    -- Smartwatches (categoryId = 15)
    (
        'Apple Watch Series 9',
        'Apple',
        'Smartwatch with advanced health tracking and Siri integration.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartwatches'
        ),
        399.99,
        70
    ),
    (
        'Galaxy Watch 6',
        'Samsung',
        'Stylish smartwatch with advanced fitness features.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartwatches'
        ),
        349.99,
        90
    ),
    (
        'Fitbit Versa 4',
        'Fitbit',
        'Affordable fitness-focused smartwatch.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartwatches'
        ),
        229.99,
        150
    ),
    (
        'Garmin Forerunner 265',
        'Garmin',
        'GPS running smartwatch with advanced training features.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartwatches'
        ),
        449.99,
        50
    ),
    (
        'Pixel Watch',
        'Google',
        'Premium smartwatch with Wear OS and Fitbit integration.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartwatches'
        ),
        349.99,
        80
    ),
    (
        'Huawei Watch GT 4',
        'Huawei',
        'Elegant smartwatch with long battery life.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartwatches'
        ),
        299.99,
        100
    ),
    (
        'Amazfit GTR 4',
        'Amazfit',
        'Smartwatch with 150+ sports modes and AMOLED display.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smartwatches'
        ),
        199.99,
        120
    ),
    -- Processors (categoryId = 17)
    (
        'Ryzen 9 7950X',
        'AMD',
        '16-core processor with advanced multi-threading.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Processors'
        ),
        699.99,
        40
    ),
    (
        'Core i9-13900K',
        'Intel',
        'High-performance processor with 24 cores.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Processors'
        ),
        619.99,
        50
    ),
    (
        'Ryzen 5 7600X',
        'AMD',
        'Affordable 6-core processor for gaming and productivity.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Processors'
        ),
        299.99,
        80
    ),
    (
        'Core i5-13600K',
        'Intel',
        '12-core processor for versatile workloads.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Processors'
        ),
        329.99,
        100
    ),
    (
        'Ryzen Threadripper PRO 5995WX',
        'AMD',
        'High-end workstation processor with 64 cores.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Processors'
        ),
        6499.99,
        10
    ),
    -- Graphics Cards (categoryId = 18)
    (
        'GeForce RTX 4090',
        'NVIDIA',
        'Top-tier GPU with ray tracing and AI features.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Graphics Cards'
        ),
        1599.99,
        30
    ),
    (
        'Radeon RX 7900 XTX',
        'AMD',
        'High-performance graphics card with advanced rendering.',
(
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Graphics Cards'
        ),
        999.99,
        40
    ),
    (
        'GeForce RTX 4070 Ti',
        'NVIDIA',
        'Mid-range GPU with exceptional gaming performance.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Graphics Cards'
        ),
        799.99,
        50
    ),
    (
        'Radeon RX 7600',
        'AMD',
        'Affordable GPU for 1080p gaming.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Graphics Cards'
        ),
        269.99,
        70
    ),
    (
        'GeForce RTX 4060',
        'NVIDIA',
        'Efficient GPU for budget-friendly gaming builds.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Graphics Cards'
        ),
        299.99,
        100
    ),
    -- Memory (RAM) (categoryId = 19)
    (
        'Corsair Vengeance LPX 16GB',
        'Corsair',
        'High-performance DDR4 RAM.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Memory (RAM)'
        ),
        79.99,
        200
    ),
    (
        'G.Skill Trident Z5 RGB 32GB',
        'G.Skill',
        'Premium DDR5 RAM with RGB lighting.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Memory (RAM)'
        ),
        199.99,
        150
    ),
    (
        'Kingston Fury Beast 16GB',
        'Kingston',
        'Reliable DDR4 RAM for gaming and work.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Memory (RAM)'
        ),
        69.99,
        250
    ),
    (
        'Crucial Ballistix 8GB',
        'Crucial',
        'Budget-friendly DDR4 RAM for everyday use.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Memory (RAM)'
        ),
        34.99,
        300
    ),
    (
        'Corsair Dominator Platinum 64GB',
        'Corsair',
        'High-capacity DDR5 RAM for heavy workloads.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Memory (RAM)'
        ),
        399.99,
        50
    ),
    -- Motherboards (categoryId = 20)
    (
        'ROG Strix Z790-E Gaming WiFi',
        'ASUS',
        'High-end gaming motherboard with Intel support.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Motherboards'
        ),
        499.99,
        40
    ),
    (
        'MSI MAG B550 TOMAHAWK',
        'MSI',
        'Mid-range AMD motherboard with excellent connectivity.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Motherboards'
        ),
        189.99,
        60
    ),
    (
        'Gigabyte AORUS Master X670E',
        'Gigabyte',
        'Advanced motherboard with PCIe 5.0 support.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Motherboards'
        ),
        399.99,
        30
    ),
    (
        'ASRock B450M Steel Legend',
        'ASRock',
        'Affordable micro-ATX motherboard for AMD CPUs.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Motherboards'
        ),
        129.99,
        100
    ),
    (
        'ASUS Prime Z590-A',
        'ASUS',
        'Reliable Intel motherboard for productivity and gaming.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Motherboards'
        ),
        249.99,
        70
    ),
    -- Storage (SSD/HDD) (categoryId = 21)
    (
        'Samsung 980 Pro 1TB',
        'Samsung',
        'High-speed PCIe 4.0 NVMe SSD.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Storage (SSD/HDD)'
        ),
        149.99,
        150
    ),
    (
        'WD Black SN850X 2TB',
        'Western Digital',
        'Performance-focused SSD for gaming.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Storage (SSD/HDD)'
        ),
        229.99,
        120
    ),
    (
        'Seagate Barracuda 4TB',
        'Seagate',
        'Large-capacity HDD for storage needs.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Storage (SSD/HDD)'
        ),
        99.99,
        200
    ),
    (
        'Crucial MX500 500GB',
        'Crucial',
        'Affordable SATA SSD for everyday use.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Storage (SSD/HDD)'
        ),
        49.99,
        300
    ),
    (
        'Kingston NV2 1TB',
        'Kingston',
        'Budget-friendly NVMe SSD.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Storage (SSD/HDD)'
        ),
        89.99,
        250
    ),
    -- Power Supplies (categoryId = 22)
    (
        'Corsair RM850x 850W',
        'Corsair',
        'Reliable power supply with 80+ Gold certification.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Power Supplies'
        ),
        139.99,
        100
    ),
    (
        'EVGA SuperNOVA 750 G5',
        'EVGA',
        'Efficient PSU for gaming builds.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Power Supplies'
        ),
        129.99,
        120
    ),
    (
        'Seasonic Focus GX-650',
        'Seasonic',
        '650W power supply with modular cables.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Power Supplies'
        ),
        119.99,
        150
    ),
    (
        'Thermaltake Smart 500W',
        'Thermaltake',
        'Affordable PSU for basic builds.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Power Supplies'
        ),
        49.99,
        200
    ),
    (
        'Be Quiet! Straight Power 11 1000W',
        'Be Quiet!',
        'High-capacity PSU for demanding setups.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Power Supplies'
        ),
        199.99,
        70
    ),
    -- Cooling Systems (categoryId = 23)
    (
        'Noctua NH-D15',
        'Noctua',
        'High-performance air cooler for CPUs.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cooling Systems'
        ),
        99.99,
        80
    ),
    (
        'Corsair iCUE H150i Elite Capellix',
        'Corsair',
        'Premium liquid cooler with RGB lighting.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cooling Systems'
        ),
        179.99,
        60
    ),
    (
        'Cooler Master Hyper 212 Black Edition',
        'Cooler Master',
        'Affordable air cooler for effective cooling.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cooling Systems'
        ),
        49.99,
        150
    ),
    (
        'NZXT Kraken Z73',
        'NZXT',
        'Liquid cooler with customizable LCD display.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cooling Systems'
        ),
        249.99,
        40
    ),
    (
        'Arctic Freezer 34 eSports DUO',
        'Arctic',
        'Budget-friendly air cooler with dual fans.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cooling Systems'
        ),
        39.99,
        200
    ),
    -- Streaming Accessories (categoryId = 26)
    (
        'Elgato Stream Deck XL',
        'Elgato',
        'Customizable control pad for streamers.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cooling Systems'
        ),
        249.99,
        50
    ),
    (
        'Logitech Litra Glow',
        'Logitech',
        'Professional lighting for streaming setups.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cooling Systems'
        ),
        59.99,
        120
    ),
    (
        'HyperX QuadCast S',
        'HyperX',
        'RGB USB microphone for professional audio.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cooling Systems'
        ),
        159.99,
        70
    ),
    (
        'Razer Kiyo Pro',
        'Razer',
        'Advanced webcam with excellent low-light performance.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cooling Systems'
        ),
        199.99,
        60
    ),
    (
        'Blue Yeti X',
        'Blue',
        'High-quality USB microphone for streaming.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cooling Systems'
        ),
        169.99,
        90
    ),
    -- Gaming Consoles (categoryId = 27)
    (
        'PlayStation 5',
        'Sony',
        'Next-gen console with immersive gaming experience.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming Consoles'
        ),
        499.99,
        80
    ),
    (
        'Xbox Series X',
        'Microsoft',
        'High-performance console with 4K gaming.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming Consoles'
        ),
        499.99,
        70
    ),
    (
        'Nintendo Switch OLED',
        'Nintendo',
        'Hybrid console with vibrant OLED screen.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming Consoles'
        ),
        349.99,
        100
    ),
    (
        'Steam Deck 512GB',
        'Valve',
        'Portable gaming device with powerful specs.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming Consoles'
        ),
        649.99,
        50
    ),
    (
        'PlayStation 5 Digital Edition',
        'Sony',
        'Digital-only next-gen console.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming Consoles'
        ),
        399.99,
        60
    ),
    -- Gaming Chairs (categoryId = 28)
    (
        'Secretlab TITAN Evo 2024',
        'Secretlab',
        'Ergonomic gaming chair with premium comfort.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming Chairs'
        ),
        549.99,
        30
    ),
    (
        'Herman Miller Vantum',
        'Herman Miller',
        'Top-of-the-line gaming chair for long sessions.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming Chairs'
        ),
        1299.99,
        15
    ),
    (
        'DXRacer Formula Series',
        'DXRacer',
        'Affordable and stylish gaming chair.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming Chairs'
        ),
        299.99,
        50
    ),
    (
        'AndaSeat Kaiser 3',
        'AndaSeat',
        'Heavy-duty gaming chair with lumbar support.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming Chairs'
        ),
        499.99,
        25
    ),
    (
        'Razer Enki Pro',
        'Razer',
        'Comfortable chair for gamers and professionals.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Gaming Chairs'
        ),
        399.99,
        40
    ),
    -- Keyboards (categoryId = 29)
    (
        'Corsair K95 RGB Platinum',
        'Corsair',
        'Mechanical gaming keyboard with RGB.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Keyboards'
        ),
        199.99,
        70
    ),
    (
        'Logitech G915 TKL',
        'Logitech',
        'Wireless mechanical keyboard with low latency.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Keyboards'
        ),
        229.99,
        60
    ),
    (
        'Razer BlackWidow V4',
        'Razer',
        'Iconic mechanical keyboard for gaming.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Keyboards'
        ),
        169.99,
        80
    ),
    (
        'SteelSeries Apex Pro',
        'SteelSeries',
        'Customizable mechanical keyboard with OLED.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Keyboards'
        ),
        199.99,
        50
    ),
    (
        'HyperX Alloy Elite 2',
        'HyperX',
        'RGB keyboard for gamers and streamers.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Keyboards'
        ),
        129.99,
        90
    ),
    -- Mice (categoryId = 30)
    (
        'Logitech G Pro X Superlight',
        'Logitech',
        'Lightweight wireless mouse for gaming.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Mice'
        ),
        149.99,
        80
    ),
    (
        'Razer DeathAdder V3 Pro',
        'Razer',
        'Ergonomic wireless gaming mouse.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Mice'
        ),
        149.99,
        90
    ),
    (
        'SteelSeries Rival 5',
        'SteelSeries',
        'Versatile gaming mouse for all genres.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Mice'
        ),
        69.99,
        120
    ),
    (
        'Corsair M65 RGB Ultra',
        'Corsair',
        'FPS gaming mouse with adjustable weights.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Mice'
        ),
        79.99,
        100
    ),
    (
        'Glorious Model O Wireless',
        'Glorious',
        'Lightweight wireless mouse for FPS gamers.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Mice'
        ),
        99.99,
        70
    ),
    -- Headsets (categoryId = 31)
    (
        'HyperX Cloud II Wireless',
        'HyperX',
        'Comfortable wireless headset with 7.1 surround sound.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Headsets'
        ),
        149.99,
        90
    ),
    (
        'SteelSeries Arctis Nova Pro',
        'SteelSeries',
        'Premium headset with active noise canceling.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Headsets'
        ),
        349.99,
        60
    ),
    (
        'Razer Kraken V3',
        'Razer',
        'Wired headset with THX spatial audio.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Headsets'
        ),
        99.99,
        120
    ),
    (
        'Logitech G733 Lightspeed',
        'Logitech',
        'Wireless gaming headset with RGB lighting.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Headsets'
        ),
        129.99,
        80
    ),
    (
        'Corsair HS80 RGB Wireless',
        'Corsair',
        'High-quality wireless gaming headset.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Headsets'
        ),
        149.99,
        70
    ),
    -- Webcams (categoryId = 32)
    (
        'Logitech C922 Pro',
        'Logitech',
        'Webcam for high-quality video streaming.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Webcams'
        ),
        99.99,
        150
    ),
    (
        'Razer Kiyo',
        'Razer',
        'Webcam with built-in ring light.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Webcams'
        ),
        79.99,
        100
    ),
    (
        'Elgato Facecam',
        'Elgato',
        'Premium webcam for streamers.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Webcams'
        ),
        199.99,
        50
    ),
    (
        'Microsoft Modern Webcam',
        'Microsoft',
        'Affordable webcam for everyday use.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Webcams'
        ),
        59.99,
        200
    ),
    (
        'Anker PowerConf C300',
        'Anker',
        'Professional webcam with AI-powered framing.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Webcams'
        ),
        129.99,
        80
    );

INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    ) -- Subcategory: Printers
VALUES
    (
        'LaserJet Pro 300',
        'HP',
        'Fast and efficient laser printer with wireless capabilities.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Printers'
        ),
        299.99,
        15
    ),
    (
        'EcoTank L3150',
        'Epson',
        'High-capacity ink tank printer for cost-effective printing.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Printers'
        ),
        199.99,
        25
    ),
    (
        'PIXMA TS6320',
        'Canon',
        'Compact wireless printer for home and office use.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Printers'
        ),
        159.99,
        20
    ),
    (
        'DeskJet 2755e',
        'HP',
        'All-in-one printer with HP Smart app compatibility.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Printers'
        ),
        89.99,
        30
    ),
    (
        'WorkForce WF-7840',
        'Epson',
        'Wide-format printer with duplex printing.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Printers'
        ),
        349.99,
        10
    ),
    -- Subcategory: Televisions
    (
        'OLED55CXPUA',
        'LG',
        '55-inch 4K OLED TV with AI ThinQ technology.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Televisions'
        ),
        1299.99,
        12
    ),
    (
        'Q60A QLED 50-inch',
        'Samsung',
        '4K QLED TV with vibrant colors and slim design.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Televisions'
        ),
        699.99,
        20
    ),
    (
        'Bravia XR A80J',
        'Sony',
        '65-inch OLED TV with Google TV integration.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Televisions'
        ),
        1799.99,
        8
    ),
    (
        'Class 4-Series',
        'TCL',
        'Affordable 55-inch 4K UHD TV.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Televisions'
        ),
        399.99,
        25
    ),
    (
        'NanoCell 85 Series',
        'LG',
        'Smart 75-inch 4K UHD NanoCell TV.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Televisions'
        ),
        999.99,
        10
    ),
    -- Subcategory: Soundbars
    (
        'Beam Gen 2',
        'Sonos',
        'Compact soundbar with Dolby Atmos support.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Soundbars'
        ),
        449.99,
        18
    ),
    (
        'HT-G700',
        'Sony',
        '3.1-channel Dolby Atmos soundbar.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Soundbars'
        ),
        599.99,
        12
    ),
    (
        'HW-Q600A',
        'Samsung',
        'Immersive sound with Dolby Atmos.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Soundbars'
        ),
        499.99,
        20
    ),
    (
        'Roku Streambar',
        'Roku',
        '4K streaming and premium sound in one device.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Soundbars'
        ),
        129.99,
        30
    ),
    (
        'SB36512-F6',
        'Vizio',
        '5.1-channel home theater soundbar.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Soundbars'
        ),
        249.99,
        15
    ),
    -- Subcategory: Speakers
    (
        'Charge 5',
        'JBL',
        'Portable waterproof Bluetooth speaker.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Speakers'
        ),
        179.99,
        25
    ),
    (
        'Echo Studio',
        'Amazon',
        'High-fidelity smart speaker with Alexa.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Speakers'
        ),
        199.99,
        20
    ),
    (
        'SoundLink Revolve',
        'Bose',
        'Portable Bluetooth speaker with 360° sound.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Speakers'
        ),
        299.99,
        18
    ),
    (
        'HomePod mini',
        'Apple',
        'Compact smart speaker with Siri integration.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Speakers'
        ),
        99.99,
        40
    ),
    (
        'XG500',
        'Sony',
        'Portable wireless speaker with powerful sound.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Speakers'
        ),
        399.99,
        10
    ),
    -- Subcategory: Headphones
    (
        'WH-1000XM5',
        'Sony',
        'Industry-leading noise-canceling headphones.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Headphones'
        ),
        349.99,
        15
    ),
    (
        'AirPods Pro 2',
        'Apple',
        'Wireless earbuds with active noise cancellation.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Headphones'
        ),
        249.99,
        30
    ),
    (
        'QuietComfort 45',
        'Bose',
        'Comfortable noise-canceling over-ear headphones.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Headphones'
        ),
        329.99,
        20
    ),
    (
        'Galaxy Buds 2',
        'Samsung',
        'Compact wireless earbuds with ambient sound.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Headphones'
        ),
        149.99,
        25
    ),
    (
        'ATH-M50xBT2',
        'Audio-Technica',
        'Wireless over-ear headphones with studio-quality sound.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Headphones'
        ),
        199.99,
        12
    ),
    -- Subcategory: Smart Home Devices
    (
        'Nest Thermostat',
        'Google',
        'Smart thermostat for home energy savings.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        ),
        129.99,
        25
    ),
    (
        'Echo Show 8',
        'Amazon',
        'Smart display with Alexa and 8-inch screen.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        ),
        109.99,
        20
    ),
    (
        'Arlo Pro 4',
        'Arlo',
        'Wireless security camera with 2K resolution.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        ),
        199.99,
        18
    ),
    (
        'Hue Starter Kit',
        'Philips',
        'Smart lighting kit with 4 bulbs and a hub.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        ),
        199.99,
        15
    ),
    (
        'Smart Lock Pro',
        'August',
        'Keyless entry smart lock with Wi-Fi.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Devices'
        ),
        229.99,
        10
    ),
    -- Subcategory: Household Appliances
    (
        'Roomba i3+',
        'iRobot',
        'Robot vacuum with automatic dirt disposal.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        ),
        599.99,
        10
    ),
    (
        'Dyson V15 Detect',
        'Dyson',
        'Cordless vacuum with laser detection.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        ),
        749.99,
        8
    ),
    (
        'Ninja Foodi 12-in-1',
        'Ninja',
        'Multifunctional pressure cooker and air fryer.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        ),
        229.99,
        15
    ),
    (
        'Smart Oven Air Fryer',
        'Breville',
        'Countertop oven with smart features.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        ),
        349.99,
        12
    ),
    (
        'Pure Cool TP04',
        'Dyson',
        'Air purifier and fan with HEPA filtration.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Household Appliances'
        ),
        499.99,
        20
    ),
    -- Subcategory: Cables
    (
        'USB-C to Lightning',
        'Apple',
        'Durable USB-C to Lightning cable.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cables'
        ),
        19.99,
        100
    ),
    (
        'HDMI 2.1 Cable',
        'Belkin',
        'High-speed HDMI cable for 8K resolution.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cables'
        ),
        29.99,
        75
    ),
    (
        'Ethernet Cable Cat6',
        'Cable Matters',
        'High-speed Ethernet cable for stable connections.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cables'
        ),
        14.99,
        200
    ),
    (
        'DisplayPort Cable',
        'Anker',
        'Reliable DisplayPort to HDMI adapter cable.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cables'
        ),
        24.99,
        50
    ),
    (
        '3.5mm Audio Cable',
        'Ugreen',
        'Premium audio cable for headphones and speakers.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cables'
        ),
        9.99,
        150
    ),
    -- Subcategory: Adapters
    (
        'USB-C Hub',
        'Anker',
        '7-in-1 USB-C hub for multiple devices.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Adapters'
        ),
        49.99,
        40
    ),
    (
        'HDMI to VGA Adapter',
        'Benfei',
        'Compact adapter for HDMI to VGA conversion.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Adapters'
        ),
        15.99,
        80
    ),
    (
        'USB-A to USB-C Adapter',
        'Samsung',
        'Compact adapter for USB connections.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Adapters'
        ),
        9.99,
        150
    ),
    (
        'Thunderbolt 3 Dock',
        'CalDigit',
        'High-performance dock for Thunderbolt devices.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Adapters'
        ),
        299.99,
        10
    ),
    (
        'Lightning to 3.5mm',
        'Apple',
        'Adapter for Lightning to 3.5mm connections.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Adapters'
        ),
        7.99,
        120
    ),
    -- Subcategory: Bags
    (
        'Laptop Sleeve 15-inch',
        'Case Logic',
        'Slim protective sleeve for 15-inch laptops.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Bags'
        ),
        29.99,
        40
    ),
    (
        'Camera Backpack',
        'Lowepro',
        'Protective backpack for cameras and accessories.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Bags'
        ),
        119.99,
        15
    ),
    (
        'Gaming Console Travel Case',
        'RLSOCO',
        'Hard travel case for gaming consoles.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Bags'
        ),
        49.99,
        25
    ),
    (
        'Tablet Folio Case',
        'OtterBox',
        'Durable folio case for tablets.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Bags'
        ),
        59.99,
        30
    ),
    (
        'Travel Organizer',
        'Bellroy',
        'Compact organizer for tech accessories.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Bags'
        ),
        39.99,
        50
    );

-- Smart Lighting
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Philips Hue White and Color Ambiance Bulb',
        'Philips',
        'Smart LED bulb with adjustable color and brightness.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Lighting'
        ),
        49.99,
        150
    ),
    (
        'LIFX A19 Smart Bulb',
        'LIFX',
        'Wi-Fi enabled color-changing light bulb with app control.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Lighting'
        ),
        59.99,
        120
    ),
    (
        'Yeelight Smart LED Bulb',
        'Yeelight',
        'Smart LED bulb with multiple color options and smart app control.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Lighting'
        ),
        29.99,
        200
    );

-- Smart Plugs and Outlets
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'TP-Link Kasa Smart Plug',
        'TP-Link',
        'Smart plug with app control and voice assistant integration.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Plugs and Outlets'
        ),
        24.99,
        250
    ),
    (
        'Amazon Smart Plug',
        'Amazon',
        'Voice-controlled smart plug that works with Alexa.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Plugs and Outlets'
        ),
        19.99,
        300
    ),
    (
        'Meross Smart Plug',
        'Meross',
        'Affordable smart plug with Alexa and Google Assistant compatibility.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Plugs and Outlets'
        ),
        22.99,
        200
    );

-- Smart Thermostats
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Nest Learning Thermostat',
        'Google',
        'Smart thermostat that learns your temperature preferences.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Thermostats'
        ),
        249.99,
        80
    ),
    (
        'Ecobee SmartThermostat',
        'Ecobee',
        'Smart thermostat with Alexa built-in and remote sensors.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Thermostats'
        ),
        229.99,
        100
    ),
    (
        'Honeywell Home T9 Smart Thermostat',
        'Honeywell',
        'Smart thermostat with geofencing and adaptive scheduling.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Thermostats'
        ),
        199.99,
        120
    );

-- Smart Security and Cameras
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Ring Video Doorbell 4',
        'Ring',
        'Smart doorbell with video streaming and motion detection.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Security and Cameras'
        ),
        199.99,
        150
    ),
    (
        'Arlo Pro 4 Security Camera',
        'Arlo',
        'Wireless security camera with 2K video resolution and color night vision.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Security and Cameras'
        ),
        249.99,
        100
    ),
    (
        'Nest Cam Indoor',
        'Google',
        'Indoor security camera with live streaming and activity alerts.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Security and Cameras'
        ),
        129.99,
        200
    );

-- Smart Locks
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'August Wi-Fi Smart Lock',
        'August',
        'Smart lock with keyless entry and remote control via app.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Locks'
        ),
        229.99,
        90
    ),
    (
        'Schlage Encode Smart Lock',
        'Schlage',
        'Wi-Fi-enabled smart lock with built-in alarm and remote access.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Locks'
        ),
        249.99,
        80
    ),
    (
        'Yale Assure Lock SL',
        'Yale',
        'Key-free smart lock with touchscreen and app control.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Locks'
        ),
        229.99,
        120
    );

-- Smart Home Hubs
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Amazon Echo 4th Gen',
        'Amazon',
        'Smart home hub with Alexa and multi-room audio support.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Hubs'
        ),
        99.99,
        200
    ),
    (
        'Samsung SmartThings Hub',
        'Samsung',
        'Smart home hub that connects devices for seamless automation.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Hubs'
        ),
        69.99,
        150
    ),
    (
        'Google Nest Hub',
        'Google',
        'Smart home hub with Google Assistant, displays your home’s information.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Smart Home Hubs'
        ),
        89.99,
        180
    );

-- Kitchen Appliances
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Instant Pot Duo 7-in-1',
        'Instant Pot',
        'Multi-use pressure cooker, slow cooker, and rice cooker.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Kitchen Appliances'
        ),
        89.99,
        200
    ),
    (
        'Ninja Foodi Air Fryer',
        'Ninja',
        'Air fryer with multiple cooking functions, including bake and roast.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Kitchen Appliances'
        ),
        129.99,
        150
    ),
    (
        'Breville Smart Oven Air',
        'Breville',
        'Countertop convection oven with air frying capabilities.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Kitchen Appliances'
        ),
        299.99,
        100
    );

-- Cleaning Appliances
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Dyson V11 Torque Drive',
        'Dyson',
        'Cordless vacuum cleaner with strong suction power and long battery life.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cleaning Appliances'
        ),
        599.99,
        120
    ),
    (
        'iRobot Roomba 675',
        'iRobot',
        'Wi-Fi connected robot vacuum with voice control and scheduled cleaning.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cleaning Appliances'
        ),
        279.99,
        150
    ),
    (
        'Bissell CrossWave',
        'Bissell',
        'Wet and dry vacuum cleaner for multi-surface cleaning.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Cleaning Appliances'
        ),
        249.99,
        100
    );

-- Air Conditioners and Heaters
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Dyson Pure Hot+Cool',
        'Dyson',
        'Air purifier, heater, and fan in one, with smart app control.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Air Conditioners and Heaters'
        ),
        499.99,
        80
    ),
    (
        'Honeywell Portable Air Conditioner',
        'Honeywell',
        'Portable air conditioner with dehumidifier for small rooms.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Air Conditioners and Heaters'
        ),
        399.99,
        120
    ),
    (
        'De’Longhi Oil-Filled Radiator Heater',
        'De’Longhi',
        'Energy-efficient portable heater for year-round comfort.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Air Conditioners and Heaters'
        ),
        129.99,
        150
    );

-- Laundry Appliances
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'LG WM3900HWA Front Load Washer',
        'LG',
        'Large-capacity front-load washer with TurboWash technology.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laundry Appliances'
        ),
        999.99,
        60
    ),
    (
        'Samsung FlexWash Washer & Dryer',
        'Samsung',
        'Combination washer and dryer with flexible washing options.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laundry Appliances'
        ),
        1299.99,
        50
    ),
    (
        'Whirlpool 7.4 Cu. Ft. Electric Dryer',
        'Whirlpool',
        'Electric dryer with moisture sensing and energy-saving features.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Laundry Appliances'
        ),
        799.99,
        80
    );

-- Small Home Appliances
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Philips Sonicare ProtectiveClean 6100',
        'Philips',
        'Electric toothbrush with pressure sensor and multiple modes.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Small Home Appliances'
        ),
        129.99,
        150
    ),
    (
        'KitchenAid 5-Speed Hand Blender',
        'KitchenAid',
        'Hand blender with detachable blending arm and whisk attachment.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Small Home Appliances'
        ),
        59.99,
        200
    ),
    (
        'Breville Bambino Plus Espresso Machine',
        'Breville',
        'Compact espresso machine with automatic milk frothing.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Small Home Appliances'
        ),
        499.99,
        90
    );

-- Water Purifiers
INSERT INTO
    Product (
        name,
        brand,
        description,
        categoryId,
        price,
        inStock
    )
VALUES
    (
        'Brita UltraMax Water Dispenser',
        'Brita',
        'Large-capacity water filter dispenser with activated carbon filter.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Water Purifiers'
        ),
        39.99,
        300
    ),
    (
        'Aquasana 3-Stage Under Sink Water Filter',
        'Aquasana',
        'Under-sink filtration system for cleaner drinking water.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Water Purifiers'
        ),
        169.99,
        120
    ),
    (
        'APEC ROES-50 Reverse Osmosis Water Filter System',
        'APEC',
        '5-stage reverse osmosis system for clean, filtered water.',
        (
            SELECT
                id
            FROM
                Category
            WHERE
                name = 'Water Purifiers'
        ),
        199.99,
        100
    );