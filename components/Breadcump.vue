<template>
   <v-breadcrumbs :items="items" small>
      <template v-slot:divider>
         <Iconify iconName="iconoir:nav-arrow-right" className="tw-text-lg" />
      </template>
   </v-breadcrumbs>
</template>

<script>
export default {
   name: 'Breadcump',
   props: ['items']
}
</script>