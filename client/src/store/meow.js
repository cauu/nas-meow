import { observable, action, reaction, runInAction } from 'mobx';

import { createPet, listPets, getPetById, likePet } from '../services/meow';

export default class MeowStore {
  @observable petList = [];
  @observable currPet = {};
  @observable isLoading = false;

  @action getAllPets = async () => {
    this.isLoading = true;

    this.petList = [];

    const pets = await listPets();

    this.isLoading = false;

    runInAction('update petList', () => {
      this.petList.replace(pets);
    });
  }

  @action getPetById = async (id) => {
    this.isLoading = true;

    this.currPet = {};

    const pet = await getPetById(id);

    this.isLoading = false;

    runInAction('update current pet', () => {
      this.currPet = pet;
    });
  }
}
