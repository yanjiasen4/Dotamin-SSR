<template>
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
        <mu-th class="tb-bag">背包</mu-th>
      </mu-tr>
    </mu-thead>

    <mu-tbody>
      <mu-tr v-for="(player,index) of players" :key="index">
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
        <mu-td>
          <mu-row>
            <mu-col width="50" desktop="50">
              <img :src="getItemUrl(player.backpack_0)" class="tc-item">
            </mu-col>
            <mu-col width="50" desktop="50">
              <img :src="getItemUrl(player.backpack_1)" class="tc-item">
            </mu-col>
          </mu-row>
          <mu-row>
            <mu-col width="50" desktop="50">
              <img :src="getItemUrl(player.backpack_2)" class="tc-item">
            </mu-col>
          </mu-row>
        </mu-td>
      </mu-tr>
    </mu-tbody>
  </mu-table>
</template>

<script>
import Heroes from '../assets/heroes'
import Items from '../assets/items'

export default {
  name: 'MatchTable',
  props: ['players'],
  data () {
    return {
      heroes: Heroes.heroes,
      items: Items.items,
      itemUrl: Items.urlSite,
      disable: false
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>
.mu-th {
  padding: 1px 8px;
}

.mu-td {
  padding: 1px 8px;
}

.hero-avatar {
  height: 40px;
  padding: 4px 4px 0 0;
}

.person {
  width: 70%;
}

.rank {
  color: rgb(179,179,179);
}

.tb-player {
  width: 260px;
}

.tb-level {
  width: 60px;
}

.tb-stat {
  width: 60px;
}

.tb-item {
  width: 120px;
}

.tb-bag {
  width: 80px;
}

.tc-item {
  height: 24px;
  min-height: 24px;
}
</style>
