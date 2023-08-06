
DROP TABLE IF EXISTS transactions;

CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT,
    transactionType VARCHAR(10),
    ticker VARCHAR(10),
    price DECIMAL(10, 2),
    quantity INT,
    date DATETIME
);