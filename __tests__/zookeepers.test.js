const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers")

const { zookeepers } = require("../data/zookeepers.json")

jest.mock("fs");
test("create a new zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Jesus", id: "dasji2ij" },
        zookeepers
    );
    expect(zookeeper.name).toBe("Jesus");
    expect(zookeeper.id).toBe("dasji2ij");
});

test("filter by query", () => {
    const startingZookeepers = [
        {
            "id": "6",
            "name": "Amiko",
            "age": 43,
            "favoriteAnimal": "Quokkas"
        },
        {
            "id": "8",
            "name": "Lernantino",
            "age": 19,
            "favoriteAnimal": "Business Cat"
        },
    ]
    const updatedZookeepers = filterByQuery({ age: Number(19) }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            "id": "4",
            "name": "Amiko",
            "age": 43,
            "favoriteAnimal": "Quokkas"
        },
        {
            "id": "16",
            "name": "Lernantino",
            "age": 19,
            "favoriteAnimal": "Business Cat"
        },
    ];

    const result = findById("4", startingZookeepers);

    expect(result.name).toBe("Amiko");
});

test("validates favorite animal", () => {
    const zookeeper = {
        "id": "4",
        "name": "Amiko",
        "age": 43,
        "favoriteAnimal": "Quokkas"
    };

    const invalidZookeeper = {
        "id": "4",
        "name": "Amiko",
        "age": 43,        
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});