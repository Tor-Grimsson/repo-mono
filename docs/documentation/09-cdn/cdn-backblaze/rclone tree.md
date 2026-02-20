---
Title: Tree & Manifest
---
```bash
rclone tree kolkrabbi:kolkrabbi/website/art-prints
```

```bash
rclone tree kolkrabbi:kolkrabbi/website --dirs-only
```

```bash
rclone tree kolkrabbi:kolkrabbi/website --filter "- segment_*.ts"
```