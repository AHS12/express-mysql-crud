INSERT INTO `users` (
        `id`,
        `name`,
        `email`,
        `password`,
        `created_at`,
        `updated_at`
    )
VALUES (
        NULL,
        'Test Name',
        'test@test.com',
        '$2a$12$G0QA1yxQL9d2Bn3tpNquAut7s6D8HtuJ8joBSAFK/2Rb0yOeDni8C',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    )