export default async function seed(knex) {
    // Deletes ALL existing entries
    await knex("users").del();
    // Inserts seed entries
    await knex("users").insert([
        { user_id: 1, username: "Ivix", password: "abc", email: "ivix@gmail.com" },
        { user_id: 2, username: "Nico", password: "abc", email: "ivix@gmail.com" },
        { user_id: 3, username: "Gian", password: "abc", email: "ivix@gmail.com" },
    ]);
}
