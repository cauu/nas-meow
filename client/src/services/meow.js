import { nebGet, nebPost } from './common';

function createPet(
  name,
  avatar,
  gender,
  birthday,
  weight,
  desc,
  owner,
  isSterilization,
  onStartHook
) {
  return nebPost('createPet', [name, avatar, gender, birthday, weight, desc, owner, isSterilization], 0, onStartHook);
}

function listPets() {
  return nebGet('listPets');
}

function getPetById(id) {
  return nebGet('getPetById', [id]);
}

function likePet(id) {
  return nebGet('likePet', [id]);
}

export {                                                                                                                                                                                                                                                                                                                                                                  
  createPet,
  listPets,
  getPetById,
  likePet,
};