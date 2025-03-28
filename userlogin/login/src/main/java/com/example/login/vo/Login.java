package com.example.login.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Login {

    //主键id
    private Integer id;

    //用户名
    private String userName;

    //密码
    private String passWord;

}
