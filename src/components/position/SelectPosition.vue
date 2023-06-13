<template>
    <el-select
            :model-value="position"
            class="m-2"
            placeholder="选择职位"
            size="large"

          >
            <el-option @click="sendPosition(item)" v-for="(item, i) in positions" :key="i" :value="item.positionName">
            </el-option>
          </el-select>
</template>
<script>
import { getPosts } from '@/api/posts'
export default {
    props:["position"],
    data(){
        return{
            positions:[],
        }
    },
    created(){
        this.getAllPostions();
    },
    methods:{
        async getAllPostions(){
            const res = await getPosts();
            console.log(res,"职位");
            if(res.data.code === this.$store.state.globel.success){
                this.positions = res.data.data;
            }else{
                this.positions = "空";
            }
        },
        //修改身份
        sendPosition(data){
            this.$emit("getPosition",data.value)
        }
    }
}
</script>