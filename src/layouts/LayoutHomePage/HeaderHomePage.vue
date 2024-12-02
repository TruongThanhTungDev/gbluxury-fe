<template>
  <div class="relative shadow">
    <div class="bg-black">
      <div class="container text-white my-0 mx-auto py-2 flex justify-between">
        <div>CÔNG TY TNHH KIẾN TRÚC XÂY DỰNG VÀ NỘI THẤT GIA BẢO</div>
        <div>
          FANPAGE:
          <a href="https://www.facebook.com/gbluxury.vn" target="_blank"
            >www.facebook.com/gbluxury.vn</a
          >
        </div>
      </div>
    </div>
    <div class="w-full h-[800px] relative">
      <div class="background-header"></div>
      <img src="../../assets/images/Phong-lam-viec-banner.jpg.webp" class="h-full w-full object-cover" alt="">
      <img src="../../assets/logo.png" alt="" id="logo-banner" :class="isShowLogo ? 'logo-header-banner-fixed' : 'logo-header-banner'" @click="toRouter">
    </div>
    <div class="bg-white shadow">
      <div
        class="container my-0 mx-auto flex items-center justify-between py-2"
      >
        <div>
          <router-link to="/">
            <img src="../../assets/logo.png" alt="" width="60" />
          </router-link>
          <!-- <div v-else class="h-[60px] ">

          </div> -->
        </div>
        <div class="flex gap-6">
          <div v-for="item in navbarList" :key="item.name">
            <router-link v-if="item.key !== 2 && item.key !== 3" :to="item.path" class="uppercase text-xl mx-2 px-2 navbar-menu">
              {{ item.name }}
            </router-link>
            <a-dropdown v-else>
              <router-link :to="item.path" class="uppercase text-xl mx-2 px-2 navbar-menu">
                {{ item.name }}
              </router-link>
              <template #overlay>
                <a-menu>
                  <a-menu-item v-for="child in item.children" :key="child.name">
                    <router-link :to="child.path">
                      {{ child.name }}
                    </router-link>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      navbarList: [
        {
          key: 1,
          name: 'Giới thiệu',
          path: "/gioi-thieu",
          children: []
        },
        {
          key: 2,
          name: 'Thiết kế nội thất',
          path: '/thiet-ke-noi-that',
          children: [
            {
              name: 'Nội thất chung cư, PENHOUSE',
              path: '/thiet-ke-noi-that'
            },
            {
              name: 'Nội thất biệt thự, nhà phố',
              path: '/thiet-ke-noi-that'
            },
            {
              name: 'Nội thất văn phòng',
              path: '/thiet-ke-noi-that'
            },
            {
              name: 'Nội thất khách sạn',
              path: '/thiet-ke-noi-that'
            }
          ]
        },
        {
          key: 3,
          name: 'Công trình',
          path: '/cong-trinh',
          children: [
            {
              name: 'Công trình thực tế',
              path: '/cong-trinh'
            },
            {
              name: 'Không gian công cộng',
              path: '/cong-trinh'
            }
          ]
        },
        {
          key: 4,
          name: 'Tin tức',
          path: '/tin-tuc',
          children: []
        },
        {
          key: 5,
          name: 'Liên hệ',
          path: '/lien-he',
          children: []
        }
      ],
      isShowLogo: false
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
      } else {
        this.isShowLogo = false
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
  },
  unmounted() {
  },
  methods: {
    toRouter() {
      this.$router.push('/')
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
.navbar-container {
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
  z-index: 1;
  animation: fade-in 0.3s ease-in-out;
  cursor: pointer;
}
.navbar-container {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background: white;
  box-shadow: 4px 4px 6px 0px #47474770
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