const db = require("../config/db");

module.exports = {
    async getAllUsers() {
        const [result] = await db.query('SELECT * FROM user');
        return result;
    },

    async createUser(username, skillpoints) {
        const [result] = await db.query('INSERT INTO user (username, skillpoints) VALUES (?, ?)', [username, skillpoints]);
        return result.insertId;
      },
      
    async getUserById(id) {
      const [result] = await db.query('SELECT * FROM user WHERE user_id = ?', [id]);
      return result;
    },
      
    async updateUser(id, username, skillpoints) {
      await db.query('UPDATE user SET username = ?, skillpoints = ? WHERE user_id = ?', [username, skillpoints, id]);
    },

    async deleteUser(id) {
      await db.query('DELETE FROM user WHERE user_id = ?', [id]);
    }
};

