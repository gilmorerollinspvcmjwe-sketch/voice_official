# TTS 音频样本目录

此目录存放 TTS 音色试听音频文件。

## 文件命名规范

```
{voiceId}-demo.mp3

示例:
- xiaoya-demo.mp3        (小雅试听)
- mingyu-demo.mp3        (明宇试听)
- sakura-demo.mp3        (Sakura试听)
- james-demo.mp3         (James试听)

多场景样本:
- xiaoya-customer-service-calm.mp3
- mingyu-sales-professional.mp3
```

## 音频要求

- **格式**: MP3 (推荐)
- **大小**: < 5MB
- **时长**: 5-15秒 (短样本)
- **质量**: 128kbps 或更高
- **内容**: 与 `tts-voices.ts` 中配置的 `script` 字段对应

## 生成方式

可使用以下方式生成占位音频：

1. **开源 TTS 工具**:
   - Coqui TTS
   - Mozilla TTS
   - Google TTS (免费额度)

2. **商业 TTS API**:
   - Azure Speech Services
   - Google Cloud Text-to-Speech
   - Amazon Polly
   - ElevenLabs

## 音频样本内容建议

每个音色样本应包含:
- 问候语
- 服务介绍
- 自然停顿
- 情感表达 (如适用)

---

**注意**: 商业使用需确保音频版权合规。