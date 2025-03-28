<template>
  <div class="user-center">
    <el-card>
      <div class="header">
        <img :src="user.avatar" alt="avatar" class="avatar"/>
        <h2>{{ user.username }}</h2>
      </div>
      <el-tabs>
        <el-tab-pane label="我的动态">
          <ul>
            <li v-for="(post, index) in user.posts" :key="index">
              {{ post }}
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="我的收藏">
          <ul>
            <li v-for="(favorite, index) in user.favorites" :key="index">
              {{ favorite }}
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="浏览历史">
          <ul>
            <li v-for="(historyItem, index) in user.history" :key="index">
              {{ historyItem }}
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        avatar: 'https://via.placeholder.com/150',
        username: 'username',
        posts: [
          '动态111',
          '动态222',
          '动态333',
        ],
        favorites: [
          '收藏文章1',
          '收藏文章2',
          '收藏文章3',
        ],
        history: [
          '浏览记录1',
          '浏览记录2',
          '浏览记录3',
        ],
      },
    };
  },
};
</script>

<style scoped>
.user-center {
  width: 600px;
  margin: 0 auto;
  padding-top: 50px;
  background-color: #808080; /* 灰色背景 */
  color: white; /* 确保文本在灰色背景上可见 */
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

h2 {
  margin: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
