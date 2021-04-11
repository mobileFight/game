function build(loc) {
  return {
    id: 1,
    name: "Location 1",
    img: "url",
    children: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    has_magazine: 1,
    ...loc,
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "locations",
      [
        build({
          id: 1,
          name: "Location 1",
          children: "2.3",
        }),
        build({
          id: 2,
          name: "Location 2",
          children: "4",
        }),
        build({
          id: 3,
          name: "Location 3",
          children: "4",
        }),
        build({
          id: 4,
          name: "Location 4",
          children: "",
        }),
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("locations", null, {})
  },
}
