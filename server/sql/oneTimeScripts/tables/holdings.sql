DROP TABLE IF EXISTS holdings;

CREATE TABLE holdings (
    holdings_id INT PRIMARY KEY NOT NULL,
    profile_id INT NOT NULL,
    security_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(profile_id)
    

);

FOREIGN KEY (security_id) REFERENCES stocks(security_id)

ALTER TABLE holdings
ADD FOREIGN KEY (security_id) REFERENCES security(security_id);
--remove foreign key
ALTER TABLE holdings
DROP CONSTRAINT holdings_ibfk_1;

SELECT *
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE TABLE_NAME='security';