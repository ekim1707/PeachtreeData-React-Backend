-- For Widowsite Project
create table forum (
    id serial primary key not null,
    post text,
    tag text,
    date_posted date,
    time_posted time
);

-- For PeachtreeData Project
create table users (
   id serial primary key not null,
   first_name text not null,
   last_name text not null,
   email text UNIQUE not null,
   token varchar,
   password text
);

create table newsfeed (
    id serial primary key not null,
    post text,
    where_at text,
    with_whom text,
    timestamp_option text,
    users_id integer references users(id)
);

create table connections (
    id serial primary key not null,
    first_name text not null,
    last_name text not null,
    email text unique not null,
    city text not null,
    state_residing text not null,
    favorite boolean not null,
    available boolean not null,
    users_id integer references users(id)
);

create table media (
    id serial primary key not null,
    pictures text,
    videos text,
    users_id integer references users(id)
);

create table places (
    id serial primary key not null,
    location text,
    description text,
    comment text,
    users_id integer references users(id)
);

create table quotebook (
    id serial primary key not null,
    quote_type text,
    quote varchar,
    origin text,
    significance text,
    when_said text,
    users_id integer references users(id)
);

create table freewrite (
    id serial primary key not null,
    title text,
    entry_type text,
    list text,
    mood text,
    entry_block text,
    tags text,
    users_id integer references users(id)
);