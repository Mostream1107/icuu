package com.example.login.service;

import com.example.login.vo.Login;

public interface LoginService {

    String login(Login login);

    String register(Login login);
}
