import { setupUniver } from './setup-univer'
import './style.css'

function main() {
  const univerAPI = setupUniver()

  // MCP Plugin use window.univerAPI to operate UniverSheet
  window.univerAPI = univerAPI
}

main()
