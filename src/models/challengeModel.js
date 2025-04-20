const db = require("../config/db");

module.exports = {
    async getAllChallenges() {
        const [rows] = await db.query('SELECT * FROM fitnesschallenge');
        return rows;
    },

    async createChallenge(challenge, creator_id, skillpoints) {
        const [result] = await db.query('INSERT INTO fitnesschallenge (challenge, creator_id, skillpoints) VALUES (?, ?, ?)', [challenge, creator_id, skillpoints]);
        return result.insertId;
      },
      
      async updateChallenge(challenge_id, challenge, creator_id, skillpoints) {
        await db.query('UPDATE fitnesschallenge SET challenge = ?, creator_id = ?, skillpoints = ? WHERE challenge_id = ?', [challenge, creator_id, skillpoints, challenge_id]);
      },

      async deleteChallenge(challenge_id) {
        await db.query('DELETE FROM fitnesschallenge WHERE challenge_id = ?', [challenge_id]);
      },

      async completeChallenge(challenge_id, user_id, completed, creation_date, notes) {
        const [result] = await db.query('INSERT INTO usercompletion (challenge_id, user_id, completed, creation_date, notes) VALUES (?, ?, ?, ?, ?)', [challenge_id, user_id, completed, creation_date, notes]);
        return result.insertId;
      },

      async getChallengeById(challenge_id) {
        const [result] = await db.query('SELECT user_id, completed, creation_date, notes FROM usercompletion WHERE challenge_id = ?', [challenge_id]);
        return result
      }
};

