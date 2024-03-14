module.exports = class NotFoundError extends Error {
  /**@type {string} */
  constructor(msg) {
    super(msg);
    /**@type {number} http status code */
    this.code = 404;
  }
}