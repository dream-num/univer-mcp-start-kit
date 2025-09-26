import type { IDisposable } from '@univerjs/presets'
import { UniverMCPPlugin } from '@univerjs-pro/mcp'
import { UniverMCPUIPlugin } from '@univerjs-pro/mcp-ui'
import univerMCPUIEnUS from '@univerjs-pro/mcp-ui/locale/en-US'
import { UniverSheetMCPPlugin } from '@univerjs-pro/sheets-mcp'
import { createUniver, defaultTheme, LocaleType, LogLevel, merge, UniverInstanceType } from '@univerjs/presets'
import { UniverSheetsAdvancedPreset } from '@univerjs/presets/preset-sheets-advanced'
import sheetsAdvancedEnUs from '@univerjs/presets/preset-sheets-advanced/locales/en-US'
import { UniverSheetsCollaborationPreset } from '@univerjs/presets/preset-sheets-collaboration'
import sheetsCollaborationEnUs from '@univerjs/presets/preset-sheets-collaboration/locales/en-US'
import { UniverSheetsConditionalFormattingPreset } from '@univerjs/presets/preset-sheets-conditional-formatting'
import sheetsConditionalFormattingEnUs from '@univerjs/presets/preset-sheets-conditional-formatting/locales/en-US'
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core'
import sheetsCoreEnUs from '@univerjs/presets/preset-sheets-core/locales/en-US'
import { UniverSheetsDataValidationPreset } from '@univerjs/presets/preset-sheets-data-validation'
import sheetsDataValidationEnUs from '@univerjs/presets/preset-sheets-data-validation/locales/en-US'
import { UniverSheetsDrawingPreset } from '@univerjs/presets/preset-sheets-drawing'
import sheetsDrawingEnUs from '@univerjs/presets/preset-sheets-drawing/locales/en-US'
import { UniverSheetsFilterPreset } from '@univerjs/presets/preset-sheets-filter'
import sheetsFilterEnUs from '@univerjs/presets/preset-sheets-filter/locales/en-US'
import { UniverSheetsFindReplacePreset } from '@univerjs/presets/preset-sheets-find-replace'
import sheetsFindReplaceEnUs from '@univerjs/presets/preset-sheets-find-replace/locales/en-US'
import { UniverSheetsHyperLinkPreset } from '@univerjs/presets/preset-sheets-hyper-link'
import sheetsHyperLinkEnUs from '@univerjs/presets/preset-sheets-hyper-link/locales/en-US'
import { UniverSheetsSortPreset } from '@univerjs/presets/preset-sheets-sort'
import sheetsSortEnUs from '@univerjs/presets/preset-sheets-sort/locales/en-US'
import { UniverSheetsThreadCommentPreset } from '@univerjs/presets/preset-sheets-thread-comment'
import sheetsThreadCommentEnUs from '@univerjs/presets/preset-sheets-thread-comment/locales/en-US'
import { UniverSheetsCrosshairHighlightPlugin } from '@univerjs/sheets-crosshair-highlight'

import UniverSheetsCrosshairHighlightEnUS from '@univerjs/sheets-crosshair-highlight/locale/en-US'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import sheetsZenEditorEnUs from '@univerjs/sheets-zen-editor/locale/en-US'
import '@univerjs-pro/mcp/facade'

import '@univerjs/presets/lib/styles/preset-sheets-core.css'
import '@univerjs/presets/lib/styles/preset-sheets-advanced.css'
import '@univerjs/presets/lib/styles/preset-sheets-filter.css'
import '@univerjs/presets/lib/styles/preset-sheets-collaboration.css'
import '@univerjs/presets/lib/styles/preset-sheets-thread-comment.css'
import '@univerjs/presets/lib/styles/preset-sheets-conditional-formatting.css'
import '@univerjs/presets/lib/styles/preset-sheets-data-validation.css'
import '@univerjs/presets/lib/styles/preset-sheets-drawing.css'
import '@univerjs/presets/lib/styles/preset-sheets-find-replace.css'
import '@univerjs/presets/lib/styles/preset-sheets-hyper-link.css'
import '@univerjs/presets/lib/styles/preset-sheets-sort.css'
import '@univerjs-pro/mcp-ui/lib/index.css'

export function setupUniver() {
  const universerEndpoint = window.location.host

  const collaboration = undefined

  const { univerAPI, univer } = createUniver({
    locale: LocaleType.EN_US,
    locales: {
      [LocaleType.EN_US]: merge(
        {},
        sheetsCoreEnUs,
        sheetsAdvancedEnUs,
        sheetsCollaborationEnUs,
        sheetsThreadCommentEnUs,
        sheetsConditionalFormattingEnUs,
        sheetsDataValidationEnUs,
        sheetsDrawingEnUs,
        sheetsFilterEnUs,
        sheetsFindReplaceEnUs,
        sheetsHyperLinkEnUs,
        sheetsSortEnUs,
        sheetsZenEditorEnUs,
        UniverSheetsCrosshairHighlightEnUS,
        univerMCPUIEnUS,
      ),
    },
    collaboration,
    logLevel: LogLevel.VERBOSE,
    theme: defaultTheme,
    presets: [
      UniverSheetsCorePreset({
        container: 'univer',
        header: true,
      }),
      UniverSheetsDrawingPreset({
        collaboration,
      }),
      UniverSheetsAdvancedPreset({
        useWorker: false,
        // if univer page is not in the same domain as the server, you need to set the following parameters
        universerEndpoint,
        // if you want to use the no-limit business feature, you can get 30-day trial license from https://univer.ai/license
        // eslint-disable-next-line node/prefer-global/process
        license: process.env.UNIVER_CLIENT_LICENSE,
      }),
      ...(collaboration ? [UniverSheetsCollaborationPreset()] : []),
      UniverSheetsThreadCommentPreset({
        collaboration,
      }),
      UniverSheetsConditionalFormattingPreset(),
      UniverSheetsDataValidationPreset(),
      UniverSheetsFilterPreset(),
      UniverSheetsFindReplacePreset(),
      UniverSheetsSortPreset(),
      UniverSheetsHyperLinkPreset(),
    ],
    plugins: [
      UniverSheetsCrosshairHighlightPlugin,
      UniverSheetsZenEditorPlugin,
      [UniverMCPPlugin, {
        // ticketServerUrl: '',
        // mcpServerUrl: '',
      }],
      [UniverMCPUIPlugin, {
        // enable guide ui
        showDeveloperTools: true,
        // showStatus: true
      }],
      UniverSheetMCPPlugin,
    ],
  })

  const cancels: IDisposable[] = []
  cancels.push(univerAPI.addEvent(univerAPI.Event.McpConnectionStatusChanged, (event) => {
    // eslint-disable-next-line no-console
    console.log('MCP Connection status:', event.status, event.error)
  }))
  cancels.push(univerAPI.addEvent(univerAPI.Event.McpToolCallReceived, (event) => {
    // eslint-disable-next-line no-console
    console.log(`MCP Received tool call: ${event.toolName}`, event.parameters)
  }))
  cancels.push(univerAPI.addEvent(univerAPI.Event.McpToolCallExecuted, (event) => {
    // eslint-disable-next-line no-console
    console.log(`MCP Tool ${event.toolName} executed successfully:`, event.result)
  }))
  cancels.push(univerAPI.addEvent(univerAPI.Event.McpToolCallFailed, (event) => {
    console.error(`MCP Tool ${event.toolName} failed:`, event.error)
  }))

  // when you want to unsubscribe the event, call dispose
  // cancels.forEach((c) => c.dispose())

  univer.createUnit(UniverInstanceType.UNIVER_SHEET, {})
  return univerAPI
}
