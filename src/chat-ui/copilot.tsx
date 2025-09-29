import { CopilotKit, useCopilotContext } from '@copilotkit/react-core'
import { CopilotPopup } from '@copilotkit/react-ui'
import { isValidUUID, randomUUID } from '@copilotkit/shared'
import React from 'react'

export function CopilotChat() {
  return (
    <>
      <CopilotPopup
        instructions="You are assisting the user as best as you can. Answer in the best way possible given the data you have."
        labels={{
          title: 'Popup Assistant',
          initial: 'Need any help?',
        }}
      />
    </>
  )
}

export function CopilotProvider({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit
      runtimeUrl="http://localhost:4000/api/copilotkit"
      agent="spreadsheet_act" // the name of the agent you want to use
      publicLicenseKey="ck_pub_e544191cde8b150ef1f27847daeef392"
    >
      <AgentSessionUUIDNormalizer />
      {children}
    </CopilotKit>
  )
}

export function CopilotUI() {
  return (
    <CopilotProvider>
      <CopilotChat />
    </CopilotProvider>
  )
}

function AgentSessionUUIDNormalizer() {
  const { agentSession, setAgentSession } = useCopilotContext()
  React.useEffect(() => {
    if (agentSession?.threadId && !isValidUUID(agentSession.threadId)) {
      setAgentSession({
        ...agentSession,
        threadId: randomUUID(),
      })
    }
  }, [agentSession, setAgentSession])
  return null
}
