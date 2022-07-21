<template>
  <div class="weather-wrapper">
    <img src="../../assets/images/peopleInAndOut/cloudy.png" alt="" />
    <div class="info-wrap">
      <div class="temperature">32℃</div>
      <div class="weather-wrap">
        <p class="weather-text">
          <span class="sky">多云</span>
          <span class="line"></span>
          <span class="air">32</span>
        </p>
        <p>优</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<style lang="less" scoped>
.weather-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 110px;
    margin-right: 16px;
  }
  .info-wrap {
    .temperature {
      color: #ffffff;
      font-size: 45px;
    }
    .weather-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;
      .weather-text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        .line {
          margin: 0 18px;
          width: 2px;
          height: 24px;
          background-color: #6a6f7c;
        }
      }
      p:last-child {
        display: inline-block;
        padding: 2px 10px;
        text-align: center;
        border-radius: 8px;
        background-color: #029843;
        font-size: 18px;
        margin-left: 14px;
      }
    }
  }
}
</style>
