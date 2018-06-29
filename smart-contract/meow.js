class Pet {
  constructor(id, name, avatar, gender, birthday, weight, desc, isSterilization, photos, owner, creator) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.gender = gender;
    this.birthday = birthday;
    this.weight = weight;
    this.desc = desc;
    this.isSterilization = isSterilization;
    this.owner = owner;
    this.photos = photos;
    this.creator = creator;

    this.likes = 0;
    this.createAt = new Date().getTime();
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

  init() {
    this.petCounter = 0;
  }

  createPet(name, avatar, gender, birthday, weight, desc, isSterilization, photos, owner) {
    const creator = Blockchain.transaction.from;

    const pet = new Pet(this.petCounter, name, avatar, gender, birthday, weight, desc, isSterilization, photos, owner, creator);

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

  getPetById(id) {
    return this.pets.get(id);
  }

  uploadPhotos(id, photos) {
    const pet = this.pets.get(id);
    if(pet) {
      pet.photos = pet.photos.split(',').concat(photos.split(',')).join(',');
      this.pets.put(id, pet);
      return pet;
    }
  }
}

module.exports = PetDB;