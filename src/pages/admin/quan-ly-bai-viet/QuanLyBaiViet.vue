<template>
  <a-spin :spinning="isLoading">
    <div class="container-main flex flex-col">
      <div>
        <a-button type="primary" class="mb-4" @click="addNew"
          >Thêm bài viết mới</a-button
        >
      </div>
      <div class="flex flex-col flex-1 max-h-screen overflow-auto mb-4">
        <a-table :columns="columns" :data-source="listDataNews" :pagination="false" class="mb-6">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <div class="space-x-2">
                <a-button type="primary" @click="editNews(record)">
                  <i class="fa-solid fa-pen"></i>
                </a-button>
                <a-button type="primary" danger @click="deleteNews(record)">
                  <i class="fa-solid fa-trash"></i>
                </a-button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <div>
        <a-pagination v-model:current="page" :total="totalItems" show-less-items @change="getData" :defaultPageSize="size"/>
      </div>
    </div>
  </a-spin>
</template>

<script>
import { addNews, deleteNew, editNews, getNewsAdmin } from "@/api/news";
import AddEditNews from "@/components/modal/AddEditNews.vue";
import notify from "@/service/notify";
import { Modal, Spin } from "ant-design-vue";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { createVNode, toRaw } from "vue";
export default {
  name: "QuanLyBaiVietPage",
  components: {
    "ASpin": Spin
  },
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
      confirmLoading: false,
      page: 1,
      size: 15,
      totalItems: 0,
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const payload = {
        title: '',
        categoryId: '',
        page: this.page - 1,
        size: this.size
      }
      this.isLoading = true
      getNewsAdmin(payload).then(res => {
        if (res) {
          this.isLoading = false
          if (res.content.length) {
            this.listDataNews = res.content.map(item => ({
              ...item,
              categoryRes: item.categoryRes ? item.categoryRes.title : '',
              parentCategory: item.categoryRes ? item.categoryRes.parentCategory ? item.categoryRes.parentCategory.title : item.categoryRes.title : item.categoryRes.title
            }))
            this.totalItems = res.totalElements
          }
        }
      })
        .finally(() => {
        this.isLoading = false
      })
    }, 
    addNew() {
      const modal = createVNode(AddEditNews)
      let loading = false;
      Modal.confirm({
        title: "Thêm bài viết mới",
        content: modal,
        icon: null,
        width: "75%",
        class: 'abc',
        okText: "Lưu",
        closable: true,
        confirmLoading: this.confirmLoading,
        onOk:() => {
          return new Promise((resolve) => {
            if (loading) return
            loading = true
            this.confirmLoading = true
            const title = toRaw(modal.component.data.title)
            const description = toRaw(modal.component.data.description)
            const categoryId = toRaw(modal.component.data.categoryChild)
            const categoryParent = toRaw(modal.component.data.categoryParent)
            const image = toRaw(modal.component.data.background[0])?.url || ''
            const content = this.editorContent(toRaw(modal.component.data.content))
            const payload = {
              title,
              description,
              categoryId: categoryId ? categoryId : categoryParent,
              image,
              content,
              refLinkReq: [{
                link: "",
                no: ""
              }]
            }
            addNews(payload).then(res => {
              if (res && res.status === 200) {
                notify.success('Tạo bài viết mới thành công')
                this.getData()
                resolve('Tạo bài viết mới thành công')
                this.confirmLoading = false
              }
            })
            .finally(() => this.isLoading = false)
          })
          .catch(() => {})
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
          return new Promise((resolve) => {
            this.confirmLoading = true
            const title = toRaw(modal.component.data.title)
            const description = toRaw(modal.component.data.description)
            const categoryId = toRaw(modal.component.data.categoryChild)
            const categoryParent = toRaw(modal.component.data.categoryParent)
            const image = toRaw(modal.component.data.background[0])?.url || ''
            const content = this.editorContent(toRaw(modal.component.data.content))
            const payload = {
              title,
              description,
              categoryId: categoryId ? categoryId : categoryParent,
              image,
              content,
              refLinkReq: [{
                link: "",
                no: ""
              }]
            }
            editNews(payload, data.id).then(res => {
              if (res && res.status === 200) {
                notify.success('Sửa bài viết thành công')
                this.getData()
                resolve('Sửa bài viết mới thành công')
                this.confirmLoading = false
              }
            })
            .finally(() => this.isLoading = false)
          })
          .catch(() => {})
        },
        cancelText: "Hủy",
        onCancel() {
          Modal.destroyAll();
        },
      });
    },
    deleteNews(data) {
      Modal.confirm({
        title: "Xác nhận",
        content: 'Bạn có muốn xóa bài viết này?',
        icon: null,
        okText: "Lưu",
        onOk: () => {
          deleteNew(data.id).then(res => {
            if (res.data.code === 200) {
              notify.success('Xóa bài viết thành công')
              this.getData()
            }
          })
        },
        cancelText: "Hủy",
        onCancel() {
          Modal.destroyAll();
        },
      })
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
.container-main {
  height: calc(100vh - 32px - 64px);
  overflow-y: hidden
}
</style>