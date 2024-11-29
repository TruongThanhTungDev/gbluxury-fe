<template>
  <div class="bg-black text-white py-14">
    <div class="container my-0 mx-auto grid grid-cols-3">
      <div class="col-span-2">
        <div class="uppercase font-bold text-xl mb-4">
          Công ty TNHH Kiến Trúc Và Xây Dựng HOMY Việt Nam
        </div>
        <div class="flex flex-col gap-2">
          <div>
            Văn phòng đại diện: Tầng 2 - Số 275 Hoàng Văn Thái, Phường Khương Trung, Quận Thanh Xuân, TP. Hà Nội
          </div>
          <div>
            Thời gian làm việc: 8h00 - 19h00 tất cả các ngày trong tuần
          </div>
          <div class="flex gap-2">
            Hotline: <a href="tel:+84915250666" class="phone-number">0915 250 666</a>  |  <a  href="tel:+84948967696" class="phone-number">0948 967 696</a>
          </div>
          <div>
            Email: <span class="underline">gbhome8888@gmai.com</span>
          </div>
        </div>
      </div>
      <div>
        <div class="uppercase font-bold text-xl mb-4">
          Fanpage
        </div>
        <iframe
          src="https://www.facebook.com/v2.9/plugins/page.php?adapt_container_width=true&app_id=&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df52680749798e0e27%26domain%3Dgbluxury.vn%26is_canvas%3Dfalse%26origin%3Dhttp%253A%252F%252Fgbluxury.vn%252Ffd998055e57db19fe%26relation%3Dparent.parent&container_width=0&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Fgbluxury.vn&locale=vi_VN&sdk=joey&show_facepile=true&show_posts=false&small_header=false&width=500"
          class="w-full" height="200" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"
          allow="encrypted-media">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterPage",
};
</script>

<style scoped>
.phone-number {
  text-decoration: underline;
}
</style>
