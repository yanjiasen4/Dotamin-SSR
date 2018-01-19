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
            <span class="info-content">{{ match.match_id }}</span>
          </mu-col>
          <mu-col width="33" class="info-block">
            <span class="info-title">游戏模式</span><br>
            <span class="info-content">{{ gamemode }}</span>
          </mu-col>
          <mu-col width="33" class="info-block">
            <span class="info-title">水平</span><br>
            <span class="info-content">{{ skillLevel }}</span>
          </mu-col>
        </mu-row>
      </mu-col>
    </mu-row>

    <mu-row gutter>
      <mu-col width="100">
        <div class="tb-header">
          <span class="radiant">天辉 - 概览</span>
        </div>
        <match-table v-bind:players="match.players.slice(0,5)" class="tb-wrapper"></match-table>
        
        <div class="tb-header">
          <span class="dire">夜魇 - 概览</span>
        </div>
        <div class="tb-wrapper">
          <match-table v-bind:players="match.players.slice(5,10)" class="tb-wrapper"></match-table>
        </div>
      </mu-col>
    </mu-row>

    <mu-row gutter>
      <!-- <highcharts :options="options"></highcharts> -->
    </mu-row>
  </div>
</template>

<script>
import axios from 'axios'

import Modes from '../../assets/modes'
import Heroes from '../../assets/heroes'
import Items from '../../assets/items'
import chartsOptions from '../../assets/chartsOptions'

import MatchTable from '../../components/MatchTable'

export default {
  name: 'Match',
  components: { MatchTable },
  data () {
    return {
      match: {},
      heroes: Heroes.heroes,
      items: Items.items,
      disable: false,
      options: chartsOptions.options
    }
  },
  props: ['id'],
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://api.opendota.com/api/matches/${params.id}`)
    return { match: data }
  },
  methods: {
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
      minutes = (Array(2).join('0') + minutes).slice(-2)
      seconds = (Array(2).join('0') + seconds).slice(-2)
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
  padding: 30px 2%;
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
  color: #ff4c4c;
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
  padding-top: 12px;
}

.info-block {
  text-align: right;
  min-width: 80px;
}

.info-title {
  text-transform: uppercase;
  font-size: 14px;
  color: rgb(179,179,179);
}

.info-content {
  font-size: 16px;
}

.tb-header {
  padding: 4px 0 2px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, .3);
}

.tb-wrapper {
  padding: 0 0 12px 0;
}
</style>
