[{
  id: '',
  name:'',
  room:''
}]

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id,name,room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var userdel = this.users.filter((user) => user.id === id)[0];
    if (userdel) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return userdel;
  }
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList (room) {
    //schleife durch object, wenn raum ,dann add name to return array mit filter!!
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;

  }
}

module.exports = {Users};
