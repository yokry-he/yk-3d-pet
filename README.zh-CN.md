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
- 会实际生成并验证临时宠物的烟雾测试。

## 快速开始

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
node scripts/cli.mjs install-adapters --target /path/to/project --all
```

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
```

## 许可证

Apache-2.0
