<template>
  <div>
    <nav>Lista de carros</nav>
    <header><button @click="setCreateNewCar">Adicionar carro</button></header>

    <section class="container-list">
      <ul class="titles">
        <li>Carro</li>
        <li>Ano</li>
      </ul>
      <ul v-for="car in dataCars" :key="car.id">
        <li>{{ car.nome }}</li>
        <li>{{ car.ano }}</li>
        <li>
          <button class="btn-put" @click="setCarToUpdate(car.id, car)">
            Editar carro
          </button>
        </li>
        <li>
          <button class="btn-delete" @click="openModal(car.id)">
            Deletar carro
          </button>
        </li>
      </ul>
      <section v-show="showLoading" class="loading">
        <h3>Loading . . .</h3>
      </section>
    </section>
    <ModalForm
      v-show="formNewCar"
      @close-modal="closeFormModal"
      @update-car="updateCar"
      @create-new-car="createNewCar"
      :isCreateProp="isCreate"
      :carIdProp="carId"
      :carProp="car"
    />
    <ConfirmationModal
      v-show="checkAction"
      @close-modal="closeModal"
      @get-cars="getCars"
      :id="carId"
      :loadingProp="showLoading"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import carService from "../services/carService";
import ModalForm from "@/components/ModalForm.vue";
import ConfirmationModal from "@/components/ConfirmarionModal.vue";
import { ICar, IReturnUpdateCar } from "@/types";

@Component({
  components: {
    ModalForm,
    ConfirmationModal,
  },
})
export default class ListingOnCars extends Vue {
  public formNewCar = false;
  public checkAction = false;
  public showLoading = false;
  public dataCars = [];
  public carId?: number = 0;
  public car: ICar = {
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
  };
  public isCreate: boolean | null = null;

  private openFormModal() {
    this.formNewCar = true;
  }
  public closeFormModal() {
    this.formNewCar = false;
  }
  public openModal(id: number) {
    this.checkAction = true;
    this.carId = id;
  }
  public closeModal() {
    this.checkAction = false;
  }

  public setCreateNewCar() {
    this.car = {
      nome: "",
      marca: "",
      cor: "",
      ano: null,
      portas: null,
      cv: null,
      alarme: "",
      cambio: "",
      tetoSolar: "",
      computadorDeBordo: "",
    };
    this.isCreate = true;
    this.openFormModal();
  }

  public async getCars() {
    try {
      this.showLoading = true;
      const response = await carService.get();
      this.dataCars = response.data;
    } catch (erro) {
      console.log(erro);
    } finally {
      this.showLoading = false;
    }
  }
  public async createNewCar(car: ICar) {
    try {
      this.showLoading = true;
      await carService.post(car);
    } catch (err) {
      console.log(err);
    } finally {
      this.closeFormModal();
      this.getCars();
      this.showLoading = false;
    }
  }
  public setCarToUpdate(id: number, car: ICar) {
    this.car = Object.assign({}, car);
    this.carId = id;
    this.isCreate = false;
    this.openFormModal();
  }
  public async updateCar({ id, car }: IReturnUpdateCar) {
    try {
      this.showLoading = true;
      const carData: IReturnUpdateCar = {
        id,
        car,
      };
      await carService.put(carData);
    } catch (erro) {
      alert("Erro, tente novamente");
    } finally {
      this.closeFormModal();
      this.getCars();
      this.showLoading = false;
    }
  }

  private mounted() {
    this.getCars();
  }
}
</script>


<style lang="less" scoped>
@bg-color-nav: rgb(82, 82, 82);
@border-color: rgba(105, 105, 105, 0.542);

nav {
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  background-color: @bg-color-nav;
  font-size: 15px;
}
header {
  width: 100%;
  height: 110px;

  display: flex;
  align-items: center;
  justify-content: center;

  button {
    padding: 7px 36px;

    border: none;
    border-radius: 3px;
    color: white;
    background-color: green;
    cursor: pointer;
  }
  button:hover {
    transition: 0.3s;
    transform: translateZ(10px) scale(1.1);
  }
}

.container-list {
  width: 770px;
  height: 420px;

  margin: 10px auto;
  padding: 20px;

  border-radius: 5px;
  background-color: #02343f;
  border-bottom: 1px solid @border-color;
  overflow-y: scroll;
  ul.titles {
    border-top: 1px solid @border-color;
    border-bottom: 1px solid @border-color;
    margin-bottom: 40px;
    font-weight: bold;
    grid-template-columns: 1fr 1.9fr;
  }
  ul {
    padding: 10px 10px;

    display: grid;
    grid-template-columns: 2fr 2fr 0.1fr 0.1fr;
    align-items: center;

    list-style: none;
    color: #f0edcc;
    li {
      font-size: 14px;

      .btns {
        width: 95px;
        padding: 5px 5px;
        margin-left: 10px;
        font-size: 14px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        color: #f0edcc;
        background-color: transparent;
      }
      .btns:hover {
        transform: translateZ(10px) scale(1.1);
      }
      .btn-put {
        .btns();
        background-color: #f2aa4c;
      }
      .btn-put:hover {
        transform: translateZ(10px) scale(1.1);
      }
      .btn-delete {
        .btns();
        background-color: #a4193d;
      }
      .btn-delete:hover {
        transform: translateZ(10px) scale(1.1);
      }
    }
  }
  .modal-confirm-delete {
    width: 300px;
    height: 100px;

    display: grid;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    position: fixed;
    top: 50%;
    left: 50%;
    right: -50%;
    transform: translate(-50%, -50%);

    background-color: white;
    color: black;
    box-shadow: 0px 0px 1px 1100px rgba(77, 77, 77, 0.151);
    div {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        padding: 7px 13px;
        margin: 0px 3px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        color: white;
        background-color: #02343fd2;
      }
      button:hover {
        transform: translateZ(5px) scale(1.1);
        background-color: #02343f;
        border-radius: 3px;
      }
    }
  }

  .loading {
    width: 150px;
    height: auto;

    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 45%;
    left: 50%;
    right: -50%;
    transform: translateX(-50%);

    border-radius: 3px;
    box-shadow: 0px 0px 1px 1100px rgba(255, 255, 255, 0.123);
    background: rgba(255, 255, 255, 0.877);

    h3 {
      color: black;
      letter-spacing: 0.1rem;
      font-weight: bold;
    }
  }
}
</style>
