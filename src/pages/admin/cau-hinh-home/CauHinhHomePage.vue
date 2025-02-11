<template>
  <a-spin :spinning="isLoading">
    <div class="grid grid-cols-4 gap-6">
      <div class="col-span-2">
        <a-button type="primary" @click="addSetting" class="mb-4">Thêm mới</a-button>
        <a-table :columns="columns" :data-source="listData" :pagination="false" class="mb-2">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'title'">
              <div>
                {{ record.categoryRes.title }}
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
        <div class="w-full" v-if="listData.length">
          <img src="../../../assets/images/header.png" class="w-full" alt="">
          <div v-for="(item, index) in listData" :key="item.priority" class="py-14 px-16" :class="index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'">
            <div>
              <div class="text-center mb-4">
                <div class="text-black font-[600] mb-1 text-xl uppercase">{{ item.categoryRes.title }}</div>
                <div class="underline uppercase text-sm">XEM TẤT CẢ</div>
              </div>
              <div class="grid grid-cols-2 gap-10">
                <card-common v-for="el in item.newsRes" :key="el.id" :title="el.title" :description="el.description" :image="el.image" :height="'h-[200px]'" :mode="false" :size-title="'text-base'" :size-description="'text-sm'" :isCustom="true"></card-common>
              </div>
            </div>
          </div>
          <img src="../../../assets/images/footer.png" class="w-full" alt="">
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script>
import { addNewConfig, editConfig, getConfig } from '@/api/menu-config';
import CardCommon from '@/components/common/CardCommon.vue';
import AddSetting from '@/components/modal/AddSetting.vue';
import notify from '@/service/notify';
import { Modal, Spin } from 'ant-design-vue';
import { createVNode } from 'vue';

export default {
  name: 'CauHinhHomePage',
  components: {
    CardCommon,
    ASpin: Spin
  },
  data() {
    return {
      listData: [],
      columns: [
        {
          title: 'Loại bài viết',
          dataIndex: 'title',
          key: 'title',
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
      isLoading: false,
      isDisabled: false
    }
  },
  created() {
    this.getDataConfig()
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
        okButtonProps: {
          disabled: this.isDisabled
        },
        onOk: async () => {
          return new Promise((resolve, reject) => {
            if (!JSON.parse(JSON.stringify(modal.component.data.categoryParent))) {
              this.isDisabled = false
              notify.warning('Vui lòng chọn Loại bài viết')
              reject('')
              return
            }
            this.disabled = true
            const category = JSON.parse(JSON.stringify(modal.component.data.options)).find(item => item.id == JSON.parse(JSON.stringify(modal.component.data.categoryParent)))
            const news = JSON.parse(JSON.stringify(modal.component.data.listSelected))
            const payload = {
              categoryId: category.id,
              newsId: news.map(item => item.id).join(","),
              quantity: JSON.parse(JSON.stringify(modal.component.data.quantity))
            }
            this.isLoading = true
            addNewConfig(payload).then(res => {
              if (res.status === 200) {
                this.isLoading = false
                notify.success('Cấu hình thành công')
                resolve()
                this.getDataConfig()
              }
            })
          })
        },
        cancelText: "Hủy",
        onCancel() {
          Modal.destroyAll();
        },
      });
    },
    getDataConfig() {
      this.isLoading = true
      getConfig().then(res => {
        if (res && res.length) {
          this.listData = res.map((item, index) => ({
            ...item,
            priority: index + 1
          }))
        }
      })
      .finally(() => this.isLoading = false)
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
          const category = JSON.parse(JSON.stringify(modal.component.data.options)).find(item => item.id == JSON.parse(JSON.stringify(modal.component.data.categoryParent)))
          const news = JSON.parse(JSON.stringify(modal.component.data.listSelected))
          const payload = {
            categoryId: category.id,
            newsId: news.map(item => item.id).join(","),
            quantity: JSON.parse(JSON.stringify(modal.component.data.quantity)),
            id: data.id
          }
          this.isLoading = true
          editConfig(payload).then(res => {
            if (res.status === 200) {
              notify.success('Cấu hình thành công')
              this.getDataConfig()
              Modal.destroyAll();
            }
          }).finally(() => this.isLoading = false)
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