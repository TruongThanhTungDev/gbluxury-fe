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
            :customRequest="uploadFile"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">Click hoặc kéo thả để upload ảnh</p>
          </a-upload-dragger>
        </div>
      </div>
      <div class="col-span-2 overflow-auto">
        <QuillEditor ref="quillEditor" v-model:content="content" :options="editorOptions" @text-change="onEditorChange"/>
      </div>
    </div>
  </a-spin>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { Quill, QuillEditor } from '@vueup/vue-quill'
import { Select, Input, UploadDragger, Spin } from "ant-design-vue";
import { InboxOutlined } from '@ant-design/icons-vue';
import { getChildrenById, getListCategoryParent } from '@/api/categories';
import notify from '@/service/notify';
import { getDetailNewsAdmin, uploadImageNews } from '@/api/news';
import { API_URL, UPLOAD_IMAGE } from '@/api/constant';
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
            ["table"],
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
      categoryChildrenList: [],
      uploadUrl: '',
      isCategoryParent: false,
    }
  },
  mounted() {
    this.uploadUrl = API_URL + UPLOAD_IMAGE + "/upload"
    const Font = Quill.import('formats/font');
    Font.whitelist = ['montserrat'];
    Quill.register(Font, true);
  },
  created() {
    this.getDataCategories()
    if (this.mode === 'edit') {
      this.getDetailNews(this.data.id)
    }
  },
  methods: {
    getDetailNews(id) {
      this.isLoading = true
      getDetailNewsAdmin(id).then(res => {
        if (res) {
          this.isLoading = false
          const quill = this.$refs.quillEditor.getQuill()
          this.description = res.description
          if (res.categoryRes) {
            if (res.categoryRes.parentCategory) {
              this.categoryParent = res.categoryRes.parentCategory.id
              this.categoryChild = res.categoryRes.id
            } else {
              this.categoryParent = res.categoryRes.id
            }
          }
          this.title = res.title
          const delta = quill.clipboard.convert(res.content)
          this.content = delta
          if (res.image) {
            const imageUrlArrSplit = res.image.split("/")
            if (imageUrlArrSplit.length) {
              const fileNameSv = imageUrlArrSplit[imageUrlArrSplit.length - 1]
              let fileName = fileNameSv.replace("admin_", "")
              fileName = fileName.slice(0, fileName.length - 1 - 14)
              this.background = [{
                uid: uuidv4(),
                name: fileName,
                status: 'done',
                url: res.image
              }]
            }
          }
        } else {
          this.isLoading = false
        }
      })
      .finally(() => this.isLoading = false) 
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
            this.getCategoriesChildren()
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
      return true; // Ngăn chặn hành động upload mặc định
    },
    uploadFile(file) {
      uploadImageNews(file.file).then(res => {
        if (res.data.code === 200) {
          this.background = [{
            uid: file.file.uid, // Unique ID của file
            name: file.file.name,
            status: "done",
            url: res.data.result, // URL của ảnh
          }]
        }
      })
    },
    removeImage() {
      this.background = []
    },
    onEditorChange(delta) {
      if (!delta) return
      const ops = delta.delta.ops || []
      const quill = this.$refs.quillEditor.getQuill()
      ops.forEach(op => {
        if (op.insert && typeof op.insert === 'object') {
          if (op.insert.image && op.insert.image.includes('base64')) {
            const base64String = op.insert.image.split(',')[1];
            const mimeType = op.insert.image.split(',')[0].match(/:(.*?);/)[1]
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
            const byteArray = new Uint8Array(byteNumbers);
            const file = new File([byteArray], uuidv4() + '.png', { type: mimeType });
            uploadImageNews(file).then(res => {
              if (res.data.code === 200) {
                const image = res.data.result
                const range = quill.getSelection()
                quill.insertEmbed(range.index, 'image', image)
                quill.deleteText(range.index - 1, 1)
                this.content = quill.editor.delta
              }
            })
          }
        }
      })
    },
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