create table if not exists product (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(255),
    price DECIMAL(10,2),
    description TEXT,
    brand varchar(255),
    category varchar(255),
    height DECIMAL(10,2),
    width DECIMAL(10,2),
    depth DECIMAL(10,2),
    discount DECIMAL(10,2),
    min_order INT,
    rating DECIMAL(10,2),
    availability_status varchar(255),
    warranty varchar(255)
);

create table if not exists product_images (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_id INT,
    image_url varchar(255),
    foreign key (product_id) references product(id) on delete cascade
);

create table if not exists review (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    rating DECIMAL(10,2),
    comment TEXT,
    reviewer_name varchar(255),
    reviewer_email varchar(255),
    foreign key (product_id) references product(id) on delete cascade
);
