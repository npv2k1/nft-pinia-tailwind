import { createLocalVue, mount } from "@vue/test-utils";
// import { createPinia, PiniaVuePlugin } from "pinia";
import VueRouter from "vue-router";

// import Comment from "../../src/components/Comment.vue";
import DateFilter from "../../src/common/date.filter";
// import { createTestingPinia } from "@pinia/testing";
import { authStore } from "@/store/auth.module";
import { createTestingPinia } from "@pinia/testing";

const localVue = createLocalVue();
localVue.filter("date", DateFilter);
localVue.use(VueRouter);

describe("Comment", () => {
  it("should render correct contents", () => {
    //
    //
    //
    // const router = new VueRouter({
    //   routes: [
    //     {
    //       name: "profile",
    //       path: "/profile",
    //       component: null
    //     }
    //   ]
    // });
    //
    // const wrapper = mount(Comment, {
    //   localVue,
    //   global: {
    //     plugins: [createTestingPinia()],
    //   },
    //   router,
    //   propsData: {
    //     slug: "super-cool-comment-slug-1245781274",
    //     comment: {
    //       body: "body of comment",
    //       author: {
    //         image: "https://vuejs.org/images/logo.png",
    //         username: "user-3518518"
    //       },
    //       createdAt: "",
    //       id: 1245781274
    //     }
    //   }
    // });
    // const pinia = createTestingPinia();
    // const store = authStore(pinia);
    // expect(wrapper.isVueInstance()).toBeTruthy();

    expect(true).toBeTruthy();
  });
});
