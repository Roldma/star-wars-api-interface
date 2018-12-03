/**
 * Module containing
 *  ApiEndpoints - class containing member , endpoints: an object holding urls of various API Endpoints,
 *  createEndPoints() - function instantiating ApiEndpoints and returning member endpoints
 *  endpoints - exposed variable invoking createEndpoints() and exporting ApiEndpoints.endpoints;
 */

import resourceNames from './resourceNames';

class ApiEndpoints {
  /**
   * @param {object} param0 - Object containing a member, baseUrl (string)
   * @param {array} entityArr - Array items: objects containing resource names
   */
  constructor({ baseUrl }, entityArr) {
    this.baseUrl = baseUrl;
    this._endpoints = endpoints;
    this.entityArr = entityArr;
  }

  get endpoints() {
    const newEndpoints = this.createEndpoints();
    return newEndpoints;
  }

  set endpoints(val) {
    this._endpoints = val;
  }

  /**
   * Parses this.entityArr and creates an object containing endpoint urls (strings)
   * Return: an Object key: resource names value: full endpoint urls (Strings) eg. 'http://localhost:6868/api/search'
   */
  createEndpoints() {
    const endPoints = {};
    this.entityArr.forEach((ent) => {
      const { name } = ent;
      const baseResource = `${this.baseUrl}/api/${name}/`;

      if (ent.paths) {
        endPoints[name] = { baseResource };
        const { paths } = ent;
        const createPath = () => {
          Object.keys(paths).forEach((key) => {
            endPoints[name][key] = `${baseResource}${key}/`;
          });
        };
        createPath();
      } else {
        endPoints[name] = baseResource;
      }
    });
    return endPoints;
  }
}

/**
 * Instantiate ApiEndpoints with baseUrl and list of endpoints from resourceNames file.
 * @param {array} endpointList - array of API resource names (objects)
 * Returns endpoints member (object)
 */
const createEndpoints = (endpointList) => {
  const baseUrl = { baseUrl: 'http://localhost:6868' };
  const apiEndpoints = new ApiEndpoints(baseUrl, endpointList);

  return apiEndpoints.endpoints;
};

const endpoints = createEndpoints(resourceNames);
console.log(endpoints);
export default endpoints;
