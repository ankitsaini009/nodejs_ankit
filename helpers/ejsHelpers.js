module.exports = {
  getAdmin: function (session) {
    return session.admin || null;
  }
};