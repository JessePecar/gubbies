// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;
use std::io::Error;
use tauri_plugin_sql::{Migration, MigrationKind};

fn create_user_tables_migration() -> Migration {
    return Migration {
        version: 1,
        description: "create_user_tables",
        sql: "
            CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL, firstName TEXT, lastName TEXT, roleId INTEGER, userName TEXT, passwordHash TEXT);

            CREATE TABLE roles (id INTEGER PRIMARY KEY NOT NULL, name TEXT);
            -- Do not need to explicitly give the admin role an id
            INSERT INTO roles (name)
            VALUES ('admin');

            CREATE TABLE permissions (id INTEGER PRIMARY KEY NOT NULL, name TEXT);
            -- Explicitly stating the permission id to bind to an enum later
            INSERT INTO permissions (id, name) 
            VALUES 
            (0, 'APPLICATION_LOGIN'),
            (1, 'INVENTORY'),
            (2, 'INVENTORY_ADJUSTMENTS'),
            (3, 'INVENTORY_COUNTS'),
            (4, 'PRICING'),
            (5, 'PROMOTIONS'),
            (6, 'REPORTS'),
            (7, 'REPORTS_INVENTORY'),
            (8, 'REPORTS_PRICING'),
            (9, 'REPORTS_PROMOTIONS'),
            (10, 'SETTINGS');

            CREATE TABLE rolePermissions (
              roleId INTEGER NOT NULL, 
              permissionId INTEGER NOT NULL,
              FOREIGN KEY(roleId) REFERENCES roles(id),
              FOREIGN KEY(permissionId) REFERENCES permissions(id),
              PRIMARY KEY(roleId, permissionId)
              );

            -- Insert every role permission onto the admin role
            INSERT INTO rolePermissions (roleId, permissionId) 
            SELECT r.id, p.id FROM permissions p FULL OUTER JOIN roles r on 1 = 1 AND r.name = 'admin';

            INSERT INTO users (firstName, lastName, roleId, userName, passwordHash)
            VALUES ('admin', 'user', 0, 'admin', 'password'); --Because this is for fun, I am not hashing or encrpyting any passwords, they will just live like animals
        ",
        kind: MigrationKind::Up,
    };
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migration_1 = create_user_tables_migration();

    let migrations = vec![migration_1];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:gubbies.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
