# Tables:
- movies
- reviews

## movies

- id            BIGINT UNSIGNED PK AI
- title         VARCHAR(100) NOT NULL
- director      VARCHAR(100) NULL
- image         VARCHAR(255) NULL
- description   TEXT NULL
- release_year  YEAR NULL
- created_at    DATETIME DEFAULT(NOW())
- updated_at    DATETIME DEFAULT(NOW())

## reviews

- id            BIGINT UNSIGNED PK AI
- movie_id      BIGINT UNSIGNED FK
- username      VARCHAR(100) NOT NULL
- review        TEXT NOT NULL
- rating        TINYINT NOT NULL
- created_at    DATETIME DEFAULT(NOW())
- updated_at    DATETIME DEFAULT(NOW())