<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer v-if="showDrawer" />

    <dashboard-core-view />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreView: () => import('./components/core/View'),
    },

    data: () => ({
      expandOnHover: false,
      showDrawer: false,
    }),

    watch: {
      '$route.path': {
        handler: function (search) {
          if (this.$route.path !== '/') {
            this.showDrawer = true
          }
        },
        deep: true,
        immediate: true,
      },
    },

    created () {
      if (this.$route.path !== '/') {
        this.showDrawer = true
      }
    },
  }
</script>
