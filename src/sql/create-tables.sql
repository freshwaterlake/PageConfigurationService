CREATE TABLE app_config.application_config (
    data_key        varchar(50),
    data_value      json,
    created_at      datetime(6),
    updated_at      datetime(6),
    updated_by      varchar(50),
    version_id      int
);