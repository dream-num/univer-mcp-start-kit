import React from 'react'
import { createRoot } from 'react-dom/client'
import { CopilotUI } from './chat-ui/copilot'
import { setupUniver } from './setup-univer'
import './style.css'
import '@copilotkit/react-ui/styles.css'
import './copilotkit.css'

function main() {
  const univerAPI = setupUniver()

  // MCP Plugin use window.univerAPI to operate UniverSheet
  window.univerAPI = univerAPI
}

main()

createRoot(document.getElementById('chat-ui')!).render(<CopilotUI />)
