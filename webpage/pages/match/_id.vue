<template>
  <div class="match-wrapper">
    <mu-row gutter>
      <mu-col width="33" class="match-result" :class="this.match.radiant_win ? 'radiant' : 'dire'">
        <span>
          {{ matchWinner }}
        </span>
      </mu-col>
      <mu-col width="33" class="time-table">
        <mu-row gutter>
          <mu-col width="33" class="radiant score">
            {{ match.radiant_score }}
          </mu-col>
          <mu-col width="33" class="time">
            <span>{{ duration }}</span><br>
            <div class="end-time">结束于{{ endTime }}前</div>
          </mu-col>
          <mu-col width="33" class="dire score">
            {{ match.dire_score }}
          </mu-col>
        </mu-row>
        <div class="time">
          <span></span>
        </div>
      </mu-col>
      <mu-col width="33" class="info">
        <mu-row gutter>
          <mu-col width="33" class="info-block">
            <span class="info-title">比赛编号</span><br>
            <span>{{ match.match_id }}</span>
          </mu-col>
          <mu-col width="33" class="info-block">
            <span class="info-title">游戏模式</span><br>
            <span>{{ gamemode }}</span>
          </mu-col>
          <mu-col width="33" class="info-block">
            <span class="info-title">水平</span><br>
            <span>{{ skillLevel }}</span>
          </mu-col>
        </mu-row>
      </mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="100">
        <mu-table :showCheckbox="disable">
          <mu-thead>
            <mu-tr>
              <mu-th class="tb-player">玩家</mu-th>
              <mu-th class="tb-level">等级</mu-th>
              <mu-th class="tb-stat">击杀</mu-th>
              <mu-th class="tb-stat">死亡</mu-th>
              <mu-th class="tb-stat">助攻</mu-th>
              <mu-th class="tb-stat">GPM</mu-th>
              <mu-th class="tb-stat">XPM</mu-th>
              <mu-th class="tb-stat">正补</mu-th>
              <mu-th class="tb-stat">反补</mu-th>
              <mu-th>英雄伤害</mu-th>
              <mu-th>英雄治疗</mu-th>
              <mu-th>建筑伤害</mu-th>
              <mu-th>经济</mu-th>
              <mu-th class="tb-item">装备</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="player of match.players" :key="player.player_slot">
              <mu-td>
                <mu-row gutter>
                  <mu-col width="30">
                    <img :src="getHeroAvatar(player.hero_id)" class="hero-avatar">
                  </mu-col>
                  <mu-col width="70" class="person">
                    <mu-row>
                      <span>{{ player.personaname }}</span>
                    </mu-row>
                    <mu-row>
                      <span class="rank">{{ getRank(player.rank_tier) }}</span>
                    </mu-row>
                  </mu-col>
                </mu-row>
              </mu-td>
              <mu-td>{{ player.level }}</mu-td>
              <mu-td>{{ player.kills }}</mu-td>
              <mu-td>{{ player.deaths }}</mu-td>
              <mu-td>{{ player.assists }}</mu-td>
              <mu-td>{{ player.gold_per_min }}</mu-td>
              <mu-td>{{ player.xp_per_min }}</mu-td>
              <mu-td>{{ player.last_hits }}</mu-td>
              <mu-td>{{ player.denies }}</mu-td>
              <mu-td>{{ player.hero_damage }}</mu-td>
              <mu-td>{{ player.hero_healing }}</mu-td>
              <mu-td>{{ player.tower_damage }}</mu-td>
              <mu-td>{{ player.total_gold }}</mu-td>
              <mu-td>
                <mu-row>
                  <mu-col width="33" desktop="33">
                    <img :src="getItemUrl(player.item_0)" class="tc-item">
                  </mu-col>
                  <mu-col width="33" desktop="33">
                    <img :src="getItemUrl(player.item_1)" class="tc-item">
                  </mu-col>
                  <mu-col width="33" desktop="33">
                    <img :src="getItemUrl(player.item_2)" class="tc-item">
                  </mu-col>
                </mu-row>
                <mu-row>
                  <mu-col width="33" desktop="33">
                    <img :src="getItemUrl(player.item_3)" class="tc-item">
                  </mu-col>
                  <mu-col width="33" desktop="33">
                    <img :src="getItemUrl(player.item_4)" class="tc-item">
                  </mu-col>
                  <mu-col width="33" desktop="33">
                    <img :src="getItemUrl(player.item_5)" class="tc-item">
                  </mu-col>
                </mu-row>
              </mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import axios from 'axios'

import Modes from '../../assets/modes'
import Heroes from '../../assets/heroes'
import Items from '../../assets/items'

export default {
  name: 'Match',
  data () {
    return {
      match: {},
      heroes: Heroes.heroes,
      items: Items.items,
      itemUrl: Items.urlSite,
      disable: false
    }
  },
  props: ['id'],
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://api.opendota.com/api/matches/${params.id}`)
    return { match: data }
  },
  methods: {
    // loadMatchInfo: function () {
    //   let _this = this
    //   this.$http.get(`https://api.opendota.com/api/matches/${this.id}`).then((response) => {
    //     if (response.status === 200) {
    //       _this.match = response.data
    //       console.log(_this.match)
    //     }
    //   })
    // },
    getRank: function (rankTier) {
      const tierTable = ['未出分', '先锋', '卫士', '中军', '统帅', '一代传奇', '万古流芳', '超凡入圣']
      let tier = parseInt(rankTier / 10)
      let subTier = parseInt(rankTier % 10)
      if (tier === 0) return '未出分'
      return tierTable[tier] + '[' + subTier + ']'
    },
    getHeroAvatar: function (heroId) {
      for (let hero of this.heroes) {
        if (hero.id === heroId) return hero.url_full_portrait
      }
      return ''
    },
    getItemUrl: function (itemId) {
      for (let item of this.items) {
        if (item.id === itemId) {
          const itemName = item.name.substr(5)
          const itemUrl = this.itemUrl + itemName + '_lg.png'
          return itemUrl
        }
      }
      return ''
    }
  },
  computed: {
    matchWinner: function () {
      if (this.match.radiant_win) {
        return '天辉获胜'
      } else {
        return '夜魇获胜'
      }
    },
    duration: function () {
      let hours = parseInt(this.match.duration / (60 * 60))
      let minutes = parseInt(this.match.duration / 60)
      let seconds = this.match.duration % 60
      if (minutes === 0) {
        if (hours > 0) minutes = '00'
        else minutes = ''
      }
      if (seconds === 0) seconds = '00'
      if (hours === 0) {
        return minutes + ':' + seconds
      } else {
        return hours + ':' + minutes + ':' + seconds
      }
    },
    gamemode: function () {
      const modes = Modes.modes
      for (let mode of modes) {
        if (mode.id === this.match.game_mode) {
          return mode.name_zh
        }
      }
      return ''
    },
    skillLevel: function () {
      const skillTable = ['未知', 'normal', 'high', 'very high']
      return skillTable[this.match.skill]
    },
    endTime: function () {
      const timestamp = Date.parse(new Date()) / 1000
      const startTimestamp = this.match.start_time
      const endTimestamp = startTimestamp + this.match.duration
      const endTime = timestamp - endTimestamp
      if (endTime >= 3600 * 24 * 30) {
        return parseInt(endTime / 3600 / 24 / 30) + '月'
      }
      if (endTime >= 3600 * 24) {
        return parseInt(endTime / 3600 / 24) + '天'
      }
      if (endTime >= 3600) {
        return parseInt(endTime / 3600) + '小时'
      }
      if (endTime >= 60) {
        return parseInt(endTime / 60) + '分钟'
      }
    }
  }
}
</script>

<style scoped>
.match-wrapper {
  margin: 0 20px;
  padding: 30px 10%;
}

.match-result {
  padding-top: 1px;
}

.match-result span {
  font-size: 48px;
  font-weight: 400;
}

.radiant {
  color: #66BB6A;
}

.dire {
  color: red;
}

.time {
  padding: 10px 20px;
}

.time span {
  font-size: 36px;
}

.end-time {
  font-size: 13px;
  display:inline-block;
  color: rgb(179,179,179);
}

.score {
  font-size: 48px;
}

.info {
  padding-top: 16px;
}

.info-block {
  text-align: right;
  min-width: 80px;
}

.info-title {
  text-transform: uppercase;
  font-size: 12px;
  color: rgb(179,179,179);
}

.mu-th {
  padding: 1px 8px;
}

.mu-td {
  padding: 1px 8px;
}

.hero-avatar {
  height: 36px;
  padding: 4px 4px 0 0;
}

.person {
  width: 70%;
}

.rank {
  color: rgb(179,179,179);
}

.tb-player {
  width: 230px;
}

.tb-level {
  width: 48px;
}

.tb-stat {
  width: 60px;
}

.tb-item {
  width: 120px;
}

.tc-item {
  height: 24px;
}
</style>
