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
</template>

<script>
import AddEditNews from "@/components/modal/AddEditNews.vue";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
export default {
  name: "QuanLyBaiVietPage",
  data() {
    return {
      columns: [
        {
          title: "Tên bài viết",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Ngày tạo",
          dataIndex: "createAt",
          key: "createAt",
        },
        {
          title: "Loại bài viết con",
          dataIndex: "child",
          key: "child",
        },
        {
          title: "Loại bài viết cha",
          dataIndex: "parent",
          key: "parent",
        },
        {
          title: "Thao tác",
          dataIndex: "action",
          key: "action",
        },
      ],
      listDataNews: [
        {
          key: "1",
          name: "Giới thiệu",
          createAt: "",
          child: "Giới thiệu",
          parent: "Giới thiệu",
        },
        {
          key: "2",
          name: "Thiết kế nội thất",
          createAt: "",
          child: "Giới thiệu",
          parent: "Giới thiệu",
        },
        {
          key: "3",
          name: "Công trình",
          createAt: "",
          child: "Giới thiệu",
          parent: "Giới thiệu",
        },
        {
          key: "4",
          name: "Tin tức",
          createAt: "",
          child: "Giới thiệu",
          parent: "Giới thiệu",
        },
      ],
    };
  },
  methods: {
    addNew() {
      Modal.confirm({
        title: "Thêm bài viết mới",
        content: createVNode(AddEditNews),
        icon: null,
        width: "75%",
        okText: "Lưu",
        closable: true,
        onOk() {
          console.log("Modal đóng lại.");
        },
        cancelText: "Hủy",
        onCancel() {
          Modal.destroyAll();
        },
      });
    },
  }
};
</script>

<style>
</style>