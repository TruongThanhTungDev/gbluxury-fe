<template>
  <div class="grid grid-cols-3 gap-6 h-[600px]">
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
    <div class="col-span-2 overflow-auto">
      <QuillEditor :options="editorOptions"/>
      <!-- <QuillEditor toolbar="#my-toolbar">
        <template #toolbar>
          <div id="my-toolbar">
            <span class="ql-formats">
              <select class="ql-font">
                <option selected>Sans Serif</option>
                <option value="inconsolata">Inconsolata</option>
                <option value="roboto">Roboto</option>
                <option value="mirza">Mirza</option>
                <option value="arial">Arial</option>
                <option value="montserrat">Montserrat</option>
              </select>
              <select class="ql-size"></select>
            </span>
          </div>
        </template>
      </QuillEditor> -->
    </div>
  </div>
</template>

<script>
import { Quill, QuillEditor } from '@vueup/vue-quill'
import { Select, Input, UploadDragger } from "ant-design-vue";
import { InboxOutlined } from '@ant-design/icons-vue';
export default {
  name: 'AddEditView',
  components: {
    QuillEditor,
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
      editorOptions: {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // Tiêu đề H1-H6
            [{ font: ['montserrat'] }],
            [{ size: ['small', false, 'large', 'huge'] }], // Kích thước font
            ['bold', 'italic', 'underline', 'strike'], // Chữ đậm, nghiêng, gạch chân, gạch ngang
            [{ color: [] }, { background: [] }], // Màu chữ và màu nền
            [{ script: 'sub' }, { script: 'super' }], // Chỉ số dưới, chỉ số trên
            [{ list: 'ordered' }, { list: 'bullet' }], // Danh sách có thứ tự, không thứ tự
            [{ indent: '-1' }, { indent: '+1' }], // Tăng giảm thụt đầu dòng
            [{ align: [] }], // Canh lề
            ['link', 'image', 'video'], // Thêm liên kết, hình ảnh, video
            ['blockquote', 'code-block'], // Khối trích dẫn, mã code
            ['clean'], // Xóa định dạng
          ],
          clipboard: {
            matchVisual: false, // Tắt dán trực quan
          },
          history: {
            delay: 2000,
            maxStack: 500,
          },
        },
        placeholder: 'Nhập nội dung tại đây...', // Gợi ý khi chưa nhập nội dung
        readOnly: false, // Chế độ chỉ đọc
      },
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
  },
  mounted() {
    const Font = Quill.import('formats/font');
    Font.whitelist = ['montserrat'];
    Quill.register(Font, true);
  },
}
</script>

<style scoped>
.ql-editor {
  min-height: 200px!important;
  max-height: 600px!important;
  overflow-y: auto;
  font-family: 'Montserrat', Helvetica Neue, Arial, sans-serif!important
}
</style>