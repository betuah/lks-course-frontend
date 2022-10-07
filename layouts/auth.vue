<template>
  <v-app class="tw-overflow-hidden fill-height">
    <v-main class="tw-overflow-hidden fill-height bgSecondary">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<style>
/* Works on Firefox */
html {
  overflow-y: auto;
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(197, 156, 122, 0.3) transparent;
  -ms-overflow-style: none;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 3px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(139, 136, 134, 0.3);
  border-radius: 20px;
}
</style>
