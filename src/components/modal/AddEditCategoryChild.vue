<template>
  <a-spin :spinning="isLoading">
    <div class="flex flex-col gap-4" :ref="'childRef'">
      <div>
        <div>
          Chọn loại bài viết <span class="text-red-500">*</span>
        </div>
        <a-select
          show-search
          placeholder="Chọn loại bài viết"
          :options="options"
          :field-names="{ label: 'title', value: 'id'}"
          :value="categoryParent"
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
  </a-spin>
</template>

<script>
import { getListCategoryParent } from "@/api/categories";
import { Select, Input, Spin } from "ant-design-vue";

export default {
  name: 'AddEditCategoryChild',
  components: {
    ASelect: Select,
    AInput: Input,
    ASpin: Spin
  },
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    data: {
      type: Object,
      default: () => {}
    },
    parentCategoryId: {
      type: String,
      default: ''
    },
    childRef: {
      default: () => {}
    }
  },
  data() {
    return {
      isLoading: false,
      categoryChild: '',
      categoryParentPath: '',
      categoryParent: null,
      payload: null,
      options: []
    }
  },
  computed: {
    url() {
      return this.categoryParentPath + '/' + this.convertToSlug(this.categoryChild)
    }
  },
  created() {
    this.getDataCategories()
  },
  methods: {
    getDataCategories() {
      this.isLoading = true 
      getListCategoryParent().then(res => {
        if (res && res.length) {
          this.isLoading = false
          this.options = res.map(item => ({
            code: item.code,
            id: item.id,
            path: item.path,
            title: item.title
          }))
          if (this.parentCategoryId) {
            this.categoryParent = this.parentCategoryId
            this.selectParent(this.categoryParent)
          }
        } else {
          this.isLoading = false
          this.options = []
        }
      })
        .catch(() => {
        this.isLoading = false
      })
        .finally(() => {
        this.isLoading = false
      })
    },
    handleClick() {
      console.log("Nút trong Modal được nhấn!");
    },
    selectParent(event) {
      console.log('event :>> ', event);
      const item = this.options.find(el => el.id == event)
      console.log('item :>> ', item);
      if (item) {
        this.categoryParentPath = '/' + item.code
      }
    },
    convertToSlug(str) {
      str = str.toLowerCase();
      str = str.replace(/á|à|ả|ã|ạ/g, 'a')
        .replace(/ă|ắ|ằ|ẳ|ẵ|ặ/g, 'a')
        .replace(/â|ầ|ấ|ẩ|ẫ|ậ/g, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ/g, 'e')
        .replace(/ê|ế|ề|ể|ễ|ệ/g, 'e')
        .replace(/í|ì|ỉ|ĩ|ị/g, 'i')
        .replace(/ó|ò|ỏ|õ|ọ/g, 'o')
        .replace(/ô|ố|ồ|ổ|ỗ|ộ/g, 'o')
        .replace(/ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
        .replace(/ú|ù|ủ|ũ|ụ/g, 'u')
        .replace(/ư|ừ|ử|ữ|ự/g, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
        .replace(/đ/g, 'd');
      str = str.replace(/\s+/g, '-');
      str = str.replace(/[^a-z0-9-]/g, '');
      return str
    },
    onChangeChild() {
    },
    save() {
      const payload = {
        title: this.categoryChild,
        path: this.url,
        code: this.convertToSlug(this.categoryChild),
        name: this.categoryChild,
        parentCategoryId: this.parentCategoryId
      }
      this.payload = {
        ...payload
      }
      console.log('this.payload :>> ', this.payload);
    }
    
  },
};
</script>