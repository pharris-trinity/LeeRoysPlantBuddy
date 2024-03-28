const {dataModel} = require('../models/dataModel');
const userModel = require('../models/dataModel');

const loginTests = {

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
        var userType = userType[0]; //verifyUser returns {userType, id}
        if (userType == 'failed') return false;

        var mainUsers = userModel.users;
        var adminTemp = 0;
        var registeredTemp = 0;
        mainUsers.forEach(user => {
            if(user.username == username && user.account_type == 'admin') {
                adminTemp++;
            }
            if(user.username == username && user.account_type == 'registered') {
                registeredTemp++;
            }
        })
        var adminFailed = (adminTemp == 0 || adminTemp > 1);
        var registeredFailed = (registeredTemp == 0 || registeredTemp > 1);
        if (adminFailed || registeredFailed) return false;

        

        return true;
    }
}