<template>
<!--    <g>-->
<!--        <foreignObject height="50%" width="50%">-->
<!--            <body xmlns="http://www.w3.org/1999/xhtml" >-->
                <el-button type="success" @click="openDialog" style="position: absolute;right: 10px;top: 14px">导出</el-button>
                <el-dialog  title="参数设置"
                            v-model="hyperParameterForm"
                            width="35%">
                    <div>
                        <span style="width:100px; text-align:center; font-size: 15px; margin-top: 3px;padding:30px;">下载名称：</span>
                        &nbsp;
                        <el-input v-model="name" placeholder="请输入下载名" style="width: 50%"></el-input>
                    </div>
                    <div style="display: flex;justify-content: space-between;padding:10px;">
                        <div style="width:100px; text-align:center; font-size: 15px; margin-top: 3px">超参数：</div>
                        <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="Please input" @select="hyperParameterSelect"/>
                        <el-form>
                            <template v-for="param in hyperParameterTemp" :key="param.label">
                                <el-form-item v-if="state === param.label" style="margin-top: 5px">
                                    <template v-if="typeof param.value === 'boolean' || typeof param.value === 'string'">
                                        <el-select v-model="param.value" class="mx-4" style="width: 170px">
                                            <el-option v-for="option in param.options" :key="option.value" :label="option.label" :value="option.value" />
                                        </el-select>
                                    </template>
                                    <template v-else>
                                        <el-input-number v-model="param.value" class="mx-4" :min="0" controls-position="right" :step="param.step"/>
                                    </template>
                                </el-form-item>
                            </template>
                        </el-form>
                    </div>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button type="info" @click="closeDialog">取消</el-button>
                            <el-button type="success" @click="exportYaml">
                                导出
                            </el-button>
                        </div>
                    </template>
                </el-dialog>
<!--            </body>-->
<!--        </foreignObject>-->
<!--    </g>-->

</template>
<script>
export default {
    props: {
        hyperParameter: {
            type: Object
        },
    },
    data() {
        return {
            hyperParameterTemp:null,
            hyperParameterForm:false,
            state:'',
            name: ''
        }
    },
    methods:{
        openDialog(){
            this.hyperParameterTemp = JSON.parse(JSON.stringify(this.hyperParameter));
            this.hyperParameterForm = true;
        },
        closeDialog(){
            this.hyperParameterForm = false;
        },
        hyperParameterSelect(item){
            this.currentSelect=item.label;
        },
        querySearchAsync(queryString,cb) {
            let restaurants = this.hyperParameter;
            let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
            results = results.map(item => ({ ...item, value: item.label }));
            cb(results);
        },
        createStateFilter(queryString) {
            return (state) => {
                // console.log(state.label)
                return (state.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        exportYaml() {
            if (!this.name) {
                ElMessage({
                    message: '请输入下载名称',
                    type: 'error',
                })
                return;
            }
            this.hyperParameterForm = false
            Object.assign(this.hyperParameter, JSON.parse(JSON.stringify(this.hyperParameterTemp)));
            // console.log("超参数:")
            // console.log(this.state)
            this.$emit("exportYaml", this.name, this.state);
        }
    }
}
</script>
<style>

</style>