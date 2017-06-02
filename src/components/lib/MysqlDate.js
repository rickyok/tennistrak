let MysqlDateFunction = {
  getDate (date) {
    date = date || new Date();
    return date.toISOString().split('T')[0];
  },
  getDateTime (date) {
    date = date || new Date();
    let split = date.toISOString().split('T');
    return split[0] + ' ' + split[1];
  }
};

export default MysqlDateFunction;
