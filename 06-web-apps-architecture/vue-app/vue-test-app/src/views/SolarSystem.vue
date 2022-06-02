<script>
import Moon from '../components/Moon.vue';
import Earth from '../components/Earth.vue';
import Sun from '../components/Sun.vue';

export default {
  data() {
    return {
      count: 0,

      sunPosition: {
        x: 200,
        y: 200,
        zIndex: 10,
      },
      moonPosition: {
        x: 200,
        y: 200,
        zIndex: 20,
      },
      earthPosition: {
        x: 200,
        y: 200,
        zIndex: 30,
      }
    }
  },
  components: {
    Moon, Sun, Earth
  },
  mounted() {
    setInterval(() => {
      this.changePosition();
    }, 100)
  },
  methods: {
    changePosition() {
      if (this.earthPosition.x < 100 && this.earthPosition.zIndex !== 20) {
        this.earthPosition.x += 10;
        this.earthPosition.y += 10;
        this.earthPosition.zIndex = 20;
      } else if (this.earthPosition.x > 700 || this.earthPosition.zIndex == 1) {
        this.earthPosition.x -= 10;
        this.earthPosition.y -= 10;
        this.earthPosition.zIndex = 1;
      } else {
        this.earthPosition.x+=10;
        this.earthPosition.y+=10;
      }
      this.$refs['earth'].style.top = this.earthPosition.x + 'px';
      this.$refs['earth'].style.left = this.earthPosition.y + 'px';
      this.$refs['earth'].style.zIndex = this.earthPosition.zIndex;

      this.$refs['moon'].style.top = this.earthPosition.x + 'px';
      this.$refs['moon'].style.left = this.earthPosition.y + 'px';
      this.$refs['moon'].style.zIndex = this.earthPosition.zIndex + 1;

    }

  }
}
</script>

<template>
  <div>

    <button @click="count++;changePosition()">You clicked me {{ count }} times.</button>

    <div class="sun-container" ref="sun"><Sun></Sun></div>
    <div class="earth-container" ref="earth"><Earth></Earth></div>
    <div class="moon-container" ref="moon"><Moon></Moon></div>

  </div>
</template>

<style>
.sun-container {
  position: absolute;
  z-index: 10;
  top: 200px;
  left: 200px;
}
.earth-container {
  position: absolute;
  z-index: 20;
  top: 200px;
  left: 200px;
}
.moon-container {
  position: absolute;
  z-index: 30;
  top: 200px;
  left: 200px;
}

</style>

