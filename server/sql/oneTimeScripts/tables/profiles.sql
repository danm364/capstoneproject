DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
    profile_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    CashOnHand DECIMAL(10, 2) NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_created DATETIME NOT NULL

    FOREIGN KEY (profile_id) REFERENCES transactions(profile_id)
);

ALTER TABLE profiles
DROP CONSTRAINT transactions_ibfk_2;