<template>
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
                <a-button type="primary" danger>
                  <i class="fa-solid fa-trash"></i>
                </a-button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import AddEditCategoryChild from "@/components/modal/AddEditCategoryChild.vue";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
export default {
  name: 'CategoryNews',
  components: {
  },
  data() {
    return {
      categorySelected: null,
      columns: [
        {
          title: 'Tên loại bài viết',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Đường dẫn',
          dataIndex: 'url',
          key: 'url',
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
          dataIndex: 'url',
          key: 'url',
        },
        {
          title: 'Thao tác',
          dataIndex: 'action',
          key: 'action',
        },
      ],
      dataCategories: [
        {
          key: '1',
          name: 'Giới thiệu',
          url: '/gioi-thieu',
        },
        {
          key: '2',
          name: 'Thiết kế nội thất',
          url: '/thiet-ke-noi-that',
        },
        {
          key: '3',
          name: 'Công trình',
          url: '/cong-trinh',
        },
        {
          key: '4',
          name: 'Tin tức',
          url: '/tin-tuc',
        },
      ],
      dataChildCategory: [
        {
          key: '1',
          name: 'Giới thiệu',
          url: '/gioi-thieu',
        },
        {
          key: '2',
          name: 'Thiết kế nội thất',
          url: '/thiet-ke-noi-that',
        },
        {
          key: '3',
          name: 'Công trình',
          url: '/cong-trinh',
        },
        {
          key: '4',
          name: 'Tin tức',
          url: '/tin-tuc',
        },
      ]
    }
  },
  methods: {
    viewDetail(data) {
      this.categorySelected = data
    },
    addCategoryChild() {
      Modal.confirm({
        title: "Thêm loại bài viết con",
        content: createVNode(AddEditCategoryChild),
        icon: null,
        width: '30%',
        okText: 'Lưu',
        closable: true,
        onOk() {
          console.log("Modal đóng lại.");
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
      Modal.confirm({
        title: "Xem chi tiết",
        content: createVNode(AddEditCategoryChild, props),
        icon: null,
        width: '30%',
        closable: true,
        footer: null
      });
    },
    editDetailChild(data) {
      const props = {
        mode: 'edit',
        data
      }
      Modal.confirm({
        title: "Sửa loại bài viết con",
        content: createVNode(AddEditCategoryChild, props),
        icon: null,
        width: '30%',
        okText: 'Lưu',
        closable: true,
        okButtonProps: {
          disabled: props.mode === 'view',
        },
        onOk() {
          console.log("Modal đóng lại.");
        },
        cancelText: 'Hủy',
        onCancel() {
          Modal.destroyAll();
        },
      });
    },
    onSelectChild(event) {
      console.log('event :>> ', event);
    }
  }
}
</script>

<style>

</style>