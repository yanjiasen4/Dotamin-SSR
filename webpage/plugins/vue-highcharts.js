import Vue from 'vue'
import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts'

import loadDarkUnica from 'highcharts/themes/dark-unica'

loadDarkUnica(Highcharts)

Vue.use(VueHighcharts, { Highcharts })