<template>
  <div class="container my-0 mx-auto md:px-0 px-6">
    <div class="uppercase font-bold md:text-4xl text-2xl mb-4 text-center">
      LIÊN HỆ
    </div>
    <div class="mb-4">
      <iframe :src="src" frameborder="0" width="100%" height="350" scrolling="yes"></iframe>
    </div>
    <div>
      <div class="uppercase font-bold text-2xl mb-4">
        Công ty TNHH Kiến Trúc Và Xây Dựng HOMY Việt Nam
      </div>
      <div class="flex flex-col gap-2 text-xl font-[300]">
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
  </div>
</template>

<script>
export default {
  name: 'LienHePage',
  data() {
    return {
      src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.851035909424!2d105.81846951493205!3d20.998607586014703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac8f7df4b95b%3A0xfeccbe91a01028b8!2zMjc1IEhvw6BuZyBWxINuIFRow6FpLCBLaMawxqFuZyBUcnVuZywgVGhhbmggWHXDom4sIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1624415877728!5m2!1svi!2s'
    }
  }
}
</script>

<style>

</style>