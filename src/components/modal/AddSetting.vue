<template>
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
            class="w-full"
            v-model:value="categoryParent"
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
            :options="options1"
            class="w-full"
            v-model:value="categoryChild"
            @change="changeOption"
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
        <a-pagination v-model:current="page" :total="50" show-less-items />
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
    <div>
      <a-button type="primary" @click="saveData">Lưu</a-button>
    </div>
  </div>
</template>

<script>
import { Select, InputNumber, Input, Button, Table, Pagination, Tooltip } from 'ant-design-vue';
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
    ATooltip: Tooltip
  },
  data() {
    return {
      page: 1,
      categoryParent: null,
      categoryChild: null,
      quantity: 2,
      listSelected: [],
      listIdSelected: [],
      listData: [
        {
          id: '1-1',
          name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
          description: '',
          image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif',
          createAt: '20/12/2024'
        },
        {
          id: '1-2',
          name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
          description: '',
          image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif',
          createAt: '20/12/2024'
        },
        {
          id: '1-3',
          name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
          description: '',
          image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif',
          createAt: '20/12/2024'
        },
        {
          id: '1-4',
          name: 'THI CÔNG NỘI THẤT ACRYLIC AN CƯỜNG MR NAM - LÝ HÒA - QUẢNG BÌNH',
          description: '',
          image: 'thiet-ke-noi-that-chung-cu-lancaster-duong-lang-7.avif',
          createAt: '20/12/2024'
        },
      ],
      options: [
        { value: '1', label: 'Thiết kế nội thất', path: 'thiet-ke-noi-that' },
        { value: '2', label: 'Công trình', path: 'cong-trinh' },
        { value: '3', label: 'Tin tức', path: 'tin-tuc' },
      ],
      options1: [
        { value: '4', label: 'Loại 1', path: 'thiet-ke-noi-that' },
        { value: '5', label: 'Loại 2', path: 'cong-trinh' },
        { value: '6', label: 'Loại 3', path: 'tin-tuc' },
      ],
      columns: [
        {
          title: 'Tiêu đề',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Mô tả',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Ngày tạo',
          dataIndex: 'createAt',
          key: 'createAt',
        },
        {
          title: 'Thao tác',
          dataIndex: 'action',
          key: 'action',
        },
      ],
      resultData: null
    }
  },
  created() {
    if (this.data) {
      const parseData = JSON.parse(JSON.stringify(this.data))
      this.categoryChild = parseData.categoryChild.value
      this.categoryParent = parseData.category.value
      this.listSelected = parseData.news
      this.listIdSelected = parseData.news.map(item => item.id)
      this.quantity = parseData.quantity
    }
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
    changeOption() {
      console.log('this.categoryChild :>> ', this.categoryChild);
    }
  }
}
</script>

<style>

</style>