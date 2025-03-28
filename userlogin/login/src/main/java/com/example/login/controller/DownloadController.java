package com.example.login.controller;

import com.example.login.service.DownloadService;
import com.example.login.vo.DownloadRecord;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/download")
public class DownloadController {

    @Resource
    private DownloadService downloadService;

    @PostMapping("/add")
    public Boolean add(@RequestBody DownloadRecord downloadRecord) {
        return downloadService.add(downloadRecord);
    }

    @GetMapping("/list")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") Integer pageNum,
                                    @RequestParam(defaultValue = "5") Integer pageSize,
                                    @RequestParam String projectName) {
        return downloadService.list(pageNum, pageSize, projectName);
    }

}
