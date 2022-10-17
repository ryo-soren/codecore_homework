/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
*/
const faker = require("faker");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("super_teams")
    .del()
    .then(() => {
      const cohorts = Array.from({length: 20}).map(() => {

        function members() {
          const randNum = Math.ceil(Math.random()*20)+1
          const arr = []
          for (let index = 0; index < randNum; index++) {
            arr.push(faker.name.firstName())
          }
          return arr
        }
        const players = members()
        return {
          team_name: faker.company.catchPhrase(),
          image_url: faker.image.imageUrl(),
          team_members: players.length,
          members: players.join(", ")
        }
      });
      return knex("super_teams").insert(cohorts)
    })
};
