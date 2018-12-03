import resourceNames from './resourceNames';

class ApiEndpoints {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
    this.endpoints = {};
  }

  createEntity(entityArr) {
    this.createEndpoints(entityArr);
  }

  createEndpoints(entityArr) {
    entityArr.forEach((ent) => {
      const { name } = ent;
      const baseResource = `${this.baseUrl}/api/${name}/`;

      if (ent.paths) {
        this.endpoints[name] = { baseResource };
        const { paths } = ent;
        const createPath = () => {
          Object.keys(paths).forEach((key) => {
            this.endpoints[name][key] = `${baseResource}${key}/`;
          });
        };
        createPath();
      } else {
        this.endpoints[name] = baseResource;
      }
    });
  }
}

const createEndpoints = (endpointList) => {
  const baseUrl = { baseUrl: 'http://localhost:6868' };
  const apiEndpoints = new ApiEndpoints(baseUrl);

  apiEndpoints.createEntity(endpointList);
  return apiEndpoints.endpoints;
};

const endpoints = createEndpoints(resourceNames);

export default endpoints;
