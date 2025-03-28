package com.example.login.mapper;

import com.example.login.vo.DownloadRecord;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DownloadMapper {

    @Insert("insert into download_record (user_name,time,content,name,state) " +
            "value (#{userName},#{time},#{content},#{name},#{state})")
    Boolean add(DownloadRecord DownloadRecord);

    @Select("<script>" +
            "select * from download_record" +
            "<where>" +
            "<if test='_parameter != null and projectName != \"\"'>" +
            "and name like concat('%', #{projectName}, '%')"+
            "</if>" +
            "</where>" +
            "order by id desc " +
            "limit #{offset}, #{pageSize} " +
            "</script>")
    List<DownloadRecord> list(@Param("offset") int offset,
                              @Param("pageSize") Integer pageSize,
                              @Param("projectName") String projectName);

    @Select("<script>" +
            "select count(1) from download_record" +
            "<where>" +
            "<if test='projectName != null and projectName != \"\"'>" +
            "and name like concat('%', #{projectName}, '%')" +
            "</if>" +
            "</where>" +
            "</script>")
    Long total(@Param("projectName") String projectName);
}
