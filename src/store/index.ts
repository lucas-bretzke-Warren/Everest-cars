import Vue from 'vue'
import Vuex from 'vuex'
import carService from '@/services/carService'
import { IState } from '@/types/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: <IState>{
    dataCars: [],
    car: {},
    checkAction: false,
    isModalForm: false,
    isLoading: false,
    msgRequiredError: false,
    carId: "",
  },
  getters: {
  },
  mutations: {
    set_loading_state(state) {
      state.isLoading = !state.isLoading
    },
    set_error_state(state, Boolean) {
      state.msgRequiredError = Boolean
    },
    set_CheckAction_state(state) {
      state.checkAction = !state.checkAction
    },
    set_ModalForm_state(state) {
      state.isModalForm = !state.isModalForm
    },
    get_cars(state, payload) {
      state.dataCars = payload
    },
    //Este method não está funcionando ainda, (algum erro do vuex)
    checkIfYouFellOnGet(state, context,) {
      if (state.dataCars.length == 0) {
        context.dispatch("set_error_state", true);
      } else {
        context.dispatch("set_error_state", false);
      }
    }
  },
  actions: {
    async get_Cars(context) {
      try {
        context.commit("set_loading_state");
        const response = await carService.get();
        context.commit("get_cars", response)
      } catch (erro) {
        console.log(erro);
        // context.commit("checkIfYouFellOnGet");
      } finally {
        context.commit("set_error_state", false);
        context.commit("set_loading_state");
      }
    },
    async delete_Car(context, payload) {
      try {
        context.commit("set_loading_state");
        await carService.delete(payload);
      } catch (erro) {
        console.log(erro);
        alert("Não foi possível deletar este item");
      } finally {
        context.commit("set_loading_state");
        context.dispatch("get_Cars");
        context.commit("set_CheckAction_state");
      }
    }
  },
  modules: {
  }
})
