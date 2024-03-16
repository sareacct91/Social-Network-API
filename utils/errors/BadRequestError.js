module.exports = class BadRequestError extends Error {
  /**
   * @param {string} msg
   */
  constructor(msg) {
    super(msg);
    /**@type {number} */
    this.statusCode = 400;
  }
}
