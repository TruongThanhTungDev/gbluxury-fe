<template>
  <div class="grid grid-cols-3 gap-6">
    <div class="flex flex-col gap-4 border-r pr-6">
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
          :disabled="mode === 'view'"
        ></a-select>
      </div>
      <div>
        <div>
          Chọn loại bài viết con <span class="text-red-500">*</span>
        </div>
        <a-select
          show-search
          placeholder="Chọn loại bài viết"
          :options="options"
          class="w-full"
          v-model="categoryParent"
          :disabled="mode === 'view'"
        ></a-select>
      </div>
      <div>
        <div>
          Nhập tiêu đề <span class="text-red-500">*</span>
        </div>
        <a-input v-model:value="title" placeholder="Nhập tiêu đề" :disabled="mode === 'view'"/>
      </div>
      <div>
        <div>
          Nhập mô tả
        </div>
        <a-input v-model:value="description" placeholder="Nhập mô tả" :disabled="mode === 'view'"/>
      </div>
      <div>
        <div>
          Chọn ảnh hiển thị
        </div>
        <a-upload-dragger
          name="file"
          :beforeUpload="false"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">Click hoặc kéo thả để upload ảnh</p>
        </a-upload-dragger>
      </div>
    </div>
    <div class="col-span-2">
    </div>
  </div>
</template>

<script>
import { Select, Input, UploadDragger } from "ant-design-vue";
import { InboxOutlined } from '@ant-design/icons-vue';
export default {
  name: 'AddEditView',
  components: {
    ASelect: Select,
    AInput: Input,
    InboxOutlined,
    AUploadDragger: UploadDragger,
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
      categoryParent: null,
      title: '',
      description: '',
      background: '',
      options: [
        { value: '1', label: 'Thiết kế nội thất', path: 'thiet-ke-noi-that' },
        { value: '2', label: 'Công trình', path: 'cong-trinh' },
        { value: '3', label: 'Tin tức', path: 'tin-tuc' },
      ]
    }
  }
}
</script>

<style>

</style>