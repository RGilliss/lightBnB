INSERT INTO users (name, email, password)
VALUES ('Linda Belcher', 'Linda@bobsburgers.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bob Belcher', 'Bob@bobsburgers.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Tina Belcher', 'Tina@bobsburgers.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Peter Griffin', 'Pgriffs@aol.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (2, 'Burger Shack', 'description', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbobs-burgers.fandom.com%2Fwiki%2FBob%2527s_Burgers_(restaurant)&psig=AOvVaw1hJDtdt98NWVlFFsWOxe5N&ust=1614876511369000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjWlPnJlO8CFQAAAAAdAAAAABAD', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbobs-burgers.fandom.com%2Fwiki%2FBob%2527s_Burgers_(restaurant)&psig=AOvVaw1hJDtdt98NWVlFFsWOxe5N&ust=1614876511369000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjWlPnJlO8CFQAAAAAdAAAAABAD', 250.50, 2, 2, 2, 'United States', '11 Warf Blvd', 'Boston', 'Massachusetts', '90210', true),
(4, 'Mansion', 'description', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbobs-burgers.fandom.com%2Fwiki%2FBob%2527s_Burgers_(restaurant)&psig=AOvVaw1hJDtdt98NWVlFFsWOxe5N&ust=1614876511369000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjWlPnJlO8CFQAAAAAdAAAAABAD', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbobs-burgers.fandom.com%2Fwiki%2FBob%2527s_Burgers_(restaurant)&psig=AOvVaw1hJDtdt98NWVlFFsWOxe5N&ust=1614876511369000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjWlPnJlO8CFQAAAAAdAAAAABAD', 2193.00, 5, 12, 15, 'Canada', '15 Something Ave', 'Edmonton', 'Alberta', 'T2C-4M5', true),
(3, 'Single Room', 'description', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbobs-burgers.fandom.com%2Fwiki%2FBob%2527s_Burgers_(restaurant)&psig=AOvVaw1hJDtdt98NWVlFFsWOxe5N&ust=1614876511369000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjWlPnJlO8CFQAAAAAdAAAAABAD', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbobs-burgers.fandom.com%2Fwiki%2FBob%2527s_Burgers_(restaurant)&psig=AOvVaw1hJDtdt98NWVlFFsWOxe5N&ust=1614876511369000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjWlPnJlO8CFQAAAAAdAAAAABAD', 93.99, 1, 1, 1, 'Canada', '19 nowhere street', 'Brooks', 'Alberta', 'T2Z-4G5', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-03-02', '2021-04-23', 1, 3),
('2021-01-23', '2021-01-25', 2, 1),
('2020-12-15', '2021-01-29', 3, 1),
('2021-06-13', '2021-06-15', 2, 3),
('2021-08-02', '2021-09-23', 2, 2),
('2021-03-02', '2021-04-23', 3, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (4, 1, 1, 5, 'message'),
(1, 2, 2, 5, 'message'),
(3, 1, 3, 3, 'message'),
(3, 2, 4, 4, 'message'),
(2, 2, 5, 1, 'message'),
(2, 3, 6, 5, 'message');