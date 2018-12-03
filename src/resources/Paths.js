class Paths {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
    this.endpoints = {};
  }

  createEntity(entity) {
    this.endpoints[entity.name] = this.createEndpoints(entity);
  }

  createEndpoints({ name }) {
    const endpoints = {};

    const resourceUrl = `${this.baseUrl}/${name}/`;
  }
}
