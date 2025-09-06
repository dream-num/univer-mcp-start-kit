# Univer MCP Start Kit

🚀 **Automate spreadsheet tasks with AI powered by Univer and Model Context Protocol (MCP)**

This starter kit provides a seamless integration between [Univer](https://univer.ai) - a powerful open-source office suite engine - and Model Context Protocol (MCP), enabling AI applications to interact with spreadsheets, documents, and presentations through a standardized interface.

## ✨ Features

- 🔌 **MCP Integration**: Built-in Model Context Protocol support for AI applications
- 📊 **Full Spreadsheet Support**: Complete Univer Sheets functionality with formulas, data validation, and more
- 🤖 **AI-Ready**: Developer tools and UI components designed for AI interaction
- 🎨 **Customizable**: Extensible plugin architecture with theme support
- 🌐 **Cross-Platform**: Works in browsers with server-side capabilities
- 🔄 **Real-time**: Live collaboration and real-time updates (advanced features)

## 🏗️ Architecture

This kit integrates several key Univer components:

- **[@univerjs-pro/mcp](https://www.npmjs.com/package/@univerjs-pro/mcp)**: Core MCP protocol implementation
- **[@univerjs-pro/mcp-ui](https://www.npmjs.com/package/@univerjs-pro/mcp-ui)**: User interface for MCP interactions
- **[@univerjs-pro/sheets-mcp](https://www.npmjs.com/package/@univerjs-pro/sheets-mcp)**: Spreadsheet-specific MCP features
- **[@univerjs/presets](https://www.npmjs.com/package/@univerjs/presets)**: Pre-configured Univer components

## 🔧 How It Works

Univer MCP enables AI applications to interact with spreadsheets through the Model Context Protocol. The architecture includes MCP hosts (like Cursor, Claude), Univer MCP Server, mcp-bridge plugin, and the Univer instance.

📖 **For complete architecture details and implementation guide, visit the [Univer MCP Repository](https://github.com/dream-num/univer-mcp).**

## 📖 How to Use MCP Features

> **Note**: Univer MCP is currently in early development. Chart generation and advanced visualizations will be supported in future releases. We welcome your feedback and feature requests!

### Currently Supported MCP Tools

This starter kit provides the following MCP tools for AI applications:

**📊 Data Operations:**

- `set_range_data` - Set values in cell ranges
- `get_range_data` - Read cell values and data
- `search_cells` - Search for specific content in cells
- `auto_fill` - Auto-fill data patterns
- `format_brush` - Copy and apply cell formatting

**📋 Sheet Management:**

- `create_sheet` - Create new worksheets
- `delete_sheet` - Remove worksheets
- `rename_sheet` - Rename existing sheets
- `activate_sheet` - Switch active worksheet
- `move_sheet` - Reorder sheet positions
- `set_sheet_display_status` - Show/hide sheets
- `get_sheets` - List all sheets
- `get_active_unit_id` - Get current workbook ID

**🏗️ Structure Operations:**

- `insert_rows` / `insert_columns` - Add rows and columns
- `delete_rows` / `delete_columns` - Remove rows and columns
- `set_cell_dimensions` - Adjust row heights and column widths
- `set_merge` - Merge cell ranges

**🎨 Formatting & Styling:**

- `set_range_style` - Apply cell styling
- `add_conditional_formatting_rule` - Add conditional formatting
- `set_conditional_formatting_rule` - Update conditional formatting
- `delete_conditional_formatting_rule` - Remove conditional formatting
- `get_conditional_formatting_rules` - List formatting rules

**✅ Data Validation:**

- `add_data_validation_rule` - Add validation rules
- `set_data_validation_rule` - Update validation rules
- `delete_data_validation_rule` - Remove validation rules
- `get_data_validation_rules` - List validation rules

**🔍 Utility Functions:**

- `get_activity_status` - Get workbook status and info
- `scroll_and_screenshot` - Navigate and capture screenshots

**📈 Upcoming Features**

- Chart creation and manipulation tools
- Advanced data visualization options
- Tell us what you'd like to see next!

## 📋 Prerequisites

- **Node.js**: Version 18.0 or higher
- **Package Manager**: pnpm (recommended) or npm
- **Univer License**: Optional 30-day trial license for advanced features ([Get License](https://univer.ai/license))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/univer-mcp-start-kit.git
cd univer-mcp-start-kit
```

### 2. Install Dependencies

Using pnpm (recommended):

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install project dependencies
pnpm install
```

Using npm:

```bash
npm install
```

### 3. Configure Environment (Optional)

Create a `.env` file in the root directory for advanced features:

```bash
# Optional: Add your Univer license for advanced features
UNIVER_CLIENT_LICENSE=your_license_key_here
```

### 4. Start the Development Server

```bash
# Using pnpm
pnpm dev

# Using npm
npm run dev
```

The application will start at `http://localhost:5173` by default.

## 🔧 Integrating MCP SDK into Your Own Project

If you want to add MCP functionality to an existing Univer project, follow these steps:

### 1. Install Required Dependencies

```bash
# Core MCP packages
pnpm add @univerjs-pro/mcp @univerjs-pro/mcp-ui @univerjs-pro/sheets-mcp

# Or using npm
npm install @univerjs-pro/mcp @univerjs-pro/mcp-ui @univerjs-pro/sheets-mcp
```

### 2. Import and Register MCP Plugins

Add the following to your main setup file:

```typescript
import { UniverMCPPlugin } from '@univerjs-pro/mcp'
import { UniverMCPUIPlugin } from '@univerjs-pro/mcp-ui'
// language files
import univerMCPUIEnUS from '@univerjs-pro/mcp-ui/locale/en-US'

import { UniverSheetMCPPlugin } from '@univerjs-pro/sheets-mcp'
// Import CSS
import '@univerjs-pro/mcp-ui/lib/index.css'

// Register plugins with your Univer instance
univer.registerPlugin(UniverMCPPlugin)
univer.registerPlugin(UniverMCPUIPlugin, {
  showDeveloperTools: true, // Enable developer tools
})
univer.registerPlugin(UniverSheetMCPPlugin)
```

### 3. Expose Univer API to Window

Make sure to expose the Univer API for MCP to access:

```typescript
// Make univerAPI available globally for MCP
window.univerAPI = univerAPI
```

### 4. Configure Vite (if using Vite)

Add the Univer plugin to your `vite.config.ts`:

```typescript
import { univerPlugin } from '@univerjs/vite-plugin'

export default defineConfig({
  plugins: [
    univerPlugin(),
    // your other plugins
  ],
  define: {
    'process.env.UNIVER_CLIENT_LICENSE': `"${env.UNIVER_CLIENT_LICENSE}"`,
  },
})
```

### 5. Example Integration

Here's a complete example of integrating MCP into a basic Univer setup:

```typescript
import { UniverMCPPlugin } from '@univerjs-pro/mcp'
import { UniverMCPUIPlugin } from '@univerjs-pro/mcp-ui'
// omit more imports for brevity

import univerMCPUIEnUS from '@univerjs-pro/mcp-ui/locale/en-US'
import { UniverSheetMCPPlugin } from '@univerjs-pro/sheets-mcp'
import { createUniver, LocaleType, LogLevel } from '@univerjs/presets'

import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core'
import sheetsCoreEnUs from '@univerjs/presets/preset-sheets-core/locales/en-US'

import '@univerjs-pro/mcp-ui/lib/index.css'

const { univerAPI, univer } = createUniver({
  locale: LocaleType.EN_US,
  logLevel: LogLevel.VERBOSE,
  locales: {
    [LocaleType.EN_US]: merge(
      {},
      sheetsCoreEnUs,
      univerMCPUIEnUS,
    ),
  },
  presets: [
    UniverSheetsCorePreset({
      container: 'univer-container',
    }),
  ],
  plugins: [
    UniverMCPPlugin,
    [UniverMCPUIPlugin, { showDeveloperTools: true }],
    UniverSheetMCPPlugin,
  ],
})

// Expose API for MCP
window.univerAPI = univerAPI

// Create initial workbook
univer.createUnit(UniverInstanceType.UNIVER_SHEET, {})
```

## ❓ FAQ

### Q: Do I need a license to use this kit?

A: No, this kit works with the open-source version of Univer. However, an optional license unlocks advanced features and removes limitations. You can get a [30-day trial license](https://univer.ai/license) for free.

### Q: How do I get a Univer license?

A: Visit [https://univer.ai/license](https://univer.ai/license) to get a free 30-day trial license for advanced features.

### Q: The MCP features aren't working. What should I check?

A: Ensure that:

1. All MCP plugins are properly registered
2. `window.univerAPI` is correctly exposed
3. The MCP UI plugin has `showDeveloperTools: true` (for debugging)
4. Check browser console for any error messages

### Q: Can I use this with existing AI applications?

A: Yes! This kit implements the Model Context Protocol (MCP) standard, making it compatible with any MCP-compatible AI application or framework.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Issues**: Open an issue on GitHub for bugs or feature requests
2. **Submit PRs**: Fork the repository, make changes, and submit a pull request
3. **Improve Documentation**: Help us improve this README and add examples
4. **Share Use Cases**: Tell us how you're using this kit

## 📝 License

This project is licensed under the [Apache 2.0 License](LICENSE).

## 🔗 Useful Links

- [Univer Official Website](https://univer.ai)
- [Univer MCP Repository](https://github.com/dream-num/univer-mcp)
- [Univer GitHub Repository](https://github.com/dream-num/univer)
- [Univer Documentation](https://docs.univer.ai)
- [Univer Examples](https://docs.univer.ai/showcase)
- [Get Univer License](https://univer.ai/license)
- [Model Context Protocol](https://spec.modelcontextprotocol.io/)

## 📞 Support

- 💬 [GitHub Discussions](https://github.com/dream-num/univer/discussions)
- 🐛 [Report Issues](https://github.com/dream-num/univer-mcp/issues)
- 📧 [Discord Community](https://discord.gg/z3NKNT6D2f)

---

**Made with ❤️ by the Univer Community**
