# yk-3d-pet

面向主流 Agent 与大模型的程序化 3D 宠物生成、Rig、动作、集成和验证 Skill。

[English](./README.md)

## 能力

- 根目录 `SKILL.md` 是唯一事实来源；
- 统一身体、四肢、独立眼睛、分段尾巴、胸背标志、道具和特效的语义 Rig；
- 显式动作生命周期和闲时动作调度；
- `generic` 与 `yk-pets` 两种脚手架预设；
- 仅依赖 Node.js 标准库的生成与验证 CLI；
- Codex、Claude Code、GitHub Copilot、Gemini CLI、Cursor、Windsurf 薄适配入口；
- 面向裸模型 API 的 JSON Schema 和提示模板；
- 会实际生成并验证临时宠物的烟雾测试；
- npm 包内容审计与受保护的 Git 标签发布流程。

## 从仓库源码使用

```bash
git clone https://github.com/yokry-he/yk-3d-pet.git
cd yk-3d-pet
npm test
npm run check
```

创建并验证宠物：

```bash
node scripts/cli.mjs scaffold --species cloud-cat --name "Luma" --preset generic --output ./generated/cloud-cat
node scripts/cli.mjs validate --root ./generated/cloud-cat
```

接入 YK-PETS：

```bash
node scripts/cli.mjs scaffold --species cloud-cat --name "Luma" --preset yk-pets --output ./generated/cloud-cat
```

安装到其它项目并生成 Agent 适配入口：

```bash
node scripts/cli.mjs install --target /path/to/project --agents all
```

某个版本正式发布到 npm 后，可以使用：

```bash
npx yk-3d-pet@<version> --help
```

仓库版本存在并不代表 npm 已经发布。自动化使用 `npx` 前应先确认对应版本确实可用。

## 第一版稳定范围

程序化可爱型宠物：单头、单身体、四肢、独立双眼、单条分段尾巴、胸前/后背标志、可指定动作、闲时动作和渲染器适配器。GLB 蒙皮、翅膀、多尾和非对称 Rig 属于扩展模式。

自动生成是结构完整的开发起点，不是最终美术。每个真实宠物仍需调整几何比例并执行正面、左侧、背面和右侧 WebGL 人工验收。

## 环境

- Node.js 22+
- 脚手架和验证器没有运行时第三方依赖

## 验证

```bash
npm test
npm run check
npm run release:check
```

`npm run check` 会检查实际 npm tarball，阻止运行文件缺失，也会阻止测试、工作流、依赖目录和 Git 元数据被误打包。

## 发布

参见 [`docs/PUBLISHING.md`](./docs/PUBLISHING.md)。与版本一致的标签会生成经过检查的 tarball、SHA-256、工作流产物和 GitHub Release。只有配置仓库凭据并设置 `NPM_PUBLISH_ENABLED=true` 后才会发布到 npm。

## 许可证

Apache-2.0
