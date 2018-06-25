class Pet {
  constructor(id, name, avatar, gender, birthday, weight, desc, isSterilization, owner, createAt) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.gender = gender;
    this.birthday = birthday;
    this.weight = weight;
    this.desc = desc;
    this.isSterilization = isSecureContext;
    this.owner = owner;
    this.createAt = createAt;

    this.likes = 0;
  }

  toString() {
    return JSON.stringify(this);
  }
}

class PetDB {
  constructor() {
    LocalContractStorage.defineMapProperty(this, "pets", {
      parse: function (text) {
        return JSON.parse(text);
      },
      stringify: function (o) {
          return JSON.stringify(o);
      }
    });

    LocalContractStorage.defineProperty(this, 'petCounter', 0);
  }

  createPet(name, avatar, gender, birthday, weight, desc, owner, isSterilization) {
    const pet = new Pet(this.petCounter, name, avatar, gender, birthday, weight, desc, owner, isSterilization, Blockchain.transaction.from, new Date().getTime());

    this.pets.put(this.petCounter, pet);

    this.petCounter = this.petCounter * 1 + 1;

    return pet;
  }

  listPets() {
    const resp = [];

    for(let i = 0; i <= this.petCounter * 1; i++) {
      if(this.pets.get(i)) {
        resp.push(this.pets.get(i));
      }
    }

    return resp;
  }

  likePet(id) {
    const pet = this.pets.get(id);
    if(pet) {
      pet.likes = pet.likes * 1 + 1;
      this.pets.put(id, pet);
      return pet;
    }
  }
}

module.exports = PetDB;
