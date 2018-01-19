'use strict';

const Controller = require('egg').Controller;
const phantom = require('phantom');

class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    const id = ctx.query.id;
    const n = ctx.query.n;
    this.app.logger.info('Recent output: %s', id);

    const matchId = await service.match.getRecentMatch(id, parseInt(n));
    this.app.logger.info('match ID: %s', matchId);

    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function(requestData) {
      console.info('Requesting', requestData.url);
    });

    await page.property('viewportSize', { width: 1600, height: 960 });

    await page.open(`http://localhost:3000/match/${matchId}`);
    await page.property('content');
    // console.log(content);

    await page.render(`F://酷Q Pro/data/image/dota/${matchId}.png`);

    await instance.exit();

    ctx.body = matchId;
  }
}

module.exports = HomeController;
