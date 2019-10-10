INSERT INTO users
    (first_name, last_name, email, password)
VALUES
    ('Test', 'Dummy', 'test@dummy.com', 'yes'),
    ('Eugene', 'Kim', 'ekim1707@gmail.com', 'yes');

insert into quotebook
    (quote_type, quote, origin, significance, when_said, users_id)
VALUES
    ('Quotation', 'Speak softly and carry a big stick.', 'Theodore Roosevelt', 'From Mr. Sunshine drama', 'long time ago', 2)