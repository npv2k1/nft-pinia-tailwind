import { defineStore } from "pinia";
import { TagsService, ArticlesService } from "@/common/api.service";
import {
  FETCH_ARTICLES,
  FETCH_TAGS,
  FETCH_START,
  FETCH_END,
  SET_TAGS,
  UPDATE_ARTICLE_IN_LIST
} from "./actions.type";

const state = () => {
  return {
    tags: [],
    articles: [],
    isLoading: true,
    articlesCount: 0
  };
};

const getters = {};

const actions = {
  [FETCH_ARTICLES](params) {
    this[FETCH_START]();
    return ArticlesService.query(params.type, params.filters)
      .then(({ data }) => {
        this[FETCH_END](data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_TAGS]() {
    return TagsService.get()
      .then(({ data }) => {
        this[SET_TAGS](data.tags);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  /* eslint no-param-reassign: ["error", { "props": false }] */
  [FETCH_START]() {
    this.isLoading = true;
  },
  [FETCH_END]({ articles, articlesCount }) {
    this.articles = articles;
    this.articlesCount = articlesCount;
    this.isLoading = false;
  },
  [SET_TAGS](tags) {
    this.tags = tags;
  },
  [UPDATE_ARTICLE_IN_LIST](data) {
    this.articles = this.articles.map(article => {
      if (article.slug !== data.slug) {
        return article;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      article.favorited = data.favorited;
      article.favoritesCount = data.favoritesCount;
      return article;
    });
  }
};

export const homeStore = defineStore("home", {
  state,
  actions,
  getters
});
