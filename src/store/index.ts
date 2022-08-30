import Vue from 'vue'
import Vuex from 'vuex'
import carService from '@/services/carService'
import { ICar, IState } from '@/types/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: <IState>{
    dataCars: [],
    car: {
      nome: "",
      marca: "",
      cor: "",
      ano: 0,
      portas: 0,
      cv: null,
      alarme: "",
      cambio: "",
      tetoSolar: "",
      computadorDeBordo: "",
      id: "",
    },
    checkAction: false,
    isModalForm: false,
    isCreateAction: null,
    isLoading: false,
    msgRequiredError: false,
    carId: "",
  },
  //dados computados
  getters: {
    modal_form_title(state) {
      return state.isCreateAction ? "Cadastrar novo carro" : "Atualizar carro";
    }
  },
  //methods
  mutations: {
    is_create_action(state) {
      state.isCreateAction = true
    },
    set_loading_state(state) {
      state.isLoading = !state.isLoading
    },
    set_error_state(state, Boolean) {
      state.msgRequiredError = Boolean
    },
    set_CheckAction_state(state) {
      state.checkAction = !state.checkAction
    },
    set_modalForm_state(state) {
      state.isModalForm = !state.isModalForm
    },
    set_dataCars(state, payload) {
      state.dataCars = payload
    },
  },
  //async
  actions: {
    async get_cars(context) {
      try {
        context.commit("set_loading_state");
        const response = await carService.get();
        context.commit("set_dataCars", response)
      } catch (erro) {
        console.log(erro);
      } finally {
        context.commit("set_error_state", false);
        context.commit("set_loading_state");
      }
    },

    async create_new_car(context, car: ICar) {
      try {
        context.commit("set_loading_state");
        await carService.post(car);
      } catch (err) {
        console.log(err);
      } finally {
        context.commit('set_modalForm_state');
        context.dispatch("get_cars");
        context.commit("set_loading_state");
      }
    },
    async update_car(context, car: ICar) {
      try {
        context.commit("set_loading_state");
        const carData = car;
        await carService.put(carData);
      } catch (erro) {
        alert("Erro, tente novamente");
      } finally {
        context.commit('set_modalForm_state');
        context.dispatch("get_cars");
        context.commit("set_loading_state");
      }
    },
    async delete_car(context, payload) {
      try {
        context.commit("set_loading_state");
        await carService.delete(payload);
      } catch (erro) {
        console.log(erro);
        alert("Não foi possível deletar este item");
      } finally {
        context.commit("set_loading_state");
        context.dispatch("get_cars");
        context.commit("set_CheckAction_state");
      }
    }
  },

  modules: {
  }
})

import axios from 'axios'

// import Vue from 'vue'
// import Vuex from 'vuex'
// import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules'
// import carService from '@/services/carService'
// import { ICar, IState } from '@/types/index'

// // Vue.use(Vuex)

// @Module
// class UserModule extends VuexModule {
//   dataCars = [];
//   car: ICar = {
//     nome: "",
//     marca: "",
//     cor: "",
//     ano: 0,
//     portas: 0,
//     cv: null,
//     alarme: "",
//     cambio: "",
//     tetoSolar: "",
//     computadorDeBordo: "",
//     id: "",
//   };
//   checkAction = false;
//   isModalForm = false;
//   isCreateAction = false;
//   isLoading = false;
//   msgRequiredError = false;
//   carId = "";


//   //dados computados
//   // modal_form_title() {
//   //   return this.isCreateAction ? "Cadastrar novo carro" : "Atualizar carro";
//   // }




//   @Mutation
//   is_create_action() {
//     this.isCreateAction = true
//   }
//   set_loading_state() {
//     this.isLoading = !this.isLoading
//   }
//   set_error_state(msgRequiredError: boolean) {
//     this.msgRequiredError = msgRequiredError
//   }
//   set_CheckAction_state() {
//     this.checkAction = !this.checkAction
//   }
//   set_modalForm_state() {
//     this.isModalForm = !this.isModalForm
//   }
//   set_dataCars(payload: []) {
//     this.dataCars = payload
//   }

//   @Action
//   async get_cars() {
//     try {
//       this.set_loading_state;
//       const response = await carService.get();
//       this.set_dataCars, response
//     } catch (erro) {
//       console.log(erro);
//     } finally {
//       this.set_error_state, false;
//       this.set_loading_state;
//     }
//   }
//   async create_new_car(car: ICar) {
//     try {
//       this.set_loading_state;
//       await carService.post(car);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       this.set_modalForm_state;
//       this.get_cars;
//       this.set_loading_state;
//     }
//   }
//   async update_car(car: ICar) {
//     try {
//       this.set_loading_state;
//       const carData = car;
//       await carService.put(carData);
//     } catch (erro) {
//       alert("Erro, tente novamente");
//     } finally {
//       this.set_modalForm_state;
//       this.get_cars;
//       this.set_loading_state;
//     }
//   }


//   async delete_car(payload: string) {
//     try {
//       this.set_loading_state;
//       await carService.delete(payload);
//     } catch (erro) {
//       console.log(erro);
//       alert("Não foi possível deletar este item");
//     } finally {
//       this.set_loading_state;
//       this.get_cars;
//       this.set_CheckAction_state;
//     }
//   }
// }
// import  store  from  "path/to/store" ; 
// export  const  userModule  =  new  UserModule ( { store ,  name : "user"  } ) ;




