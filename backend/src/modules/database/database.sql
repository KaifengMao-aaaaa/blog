Create Table users (
    Id integer primary key,
    Name Text Not Null,
    Password Text Not Null
);
Create Table get_token (
    user_Id Integer References users(Id),
    token Text,
    primary key (user_Id, token)
);
Create Table posts (
    Id Integer primary key,
    title Text not null,
    banner Text,
    content Text Default '',
    des Text Default '',
    author Integer not null references users(Id),
    is_draft Boolean not null,
    publish_time Timestamp Default CURRENT_TIMESTAMP
);
Create Table have_tag (
    post_id Integer,
    name Text not null,
    primary key (name, post_id)
);