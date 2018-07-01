import { nebGet, nebPost } from './common';

function createPet(
  name,
  avatar,
  gender,
  birthday,
  weight,
  desc,
  isSterilization,
  photos,
  owner,
  onStartHook
) {
  return nebPost('createPet',
    [name, avatar, gender, birthday, weight, desc, isSterilization, photos, owner],
    0,
    onStartHook
  );
}

function listPets() {
  return nebGet('listPets', []);
}

function getPetById(id) {
  return nebGet('getPetById', [id]);
}

function likePet(id, onStartHook) {
  return nebPost('likePet', [id], 0, onStartHook);
}

function uploadPhotos(id, photos, onStartHook) {
  return nebPost('uploadPhotos', [id, photos], 0, onStartHook);
}

export {                                                                                                                                                                                                                                                                                                                                                                
  createPet,
  listPets,
  getPetById,
  likePet,
  uploadPhotos
};