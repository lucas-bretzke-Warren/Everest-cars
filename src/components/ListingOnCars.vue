<template>
  <div>
    <nav>Lista de carros</nav>
    <header>
      <button @click="setCreateNewCar">Adicionar carro</button>
    </header>

    <section class="container-list">
      <ul class="titles">
        <li>Carro</li>
        <li>Ano</li>
      </ul>
      <ul
        aria-label="cars-label"
        v-for="car in this.$store.state.myMod.dataCars"
        :key="car.id"
      >
        <li>{{ car.nome }}</li>
        <li>{{ car.ano }}</li>
        <li>
          <button class="btn-put" @click="setCarToUpdate(car)">
            Editar carro
          </button>
        </li>
        <li>
          <button class="btn-delete" @click="openModal(car.id)">
            Deletar carro
          </button>
        </li>
      </ul>
      <h3 v-show="$store.state.myMod.isLoading" class="loading">
        Loading . . .
      </h3>
      <h3 v-show="this.msgRequiredError" class="loading">Erro</h3>
    </section>
    <ModalForm
      data-testid="modal-form"
      v-show="this.$store.state.myMod.isModalForm"
      :carProp="car"
    />
    <ConfirmationModal
      data-testid="confirmation-modal"
      v-show="this.$store.state.myMod.checkAction"
    />
    <Cookie v-show="this.$store.state.myMod.isCookie" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ModalForm from "@/components/ModalForm.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import Cookie from "@/components/Cookies.vue";
import { ICar } from "@/types";

@Component({
  components: {
    ModalForm,
    ConfirmationModal,
    Cookie,
  },
})
export default class ListingOnCars extends Vue {
  public car = this.$store.state.myMod.car;
  public msgRequiredError = this.$store.state.myMod.msgRequiredError;

  private modalForm() {
    this.$store.commit("set_modalForm_state");
  }

  public openModal(id: string) {
    this.$store.commit("set_CheckAction_state");
    this.$store.state.myMod.carId = id;
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
      id: "",
    };
    this.$store.state.myMod.isCreateAction = true;
    this.modalForm();
  }
  private checkIfYouFellOnGet() {
    this.msgRequiredError =
      this.$store.state.myMod.dataCars == 0 ? true : false;
  }

  public setCarToUpdate(car: ICar) {
    this.car = { ...car };
    this.$store.state.myMod.isCreateAction = false;
    this.modalForm();
  }

  created() {
    this.$store.state.myMod.isCookie = true;
  }

  async mounted() {
    this.$store.dispatch("get_cars");
    // this.checkIfYouFellOnGet();
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
        color: #0b0a02;
        background-color: transparent;
      }
      .btns:hover {
        transform: translateZ(10px) scale(1.1);
      }
      .btn-put {
        .btns();
        background-color: #ebe4d9;
      }
      .btn-put:hover {
        transform: translateZ(10px) scale(1.1);
      }
      .btn-delete {
        .btns();
        background-color: #88e2f2;
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
