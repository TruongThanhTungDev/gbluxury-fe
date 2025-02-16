<template>
  <div v-if="data && data.length" class="h-full flex gap-2 flex-col">
    <div v-for="item in data" :key="item.id">
      <div v-if="item.subCategories && !item.subCategories.length">
        <div class="uppercase text-xl px-2" @click="viewCategory(item.path)">
          {{ item.title }}
        </div>
      </div>
      <div v-else class="px-2">
        <div class="flex items-center justify-between uppercase text-xl">
          <div @click="viewCategory(item.path)">{{ item.title }}</div>
          <div class="w-[50px] text-center border-l-[1px] text-sm border-l-neutral-200" @click="expandMenu(item.id)">
            <DownOutlined class="mb-1" v-if="keyMenu !== item.id || !keyMenu"/>
            <UpOutlined class="mb-1" v-if="keyMenu && keyMenu === item.id"/>
          </div>
        </div>
        <div class="bg-neutral-100" :class="keyMenu === item.id ? 'slide-down-block' : 'slide-down-none'">
          <div v-for="el in item.subCategories" :key="el.id" class="pl-6 py-2">
            <div @click="viewCategory(el.path)">
              <div>{{ el.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
export default {
  name: 'MenuCommon',
  components: {
    DownOutlined,
    UpOutlined
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      keyMenu: '',
    }
  },
  methods: {
    expandMenu(id) {
      if (id === this.keyMenu) {
        this.keyMenu = ''
      } else {
        this.keyMenu = id
      }
    },
    viewCategory(path) {
      this.$router.push(path)
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>