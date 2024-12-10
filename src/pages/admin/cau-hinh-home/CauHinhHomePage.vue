<template>
  <div class="grid grid-cols-4 gap-6">
    <div class="col-span-2">
      <a-button type="primary" @click="addSetting" class="mb-4">Thêm mới</a-button>
      <a-table :columns="columns" :data-source="listData" :pagination="false" class="mb-2">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'type'">
            <div>
              {{ record.category.label }}
            </div>
          </template>
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
  </div>
</template>

<script>
import AddSetting from '@/components/modal/AddSetting.vue';
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';

export default {
  name: 'CauHinhHomePage',
  data() {
    return {
      listData: [],
      columns: [
        {
          title: 'Loại bài viết',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Số lượng hiển thị',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Thứ tự',
          dataIndex: 'priority',
          key: 'priority',
        },
        {
          title: 'Thao tác',
          dataIndex: 'action',
          key: 'action',
        },
      ],
    }
  },
  methods: {
    addSetting() {
      const props = {
        mode: 'add',
      }
      const modal = createVNode(AddSetting, props)
      Modal.confirm({
        title: "Thêm bài viết hiển thị",
        content: modal,
        icon: null,
        width: "50%",
        class: 'abc',
        okText: "Lưu",
        closable: true,
        onOk: async () => {
          const category = JSON.parse(JSON.stringify(modal.component.data.options)).find(item => item.value == JSON.parse(JSON.stringify(modal.component.data.categoryParent)))
          const categoryChild = JSON.parse(JSON.stringify(modal.component.data.options1)).find(item => item.value == JSON.parse(JSON.stringify(modal.component.data.categoryChild)))
          const news = JSON.parse(JSON.stringify(modal.component.data.listSelected))
          const result = {
            category,
            categoryChild,
            news,
            quantity: JSON.parse(JSON.stringify(modal.component.data.quantity)),
            priority: this.listData.length
          }
          this.listData.push(result)
          Modal.destroyAll();
        },
        cancelText: "Hủy",
        onCancel() {
          Modal.destroyAll();
        },
      });
    },
    viewDetail(data) {
      const props = {
        mode: 'edit',
        data,
      }
      const modal = createVNode(AddSetting, props)
      Modal.confirm({
        title: "Xem/sửa bài viết hiển thị",
        content: modal,
        icon: null,
        width: "50%",
        class: 'abc',
        okText: "Lưu",
        closable: true,
        onOk: async () => {
          const category = JSON.parse(JSON.stringify(modal.component.data.options)).find(item => item.value == JSON.parse(JSON.stringify(modal.component.data.categoryParent)))
          const categoryChild = JSON.parse(JSON.stringify(modal.component.data.options1)).find(item => item.value == JSON.parse(JSON.stringify(modal.component.data.categoryChild)))
          const news = JSON.parse(JSON.stringify(modal.component.data.listSelected))
          const result = {
            category,
            categoryChild,
            news,
            quantity: JSON.parse(JSON.stringify(modal.component.data.quantity)),
            priority: data.priority
          }
          this.listData.splice(data.priority, 1, result)
          Modal.destroyAll();
        },
        cancelText: "Hủy",
        onCancel() {
          Modal.destroyAll();
        },
      });
    }
  }
}
</script>

<style>

</style>