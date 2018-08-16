const expect = require('expect');
const {Users} = require('./users');

describe('Users',() => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users =[{
      'id':'1',
      'room':'Node room 1',
      'name':'Mike'
    },{
      'id':'2',
      'room':'Node room 2',
      'name':'Jen'
    },{
      'id':'3',
      'room':'Node room 1',
      'name':'Julie'
    }];
  });

  it('should add a new user',() => {
    var users = new Users();
    var user = {
      'id':'123',
      'room':'office',
      'name':'TP'
    };
    var resUser = users.addUser(user.id,user.name,user.room);
    expect (users.users).toEqual([user]);
  });

  it('should return name for Node room 1',() => {
    var userList = users.getUserList('Node room 1');
    expect (userList).toEqual(['Mike','Julie']);
  });

  it('should return name for Node room 2',() => {
    var userList = users.getUserList('Node room 2');
    expect (userList).toEqual(['Jen']);
  });

  it('should remove user by id 1',() => {
    var user = users.removeUser('1');
    expect (user).toEqual({
      'id':'1',
      'room':'Node room 1',
      'name':'Mike'
    });
    var userList = users.getUserList('Node room 1');
    expect (userList).toEqual(['Julie']);
  });

  it('should not remove user by false id',() => {
    var user = users.removeUser(0);
    expect (user).toBeFalsy;
    var userList = users.getUserList('Node room 1');
    expect (userList).toEqual(['Mike','Julie']);
  });

  it('should find user',() => {
    var user = users.getUser('2');
    expect (user).toEqual({
      'id':'2',
      'room':'Node room 2',
      'name':'Jen'
    });
  });

  it('should not find user',() => {
    var user = users.getUser('99');
    expect (user).toBeFalsy();
  });



});
