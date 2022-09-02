import Vue from 'vue'
import Vuex from 'vuex'
import { VuexModule, Module, Mutation, Action, } from 'vuex-module-decorators';
import carService from '@/services/carService';
import { ICar } from '@/types/index';

@Module({ name: 'myMod' })
export class myMod extends VuexModule {
  dataCars: ICar[] = [];
  car: ICar = {
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
  };
  checkAction = false;
  isModalForm = false;
  isCreateAction  = false;
  isLoading = false;
  msgRequiredError = false;
  carId = "";


  get modal_form_title() {
    return this.isCreateAction ? "Cadastrar novo carro" : "Atualizar carro";
  }

  @Mutation
  set_dataCars(payload: ICar[]) {
    this.dataCars = payload
  }

  @Mutation
  set_CheckAction_state() {
    this.checkAction = !this.checkAction
  }

  @Mutation
  set_modalForm_state() {
    this.isModalForm = !this.isModalForm
  }

  @Mutation
  is_create_action() {
    this.isCreateAction = true
  }

  @Mutation
  set_loading_state() {
    this.isLoading = !this.isLoading
  }

  @Mutation
  set_error_state(msgRequiredError: boolean) {
    this.msgRequiredError = msgRequiredError
  }

  @Mutation
  check_If_You_Fell_On_Get() {
    this.msgRequiredError = this.dataCars.length == 0 ? true : false;
  }


  @Action
  async get_cars() {
    try {
      this.context.commit('set_loading_state')
      const payload = await carService.get()
      this.context.commit('set_dataCars', payload)
      this.context.commit('check_If_You_Fell_On_Get')
    } catch (erro) {
      console.log(erro);
    } finally {
      this.context.commit('set_error_state', false);
      this.context.commit('set_loading_state');
    }
  }

  @Action
  async create_new_car(car: ICar) {
    try {
      this.context.commit('set_loading_state');
      await carService.post(car);
    } catch (erro) {
      console.log(erro);
    } finally {
      this.context.commit('set_modalForm_state');
      this.context.dispatch('get_cars');
      this.context.commit('set_loading_state');
    }
  }

  @Action
  async update_car(car: ICar) {
    try {
      this.context.commit('set_loading_state');
      const carData = car;
      await carService.put(carData);
    } catch (erro) {
      alert("Erro, tente novamente");
    } finally {
      this.context.commit('set_modalForm_state');
      this.context.dispatch('get_cars');
      this.context.commit('set_loading_state');
    }
  }
  
  @Action
  async delete_car(payload: string) {
    try {
      this.context.commit('set_loading_state');
      await carService.delete(payload);
    } catch (erro) {
      console.log(erro);
      alert("Não foi possível deletar este item");
    } finally {
      this.context.commit('set_loading_state');
      this.context.dispatch('get_cars');
      this.context.commit('set_CheckAction_state');
    }
  }
}

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { myMod }
})