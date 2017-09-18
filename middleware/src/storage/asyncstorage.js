import { AsyncStorage } from 'react-native';
import { NotFoundError, isDefined } from 'kinvey-js-sdk/dist/export';
import Promise from 'es6-promise';
import keyBy from 'lodash/keyBy';
import merge from 'lodash/merge';
import values from 'lodash/values';
import forEach from 'lodash/forEach';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

const idAttribute = process.env.KINVEY_ID_ATTRIBUTE || '_id';
const masterCollectionName = 'master';

export class AsyncStorageAdapter {
  constructor(name = 'kinvey') {
    this.name = name;

    // TODO: The following code requires the constructor to be async. Is that possible?
    // const masterCollection = await AsyncStorage.getItem(this.masterCollectionName);
    // if (isDefined(masterCollection) === false) {
    //   await AsyncStorage.setItem(this.masterCollectionName, JSON.stringify([]));
    // }
  }

  get masterCollectionName() {
    return `${this.name}${masterCollectionName}`;
  }

  static async _find(collection) {
    try {
      const entities = await AsyncStorage.getItem(collection);

      if (isDefined(entities)) {
        return Promise.resolve(JSON.parse(entities));
      }

      return Promise.resolve(entities || []);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  find(collection) {
    return AsyncStorageAdapter._find(`${this.name}${collection}`);
  }

  findById(collection, id) {
    return this.find(collection).then(entities => {
      const entity = find(entities, item => item[idAttribute] === id);

      if (isDefined(entity) === false) {
        throw new NotFoundError(
          `An entity with _id = ${id} was not found in the ${collection}` +
            ` collection on the ${this.name} localstorage database.`
        );
      }

      return entity;
    });
  }

  save(collection, entities) {
    return AsyncStorageAdapter._find(this.masterCollectionName)
      .then(async collections => {
        if (findIndex(collections, collection) === -1) {
          collections.push(collection);
          await AsyncStorage.setItem(
            this.masterCollectionName,
            JSON.stringify(collections)
          );
        }

        return this.find(collection);
      })
      .then(async existingEntities => {
        const existingEntitiesById = keyBy(existingEntities, idAttribute);
        const entitiesById = keyBy(entities, idAttribute);
        const existingEntityIds = Object.keys(existingEntitiesById);

        forEach(existingEntityIds, id => {
          const existingEntity = existingEntitiesById[id];
          const entity = entitiesById[id];

          if (isDefined(entity)) {
            entitiesById[id] = merge(existingEntity, entity);
          }
        });

        await AsyncStorage.setItem(
          `${this.name}${collection}`,
          JSON.stringify(values(entitiesById))
        );
        return entities;
      });
  }

  removeById(collection, id) {
    return this.find(collection).then(entities => {
      const entitiesById = keyBy(entities, idAttribute);
      const entity = entitiesById[id];

      if (isDefined(entity) === false) {
        throw new NotFoundError(
          `An entity with _id = ${id} was not found in the ${collection} ` +
            `collection on the ${this.name} memory database.`
        );
      }

      delete entitiesById[id];
      return this.save(collection, values(entitiesById)).then(() => ({
        count: 1
      }));
    });
  }

  clear() {
    return AsyncStorageAdapter._find(
      this.masterCollectionName
    ).then(async collections => {
      forEach(collections, async collection => {
        await AsyncStorage.removeItem(`${this.name}${collection}`);
      });

      await AsyncStorage.removeItem(this.masterCollectionName);
      return null;
    });
  }

  static load(name) {
    return Promise.resolve(new AsyncStorageAdapter(name));
  }
}
