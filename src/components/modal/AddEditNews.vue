<template>
  <a-spin :spinning="isLoading">
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
            :field-names="{ label: 'title', value: 'id'}"
            class="w-full"
            v-model:value="categoryParent"
            @change="getCategoriesChildren"
            :disabled="mode === 'view' || mode === 'edit'"
          ></a-select>
        </div>
        <div>
          <div>
            Chọn loại bài viết con <span class="text-red-500">*</span>
          </div>
          <a-select
            show-search
            placeholder="Chọn loại bài viết"
            :options="categoryChildrenList"
            :field-names="{ label: 'title', value: 'id'}"
            v-model:value="categoryChild"
            class="w-full"
            :disabled="mode === 'view' || mode === 'edit'"
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
            accept=".jpg,.jpeg,.png"
            type="image"
            :beforeUpload="beforeUpload"
            @remove="removeImage"
            :fileList="background"
            list-type="picture-card"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">Click hoặc kéo thả để upload ảnh</p>
          </a-upload-dragger>
        </div>
      </div>
      <div class="col-span-2 overflow-auto">
        <QuillEditor v-model:content="content" :options="editorOptions"/>
      </div>
    </div>
  </a-spin>
</template>

<script>
import { Quill, QuillEditor } from '@vueup/vue-quill'
import { Select, Input, UploadDragger, Spin } from "ant-design-vue";
import { InboxOutlined } from '@ant-design/icons-vue';
import { getChildrenById, getListCategoryParent } from '@/api/categories';
import notify from '@/service/notify';
import { toRaw } from 'vue';
import { getDetailNewsAdmin } from '@/api/news';
export default {
  name: 'AddEditView',
  components: {
    QuillEditor,
    ASelect: Select,
    AInput: Input,
    InboxOutlined,
    AUploadDragger: UploadDragger,
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
      isLoading: false,
      categoryChild: null,
      categoryParent: null,
      title: '',
      description: '',
      background: [],
      content: '',
      options: null,
      categoryChildrenList: []
    }
  },
  mounted() {
    const Font = Quill.import('formats/font');
    Font.whitelist = ['montserrat'];
    Quill.register(Font, true);
  },
  created() {
    if (this.mode === 'edit') {
      this.getDetailNews(this.data.id)
    } else {
      this.getDataCategories()
    }
  },
  methods: {
    getDetailNews(id) {
      this.isLoading = true
      getDetailNewsAdmin(id).then(res => {
        console.log('res :>> ', res);
      })
    },
    getDataCategories() {
      this.isLoading = true 
      getListCategoryParent().then(res => {
        if (res && res.length) {
          this.isLoading = false
          this.options = res.map(item => ({
            id: item.id,
            title: item.title
          }))
          if (this.data) {
            const data = toRaw(this.data)
            console.log('data :>> ', data);
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
    getCategoriesChildren() {
      this.isLoading = true 
      getChildrenById(this.categoryParent).then(res => {
        if (res) {
          this.isLoading = false
          if (res.subCategories) {
            this.categoryChildrenList = res.subCategories.map(item => ({
              id: item.id,
              title: item.title
            }))
          } else {
            this.categoryChildrenList = []
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
    beforeUpload(file) {
      if (file && file.size / 1024 / 1024 > 5) {
        notify.warning('Vui lòng chọn file không quá 5MB')
        return
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.background = [{
          uid: file.uid, // Unique ID của file
          name: file.name,
          status: "done",
          url: e.target.result, // URL của ảnh
        }]
      };
      reader.readAsDataURL(file);
      return false; // Ngăn chặn hành động upload mặc định
    },
    removeImage() {
      this.background = []
    }
  }
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