module.exports = {
  success(data){
    return {
      status: 1,
      data: data,
    }
  },
  fail(msg){
    return {
      status: 0,
      msg: msg
    }
  },
  noAuthorization(){

  }
}
