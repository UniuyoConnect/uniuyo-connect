-- UNIUYO CONNECT INITIAL SCHEMA
create table users (
  id uuid primary key default gen_random_uuid(),
  reg_no varchar(20) unique not null,
  email varchar(255) unique not null,
  full_name text not null,
  faculty text not null,
  department text not null,
  level int check (level between 100 and 500),
  profile_photo_url text not null,
  is_verified boolean default false,
  verify_expiry timestamp,
  is_banned boolean default false,
  created_at timestamp default now()
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  content text not null,
  image_url text,
  likes_count int default 0,
  created_at timestamp default now()
);

create table communities (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  type text
);

insert into communities (name, type) values 
('Science','faculty'),('Engineering','faculty'),('Arts','faculty'),
('Education','faculty'),('Law','faculty'),('Agriculture','faculty'),
('Medicine','faculty'),('Pharmacy','faculty'),('Business','faculty'),
('Social Sciences','faculty'),('Environmental','faculty'),
('Communication','faculty'),('Basic Medical','faculty');

create table marketplace (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text not null,
  description text not null,
  price int not null,
  image_url text not null,
  is_sold boolean default false,
  created_at timestamp default now()
);

create table verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  amount int default 3000,
  status text default 'pending',
  expiry_date timestamp,
  created_at timestamp default now()
);
