package com.example.login.service.Impl;

import com.example.login.mapper.DownloadMapper;
import com.example.login.mapper.LoginMapper;
import com.example.login.service.DownloadService;
import com.example.login.vo.DownloadRecord;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DownloadServiceImpl implements DownloadService {

    @Resource
    private DownloadMapper downloadMapper;

    @Override
    public Boolean add(DownloadRecord downloadRecord) {
        downloadRecord.setTime(LocalDateTime.now());
        return downloadMapper.add(downloadRecord);
    }

    @Override
    public Map<String, Object> list(Integer pageNum, Integer pageSize, String projectName) {
        Map<String, Object> map = new HashMap<>();

        int offset = (pageNum - 1) * pageSize;

        List<DownloadRecord> downloadRecords = downloadMapper.list(offset, pageSize, projectName);
        map.put("list", downloadRecords);

        Long total = downloadMapper.total(projectName);
        map.put("total", total);

        return map;
    }
}
