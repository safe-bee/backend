export async function up(knex: any): Promise<void> {
  return knex.schema.createTable("users", (user) => {
    user.increments("user_id").primary();
    user.string("username", 255).notNullable();
    user.string("password", 255).notNullable();
    user.string("email", 255).notNullable();
    user
      .timestamp("createdAt")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
}

export async function down(knex: any): Promise<void> {
  return knex.schema.dropTable("users");
}
