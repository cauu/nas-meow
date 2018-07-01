import { observable, action, reaction, runInAction } from 'mobx';

import { createPet, listPets, getPetById, likePet, uploadPhotos } from '../services/meow';

export default class MeowStore {
  @observable myPets = [];
  @observable petList = [];
  @observable petDetail = {};
  @observable isLoading = false;
  @observable isLiking = false;

  @action createPet = async () => {
    this.isLoading = true;

    const pet = await createPet();
  }

  @action getAllPets = async () => {
    this.isLoading = true;

    this.petList = [];

    const pets = await listPets();

    runInAction('update petList', () => {
      let myPetIds = [];

      if(localStorage.getItem('myCats')){
        myPetIds = JSON.parse(localStorage.getItem('myCats'));
      }

      this.petList.replace(pets.filter((pet) => myPetIds.indexOf(pet.id + '') === -1));
      this.isLoading = false;
    });
  }

  @action getMyPets = async () => {
    this.isLoading = true;

    let myPetIds = [];

    if(localStorage.getItem('myCats')){
      myPetIds = JSON.parse(localStorage.getItem('myCats'));
    }

    const myPets = await Promise.all(myPetIds.map((id) => getPetById(id)));

    runInAction('update mypets', () => {
      this.myPets = myPets;
      this.isLoading = false;
    });
  }

  @action getPetDetail = async (id) => {
    this.isLoading = true;

    this.petDetail = {};

    const pet = await getPetById(id);

    runInAction('update petDetail', () => {
      this.petDetail = pet;
      this.isLoading = false;
    });
  }

  @action likePet = async (id) => {
    await likePet(id, () => runInAction(() => {
      this.isLiking  = true;
    }));

    runInAction('update petDetail', () => {
      this.petDetail.likes += 1;
      this.isLiking = false;
    })
  }
}
