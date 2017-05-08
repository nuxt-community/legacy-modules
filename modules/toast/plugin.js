import Vue from 'vue'
import Toast from 'mini-toastr'

// https://github.com/se-panfilov/mini-toastr
Toast.init({})

// Add Icons
Toast.setIcon('success', 'span', {class: 'fa fa-check-circle'})
Toast.setIcon('error', 'span', {class: 'fa fa-warning'})
Toast.setIcon('info', 'span', {class: 'fa fa-info-circle'})
Toast.setIcon('warn', 'span', {class: 'fa fa-warning'})

// Mixins
Vue.mixin({
  methods: {
    $success: Toast.success,
    $error: Toast.error,
    $info: Toast.info,
    $warn: Toast.warn
  }
})
