/**
 * 这里放置json 数据撑起组件内容
 */
export const diagramExampleData = {

}
export const hyper_parameter = [
    { label: 'nc', value: 80, state: false, step: 1 },
    { label: 'lr0', value: 0.01, state: false, step: 0.0001 },
    { label: 'lrf', value: 0.01, state: false, step: 0.0001 },
    { label: 'momentum', value: 0.937, state: false, step: 0.0001 },
    { label: 'weight_decay', value: 0.0005, state: false, step: 0.0001 },
    { label: 'warmup_epochs', value: 3.0, state: false, step: 0.0001 },
    { label: 'warmup_momentum', value: 0.8, state: false, step: 0.0001 },
    { label: 'warmup_bias_lr', value: 0.1, state: false, step: 0.0001 },
    { label: 'box', value: 7.5, state: false, step: 0.0001 },
    { label: 'cls', value: 0.5, state: false, step: 0.0001 },
    { label: 'dfl', value: 1.5, state: false, step: 0.0001 },
    { label: 'pose', value: 12.0, state: false, step: 0.0001 },
    { label: 'kobj', value: 1.0, state: false, step: 0.0001 },
    { label: 'label_smoothing', value: 0.0, state: false, step: 0.0001 },
    { label: 'nbs', value: 64, state: false, step: 0.0001 },
    { label: 'hsv_h', value: 0.015, state: false, step: 0.0001 },
    { label: 'hsv_s', value: 0.7, state: false, step: 0.0001 },
    { label: 'hsv_v', value: 0.4, state: false, step: 0.0001 },
    { label: 'degrees', value: 0.0, state: false, step: 0.0001 },
    { label: 'translate', value: 0.1, state: false, step: 0.0001 },
    { label: 'scale', value: 0.5, state: false, step: 0.0001 },
    { label: 'shear', value: 0.0, state: false, step: 0.0001 },
    { label: 'perspective', value: 0.0, state: false, step: 0.0001 },
    { label: 'flipud', value: 0.0, state: false, step: 0.0001 },
    { label: 'fliplr', value: 0.5, state: false, step: 0.0001 },
    { label: 'mosaic', value: 1.0, state: false, step: 0.0001 },
    { label: 'mixup', value: 0.0, state: false, step: 0.0001 },
    { label: 'copy_paste', value: 0.0, state: false, step: 0.0001 },
    {
        label: 'auto_augment', value: 'randaugment', state: false, options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'randaugument', value: 'randaugument' }
        ], step: 0.0001
    },
    { label: 'erasing', value: 0.4, state: false, step: 0.0001 },
    { label: 'crop_fraction', value: 1.0, state: false, step: 0.0001 },
]
export const JSONFromService ={"edges":[{"src_node_id":3,"src_output_idx":0,"dst_node_id":2,"dst_input_idx":0,"id":11},{"src_node_id":4,"src_output_idx":0,"dst_node_id":5,"dst_input_idx":0,"id":13},{"src_node_id":5,"src_output_idx":0,"dst_node_id":6,"dst_input_idx":0,"id":14},{"src_node_id":6,"src_output_idx":0,"dst_node_id":7,"dst_input_idx":0,"id":15},{"src_node_id":7,"src_output_idx":0,"dst_node_id":8,"dst_input_idx":0,"id":16},{"src_node_id":8,"src_output_idx":0,"dst_node_id":9,"dst_input_idx":0,"id":17},{"src_node_id":9,"src_output_idx":0,"dst_node_id":10,"dst_input_idx":0,"id":18},{"src_node_id":10,"src_output_idx":0,"dst_node_id":11,"dst_input_idx":0,"id":19},{"src_node_id":11,"src_output_idx":0,"dst_node_id":12,"dst_input_idx":0,"id":20},{"src_node_id":7,"src_output_idx":1,"dst_node_id":12,"dst_input_idx":1,"id":21},{"src_node_id":12,"src_output_idx":0,"dst_node_id":13,"dst_input_idx":0,"id":22},{"src_node_id":13,"src_output_idx":0,"dst_node_id":14,"dst_input_idx":0,"id":23},{"src_node_id":14,"src_output_idx":0,"dst_node_id":15,"dst_input_idx":0,"id":24},{"src_node_id":5,"src_output_idx":1,"dst_node_id":15,"dst_input_idx":1,"id":25},{"src_node_id":15,"src_output_idx":0,"dst_node_id":16,"dst_input_idx":0,"id":26},{"src_node_id":16,"src_output_idx":0,"dst_node_id":17,"dst_input_idx":0,"id":27},{"src_node_id":17,"src_output_idx":0,"dst_node_id":18,"dst_input_idx":0,"id":28},{"src_node_id":20,"src_output_idx":0,"dst_node_id":21,"dst_input_idx":0,"id":32},{"src_node_id":21,"src_output_idx":0,"dst_node_id":22,"dst_input_idx":0,"id":32},{"src_node_id":22,"src_output_idx":0,"dst_node_id":23,"dst_input_idx":0,"id":33},{"src_node_id":19,"src_output_idx":1,"dst_node_id":23,"dst_input_idx":1,"id":34},{"src_node_id":2,"src_output_idx":0,"dst_node_id":24,"dst_input_idx":0,"id":35},{"src_node_id":24,"src_output_idx":0,"dst_node_id":4,"dst_input_idx":0,"id":36},{"src_node_id":13,"src_output_idx":1,"dst_node_id":18,"dst_input_idx":1,"id":33},{"src_node_id":10,"src_output_idx":1,"dst_node_id":21,"dst_input_idx":1,"id":34},{"src_node_id":16,"src_output_idx":1,"dst_node_id":23,"dst_input_idx":2,"id":35},{"src_node_id":18,"src_output_idx":0,"dst_node_id":19,"dst_input_idx":0,"id":36},{"src_node_id":19,"src_output_idx":0,"dst_node_id":20,"dst_input_idx":0,"id":37}],"nodes":[{"pos_x":-116.07368421052635,"pos_y":-159.17729476125626,"name":"Conv","iconClassName":"el-icon-collection-tag","form":{"details":"普通节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Out Channels","value":128,"step":1},"2":{"label":"Kernel Size","value":3,"step":1},"3":{"label":"Stride","value":2,"step":1},"4":{"label":"Padding","value":1,"step":1}},"pos":"backbone","id":2,"in_ports":[0],"out_ports":[0]},{"pos_x":-115.67692307692305,"pos_y":-232.35384615384626,"name":"Conv","iconClassName":"el-icon-collection-tag","form":{"details":"普通节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Out Channels","value":64,"step":1},"2":{"label":"Kernel Size","value":3,"step":1},"3":{"label":"Stride","value":2,"step":1},"4":{"label":"Padding","value":1,"step":1}},"pos":"backbone","id":3,"in_ports":[0],"out_ports":[0]},{"pos_x":-117.8105263157895,"pos_y":6.401652607164806,"name":"Conv","iconClassName":"el-icon-collection-tag","form":{"details":"普通节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Out Channels","value":256,"step":1},"2":{"label":"Kernel Size","value":3,"step":1},"3":{"label":"Stride","value":2,"step":1},"4":{"label":"Padding","value":1,"step":1}},"pos":"backbone","id":4,"in_ports":[0],"out_ports":[0]},{"pos_x":-119.96842105263161,"pos_y":73.70526315789466,"name":"C2f","iconClassName":"el-icon-loading","form":{"details":"动态节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":6,"step":1},"1":{"label":"Out Channels","value":256,"step":1},"2":{"label":"isRestful","value":true,"options":[{"label":"true","value":true},{"label":"false","value":false}]}},"nodeStyle":{"border":"2px solid pink","border-radius":0,"height":"30px"},"iconStyle":{"background":"pink"},"pos":"backbone","id":5,"in_ports":[0],"out_ports":[0,1]},{"pos_x":-121.49473684210528,"pos_y":152.29638944927007,"name":"Conv","iconClassName":"el-icon-collection-tag","form":{"details":"普通节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Out Channels","value":512,"step":1},"2":{"label":"Kernel Size","value":3,"step":1},"3":{"label":"Stride","value":2,"step":1},"4":{"label":"Padding","value":1,"step":1}},"pos":"backbone","id":6,"in_ports":[0],"out_ports":[0]},{"pos_x":-119.33684210526319,"pos_y":228.08586313348061,"name":"C2f","iconClassName":"el-icon-loading","form":{"details":"动态节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":6,"step":1},"1":{"label":"Out Channels","value":512,"step":1},"2":{"label":"isRestful","value":true,"options":[{"label":"true","value":true},{"label":"false","value":false}]}},"nodeStyle":{"border":"2px solid pink","border-radius":0,"height":"30px"},"iconStyle":{"background":"pink"},"pos":"backbone","id":7,"in_ports":[0],"out_ports":[0,1]},{"pos_x":-147.22222222222223,"pos_y":289.6666666666667,"name":"Conv","iconClassName":"el-icon-collection-tag","form":{"details":"普通节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Out Channels","value":1024,"step":1},"2":{"label":"Kernel Size","value":3,"step":1},"3":{"label":"Stride","value":2,"step":1},"4":{"label":"Padding","value":1,"step":1}},"pos":"backbone","id":8,"in_ports":[0],"out_ports":[0]},{"pos_x":-119.33684210526319,"pos_y":352.50691576505955,"name":"C2f","iconClassName":"el-icon-loading","form":{"details":"动态节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":3,"step":1},"1":{"label":"Out Channels","value":1024,"step":1},"2":{"label":"isRestful","value":true,"options":[{"label":"true","value":true},{"label":"false","value":false}]}},"nodeStyle":{"border":"2px solid pink","border-radius":0,"height":"30px"},"iconStyle":{"background":"pink"},"pos":"backbone","id":9,"in_ports":[0],"out_ports":[0]},{"pos_x":-128.8888888888889,"pos_y":426.2222222222223,"name":"SPPF","form":{"details":"自定义节点的内容balabala","createTime":"Wed Apr 17 2024"},"iconClassName":"el-icon-magic-stick","nodeStyle":{"border":"2px solid orange","border-radius":0,"height":"30px"},"iconStyle":{"background":"orange"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Out Channels","value":1024,"step":1},"2":{"label":"Kernel Size","value":5,"step":1}},"pos":"backbone","id":10,"in_ports":[0],"out_ports":[0,1]},{"pos_x":-119.12631578947372,"pos_y":509.7174420808491,"name":"nn.Upsample","form":{"details":"节点内容自由编辑","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Size","value":"None"},"2":{"label":"scale_factor","value":2,"step":1},"3":{"label":"Algorithm","value":"nearest"}},"nodeStyle":{"border":"2px solid green","border-radius":0,"height":"30px"},"iconStyle":{"background":"green"},"pos":"head","id":11,"in_ports":[0],"out_ports":[0]},{"pos_x":104.28888888888886,"pos_y":332.6128555297851,"name":"Concat","form":{"details":"节点内容自由编辑","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Dimensionality","value":1,"step":1}},"nodeStyle":{"border":"2px solid yellow","border-radius":0,"height":"30px"},"iconStyle":{"background":"yellow"},"pos":"head","id":12,"in_ports":[0,1],"out_ports":[0]},{"pos_x":111.3333333333334,"pos_y":417.0000000000001,"name":"C2f","iconClassName":"el-icon-loading","form":{"details":"动态节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":3,"step":1},"1":{"label":"Out Channels","value":512,"step":1},"2":{"label":"isRestful","value":false,"options":[{"label":"true","value":true},{"label":"false","value":false}]}},"nodeStyle":{"border":"2px solid pink","border-radius":0,"height":"30px"},"iconStyle":{"background":"pink"},"pos":"head","id":13,"in_ports":[0],"out_ports":[0,1]},{"pos_x":98.45882352941186,"pos_y":511.0235338996438,"name":"nn.Upsample","form":{"details":"节点内容自由编辑","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Size","value":"None"},"2":{"label":"scale_factor","value":2,"step":1},"3":{"label":"Algorithm","value":"nearest"}},"nodeStyle":{"border":"2px solid green","border-radius":0,"height":"30px"},"iconStyle":{"background":"green"},"pos":"head","id":14,"in_ports":[0],"out_ports":[0]},{"pos_x":321.40000000000015,"pos_y":330.9058868408203,"name":"Concat","form":{"details":"节点内容自由编辑","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Dimensionality","value":1,"step":1}},"nodeStyle":{"border":"2px solid yellow","border-radius":0,"height":"30px"},"iconStyle":{"background":"yellow"},"pos":"head","id":15,"in_ports":[0,1],"out_ports":[0]},{"pos_x":319.84444444444443,"pos_y":415.39063330756295,"name":"C2f","iconClassName":"el-icon-loading","form":{"details":"动态节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":3,"step":1},"1":{"label":"Out Channels","value":256,"step":1},"2":{"label":"isRestful","value":false,"options":[{"label":"true","value":true},{"label":"false","value":false}]}},"nodeStyle":{"border":"2px solid pink","border-radius":0,"height":"30px"},"iconStyle":{"background":"pink"},"pos":"head","id":16,"in_ports":[0],"out_ports":[0,1]},{"pos_x":314.929411764706,"pos_y":511.0823574290556,"name":"Conv","iconClassName":"el-icon-collection-tag","form":{"details":"普通节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Out Channels","value":256,"step":1},"2":{"label":"Kernel Size","value":3,"step":1},"3":{"label":"Stride","value":2,"step":1},"4":{"label":"Padding","value":1,"step":1}},"pos":"head","id":17,"in_ports":[0],"out_ports":[0]},{"pos_x":535.6666666666669,"pos_y":326.3333333333334,"name":"Concat","form":{"details":"节点内容自由编辑","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Dimensionality","value":1,"step":1}},"nodeStyle":{"border":"2px solid yellow","border-radius":0,"height":"30px"},"iconStyle":{"background":"yellow"},"pos":"head","id":18,"in_ports":[0,1],"out_ports":[0]},{"pos_x":523.4588235294119,"pos_y":416.78823978199677,"name":"C2f","iconClassName":"el-icon-loading","form":{"details":"动态节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":3,"step":1},"1":{"label":"Out Channels","value":512,"step":1},"2":{"label":"isRestful","value":false,"options":[{"label":"true","value":true},{"label":"false","value":false}]}},"nodeStyle":{"border":"2px solid pink","border-radius":0,"height":"30px"},"iconStyle":{"background":"pink"},"pos":"head","id":19,"in_ports":[0],"out_ports":[0,1]},{"pos_x":521.6666666666669,"pos_y":519.6666666666669,"name":"Conv","iconClassName":"el-icon-collection-tag","form":{"details":"普通节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Out Channels","value":512,"step":1},"2":{"label":"Kernel Size","value":3,"step":1},"3":{"label":"Stride","value":2,"step":1},"4":{"label":"Padding","value":1,"step":1}},"pos":"head","id":20,"in_ports":[0],"out_ports":[0]},{"pos_x":740.666666666667,"pos_y":328.0000000000001,"name":"Concat","form":{"details":"节点内容自由编辑","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Dimensionality","value":1,"step":1}},"nodeStyle":{"border":"2px solid yellow","border-radius":0,"height":"30px"},"iconStyle":{"background":"yellow"},"pos":"head","id":21,"in_ports":[0,1],"out_ports":[0]},{"pos_x":740.3411764705884,"pos_y":415.4941221349379,"name":"C2f","iconClassName":"el-icon-loading","form":{"details":"动态节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":3,"step":1},"1":{"label":"Out Channels","value":1024,"step":1},"2":{"label":"isRestful","value":false,"options":[{"label":"true","value":true},{"label":"false","value":false}]}},"nodeStyle":{"border":"2px solid pink","border-radius":0,"height":"30px"},"iconStyle":{"background":"pink"},"pos":"head","id":22,"in_ports":[0],"out_ports":[0]},{"pos_x":740.7750000000002,"pos_y":514.45,"name":"Detect","form":{"details":"节点内容自由编辑","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":1,"step":1},"1":{"label":"Number of Classes","value":80,"step":1}},"pos":"head","id":23,"in_ports":[0,1,2],"out_ports":[0]},{"pos_x":-113.76923076923076,"pos_y":-71.46153846153848,"name":"C2f","iconClassName":"el-icon-loading","form":{"details":"动态节点的内容balabala","createTime":"Wed Apr 17 2024"},"arg":{"0":{"label":"n","value":3,"step":1},"1":{"label":"Out Channels","value":128,"step":1},"2":{"label":"isRestful","value":true},"3":{"label":"Kernel Size","value":1,"step":1},"4":{"label":"Stride","value":1,"step":1},"5":{"label":"Padding","value":0,"step":1}},"nodeStyle":{"border":"2px solid pink","border-radius":0,"height":"30px"},"iconStyle":{"background":"pink"},"pos":"backbone","id":24,"in_ports":[0],"out_ports":[0]}]}
export const nodesBasic = [{
    name: 'Conv',
    iconClassName: 'el-icon-collection-tag',
    form: { details: '普通节点的内容balabala', createTime: '' },
    arg: [
        { label: "n", value:1, step:1},
        { label: "Out Channels", value:64, step:1},
        { label: "Kernel Size", value:3, step:1},
        { label: "Stride", value:2, step:1},
        { label: "Padding", value:1, step:1}
    ],
    // {
    //     "n": 1,
    //     "Out Channels":64,
    //     "Stride": 1,
    //     "Kernel Size": 3,
    //     "Padding": 2
    // },
    pos: null
}, {
    name: 'C2f',
    iconClassName: 'el-icon-loading',
    form: { details: '动态节点的内容balabala', createTime: '' },
    arg: [
        { label: "n", value:3, step:1},
        { label: "Out Channels", value:64, step:1},
        { label: "isRestful", value:true,options: [
                { label: 'true', value: true },
                { label: 'false', value: false }
            ]},
    ],
    nodeStyle: {
        "border": "2px solid pink",
        "border-radius": 0,
        "height": "30px"
    },
    iconStyle: {
        "background": "pink"
    },
    pos: null
}, {
    name: 'SPPF',
    form: { details: '自定义节点的内容balabala', createTime: '' },
    iconClassName: 'el-icon-magic-stick',
    nodeStyle: {
        "border": "2px solid orange",
        "border-radius": 0,
        "height": "30px"
    },
    iconStyle: {
        "background": "orange"
    },
    arg:[
        { label: "n", value:1, step:1},
        { label: "Out Channels", value:64, step:1},
        { label: "Kernel Size", value:1, step:1},
    ],
    pos: null
}, {
    name: 'Concat',
    form: { details: '节点内容自由编辑', createTime: '' },
    arg: [
        { label: "n", value:3, step:1},
        { label: "Dimensionality", value:1, step:1}
    ],
    //     {
    //     "n": 1,
    //     "Dimensionality": 1
    // },
    nodeStyle: {
        "border": "2px solid yellow",
        "border-radius": 0,
        "height": "30px"
    },
    iconStyle: {
        "background": "yellow"
    },
    pos: null
}, {
    name: 'Detect',
    form: { details: '节点内容自由编辑', createTime: '' },
    arg: [
        {label:"n", value:1, step: 1},
        {label:"Number of Classes", value:80, step: 1}
    ],
    pos: null
},{
    name: 'BottleNeck',
    form: { details: '节点内容自由编辑', createTime: '' },
    arg: [
        { label: "n", value:1, step:1},
        { label: "Out Channels", value:64, step:1},
        { label: "Kernel Size", value:1, step:1},
        { label: "Stride", value:1, step:1},
        { label: "Padding", value:0, step:1}
    ],
    //     {
    //     "n": 1,
    //     "Out Channels":64,
    //     "stride": 1,
    //     "kernel_size": 1,
    //     "Padding": 0
    // },
    nodeStyle: {
        "border": "2px solid red",
        "border-radius": 0,
        "height": "30px"
    },
    iconStyle: {
        "background": "red"
    },
    pos: null
},{
    name: 'nn.Upsample',
    form: { details: '节点内容自由编辑', createTime: '' },
    arg: [
        {label: "n", value: 1, step:1},
        { label: "Size", value:"None"},
        { label: "scale_factor", value:2, step:1},
        { label: "Algorithm", value:"nearest"}
    ],
    //     {
    //     "size": "None",
    //     "scale_factor": 2,
    //     "algorithm": 'nearest'
    // },
    nodeStyle: {
        "border": "2px solid green",
        "border-radius": 0,
        "height": "30px"
    },
    iconStyle: {
        "background": "green"
    },
    pos: null
}
]
// let cnt= 0;
// let head=Array(yourJSONDataFillThere.nodes.length+10).fill(0);
// let next = Array(2*head.length).fill(0);
// let to = Array(2*head.length).fill(0);
// let ru = Array(head.length).fill(0);
// let cu = Array(head.length).fill(0);
// let ruNum = Array(head.length).fill([]);
// let dp = Array(head.length).fill(0);
// let rfa = Array(head.length).fill(0);
// let index = Array(head.length).fill(0);
// let check = Array(head.length).fill(false);
// let result = {
//     head:[],
//     backbone:[]
// }
// function dfs(fa, root) {
//     if (dp[fa]+1 <= dp[root]) {
//         return;
//     }
//     dp[root] += 1;
//     rfa[root] = fa;
//     for (let i = head[root];i;i = next[i]) {
//         let o = to[i];
//         dfs(root, o);
//     }
//     return
// }
// function exportYaml() {
//     //创建图，并记录出入度
//     let start,end;
//     const edges = JSON.parse(JSON.stringify(yourJSONDataFillThere.edges));
//     const nodes = JSON.parse(JSON.stringify(yourJSONDataFillThere.nodes));
//     for (let i = 0; i < edges.length; i++) {
//         let edge = edges[i];
//         let x = edge.src_node_id, y = edge.dst_node_id;
//         to[++cnt] = y;
//         next[cnt] = head[x];
//         head[x] = cnt;
//         ru[y]++;
//         ruNum[y].unshift(x);
//         cu[x]++;
//     }
//     const num = yourJSONDataFillThere.nodes.length
//     for (let i = 1; i <= num; i++) {
//         if (ru[i] == 0) end = i;
//         if (cu[i] == 0) start = i;
//     }
//     //计算最长路
//     dfs(0, start);
//     //获取层数索引
//     let i = end;
//     index.unshift(i);
//     check[i] = true;
//     while(rfa[i]) {
//         index.unshift(rfa[i]);
//         i = rfa[i];
//         check[rfa[i]] = true;
//     }
//     while (!index.every(value => value===true)) {
//         for (let i = 1; i <= num; i++) {
//             if (!check[i]) {
//                 let idx = index.indexOf(rfa[i]);
//                 if (idx !== -1) {
//                     index.splice(idx+1,0,i);
//                     check[i] = true;
//                 } else {
//                     continue;
//                 }
//             }
//         }
//     }
//     for (let i = index.length-1; i>=0; i--) {
//         const foundNode = nodes.find(node => node.id === index[i]);
//         let temp = [];
//         for (let j = 0; j < ruNum[index[i]].length; j++) {
//             if (i-1 >= 0 && ruNum[index[i]][j] == index[i-1]) {
//                 temp.unshift(-1);
//             } else {
//                 temp.push(index.indexOf(index[i-1]));
//             }
//         }
//         if (i == 0 || temp.length == 1) {
//             temp = -1;
//         }
//         if (foundNode.pos === "head"){
//             result.head.unshift([temp,foundNode.arg.n,foundNode.name, Object.keys(foundNode.arg).filter(key => key !== 'n').map(key => foundNode.arg[key])])
//         } else {
//             result.backbone.unshift([temp,foundNode.arg.n,foundNode.name, Object.keys(foundNode.arg).filter(key => key !== 'n').map(key => foundNode.arg[key])])
//         }
//     }
//     console.log(result);
// }
// {
//      bottleNet:[
//          [-1, "CONV", 1, [64, 3, 2]],
//          [-1, "CONV", 2, [128, 3, 2]],
//          [[-1,1], "ConV“， 1， [128]],
//      ],
//      head:[
//        [-1, "CONV", 1, [64, 3, 2]],
//        [-1, "CONV", 2, [128, 3, 2]],
//        [[-1,1], "Detect“， 1， [128]],
//      ]
//
//}