<template>
  <a-spin :spinning="isLoading">
    <div>
      <div class="grid grid-cols-3 gap-6 mb-4">
        <div>
          <div>
            Chọn loại bài viết
          </div>
          <div>
            <a-select
              show-search
              placeholder="Chọn loại bài viết"
              :options="options"
              :field-names="{ label: 'title', value: 'id'}"
              class="w-full"
              v-model:value="categoryParent"
              @change="getDataByParent"
            ></a-select>
          </div>
        </div>
        <div>
          <div>
            Chọn loại bài viết con
          </div>
          <div>
            <a-select
              show-search
              placeholder="Chọn loại bài viết"
              :options="categoryChildrenList"
              :field-names="{ label: 'title', value: 'id'}"
              v-model:value="categoryChild"
              @change="getListData"
              class="w-full"
            ></a-select>
          </div>
        </div>
        <div>
          <div>
            Số lượng hiển thị
          </div>
          <div>
            <a-input-number id="inputNumber" class="w-full" v-model:value="quantity" :min="2"/>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-6 mb-2">
        <div class="flex items-center gap-2">
          <a-input placeholder="Tìm kiếm theo tiêu đề"/>
          <a-tooltip title="Tìm kiếm">
            <a-button type="primary">
              <i class="fa-solid fa-search"></i>
            </a-button>
          </a-tooltip>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-bold mb-2">
          Danh sách bài viết
        </div>
        <a-table :columns="columns" :data-source="listData" :pagination="false" class="mb-2">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <div class="space-x-2" v-if="!listIdSelected.includes(record.id)" >
                <a-button type="primary" ghost @click="add(record)" :disabled="listSelected.length === +quantity">
                  <i class="fa-solid fa-plus"></i>
                </a-button>
              </div>
            </template>
          </template>
        </a-table>
        <div class="text-end">
          <div>
            <a-pagination v-model:current="page" :total="totalItems" show-less-items @change="getData" :defaultPageSize="size"/>
          </div>
        </div>
      </div>
      <div>
        <div class="font-bold mb-2">
          Bài viết đã chọn
        </div>
        <a-table :columns="columns" :data-source="listSelected" :pagination="false" class="mb-2">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <div class="space-x-2">
                <a-button type="primary" ghost @click="remove(record)">
                  <i class="fa-solid fa-minus"></i>
                </a-button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-spin>
</template>

<script>
import { getChildrenById, getListCategoryParent } from '@/api/categories';
import { getNewsAdmin } from '@/api/news';
import { Select, InputNumber, Input, Button, Table, Pagination, Tooltip, Spin } from 'ant-design-vue';
export default {
  name: 'AddSetting',
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    data: {
      type: Object,
      default: () => null
    }
  },
  components: {
    ASelect: Select,
    AInputNumber: InputNumber,
    AInput: Input,
    AButton: Button,
    ATable: Table,
    APagination: Pagination,
    ATooltip: Tooltip,
    ASpin: Spin
  },
  data() {
    return {
      categoryParent: null,
      categoryChild: null,
      quantity: 2,
      listSelected: [],
      listIdSelected: [],
      isLoading: false,
      listData: [
      ],
      options: [
      ],
      categoryChildrenList: [
      ],
      columns: [
        {
          title: 'Tiêu đề',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Mô tả',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Thao tác',
          dataIndex: 'action',
          key: 'action',
        },
      ],
      resultData: null,
      totalItems: 0,
      page: 1,
      size: 5,
      isCategoryParent: false,
    }
  },
  created() {
    this.getDataCategories()
  },
  methods: {
    add(data) {
      const index = this.listSelected.findIndex(item => item.id === data.id)
      if (index !== -1) return
      this.listSelected.push(data)
      this.listIdSelected.push(data.id)
    },
    remove(data) {
      const index = this.listSelected.findIndex(item => item.id === data.id)
      if (index !== -1) {
        this.listIdSelected.splice(index, 1)
        this.listSelected.splice(index,1)
      }
    },
    saveData() {
      const category = this.options.find(item => item.value == this.categoryParent)
      const categoryChild = this.options1.find(item => item.value == this.categoryParent)
      const result = {
        category,
        categoryChild
      }
      return result
    },
    getDataByParent() {
      this.page = 1
      this.isCategoryParent = true
      this.getCategoriesChildren()
      this.getData(this.categoryParent)
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
            const parseData = JSON.parse(JSON.stringify(this.data))
            this.categoryParent = parseData.categoryRes.id
            this.listSelected = parseData.newsRes
            this.listIdSelected = parseData.newsRes.map(item => item.id)
            this.quantity = parseData.quantity
            this.getDataByParent()
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
    getListData() {
      this.page = 1
      this.isCategoryParent = false
      this.getData(this.categoryChild)
    },
    getData(categoryId) {
      const payload = {
        title: '',
        isCategoryParent: this.isCategoryParent,
        categoryId: categoryId,
        page: this.page - 1,
        size: this.size
      }
      this.isLoading = true
      getNewsAdmin(payload).then(res => {
        if (res) {
          this.isLoading = false
          if (res.content.length) {
            this.listData = res.content.map(item => ({
              ...item,
              image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif',
              categoryRes: item.categoryRes ? item.categoryRes.title : '',
              parentCategory: item.categoryRes ? item.categoryRes.parentCategory.title : ''
            }))
            this.totalItems = res.totalElements
          }
        }
      })
        .finally(() => {
        this.isLoading = false
      })
    },
  }
}
</script>

<style>

</style>