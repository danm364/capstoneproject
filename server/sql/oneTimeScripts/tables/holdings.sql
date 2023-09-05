DROP TABLE IF EXISTS holdings;

CREATE TABLE holdings (
    holdings_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    profile_id INT NOT NULL,
    security_id INT NOT NULL,
    securityMarketValue DECIMAL(10, 2) NOT NULL,
    holdings_date DATETIME NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(profile_id),
    FOREIGN KEY (security_id) REFERENCES security(security_id)
    
);

FOREIGN KEY (security_id) REFERENCES security(security_id)

ALTER TABLE holdings
ADD FOREIGN KEY (security_id) REFERENCES security(security_id);


ALTER TABLE holdings
ADD FOREIGN KEY (profile_id) REFERENCES profiles(profile_id);
--remove foreign key
ALTER TABLE holdings
DROP CONSTRAINT holdings_ibfk_1;

SELECT *
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE TABLE_NAME='security';