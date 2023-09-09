
DROP TABLE IF EXISTS security;

CREATE TABLE security (
    security_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    symbol VARCHAR(10) NOT NULL
    
);
FOREIGN KEY (security_id) REFERENCES holdings(security_id)

ALTER TABLE security
ADD FOREIGN KEY (security_id) REFERENCES holdings(security_id);


ALTER TABLE security
ADD FOREIGN KEY (security_id) REFERENCES transactions(security_id);

ALTER TABLE security
DROP CONSTRAINT security_ibfk_1;

SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE TABLE_NAME='security';