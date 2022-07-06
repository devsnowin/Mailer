const isVaildAPI = (userAPI, serverAPI) => {
  if (userAPI === serverAPI) {
    return true;
  }

  return false;
};

module.exports = isVaildAPI;
