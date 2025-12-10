# Tables:
- movies
- reviews

## movies

- id            BIGINT UNSIGNED PK AI
- title         VARCHAR(255) NOT NULL
- director      VARCHAR(255) NOT NULL
- image         VARCHAR(255) NULL
- genre         VARCHAR(255) NULL
- abstract      TEXT NULL
- release_year  YEAR NULL
- created_at    DATETIME DEFAULT(NOW())
- updated_at    DATETIME DEFAULT(NOW())

## reviews

- id            BIGINT UNSIGNED PK AI
- movie_id      BIGINT UNSIGNED FK
- name          VARCHAR(255) NOT NULL
- text          TEXT NOT NULL
- vote          TINYINT NOT NULL
- created_at    DATETIME DEFAULT(NOW())
- updated_at    DATETIME DEFAULT(NOW())