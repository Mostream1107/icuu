package com.example.login.service;

import com.example.login.vo.DownloadRecord;

import java.util.Map;

public interface DownloadService {

    Boolean add(DownloadRecord downloadRecord);

    Map<String, Object> list(Integer pageNum, Integer pageSize, String projectName);
}
