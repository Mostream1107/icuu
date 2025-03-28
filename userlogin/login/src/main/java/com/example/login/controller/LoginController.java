package com.example.login.controller;

import com.example.login.service.LoginService;
import com.example.login.vo.Login;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@CrossOrigin
@RestController
@RequestMapping("/login")
public class LoginController {

    @Resource
    public LoginService loginService;

    /**
     * 登录
     * 验证账号密码
     */
    @PostMapping("/login")
    public String login(@RequestBody Login login){
        return loginService.login(login);
    }

    @PostMapping("/register")
    public String register(@RequestBody Login login){
        return loginService.register(login);
    }

}
