<template>
  <a-spin :spinning="isLoading">
    <div class="grid grid-cols-3 gap-6 h-full">
      <div class="border-r pr-6">
        <a-table :columns="columns" :data-source="dataCategories" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <div class="space-x-2">
                <a-button type="primary" ghost @click="viewDetail(record)">
                  <i class="fa-solid fa-eye"></i>
                </a-button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <div class="col-span-2">
        <div v-if="categorySelected">
          <a-button type="primary" class="mb-4" @click="addCategoryChild">Thêm loại bài viết con</a-button>
          <a-table :columns="columnChildCategory" :data-source="dataChildCategory" @rowClick="onSelectChild" row-key="id">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <div class="space-x-2">
                  <a-button type="primary" ghost @click="viewDetailChild(record)">
                    <i class="fa-solid fa-eye"></i>
                  </a-button>
                  <a-button type="primary" @click="editDetailChild(record)">
                    <i class="fa-solid fa-pen"></i>
                  </a-button>
                  <a-button type="primary" danger @click="deleteCategory(record.id)">
                    <i class="fa-solid fa-trash"></i>
                  </a-button>
                </div>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script>
import { addNewCategoryChildren, deleteCategoryChildren, editCategoryChildren, getListCategoryParent } from "@/api/categories";
import AddEditCategoryChild from "@/components/modal/AddEditCategoryChild.vue";
import { convertToSlug } from "@/service/function";
import notify from "@/service/notify";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
export default {
  name: 'CategoryNews',
  components: {
  },
  data() {
    return {
      isLoading: false,
      categoryParent: null,
      categorySelected: null,
      columns: [
        {
          title: 'Tên loại bài viết',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Đường dẫn',
          dataIndex: 'path',
          key: 'path',
        },
        {
          title: 'Thao tác',
          dataIndex: 'action',
          key: 'action',
        },
      ],
      columnChildCategory: [
        {
          title: 'Tên loại bài viết con',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Đường dẫn',
          dataIndex: 'path',
          key: 'path',
        },
        {
          title: 'Thao tác',
          dataIndex: 'action',
          key: 'action',
        },
      ],
      dataCategories: [
      ],
      dataChildCategory: [
      ]
    }
  },
  created() {
    this.getDataCategories()
  },
  methods: {
    getDataCategories(isGetData = false) {
      this.isLoading = true 
      getListCategoryParent().then(res => {
        if (res && res.length) {
          this.isLoading = false
          this.dataCategories = res.map(item => ({
            ...item,
            subCategories: item.subCategories.map(el => ({
              ...el,
              parentCategoryId: item.id
            }))
          }))
          if (isGetData) {
            const index = this.dataCategories.findIndex(item => item.id === this.categoryParent)
            if (index !== -1) {
              this.dataChildCategory = this.dataCategories[index].subCategories
              this.categoryParent = this.dataCategories[index].id
            } else {
              this.categorySelected = []
              this.categoryParent = null
            }
          }
        } else {
          this.isLoading = false
          this.dataCategories = []
        }
      })
        .catch(() => {
        this.isLoading = false
      })
        .finally(() => {
        this.isLoading = false
      })
    },
    viewDetail(data) {
      this.categorySelected = data
      this.dataChildCategory = data.subCategories
      this.categoryParent = data.id
    },
    addCategoryChild() {
      const props = {
        parentCategoryId: this.categoryParent
      }
      const modal = createVNode(AddEditCategoryChild, props)
      Modal.confirm({
        title: "Thêm loại bài viết con",
        content: modal,
        icon: null,
        width: '30%',
        okText: 'Lưu',
        closable: true,
        onOk: async () => {
          const title = JSON.parse(JSON.stringify(modal.component.data.categoryChild))
          const categoryParentPath = JSON.parse(JSON.stringify(modal.component.data.categoryParentPath))
          const path = categoryParentPath + '/' + convertToSlug(title)
          const code = convertToSlug(title)
          const name = title
          const payload = {
            title,
            path,
            code,
            name,
            parentCategoryId: this.categoryParent
          }
          if (!title) {
            notify.warning('Vui lòng nhập tiêu đề loại bài viết con')
            return
          }
          if (!categoryParentPath) {
            notify.warning('Vui lòng chọn loại bài viết')
            return
          }
          this.isLoading = true
          addNewCategoryChildren(payload).then(res => {
            if (res && res.status == 201) {
              this.isLoading = false
              notify.success('Thêm mới loại bài viết con thành công')
              this.getDataCategories(true)
            } else {
              notify.error('Thêm mới thất bại')
            }
          })
            .finally(() => {
            this.isLoading = false
          })
        },
        cancelText: 'Hủy',
        onCancel() {
          Modal.destroyAll();
        },
      });
    },
    viewDetailChild(data) {
      const props = {
        mode: 'view',
        data
      }
      const modal = createVNode(AddEditCategoryChild, props)
      Modal.confirm({
        title: "Xem chi tiết",
        content: modal,
        icon: null,
        width: '30%',
        closable: true,
        footer: null
      });
    },
    editDetailChild(data) {
      const props = {
        mode: 'edit',
        data,
        parentCategoryId: this.categoryParent
      }
      const modal = createVNode(AddEditCategoryChild, props)
      Modal.confirm({
        title: "Sửa loại bài viết con",
        content: modal,
        icon: null,
        width: '30%',
        okText: 'Lưu',
        closable: true,
        okButtonProps: {
          disabled: props.mode === 'view',
        },
        onOk: async() => {
          const title = JSON.parse(JSON.stringify(modal.component.data.categoryChild))
          const categoryParentPath = JSON.parse(JSON.stringify(modal.component.data.categoryParentPath))
          const path = categoryParentPath + '/' + convertToSlug(title)
          const code = convertToSlug(title)
          const name = title
          const categoryChildId = JSON.parse(JSON.stringify(modal.component.data.categoryChildId))
          const payload = {
            title,
            path,
            code,
            name,
            parentCategoryId: this.categoryParent
          }
          if (!title) {
            notify.warning('Vui lòng nhập tiêu đề loại bài viết con')
            return
          }
          if (!categoryParentPath) {
            notify.warning('Vui lòng chọn loại bài viết')
            return
          }
          this.isLoading = true
          editCategoryChildren(categoryChildId,payload).then(res => {
            if (res && res.status == 201) {
              this.isLoading = false
              notify.success('Cập nhật loại bài viết con thành công')
              this.getDataCategories(true)
            } else {
              notify.error('Cập nhật thất bại')
            }
          })
            .finally(() => {
            this.isLoading = false
          })
        },
        cancelText: 'Hủy',
        onCancel() {
          Modal.destroyAll();
        },
      });
    },
    onSelectChild(event) {
      console.log('event :>> ', event);
    },
    deleteCategory(id) {
      Modal.confirm({
        title: "Xác nhận xóa?",
        content: 'Bạn có chắc chắc muốn xóa bản ghi này?',
        icon: null,
        okText: 'Lưu',
        closable: true,
        onOk: async () => {
          this.isLoading = true
          deleteCategoryChildren(id).then(res => {
            if (res.data.code === 200) {
              notify.success('Xóa bản ghi thành công')
              this.getDataCategories(true)
            }
          })
            .finally(() => {
            this.isLoading = false
          })
        },
        onCancel() {
          Modal.destroyAll()
        }
      })
    }
  }
}
</script>

<style>

</style>