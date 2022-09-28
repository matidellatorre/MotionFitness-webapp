import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#313131",
        secondary: "#FAA400",
        accent: "#00AFFA",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        grey1: "#E9E7E7",
        grey2: "#D9D9D9",
        grey3: "#9A9A9A",
      },
    },
  },
});
