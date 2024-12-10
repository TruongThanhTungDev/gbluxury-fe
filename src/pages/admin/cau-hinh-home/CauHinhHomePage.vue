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
    <div class="w-full col-span-2">
      <div class="font-bold">
        XEM TRƯỚC 
      </div>
      <div class="w-full">
        <img src="../../../assets/images/header.png" class="w-full" alt="">
        <div v-for="(item, index) in listData" :key="item.priority" class="py-14 px-16" :class="index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'">
          <div>
            <div class="text-center mb-4">
              <div class="text-black font-[600] mb-1 text-xl uppercase">{{ item.category.label }}</div>
              <div class="underline uppercase text-sm">XEM TẤT CẢ</div>
            </div>
            <div class="grid grid-cols-2 gap-10">
              <card-common v-for="el in item.news" :key="el.id" :title="el.name" description="Công trình tuyệt đẹp" :image="el.image" :height="'h-[200px]'" :mode="false" :size-title="'text-base'" :size-description="'text-sm'"></card-common>
            </div>
          </div>
        </div>
        <img src="../../../assets/images/footer.png" class="w-full" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import CardCommon from '@/components/common/CardCommon.vue';
import AddSetting from '@/components/modal/AddSetting.vue';
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';

export default {
  name: 'CauHinhHomePage',
  components: {
    CardCommon
  },
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