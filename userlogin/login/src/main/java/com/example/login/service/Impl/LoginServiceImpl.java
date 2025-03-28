package com.example.login.service.Impl;

import com.example.login.mapper.LoginMapper;
import com.example.login.service.LoginService;
import com.example.login.vo.Login;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Objects;

@Service
public class LoginServiceImpl implements LoginService {

    @Resource
    private LoginMapper loginMapper;

    @Override
    public String login(Login login) {
        Login loginUser = loginMapper.findByUserName(login.getUserName());
        if (Objects.isNull(loginUser)) {
            return "用户名不存在,请检查";
        }
        String passWord = loginUser.getPassWord();
        if (!StringUtils.equals(passWord, login.getPassWord())) {
            return "密码错误,请检查";
        }
        return StringUtils.EMPTY;
    }

    @Override
    public String register(Login login) {
        Login loginUser = loginMapper.findByUserName(login.getUserName());
        if (Objects.nonNull(loginUser)) {
            return "用户名已存在,请更换一个";
        }
        if (loginMapper.add(login)) {
            return StringUtils.EMPTY;
        }
        return "注册失败,请联系开发人员";
    }

}