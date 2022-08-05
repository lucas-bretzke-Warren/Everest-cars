 <template>
  <section>
    <div class="content-title">
      <h4>Tem certeza</h4>
      <h4>que deseja deletar este item?</h4>
    </div>
    <div class="content-btns">
      <!-- data-test="close-modal" -->
      <button @click="closeModal">Cancelar</button
      ><button data-testid="emit-close-modal-button" @click="deleteCar(id)">Sim</button>
    </div>
  </section>
</template>
 
 <script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import carService from "@/services/carService";

@Component
export default class ConfirmationModal extends Vue {
  @Prop({ type: Number, required: true })
  readonly id!: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  private loadingProp!: boolean;

  @Emit("close-modal")
  public closeModal() {
    return;
  }
  @Emit("get-cars")
  private getCars() {
    return;
  }

  public async deleteCar(id: number) {
    try {
      await carService.delete(id);
      this.loadingProp = true;
    } catch (erro) {
      console.log(erro);
      alert("Não foi pissível deletar este item");
    } finally {
      this.loadingProp = false;
      this.getCars();
      this.closeModal();
    }
  }
}
</script>
 
<style lang="less" scoped>
section {
  width: 25%;
  height: 15%;

  display: grid;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  position: fixed;
  top: 45%;
  left: 50%;
  right: -50%;
  transform: translate(-50%, -50%);

  border-bottom: 4px solid red;
  box-shadow: 0px 0px 1px 1100px rgba(0, 0, 0, 0.53);
  color: black;
  background-color: white;
  .content-title {
    display: grid;
    align-items: center;
    justify-content: center;
    h4 {
      margin: 0px auto;
    }
  }
  .content-btns {
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
</style>
 