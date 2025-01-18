<template>
  <div>
    <a-button type="primary" class="mb-4" @click="addNew"
      >Thêm bài viết mới</a-button
    >
    <a-table :columns="columns" :data-source="listDataNews" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div class="space-x-2">
            <a-button type="primary" ghost @click="viewDetailChild(record)">
              <i class="fa-solid fa-eye"></i>
            </a-button>
            <a-button type="primary" @click="editNews(record)">
              <i class="fa-solid fa-pen"></i>
            </a-button>
            <a-button type="primary" danger>
              <i class="fa-solid fa-trash"></i>
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { addNews, getNewsAdmin } from "@/api/news";
import AddEditNews from "@/components/modal/AddEditNews.vue";
import notify from "@/service/notify";
import { Modal } from "ant-design-vue";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { createVNode, toRaw } from "vue";
export default {
  name: "QuanLyBaiVietPage",
  data() {
    return {
      columns: [
        {
          title: "Tên bài viết",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Loại bài viết con",
          dataIndex: "categoryRes",
          key: "categoryRes",
        },
        {
          title: "Loại bài viết cha",
          dataIndex: "parentCategory",
          key: "parentCategory",
        },
        {
          title: "Thao tác",
          dataIndex: "action",
          key: "action",
        },
      ],
      listDataNews: [
        
      ],
      isLoading: false,
      page: 0,
      size: 10
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const payload = {
        categoryId: '',
        page: this.page,
        size: this.size
      }
      this.isLoading = true
      getNewsAdmin(payload).then(res => {
        if (res) {
          if (res.content.length) {
            this.listDataNews = res.content.map(item => ({
              ...item,
              categoryRes: item.categoryRes.title,
              parentCategory: item.categoryRes.parentCategory.title
            }))
          }
        }
      })
        .finally(() => {
        this.isLoading = false
      })
    }, 
    addNew() {
      const modal = createVNode(AddEditNews)
      Modal.confirm({
        title: "Thêm bài viết mới",
        content: modal,
        icon: null,
        width: "75%",
        class: 'abc',
        okText: "Lưu",
        closable: true,
        onOk:() => {
          const title = toRaw(modal.component.data.title)
          const description = toRaw(modal.component.data.description)
          const categoryId = toRaw(modal.component.data.categoryChild)
          const image = toRaw(modal.component.data.background[0])?.url || ''
          const content = this.editorContent(toRaw(modal.component.data.content))
          const payload = {
            title,
            description,
            categoryId,
            image,
            content
          }
          addNews(payload).then(res => {
            if (res && res.status === 200) {
              notify.success('Tạo bài viết mới thành công')
            }
          })
          .finally(() => this.isLoading = false)
        },
        cancelText: "Hủy",
        onCancel() {
          Modal.destroyAll();
        },
      });
    },
    editNews(data) {
      const props = {
        mode: 'edit',
        data
      }
      const modal = createVNode(AddEditNews, props)
      Modal.confirm({
        title: "Sửa bài viết",
        content: modal,
        icon: null,
        width: "75%",
        class: 'abc',
        okText: "Lưu",
        closable: true,
        onOk:() => {
          const title = toRaw(modal.component.data.title)
          const description = toRaw(modal.component.data.description)
          const categoryId = toRaw(modal.component.data.categoryChild)
          const image = toRaw(modal.component.data.background[0])?.url || ''
          const content = this.editorContent(toRaw(modal.component.data.content))
          const payload = {
            title,
            description,
            categoryId,
            image,
            content
          }
          addNews(payload).then(res => {
            if (res && res.status === 200) {
              notify.success('Tạo bài viết mới thành công')
            }
          })
          .finally(() => this.isLoading = false)
        },
        cancelText: "Hủy",
        onCancel() {
          Modal.destroyAll();
        },
      });
    },
    editorContent(newValue) {
      if (typeof newValue === 'object' && newValue.ops) {
        const converter = new QuillDeltaToHtmlConverter(newValue.ops, {});
        const html = converter.convert();
        return html
      }
    },
  }
};
</script>

<style>
</style>