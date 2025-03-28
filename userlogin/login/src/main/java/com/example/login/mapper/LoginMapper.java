package com.example.login.mapper;

import com.example.login.vo.Login;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapper {

    @Select("SELECT * from login where user_name = #{userName}")
    Login findByUserName(String userName);

    @Insert("insert into login (user_name, pass_word) value (#{userName},#{passWord})")
    Boolean add(Login login);

    @Select("select * from login where id = #{id}")
    Login findById(Integer userId);
}
