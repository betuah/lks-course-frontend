<template>
  <v-app class="tw-overflow-hidden fill-height">
    <!-- <Header /> -->
    <v-main class="tw-overflow-hidden fill-height">
      <v-container fluid fill-height class="col-12 pa-0 d-flex flex-row justify-start align-start">
        <div class="d-flex fill-height pa-0 md:tw-w-60">
          <Sidebar />
        </div>
        <div class="pa-0 fill-height d-flex flex-grow-1 flex-column">
          <div>
            <Header />
          </div>
          <v-container fill-height fluid class="accent">
            <Nuxt />
          </v-container>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style>
  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(197, 156, 122, 0.521) transparent;
    -ms-overflow-style: none;
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 5px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(139, 136, 134, 0.521);
    border-radius: 20px;
  }
</style>