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

    await page.property('viewportSize', { width: 1920, height: 1080 });

    const status = await page.open(`http://localhost:3000/match/${matchId}`);
    const content = await page.property('content');
    // console.log(content);

    await page.render('test.png');

    await instance.exit();

    ctx.body = 'test';
  }
}

module.exports = HomeController;
