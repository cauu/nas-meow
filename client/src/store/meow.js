import { observable, action, reaction, runInAction } from 'mobx';

import { createPet, listPets, getPetById, likePet, uploadPhotos } from '../services/meow';

export default class MeowStore {
  @observable myPets = [];
  @observable petList = [];
  @observable currPet = {};
  @observable isLoading = false;

  @action createPet = async () => {
    this.isLoading = true;

    const pet = await createPet();
  }

  @action getAllPets = async () => {
    this.isLoading = true;

    this.petList = [];

    const pets = await listPets();

    this.isLoading = false;

    runInAction('update petList', () => {
      this.petList.replace(pets);
    });
  }

  @action getMyPets = async () => {
    this.isLoading = true;

    const myPets = localStorage.getItem('myPets');
  }

  @action getPetDetail = async (id) => {
    this.isLoading = true;

    const pet = await getPetById('');
  }
}
