<template>
  <div>
    <div class="bg-black">
      <div class="container text-white my-0 mx-auto py-2 flex justify-between">
        <div>CÔNG TY TNHH KIẾN TRÚC XÂY DỰNG VÀ NỘI THẤT GIA BẢO</div>
        <div>
          FANPAGE:
          <a target="_blank" href="https://www.facebook.com/gbluxury.vn"
            >www.facebook.com/gbluxury.vn</a
          >
        </div>
      </div>
    </div>
    <div class="bg-white shadow w-full" :class="isScroll ? 'navbar-container' : ''">
      <div
        class="container my-0 mx-auto flex items-center justify-between py-2"
      >
        <div>
          <router-link to="/">
            <img src="../../assets/logo.png" alt="" width="60" />
          </router-link>
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
  name: 'HeaderChildrenPage',
  data() {
    return {
      isScroll: false,
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
  mounted() {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 32) {
        this.isScroll = true 
      } else {
        this.isScroll = false
      }
    })
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