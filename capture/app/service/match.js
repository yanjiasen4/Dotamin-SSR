'use strict';

const Service = require('egg').Service;

class MatchService extends Service {
  async getRecentMatch(uid, n) {
    const ctx = this.ctx;
    const result = await ctx.curl(`https://api.opendota.com/api/players/${uid}/recentMatches`, {
      dataType: 'json',
      timeout: 3000,
    });
    if (result.status !== 200) return 0;
    const matches = result.data;
    console.log(matches);
    if (matches.length > 0 && n <= matches.length) {
      const match = matches[parseInt(n - 1)];
      return match.match_id;
    }
    return 0;
  }
}

module.exports = MatchService;
