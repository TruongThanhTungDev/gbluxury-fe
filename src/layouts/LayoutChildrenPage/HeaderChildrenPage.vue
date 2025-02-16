<template>
  <div>
    <div class="bg-black lg:px-0 px-6">
      <div class="container text-white my-0 mx-auto py-2 sm:flex sm:justify-between text-center">
        <div>CÔNG TY TNHH KIẾN TRÚC XÂY DỰNG VÀ NỘI THẤT GIA BẢO</div>
        <div>
          FANPAGE:
          <a target="_blank" href="https://www.facebook.com/gbluxury.vn"
            >www.facebook.com/gbluxury.vn</a
          >
        </div>
      </div>
    </div>
    <div class="bg-white shadow w-full lg:px-0 px-6" :class="isScroll ? 'navbar-container' : ''">
      <div
        class="container my-0 mx-auto flex items-center justify-between py-2"
      >
        <div>
          <router-link to="/">
            <img src="../../assets/logo.png" alt="" width="60" />
          </router-link>
        </div>
        <div class="show-menu">
          <div class="flex gap-6">
            <div v-for="item in navbarList" :key="item.name">
              <router-link v-if="item.name === 'gioi-thieu' || item.name === 'lien-he'" :to="item.path" class="uppercase text-xl mx-2 px-2 navbar-menu">
                {{ item.title }}
              </router-link>
              <a-dropdown v-else>
                <router-link :to="item.path" class="uppercase text-xl mx-2 px-2 navbar-menu">
                  {{ item.title }}
                </router-link>
                <template #overlay v-if="item.subCategories.length">
                  <a-menu>
                    <a-menu-item v-for="child in item.subCategories" :key="child.name">
                      <router-link :to="child.path">
                        {{ child.title }}
                      </router-link>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </div>
        <div class="show-menu-drawer">
          <a-button :size="'large'" @click="showDrawer">
            <template #icon>
              <MenuOutlined />
            </template>
          </a-button>
          <a-drawer
            title=""
            placement="right"
            :closable="true"
            v-model:visible="isShowMenu"
          >
            <menu-common :data="navbarList" @close="showDrawer"/>
          </a-drawer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getListCategoryParentClient } from '@/api/categories';
import { MenuOutlined } from '@ant-design/icons-vue';
import MenuCommon from '@/components/common/MenuCommon.vue';

export default {
  name: 'HeaderChildrenPage',
  components: {
    MenuOutlined,
    MenuCommon
  },
  data() {
    return {
      isScroll: false,
      navbarList: [
      ],
      isShowLogo: false,
      isShowMenu: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 32) {
        this.isScroll = true 
      } else {
        this.isScroll = false
      }
    })
  },
  created() {
    this.getCategory()
  },
  methods: {
    getCategory() {
      getListCategoryParentClient().then(res => {
        if (res && res.length) {
          this.navbarList = res
        }
      })
    },
    showDrawer() {
      this.isShowMenu = !this.isShowMenu
    },
  }
}
</script>

<style scoped>
.navbar-menu {
  position: relative;
}
.navbar-menu:hover {
  color: black!important;
  position: relative;
  transition: 0.2s ease-in-out;
}
.navbar-menu:active {
  color: black!important;
  transition: 0.2s ease-in-out;
}
.navbar-menu {
  transition: 0.2s ease-in-out;
}
.navbar-container {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background: white;
  box-shadow: 4px 4px 6px 0px #80808070;
  transition: 0.1s all;
  /* animation: onTopFade 0.1s ease-in-out; */
}
@keyframes onTopFade {
  0% {
    top: 32px;
  }
  100% {
    top: 0
  }
}
</style>