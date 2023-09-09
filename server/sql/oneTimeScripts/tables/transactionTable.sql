
DROP TABLE IF EXISTS Transactions;

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY  NOT NULL,
    profile_id INT  NOT NULL,
    transactionType VARCHAR(10) NOT NULL,
    security_id INT  NOT NULL,
    EODPrice DECIMAL(10, 2) NOT NULL,
    quantity INT  NOT NULL,
    transaction_date DATETIME NOT NULL,
    FOREIGN KEY (security_id) REFERENCES security(security_id)
    
);

FOREIGN KEY (profile_id) REFERENCES profiles(profile_id)

ALTER TABLE security
DROP CONSTRAINT Transactions_ibfk_1;

ALTER TABLE transactions
DROP CONSTRAINT transactions_ibfk_2;

SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE TABLE_NAME='Transactions';

ALTER TABLE transactions
ADD FOREIGN KEY (profile_id) REFERENCES profiles(profile_id);

ALTER TABLE transactions
ADD FOREIGN KEY (security_id) REFERENCES security(security_id);