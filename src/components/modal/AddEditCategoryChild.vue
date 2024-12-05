<template>
  <div class="flex flex-col gap-4">
    <div>
      <div>
        Chọn loại bài viết <span class="text-red-500">*</span>
      </div>
      <a-select
        show-search
        placeholder="Chọn loại bài viết"
        :options="options"
        class="w-full"
        v-model="categoryParent"
        @select="selectParent($event)"
        :disabled="mode === 'view'"
      ></a-select>
    </div>
    <div>
      <div>
        Nhập tên loại bài viết con <span class="text-red-500">*</span>
      </div>
      <a-input v-model:value="categoryChild" placeholder="Tên loại bài viết con" :disabled="mode === 'view'" @change="onChangeChild"/>
    </div>
    <div>
      <div>
        Đường dẫn
      </div>
      <a-input disabled v-model:value="url" placeholder="Đường dẫn"/>
    </div>
  </div>
</template>

<script>
import { Select, Input } from "ant-design-vue";

export default {
  name: 'AddEditCategoryChild',
  components: {
    ASelect: Select,
    AInput: Input
  },
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      categoryChild: '',
      categoryParentPath: '',
      categoryParent: null,
      options: [
        { value: '1', label: 'Thiết kế nội thất', path: 'thiet-ke-noi-that' },
        { value: '2', label: 'Công trình', path: 'cong-trinh' },
        { value: '3', label: 'Tin tức', path: 'tin-tuc' },
      ]
    }
  },
  computed: {
    url() {
      return this.categoryParentPath + '/' + this.convertToSlug(this.categoryChild)
    }
  },
  methods: {
    handleClick() {
      console.log("Nút trong Modal được nhấn!");
    },
    selectParent(event) {
      const item = this.options.find(el => el.value == event)
      if (item) {
        this.categoryParentPath = '/' + item.path
      }
    },
    convertToSlug(str) {
      str = str.toLowerCase();
      str = str.replace(/á|à|ả|ã|ạ/g, 'a')
        .replace(/ă|ắ|ằ|ẳ|ẵ|ặ/g, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ/g, 'e')
        .replace(/ê|ế|ề|ể|ễ|ệ/g, 'e')
        .replace(/í|ì|ỉ|ĩ|ị/g, 'i')
        .replace(/ó|ò|ỏ|õ|ọ/g, 'o')
        .replace(/ô|ố|ồ|ổ|ỗ|ộ/g, 'o')
        .replace(/ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
        .replace(/ú|ù|ủ|ũ|ụ/g, 'u')
        .replace(/ù|ừ|ử|ữ|ự/g, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
        .replace(/đ/g, 'd');
      str = str.replace(/\s+/g, '-');
      str = str.replace(/[^a-z0-9-]/g, '');
      return str
    },
    onChangeChild() {
    }
  },
};
</script>