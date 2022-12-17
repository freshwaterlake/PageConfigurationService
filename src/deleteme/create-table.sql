create table app_config.section_config
(
    section_name    varchar(100),
    section_json    json,
    created_at      datetime(6),
    updated_at      datetime(6),
    primary key (section_name),
);

create table app_config.page_config
(
    page_name       varchar(100),
    page_json       json,
    created_at      datetime(6),
    updated_at      datetime(6),
    primary key (page_name),
);
