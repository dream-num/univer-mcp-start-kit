import { CopilotKit, useCoAgent, useCopilotContext } from '@copilotkit/react-core'
import { CopilotPopup } from '@copilotkit/react-ui'
import { isValidUUID } from '@copilotkit/shared'
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

export function CopilotProvider({ children, conversationId }: { children: React.ReactNode, conversationId: string }) {
  return (
    <CopilotKit
      runtimeUrl="http://localhost:4000/api/copilotkit"
      agent="spreadsheet_act" // the name of the agent you want to use
      publicLicenseKey="ck_pub_e544191cde8b150ef1f27847daeef392"
    >
      <AgentSessionUUIDNormalizer conversationId={conversationId} />
      {children}
    </CopilotKit>
  )
}

export function CopilotUI({ conversationId }: { conversationId: string }) {
  return (
    <CopilotProvider conversationId={conversationId}>
      <CopilotChat />
    </CopilotProvider>
  )
}

interface AgentSession {
  conversation_id: string
}

function AgentSessionUUIDNormalizer({ conversationId }: { conversationId: string }) {
  const { agentSession, setAgentSession } = useCopilotContext()
  const { setState } = useCoAgent<AgentSession>({
    name: 'spreadsheet_act',
    initialState: {
      conversation_id: conversationId,
    },
  })
  React.useEffect(() => {
    if (agentSession?.threadId && !isValidUUID(agentSession.threadId)) {
      const id = conversationId
      setAgentSession({
        ...agentSession,
        threadId: id,
      })

      setState({
        conversation_id: id,
      })
    }
  }, [agentSession, setAgentSession])
  return null
}
