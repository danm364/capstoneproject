
DROP TABLE IF EXISTS transactions;

CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY  NOT NULL,
    profile_id INT  NOT NULL,
    transactionType VARCHAR(10),
    ticker VARCHAR(10) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT  NOT NULL,
    date DATETIME
);