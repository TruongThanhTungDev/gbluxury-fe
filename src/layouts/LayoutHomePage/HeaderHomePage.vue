<template>
  <div class="relative shadow">
    <div class="bg-black lg:px-0 px-6">
      <div class="container text-white my-0 mx-auto py-2 sm:flex sm:justify-between text-center">
        <div>GIA BẢO LUXURY INTERIOR</div>
        <div>
          HOTLINE:
          <a href="tel:+84948967696"
            >0379 595 558</a
          >
        </div>
      </div>
    </div>
    <div class="w-full h-[800px] relative">
      <div class="background-header"></div>
      <img src="../../assets/images/Phong-lam-viec-banner.jpg.webp" class="h-full w-full object-cover" alt="">
      <img src="../../assets/logo.png" alt="" id="logo-banner" :class="isShowLogo ? 'logo-header-banner-fixed' : 'logo-header-banner'" @click="toRouter">
    </div>
    <div class="bg-white shadow lg:px-0 px-6" :class="isScroll ? 'navbar-container-lg navbar-container' : ''">
      <div
        class="container my-0 mx-auto flex items-center justify-between py-2"
      >
        <div>
          <router-link to="/">
            <img src="../../assets/logo3.png" alt="" width="120" />
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
  name: "HeaderComponent",
  components: {
    MenuOutlined,
    MenuCommon
  },
  data() {
    return {
      navbarList: [
      ],
      isShowLogo: false,
      isShowMenu: false,
      isScroll: false
    };
  },
  computed: {
  }, 
  mounted() {
    const logo = document.getElementById('logo-banner')
    const maxTop = 810; 
    const initialTop = 50;
    const maxWidth = 200
    const minWidth = 100
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 825) {
        this.isShowLogo = true 
        this.isScroll = true
      } else {
        this.isShowLogo = false
        this.isScroll = false
      }
      let newTop = initialTop + scrollY * 0.05;
      let newWidth = maxWidth - scrollY * 0.1 ;
      if (newTop > maxTop) {
        newTop = maxTop;
      } else if (scrollY === 0) {
        newTop = initialTop;
      }
      if (newWidth < minWidth) {
          newWidth = minWidth; // Giới hạn không nhỏ hơn 100px
      }
      logo.style = `top: ${newTop}%; width: ${newWidth}px`
    });
  },
  created() {
    this.getCategory()
  },
  unmounted() {
  },
  methods: {
    toRouter() {
      this.$router.push('/')
    },
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
    titleClick() {
      console.log('123 :>> ', 123);
    }
  }
};
</script>

<style scoped>
.navbar-menu:hover {
  color: black!important;
  position: relative;
}
.navbar-menu {
  transition: 0.2s ease-in-out;
}
.background-header {
  position: absolute;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.3;
}
.navbar-container-lg .navbar-container {
  position: relative;
}
.logo-header-banner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  animation: fade-in-logo 0.5s ease-in-out;
  cursor: pointer;
}
.logo-header-banner-fixed {
  position: fixed;
  top: 60px!important;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 10;
  animation: fade-in 0.3s ease-in-out;
  cursor: pointer;
  /* width: 65px!important; */
}

@media screen and (max-width: 999px) {
  .navbar-container-lg.navbar-container {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    background: white;
    z-index: 1;
    box-shadow: 4px 4px 6px 0px #47474770
  }
  .logo-header-banner-fixed {
    display: none
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in-logo {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>