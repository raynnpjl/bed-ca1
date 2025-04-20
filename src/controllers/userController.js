const userModel = require('../models/userModel');
const responseView = require('../views/responseView');
 
module.exports = {
  /* Fetches a list of all users and returns them in the response */
  async listUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      responseView.sendSuccess(res, users);
    } catch (err) {
      responseView.sendError(res, 'Failed to fetch user', err);
    }
  },

  /* Creates a new user if the username is unique */
  async createUser(req, res) {

    try {
    let users = await userModel.getAllUsers();
    const username = req.body.username;
    const skillpoints = 0;

    if (req.body.username == undefined) {
        responseView.BadRequest(res, 'Missing username');
        return;
    }

    var check = false;

    for (var i=0;i<users.length;i++) {
        if (users[i].username.toLowerCase() == req.body.username.toLowerCase()) {
            check = true;
            break;
        }
    }

    if(check) {
        responseView.Conflict(res, 'Username already associated with another user')
        return;
    }

    const userId = await userModel.createUser(username, skillpoints);
    responseView.confirmCreated(res, { id: userId, username, skillpoints }, 'User created successfully');
    } catch (err) {
      responseView.sendError(res, 'Failed to create user', err);
    }
  },

  /* Fetches a user by ID and returns the user's details */
  async getUser(req, res) {
    try {
      const user = await userModel.getUserById(req.params.id);
      if (!user) {
        responseView.sendError(res, 'User not found', null, 404);
        return;
      }
      responseView.sendSuccess(res, user);
    } catch (err) {
      responseView.sendError(res, 'Failed to fetch user', err);
    }
  },

  /* Updates user information (username and skillpoints) if the user exists 
  and the username is not taken by another user */
  async updateUser(req, res) {
    try {
    const { username, skillpoints } = req.body;
    let users = await userModel.getAllUsers();
    var user_nonExistence = true;

    for (var i=0;i<users.length;i++) {
        if (users[i].user_id == req.params.id) {
            user_nonExistence = false;
            break
        }
    };

    if(user_nonExistence) {
        responseView.NotFound(res, 'user_id does not exist')
        return;
    };

    var check = false;
    
    for (var i=0;i<users.length;i++) {
        if (users[i].user_id == req.params.id) {
          continue;
        }else if (users[i].username.toLowerCase() == username.toLowerCase()) {
            check = true;
            break;
        }
    };

    if(check) {
        responseView.Conflict(res, 'Username already associated with another user')
        return;
    };
      await userModel.updateUser(req.params.id, username, skillpoints);
      responseView.sendSuccess(res, {id: req.params.id, username, skillpoints}, 'User updated successfully');
    } catch (err) {
      responseView.sendError(res, 'Failed to update user', err);
    }
  },
  
  /* Deletes a user by ID and sends a success response */
  async deleteUser(req, res) {
    try {
      await userModel.deleteUser(req.params.id);
      responseView.sendSuccess(res, null, 'User deleted successfully');
    } catch (err) {
      responseView.sendError(res, 'Failed to delete user', err);
    }
  },
};