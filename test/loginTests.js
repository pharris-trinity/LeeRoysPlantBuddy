const {dataModel} = require('../models/dataModel');
const userModel = require('../models/dataModel');

const loginTests = {
    //test functions are booleans, return true if tests passed and false if they fail
    testAddUser : (username, password) => {
        var mainUsers = userModel.users;
        var oldLength = users.length;
        var oldLastUser = users[oldLength - 1];
        users = mainUsers.dataModel.addUser(username, password);
        newLastUser = users[users.length - 1];
        if (users.length == oldLength) return false;
        if (newLastUser.username != username) return false;
        if (newLastUser.password != password) return false;
        if (oldLastUser.userid == newLastUser.userid) return false;
        if (newLastUser.account_type != 'registered') return false;
        var temp = 0;
        users.forEach(user => {
            if(user == newLastUser) {
                temp++;
            }
          })
        if (temp == 0 || temp > 1) return false;

        return true;
    },

    testVerifyUser : (username, password) => {
        userVerified = dataModel.verifyUser(username, password);
        var userType = userVerified[0]; //verifyUser returns {userType, id}
        var userId = userVerified[1];

        var mainUsers = userModel.users;
        var adminTemp = 0;
        var registeredTemp = 0;
        mainUsers.forEach(user => {
            if(user.username == username && user.account_type == 'admin' && user.userid == userId) {
                adminTemp++;
            }
            if(user.username == username && user.account_type == 'registered' && user.userid == userId) {
                registeredTemp++;
            }
        })
        var adminFailed = (adminTemp == 0 || adminTemp > 1);
        var registeredFailed = (registeredTemp == 0 || registeredTemp > 1);
        if (adminFailed || registeredFailed) return false;
        if (registeredTemp == 0 && adminTemp == 0 && userType != 'failed') return false;

        return true;
    }
}