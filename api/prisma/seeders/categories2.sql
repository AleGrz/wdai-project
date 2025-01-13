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
    ),
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
    ),
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