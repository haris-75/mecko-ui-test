
const getDefaultStageAttributes = ({user_id, stage_attr}) => {
    console.log(stage_attr);
    var stage = {
        _id: stage_attr.stageId,
        name : stage_attr.subType+'_'+stage_attr.stageType,
        job_id : stage_attr.jobId,
        stage_type : stage_attr.stageType,
        sub_type:stage_attr.subType,
        inbound: [],
        outbound: [],
        stage_attributes : {},
        user_selected_schema : [],
        default_schema : [],
        status:'waiting',
        start_time:'',
        end_time:'',
        user_id: user_id,
        running_time:'',
        comment:''
        // user_id:user_id
    };
    if(stage_attr.stageType ==='source'){
        if(stage_attr.subType === "s3"){
            stage.stage_attributes = {access_key : '',secret_key : '',bucket : '',separator:'',is_header:'',path:'',file_format:'',output_file_name:'',compression_codec:''};
        }
        else if(stage_attr.subType === "hdfs"){
            stage.stage_attributes = {host:'', port:'', separator : '',is_header : '',path : '',file_format:'',output_file_name:'',compression_codec:''};
        }
        else if(stage_attr.subType === "rdbms"){
            stage.stage_attributes = {host:'', port:'', driver_type : '',domain : '',database_name : '',user_name:'',password:'',table_name:''};
        }
    }
    if(stage_attr.stageType ==='sink'){
        if(stage_attr.subType === "s3"){
            stage.stage_attributes = {access_key : '',secret_key : '',bucket : '',separator:'',is_header:'',path:'',file_format:'',output_file_name:'',compression_codec:'',merge_output:'',output:''};
        }
        else if(stage_attr.subType === "hdfs"){
            stage.stage_attributes = {host:'', port:'', separator : '',is_header : '',path : '',file_format:'',output_file_name:'',compression_codec:'', merge_output:''};
        }
        else if(stage_attr.subType === "rdbms"){
            stage.stage_attributes = {host:'', port:'', driver_type : '',domain : '',database_name : '',user_name:'',password:'',table_name:'', overwrite:''};
        }
    }
    if(stage_attr.stageType ==='transformation'){
        if(stage_attr.subType === "zip"){
            stage.stage_attributes = {with_index : true,with_unique_ids : false};
        }
        if(stage_attr.subType === "top"){
            stage.stage_attributes = {column_name : '',values : ''};
        }
        if(stage_attr.subType === "bottom"){
            stage.stage_attributes = {column_name : '',values : ''};
        }
        if(stage_attr.subType === "merge"){
            stage.stage_attributes = {splitter:'' ,column_names: [],columns:[{col_name:''}, {col_name:''}], resultant_column_name:''};
        }
        if(stage_attr.subType === "split") {
            stage.stage_attributes = {
                splitter: '',
                regex: false,
                expression: '',
                column_name: '',
                num_of_splits: 0
            };
        }
        if(stage_attr.subType === "sort"){
            stage.stage_attributes = { column_mappings:[{column_name:'',sort_order:''}] };
        }
        if(stage_attr.subType === "union"){
            stage.stage_attributes = {column_mappings:[{column1:'',column2:''}]};
        }
        if(stage_attr.subType === "formula") {
            stage.stage_attributes = {
                expression: false,
                expression_clause: '',
                brackets: [],
                resultant_column_name: '',
                resultant_column_type: ''
            };
        }
        if(stage_attr.subType === "typeConversion") {
            stage.stage_attributes = { column_mappings:[{column_name:'',data_type:''}] };
        }
        if(stage_attr.subType === "repartition") {
            stage.stage_attributes = { coalesce:'', num_partitions:'' };
        }
        if(stage_attr.subType === "dateTimeExtraction") {
            stage.stage_attributes = {"column_name": '', "column_type": '', "output_fields": []};
        }
        if(stage_attr.subType === "columnRename") {
            stage.stage_attributes = {column_mappings:[{column_name:'',resultant_column_name:''}]};
        }
        if(stage_attr.subType === "dateTimeConversion") {
            stage.stage_attributes = {column_name: '', input:'', output:'', input_format:''};
        }
        if(stage_attr.subType === "pivot") {
            stage.stage_attributes = {group_by_columns: [], pivot_column_name:'', distinct_values:[], function_name:'', function_column_name:''};
        }
    }
    return stage;
};

module.exports = {getDefaultStageAttributes};