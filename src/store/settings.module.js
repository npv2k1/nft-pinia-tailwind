import { defineStore } from "pinia";
import { ArticlesService, CommentsService } from "@/common/api.service";
import {
  FETCH_ARTICLE,
  FETCH_COMMENTS,
  SET_ARTICLE,
  SET_COMMENTS
} from "./actions.type";

export const state = () => {
  return {
    article: {},
    comments: []
  };
};

export const actions = {
  [FETCH_ARTICLE](articleSlug) {
    return ArticlesService.get(articleSlug)
      .then(({ data }) => {
        this[SET_ARTICLE](data.article);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_COMMENTS](articleSlug) {
    return CommentsService.get(articleSlug)
      .then(({ data }) => {
        this[SET_COMMENTS](data.comments);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [SET_ARTICLE](article) {
    this.article = article;
  },
  [SET_COMMENTS](comments) {
    this.comments = comments;
  }
};

export const settingStore = defineStore("setting", {
  state,
  actions
});
