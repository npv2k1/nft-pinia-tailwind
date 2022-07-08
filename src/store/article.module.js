import { defineStore } from "pinia";
import { homeStore } from "./home.module";
import {
  ArticlesService,
  CommentsService,
  FavoriteService
} from "@/common/api.service";
import {
  FETCH_ARTICLE,
  FETCH_COMMENTS,
  COMMENT_CREATE,
  COMMENT_DESTROY,
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  ARTICLE_PUBLISH,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_DELETE,
  ARTICLE_RESET_STATE,
  RESET_STATE,
  SET_ARTICLE,
  SET_COMMENTS,
  TAG_ADD,
  TAG_REMOVE,
  UPDATE_ARTICLE_IN_LIST
} from "./actions.type";

export const state = () => {
  return {
    article: {
      author: {},
      title: "",
      description: "",
      body: "",
      tagList: []
    },
    comments: []
  };
};

export const actions = {
  async [FETCH_ARTICLE](articleSlug, prevArticle) {
    // avoid extronuous network call if article exists
    if (prevArticle !== undefined) {
      return this[SET_ARTICLE](prevArticle);
    }
    const { data } = await ArticlesService.get(articleSlug);
    this[SET_ARTICLE](data.article);
    return data;
  },
  async [FETCH_COMMENTS](articleSlug) {
    const { data } = await CommentsService.get(articleSlug);
    this[SET_COMMENTS](data.comments);
    return data.comments;
  },
  async [COMMENT_CREATE](payload) {
    await CommentsService.post(payload.slug, payload.comment);
    this[FETCH_COMMENTS](payload.slug);
  },
  async [COMMENT_DESTROY](payload) {
    await CommentsService.destroy(payload.slug, payload.commentId);
    this[FETCH_COMMENTS](payload.slug);
  },
  async [FAVORITE_ADD](slug) {
    const { data } = await FavoriteService.add(slug);
    const home = homeStore();
    home[UPDATE_ARTICLE_IN_LIST](data.article);
    this[SET_ARTICLE](data.article);
  },
  async [FAVORITE_REMOVE](slug) {
    const { data } = await FavoriteService.remove(slug);
    // Update list as well. This allows us to favorite an article in the Home view.
    const home = homeStore();
    home[UPDATE_ARTICLE_IN_LIST](data.article);
    this[SET_ARTICLE](data.article);
  },
  [ARTICLE_PUBLISH]() {
    return ArticlesService.create(this.article);
  },
  [ARTICLE_DELETE](slug) {
    return ArticlesService.destroy(slug);
  },
  [ARTICLE_EDIT]() {
    return ArticlesService.update(this.article.slug, this.article);
  },
  [ARTICLE_EDIT_ADD_TAG](tag) {
    this[TAG_ADD](tag);
  },
  [ARTICLE_EDIT_REMOVE_TAG](tag) {
    this[TAG_REMOVE](tag);
  },
  [ARTICLE_RESET_STATE]() {
    this[RESET_STATE]();
  },
  [SET_ARTICLE](article) {
    this.article = article;
  },
  [SET_COMMENTS](comments) {
    this.comments = comments;
  },
  [TAG_ADD](tag) {
    this.article.tagList = this.article.tagList.concat([tag]);
  },
  [TAG_REMOVE](tag) {
    this.article.tagList = this.article.tagList.filter(t => t !== tag);
  },
  [RESET_STATE]() {
    this.$reset();
  }
};

const getters = {};

export const articleStore = defineStore("article", {
  state,
  actions,
  getters
});
